# Figma Code Connect Setup Guide

## Overview

Figma Code Connect has been configured for Seamstress to enable bidirectional integration between the CDS-37 Figma design file and your React codebase.

## What Was Set Up

### 1. Package Installation
- ✅ `@figma/code-connect` package installed

### 2. Configuration
- ✅ `figma.config.json` created with:
  - Include pattern for `.figma.tsx` files
  - React parser configuration
  - Document URL substitutions

### 3. Component Mappings Created
Five example mappings in `src/figma-mappings/`:

| Mapping File | Figma Component | React Component |
|--------------|----------------|-----------------|
| `Button.figma.tsx` | Button (various sizes) | `@mui/material/Button` |
| `TextField.figma.tsx` | Input fields | `@mui/material/TextField` |
| `Chip.figma.tsx` | Chip components | `@mui/material/Chip` |
| `Accordion.figma.tsx` | Accordion group | `@mui/material/Accordion` |
| `Alert.figma.tsx` | Alert components | `@mui/material/Alert` |

### 4. NPM Scripts
- `npm run figma:connect` - Publish mappings to Figma
- `npm run figma:connect:parse` - Validate mapping files

### 5. Documentation
- README updated with Code Connect section
- This guide created for reference

## How to Use

### View Existing Mappings

```bash
# Parse and validate all mapping files
npm run figma:connect:parse
```

### Publish Mappings to Figma

You'll need a Figma access token first:

1. **Get Figma Access Token**:
   - Go to https://www.figma.com/developers/api#access-tokens
   - Generate a new personal access token
   - Copy the token

2. **Publish Mappings**:
   ```bash
   export FIGMA_ACCESS_TOKEN=your_token_here
   npm run figma:connect
   ```

3. **View in Figma**:
   - Open the CDS-37 file in Figma Desktop
   - Select a component (e.g., a Button)
   - Look for the "Code" tab in the right panel
   - You'll see the React code from your mappings!

### Create New Mappings

#### Using Figma MCP (Recommended)

1. **Open Figma file** in Figma Desktop app
2. **Select a component** you want to map
3. **In Claude Code**:
   ```
   Use the Figma MCP to get the node ID of the selected component
   Then create a .figma.tsx mapping file
   ```

4. **The mapping will show**:
   - Component name and location in code
   - Available props and variants
   - Example usage code

#### Manual Approach

1. **Create mapping file** in `src/figma-mappings/ComponentName.figma.tsx`:

```typescript
import { figma } from '@figma/code-connect'
import { ComponentName } from '@mui/material'

figma.connect(ComponentName, 'https://www.figma.com/design/MxdeZ8e13qSmlenBVMmzzI/CDS-37?node-id=YOUR-NODE-ID', {
  props: {
    // Map Figma properties to React props
    variant: figma.enum('Variant', {
      'FigmaValue': 'reactValue'
    }),
    children: figma.string('Label')
  },
  example: (props) => (
    <ComponentName variant={props.variant}>
      {props.children}
    </ComponentName>
  )
})
```

2. **Get Node ID**:
   - In Figma Desktop, right-click the component
   - Select "Copy link to selection"
   - Extract the node-id from the URL (e.g., `node-id=14866-80581`)

3. **Test the mapping**:
   ```bash
   npm run figma:connect:parse
   ```

4. **Publish**:
   ```bash
   npm run figma:connect
   ```

## Integration with Existing Figma Workflow

Seamstress already has Figma integration for design tokens. Code Connect complements this:

### Design Tokens (Already Set Up)
- **Purpose**: Sync color, spacing, typography variables
- **Command**: `npm run sync:figma`
- **Result**: Updates theme configuration with Figma variables

### Code Connect (Newly Added)
- **Purpose**: Link component instances to code
- **Command**: `npm run figma:connect`
- **Result**: Designers see actual code in Figma

### Combined Workflow

1. **Designer** updates Figma:
   - Changes design tokens (colors, spacing)
   - Updates component designs

2. **Developer** syncs:
   ```bash
   # Sync design tokens
   npm run sync:figma

   # Validate tokens
   npm run validate:tokens

   # Update Code Connect if components changed
   npm run figma:connect
   ```

3. **Result**: Design and code stay in sync!

## Troubleshooting

### "No mappings found"
- Check that `.figma.tsx` files are in `src/figma-mappings/`
- Verify `figma.config.json` includes pattern matches your files

### "Invalid node ID"
- Ensure the Figma URL includes `node-id` parameter
- Try copying link from Figma Desktop (not browser)
- Verify you have access to the CDS-37 file

### "Authentication failed"
- Check `FIGMA_ACCESS_TOKEN` environment variable is set
- Verify token has correct permissions
- Generate a new token if expired

## Next Steps

1. **Review example mappings** in `src/figma-mappings/`
2. **Identify components** you use frequently
3. **Create mappings** for those components
4. **Publish to Figma** so designers can see the code
5. **Iterate** as your component library grows

## Resources

- [Figma Code Connect Docs](https://www.figma.com/developers/code-connect)
- [Capital Design System](https://company-245496.frontify.com/)
- [MUI Component Docs](https://mui.com/material-ui/getting-started/)
- [Seamstress README](../README.md)

---

**Questions?** Check the main README or ask Claude Code for help!
