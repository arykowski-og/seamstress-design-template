import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
} from './navBarTypes';

const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const commandCenterMenuOptions: IMenuOption[] = [
  {
    label: 'Dashboard',
    tooltipText: 'Command Center Dashboard',
    id: 'command-center-dashboard',
    url: '/command-center',
    isActive: currentPath === '/command-center' || currentPath === '/command-center/',
    shouldFetchNestedMenuItems: false,
  },
];

export const commandCenterFavoritesData: IFavoritesSection[] = [];

export const commandCenterHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress',
          label: 'Documentation',
          description: 'Learn more about Command Center',
          openInNewTab: false,
          dataOg: 'command_center_docs',
        },
      ],
    },
  ],
};

export const commandCenterSettingsOptions: UtilityOptions = {
  menuSections: [],
};

export const commandCenterNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  menuSections: [],
};

export const commandCenterProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'CC',
  updateProfileUrl: '/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

export const commandCenterUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: commandCenterProfileSettingsOptions,
  settingsOptions: commandCenterSettingsOptions,
  notificationsOptions: commandCenterNotificationsOptions,
  helpOptions: commandCenterHelpOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const commandCenterLayoutConfig: BaseLayoutConfig = {
  appName: 'Command Center',
  menuOptions: commandCenterMenuOptions,
  favoritesData: commandCenterFavoritesData,
  utilityTrayOptions: commandCenterUtilityTrayOptions,
};
