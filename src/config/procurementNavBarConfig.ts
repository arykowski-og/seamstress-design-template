import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
} from './navBarTypes';

// Dynamically determine active menu item based on current path
const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const procurementMenuOptions: IMenuOption[] = [
  {
    label: 'Dashboard',
    tooltipText: 'Procurement Dashboard',
    id: 'procurement-dashboard',
    url: '/procurement/dashboard',
    isActive: currentPath.includes('/procurement/dashboard') || currentPath === '/procurement' || currentPath === '/procurement/',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Projects',
    tooltipText: 'Procurement Projects',
    id: 'procurement-projects',
    url: '/procurement/projects',
    isActive: currentPath.includes('/procurement/projects'),
    shouldFetchNestedMenuItems: false,
  },
];

export const procurementFavoritesData: IFavoritesSection[] = [];

export const procurementHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress',
          label: 'Documentation',
          description: 'Learn more about this prototype',
          openInNewTab: false,
          dataOg: 'procurement_docs',
        },
      ],
    },
  ],
};

export const procurementSettingsOptions: UtilityOptions = {
  menuSections: [],
};

export const procurementNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  menuSections: [],
};

export const procurementProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'JD',
  updateProfileUrl: '/procurement/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

export const procurementThemeMenuSections = [
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

export const procurementUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: procurementProfileSettingsOptions,
  settingsOptions: procurementSettingsOptions,
  notificationsOptions: procurementNotificationsOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const procurementLayoutConfig: BaseLayoutConfig = {
  appName: 'Procurement',
  menuOptions: procurementMenuOptions,
  favoritesData: procurementFavoritesData,
  utilityTrayOptions: procurementUtilityTrayOptions,
  searchConfig: {
    filterOptions: [
      { value: 'all', label: 'All', Icon: undefined },
      { value: 'projects', label: 'Projects', Icon: undefined },
      { value: 'requests', label: 'Requests', Icon: undefined },
      { value: 'contracts', label: 'Contracts', Icon: undefined },
      { value: 'vendors', label: 'Vendors', Icon: undefined },
    ],
    suggestions: [
      { title: 'Agricultural Supplies', type: 'projects', id: '0', url: '/procurement/projects/agricultural-supplies' },
      { title: 'Office Furniture', type: 'projects', id: '1', url: '/procurement/projects/office-furniture' },
      { title: 'IT Equipment Request', type: 'requests', id: '2', url: '/procurement/requests/it-equipment' },
      { title: 'Vendor: ABC Supply Co.', type: 'vendors', id: '3', url: '/procurement/vendors/abc-supply' },
      { title: 'Contract #C-2024-015', type: 'contracts', id: '4', url: '/procurement/contracts/c-2024-015' },
    ],
  },
};
