import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
} from './navBarTypes';

const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const budgetingMenuOptions: IMenuOption[] = [
  {
    label: 'Dashboard',
    tooltipText: 'Budgeting Dashboard',
    id: 'budgeting-dashboard',
    url: '/budgeting',
    isActive: currentPath === '/budgeting' || currentPath === '/budgeting/',
    shouldFetchNestedMenuItems: false,
  },
];

export const budgetingFavoritesData: IFavoritesSection[] = [];

export const budgetingHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress',
          label: 'Documentation',
          description: 'Learn more about Budgeting',
          openInNewTab: false,
          dataOg: 'budgeting_docs',
        },
      ],
    },
  ],
};

export const budgetingSettingsOptions: UtilityOptions = {
  menuSections: [],
};

export const budgetingNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  menuSections: [],
};

export const budgetingProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'BP',
  updateProfileUrl: '/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

export const budgetingUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: budgetingProfileSettingsOptions,
  settingsOptions: budgetingSettingsOptions,
  notificationsOptions: budgetingNotificationsOptions,
  helpOptions: budgetingHelpOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const budgetingLayoutConfig: BaseLayoutConfig = {
  appName: 'Budgeting',
  menuOptions: budgetingMenuOptions,
  favoritesData: budgetingFavoritesData,
  utilityTrayOptions: budgetingUtilityTrayOptions,
  // No searchConfig - simple layout without search
};
