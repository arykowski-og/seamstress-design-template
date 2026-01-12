/**
 * Column Factory Functions
 *
 * Reusable column definitions for MUI DataGrid.
 * These factories create consistent column configurations across all entity types.
 */

import React from 'react';
import type { GridColDef } from '@mui/x-data-grid';
import { Chip, Typography, Box, Avatar, LinearProgress, Tooltip } from '@mui/material';
import { capitalDesignTokens } from '@opengov/capital-mui-theme';

/**
 * Status column with consistent styling
 */
export function createStatusColumn(
  field = 'status',
  headerName = 'Status'
): GridColDef {
  return {
    field,
    headerName,
    flex: 0.1,
    minWidth: 100,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const getStatusConfig = (status: string) => {
        switch (status) {
          case 'published':
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
  };
}

/**
 * Name/Title column with consistent text styling
 */
export function createNameColumn(
  field = 'name',
  headerName = 'Name',
  flex = 0.25,
  minWidth = 250
): GridColDef {
  return {
    field,
    headerName,
    flex,
    minWidth,
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
  };
}

/**
 * Description/Summary column with ellipsis
 */
export function createDescriptionColumn(
  field = 'description',
  headerName = 'Description',
  flex = 0.35,
  minWidth = 350
): GridColDef {
  return {
    field,
    headerName,
    flex,
    minWidth,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Tooltip title={params.value || ''}>
          <Typography
            variant="body2"
          >
            {params.value}
          </Typography>
        </Tooltip>
      </Box>
    )
  };
}

/**
 * Date column with relative time formatting
 */
export function createDateColumn(
  field: string,
  headerName: string,
  format: 'relative' | 'absolute' = 'absolute'
): GridColDef {
  return {
    field,
    headerName,
    flex: 0.12,
    minWidth: 120,
    headerAlign: 'left',
    align: 'left',
    valueFormatter: (value) => {
      if (!value) return '-';
      const date = new Date(value);

      if (format === 'relative') {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
      }

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
  };
}

/**
 * User/Creator column with avatar
 */
export function createUserColumn(
  field = 'createdBy',
  headerName = 'Created By'
): GridColDef {
  return {
    field,
    headerName,
    flex: 0.12,
    minWidth: 140,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%' }}>
        <Avatar
          sx={{
            width: 24,
            height: 24,
            fontSize: '12px',
            bgcolor: 'primary.main'
          }}
        >
          {params.value?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            color: 'text.primary'
          }}
        >
          {params.value}
        </Typography>
      </Box>
    )
  };
}

/**
 * Activity/Usage column with metrics
 */
export function createActivityColumn(
  field = 'activity',
  headerName = 'Activity'
): GridColDef {
  return {
    field,
    headerName,
    flex: 0.15,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    sortComparator: (v1, v2) => {
      const value1 = v1?.actions || v1?.count || 0;
      const value2 = v2?.actions || v2?.count || 0;
      return value1 - value2;
    },
    renderCell: (params) => {
      const value = params.value || {};
      const primaryMetric = value.actions || value.count || 0;
      const secondaryMetric = value.uniqueUsers || value.successRate || null;

      return (
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
            {primaryMetric.toLocaleString()} {value.actions ? 'actions' : 'calls'}
          </Typography>
          {secondaryMetric && (
            <Typography
              variant="caption"
              sx={{
                fontSize: '12px',
                color: 'text.secondary'
              }}
            >
              {typeof secondaryMetric === 'number' && value.uniqueUsers
                ? `${secondaryMetric} users`
                : `${secondaryMetric}% success`
              }
            </Typography>
          )}
        </Box>
      );
    }
  };
}

/**
 * Category column with chip styling
 */
export function createCategoryColumn(
  field = 'category',
  headerName = 'Category'
): GridColDef {
  return {
    field,
    headerName,
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
  };
}

/**
 * Tags column with multiple chips
 */
export function createTagsColumn(
  field = 'tags',
  headerName = 'Tags'
): GridColDef {
  return {
    field,
    headerName,
    flex: 0.2,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    sortable: false,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center', height: '100%' }}>
        {params.value?.slice(0, 3).map((tag: string) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '11px',
              height: 20,
              '& .MuiChip-label': {
                padding: '0 6px'
              }
            }}
          />
        ))}
        {params.value?.length > 3 && (
          <Typography
            variant="caption"
            sx={{
              fontSize: '11px',
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            +{params.value.length - 3}
          </Typography>
        )}
      </Box>
    )
  };
}

/**
 * Performance column with progress bar
 */
export function createPerformanceColumn(
  field = 'performance',
  headerName = 'Performance'
): GridColDef {
  return {
    field,
    headerName,
    flex: 0.15,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    sortable: false,
    renderCell: (params) => {
      const row = params.row;
      const usage = row.usage || {};
      const avgResponseTime = usage.avgResponseTime || 0;
      const successRate = usage.successRate || 0;

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
  };
}

/**
 * Create a set of default columns for entity lists
 */
export function createDefaultColumns(entityType: 'agent' | 'skill' | 'tool' | 'document'): GridColDef[] {
  const baseColumns = [
    createNameColumn(),
    createDescriptionColumn(entityType === 'agent' ? 'summary' : 'description'),
    createStatusColumn(),
    createCategoryColumn()
  ];

  switch (entityType) {
    case 'agent':
      return [
        ...baseColumns,
        createUserColumn(),
        createActivityColumn(),
        createDateColumn('updatedAt', 'Last Modified'),
        createTagsColumn()
      ];
    case 'skill':
      return [
        ...baseColumns,
        createActivityColumn('usage'),
        createPerformanceColumn(),
        createDateColumn('updatedAt', 'Last Updated')
      ];
    case 'tool':
      return [
        ...baseColumns,
        createActivityColumn('usage'),
        createDateColumn('updatedAt', 'Last Used', 'relative')
      ];
    case 'document':
      return [
        createNameColumn('title', 'Title'),
        createDescriptionColumn('content', 'Content'),
        createStatusColumn(),
        createUserColumn(),
        createDateColumn('updatedAt', 'Last Modified'),
        createTagsColumn()
      ];
    default:
      return baseColumns;
  }
}

/**
 * Column visibility presets for different screen sizes
 */
export const columnVisibilityPresets = {
  desktop: {
    name: true,
    description: true,
    summary: true,
    status: true,
    category: true,
    createdBy: true,
    activity: true,
    usage: true,
    performance: true,
    updatedAt: true,
    tags: false
  },
  tablet: {
    name: true,
    description: true,
    summary: true,
    status: true,
    category: false,
    createdBy: false,
    activity: true,
    usage: true,
    performance: false,
    updatedAt: true,
    tags: false
  },
  mobile: {
    name: true,
    description: false,
    summary: false,
    status: true,
    category: false,
    createdBy: false,
    activity: true,
    usage: true,
    performance: false,
    updatedAt: false,
    tags: false
  }
};