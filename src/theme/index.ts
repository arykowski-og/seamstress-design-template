/**
 * Seamstress Theme Configuration
 *
 * This is the single source of truth for all theme customizations in Seamstress.
 * We extend the OpenGov Capital MUI theme with minimal, documented overrides.
 *
 * Architecture:
 * 1. Import Capital base theme and design tokens
 * 2. Define Seamstress-specific extensions
 * 3. Export unified theme and helper tokens
 * 4. Support light and dark mode palettes
 */

import { createTheme } from '@mui/material/styles';
import { capitalMuiTheme, capitalDesignTokens } from '@opengov/capital-mui-theme';
import type { ThemeOptions } from '@mui/material/styles';
import { openGovDarkModeOverrides } from './opengov-overrides';
import { darkThemeComponents } from './dark-theme-components';

type PaletteMode = 'light' | 'dark';


// ============================================================================
// DARK MODE PALETTE
// ============================================================================

const darkModePalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: {
    main: '#90caf9',
    light: '#e3f2fd',
    dark: '#42a5f5',
    contrastText: '#000000',
  },
  secondary: {
    main: '#ce93d8',
    light: '#f3e5f5',
    dark: '#ab47bc',
    contrastText: '#000000',
  },
  background: {
    default: '#121212',    // Main page background
    paper: '#1e1e1e',      // Cards, dialogs, menus, papers
    secondary: '#2a2a2a',  // Secondary background (lighter than paper)
  },
  text: {
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  action: {
    active: 'rgba(255, 255, 255, 0.54)',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.26)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    focus: 'rgba(255, 255, 255, 0.12)',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ffa726',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: '#000000',
  },
  info: {
    main: '#29b6f6',
    light: '#4fc3f7',
    dark: '#0288d1',
    contrastText: '#ffffff',
  },
  success: {
    main: '#66bb6a',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: '#ffffff',
  },
};

// ============================================================================
// SEAMSTRESS COMPONENT OVERRIDES
// ============================================================================
// Only override what's truly different from Capital defaults

const seamstressComponents: ThemeOptions['components'] = {
  // Button: Custom hover state for outlined/text variants
  MuiButton: {
    styleOverrides: {
      root: {

      },
    },
  },

  // ToggleButton: Custom selected state for Seamstress UI patterns
  MuiToggleButton: {
    styleOverrides: {
      root: {

      },
    },
  },

  // Chip: Add "strong" variant support with bold filled styling
  MuiChip: {
    variants: [
      {
        props: { variant: 'strong' as any },
        style: ({ theme }: any) => ({
          fontWeight: 600,
          '&.MuiChip-colorDefault': {
            backgroundColor: theme.palette.grey[700],
            color: theme.palette.common.white,
          },
          '&.MuiChip-colorPrimary': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
          },
          '&.MuiChip-colorError': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText,
          },
          '&.MuiChip-colorInfo': {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText,
          },
        }),
      },
    ],
  },

  // Paper: Add border to all Paper components for better visual separation
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
      }),
    },
  },

  // DataGrid: Custom header styling for data tables
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        // Ensure rows have white background in light mode
        '& .MuiDataGrid-row': {
          backgroundColor: theme.palette.mode === 'light'
            ? capitalDesignTokens.foundations.colors.white
            : theme.palette.background.paper,
          '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
              ? capitalDesignTokens.foundations.colors.gray50
              : 'rgba(255, 255, 255, 0.08)',
          },
        },
      }),
    },
  },

  // Accordion: 1px border and 4px border-radius for visual emphasis
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius || '4px',
        '&:before': {
          display: 'none', // Remove default MUI border
        },
        '&.Mui-expanded': {
          borderColor: theme.palette.primary.main,
        },
      }),
    },
  },

  // AccordionSummary: Remove default focus outline, use primary color for focus states
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:focus': {
          backgroundColor: 'transparent',
        },
        '&:focus-visible': {
          backgroundColor: 'transparent',
          outline: 'none',
        },
        '&.Mui-focusVisible': {
          backgroundColor: 'transparent',
        },
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      }),
    },
  },
};

// ============================================================================
// CREATE THEMED VARIANTS
// ============================================================================

/**
 * Merge component overrides
 *
 * Combines Seamstress-specific overrides with dark theme MUI components
 * and OpenGov CSS overrides. Order matters:
 *
 * 1. seamstressComponents - Base customizations (both modes)
 * 2. darkThemeComponents - MUI dark mode overrides (theme token-based)
 * 3. openGovDarkModeOverrides - OpenGov component CSS fixes (last, highest priority)
 */
const mergeComponents = (mode: PaletteMode): ThemeOptions['components'] => {
  if (mode === 'dark') {
    // Merge all component overrides for dark mode
    const merged = {
      ...seamstressComponents,
      ...darkThemeComponents,
      ...openGovDarkModeOverrides,
    };

    // Special handling for MuiCssBaseline - merge all three
    if (seamstressComponents?.MuiCssBaseline || darkThemeComponents?.MuiCssBaseline || openGovDarkModeOverrides?.MuiCssBaseline) {
      merged.MuiCssBaseline = {
        styleOverrides: (theme) => {
          const seamstressStyles = seamstressComponents?.MuiCssBaseline?.styleOverrides;
          const darkStyles = darkThemeComponents?.MuiCssBaseline?.styleOverrides;
          const openGovStyles = openGovDarkModeOverrides?.MuiCssBaseline?.styleOverrides;

          return {
            ...(typeof seamstressStyles === 'function' ? seamstressStyles(theme) : seamstressStyles || {}),
            ...(typeof darkStyles === 'function' ? darkStyles(theme) : darkStyles || {}),
            ...(typeof openGovStyles === 'function' ? openGovStyles(theme) : openGovStyles || {}),
          };
        },
      };
    }

    return merged;
  }

  return seamstressComponents;
};

/**
 * Create a theme with the specified mode (light or dark)
 */
export const createSeamstressTheme = (mode: PaletteMode = 'light') => {
  const paletteOptions = mode === 'dark'
    ? darkModePalette
    : {
        ...capitalMuiTheme.palette,
        background: {
          ...capitalMuiTheme.palette.background,
          secondary: '#f8f8f8',  // Light gray for secondary backgrounds
        },
      };
  const components = mergeComponents(mode);

  return createTheme(capitalMuiTheme, {
    palette: paletteOptions,
    components,
  });
};

// ============================================================================
// DEFAULT LIGHT THEME (for backward compatibility)
// ============================================================================

export const theme = createSeamstressTheme('light');

// ============================================================================
// TRANSITIONS
// ============================================================================

export { transitions, durations, easing, components as transitionComponents } from './transitions';
export type { default as Transitions } from './transitions';
