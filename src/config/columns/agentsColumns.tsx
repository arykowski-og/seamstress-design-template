import type { GridColDef } from '@mui/x-data-grid';
import { Chip, Typography, Box, Avatar } from '@mui/material';
import type { OGAgent } from '../../types/opengov';

export const agentsColumns: GridColDef<OGAgent>[] = [
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%' }}>
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
    flex: 0.35,
    minWidth: 350,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Typography
          variant="body2"
        >
          {params.value || params.row.summary || '-'}
        </Typography>
      </Box>
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.15,
    minWidth: 120,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const getStatusConfig = (status: string) => {
        switch (status) {
          case 'published':
            return {
              label: 'Published',
              color: 'success' as const,
              variant: 'strong' as const
            };
          case 'draft':
            return {
              label: 'Draft',
              color: 'default' as const,
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
    field: 'createdBy',
    headerName: 'Created By',
    minWidth: 140,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%' }}>
        <Avatar>
          {params.value?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography
          variant="body2">
          {params.value}
        </Typography>
      </Box>
    )
  },
  {
    field: 'updatedAt',
    headerName: 'Last Modified',
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    valueFormatter: (value) => {
      if (!value) return '-';
      const date = new Date(value);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    },
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Typography
          variant="body2"
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
  'status',
  'createdBy',
  'updatedAt'
];

export const mobileVisibleColumns = [
  'name',
  'status',
  'updatedAt'
];

export const columnVisibilityModel = {
  name: true,
  description: true,
  status: true,
  createdBy: true,
  updatedAt: true
};