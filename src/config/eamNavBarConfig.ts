import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
} from './navBarTypes';

// Dynamically determine active menu item based on current path
const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const eamMenuOptions: IMenuOption[] = [
  {
    label: 'Dashboard',
    tooltipText: 'Operations Dashboard',
    id: 'eam-dashboard',
    url: '/eam/dashboard',
    isActive: currentPath === '/eam/dashboard' || currentPath === '/eam' || currentPath === '/eam/',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Analytics',
    tooltipText: 'Asset & Work Management Analytics',
    id: 'eam-analytics',
    url: '/eam/analytics',
    isActive: currentPath.includes('/eam/analytics'),
    shouldFetchNestedMenuItems: false,
  },
];

export const eamFavoritesData: IFavoritesSection[] = [];

export const eamHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress',
          label: 'Documentation',
          description: 'Learn more about this prototype',
          openInNewTab: false,
          dataOg: 'eam_docs',
        },
      ],
    },
  ],
};

export const eamSettingsOptions: UtilityOptions = {
  menuSections: [],
};

export const eamNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  menuSections: [],
};

export const eamProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'JD',
  updateProfileUrl: '/eam/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

export const eamThemeMenuSections = [
  {
    menuItems: [
      {
        url: '#',
        label: 'Light Mode',
        description: 'Switch to light theme',
        openInNewTab: false,
        dataOg: 'theme_light',
      },
      {
        url: '#',
        label: 'Dark Mode',
        description: 'Switch to dark theme',
        openInNewTab: false,
        dataOg: 'theme_dark',
      },
    ],
  },
];

export const eamUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: eamProfileSettingsOptions,
  settingsOptions: eamSettingsOptions,
  notificationsOptions: eamNotificationsOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const eamLayoutConfig: BaseLayoutConfig = {
  appName: 'Enterprise Asset Management',
  menuOptions: eamMenuOptions,
  favoritesData: eamFavoritesData,
  utilityTrayOptions: eamUtilityTrayOptions,
  searchConfig: {
    filterOptions: [
      { value: 'all', label: 'All', Icon: undefined },
      { value: 'work-orders', label: 'Work Orders', Icon: undefined },
      { value: 'assets', label: 'Assets', Icon: undefined },
      { value: 'maintenance', label: 'Maintenance', Icon: undefined },
    ],
    suggestions: [
      { title: 'Work Order #WO-2847', type: 'work-orders', id: '0', url: '/eam/work-orders/2847' },
      { title: 'Asset: HVAC Unit #12', type: 'assets', id: '1', url: '/eam/assets/hvac-12' },
      { title: 'Create Work Order', type: 'work-orders', id: '2', url: '/eam/work-orders/new' },
      { title: 'PM Schedule Dashboard', type: 'maintenance', id: '3', url: '/eam/maintenance/schedule' },
      { title: 'Asset Performance Report', type: 'assets', id: '4', url: '/eam/reports/asset-performance' },
    ],
  },
};
