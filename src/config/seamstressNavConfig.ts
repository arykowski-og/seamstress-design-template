import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
  CustomUtilityOptions,
} from './navBarTypes';
import { Palette as PaletteIcon } from '@mui/icons-material';

// Dynamically determine active menu item based on current path
const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const seamstressMenuOptions: IMenuOption[] = [
  {
    label: 'Overview',
    tooltipText: 'Introduction to Seamstress',
    id: 'overview',
    url: '/seamstress',
    isActive: currentPath === '/seamstress',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'How It Works',
    tooltipText: 'Skills, Patterns & Generation Process',
    id: 'how-it-works',
    url: '/seamstress/how-it-works',
    isActive: currentPath === '/seamstress/how-it-works',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Skills Reference',
    tooltipText: 'All 12 Skills Catalog',
    id: 'skills-reference',
    url: '/seamstress/skills-reference',
    isActive: currentPath === '/seamstress/skills-reference',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Getting Started',
    tooltipText: 'Quick Start Guide',
    id: 'getting-started',
    url: '/seamstress/getting-started',
    isActive: currentPath === '/seamstress/getting-started',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Building from Figma',
    tooltipText: 'Figma-to-Code Workflow Guide',
    id: 'building-from-figma',
    url: '/seamstress/building-from-figma',
    isActive: currentPath === '/seamstress/building-from-figma',
    shouldFetchNestedMenuItems: false,
  },
  {
    label: 'Testing',
    tooltipText: 'Validate & Troubleshoot',
    id: 'testing',
    url: '/seamstress/testing',
    isActive: currentPath === '/seamstress/testing',
    shouldFetchNestedMenuItems: false,
  },
];

export const seamstressFavoritesData: IFavoritesSection[] = [];

const seamstressHelpOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress/help',
          label: 'Documentation',
          description: 'Browse complete documentation',
          openInNewTab: false,
          dataOg: 'seamstress_docs',
        },
        {
          url: '/seamstress/tutorials',
          label: 'Tutorials',
          description: 'Step-by-step guides',
          openInNewTab: false,
          dataOg: 'seamstress_tutorials',
        },
        {
          url: '/seamstress/faq',
          label: 'FAQ',
          description: 'Frequently asked questions',
          dataOg: 'seamstress_faq',
        },
        {
          url: 'https://github.com/seamstress/seamstress',
          label: 'GitHub',
          description: 'View source code and contribute',
          openInNewTab: true,
          dataOg: 'seamstress_github',
        },
        {
          url: '/seamstress/support',
          label: 'Support',
          description: 'Get help from the team',
          openInNewTab: false,
          dataOg: 'seamstress_support',
        },
      ],
    },
  ],
};

const seamstressSettingsOptions: UtilityOptions = {
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress/settings/preferences',
          label: 'Preferences',
          description: 'Customize your experience',
          openInNewTab: false,
        },
        {
          url: '/seamstress/settings/theme',
          label: 'Theme Settings',
          description: 'Choose your theme',
          openInNewTab: false,
        },
        {
          url: '/seamstress/settings/keyboard',
          label: 'Keyboard Shortcuts',
          description: 'View and customize shortcuts',
        },
      ],
    },
  ],
};

const seamstressNotificationsOptions: UtilityOptions = {
  badgeContent: 2,
  menuSections: [
    {
      menuItems: [
        {
          url: '/seamstress/updates/1',
          label: 'New Components Released',
          description: '5 new components added to the library',
          openInNewTab: false,
          dataOg: 'seamstress_update_1',
        },
        {
          url: '/seamstress/updates/2',
          label: 'Design System Update',
          description: 'Color palette refreshed for better accessibility',
          openInNewTab: false,
          dataOg: 'seamstress_update_2',
        },
      ],
    },
  ],
};

const seamstressProfileSettingsOptions: IProfileSettingsOptions = {
  profileImgUrl: '',
  placeHolderInitials: 'SM',
  updateProfileUrl: '/seamstress/profile',
  handleSignOut: () => {
    // Implement sign out logic
  },
};

// Theme Editor Custom Utility
const seamstressThemeEditorOptions: CustomUtilityOptions = {
  utilityName: 'Theme Editor',
  muiIcon: PaletteIcon,
  iconOnClickOverride: () => {
    // This will be called when the icon is clicked
    if ((window as any).openThemeEditor) {
      (window as any).openThemeEditor();
    }
  },
  menuSections: [], // No menu, just button click
};

export const seamstressUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: seamstressProfileSettingsOptions,
  settingsOptions: seamstressSettingsOptions,
  helpOptions: seamstressHelpOptions,
  notificationsOptions: seamstressNotificationsOptions,
  customUtilityOptions: seamstressThemeEditorOptions,
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const seamstressLayoutConfig: BaseLayoutConfig = {
  appName: 'Seamstress',
  menuOptions: seamstressMenuOptions,
  favoritesData: undefined,
  utilityTrayOptions: seamstressUtilityTrayOptions,
  searchConfig: {
    filterOptions: [
      { value: 'all', label: 'All', Icon: undefined },
      { value: 'docs', label: 'Documentation', Icon: undefined },
      { value: 'patterns', label: 'Patterns', Icon: undefined },
      { value: 'examples', label: 'Examples', Icon: undefined },
    ],
    suggestions: [
      { title: 'Getting Started', type: 'docs', id: '0', url: '/seamstress/getting-started' },
      { title: 'How It Works', type: 'docs', id: '1', url: '/seamstress/how-it-works' },
      { title: 'List Pattern', type: 'patterns', id: '2', url: '/seamstress/patterns/list' },
      { title: 'Form Pattern', type: 'patterns', id: '3', url: '/seamstress/patterns/form' },
      { title: 'Example Projects', type: 'examples', id: '4', url: '/seamstress/examples' },
    ],
  },
};