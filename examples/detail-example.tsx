/**
 * Detail View Template
 * Quick start template for detail/view pages in OpenGov prototypes
 *
 * Usage:
 * 1. Replace ENTITY_NAME with your entity (e.g., "Skill", "Agent")
 * 2. Update display fields based on your schema
 * 3. Customize metadata and actions as needed
 * 4. Connect to real data or keep mock
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import { PageHeaderComposable } from '@opengov/components-page-header';
import { Pencil, Trash, Copy, Archive } from '@opengov/react-capital-assets';
import ShareIcon from '@mui/icons-material/Share';

interface EntityData {
  id: string;
  name: string;
  description: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  // Add more fields as needed
}

const ENTITY_NAME_DetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { entityId, id } = useParams<{ entityId: string; id: string }>();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('mode') === 'edit';

  // State management
  const [data, setData] = useState<EntityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);

  // Load data
  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock data
      setData({
        id: id!,
        name: 'Example Item',
        description: 'This is a comprehensive description of the item that provides context and details.',
        content: `
          <h2>Overview</h2>
          <p>This is the main content of the item. It contains detailed information about the subject.</p>

          <h2>Key Features</h2>
          <ul>
            <li>Feature 1: Advanced capability</li>
            <li>Feature 2: Seamless integration</li>
            <li>Feature 3: Real-time updates</li>
          </ul>

          <h2>Implementation Details</h2>
          <p>The implementation follows best practices and industry standards to ensure reliability and performance.</p>
        `,
        status: 'published',
        category: 'Category 1',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'John Doe',
        updatedBy: 'Jane Smith'
      });
      setError(null);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Action handlers
  const handleEdit = () => {
    navigate(`/entity/${entityId}/ENTITY_NAME_LOWER/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate(`/entity/${entityId}/ENTITY_NAME_LOWER`);
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleArchive = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(prev => prev ? { ...prev, status: 'archived' } : null);
      setArchiveDialogOpen(false);
    } catch (error) {
      console.error('Failed to archive:', error);
    }
  };

  const handleDuplicate = () => {
    navigate(`/entity/${entityId}/ENTITY_NAME_LOWER/new?duplicate=${id}`);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share clicked');
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <PageHeaderComposable>
          <PageHeaderComposable.Header>
            <PageHeaderComposable.Title>ENTITY_NAME</PageHeaderComposable.Title>
          </PageHeaderComposable.Header>
        </PageHeaderComposable>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
          <Alert severity="error">{error || 'Data not found'}</Alert>
        </Box>
      </Box>
    );
  }

  // Redirect to edit page if edit mode
  if (isEditMode) {
    navigate(`/entity/${entityId}/ENTITY_NAME_LOWER/${id}/edit`);
    return null;
  }

  const statusColor = {
    published: 'success',
    draft: 'default',
    archived: 'warning'
  } as const;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'background.default' }}>
      {/* Page Header */}
      <PageHeaderComposable>
        <PageHeaderComposable.Header
          actions={[
            <Button key="edit" variant="contained" startIcon={<Pencil />} onClick={handleEdit}>
              Edit
            </Button>
          ]}
        >
          <PageHeaderComposable.Breadcrumbs breadcrumbs={[
            { path: `/entity/${entityId}/ENTITY_NAME_LOWER`, title: 'ENTITY_NAME_PLURAL' },
            { title: data.name }
          ]} />
          <PageHeaderComposable.Title status={
            <Chip label={data.status} size="small" color={statusColor[data.status] || 'default'} />
          }>
            {data.name}
          </PageHeaderComposable.Title>
          <PageHeaderComposable.Description>
            {data.description}
          </PageHeaderComposable.Description>
        </PageHeaderComposable.Header>
      </PageHeaderComposable>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', p: 3, gap: 3, overflow: 'auto' }}>
        {/* Main Content Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Content Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Content
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* Render HTML content */}
              <Box
                dangerouslySetInnerHTML={{ __html: data.content }}
                sx={{
                  '& h2': {
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    mt: 3,
                    mb: 1
                  },
                  '& p': {
                    mb: 2,
                    lineHeight: 1.6
                  },
                  '& ul': {
                    pl: 3,
                    mb: 2
                  },
                  '& li': {
                    mb: 0.5
                  }
                }}
              />
            </CardContent>
          </Card>

          {/* Additional Information Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Additional Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body1">
                    {data.category}
                  </Typography>
                </Box>
                {/* Add more fields as needed */}
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Sidebar */}
        <Box sx={{ width: 320, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Actions Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actions
              </Typography>
              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Copy />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={handleShare}
                >
                  Share
                </Button>
                {data.status !== 'archived' && (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Archive />}
                    onClick={() => setArchiveDialogOpen(true)}
                    color="warning"
                  >
                    Archive
                  </Button>
                )}
                <Divider />
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Trash />}
                  onClick={() => setDeleteDialogOpen(true)}
                  color="error"
                >
                  Delete
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Metadata Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Metadata
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Created
                  </Typography>
                  <Typography variant="body2">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    by {data.createdBy}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Last Modified
                  </Typography>
                  <Typography variant="body2">
                    {new Date(data.updatedAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    by {data.updatedBy}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    ID
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {data.id}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Related Items Card (optional) */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Related Items
              </Typography>
              <Stack spacing={1}>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Typography variant="body2">Related Item 1</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Typography variant="body2">Related Item 2</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Typography variant="body2">Related Item 3</Typography>
                </Paper>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete ENTITY_NAME?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{data.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Archive Confirmation Dialog */}
      <Dialog open={archiveDialogOpen} onClose={() => setArchiveDialogOpen(false)}>
        <DialogTitle>Archive ENTITY_NAME?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to archive "{data.name}"? You can restore it later if needed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setArchiveDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleArchive} color="warning" variant="contained">
            Archive
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ENTITY_NAME_DetailPage;