import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
} from './navBarTypes';

const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const tasksMenuOptions: IMenuOption[] = [
  {
    label: 'Dashboard',
    tooltipText: 'Tasks Dashboard',
    id: 'tasks-dashboard',
    url: '/tasks',
    isActive: currentPath === '/tasks' || currentPath === '/tasks/',
    shouldFetchNestedMenuItems: false,
  },
];

export const tasksFavoritesData: IFavoritesSection[] = [];

export const tasksHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress',
          label: 'Documentation',
          description: 'Learn more about Tasks',
          openInNewTab: false,
          dataOg: 'tasks_docs',
        },
      ],
    },
  ],
};

export const tasksSettingsOptions: UtilityOptions = {
  menuSections: [],
};

export const tasksNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  menuSections: [],
};

export const tasksProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'TN',
  updateProfileUrl: '/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

export const tasksUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: tasksProfileSettingsOptions,
  settingsOptions: tasksSettingsOptions,
  notificationsOptions: tasksNotificationsOptions,
  helpOptions: tasksHelpOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const tasksLayoutConfig: BaseLayoutConfig = {
  appName: 'Tasks',
  menuOptions: tasksMenuOptions,
  favoritesData: tasksFavoritesData,
  utilityTrayOptions: tasksUtilityTrayOptions,
};
