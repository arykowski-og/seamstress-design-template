/**
 * List View Template
 * Quick start template for any list/grid view in OpenGov prototypes
 *
 * Usage:
 * 1. Replace ENTITY_NAME with your entity (e.g., "Skills", "Agents")
 * 2. Update columns array with your schema fields
 * 3. Adjust mock data generator or connect to real data
 * 4. Customize filters as needed
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Stack,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
  Typography,
  InputAdornment
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { PageHeaderComposable } from '@opengov/components-page-header';
import { Plus } from '@opengov/react-capital-assets';
import SearchIcon from '@mui/icons-material/Search';

const ENTITY_NAME_ListPage: React.FC = () => {
  const navigate = useNavigate();
  const { entityId } = useParams<{ entityId: string }>();

  // State management
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Column definitions - CUSTOMIZE THESE
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 200
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      minWidth: 300
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === 'published' ? 'success' : 'default'}
        />
      )
    },
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 150,
      valueFormatter: (params) => {
        if (!params.value) return '';
        return new Date(params.value).toLocaleDateString();
      }
    }
  ];

  // Mock data generator - REPLACE WITH REAL DATA
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Generate mock data
        const mockData = Array.from({ length: 20 }, (_, i) => ({
          id: `item_${i + 1}`,
          name: `Item ${i + 1}`,
          description: `Description for item ${i + 1}`,
          status: i % 3 === 0 ? 'draft' : 'published',
          updatedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
        }));

        setData(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [entityId]);

  // Filter data based on search and status
  const filteredData = data.filter(item => {
    const matchesSearch = !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Navigation handlers
  const handleRowClick = (params: GridRowParams) => {
    navigate(`/entity/${entityId}/ENTITY_NAME_LOWER/${params.id}`);
  };

  const handleCreate = () => {
    navigate(`/entity/${entityId}/ENTITY_NAME_LOWER/new`);
  };

  // Calculate counts for filters
  const counts = {
    all: data.length,
    published: data.filter(d => d.status === 'published').length,
    draft: data.filter(d => d.status === 'draft').length
  };

  // Error state
  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <PageHeaderComposable>
          <PageHeaderComposable.Header>
            <PageHeaderComposable.Title>ENTITY_NAME</PageHeaderComposable.Title>
          </PageHeaderComposable.Header>
        </PageHeaderComposable>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'background.default' }}>
      {/* Page Header */}
      <PageHeaderComposable>
        <PageHeaderComposable.Header>
          <PageHeaderComposable.Title>ENTITY_NAME</PageHeaderComposable.Title>
        </PageHeaderComposable.Header>
      </PageHeaderComposable>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3, overflow: 'hidden' }}>
        {/* Toolbar */}
        <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
          {/* Search Field */}
          <TextField
            size="small"
            placeholder="Search by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              )
            }}
            sx={{
              width: { xs: '100%', md: 300 },
              backgroundColor: 'background.paper'
            }}
          />

          {/* Status Filters */}
          <ToggleButtonGroup
            value={statusFilter}
            exclusive
            onChange={(_, value) => value && setStatusFilter(value)}
            size="small"
          >
            <ToggleButton value="all">
              All ({counts.all})
            </ToggleButton>
            <ToggleButton value="published">
              Published ({counts.published})
            </ToggleButton>
            <ToggleButton value="draft">
              Draft ({counts.draft})
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* Create Button */}
          <Button
            variant="contained"
            startIcon={<Plus />}
            onClick={handleCreate}
          >
            Create ENTITY_NAME_SINGULAR
          </Button>
        </Stack>

        {/* Data Grid */}
        <Box sx={{ flex: 1, minHeight: 0, backgroundColor: 'background.paper', borderRadius: 1 }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            loading={loading}
            onRowClick={handleRowClick}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 }
              }
            }}
            sx={{
              border: 'none',
              '& .MuiDataGrid-row': {
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }
            }}
          />
        </Box>

        {/* Empty State */}
        {!loading && filteredData.length === 0 && (
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
            borderRadius: 1
          }}>
            <Typography variant="h6" gutterBottom>
              No ENTITY_NAME_LOWER found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first ENTITY_NAME_SINGULAR_LOWER'
              }
            </Typography>
            {!searchQuery && statusFilter === 'all' && (
              <Button variant="contained" startIcon={<Plus />} onClick={handleCreate}>
                Create First ENTITY_NAME_SINGULAR
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ENTITY_NAME_ListPage;