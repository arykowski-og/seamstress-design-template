import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
} from './navBarTypes';

const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const appBuilderMenuOptions: IMenuOption[] = [
  {
    label: 'Dashboard',
    tooltipText: 'App Builder Operations Dashboard',
    id: 'app-builder-dashboard',
    url: '/app-builder/dashboard',
    isActive: currentPath === '/app-builder' || currentPath === '/app-builder/' || currentPath === '/app-builder/dashboard',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'App Library',
    tooltipText: 'Browse Applications',
    id: 'app-library',
    url: '/app-builder/library',
    isActive: currentPath.includes('/app-builder/library'),
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Templates',
    tooltipText: 'App Templates',
    id: 'app-templates',
    url: '/app-builder/templates',
    isActive: currentPath.includes('/app-builder/templates'),
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Settings',
    tooltipText: 'App Builder Settings',
    id: 'app-settings',
    url: '/app-builder/settings',
    isActive: currentPath.includes('/app-builder/settings'),
    shouldFetchNestedMenuItems: false,
  },
];

export const appBuilderFavoritesData: IFavoritesSection[] = [];

export const appBuilderHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress',
          label: 'Documentation',
          description: 'Learn more about App Builder',
          openInNewTab: false,
          dataOg: 'app_builder_docs',
        },
      ],
    },
  ],
};

export const appBuilderSettingsOptions: UtilityOptions = {
  menuSections: [],
};

export const appBuilderNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  menuSections: [],
};

export const appBuilderProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'AB',
  updateProfileUrl: '/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

export const appBuilderUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: appBuilderProfileSettingsOptions,
  settingsOptions: appBuilderSettingsOptions,
  notificationsOptions: appBuilderNotificationsOptions,
  helpOptions: appBuilderHelpOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const appBuilderLayoutConfig: BaseLayoutConfig = {
  appName: 'App Builder',
  menuOptions: appBuilderMenuOptions,
  favoritesData: appBuilderFavoritesData,
  utilityTrayOptions: appBuilderUtilityTrayOptions,
};
