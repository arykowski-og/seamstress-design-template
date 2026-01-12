import type { GridColDef } from '@mui/x-data-grid';
import { Chip, Typography, Box, LinearProgress, Tooltip } from '@mui/material';
import type { OGSkill } from '../../types/opengov';

export const skillsColumns: GridColDef<OGSkill>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 0.2,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            color: 'text.primary'
          }}
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
          sx={{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            color: 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {params.value}
        </Typography>
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
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          sx={{
            fontSize: '12px',
            fontWeight: 400,
            height: 22,
            borderRadius: '4px'
          }}
        />
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
            sx={{
              fontSize: '12px',
              fontWeight: 400,
              height: 22,
              borderRadius: '4px',
              '& .MuiChip-label': {
                padding: '0 8px',
                fontSize: '12px',
                lineHeight: '18px'
              }
            }}
          />
        </Box>
      );
    }
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
        {params.value.successRate && (
          <Typography
            variant="caption"
            sx={{
              fontSize: '12px',
              color: params.value.successRate >= 95 ? 'success.main' :
                     params.value.successRate >= 85 ? 'warning.main' : 'error.main'
            }}
          >
            {params.value.successRate}% success
          </Typography>
        )}
      </Box>
    )
  },
  {
    field: 'performance',
    headerName: 'Performance',
    flex: 0.15,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    sortable: false,
    renderCell: (params) => {
      const skill = params.row;
      const avgResponseTime = skill.usage?.avgResponseTime || 0;
      const successRate = skill.usage?.successRate || 0;

      const performanceScore = (successRate / 100) * (1 / (avgResponseTime || 1)) * 100;
      const normalizedScore = Math.min(100, performanceScore);

      return (
        <Tooltip
          title={
            <Box>
              <Typography variant="caption">
                Response Time: {avgResponseTime?.toFixed(1)}s
              </Typography>
              <br />
              <Typography variant="caption">
                Success Rate: {successRate}%
              </Typography>
            </Box>
          }
        >
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={normalizedScore}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  backgroundColor:
                    normalizedScore >= 80 ? 'success.main' :
                    normalizedScore >= 50 ? 'warning.main' : 'error.main'
                }
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                color: 'text.secondary',
                mt: 0.5
              }}
            >
              {avgResponseTime?.toFixed(1)}s avg
            </Typography>
          </Box>
        </Tooltip>
      );
    }
  },
  {
    field: 'parameters',
    headerName: 'Parameters',
    flex: 0.1,
    minWidth: 100,
    headerAlign: 'left',
    align: 'left',
    sortable: false,
    renderCell: (params) => {
      const requiredCount = params.value?.filter((p: any) => p.required).length || 0;
      const totalCount = params.value?.length || 0;

      return (
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
            {requiredCount}/{totalCount}
          </Typography>
        </Box>
      );
    }
  },
  {
    field: 'examples',
    headerName: 'Examples',
    flex: 0.25,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    sortable: false,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, justifyContent: 'center', height: '100%' }}>
        {params.value?.slice(0, 2).map((example: string, index: number) => (
          <Typography
            key={index}
            variant="caption"
            sx={{
              fontSize: '12px',
              color: 'text.secondary',
              fontStyle: 'italic',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%'
            }}
          >
            "{example}"
          </Typography>
        ))}
        {params.value?.length > 2 && (
          <Typography
            variant="caption"
            sx={{
              fontSize: '11px',
              color: 'text.secondary'
            }}
          >
            +{params.value.length - 2} more
          </Typography>
        )}
      </Box>
    )
  },
  {
    field: 'updatedAt',
    headerName: 'Last Updated',
    flex: 0.12,
    minWidth: 120,
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
  'category',
  'status',
  'usage',
  'performance',
  'updatedAt'
];

export const mobileVisibleColumns = [
  'name',
  'category',
  'usage'
];

export const columnVisibilityModel = {
  name: true,
  description: true,
  category: true,
  status: true,
  usage: true,
  performance: true,
  parameters: false,
  examples: false,
  updatedAt: true
};