import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
} from './navBarTypes';

const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const permittingMenuOptions: IMenuOption[] = [
  {
    label: 'Dashboard',
    tooltipText: 'Permitting Dashboard',
    id: 'permitting-dashboard',
    url: '/permitting',
    isActive: currentPath === '/permitting' || currentPath === '/permitting/',
    shouldFetchNestedMenuItems: false,
  },
];

export const permittingFavoritesData: IFavoritesSection[] = [];

export const permittingHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress',
          label: 'Documentation',
          description: 'Learn more about Permitting',
          openInNewTab: false,
          dataOg: 'permitting_docs',
        },
      ],
    },
  ],
};

export const permittingSettingsOptions: UtilityOptions = {
  menuSections: [],
};

export const permittingNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  menuSections: [],
};

export const permittingProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'PL',
  updateProfileUrl: '/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

export const permittingUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: permittingProfileSettingsOptions,
  settingsOptions: permittingSettingsOptions,
  notificationsOptions: permittingNotificationsOptions,
  helpOptions: permittingHelpOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const permittingLayoutConfig: BaseLayoutConfig = {
  appName: 'Permitting',
  menuOptions: permittingMenuOptions,
  favoritesData: permittingFavoritesData,
  utilityTrayOptions: permittingUtilityTrayOptions,
};
