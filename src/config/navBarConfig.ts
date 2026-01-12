import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
  CustomUtilityOptions,
} from './navBarTypes';
import { Palette as PaletteIcon, Chat as ChatIcon } from '@mui/icons-material';

// Dynamically determine active menu item based on current path
const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const menuOptions: IMenuOption[] = [
  {
    label: 'Dashboard',
    tooltipText: 'View Dashboard',
    id: 'dashboard',
    url: '/agent-studio/dashboard',
    isActive: currentPath === '/agent-studio/dashboard',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Assistants',
    tooltipText: 'Manage Agents',
    id: 'agents',
    url: '/agent-studio/agents',
    isActive: currentPath === '/agent-studio/agents' || currentPath.includes('/agent-studio/agents/'),
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Skills',
    tooltipText: 'Manage Skills',
    id: 'skills',
    url: '/agent-studio/skills',
    isActive: currentPath === '/agent-studio/skills' || currentPath.includes('/agent-studio/skills/'),
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Tools',
    tooltipText: 'Manage Tools',
    id: 'tools',
    url: '/agent-studio/tools',
    isActive: currentPath === '/agent-studio/tools',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Knowledge',
    tooltipText: 'Knowledge Base',
    id: 'knowledge',
    url: '/agent-studio/knowledge',
    isActive: currentPath === '/agent-studio/knowledge',
    shouldFetchNestedMenuItems: false,
  }
];

export const favoritesData: IFavoritesSection[] = [];

// Workspace Chat as Help Utility (using ChatIcon)
export const helpOptions: CustomUtilityOptions = {
  utilityName: 'Workspace Chat',
  muiIcon: ChatIcon,
  iconOnClickOverride: () => {
    if ((window as any).openWorkspaceChat) {
      (window as any).openWorkspaceChat();
    }
  },
  menuSections: [],
};

export const settingsOptions: UtilityOptions = {
  badgeVariant: 'dot',
  menuSections: [
    {
      menuItems: [
        {
          url: '/settings/account',
          label: 'Account Settings',
          description: 'Manage your account preferences',
          openInNewTab: false,
        },
        {
          url: '/settings/notifications',
          label: 'Notifications',
          description: 'Configure notification preferences',
          openInNewTab: false,
        },
        {
          url: '/settings/security',
          label: 'Security',
          description: 'Manage security settings',
        },
        {
          url: '/settings/api',
          label: 'API Settings',
          description: 'Configure API access and keys',
          openInNewTab: false,
        },
      ],
    },
  ],
};

export const notificationsOptions: UtilityOptions = {
  badgeContent: 3,
  menuSections: [
    {
      menuItems: [
        {
          url: '/notifications/1',
          label: 'New agent deployed',
          description: 'Agent-001 has been successfully deployed',
          openInNewTab: false,
          dataOg: 'notification_1',
        },
        {
          url: '/notifications/2',
          label: 'Workflow completed',
          description: 'Data processing workflow finished',
          openInNewTab: false,
          dataOg: 'notification_2',
        },
        {
          url: '/notifications/3',
          label: 'System update available',
          description: 'Version 2.1.0 is ready to install',
          openInNewTab: false,
          dataOg: 'notification_3',
        },
      ],
    },
  ],
};

export const profileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'JD',
  updateProfileUrl: '/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

// Note: OG Assist button is now configured using unstable_ogAgentOptions in AppLayout
// instead of createNewActionOptions

export const themeMenuSections = [
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

export const utilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions,
  settingsOptions,
  notificationsOptions,
  helpOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const appLayoutConfig: BaseLayoutConfig = {
  appName: 'Agent Studio',
  menuOptions,
  favoritesData,
  utilityTrayOptions,
  searchConfig: {
    filterOptions: [
      { value: 'all', label: 'All', Icon: undefined },
      { value: 'agents', label: 'Agents', Icon: undefined },
      { value: 'workflows', label: 'Workflows', Icon: undefined },
      { value: 'analytics', label: 'Analytics', Icon: undefined },
    ],
    suggestions: [
      { title: 'Agent Performance', type: 'analytics', id: '0', url: '/analytics/agents' },
      { title: 'Create New Agent', type: 'agents', id: '1', url: '/agents/new' },
      { title: 'Active Agents', type: 'agents', id: '2', url: '/agents?status=active' },
      { title: 'Workflow Templates', type: 'workflows', id: '3', url: '/workflows/templates' },
      { title: 'Usage Reports', type: 'analytics', id: '4', url: '/analytics/usage' },
    ],
  },
};