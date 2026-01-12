/**
 * BaseLayout - Unified layout component for all OpenGov suite layouts
 *
 * This component consolidates the common layout logic shared across 16+ suite-specific
 * layouts (EAM, Procurement, Utility Billing, Budgeting, etc.) into a single reusable component.
 *
 * Features:
 * - Platform navigation with OG Assist, Workspace Chat, and Theme Editor
 * - Suite-specific navigation bar with configurable menus
 * - Optional search functionality (full-text search with filters)
 * - Automatic OpenGov logo hiding (handled by PlatformNavigation)
 * - Theme editor utility
 * - OG Assist modal integration
 *
 * Usage:
 * ```typescript
 * // Full layout with search
 * <BaseLayout config={eamLayoutConfig}>{children}</BaseLayout>
 *
 * // Simple layout without search
 * <BaseLayout config={budgetingLayoutConfig}>{children}</BaseLayout>
 * ```
 */

import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { NavBar } from '@opengov/components-nav-bar';
import { ThemeEditorUtility } from './theme-editor/ThemeEditorUtility';
import {
  SearchDialog,
  SearchResults,
  SearchSuggestions,
  SearchTable,
  SelectableTableItem,
  SelectableTableRow,
  FocusedPreview
} from '@opengov/components-nav-bar';
import { useDebounce } from 'react-use';
import type { INavBarOptions, IMenuItem, ISubmenuSection } from '../config/navBarTypes';
import { OGAssistModal } from './OGAssist/OGAssistModal';
import { OGAssistProvider } from '../contexts/OGAssistContext';
import { useThemeMode } from '../contexts/ThemeContext';
import { PlatformNavigation } from './PlatformNavigation';

// Types
export interface SearchFilterOption {
  value: string;
  label: string;
  Icon: any;
}

export interface SearchSuggestion {
  title: string;
  type: string;
  id: string;
  url: string;
}

export interface SearchConfig {
  filterOptions: SearchFilterOption[];
  suggestions: SearchSuggestion[];
}

export interface BaseLayoutConfig {
  appName: string;
  menuOptions: IMenuItem[];
  favoritesData?: any[];
  utilityTrayOptions: any;
  searchConfig?: SearchConfig; // Optional - if omitted, no search functionality
  getSubmenuItems?: (menuItem: IMenuItem) => Promise<ISubmenuSection[]>;
}

export interface BaseLayoutProps {
  children: React.ReactNode;
  config: BaseLayoutConfig;
}

type SearchResult = SearchSuggestion;

