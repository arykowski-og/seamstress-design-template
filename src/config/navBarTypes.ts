import type { ComponentType, MouseEvent } from 'react';

// Type for custom link components (e.g., React Router Link)
export type LinkComponent = ComponentType<{
  to?: string;
  href?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}>;

export interface IFavoritesSection {
  id: string;
  label?: string;
  items: IMenuItem[];
}

export interface ISubmenuSection {
  title?: string;
  items?: IMenuItem[];
}

export type IMenuItem = {
  id: string;
  label: string;
  shouldFetchNestedMenuItems?: boolean;
  submenuSections?: ISubmenuSection[];
  openInNewTab?: boolean;
  url?: string;
  linkComponent?: LinkComponent;
  onClick?(): void;
};

export interface IMenuOption {
  id: string;
  tooltipText?: string;
  label: string;
  submenuSections?: ISubmenuSection[];
  maxWidth?: string;
  shouldFetchNestedMenuItems?: boolean;
  counterAdornmentValue?: number;
  openInNewTab?: boolean;
  isActive?: boolean;
  linkComponent?: LinkComponent;
  url?: string;
  onClick?(): void;
}

export interface IUpdatedIdOrder {
  id: string;
  updatedIdOrder: string[];
}

export interface ISearchOptions {
  handleSearchIconClick(): void;
}

export interface IUtilityTrayOptions {
  searchOptions?: ISearchOptions;
  profileSettingsOptions: IProfileSettingsOptions;
  settingsOptions?: UtilityOptions;
  helpOptions?: UtilityOptions;
  reportsOptions?: UtilityOptions;
  notificationsOptions?: UtilityOptions;
  customUtilityOptions?: CustomUtilityOptions;
}

// ICreateNewActionItem is now imported from @opengov/components-nav-bar
// Use unstable_ogAgentOptions for OG Assist integration instead

// Type for MUI icons (SvgIcon component)
export type MuiIconComponent = ComponentType<{
  className?: string;
  fontSize?: 'small' | 'medium' | 'large';
  color?: string;
  [key: string]: unknown;
}>;

// Auth0 configuration type
export interface Auth0Config {
  domain: string;
  clientId: string;
  audience?: string;
  redirectUri?: string;
  [key: string]: unknown;
}

export interface IProfileSettingsOptions {
  placeHolderInitials?: string;
  updateProfileUrl?: string;
  updateProfileLinkComponent?: LinkComponent;
  profileImgUrl?: string;
  updateProfileOnClick?(): void;
  handleSignOut?(): void;
}

export type UtilityTrayMenuItem = {
  label: string;
  dataOg?: string;
  description?: string;
  openInNewTab?: boolean;
  url?: string;
  linkComponent?: LinkComponent;
  onClick?(): void;
};

export type UtilityTrayMenuSection = {
  label?: string;
  menuItems: UtilityTrayMenuItem[];
};

export type BadgeVariant = 'dot' | 'standard';

export type UtilityOptions = {
  menuSections: UtilityTrayMenuSection[];
  openInNewTab?: boolean;
  badgeContent?: number;
  badgeVariant?: BadgeVariant;
  iconUrl?: string;
  iconLinkComponent?: LinkComponent;
  iconOnClickOverride?(event: MouseEvent): void;
};

export type CustomUtilityOptions = UtilityOptions & {
  muiIcon?: MuiIconComponent;
  stringIcon?: string;
  utilityName: string;
};

export interface ISwitchMenuItem {
  title: string;
  description: string;
  switchLabel?: string;
  value: boolean;
  dataOG?: string;
  onValueChange(value: boolean): Promise<void>;
}

export interface ISwitchMenuOptions {
  menuButtonLabel: string;
  menuItems: ISwitchMenuItem[];
}

export interface IContextSwitcherOptions {
  userUUID: string;
  baseUrl: string;
  activeEntityId: string;
  activeEntityIdType: string;
  activeProductKey?: string;
  auth0Config?: Auth0Config;
  forcedDefaultApplication?: string;
  forceContextSwitcherVisibility?: boolean;
}

export interface INavBarOptions {
  appName: string;
  openGovLogoUrl?: string;
  openGovLogoOnClick?: () => void;
  openGovLogoLinkComponent?: LinkComponent;
  menuOptions: IMenuOption[];
  getSubmenuItems?(menuItem: IMenuOption | IMenuItem): Promise<ISubmenuSection[]>;
  contextSwitcherOptions?: IContextSwitcherOptions;
  customHeaderErrorMessage?: string;
  switchMenuOptions?: ISwitchMenuOptions;
  utilityTrayOptions?: IUtilityTrayOptions;
  showOfflineIndicator?: boolean;
  favorites?: IFavoritesSection[];
  emptyFavoritesHeader?: string;
  emptyFavoritesMessage?: string;
  autoDismissToasts?: boolean;
  toastAnchorElement?: HTMLElement;
  onFavoriteReorder?(updatedIdOrder: IUpdatedIdOrder): Promise<string[]>;
  onFavoriteSaveClick?(menuItem: IMenuItem): Promise<IMenuItem>;
  onFavoriteDeleteClick?(menuItem: IMenuItem): Promise<IMenuItem>;
  loggerOutput?: string;
}