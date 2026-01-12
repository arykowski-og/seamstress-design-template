/**
 * OpenGov Component Dark Mode Overrides
 *
 * This file contains CSS overrides for OpenGov components that don't natively
 * support dark mode. These are temporary fixes until the OpenGov packages
 * themselves are updated with proper dark mode support.
 *
 * Components requiring overrides:
 * - @opengov/components-nav-bar (NavBar)
 * - @opengov/components-page-header (PageHeaderComposable)
 * - @opengov/components-pagination (Pagination)
 * - @opengov/components-result (Result)
 * - @opengov/components-file-management (FilePreviewCard)
 * - @opengov/components-ai-patterns (AIPromptInput, AIConversation)
 *
 * TODO: Remove these overrides once OpenGov packages support dark mode natively
 */

import type { ThemeOptions } from '@mui/material/styles';
import { capitalDesignTokens } from '@opengov/capital-mui-theme';

export const openGovDarkModeOverrides: ThemeOptions['components'] = {
  // ================================================================
  // MUI Component-level overrides for dark mode
  // ================================================================

  // Fix for MuiScopedCssBaseline (used by NavBar)
  MuiScopedCssBaseline: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.palette.mode === 'dark'
          ? {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            }
          : {},
    },
  },

  MuiTable: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.palette.mode === 'dark'
          ? {
              backgroundColor: '#1e1e1e',
              color: 'rgba(255, 255, 255, 0.87)',
              borderColor: theme.palette.divider,
            }
          : {},
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.palette.mode === 'dark'
          ? {
              backgroundColor: '#2d2d2d',
              borderColor: theme.palette.divider,
            }
          : {},
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.palette.mode === 'dark'
          ? {
              borderColor: theme.palette.divider,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.04) !important',
              },
            }
          : {
              backgroundColor: capitalDesignTokens.foundations.colors.white,
              '&:hover': {
                backgroundColor: `${capitalDesignTokens.foundations.colors.gray50} !important`,
              },
            },
      head: ({ theme }) =>
        theme.palette.mode === 'dark'
          ? {
              backgroundColor: '#2d2d2d',
              borderColor: theme.palette.divider,
            }
          : {},
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.palette.mode === 'dark'
          ? {
              color: 'rgba(255, 255, 255, 0.87)',
              borderColor: theme.palette.divider,
              borderBottomColor: theme.palette.divider,
            }
          : {},
      head: ({ theme }) =>
        theme.palette.mode === 'dark'
          ? {
              color: 'rgba(255, 255, 255, 0.87)',
              backgroundColor: '#2d2d2d',
              fontWeight: 600,
              borderColor: theme.palette.divider,
            }
          : {},
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.palette.mode === 'dark'
          ? {
              borderColor: theme.palette.divider,
            }
          : {},
    },
  },
  MuiTableBody: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.palette.mode === 'dark'
          ? {
              borderColor: theme.palette.divider,
              '& .MuiTableRow-root': {
                borderColor: theme.palette.divider,
              },
            }
          : {},
    },
  },
  MuiCssBaseline: {
    styleOverrides: (theme) => ({
      // ================================================================
      // Light Mode NavBar Overrides
      // ================================================================
      ...(theme.palette.mode === 'light' && {
        // NavBar app title/logo - use CSS custom properties with very high specificity
        '[data-test="nav_bar_header"] h1': {
          color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },
        '[data-test="nav_bar_header"] h2': {
          color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },
        '[data-test="nav_bar_header"] h3': {
          color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },
        '[data-test="nav_bar_header"] h4': {
          color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        '[data-test="nav_bar_header"] .MuiTypography-h1': {
          color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },
        '[data-test="nav_bar_header"] .MuiTypography-h2': {
          color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },
        '[data-test="nav_bar_header"] .MuiTypography-h3': {
          color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },
        '[data-test="nav_bar_header"] .MuiTypography-h4': {
          color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        // NavBar badge - use CSS custom properties
        '[data-test="nav_bar_header"] .MuiBadge-badge': {
          backgroundColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },
        '[data-test="nav_bar_header"] .MuiBadge-colorPrimary': {
          backgroundColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        // NavBar menu items - target all Typography span elements that might have borders
        '[data-test="nav_bar_header"] span.MuiTypography-root': {
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },
        '[data-test="nav_bar_header"] .MuiTypography-h5': {
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        // NavBar active links - use CSS custom property with fallback to theme
        '[data-test="nav_bar_header"] .MuiTypography-root.MuiTypography-inherit.MuiLink-root.MuiLink-underlineAlways.active-nav-link': {
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        '[data-test="nav_bar_header"] .MuiTypography-root.MuiTypography-inherit.MuiLink-root.active-nav-link': {
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        '[data-test="nav_bar_header"] .MuiLink-root.MuiTypography-h5.active-nav-link': {
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        '[data-test="nav_bar_header"] a.MuiLink-root.active-nav-link': {
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        '[data-test="nav_bar_header"] .MuiTypography-root.MuiLink-root.active-nav-link': {
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        '[data-test="nav_bar_header"] .active-nav-link': {
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        '[data-test="nav_bar_header"] a.active-nav-link': {
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        // NavBar links with aria-current
        '[data-test="nav_bar_header"] a[aria-current="page"]': {
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        '[data-test="nav_bar_header"] .MuiLink-root[aria-current="page"]': {
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        '[data-test="nav_bar_header"] [aria-current="page"]': {
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        // NavBar tabs - use CSS custom properties
        '[data-test="nav_bar_header"] .MuiTabs-root .MuiTabs-indicator': {
          backgroundColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        '[data-test="nav_bar_header"] .MuiTab-root.Mui-selected': {
          color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        // Pagination - use CSS custom properties
        '[data-component="Pagination"] button.Mui-selected, [data-component="Pagination"] button[aria-current="true"]': {
          backgroundColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
          color: `var(--theme-primary-contrastText, ${theme.palette.primary.contrastText}) !important`,
        },
      }),

      // ================================================================
      // Dark Mode Overrides
      // ================================================================
      // Only apply these overrides in dark mode
      ...(theme.palette.mode === 'dark' && {
        // ================================================================
        // Global Scoped CSS Baseline Fix (NavBar container)
        // ================================================================
        '.MuiScopedCssBaseline-root': {
          backgroundColor: '#121212 !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        // ================================================================
        // NavBar Component Overrides
        // ================================================================
        // Target the actual NavBar container
        '[data-test="nav_bar_header"]': {
          backgroundColor: '#1e1e1e !important',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12) !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        // Target all elements within NavBar - force light colors
        '[data-test="nav_bar_header"] *': {
          borderColor: 'rgba(255, 255, 255, 0.12) !important',
        },

        // NavBar text - all text elements
        '[data-test="nav_bar_header"] span, [data-test="nav_bar_header"] p, [data-test="nav_bar_header"] div': {
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        // NavBar links and buttons - use CSS custom properties with fallback
        '[data-test="nav_bar_header"] a': {
          color: 'rgba(255, 255, 255, 0.7) !important',
          textDecoration: 'none !important',
          borderBottom: '2px solid transparent',
          transition: 'all 0.2s',
          '&:hover': {
            color: 'rgba(255, 255, 255, 0.87) !important',
          },
          '&[aria-current="page"]': {
            color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
            borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
          },
        },

        // NavBar link wrapper (MuiLink)
        '[data-test="nav_bar_header"] .MuiLink-root': {
          color: 'rgba(255, 255, 255, 0.7) !important',
          textDecoration: 'none !important',
          borderBottom: '3px solid transparent',
          paddingBottom: '2px',
          transition: 'all 0.2s',
          '&:hover': {
            color: 'rgba(255, 255, 255, 0.87) !important',
            borderBottomColor: 'rgba(255, 255, 255, 0.3) !important',
          },
          '&[aria-current="page"]': {
            color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
            borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
          },
        },

        '[data-test="nav_bar_header"] button': {
          backgroundColor: '#1e1e1e !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08) !important',
          },
        },

        // NavBar MUI components
        '[data-test="nav_bar_header"] .MuiButton-root': {
          backgroundColor: '#1e1e1e !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        '[data-test="nav_bar_header"] .MuiIconButton-root': {
          backgroundColor: '#1e1e1e !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        // NavBar tabs - use CSS custom properties
        '[data-test="nav_bar_header"] .MuiTabs-root': {
          backgroundColor: '#1e1e1e !important',
          '& .MuiTabs-indicator': {
            backgroundColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
          },
        },

        '[data-test="nav_bar_header"] .MuiTab-root': {
          color: 'rgba(255, 255, 255, 0.7) !important',
          '&.Mui-selected': {
            color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
          },
        },

        // NavBar logo and application title
        '[data-test="nav_bar_header"] .MuiTypography-root': {
          backgroundColor: '#1e1e1e !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        '[data-test="nav_bar_header"] img, [data-test="nav_bar_header"] [class*="logo"]': {
          backgroundColor: '#1e1e1e !important',
        },

        // NavBar active menu items - use CSS custom properties
        '[data-test="nav_bar_header"] [aria-current="page"]': {
          color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        // Active link class (will be added by JavaScript)
        '[data-test="nav_bar_header"] a.active-nav-link': {
          color: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
          borderBottomColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
        },

        // NavBar utility buttons and icons
        '[data-test="nav_bar_header"] svg': {
          color: 'rgba(255, 255, 255, 0.87) !important',
          fill: 'rgba(255, 255, 255, 0.87) !important',
        },

        // Fallback for any NavBar-related elements
        '[data-component="NavBar"], [class*="NavBar"]': {
          backgroundColor: '#1e1e1e !important',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12) !important',
        },

        // NavBar dropdowns and popovers
        '[data-test="nav_bar_header"] [role="menu"], [class*="NavBar"] [role="menu"]': {
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        '[data-test="nav_bar_header"] [role="menuitem"], [class*="NavBar"] [role="menuitem"]': {
          color: 'rgba(255, 255, 255, 0.87) !important',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08) !important',
          },
        },

        // ================================================================
        // PageHeaderComposable Overrides
        // ================================================================
        // PageHeader root container
        '[data-test="page_header_root"]': {
          backgroundColor: '#1e1e1e !important',
        },

        // PageHeader header section - only change text colors, not layout
        '[data-test="page_header_header"]': {
          color: 'rgba(255, 255, 255, 0.87) !important',
          '& *': {
            color: 'rgba(255, 255, 255, 0.87) !important',
          },
        },

        // PageHeader title
        '[data-test="page_header_title"]': {
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        // PageHeader title status chip
        '[data-test="page_header_title_status"]': {
          backgroundColor: 'rgba(255, 255, 255, 0.09) !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        // PageHeader title - chip inside
        '[data-test="page_header_title"] .MuiChip-root': {
          backgroundColor: 'rgba(255, 255, 255, 0.09) !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        // PageHeader description
        '[data-test="page_header_description"]': {
          color: 'rgba(255, 255, 255, 0.7) !important',
        },

        // PageHeader actions area
        '[data-test="page_header_actions"]': {
          '& button': {
            color: 'rgba(255, 255, 255, 0.87) !important',
            borderColor: 'rgba(255, 255, 255, 0.23) !important',
          },
        },

        // Fallback selectors for PageHeader
        '[data-component="PageHeaderComposable"], [class*="PageHeader"]': {
          backgroundColor: '#1e1e1e !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12) !important',
        },

        '[data-component="PageHeaderComposable"] h1, [class*="PageHeader"] h1': {
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        '[data-component="PageHeaderComposable"] h2, [class*="PageHeader"] h2': {
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        '[data-component="PageHeaderComposable"] p, [class*="PageHeader"] p': {
          color: 'rgba(255, 255, 255, 0.7) !important',
        },

        // ================================================================
        // Pagination Component Overrides
        // ================================================================
        '[data-component="Pagination"], [class*="OgPagination"]': {
          '& button': {
            color: 'rgba(255, 255, 255, 0.87) !important',
            borderColor: 'rgba(255, 255, 255, 0.23) !important',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08) !important',
            },
            '&.Mui-selected, &[aria-current="true"]': {
              backgroundColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
              color: `var(--theme-primary-contrastText, ${theme.palette.primary.contrastText}) !important`,
            },
          },
          '& select': {
            color: 'rgba(255, 255, 255, 0.87) !important',
            borderColor: 'rgba(255, 255, 255, 0.23) !important',
          },
        },

        // ================================================================
        // Result Component Overrides (Empty States)
        // ================================================================
        '[data-component="Result"], [class*="OgResult"]': {
          backgroundColor: '#1e1e1e !important',
          color: 'rgba(255, 255, 255, 0.87) !important',

          '& h3, & h4, & h5': {
            color: 'rgba(255, 255, 255, 0.87) !important',
          },
          '& p': {
            color: 'rgba(255, 255, 255, 0.7) !important',
          },
          '& svg': {
            color: 'rgba(255, 255, 255, 0.5) !important',
            opacity: 0.7,
          },
        },

        // ================================================================
        // FilePreviewCard Overrides
        // ================================================================
        '[data-component="FilePreviewCard"], [class*="FilePreview"]': {
          backgroundColor: '#2d2d2d !important',
          borderColor: 'rgba(255, 255, 255, 0.12) !important',

          '& .MuiCardContent-root': {
            color: 'rgba(255, 255, 255, 0.87) !important',
          },
          '& .MuiTypography-root': {
            color: 'rgba(255, 255, 255, 0.87) !important',
          },
          '&:hover': {
            backgroundColor: '#3d3d3d !important',
          },
        },

        // ================================================================
        // AI Components Overrides (AIPromptInput, AIConversation)
        // ================================================================
        '[data-component*="AI"], [class*="OgAI"]': {
          backgroundColor: '#1e1e1e !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        '[data-component="AIPromptInput"], [class*="AIPromptInput"]': {
          '& input, & textarea': {
            color: 'rgba(255, 255, 255, 0.87) !important',
            backgroundColor: '#2d2d2d !important',
            borderColor: 'rgba(255, 255, 255, 0.23) !important',
          },
          '& .MuiInputBase-root': {
            color: 'rgba(255, 255, 255, 0.87) !important',
            backgroundColor: '#2d2d2d !important',
          },
        },

        '[data-component="AIConversation"], [class*="AIConversation"]': {
          backgroundColor: '#1e1e1e !important',

          '& .message': {
            backgroundColor: '#2d2d2d !important',
            color: 'rgba(255, 255, 255, 0.87) !important',
            borderColor: 'rgba(255, 255, 255, 0.12) !important',
          },
          '& .message.user': {
            backgroundColor: `var(--theme-primary-main, ${theme.palette.primary.main}) !important`,
            color: `var(--theme-primary-contrastText, ${theme.palette.primary.contrastText}) !important`,
          },
          '& .message.assistant': {
            backgroundColor: '#2d2d2d !important',
            color: 'rgba(255, 255, 255, 0.87) !important',
          },
        },

        // ================================================================
        // General OpenGov Component Patterns
        // ================================================================

        // All OpenGov cards
        '[class*="Og"] .MuiCard-root, [data-component*="Og"] .MuiCard-root': {
          backgroundColor: '#2d2d2d !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        // All OpenGov inputs
        '[class*="Og"] input, [data-component*="Og"] input': {
          color: 'rgba(255, 255, 255, 0.87) !important',
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.5) !important',
          },
        },

        // All OpenGov lists
        '[class*="Og"] .MuiList-root, [data-component*="Og"] .MuiList-root': {
          backgroundColor: '#2d2d2d !important',
        },

        // All OpenGov list items
        '[class*="Og"] .MuiListItem-root, [data-component*="Og"] .MuiListItem-root': {
          color: 'rgba(255, 255, 255, 0.87) !important',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08) !important',
          },
        },

        // All OpenGov dividers
        '[class*="Og"] .MuiDivider-root, [data-component*="Og"] .MuiDivider-root': {
          borderColor: 'rgba(255, 255, 255, 0.12) !important',
        },

        // All OpenGov popovers
        '[class*="Og"] .MuiPopover-paper, [data-component*="Og"] .MuiPopover-paper': {
          backgroundColor: '#2d2d2d !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
        },

        // ================================================================
        // MUI Table Overrides (for tables in dashboard and lists)
        // ================================================================
        '.MuiTable-root': {
          backgroundColor: '#1e1e1e !important',
        },

        '.MuiTableHead-root': {
          backgroundColor: '#2d2d2d !important',
        },

        '.MuiTableRow-root': {
          borderBottomColor: 'rgba(255, 255, 255, 0.12) !important',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04) !important',
          },
        },

        '.MuiTableRow-head': {
          backgroundColor: '#2d2d2d !important',
        },

        '.MuiTableCell-root': {
          color: 'rgba(255, 255, 255, 0.87) !important',
          borderBottomColor: 'rgba(255, 255, 255, 0.12) !important',
        },

        '.MuiTableCell-head': {
          color: 'rgba(255, 255, 255, 0.87) !important',
          backgroundColor: '#2d2d2d !important',
          fontWeight: 600,
        },

        '.MuiTableBody-root .MuiTableRow-root': {
          backgroundColor: '#1e1e1e !important',
          '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(255, 255, 255, 0.02) !important',
          },
        },
      }),

      // ================================================================
      // Light Mode Table Overrides
      // ================================================================
      ...(theme.palette.mode === 'light' && {
        '.MuiTableBody-root .MuiTableRow-root': {
          backgroundColor: `${capitalDesignTokens.foundations.colors.white} !important`,
        },

        // ================================================================
        // FilePreviewCard Component (@opengov/components-file-management)
        // ================================================================
        '[data-test="file-preview-card"]': {
          backgroundColor: '#2d2d2d !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
          border: '1px solid rgba(255, 255, 255, 0.12) !important',
          '&:hover': {
            backgroundColor: '#3d3d3d !important',
          },
          '& .MuiTypography-root': {
            color: 'rgba(255, 255, 255, 0.87) !important',
          },
          '& .MuiTypography-body2': {
            color: 'rgba(255, 255, 255, 0.6) !important',
          },
          // Media/Icon area border
          '& > div:first-of-type': {
            borderColor: 'rgba(255, 255, 255, 0.12) !important',
          },
          '& [class*="media"]': {
            borderColor: 'rgba(255, 255, 255, 0.12) !important',
          },
          '& [class*="preview"]': {
            borderColor: 'rgba(255, 255, 255, 0.12) !important',
          },
        },

        '.card-container': {
          backgroundColor: '#2d2d2d !important',
          color: 'rgba(255, 255, 255, 0.87) !important',
          border: '1px solid rgba(255, 255, 255, 0.12) !important',
          '&:hover': {
            backgroundColor: '#3d3d3d !important',
          },
          '& .MuiTypography-root': {
            color: 'rgba(255, 255, 255, 0.87) !important',
          },
          '& .MuiTypography-body2': {
            color: 'rgba(255, 255, 255, 0.6) !important',
          },
          // Media/Icon area border
          '& > div:first-of-type': {
            borderColor: 'rgba(255, 255, 255, 0.12) !important',
          },
          '& [class*="media"]': {
            borderColor: 'rgba(255, 255, 255, 0.12) !important',
          },
          '& [class*="preview"]': {
            borderColor: 'rgba(255, 255, 255, 0.12) !important',
          },
        },

        // ================================================================
        // Fix for hardcoded white backgrounds
        // ================================================================
        '[class*="Og"][style*="background-color: rgb(255, 255, 255)"]': {
          backgroundColor: '#2d2d2d !important',
        },

        '[class*="Og"][style*="background: white"], [class*="Og"][style*="background: #fff"]': {
          backgroundColor: '#2d2d2d !important',
        },
      }),
    }),
  },
};

/**
 * Instructions for updating OpenGov packages:
 *
 * When OpenGov packages are updated with native dark mode support:
 * 1. Test each component in dark mode
 * 2. Remove the corresponding override section above
 * 3. Document the package version that added dark mode support
 * 4. Eventually remove this entire file when all packages support dark mode
 *
 * Package versions to track:
 * - @opengov/components-nav-bar: ^37.6.3 (needs dark mode)
 * - @opengov/components-page-header: ^37.2.1 (needs dark mode)
 * - @opengov/components-pagination: ^37.0.4 (needs dark mode)
 * - @opengov/components-result: ^37.0.3 (needs dark mode)
 * - @opengov/components-file-management: ^37.1.2 (needs dark mode)
 * - @opengov/components-ai-patterns: ^37.5.2 (needs dark mode)
 */
