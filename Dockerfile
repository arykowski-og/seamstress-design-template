# Multi-stage build for React/Vite application

# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
# NPM authentication via .npmrc file from GitHub Actions secret-files
RUN --mount=type=secret,id=npmrc \
    if [ -f /run/secrets/npmrc ]; then \
      cp /run/secrets/npmrc .npmrc; \
    fi && \
    npm ci

# Copy source code
COPY . .

# Build the application
# Using BASE_PATH=/seamstress-design as per package.json build script
ENV BASE_PATH=/seamstress-design
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
# Handle SPA routing with base path /seamstress-design
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Gzip compression \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json; \
    \
    # Root redirect to base path \
    location = / { \
        return 301 /seamstress-design/; \
    } \
    \
    # Serve assets (strip /seamstress-design prefix) \
    location ~ ^/seamstress-design/assets/(.*)$ { \
        alias /usr/share/nginx/html/assets/$1; \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Serve static files with base path (fonts, icons, etc) \
    location ~ ^/seamstress-design/(fonts|vite\.svg|fonts\.css)$ { \
        alias /usr/share/nginx/html/$1; \
    } \
    \
    # Serve SPA routes - all other paths under /seamstress-design \
    location /seamstress-design { \
        alias /usr/share/nginx/html; \
        try_files $uri $uri/ /seamstress-design/index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

