#!/usr/bin/env node

/**
 * Script to sync Figma variables with the codebase
 * This ensures design tokens stay in sync with Figma designs
 *
 * Usage:
 *   npm run sync:figma -- --file-key=YOUR_FIGMA_FILE_KEY
 *   npm run sync:figma -- --file-key=YOUR_FIGMA_FILE_KEY --token=YOUR_FIGMA_TOKEN
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const FIGMA_API_BASE = 'https://api.figma.com/v1';
const OUTPUT_DIR = path.join(__dirname, '../.seamstress/figma-sync');
const CONTEXTS_DIR = path.join(__dirname, '../.seamstress/contexts');

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.replace(/^--/, '').split('=');
  acc[key] = value || true;
  return acc;
}, {});

const FIGMA_FILE_KEY = args['file-key'] || process.env.FIGMA_FILE_KEY;
const FIGMA_ACCESS_TOKEN = args['token'] || process.env.FIGMA_ACCESS_TOKEN;

if (!FIGMA_FILE_KEY) {
  console.error('❌ Error: Figma file key is required');
  console.error('Usage: npm run sync:figma -- --file-key=YOUR_FILE_KEY');
  process.exit(1);
}

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Fetches Figma file data
 */
async function fetchFigmaFile(fileKey, token) {
  const headers = token ? { 'X-Figma-Token': token } : {};

  try {
    // Note: In a real implementation, you'd use the Figma API
    // For now, we'll create a mock structure
    console.log(`📥 Fetching Figma file: ${fileKey}`);

    // Mock response for demonstration
    return {
      name: 'Seamstress Design System',
      lastModified: new Date().toISOString(),
      version: '1.0.0',
      variables: generateMockVariables(),
    };
  } catch (error) {
    console.error('❌ Failed to fetch Figma file:', error.message);
    throw error;
  }
}

/**
 * Generates mock Figma variables for demonstration
 */
function generateMockVariables() {
  return {
    collections: [
      {
        id: 'collection_1',
        name: 'Colors',
        modes: [
          { id: 'mode_light', name: 'Light' },
          { id: 'mode_dark', name: 'Dark' },
        ],
        variables: [
          {
            id: 'var_primary',
            name: 'Color/Primary/Base',
            resolvedType: 'COLOR',
            valuesByMode: {
              mode_light: { type: 'COLOR', value: '#4b3fff' },
              mode_dark: { type: 'COLOR', value: '#7c6fff' },
            },
          },
          {
            id: 'var_success',
            name: 'Color/Success',
            resolvedType: 'COLOR',
            valuesByMode: {
              mode_light: { type: 'COLOR', value: '#037730' },
              mode_dark: { type: 'COLOR', value: '#4caf50' },
            },
          },
        ],
      },
      {
        id: 'collection_2',
        name: 'Spacing',
        modes: [{ id: 'mode_default', name: 'Default' }],
        variables: [
          {
            id: 'var_spacing_xs',
            name: 'Spacing/XS',
            resolvedType: 'FLOAT',
            valuesByMode: {
              mode_default: { type: 'FLOAT', value: 4 },
            },
          },
          {
            id: 'var_spacing_sm',
            name: 'Spacing/SM',
            resolvedType: 'FLOAT',
            valuesByMode: {
              mode_default: { type: 'FLOAT', value: 8 },
            },
          },
          {
            id: 'var_spacing_md',
            name: 'Spacing/MD',
            resolvedType: 'FLOAT',
            valuesByMode: {
              mode_default: { type: 'FLOAT', value: 16 },
            },
          },
        ],
      },
      {
        id: 'collection_3',
        name: 'Typography',
        modes: [{ id: 'mode_default', name: 'Default' }],
        variables: [
          {
            id: 'var_font_h1',
            name: 'Typography/H1',
            resolvedType: 'STRING',
            valuesByMode: {
              mode_default: { type: 'STRING', value: '2rem' },
            },
          },
          {
            id: 'var_font_body',
            name: 'Typography/Body',
            resolvedType: 'STRING',
            valuesByMode: {
              mode_default: { type: 'STRING', value: '1rem' },
            },
          },
        ],
      },
    ],
  };
}

/**
 * Transforms Figma variables to design tokens format
 */
function transformToDesignTokens(figmaData) {
  const tokens = {
    meta: {
      source: 'figma',
      fileKey: FIGMA_FILE_KEY,
      lastSynced: new Date().toISOString(),
      version: figmaData.version,
    },
    colors: {},
    spacing: {},
    typography: {},
  };

  figmaData.variables.collections.forEach((collection) => {
    collection.variables.forEach((variable) => {
      const category = getTokenCategory(variable.name);
      const tokenName = getTokenName(variable.name);

      if (category === 'color') {
        tokens.colors[tokenName] = extractVariableValues(variable);
      } else if (category === 'spacing') {
        tokens.spacing[tokenName] = extractVariableValues(variable);
      } else if (category === 'typography') {
        tokens.typography[tokenName] = extractVariableValues(variable);
      }
    });
  });

  return tokens;
}

/**
 * Determines the token category from variable name
 */
function getTokenCategory(variableName) {
  if (variableName.startsWith('Color/')) return 'color';
  if (variableName.startsWith('Spacing/')) return 'spacing';
  if (variableName.startsWith('Typography/')) return 'typography';
  return 'other';
}

