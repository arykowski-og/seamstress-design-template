import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
} from './navBarTypes';

const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const programsMenuOptions: IMenuOption[] = [
  {
    label: 'Dashboard',
    tooltipText: 'Programs Dashboard',
    id: 'programs-dashboard',
    url: '/programs',
    isActive: currentPath === '/programs' || currentPath === '/programs/',
    shouldFetchNestedMenuItems: false,
  },
];

export const programsFavoritesData: IFavoritesSection[] = [];

export const programsHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress',
          label: 'Documentation',
          description: 'Learn more about Programs',
          openInNewTab: false,
          dataOg: 'programs_docs',
        },
      ],
    },
  ],
};

export const programsSettingsOptions: UtilityOptions = {
  menuSections: [],
};

export const programsNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  menuSections: [],
};

export const programsProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'PP',
  updateProfileUrl: '/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

export const programsUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: programsProfileSettingsOptions,
  settingsOptions: programsSettingsOptions,
  notificationsOptions: programsNotificationsOptions,
  helpOptions: programsHelpOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const programsLayoutConfig: BaseLayoutConfig = {
  appName: 'Programs',
  menuOptions: programsMenuOptions,
  favoritesData: programsFavoritesData,
  utilityTrayOptions: programsUtilityTrayOptions,
};
