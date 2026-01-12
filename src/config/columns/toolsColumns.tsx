import type { GridColDef } from '@mui/x-data-grid';
import { Chip, Typography, Box, Tooltip, IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ApiIcon from '@mui/icons-material/Api';
import StorageIcon from '@mui/icons-material/Storage';
import FolderIcon from '@mui/icons-material/Folder';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import BuildIcon from '@mui/icons-material/Build';
import type { OGTool } from '../../types/opengov';

const getToolIcon = (type: string) => {
  switch (type) {
    case 'api':
      return <ApiIcon sx={{ fontSize: 20 }} />;
    case 'database':
      return <StorageIcon sx={{ fontSize: 20 }} />;
    case 'file':
      return <FolderIcon sx={{ fontSize: 20 }} />;
    case 'integration':
      return <IntegrationInstructionsIcon sx={{ fontSize: 20 }} />;
    case 'utility':
      return <BuildIcon sx={{ fontSize: 20 }} />;
    default:
      return <ApiIcon sx={{ fontSize: 20 }} />;
  }
};

export const toolsColumns: GridColDef<OGTool>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 0.2,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%' }}>
        {getToolIcon(params.row.type)}
        <Typography
          variant="body2"
        >
          {params.value}
        </Typography>
      </Box>
    )
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 0.3,
    minWidth: 300,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Typography
          variant="body2"
        >
          {params.value}
        </Typography>
      </Box>
    )
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 0.1,
    minWidth: 100,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Chip
          label={params.value.toUpperCase()}
          size="small"
          variant="outlined"
        />
      </Box>
    )
  },
  {
    field: 'category',
    headerName: 'Category',
    flex: 0.15,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Typography
          variant="body2"
        >
          {params.value}
        </Typography>
      </Box>
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.1,
    minWidth: 100,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const getStatusConfig = (status: string) => {
        switch (status) {
          case 'published':
            return {
              label: 'Active',
              color: 'success' as const,
              variant: 'strong' as const
            };
          case 'draft':
            return {
              label: 'Draft',
              color: 'default' as const,
              variant: 'outlined' as const
            };
          case 'archived':
            return {
              label: 'Archived',
              color: 'warning' as const,
              variant: 'outlined' as const
            };
          default:
            return {
              label: status,
              color: 'default' as const,
              variant: 'outlined' as const
            };
        }
      };

      const config = getStatusConfig(params.value);
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Chip
            label={config.label}
            size="small"
            color={config.color}
            variant={config.variant}
          />
        </Box>
      );
    }
  },
  {
    field: 'authentication',
    headerName: 'Auth',
    flex: 0.1,
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const authType = params.value?.type || 'none';
      const isSecured = authType !== 'none';

      return (
        <Tooltip title={`Authentication: ${authType}`}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            {isSecured ? (
              <LockIcon sx={{ fontSize: 18, color: 'success.main' }} />
            ) : (
              <LockOpenIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            )}
            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                ml: 0.5,
                color: isSecured ? 'success.main' : 'text.secondary',
                textTransform: 'uppercase'
              }}
            >
              {authType}
            </Typography>
          </Box>
        </Tooltip>
      );
    }
  },
  {
    field: 'endpoint',
    headerName: 'Endpoint',
    flex: 0.25,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Tooltip title={params.value}>
          <Typography
            variant="body2"
          sx={{
            fontSize: '13px',
            fontFamily: 'monospace',
            fontWeight: 400,
            lineHeight: '20px',
            color: 'primary.main',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
            {params.value}
          </Typography>
        </Tooltip>
      </Box>
    )
  },
  {
    field: 'usage',
    headerName: 'Usage',
    flex: 0.15,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    sortComparator: (v1, v2) => v1.count - v2.count,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            color: 'text.primary'
          }}
        >
          {params.value.count.toLocaleString()} calls
        </Typography>
        {params.value.errors > 0 && (
          <Typography
            variant="caption"
            sx={{
              fontSize: '12px',
              color: params.value.errors > 10 ? 'error.main' : 'warning.main'
            }}
          >
            {params.value.errors} errors
          </Typography>
        )}
      </Box>
    )
  },
  {
    field: 'parameters',
    headerName: 'Params',
    flex: 0.08,
    minWidth: 80,
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    renderCell: (params) => {
      const count = params.value?.length || 0;
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Chip
            label={count}
            size="small"
            sx={{
              fontSize: '11px',
              fontWeight: 500,
              height: 18,
              minWidth: 24,
              '& .MuiChip-label': {
                padding: '0 4px'
              }
            }}
          />
        </Box>
      );
    }
  },
  {
    field: 'updatedAt',
    headerName: 'Last Used',
    flex: 0.12,
    minWidth: 120,
    headerAlign: 'left',
    align: 'left',
    valueGetter: (value, row) => row.usage?.lastUsed || row.updatedAt,
    valueFormatter: (value) => {
      if (!value) return '-';
      const date = new Date(value);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return 'Today';
      } else if (diffDays === 1) {
        return 'Yesterday';
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
      }
    },
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            color: 'text.secondary'
          }}
        >
          {params.formattedValue}
        </Typography>
      </Box>
    )
  }
];

export const defaultVisibleColumns = [
  'name',
  'description',
  'type',
  'category',
  'status',
  'authentication',
  'usage',
  'updatedAt'
];

export const mobileVisibleColumns = [
  'name',
  'type',
  'status',
  'usage'
];

export const columnVisibilityModel = {
  name: true,
  description: true,
  type: true,
  category: true,
  status: true,
  authentication: true,
  endpoint: false,
  usage: true,
  parameters: false,
  updatedAt: true
};