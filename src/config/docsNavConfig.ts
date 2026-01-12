import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
} from './navBarTypes';

// Dynamically determine active menu item based on current path
const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const docsMenuOptions: IMenuOption[] = [
  {
    label: 'Overview',
    tooltipText: 'Design System Introduction',
    id: 'overview',
    url: '/docs/overview',
    isActive: currentPath === '/docs/overview' || currentPath === '/docs',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Theme System',
    tooltipText: 'Theme Tokens, Colors & Typography',
    id: 'theme-system',
    url: '/docs/theme-system',
    isActive: currentPath === '/docs/theme-system',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Layout Rules',
    tooltipText: 'Page Structure & Grid Systems',
    id: 'layout-rules',
    url: '/docs/layout-rules',
    isActive: currentPath === '/docs/layout-rules',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Component Patterns',
    tooltipText: 'UI Patterns & Best Practices',
    id: 'component-patterns',
    url: '/docs/component-patterns',
    isActive: currentPath === '/docs/component-patterns',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Data Visualization',
    tooltipText: 'Chart Colors & Data Viz Palette',
    id: 'data-visualization',
    url: '/docs/data-visualization',
    isActive: currentPath === '/docs/data-visualization',
    shouldFetchNestedMenuItems: false,
  },
];

export const docsFavoritesData: IFavoritesSection[] = [];

export const docsUtilityTrayOptions: IUtilityTrayOptions = {
  help: undefined,
  settings: undefined,
  notifications: undefined,
  profile: undefined,
  custom: [],
};

export const docsLayoutConfig = {
  appName: 'Documentation',
  menuOptions: docsMenuOptions,
  favoritesData: undefined,
  utilityTrayOptions: docsUtilityTrayOptions,
};
