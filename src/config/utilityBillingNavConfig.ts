import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
  ICreateNewActionItem,
} from './navBarTypes';

// Dynamically determine active menu item based on current path
const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const utilityBillingMenuOptions: IMenuOption[] = [
  {
    label: 'Home',
    tooltipText: 'Home',
    id: 'home',
    url: '/utility-billing/home',
    isActive: currentPath === '/utility-billing' || currentPath === '/utility-billing/' || currentPath === '/utility-billing/home',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Workflows',
    tooltipText: 'Billing Workflows',
    id: 'workflows',
    url: '/utility-billing/workflows',
    isActive: currentPath.includes('/utility-billing/workflows'),
    shouldFetchNestedMenuItems: true,
    submenuSections: [
      {
        items: [
          {
            id: 'cutoff',
            label: 'Cutoff',
            url: '/utility-billing/workflows/cutoff',
          },
        ],
      },
    ],
  },
  {
    label: 'Settings',
    tooltipText: 'Settings',
    id: 'settings',
    url: '/utility-billing/settings',
    isActive: currentPath.includes('/utility-billing/settings'),
    shouldFetchNestedMenuItems: true,
    submenuSections: [
      {
        items: [
          {
            id: 'account-number-format',
            label: 'Account Number Format',
            url: '/utility-billing/settings/account-number-format',
          },
        ],
      },
    ],
  },
];

export const utilityBillingFavorites: IFavoritesSection[] = [
  {
    id: 'billing-favorites',
    label: 'Quick Actions',
    items: [
      {
        id: 'cutoff',
        label: 'Cutoff',
        url: '/utility-billing/workflows/cutoff',
      },
      {
        id: 'account-format',
        label: 'Account Number Format',
        url: '/utility-billing/settings/account-number-format',
      },
    ],
  },
];

export const utilityBillingHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress',
          label: 'Documentation',
          description: 'Learn more about this prototype',
          openInNewTab: false,
          dataOg: 'billing_docs',
        },
      ],
    },
  ],
};

export const utilityBillingSettingsOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/utility-billing/settings/account-number-format',
          label: 'Account Number Format',
          description: 'Configure account, service, and customer number formats',
          openInNewTab: false,
        },
      ],
    },
  ],
};

export const utilityBillingNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  menuSections: [],
};

export const utilityBillingProfileSettings: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'UB',
  updateProfileUrl: '/utility-billing/profile',
  handleSignOut: () => {
    // Implement utility billing sign out logic
  },
};

export const utilityBillingUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: utilityBillingProfileSettings,
  settingsOptions: utilityBillingSettingsOptions,
  notificationsOptions: utilityBillingNotificationsOptions,
  helpOptions: utilityBillingHelpOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const utilityBillingLayoutConfig: BaseLayoutConfig = {
  appName: 'Utility Billing',
  menuOptions: utilityBillingMenuOptions,
  favoritesData: utilityBillingFavorites,
  utilityTrayOptions: utilityBillingUtilityTrayOptions,
  searchConfig: {
    filterOptions: [
      { value: 'all', label: 'All', Icon: undefined },
      { value: 'accounts', label: 'Accounts', Icon: undefined },
      { value: 'customers', label: 'Customers', Icon: undefined },
      { value: 'bills', label: 'Bills', Icon: undefined },
      { value: 'payments', label: 'Payments', Icon: undefined },
    ],
    suggestions: [
      { title: 'Account #12345', type: 'accounts', id: '0', url: '/utility-billing/accounts/12345' },
      { title: 'Customer: John Doe', type: 'customers', id: '1', url: '/utility-billing/customers/john-doe' },
      { title: 'Bill #INV-2024-001', type: 'bills', id: '2', url: '/utility-billing/bills/inv-2024-001' },
      { title: 'Recent Payments', type: 'payments', id: '3', url: '/utility-billing/payments' },
      { title: 'Account Setup', type: 'accounts', id: '4', url: '/utility-billing/accounts/new' },
    ],
  },
};
