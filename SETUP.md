# Setup Instructions for Seamstress Design

## Prerequisites

### 1. Node.js
Ensure you have Node.js 20+ installed:
```bash
node --version  # Should be v20.x or higher
```

### 2. NPM Token for OpenGov Packages

The project requires access to OpenGov's private npm packages:
- `@opengov/capital-mui-theme`
- `@opengov/components-*`
- `@opengov/react-capital-assets`

**Setup:**
1. Get NPM token from your team lead or OpenGov npm registry
2. Add to your environment:
   ```bash
   export NPM_TOKEN=your_token_here
   ```
3. Or add to `.npmrc`:
   ```
   @opengov:registry=https://registry.npmjs.org/
   //registry.npmjs.org/:_authToken=YOUR_TOKEN
   ```

### 3. Claude Code CLI
```bash
npm install -g @anthropic-ai/claude-code
claude --version
```

## Installation

```bash
# Clone the repo
git clone https://github.com/OpenGov/seamstress-design.git
cd seamstress-design

# Install dependencies (requires NPM_TOKEN)
npm install

# Start development server
npm run dev
```

## Verification

```bash
# Run build
npm run build

# Run tests
npm test

# Run Storybook
npm run storybook

# Launch Claude Code
claude
```

## Troubleshooting

### "401 Unauthorized" during npm install
- Check your NPM_TOKEN is set
- Verify token has access to @opengov packages
- Contact team lead for new token

### "Component not found" errors
- Run `npm install` again
- Check package-lock.json is present
- Clear cache: `npm run clean:cache`

### Build failing
- Ensure Node.js 20+
- Run `npm run clean && npm install`
- Check all OpenGov packages installed correctly

## Next Steps

Once setup is complete:
1. Run `npm run dev`
2. Visit http://localhost:5173
3. Launch `claude` and try: `@seamstress build a test page`

See README.md for full documentation.
