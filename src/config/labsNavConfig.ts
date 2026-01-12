import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
} from './navBarTypes';

// Dynamically determine active menu item based on current path
const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const labsMenuOptions: IMenuOption[] = [
  {
    label: 'Theme Editor',
    tooltipText: 'Interactive Theme Customization',
    id: 'theme-editor',
    url: '/seamstress/theme-editor',
    isActive: currentPath === '/seamstress/theme-editor',
    shouldFetchNestedMenuItems: false,
  },
];

export const labsFavoritesData: IFavoritesSection[] = [];

export const labsUtilityTrayOptions: IUtilityTrayOptions = {
  help: undefined,
  settings: undefined,
  notifications: undefined,
  profile: undefined,
  custom: [],
};

export const labsLayoutConfig = {
  appName: 'Labs',
  menuOptions: labsMenuOptions,
  favoritesData: labsFavoritesData,
  utilityTrayOptions: labsUtilityTrayOptions,
};
