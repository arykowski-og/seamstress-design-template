import React from 'react';
import {
  Box,
  Drawer,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  IconButton,
  Select,
  FormControl,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  KeyboardArrowDown as ChevronDownIcon,
  Home as HomeIcon,
  Notifications as BellIcon,
  Dashboard as GridIcon,
  Assessment as ClipboardIcon,
  Build as WrenchIcon,
  AccountTree as FlowIcon,
  Psychology as AgentIcon,
  Article as ListIcon,
  Schedule as TimerIcon,
  Star as StarIcon,
  OpenInNew as ExternalLinkIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface PlatformSwitcherMenuProps {
  open: boolean;
  onClose: () => void;
  currentEntity?: string;
}

interface MenuItemData {
  id: string;
  label: string;
  icon: React.ReactElement;
  route?: string;
  externalUrl?: string;
  isSelected?: boolean;
}

interface MenuSection {
  id: string;
  title: string;
  items: MenuItemData[];
}

export function PlatformSwitcherMenu({
  open,
  onClose,
  currentEntity = 'City of Atlanta',
}: PlatformSwitcherMenuProps) {
  const navigate = useNavigate();
  const [selectedEntity, setSelectedEntity] = React.useState(currentEntity);
  const [expandedSections, setExpandedSections] = React.useState<string[]>([
    'capabilities',
    'action-hubs',
    'modules',
  ]);

  // Define menu sections
  const capabilities: MenuSection = {
    id: 'capabilities',
    title: 'Capabilities',
    items: [
      {
        id: 'agent-studio',
        label: 'Agent Studio',
        icon: <AgentIcon sx={{ fontSize: 20 }} />,
        route: '/agent-studio/dashboard',
      },
      {
        id: 'app-builder',
        label: 'App Builder',
        icon: <WrenchIcon sx={{ fontSize: 20 }} />,
        route: '/app-builder',
      },
      {
        id: 'workflow-builder',
        label: 'Workflow Builder',
        icon: <FlowIcon sx={{ fontSize: 20 }} />,
        route: '/workflow-builder',
      },
    ],
  };

  const actionHubs: MenuSection = {
    id: 'action-hubs',
    title: 'Action Hubs',
    items: [
      {
        id: 'command-center',
        label: 'Command Center',
        icon: <HomeIcon sx={{ fontSize: 20 }} />,
        route: '/command-center',
        isSelected: true,
      },
      {
        id: 'tasks-notifications',
        label: 'Tasks & Notifications',
        icon: <BellIcon sx={{ fontSize: 20 }} />,
        route: '/tasks',
      },
      {
        id: 'programs-projects',
        label: 'Programs & Projects',
        icon: <GridIcon sx={{ fontSize: 20 }} />,
        route: '/programs',
      },
      {
        id: 'reports-dashboards',
        label: 'Reports & Dashboards',
        icon: <ClipboardIcon sx={{ fontSize: 20 }} />,
        route: '/reports',
      },
    ],
  };

  const modules: MenuSection = {
    id: 'modules',
    title: 'Modules',
    items: [
      {
        id: 'asset-management',
        label: 'Asset Management',
        icon: <WrenchIcon sx={{ fontSize: 20 }} />,
        route: '/eam/dashboard',
      },
      {
        id: 'budgeting-performance',
        label: 'Budgeting & Performance',
        icon: <ListIcon sx={{ fontSize: 20 }} />,
        route: '/budgeting',
      },
      {
        id: 'financials',
        label: 'Financials',
        icon: <TimerIcon sx={{ fontSize: 20 }} />,
        route: '/financials',
      },
      {
        id: 'grants-management',
        label: 'Grants Management',
        icon: <GridIcon sx={{ fontSize: 20 }} />,
        externalUrl: 'https://grants.opengov.com',
      },
      {
        id: 'permitting-licensing',
        label: 'Permitting & Licensing',
        icon: <StarIcon sx={{ fontSize: 20 }} />,
        route: '/permitting',
      },
      {
        id: 'procurement',
        label: 'Procurement',
        icon: <StarIcon sx={{ fontSize: 20 }} />,
        route: '/procurement/projects',
      },
      {
        id: 'utility-billing',
        label: 'Utility Billing',
        icon: <StarIcon sx={{ fontSize: 20 }} />,
        route: '/utility-billing/home',
      },
    ],
  };

  const sections = [capabilities, actionHubs, modules];

  const handleAccordionChange = (sectionId: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedSections((prev) =>
      isExpanded
        ? [...prev, sectionId]
        : prev.filter((id) => id !== sectionId)
    );
  };

  const handleItemClick = (item: MenuItemData) => {
    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (item.route) {
      navigate(item.route);
      onClose();
    }
  };

  const handleEntityChange = (event: any) => {
    setSelectedEntity(event.target.value);
    // In a real app, this would trigger entity switching logic
  };

  const handleAddClick = (sectionId: string) => (event: React.MouseEvent) => {
    event.stopPropagation();
    // Placeholder for add functionality
    console.log(`Add item to ${sectionId}`);
  };

  const handleMoreClick = (sectionId: string) => (event: React.MouseEvent) => {
    event.stopPropagation();
    // Placeholder for more actions menu
    console.log(`More actions for ${sectionId}`);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 340,
            boxShadow: (theme) => theme.shadows[16],
          },
        },
      }}
    >
      {/* Entity Dropdown */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography
          variant="caption"
          sx={{
            mb: 1,
          }}
        >
          Entity
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={selectedEntity}
            onChange={handleEntityChange}
            IconComponent={ChevronDownIcon}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '& .MuiSelect-select': {
                py: 1,
                fontSize: '14px',
                fontWeight: 400,
              },
            }}
          >
            <MenuItem value="City of Atlanta">City of Atlanta</MenuItem>
            <MenuItem value="State of Georgia">State of Georgia</MenuItem>
            <MenuItem value="County Services">County Services</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider />

      {/* Collapsible Sections */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {sections.map((section) => (
          <Accordion
            key={section.id}
            expanded={expandedSections.includes(section.id)}
            onChange={handleAccordionChange(section.id)}
            disableGutters
            elevation={0}
            sx={{
              '&:before': {
                display: 'none',
              },
              '&.MuiAccordion-root': {
                bgcolor: 'transparent',
                border: 'none',
              },
              '&.Mui-expanded': {
                border: 'none',
              },
              mb: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ fontSize: 20 }} />}
              sx={{
                px: 2,
                py: 0.5,
                minHeight: 40,
                '&.Mui-expanded': {
                  minHeight: 40,
                },
                '& .MuiAccordionSummary-content': {
                  my: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
                '& .MuiAccordionSummary-content.Mui-expanded': {
                  my: 0.5,
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                }}
              >
                {section.title}
              </Typography>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 0.5 }}
                onClick={(e) => e.stopPropagation()}
              >
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddClick(section.id)(e);
                  }}
                  sx={{
                    p: 0.25,
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <AddIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoreClick(section.id)(e);
                  }}
                  sx={{
                    p: 0.25,
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <MoreVertIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, display: 'flex', alignItems: 'left', justifyContent: 'left', flexDirection: 'column' }}>
              {section.items.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  sx={{
                    display: 'flex',
                    width: '100%',
                    gap: 1.5,
                    px: 2,
                    py: 1,
                    cursor: 'pointer',
                    bgcolor: item.isSelected ? 'action.selected' : 'transparent',
                    '&:hover': {
                      bgcolor: item.isSelected ? 'action.selected' : 'action.hover',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: '20px',
                      color: 'text.primary',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'text.primary',
                      flex: 1,
                    }}
                  >
                    {item.label}
                  </Typography>
                  {item.externalUrl && (
                    <ExternalLinkIcon
                      sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0 }}
                    />
                  )}
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Drawer>
  );
}
