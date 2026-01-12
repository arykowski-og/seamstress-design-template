/**
 * Knowledge Documents Column Definitions
 */

import React from 'react';
import type { GridColDef } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';
import {
  FileDocumentOutline as DescriptionIcon,
  FilePdfBox as PictureAsPdfIcon,
  Table as TableChartIcon,
} from '@opengov/react-capital-assets';
import type { KnowledgeDocument, DocumentType } from '../../services/knowledge/KnowledgeTypes';

const getFileIcon = (type: DocumentType) => {
  switch (type) {
    case 'pdf':
      return <PictureAsPdfIcon />;
    case 'csv':
    case 'excel':
      return <TableChartIcon />;
    case 'txt':
      return <DescriptionIcon />;
    case 'markdown':
      return <DescriptionIcon />;
    case 'word':
      return <DescriptionIcon />;
    default:
      return <DescriptionIcon />;
  }
};

export const knowledgeColumns: GridColDef<KnowledgeDocument>[] = [
  {
    field: 'title',
    headerName: 'Name',
    flex: 0.25,
    minWidth: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Typography variant="body2">
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
        <Typography variant="body2">{params.value?.toUpperCase() || '-'}</Typography>
      </Box>
    )
  },
  {
    field: 'publishingStatus',
    headerName: 'Status',
    flex: 0.1,
    minWidth: 120,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Typography variant="body2">{params.value || 'draft'}</Typography>
      </Box>
    )
  },
  {
    field: 'metadata.tags',
    headerName: 'Tags',
    flex: 0.2,
    minWidth: 200,
    headerAlign: 'left',
    align: 'left',
    sortable: false,
    valueGetter: (value, row) => row.metadata?.tags || [],
    renderCell: (params) => {
      const tags = params.row.metadata?.tags || [];
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body2">
            {tags.length > 0 ? tags.join(', ') : '-'}
          </Typography>
        </Box>
      );
    }
  },
  {
    field: 'metadata.modified',
    headerName: 'Modified',
    flex: 0.15,
    minWidth: 150,
    headerAlign: 'left',
    align: 'left',
    valueGetter: (value, row) => row.metadata?.modified,
    renderCell: (params) => {
      const date = params.row.metadata?.modified;
      if (!date) return <Typography variant="body2">-</Typography>;

      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="body2">
            {formattedDate}
          </Typography>
        </Box>
      );
    }
  },
  {
    field: 'metadata.author',
    headerName: 'Author',
    flex: 0.15,
    minWidth: 140,
    headerAlign: 'left',
    align: 'left',
    valueGetter: (value, row) => row.metadata?.author,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Typography variant="body2">
          {params.row.metadata?.author || '-'}
        </Typography>
      </Box>
    )
  }
];

export const columnVisibilityModel = {
  title: true,
  type: true,
  publishingStatus: true,
  'metadata.tags': true,
  'metadata.modified': true,
  'metadata.author': true
};
