/**
 * Knowledge Edit Page
 * Unified page for viewing and editing knowledge documents
 * Uses PageHeaderComposable pattern like AgentEditPage
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Chip,
  IconButton,
  Avatar,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import KnowledgeEditor from '../../components/knowledge/KnowledgeEditor';
import Drawer from '../../components/Drawer/Drawer';
import { PageHeaderComposable } from '@opengov/components-page-header';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { pageStyles } from '../../theme/pageStyles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HistoryIcon from '@mui/icons-material/History';
import { knowledgeService } from '../../services/knowledge/KnowledgeService';
import type { KnowledgeDocument, DocumentVersion } from '../../services/knowledge/KnowledgeTypes';
import TagIcon from '@mui/icons-material/Tag';
import RestoreIcon from '@mui/icons-material/Restore';
import { Result } from '@opengov/components-result';

const KnowledgeEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const documentId = id || searchParams.get('doc');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [document, setDocument] = useState<KnowledgeDocument | null>(null);
  const [publishingStatus, setPublishingStatus] = useState<'draft' | 'published'>('draft');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [versions, setVersions] = useState<DocumentVersion[]>([]);

  const [originalDocument, setOriginalDocument] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    publishingStatus: 'draft' as const
  });

  // Load document on mount
  useEffect(() => {
    if (documentId) {
      loadDocument();
    } else {
      // New document mode
      setLoading(false);
      setIsEditing(true);
    }
  }, [documentId]);

  // Check for unsaved changes
  useEffect(() => {
    if (!loading) {
      const changed =
        title !== originalDocument.title ||
        content !== originalDocument.content ||
        JSON.stringify(tags) !== JSON.stringify(originalDocument.tags) ||
        publishingStatus !== originalDocument.publishingStatus;
      setHasChanges(changed);
    }
  }, [title, content, tags, publishingStatus, originalDocument, loading]);

  const loadDocument = async () => {
    if (!documentId) return;

    setLoading(true);
    setError(null);
    try {
      const doc = await knowledgeService.getDocument(documentId);
      if (doc) {
        setDocument(doc);
        setTitle(doc.title);
        setContent(doc.content);
        setTags(doc.metadata.tags);
        setPublishingStatus(doc.publishingStatus || 'draft');
        setOriginalDocument({
          title: doc.title,
          content: doc.content,
          tags: doc.metadata.tags,
          publishingStatus: doc.publishingStatus || 'draft'
        });
      } else {
        setError(`Document with ID ${documentId} not found`);
      }
    } catch (err) {
      console.error('Failed to load document:', err);
      setError('Failed to load document');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (documentId) {
        // Update existing document
        const updated = await knowledgeService.updateDocument(documentId, {
          title,
          content,
          tags,
        });

        // Update publishing status if changed
        if (publishingStatus !== originalDocument.publishingStatus) {
          if (publishingStatus === 'published') {
            await knowledgeService.publishDocument(documentId);
          } else {
            await knowledgeService.unpublishDocument(documentId);
          }
        }

        setDocument(updated);
        setOriginalDocument({ title, content, tags, publishingStatus });
        setHasChanges(false);
        setIsEditing(false);
      } else {
        // Create new document
        const newDoc = await knowledgeService.createDocument(
          title,
          content,
          'markdown',
          tags
        );

        if (publishingStatus === 'published') {
          await knowledgeService.publishDocument(newDoc.id);
        }

        // Navigate to the new document
        navigate(`/knowledge/${newDoc.id}`);
      }
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save document');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!documentId) return;

    setLoading(true);
    try {
      await knowledgeService.deleteDocument(documentId);
      setDeleteDialogOpen(false);
      navigate('/agent-studio/knowledge');
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete document');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleCancel = () => {
    if (documentId) {
      setTitle(originalDocument.title);
      setContent(originalDocument.content);
      setTags(originalDocument.tags);
      setPublishingStatus(originalDocument.publishingStatus);
      setIsEditing(false);
      setHasChanges(false);
    } else {
      navigate('/agent-studio/knowledge');
    }
  };

  const loadVersionHistory = async () => {
    if (!documentId) return;

    setLoading(true);
    try {
      const versionHistory = await knowledgeService.getVersionHistory(documentId);
      setVersions(versionHistory);
      setHistoryDrawerOpen(true);
    } catch (error) {
      console.error('Failed to load versions:', error);
      setError('Failed to load version history');
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreVersion = async (versionId: string) => {
    if (!documentId) return;

    setLoading(true);
    try {
      const restored = await knowledgeService.restoreVersion(documentId, versionId);
      setDocument(restored);
      setTitle(restored.title);
      setContent(restored.content);
      setTags(restored.metadata.tags);
      setOriginalDocument({
        title: restored.title,
        content: restored.content,
        tags: restored.metadata.tags,
        publishingStatus: restored.publishingStatus || 'draft'
      });
      setHistoryDrawerOpen(false);
    } catch (error) {
      console.error('Failed to restore version:', error);
      setError('Failed to restore version');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={pageStyles.formView.pageContainer}>
      {/* Page Header */}
      <PageHeaderComposable>
        <PageHeaderComposable.Header
          actions={[
            <Stack key="user-info" direction="column" alignItems="flex-end" spacing={1}>
              {document && (
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Last updated: {document.metadata?.modified ? new Date(document.metadata.modified).toLocaleDateString() : 'N/A'}
                  </Typography>
                  <Avatar>
                    {document.metadata?.author?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                </Stack>
              )}
              {documentId && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<HistoryIcon />}
                    onClick={loadVersionHistory}
                  >
                    History
                  </Button>
                  {!isEditing ? (
                    <Button
                      variant="outlined"
                      size="medium"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="medium"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  )}
                </Stack>
              )}
            </Stack>
          ]}
        >
          <PageHeaderComposable.Breadcrumbs
            breadcrumbs={[
              {
                path: '/knowledge',
                title: 'Knowledge',
                onClick: (e: React.MouseEvent) => {
                  e.preventDefault();
                  navigate('/agent-studio/knowledge');
                }
              },
              { title: title || 'New Document' }
            ]}
          />
          {isEditing || !documentId ? (
            <Box sx={{ width: '100%' }}>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="standard"
                placeholder="Enter document title"
                fullWidth
                sx={{
                  '& .MuiInput-root': {
                    fontSize: '32px',
                    fontWeight: 600,
                  },
                  '& .MuiInput-input': {
                    padding: 0,
                  },
                }}
              />
            </Box>
          ) : (
            <PageHeaderComposable.Title
              status={{
                label: publishingStatus === 'published' ? 'Published' : 'Draft',
                color: publishingStatus === 'published' ? 'success' : 'default'
              }}
            >
              {title || 'New Document'}
            </PageHeaderComposable.Title>
          )}
        </PageHeaderComposable.Header>
      </PageHeaderComposable>

      {/* Main Container */}
      <Box sx={pageStyles.formView.mainContainer}>
        {/* Content Area */}
        <Box sx={pageStyles.formView.contentArea}>
          {/* Error Alert */}
          {error && (
            <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form Section */}
          <Box sx={{
            ...pageStyles.formView.formSection
          }}>

            {/* Tags Section */}
            <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center" sx={{ flexShrink: 0 }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'text.primary'
                }}
              >
                Tags:
              </Typography>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onDelete={isEditing || !documentId ? () => handleRemoveTag(tag) : undefined}
                />
              ))}
              {(isEditing || !documentId) && (
                <TextField
                  size="small"
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTag();
                    }
                  }}
                  sx={{ width: 120 }}
                />
              )}
            </Stack>

            {/* Content/Description Field */}
            <Box sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              overflow: 'hidden'
            }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'text.primary',
                  mb: 1,
                  flexShrink: 0
                }}
              >
                Content
              </Typography>
              <Box sx={{
                flex: 1,
                minHeight: 0,
                overflow: 'auto',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                backgroundColor: 'background.paper'
              }}>
                <KnowledgeEditor
                  value={content}
                  onChange={(value) => {
                    setContent(value);
                  }}
                  placeholder="Enter document content... Use @ to mention documents, agents, skills, or tools"
                  minHeight="100%"
                  showToolbar={isEditing || !documentId}
                  readOnly={!isEditing && !!documentId}
                />
              </Box>
            </Box>

            {/* Action Buttons Bar */}
            <Box sx={{
              ...pageStyles.formView.actionBar,
              flexShrink: 0
            }}>
              {documentId && isEditing && (
                <Button
                  startIcon={<DeleteOutlineIcon />}
                  onClick={() => setDeleteDialogOpen(true)}
                  color="error"
                >
                  Delete Document
                </Button>
              )}

              <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: 'auto' }}>
                {(isEditing || !documentId) && (
                  <>
                    <ToggleButtonGroup
                      value={publishingStatus}
                      exclusive
                      onChange={(e, newStatus) => newStatus && setPublishingStatus(newStatus)}
                      size="small"
                    >
                      <ToggleButton value="draft">Draft</ToggleButton>
                      <ToggleButton value="published">Published</ToggleButton>
                    </ToggleButtonGroup>

                    <Button
                      variant="contained"
                      onClick={handleSave}
                      disabled={!hasChanges || !title.trim() || loading}
                    >
                      Save Changes
                    </Button>
                  </>
                )}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Version History Drawer */}
      <Drawer
        open={historyDrawerOpen}
        onClose={() => setHistoryDrawerOpen(false)}
        title="Version History"
        subtitle="View and restore previous versions"
        anchor="right"
        width={480}
        hideFooter={true}
      >
        {versions.length > 0 ? (
          <Stack spacing={2}>
            {versions.map((version) => (
              <Box
                key={version.id}
                sx={{
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle2">
                      Version {version.version}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(version.created).toLocaleString()} by {version.author}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => handleRestoreVersion(version.id)}
                  >
                    <RestoreIcon />
                  </IconButton>
                </Box>
                {version.changeDescription && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {version.changeDescription}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <Result
            status="empty"
            title="No version history"
            description="This document doesn't have any previous versions yet"
          />
        )}
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Document</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default KnowledgeEditPage;
