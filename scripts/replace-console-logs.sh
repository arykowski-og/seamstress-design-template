#!/bin/bash

# Replace console.log statements with logger
find src -name "*.ts*" -type f ! -path "*/logger.ts" ! -path "*/test/*" ! -path "*/__tests__/*" -exec sed -i '' \
  -e "s/console\.log(/logger.debug(/g" \
  -e "s/console\.error(/logger.error(/g" \
  -e "s/console\.warn(/logger.warn(/g" \
  -e "s/console\.info(/logger.info(/g" {} \;

# Add logger import where needed
for file in $(grep -l "logger\." src/**/*.ts* 2>/dev/null | grep -v logger.ts); do
  if ! grep -q "import.*logger" "$file"; then
    # Add import at the beginning of the file after other imports
    sed -i '' "1s/^/import logger from '..\/utils\/logger';\n/" "$file"
  fi
done

echo "Console statements replaced with logger"