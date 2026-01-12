#!/bin/bash

# Seamstress Project Cleanup Script
# This script cleans up various build artifacts and temporary files

echo "🧹 Starting Seamstress cleanup..."

# Remove build outputs
echo "📦 Removing build directories..."
rm -rf dist dist-ssr build out storybook-static

# Remove cache directories
echo "💾 Removing cache directories..."
rm -rf .vite .cache .parcel-cache .next .nuxt .turbo .rollup.cache

# Remove test coverage reports
echo "📊 Removing test coverage..."
rm -rf coverage .nyc_output test-results playwright-report

# Remove log files
echo "📝 Removing log files..."
rm -f *.log npm-debug.log* yarn-debug.log* yarn-error.log* pnpm-debug.log* lerna-debug.log*
rm -f *storybook.log build-storybook.log

# Remove TypeScript build info
echo "🔧 Removing TypeScript build info..."
rm -f *.tsbuildinfo

# Remove temporary files
echo "🗑️ Removing temporary files..."
rm -rf tmp temp .tmp .temp
rm -f *.tmp *.temp

# Remove OS-specific files
echo "🖥️ Removing OS-specific files..."
find . -name ".DS_Store" -type f -delete 2>/dev/null
find . -name "Thumbs.db" -type f -delete 2>/dev/null
find . -name "desktop.ini" -type f -delete 2>/dev/null

# Remove build analysis files
echo "📈 Removing build analysis files..."
rm -f stats.json bundle-stats.html report.html

# Optional: Clear node_modules (uncomment if needed)
# echo "📦 Removing node_modules..."
# rm -rf node_modules

# Optional: Clear package-lock (uncomment if needed)
# echo "🔒 Removing package-lock.json..."
# rm -f package-lock.json

echo "✅ Cleanup complete!"

# Show disk usage after cleanup
echo ""
echo "📊 Current disk usage:"
du -sh . 2>/dev/null