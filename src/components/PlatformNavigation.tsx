import React from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Chip, Avatar } from '@mui/material';
import {
  Search as SearchIcon,
  HelpOutline as HelpIcon,
  Settings as SettingsIcon,
  KeyboardArrowDown as ArrowDownIcon,
  WifiOff as OfflineIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  Chat as ChatIcon,
  Palette as PaletteIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { OpenGovLogo } from '@opengov/react-capital-assets';
import { AiOgAssist } from '@opengov/react-capital-assets/icons';
import { PlatformSwitcherMenu } from './PlatformSwitcherMenu';

interface PlatformNavigationProps {
  onOgAssistOpen?: () => void;
  onWorkspaceChatOpen?: () => void;
  onThemeEditorOpen?: () => void;
  hideOpenGovLogo?: boolean;
}

export function PlatformNavigation({
  onOgAssistOpen,
  onWorkspaceChatOpen,
  onThemeEditorOpen,
  hideOpenGovLogo = false,
}: PlatformNavigationProps) {
  const [openGovMenuAnchor, setOpenGovMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [platformSwitcherOpen, setPlatformSwitcherOpen] = React.useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handleOpenGovClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpenGovMenuAnchor(event.currentTarget);
  };

  const handlePlatformSwitcherClick = () => {
    setPlatformSwitcherOpen(true);
  };

  const handleClosePlatformSwitcher = () => {
    setPlatformSwitcherOpen(false);
  };

  const handleCloseMenus = () => {
    setOpenGovMenuAnchor(null);
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '48px',
        px: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        gap: 2,
      }}
    >
      {/* Left Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* OpenGov Logo and Dropdown */}
        {!hideOpenGovLogo && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '24px',
                '& svg': {
                  height: '100%',
                  width: 'auto',
                },
              }}
            >
              <OpenGovLogo />
            </Box>
          </Box>
        )}
        <Menu
          anchorEl={openGovMenuAnchor}
          open={Boolean(openGovMenuAnchor)}
          onClose={handleCloseMenus}
        >
          <MenuItem onClick={handleCloseMenus}>Switch Organization</MenuItem>
          <MenuItem onClick={handleCloseMenus}>Platform Settings</MenuItem>
        </Menu>

        {/* Platform Switcher Dropdown */}
        <Button
          onClick={handlePlatformSwitcherClick}
          endIcon={<ArrowDownIcon />}
          sx={{
            color: 'text.primary',
            textTransform: 'none',
            fontSize: '14px',
            minWidth: 'auto',
            px: 1,
            fontWeight: 600,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          City of Atlanta
        </Button>
        <PlatformSwitcherMenu
          open={platformSwitcherOpen}
          onClose={handleClosePlatformSwitcher}
        />
      </Box>

      {/* Center Section - Status Indicators */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, justifyContent: 'center' }}>
        {/* Offline Indicator */}
        <Chip
          icon={<OfflineIcon />}
          label="Offline"
          color="error"
          size="small"
          sx={{ fontWeight: 500 }}
        />

        {/* Police Overtime Indicator */}
        <Chip
          icon={<TrendingUpIcon />}
          label="Police Overtime +12%"
          color="info"
          size="small"
          sx={{ fontWeight: 500 }}
        />

        {/* Budget Indicator */}
        <Chip
          icon={<MoneyIcon />}
          label="$150K over budget"
          color="info"
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </Box>

      {/* Right Section - Utilities */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Search */}
        <Button
          startIcon={<SearchIcon />}
          sx={{
            color: 'text.primary',
            textTransform: 'none',
            fontSize: '14px',
            minWidth: 'auto',
            px: 1.5,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          Search
        </Button>

        {/* Assistants - Opens OG Assist */}
        <Button
          startIcon={<AiOgAssist />}
          onClick={onOgAssistOpen}
          sx={{
            color: 'text.primary',
            textTransform: 'none',
            fontSize: '14px',
            minWidth: 'auto',
            px: 1.5,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          Assistants
        </Button>

        {/* Workspace Chat */}
        <IconButton
          size="small"
          onClick={onWorkspaceChatOpen}
          sx={{
            color: 'text.primary',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <ChatIcon />
        </IconButton>

        {/* Theme Editor */}
        <IconButton
          size="small"
          onClick={onThemeEditorOpen}
          sx={{
            color: 'text.primary',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <PaletteIcon />
        </IconButton>

        {/* User Avatar */}
        <IconButton
          onClick={handleUserMenuClick}
          size="small"
          sx={{
            ml: 0.5,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Avatar
            sx={{
              width: 24,
              height: 24,
              bgcolor: 'primary.main',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            JD
          </Avatar>
        </IconButton>

        {/* User Menu */}
        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleCloseUserMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            mt: 1,
          }}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <PersonIcon sx={{ mr: 1.5, fontSize: 20 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <SettingsIcon sx={{ mr: 1.5, fontSize: 20 }} />
            Settings
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <HelpIcon sx={{ mr: 1.5, fontSize: 20 }} />
            Help
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu} sx={{ color: 'error.main' }}>
            <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
            Sign Out
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
