import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
} from './navBarTypes';

const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const reportsMenuOptions: IMenuOption[] = [
  {
    label: 'Dashboard',
    tooltipText: 'Reports Dashboard',
    id: 'reports-dashboard',
    url: '/reports',
    isActive: currentPath === '/reports' || currentPath === '/reports/',
    shouldFetchNestedMenuItems: false,
  },
];

export const reportsFavoritesData: IFavoritesSection[] = [];

export const reportsHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress',
          label: 'Documentation',
          description: 'Learn more about Reports',
          openInNewTab: false,
          dataOg: 'reports_docs',
        },
      ],
    },
  ],
};

export const reportsSettingsOptions: UtilityOptions = {
  menuSections: [],
};

export const reportsNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  menuSections: [],
};

export const reportsProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'RD',
  updateProfileUrl: '/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

export const reportsUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: reportsProfileSettingsOptions,
  settingsOptions: reportsSettingsOptions,
  notificationsOptions: reportsNotificationsOptions,
  helpOptions: reportsHelpOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const reportsLayoutConfig: BaseLayoutConfig = {
  appName: 'Reports',
  menuOptions: reportsMenuOptions,
  favoritesData: reportsFavoritesData,
  utilityTrayOptions: reportsUtilityTrayOptions,
};
