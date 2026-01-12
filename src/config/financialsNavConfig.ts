import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
} from './navBarTypes';

const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const financialsMenuOptions: IMenuOption[] = [
  {
    label: 'Dashboard',
    tooltipText: 'Financials Dashboard',
    id: 'financials-dashboard',
    url: '/financials/dashboard',
    isActive: currentPath.includes('/financials/dashboard') || currentPath === '/financials' || currentPath === '/financials/',
    shouldFetchNestedMenuItems: false,
  },
];

export const financialsFavoritesData: IFavoritesSection[] = [];

export const financialsHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress',
          label: 'Documentation',
          description: 'Learn more about Financials',
          openInNewTab: false,
          dataOg: 'financials_docs',
        },
      ],
    },
  ],
};

export const financialsSettingsOptions: UtilityOptions = {
  menuSections: [],
};

export const financialsNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  menuSections: [],
};

export const financialsProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'FN',
  updateProfileUrl: '/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

export const financialsUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: financialsProfileSettingsOptions,
  settingsOptions: financialsSettingsOptions,
  notificationsOptions: financialsNotificationsOptions,
  helpOptions: financialsHelpOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const financialsLayoutConfig: BaseLayoutConfig = {
  appName: 'Financials',
  menuOptions: financialsMenuOptions,
  favoritesData: financialsFavoritesData,
  utilityTrayOptions: financialsUtilityTrayOptions,
};
