import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
} from './navBarTypes';

// Dynamically determine active menu item based on current path
const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const prototypesMenuOptions: IMenuOption[] = [
  {
    label: 'Gallery',
    tooltipText: 'View all prototypes',
    id: 'prototypes-overview',
    url: '/prototypes',
    isActive: currentPath === '/prototypes',
    shouldFetchNestedMenuItems: false,
  },
];

export const prototypesFavoritesData: IFavoritesSection[] = [];

const prototypesHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress',
          label: 'Seamstress Docs',
          description: 'Learn how these were built',
          openInNewTab: false,
          dataOg: 'prototypes_seamstress_docs',
        },
        {
          url: '/seamstress/building-from-figma',
          label: 'Building from Figma',
          description: 'Figma-to-code workflow',
          openInNewTab: false,
          dataOg: 'prototypes_figma_guide',
        },
      ],
    },
  ],
};

const prototypesSettingsOptions: UtilityOptions = {
  menuSections: [],
};

const prototypesNotificationsOptions: UtilityOptions = {
  badgeContent: 0,
  menuSections: [],
};

const prototypesProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'OP',
  updateProfileUrl: '/prototypes/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

export const prototypesThemeMenuSections = [
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

export const prototypesUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: prototypesProfileSettingsOptions,
  settingsOptions: prototypesSettingsOptions,
  helpOptions: prototypesHelpOptions,
  notificationsOptions: prototypesNotificationsOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const prototypesLayoutConfig: BaseLayoutConfig = {
  appName: 'Prototypes',
  menuOptions: prototypesMenuOptions,
  favoritesData: prototypesFavoritesData,
  utilityTrayOptions: prototypesUtilityTrayOptions,
  searchConfig: {
    filterOptions: [
      { value: 'all', label: 'All', Icon: undefined },
      { value: 'prototypes', label: 'Prototypes', Icon: undefined },
      { value: 'components', label: 'Components', Icon: undefined },
      { value: 'patterns', label: 'Patterns', Icon: undefined },
    ],
    suggestions: [
      { title: 'EAM Dashboard', type: 'prototypes', id: '0', url: '/prototypes/eam' },
      { title: 'Procurement Flow', type: 'prototypes', id: '1', url: '/prototypes/procurement' },
      { title: 'List View Pattern', type: 'patterns', id: '2', url: '/prototypes/patterns/list' },
      { title: 'Form Pattern', type: 'patterns', id: '3', url: '/prototypes/patterns/form' },
      { title: 'Component Library', type: 'components', id: '4', url: '/prototypes/components' },
    ],
  },
};