export function BaseLayout({ children, config }: BaseLayoutProps) {
  const { setThemeMode } = useThemeMode();
  const [ogAssistOpen, setOgAssistOpen] = useState(false);

  // Search state (only used if searchConfig is provided)
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchInputDebounced, setSearchInputDebounced] = useState('');
  const [searchFilterValue, setSearchFilterValue] = useState('all');
  const [searchResults, setSearchResults] = useState<undefined | SearchResult[]>(undefined);
  const [searchIsLoading, setSearchIsLoading] = useState(false);

  // Debounce the search input to prevent excessive API calls
  useDebounce(() => setSearchInputDebounced(searchInput), 200, [searchInput]);

  // Subscribe to the debounced search input to trigger the API call
  React.useEffect(() => {
    if (!config.searchConfig) return; // Skip if no search config

    if (searchInputDebounced.length === 0) {
      setSearchResults(undefined);
      return;
    }
    setSearchIsLoading(true);

    // Replace with your API call
    setTimeout(() => {
      const filtered = config.searchConfig!.suggestions.filter(item =>
        item.title.toLowerCase().includes(searchInputDebounced.toLowerCase()) ||
        (searchFilterValue !== 'all' && item.type === searchFilterValue)
      );
      setSearchResults(filtered);
      setSearchIsLoading(false);
    }, 500);
  }, [searchInputDebounced, searchFilterValue, config.searchConfig]);

  // Hide OpenGov logo and utilities in the global nav, and mark active nav link for styling
  React.useEffect(() => {
    const hideLogoAndUtilitiesAndMarkActive = () => {
      const navbar = document.querySelector('[data-test="nav_bar_header"]');
      if (!navbar) return;

      // Hide the OpenGov logo SVG and its container
      const svgsInHeader = navbar.querySelectorAll('svg');
      svgsInHeader.forEach(svg => {
        const viewBox = svg.getAttribute('viewBox');
        const parent = svg.parentElement;

        if (viewBox && viewBox.includes('196.68 119.33')) {
          (svg as HTMLElement).style.display = 'none';
          if (parent) {
            (parent as HTMLElement).style.display = 'none';
          }
        }
        else if (parent && parent.tagName === 'A' && parent.getAttribute('href') === '/' && parent.children.length === 1) {
          (svg as HTMLElement).style.display = 'none';
          (parent as HTMLElement).style.display = 'none';
        }
      });

      // Hide utility tray
      const utilityTray = navbar.querySelector('[data-test="utility_tray"]');
      if (utilityTray) {
        (utilityTray as HTMLElement).style.display = 'none';
      }

      // Mark active nav link
      const links = navbar.querySelectorAll('a');
      const currentPath = window.location.pathname;

      links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        link.classList.remove('active-nav-link');

        // Only mark exact matches as active
        // This ensures /seamstress is only active on /seamstress, not on /seamstress/getting-started
        if (href === currentPath) {
          link.classList.add('active-nav-link');
        }
      });
    };

    hideLogoAndUtilitiesAndMarkActive();
    setTimeout(hideLogoAndUtilitiesAndMarkActive, 100);
    setTimeout(hideLogoAndUtilitiesAndMarkActive, 500);

    const handleNavigation = () => {
      setTimeout(hideLogoAndUtilitiesAndMarkActive, 100);
    };

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('pushState', handleNavigation);
    window.addEventListener('replaceState', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('pushState', handleNavigation);
      window.removeEventListener('replaceState', handleNavigation);
    };
  }, []);

  const handleSearchSelection = useCallback((result: SearchResult) => {
    setSearchOpen(false);
    if (result.url) {
      window.location.href = result.url;
    }
  }, []);

  const handleGetSubmenuItems = async (menuItem: IMenuItem): Promise<ISubmenuSection[]> => {
    if (config.getSubmenuItems) {
      return config.getSubmenuItems(menuItem);
    }

    // Default implementation: simulate fetching submenu items
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            title: 'Dynamic Section',
            items: [
              {
                label: 'Dynamic Item 1',
                id: 'dynamic-1',
                url: '#',
                shouldFetchNestedMenuItems: false,
              },
              {
                label: 'Dynamic Item 2',
                id: 'dynamic-2',
                url: '#',
                shouldFetchNestedMenuItems: false,
              },
            ],
          },
        ]);
      }, 500);
    });
  };


  const navBarOptions: INavBarOptions = {
    appName: config.appName,
    openGovLogoUrl: undefined, // Hide the logo since it's in the Platform Navigation
    openGovLogoLinkComponent: () => null, // Render nothing for the logo
    menuOptions: config.menuOptions,
    favorites: config.favoritesData,
    utilityTrayOptions: {
      // Keep only settings and notifications, hide utilities in platform nav
      settingsOptions: config.utilityTrayOptions.settingsOptions,
      notificationsOptions: config.utilityTrayOptions.notificationsOptions,
      profileSettingsOptions: undefined as any, // Hide avatar (in platform nav)
    },
    showOfflineIndicator: false,
    getSubmenuItems: handleGetSubmenuItems,
    autoDismissToasts: true,
    loggerOutput: 'console',
  };

  return (
    <OGAssistProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <PlatformNavigation
          onOgAssistOpen={() => setOgAssistOpen(true)}
          onWorkspaceChatOpen={() => {
            if ((window as any).openWorkspaceChat) {
              (window as any).openWorkspaceChat();
            }
          }}
          onThemeEditorOpen={() => {
            if ((window as any).openThemeEditor) {
              (window as any).openThemeEditor();
            }
          }}
        />
        <NavBar {...navBarOptions} />

        {/* OG Assist Modal */}
        <OGAssistModal
          open={ogAssistOpen}
          onClose={() => setOgAssistOpen(false)}
        />

        {/* Theme Editor */}
        <ThemeEditorUtility />

        {/* Search Dialog - Only render if searchConfig is provided */}
        {config.searchConfig && (
          <SearchDialog
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
            searchInput={searchInput}
            onSearchInputChange={setSearchInput}
            searchFilterOptions={config.searchConfig.filterOptions}
            activeSearchFilter={searchFilterValue}
            onActiveSearchFilterChange={setSearchFilterValue}
            searchResults={searchResults}
            searchSuggestions={config.searchConfig.suggestions}
            onSelectSearchResult={handleSearchSelection}
            onSelectSearchSuggestion={handleSearchSelection}
            isLoading={searchIsLoading}
          >
            <SearchSuggestions>
              <SearchTable title="Recently Viewed">
                {({ rowData }: { rowData: SearchResult }) => (
                  <SelectableTableRow key={rowData.id}>
                    <SelectableTableItem>{rowData.type}</SelectableTableItem>
                    <SelectableTableItem>{rowData.title}</SelectableTableItem>
                  </SelectableTableRow>
                )}
              </SearchTable>
              <FocusedPreview>
                {({ rowData }: { rowData: SearchResult }) => (
                  <Box border="1px dashed #ccc" width={1} height={1} p={2}>
                    <Box>Preview: {rowData.title}</Box>
                    <Box fontSize="12px" color="text.secondary">Type: {rowData.type}</Box>
                  </Box>
                )}
              </FocusedPreview>
            </SearchSuggestions>
            <SearchResults>
              <SearchTable title="Results">
                {({ rowData }: { rowData: SearchResult }) => (
                  <SelectableTableRow key={rowData.id}>
                    <SelectableTableItem>{rowData.type}</SelectableTableItem>
                    <SelectableTableItem>{rowData.title}</SelectableTableItem>
                  </SelectableTableRow>
                )}
              </SearchTable>
              <FocusedPreview>
                {({ rowData }: { rowData: SearchResult }) => (
                  <Box border="1px dashed #ccc" width={1} height={1} p={2}>
                    <Box fontWeight="bold">{rowData.title}</Box>
                    <Box fontSize="14px" mt={1}>Navigate to: {rowData.url}</Box>
                  </Box>
                )}
              </FocusedPreview>
            </SearchResults>
          </SearchDialog>
        )}

        <Box>
          {children}
        </Box>
      </Box>
    </OGAssistProvider>
  );
}
