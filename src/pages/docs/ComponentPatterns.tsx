import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
  useTheme,
  alpha,
  Divider,
  Card,
  CardContent,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Category as ComponentsIcon,
  ViewList as ListIcon,
  Dashboard as DashboardIcon,
  Description as DetailIcon,
  Input as FormIcon,
  CheckCircle as CheckIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { DocsLayout } from '../../components/DocsLayout';

export default function ComponentPatterns() {
  const theme = useTheme();

  const CodeBlock = ({ children }: { children: string }) => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
        border: `1px solid ${theme.palette.divider}`,
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        overflow: 'auto',
      }}
    >
      <pre style={{ margin: 0 }}>{children}</pre>
    </Paper>
  );

  return (
    <DocsLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(theme.palette.info.main, 0.1)} 100%)`,
            borderBottom: `1px solid ${theme.palette.divider}`,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Component Patterns
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: 800 }}>
              Common UI patterns, component usage guidelines, and best practices for building consistent interfaces
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Chip label="50+ Components" color="secondary" />
              <Chip label="Material-UI v7" color="info" />
              <Chip label="OpenGov Capital" />
            </Stack>
          </Container>
        </Box>

        {/* Content */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* Introduction */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" gutterBottom>
              Component Library
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Seamstress leverages two powerful component libraries: Material-UI v7 for foundational UI components
              and OpenGov Capital Design System for specialized business components. Understanding when to use each
              ensures consistency and optimal user experience.
            </Typography>

            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ height: '100%', border: `1px solid ${theme.palette.info.main}` }}>
                  <CardContent>
                    <Typography variant="h6" color="info" gutterBottom>
                      Material-UI Components
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Core building blocks for layouts, forms, navigation, and data display. Over 50 production-ready
                      components with full accessibility support.
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Common Components:
                    </Typography>
                    <Stack spacing={0.5}>
                      <Typography variant="body2">
                        • Box, Container, Stack, Grid
                      </Typography>
                      <Typography variant="body2">
                        • Button, TextField, Select, Checkbox
                      </Typography>
                      <Typography variant="body2">
                        • Card, Paper, Divider, Chip
                      </Typography>
                      <Typography variant="body2">
                        • Typography, Alert, Dialog, Menu
                      </Typography>
                      <Typography variant="body2">
                        • Table, DataGrid, Tabs, Accordion
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ height: '100%', border: `1px solid ${theme.palette.success.main}` }}>
                  <CardContent>
                    <Typography variant="h6" color="success" gutterBottom>
                      OpenGov Capital Components
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Specialized components built specifically for government applications. Includes navigation,
                      data visualization, and domain-specific UI patterns.
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Key Components:
                    </Typography>
                    <Stack spacing={0.5}>
                      <Typography variant="body2">
                        • NavBar, GlobalNav, UtilityTray
                      </Typography>
                      <Typography variant="body2">
                        • DataGrid (enhanced), Charts
                      </Typography>
                      <Typography variant="body2">
                        • Form Builders, Validators
                      </Typography>
                      <Typography variant="body2">
                        • Status Badges, Workflow UI
                      </Typography>
                      <Typography variant="body2">
                        • Document Viewers, File Uploads
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* UI Patterns */}
          <Box sx={{ mb: 8 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
              <ComponentsIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h3">Common UI Patterns</Typography>
            </Stack>

            <Typography variant="body1" color="text.secondary" paragraph>
              Four core UI patterns cover most application needs: List views for browsing data, Form views for
              data entry, Detail views for individual records, and Dashboard views for metrics and analytics.
            </Typography>

            {/* List Pattern */}
            <Box sx={{ mb: 6 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <ListIcon color="info" />
                <Typography variant="h5">List Pattern</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                For displaying collections of items. Use DataGrid for tabular data, Card grids for rich content,
                or MUI List for simple items.
              </Typography>
              <CodeBlock>{`{/* DataGrid for tabular data */}
<DataGrid
  rows={rows}
  columns={columns}
  pageSize={10}
  checkboxSelection
  disableRowSelectionOnClick
