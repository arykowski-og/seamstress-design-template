import type {
  IMenuOption,
  IUtilityTrayOptions,
  IFavoritesSection,
  IProfileSettingsOptions,
  UtilityOptions,
} from './navBarTypes';

const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

export const workflowBuilderMenuOptions: IMenuOption[] = [
  {
    label: 'Dashboard',
    tooltipText: 'Workflow Builder Dashboard',
    id: 'workflow-builder-dashboard',
    url: '/workflow-builder',
    isActive: currentPath === '/workflow-builder' || currentPath === '/workflow-builder/',
    shouldFetchNestedMenuItems: false,
  },
];

export const workflowBuilderFavoritesData: IFavoritesSection[] = [];

export const workflowBuilderUtilityTrayOptions: IUtilityTrayOptions = {
  profileSettingsOptions: {
    profileImgUrl: '',
    placeHolderInitials: 'WB',
    updateProfileUrl: '/profile',
    handleSignOut: () => {},
  },
  settingsOptions: { menuSections: [] },
  notificationsOptions: { badgeContent: 0, menuSections: [] },
  helpOptions: {
    menuSections: [{
      menuItems: [{
        url: '/seamstress',
        label: 'Documentation',
        description: 'Learn more about Workflow Builder',
        openInNewTab: false,
        dataOg: 'workflow_builder_docs',
      }],
    }],
  },
};

// BaseLayout configuration
import type { BaseLayoutConfig } from '../components/BaseLayout';

export const workflowBuilderLayoutConfig: BaseLayoutConfig = {
  appName: 'Workflow Builder',
  menuOptions: workflowBuilderMenuOptions,
  favoritesData: workflowBuilderFavoritesData,
  utilityTrayOptions: workflowBuilderUtilityTrayOptions,
};
