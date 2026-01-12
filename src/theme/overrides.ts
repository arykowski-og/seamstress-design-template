/**
 * Seamstress Theme Overrides Documentation
 *
 * This file documents every override we make to the Capital MUI Theme.
 * Each override should have a clear justification and link to design requirements.
 *
 * Format:
 * - Component: What we're overriding
 * - Capital Default: What Capital provides
 * - Seamstress Override: What we're changing
 * - Justification: Why this is necessary
 * - Design Reference: Link to Figma or requirement
 */

export const themeOverrides = {
  palette: {
    status: {
      description: 'Custom status colors for entity states',
      capitalDefault: 'Not provided',
      seamstressOverride: {
        draft: 'gray300',
        published: 'green700',
        active: 'green600',
        inactive: 'gray500',
        deprecated: 'yellow700',
      },
      justification: 'Seamstress has specific entity states (skills, agents, tools) that need semantic colors',
      usage: [
        'Skill publishing states',
        'Agent activation status',
        'Tool availability indicators',
      ],
    },
    backgroundSecondary: {
      description: 'Secondary background for content areas',
      capitalDefault: 'No secondary background defined',
      seamstressOverride: 'gray50',
      justification: 'Provides visual hierarchy between page background and content areas',
      usage: [
        'List page content areas',
        'Form backgrounds',
        'Dashboard sections',
      ],
    },
  },

  components: {
    MuiButton: {
      description: 'Custom hover state for outlined and text variants',
      capitalDefault: 'Standard MUI hover states',
      seamstressOverride: 'backgroundColor: rgba(75, 63, 255, 0.04) on hover',
      justification: 'Provides subtle blurple tint on hover matching OG Assist interaction patterns',
      affectedVariants: ['outlined', 'text'],
    },

    MuiChip: {
      description: 'Success color variant',
      capitalDefault: 'No success variant styling',
      seamstressOverride: 'green700 background with white text',
      justification: 'Needed for positive status indicators in entity lists',
      usage: [
        'Published status chips',
        'Active agent indicators',
        'Successful operation feedback',
      ],
    },

    MuiToggleButton: {
      description: 'Custom selected state appearance',
      capitalDefault: 'Standard MUI selected state',
      seamstressOverride: '8% blurple background, 12% on hover',
      justification: 'Matches OG Assist toggle patterns and provides better visual feedback',
      usage: [
        'View mode toggles',
        'Filter selections',
        'Option groups',
      ],
    },

    MuiPaper: {
      description: 'Border for elevation0 variant',
      capitalDefault: 'No border on flat papers',
      seamstressOverride: '1px solid border.tertiary',
      justification: 'Improves visual separation for flat cards and containers',
      usage: [
        'Card layouts',
        'Dialog containers',
        'Info panels',
      ],
    },

    MuiDataGrid: {
      description: 'Custom header background',
      capitalDefault: 'White headers',
      seamstressOverride: 'gray50 background',
      justification: 'Provides clear visual separation between headers and data rows',
      usage: [
        'Entity list tables',
        'Data grids',
        'Report tables',
      ],
    },
  },

  removedOverrides: {
    MuiTextField: {
      reason: 'Capital already provides proper text field styling with size="small" default',
      migration: 'Use Capital defaults',
    },
    MuiTabs: {
      reason: 'Capital tab styling is sufficient',
      migration: 'Use Capital defaults',
    },
    MuiIconButton: {
      reason: 'Capital provides comprehensive icon button styles',
      migration: 'Use Capital defaults',
    },
    MuiBreadcrumbs: {
      reason: 'Capital breadcrumb styling meets requirements',
      migration: 'Use Capital defaults',
    },
    MuiAlert: {
      reason: 'Capital alert styles are complete',
      migration: 'Use Capital defaults',
    },
  },

  migrationNotes: [
    {
      date: '2024-09-18',
      description: 'Consolidated theme from multiple files to single source',
      changes: [
        'Removed Theme subdirectory with duplicate Capital files',
        'Consolidated theme.ts and components.ts into index.ts',
        'Removed seamstressStyles.ts - moved to component level',
        'Documented all overrides with justifications',
      ],
    },
  ],

  bestPractices: [
    'Always check Capital MUI Theme first before adding overrides',
    'Document why each override is necessary',
    'Use design tokens instead of hardcoded values',
    'Prefer extending over replacing',
    'Keep overrides minimal and focused',
    'Review overrides quarterly for removal opportunities',
  ],
};

/**
 * Validation function to ensure overrides stay minimal
 */
export function validateOverrides(): void {
  // Seamstress Theme Override Summary:
  // - Active component overrides: ${overrideCount}
  // - Removed unnecessary overrides: ${removedCount}
  // - Override ratio: ${((overrideCount / (overrideCount + removedCount)) * 100).toFixed(1)}%
  // Goal: Keep override ratio below 50%
}

/**
 * Helper to check if an override is still needed
 */
export function isOverrideNecessary(component: string): boolean {
  return component in themeOverrides.components;
}

/**
 * Get justification for a specific override
 */
export function getOverrideJustification(component: string): string {
  const override = themeOverrides.components[component as keyof typeof themeOverrides.components];
  return override?.justification || 'No justification provided';
}