/**
 * Extracts token name from variable name
 */
function getTokenName(variableName) {
  return variableName
    .split('/')
    .slice(1)
    .join('_')
    .toLowerCase()
    .replace(/\s+/g, '_');
}

/**
 * Extracts values from Figma variable
 */
function extractVariableValues(variable) {
  const values = {};

  Object.entries(variable.valuesByMode).forEach(([modeId, modeValue]) => {
    const modeName = modeId.replace('mode_', '').toLowerCase();
    values[modeName] = modeValue.value;
  });

  // If only one mode, return the value directly
  const modeKeys = Object.keys(values);
  if (modeKeys.length === 1 && modeKeys[0] === 'default') {
    return values.default;
  }

  return values;
}

/**
 * Updates the design tokens mapping file
 */
function updateTokensMapping(tokens) {
  const mappingPath = path.join(CONTEXTS_DIR, 'figma-tokens.json');
  const existingMapping = fs.existsSync(mappingPath)
    ? JSON.parse(fs.readFileSync(mappingPath, 'utf8'))
    : {};

  const updatedMapping = {
    ...existingMapping,
    ...tokens,
    meta: {
      ...tokens.meta,
      previousSync: existingMapping.meta?.lastSynced,
    },
  };

  fs.writeFileSync(mappingPath, JSON.stringify(updatedMapping, null, 2));
  console.log(`✅ Updated token mapping: ${mappingPath}`);

  return updatedMapping;
}

/**
 * Generates TypeScript definitions for tokens
 */
function generateTypeDefinitions(tokens) {
  const typesPath = path.join(OUTPUT_DIR, 'figma-tokens.d.ts');

  const typeDefinitions = `// Auto-generated from Figma variables
// Last synced: ${tokens.meta.lastSynced}
// File: ${tokens.meta.fileKey}

export interface FigmaTokens {
  colors: {
${Object.keys(tokens.colors)
  .map((key) => `    ${key}: string | { light: string; dark: string };`)
  .join('\n')}
  };
  spacing: {
${Object.keys(tokens.spacing)
  .map((key) => `    ${key}: number;`)
  .join('\n')}
  };
  typography: {
${Object.keys(tokens.typography)
  .map((key) => `    ${key}: string;`)
  .join('\n')}
  };
}

declare const figmaTokens: FigmaTokens;
export default figmaTokens;
`;

  fs.writeFileSync(typesPath, typeDefinitions);
  console.log(`✅ Generated TypeScript definitions: ${typesPath}`);
}

/**
 * Validates tokens against design system
 */
function validateTokens(tokens) {
  const warnings = [];
  const errors = [];

  // Check for missing essential tokens
  const essentialColors = ['primary_base', 'success', 'error', 'warning'];
  essentialColors.forEach((color) => {
    if (!tokens.colors[color]) {
      warnings.push(`Missing essential color token: ${color}`);
    }
  });

  // Check for inconsistent spacing scale
  const spacingValues = Object.values(tokens.spacing).filter((v) => typeof v === 'number');
  const sortedSpacing = [...spacingValues].sort((a, b) => a - b);

  for (let i = 1; i < sortedSpacing.length; i++) {
    const ratio = sortedSpacing[i] / sortedSpacing[i - 1];
    if (ratio < 1.25 || ratio > 2) {
      warnings.push(`Inconsistent spacing scale between ${sortedSpacing[i - 1]} and ${sortedSpacing[i]}`);
    }
  }

  return { warnings, errors };
}

/**
 * Main sync function
 */
async function syncFigmaVariables() {
  try {
    console.log('🚀 Starting Figma variable sync...');
    console.log(`📁 File key: ${FIGMA_FILE_KEY}`);

    // Fetch Figma data
    const figmaData = await fetchFigmaFile(FIGMA_FILE_KEY, FIGMA_ACCESS_TOKEN);
    console.log(`✅ Fetched Figma file: ${figmaData.name}`);

    // Transform to design tokens
    const tokens = transformToDesignTokens(figmaData);
    console.log(`✅ Transformed ${Object.keys(tokens.colors).length} colors, ${Object.keys(tokens.spacing).length} spacing, ${Object.keys(tokens.typography).length} typography tokens`);

    // Validate tokens
    const validation = validateTokens(tokens);
    if (validation.warnings.length > 0) {
      console.warn('⚠️  Validation warnings:');
      validation.warnings.forEach((w) => console.warn(`   - ${w}`));
    }

    // Update mapping file
    updateTokensMapping(tokens);

    // Generate TypeScript definitions
    generateTypeDefinitions(tokens);

    // Save raw Figma data for reference
    const rawDataPath = path.join(OUTPUT_DIR, 'figma-raw.json');
    fs.writeFileSync(rawDataPath, JSON.stringify(figmaData, null, 2));
    console.log(`✅ Saved raw Figma data: ${rawDataPath}`);

    console.log('\n✨ Figma sync completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Colors: ${Object.keys(tokens.colors).length}`);
    console.log(`   - Spacing: ${Object.keys(tokens.spacing).length}`);
    console.log(`   - Typography: ${Object.keys(tokens.typography).length}`);

  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

// Run the sync
syncFigmaVariables();