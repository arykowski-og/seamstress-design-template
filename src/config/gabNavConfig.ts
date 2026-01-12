import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
  ISearchOptions,
} from './navBarTypes';

// Dynamically determine active menu item based on current path
const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

/**
 * Government App Builder (GAB) Navigation Configuration
 * Based on Figma design: GAB Navigation (node-id=1:15143)
 */

export const gabMenuOptions: IMenuOption[] = [
  {
    label: 'App Library',
    tooltipText: 'Browse available applications',
    id: 'gab-app-library',
    url: '/gab/app-library',
    isActive: currentPath === '/gab/app-library' || currentPath.includes('/gab/app-library/'),
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Community',
    tooltipText: 'Community apps and resources',
    id: 'gab-community',
    url: '/gab/community-v2',
    isActive: currentPath === '/gab/community-v2' || currentPath.includes('/gab/community-v2/'),
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Account Manager',
    tooltipText: 'Manage your account',
    id: 'gab-account-manager',
    url: '/gab/account-manager',
    isActive: currentPath === '/gab/account-manager' || currentPath.includes('/gab/account-manager/'),
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Manage Clients',
    tooltipText: 'Client management',
    id: 'gab-manage-clients',
    url: '/gab/manage-clients',
    isActive: currentPath === '/gab/manage-clients' || currentPath.includes('/gab/manage-clients/'),
    shouldFetchNestedMenuItems: false,
  },
];

export const gabFavoritesData: IFavoritesSection[] = [];

export const gabHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: 'https://docs.opengov.com/app-builder',
          label: 'App Builder Documentation',
          description: 'Browse guides and documentation',
          openInNewTab: true,
          dataOg: 'gab_help_docs',
        },
        {
          url: '/help/getting-started',
          label: 'Getting Started',
          description: 'Quick start guide',
          openInNewTab: false,
          dataOg: 'gab_getting_started',
        },
        {
          url: '/help/tutorials',
          label: 'Tutorials',
          description: 'Step-by-step tutorials',
          openInNewTab: false,
          dataOg: 'gab_tutorials',
        },
        {
          url: 'https://updates.opengov.com',
          label: "What's New",
          description: 'Latest features and updates',
          openInNewTab: true,
          dataOg: 'gab_whats_new',
        },
        {
          url: '/help/support',
          label: 'Contact Support',
          description: 'Get help from our team',
          openInNewTab: false,
          dataOg: 'gab_support',
        },
      ],
    },
  ],
};

export const gabSettingsOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/settings/general',
          label: 'General Settings',
          description: 'App Builder preferences',
          openInNewTab: false,
        },
        {
          url: '/settings/apps',
          label: 'App Settings',
          description: 'Manage installed apps',
          openInNewTab: false,
        },
        {
          url: '/settings/integrations',
          label: 'Integrations',
          description: 'Connect external services',
          openInNewTab: false,
        },
        {
          url: '/settings/permissions',
          label: 'Permissions',
          description: 'User roles and access',
          openInNewTab: false,
        },
      ],
    },
  ],
};

export const gabNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  badgeVariant: 'dot', // Shows dot badge as seen in Figma design
  menuSections: [
    {
      menuItems: [
        {
          url: '/notifications',
          label: 'View All Notifications',
          description: 'See all notifications',
          openInNewTab: false,
          dataOg: 'gab_all_notifications',
        },
      ],
    },
  ],
};

export const gabProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'JA', // Matches the avatar in Figma design
  updateProfileUrl: '/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

export const gabSearchOptions: ISearchOptions = {
  handleSearchIconClick: () => {
    // Implement search functionality
  },
};

export const gabUtilityTrayOptions: IUtilityTrayOptions = {
  searchOptions: gabSearchOptions,
  profileSettingsOptions: gabProfileSettingsOptions,
  settingsOptions: gabSettingsOptions,
  helpOptions: gabHelpOptions,
  notificationsOptions: gabNotificationsOptions,
};