/>

{/* Card grid for rich content */}
<Grid container spacing={2}>
  {items.map(item => (
    <Grid item sx={{ flex: '1 1 400px', minWidth: '300px' }} key={item.id}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2">{item.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View</Button>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>

{/* Simple list */}
<List>
  {items.map(item => (
    <ListItem key={item.id}>
      <ListItemIcon>
        <CheckIcon />
      </ListItemIcon>
      <ListItemText
        primary={item.title}
        secondary={item.description}
      />
    </ListItem>
  ))}
</List>`}</CodeBlock>
            </Box>

            {/* Form Pattern */}
            <Box sx={{ mb: 6 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <FormIcon color="success" />
                <Typography variant="h5">Form Pattern</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                For data entry and editing. Use Stack for vertical layouts, Grid for multi-column forms, and
                consistent spacing between fields.
              </Typography>
              <CodeBlock>{`<Container maxWidth="sm">
  <Paper sx={{ p: 4 }}>
    <Typography variant="h5" gutterBottom>
      Create New Item
    </Typography>

    <Stack spacing={3} sx={{ mt: 3 }}>
      <TextField
        label="Title"
        required
        fullWidth
      />

      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Category" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Status" select fullWidth>
            {/* Options */}
          </TextField>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button>Cancel</Button>
        <Button variant="contained">Save</Button>
      </Stack>
    </Stack>
  </Paper>
</Container>`}</CodeBlock>
            </Box>

            {/* Detail Pattern */}
            <Box sx={{ mb: 6 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <DetailIcon color="warning" />
                <Typography variant="h5">Detail Pattern</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                For displaying individual record details. Use sections, clear labels, and consistent spacing.
                Combine with tabs for complex records.
              </Typography>
              <CodeBlock>{`<Container maxWidth="md">
  <Paper sx={{ p: 4 }}>
    {/* Header */}
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 4 }}
    >
      <Typography variant="h4">Item Details</Typography>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined">Edit</Button>
        <Button variant="contained">Delete</Button>
      </Stack>
    </Stack>

    {/* Details */}
    <Stack spacing={3} divider={<Divider />}>
      <Box>
        <Typography variant="overline" color="text.secondary">
          Title
        </Typography>
        <Typography variant="body1">Example Item</Typography>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Description
        </Typography>
        <Typography variant="body1">
          Detailed description goes here
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="overline" color="text.secondary">
            Status
          </Typography>
          <Chip label="Active" color="success" size="small" />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="overline" color="text.secondary">
            Created
          </Typography>
          <Typography variant="body2">Jan 15, 2025</Typography>
        </Grid>
      </Grid>
    </Stack>
  </Paper>
</Container>`}</CodeBlock>
            </Box>

            {/* Dashboard Pattern */}
            <Box sx={{ mb: 6 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <DashboardIcon color="error" />
                <Typography variant="h5">Dashboard Pattern</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                For metrics, analytics, and data visualization. Use flexbox grid for metric cards and consistent
                card heights for visual harmony.
              </Typography>
              <CodeBlock>{`<Container maxWidth="xl">
  {/* Metrics Row */}
  <Grid container spacing={2} sx={{ mb: 4 }}>
    {metrics.map(metric => (
      <Grid item sx={{ flex: '1 1 200px', minWidth: '200px' }} key={metric.id}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              {metric.label}
            </Typography>
            <Typography variant="h3" sx={{ mt: 1 }}>
              {metric.value}
            </Typography>
            <Typography variant="body2" color="success.main">
              +{metric.change}% from last month
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>

  {/* Charts and Tables */}
  <Grid container spacing={2}>
    <Grid item xs={12} lg={8}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Activity Over Time
        </Typography>
        {/* Chart component */}
      </Paper>
    </Grid>

    <Grid item xs={12} lg={4}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <List>
          {/* Activity items */}
        </List>
      </Paper>
    </Grid>
  </Grid>
</Container>`}</CodeBlock>
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* Component Best Practices */}
          <Box sx={{ mb: 8 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
              <CodeIcon color="warning" sx={{ fontSize: 40 }} />
              <Typography variant="h3">Best Practices</Typography>
            </Stack>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Card Components
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Always use elevation={0} with border"
                          secondary="Consistent with design system"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Set height: '100%' for grid cards"
                          secondary="Ensures even row heights"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Use CardActionArea for clickable cards"
                          secondary="Better accessibility and UX"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Button Components
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Use variant='contained' for primary actions"
                          secondary="One per page/section"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Use variant='outlined' for secondary actions"
                          secondary="Cancel, alternative actions"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Use variant='text' for tertiary actions"
                          secondary="Low-priority, inline actions"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Form Components
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Use fullWidth for text inputs"
                          secondary="Maximizes input area"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Mark required fields with required prop"
                          secondary="Shows asterisk indicator"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Use helperText for validation messages"
                          secondary="Clear, actionable feedback"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      DataGrid Components
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Use disableRowSelectionOnClick"
                          secondary="Prevents accidental selections"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Set reasonable pageSize (10-25)"
                          secondary="Balance UX and performance"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Define clear column headers"
                          secondary="Use headerName for clarity"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* Accessibility */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
              Accessibility Guidelines
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
              All components should follow WCAG 2.1 AA standards. Material-UI provides excellent accessibility
              support out of the box, but you must use components correctly.
            </Alert>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="h6" gutterBottom>
                    Keyboard Navigation
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      • All interactive elements must be keyboard accessible
                    </Typography>
                    <Typography variant="body2">
                      • Use proper tab order (top-to-bottom, left-to-right)
                    </Typography>
                    <Typography variant="body2">
                      • Provide visible focus indicators
                    </Typography>
                    <Typography variant="body2">
                      • Support keyboard shortcuts for common actions
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="h6" gutterBottom>
                    Screen Readers
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      • Use semantic HTML (headings, lists, buttons)
                    </Typography>
                    <Typography variant="body2">
                      • Provide aria-label for icon-only buttons
                    </Typography>
                    <Typography variant="body2">
                      • Use descriptive link text (not "click here")
                    </Typography>
                    <Typography variant="body2">
                      • Announce dynamic content changes
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="h6" gutterBottom>
                    Color Contrast
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      • Maintain 4.5:1 contrast for normal text
                    </Typography>
                    <Typography variant="body2">
                      • Maintain 3:1 contrast for large text (18px+)
                    </Typography>
                    <Typography variant="body2">
                      • Don't rely on color alone for meaning
                    </Typography>
                    <Typography variant="body2">
                      • Test in both light and dark modes
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="h6" gutterBottom>
                    Form Accessibility
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      • Label all form inputs clearly
                    </Typography>
                    <Typography variant="body2">
                      • Provide helpful error messages
                    </Typography>
                    <Typography variant="body2">
                      • Group related fields with fieldset
                    </Typography>
                    <Typography variant="body2">
                      • Indicate required fields clearly
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* Quick Reference */}
          <Box>
            <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
              Quick Reference
            </Typography>

            <TableContainer component={Paper} elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Use Case</strong></TableCell>
                    <TableCell><strong>Recommended Components</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Page Layout</TableCell>
                    <TableCell>Container, Box, Stack, Grid</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Data Tables</TableCell>
                    <TableCell>DataGrid, Table, TableContainer</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Forms</TableCell>
                    <TableCell>TextField, Select, Checkbox, Radio, Switch</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Navigation</TableCell>
                    <TableCell>Tabs, Menu, Drawer, Breadcrumbs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Feedback</TableCell>
                    <TableCell>Alert, Snackbar, Dialog, CircularProgress</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Content Display</TableCell>
                    <TableCell>Card, Paper, Accordion, List</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Actions</TableCell>
                    <TableCell>Button, IconButton, Fab, ButtonGroup</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status & Labels</TableCell>
                    <TableCell>Chip, Badge, Tooltip</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </DocsLayout>
  );
}
