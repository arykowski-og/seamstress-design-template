/**
 * Form Template (Create/Edit)
 * Quick start template for form views in OpenGov prototypes
 *
 * Usage:
 * 1. Replace ENTITY_NAME with your entity (e.g., "Skill", "Agent")
 * 2. Update form fields based on your schema
 * 3. Implement validation rules
 * 4. Connect to real save API or keep mock
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Stack,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormHelperText
} from '@mui/material';
import { PageHeaderComposable } from '@opengov/components-page-header';
import TiptapEditor from '../components/TiptapEditor';

interface FormData {
  name: string;
  description: string;
  content: string;
  status: 'draft' | 'published';
  category: string;
  // Add more fields as needed
}

const ENTITY_NAME_FormPage: React.FC = () => {
  const navigate = useNavigate();
  const { entityId, id } = useParams<{ entityId: string; id?: string }>();
  const isEditMode = !!id;

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    content: '',
    status: 'draft',
    category: ''
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  // Load existing data in edit mode
  useEffect(() => {
    if (isEditMode) {
      loadExistingData();
    }
  }, [id]);

  const loadExistingData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock existing data
      setFormData({
        name: 'Example Item',
        description: 'This is an example description',
        content: '<p>This is the main content of the item.</p>',
        status: 'published',
        category: 'category1'
      });
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle field changes
  const handleFieldChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: any } }
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setHasUnsavedChanges(true);

    // Clear field error on change
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle content editor change
  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
    setHasUnsavedChanges(true);
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to detail page after save
      const savedId = id || 'new_item_123';
      navigate(`/entity/${entityId}/ENTITY_NAME_LOWER/${savedId}`);
    } catch (error) {
      console.error('Failed to save:', error);
      // Handle error - show notification
    } finally {
      setSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setShowDiscardDialog(true);
    } else {
      navigateBack();
    }
  };

  const navigateBack = () => {
    if (isEditMode) {
      navigate(`/entity/${entityId}/ENTITY_NAME_LOWER/${id}`);
    } else {
      navigate(`/entity/${entityId}/ENTITY_NAME_LOWER`);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', backgroundColor: 'background.default' }}>
      {/* Page Header */}
      <PageHeaderComposable>
        <PageHeaderComposable.Header>
          <PageHeaderComposable.Breadcrumbs breadcrumbs={[
            { path: `/entity/${entityId}/ENTITY_NAME_LOWER`, title: 'ENTITY_NAME_PLURAL' },
            { title: isEditMode ? 'Edit' : 'Create' }
          ]} />
          <PageHeaderComposable.Title status={
            <Chip label={formData.status} size="small" color={formData.status === 'published' ? 'success' : 'default'} />
          }>
            {isEditMode ? 'Edit ENTITY_NAME' : 'Create New ENTITY_NAME'}
          </PageHeaderComposable.Title>
        </PageHeaderComposable.Header>
      </PageHeaderComposable>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', p: 3, gap: 3, overflow: 'auto' }}>
        {/* Main Form Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Basic Information Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Stack spacing={3}>
                <TextField
                  label="Name"
                  value={formData.name}
                  onChange={handleFieldChange('name')}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  fullWidth
                />

                <TextField
                  label="Description"
                  value={formData.description}
                  onChange={handleFieldChange('description')}
                  error={!!errors.description}
                  helperText={errors.description}
                  multiline
                  rows={3}
                  required
                  fullWidth
                />

                <FormControl error={!!errors.category} required fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={handleFieldChange('category') as any}
                    label="Category"
                  >
                    <MenuItem value="">Select a category</MenuItem>
                    <MenuItem value="category1">Category 1</MenuItem>
                    <MenuItem value="category2">Category 2</MenuItem>
                    <MenuItem value="category3">Category 3</MenuItem>
                  </Select>
                  {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                </FormControl>
              </Stack>
            </CardContent>
          </Card>

          {/* Content Editor Card */}
          <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Content
              </Typography>
              <Box sx={{ flex: 1, minHeight: 300 }}>
                <TiptapEditor
                  content={formData.content}
                  onChange={handleContentChange}
                  placeholder="Enter the main content..."
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Sidebar */}
        <Box sx={{ width: 320, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Settings Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Settings
              </Typography>
              <Stack spacing={3}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={handleFieldChange('status') as any}
                    label="Status"
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </CardContent>
          </Card>

          {/* Metadata Card (Edit mode only) */}
          {isEditMode && (
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
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Last Modified
                    </Typography>
                    <Typography variant="body2">
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>

      {/* Action Bar */}
      <Box sx={{
        p: 2,
        borderTop: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper'
      }}>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              isEditMode ? 'Save Changes' : 'Create'
            )}
          </Button>
        </Stack>
      </Box>

      {/* Discard Changes Dialog */}
      <Dialog open={showDiscardDialog} onClose={() => setShowDiscardDialog(false)}>
        <DialogTitle>Discard unsaved changes?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have unsaved changes. Are you sure you want to discard them?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDiscardDialog(false)}>
            Keep Editing
          </Button>
          <Button onClick={navigateBack} color="error">
            Discard Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ENTITY_NAME_FormPage;