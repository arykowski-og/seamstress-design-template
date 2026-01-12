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
  Button,
} from '@mui/material';
import {
  ViewQuilt as GridIcon,
  ViewColumn as ColumnIcon,
  ViewModule as ModuleIcon,
  Devices as ResponsiveIcon,
  Architecture as StructureIcon,
  TabletMac as TabletIcon,
  PhoneIphone as PhoneIcon,
  Computer as DesktopIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { DocsLayout } from '../../components/DocsLayout';

export default function LayoutRules() {
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

  // Visual spacing helper
  const SpacingBox = ({ spacing, label }: { spacing: number; label: string }) => (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          width: spacing * 8,
          height: spacing * 8,
          bgcolor: alpha(theme.palette.primary.main, 0.2),
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
        }}
      >
        <Typography variant="h6" color="primary.main" fontWeight="bold">
          {spacing}
        </Typography>
      </Box>
      <Typography variant="caption" display="block" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="caption" display="block" sx={{ fontFamily: 'monospace' }}>
        {spacing * 8}px
      </Typography>
    </Box>
  );

  return (
    <DocsLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.1)} 100%)`,
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
              Layout Rules
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: 800 }}>
              Visual guide to page structure, grid systems, spacing, and responsive design patterns
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Chip label="MUI Grid System" color="info" />
              <Chip label="Flexbox Patterns" color="success" />
              <Chip label="Mobile First" />
            </Stack>
          </Container>
        </Box>

        {/* Content */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Stack spacing={10}>
            {/* Page Anatomy */}
            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <StructureIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h3">Page Anatomy</Typography>
              </Stack>

              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Every page follows a consistent three-part structure. Here's a visual breakdown:
              </Typography>

              {/* Visual Page Structure */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  border: `2px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
                }}
              >
                {/* Layout Wrapper */}
                <Box
                  sx={{
                    border: `3px dashed ${theme.palette.info.main}`,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.info.main, 0.05),
                    mb: 2,
                  }}
                >
                  <Typography variant="caption" color="info.main" fontWeight="bold" gutterBottom display="block">
                    1. LAYOUT WRAPPER (DocsLayout, AppLayout, etc.)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Provides navigation, header, and global UI
                  </Typography>
                </Box>

                {/* Hero Section */}
                <Box
                  sx={{
                    border: `3px dashed ${theme.palette.success.main}`,
                    p: 3,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.05),
                    mb: 2,
                  }}
                >
                  <Typography variant="caption" color="success.main" fontWeight="bold" gutterBottom display="block">
                    2. HERO SECTION (Optional)
                  </Typography>
                  <Stack spacing={1} sx={{ my: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 4, height: 32, bgcolor: 'success.main', borderRadius: 0.5 }} />
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Page Title
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ pl: 2 }}>
                      Subtitle or description goes here
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    Full-width gradient background • py: 8 (64px vertical padding) • Container maxWidth="lg"
                  </Typography>
                </Box>

                {/* Main Content */}
                <Box
                  sx={{
                    border: `3px dashed ${theme.palette.warning.main}`,
                    p: 3,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.warning.main, 0.05),
                  }}
                >
                  <Typography variant="caption" color="warning.main" fontWeight="bold" gutterBottom display="block">
                    3. MAIN CONTENT AREA
                  </Typography>
                  <Box
                    sx={{
                      my: 2,
                      p: 2,
                      bgcolor: theme.palette.background.paper,
                      borderRadius: 1,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Your content here (grids, cards, forms, tables, etc.)
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Container maxWidth="lg" • py: 8 (64px top & bottom padding)
                  </Typography>
                </Box>
              </Paper>
            </Box>

            {/* Container Widths - Visual */}
            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <ModuleIcon color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h3">Container Widths</Typography>
              </Stack>

              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Containers constrain content width for readability. Here's how each size looks:
              </Typography>

              <Stack spacing={3}>
                {[
                  { size: 'xs', width: 444, label: 'Extra Small', color: theme.palette.info.main, use: 'Narrow forms, mobile dialogs' },
                  { size: 'sm', width: 600, label: 'Small', color: theme.palette.success.main, use: 'Simple pages, small content' },
                  { size: 'md', width: 900, label: 'Medium', color: theme.palette.warning.main, use: 'Standard content width' },
                  { size: 'lg', width: 1200, label: 'Large', color: theme.palette.primary.main, use: 'Default for most pages ✓' },
                  { size: 'xl', width: 1536, label: 'Extra Large', color: theme.palette.secondary.main, use: 'Wide dashboards, data tables' },
                ].map((container) => (
                  <Box key={container.size}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                      <Chip
                        label={container.size}
                        size="small"
                        sx={{
                          bgcolor: alpha(container.color, 0.1),
                          color: container.color,
                          fontWeight: 'bold',
                          fontFamily: 'monospace',
                        }}
                      />
                      <Typography variant="h6">{container.label}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                        {container.width}px max
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        height: 60,
                        maxWidth: container.width,
                        bgcolor: alpha(container.color, 0.15),
                        border: `2px solid ${container.color}`,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" fontWeight="medium">
                        {container.use}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Alert severity="info" sx={{ mt: 4 }}>
                <strong>Pro Tip:</strong> Use <code>maxWidth="lg"</code> (1200px) as your default. It provides
                excellent readability while accommodating most content needs.
              </Alert>
            </Box>

            {/* Spacing System - Visual */}
            <Box>
              <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
                Spacing System
              </Typography>

              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                MUI uses an 8px base unit. All spacing is calculated as multiples of 8. Here's the visual scale:
              </Typography>

              <Paper elevation={0} sx={{ p: 4, border: `1px solid ${theme.palette.divider}` }}>
                <Grid container spacing={4} justifyContent="center">
                  {[
                    { spacing: 0.5, label: 'Tiny' },
                    { spacing: 1, label: 'Small' },
                    { spacing: 2, label: 'Medium' },
                    { spacing: 3, label: 'Large' },
                    { spacing: 4, label: 'XL' },
                    { spacing: 6, label: 'XXL' },
                    { spacing: 8, label: 'Huge' },
                  ].map((item) => (
                    <Grid key={item.spacing} sx={{ flex: '0 0 auto' }}>
                      <SpacingBox spacing={item.spacing} label={item.label} />
                    </Grid>
                  ))}
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom>
                  Common Spacing Values
                </Typography>
                <Grid container spacing={2}>
                  <Grid sx={{ flex: '1 1 250px', minWidth: '250px' }}>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        <code>spacing={'{2}'}</code> → 16px (buttons, chips)
                      </Typography>
                      <Typography variant="body2">
                        <code>spacing={'{3}'}</code> → 24px (cards, sections)
                      </Typography>
                      <Typography variant="body2">
                        <code>spacing={'{4}'}</code> → 32px (major sections)
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid sx={{ flex: '1 1 250px', minWidth: '250px' }}>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        <code>py={'{8}'}</code> → 64px (hero sections)
                      </Typography>
                      <Typography variant="body2">
                        <code>p={'{3}'}</code> → 24px (card padding)
                      </Typography>
                      <Typography variant="body2">
                        <code>gap={'{2}'}</code> → 16px (flex gaps)
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </Box>

            {/* Grid Systems - Visual Comparison */}
            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <GridIcon color="info" sx={{ fontSize: 40 }} />
                <Typography variant="h3">Grid Systems</Typography>
              </Stack>

              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                We use two grid approaches. Here's when to use each:
              </Typography>

              <Grid container spacing={4}>
                {/* Breakpoint Grid */}
                <Grid sx={{ flex: '1 1 500px', minWidth: '300px' }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: `2px solid ${theme.palette.info.main}`,
                      bgcolor: alpha(theme.palette.info.main, 0.03),
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" color="info.main" gutterBottom>
                        1. Breakpoint Grid
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        For forms and structured content with specific layouts at different screen sizes.
                      </Typography>

                      {/* Visual Example */}
                      <Box sx={{ my: 3 }}>
                        <Typography variant="caption" fontWeight="bold" display="block" gutterBottom>
                          Visual Example (3 columns → 2 → 1):
                        </Typography>
                        <Grid container spacing={1}>
                          {[1, 2, 3].map((n) => (
                            <Grid key={n} xs={12} sm={6} md={4}>
                              <Box
                                sx={{
                                  bgcolor: alpha(theme.palette.info.main, 0.2),
                                  border: `1px solid ${theme.palette.info.main}`,
                                  borderRadius: 1,
                                  p: 2,
                                  textAlign: 'center',
                                }}
                              >
                                <Typography variant="caption">{n}</Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>

                      <CodeBlock>{`<Grid container spacing={3}>
  <Grid xs={12} sm={6} md={4}>
    <Card>Card 1</Card>
  </Grid>
  <Grid xs={12} sm={6} md={4}>
    <Card>Card 2</Card>
  </Grid>
  <Grid xs={12} sm={6} md={4}>
    <Card>Card 3</Card>
  </Grid>
</Grid>`}</CodeBlock>

                      <Alert severity="info" sx={{ mt: 2 }} icon={<CheckIcon />}>
                        <Typography variant="caption">
                          <strong>Best for:</strong> Forms, structured layouts, precise column control
                        </Typography>
                      </Alert>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Flexbox Grid */}
                <Grid sx={{ flex: '1 1 500px', minWidth: '300px' }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: `2px solid ${theme.palette.success.main}`,
                      bgcolor: alpha(theme.palette.success.main, 0.03),
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" color="success.main" gutterBottom>
                        2. Flexbox Grid ⭐
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        For card galleries and dashboards. Cards automatically wrap and stay equal width.
                      </Typography>

                      {/* Visual Example */}
                      <Box sx={{ my: 3 }}>
                        <Typography variant="caption" fontWeight="bold" display="block" gutterBottom>
                          Visual Example (auto-wrapping cards):
                        </Typography>
                        <Grid container spacing={1}>
                          {[1, 2, 3, 4].map((n) => (
                            <Grid key={n} sx={{ flex: '1 1 150px', minWidth: '100px' }}>
                              <Box
                                sx={{
                                  bgcolor: alpha(theme.palette.success.main, 0.2),
                                  border: `1px solid ${theme.palette.success.main}`,
                                  borderRadius: 1,
                                  p: 2,
                                  textAlign: 'center',
                                  height: '100%',
                                }}
                              >
                                <Typography variant="caption">{n}</Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>

                      <CodeBlock>{`<Grid container spacing={2}>
  <Grid sx={{
    flex: '1 1 400px',
    minWidth: '300px'
  }}>
    <Card sx={{ height: '100%' }}>
      Card 1
    </Card>
  </Grid>
  {/* More cards... */}
</Grid>`}</CodeBlock>

                      <Alert severity="success" sx={{ mt: 2 }} icon={<CheckIcon />}>
                        <Typography variant="caption">
                          <strong>Best for:</strong> Dashboards, card galleries, homepage sections
                        </Typography>
                      </Alert>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Responsive Breakpoints - Visual */}
            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <ResponsiveIcon color="secondary" sx={{ fontSize: 40 }} />
                <Typography variant="h3">Responsive Breakpoints</Typography>
              </Stack>

              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Design mobile-first, then enhance for larger screens. Here are our breakpoint ranges:
              </Typography>

              <Grid container spacing={3}>
                {[
                  { name: 'xs', range: '0px+', icon: <PhoneIcon />, color: theme.palette.info.main, device: 'Mobile Portrait' },
                  { name: 'sm', range: '600px+', icon: <PhoneIcon />, color: theme.palette.success.main, device: 'Mobile Landscape' },
                  { name: 'md', range: '900px+', icon: <TabletIcon />, color: theme.palette.warning.main, device: 'Tablet' },
                  { name: 'lg', range: '1200px+', icon: <DesktopIcon />, color: theme.palette.primary.main, device: 'Desktop' },
                  { name: 'xl', range: '1536px+', icon: <DesktopIcon />, color: theme.palette.secondary.main, device: 'Large Desktop' },
                ].map((bp) => (
                  <Grid key={bp.name} sx={{ flex: '1 1 200px', minWidth: '150px' }}>
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',
                        border: `2px solid ${bp.color}`,
                        bgcolor: alpha(bp.color, 0.05),
                      }}
                    >
                      <CardContent>
                        <Stack spacing={2} alignItems="center">
                          <Box sx={{ color: bp.color }}>
                            {bp.icon}
                          </Box>
                          <Box sx={{ textAlign: 'center' }}>
                            <Chip
                              label={bp.name}
                              size="small"
                              sx={{
                                bgcolor: bp.color,
                                color: 'white',
                                fontWeight: 'bold',
                                mb: 1,
                              }}
                            />
                            <Typography variant="body2" fontWeight="bold">
                              {bp.range}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {bp.device}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Alert severity="info" sx={{ mt: 4 }}>
                <Typography variant="body2">
                  <strong>Mobile-First Approach:</strong> Start with mobile styles (no breakpoint), then use{' '}
                  <code>sm:</code>, <code>md:</code>, <code>lg:</code> to enhance for larger screens.
                </Typography>
              </Alert>
            </Box>

            {/* Common Patterns - Visual Examples */}
            <Box>
              <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
                Common Layout Patterns
              </Typography>

              <Stack spacing={6}>
                {/* Dashboard Pattern */}
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Dashboard Layout
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Metric cards in auto-wrapping grid. Cards maintain equal width and automatically adjust columns.
                  </Typography>
                  <Paper elevation={0} sx={{ p: 3, border: `2px solid ${theme.palette.divider}` }}>
                    <Grid container spacing={2}>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <Grid key={n} sx={{ flex: '1 1 180px', minWidth: '150px' }}>
                          <Card sx={{ height: '100%', bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                              <Typography variant="h4" color="primary.main">
                                {n * 123}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Metric {n}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                  <CodeBlock>{`<Grid container spacing={2}>
  <Grid sx={{ flex: '1 1 200px', minWidth: '180px' }}>
    <MetricCard />
  </Grid>
  {/* More cards... */}
</Grid>`}</CodeBlock>
                </Box>

                {/* Two-Column Pattern */}
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Two-Column Layout (Main + Sidebar)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Main content area with sidebar. Stacks on mobile, side-by-side on desktop.
                  </Typography>
                  <Paper elevation={0} sx={{ p: 3, border: `2px solid ${theme.palette.divider}` }}>
                    <Grid container spacing={3}>
                      <Grid xs={12} md={8}>
                        <Box
                          sx={{
                            bgcolor: alpha(theme.palette.success.main, 0.1),
                            border: `2px dashed ${theme.palette.success.main}`,
                            borderRadius: 1,
                            p: 3,
                            minHeight: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant="h6" color="success.main">
                            Main Content (8/12 = 66%)
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid xs={12} md={4}>
                        <Box
                          sx={{
                            bgcolor: alpha(theme.palette.info.main, 0.1),
                            border: `2px dashed ${theme.palette.info.main}`,
                            borderRadius: 1,
                            p: 3,
                            minHeight: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant="h6" color="info.main">
                            Sidebar (4/12 = 33%)
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                  <CodeBlock>{`<Grid container spacing={3}>
  <Grid xs={12} md={8}>
    <Paper>Main Content</Paper>
  </Grid>
  <Grid xs={12} md={4}>
    <Paper>Sidebar</Paper>
  </Grid>
</Grid>`}</CodeBlock>
                </Box>

                {/* Form Pattern */}
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Form Layout
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Stacked form fields in a narrow container for optimal readability.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        border: `2px solid ${theme.palette.divider}`,
                        maxWidth: 600,
                        width: '100%',
                      }}
                    >
                      <Stack spacing={3}>
                        {['Name', 'Email', 'Message'].map((label) => (
                          <Box
                            key={label}
                            sx={{
                              height: 56,
                              bgcolor: alpha(theme.palette.warning.main, 0.1),
                              border: `1px solid ${theme.palette.warning.main}`,
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              px: 2,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              {label} field
                            </Typography>
                          </Box>
                        ))}
                        <Button variant="contained" fullWidth>
                          Submit Button
                        </Button>
                      </Stack>
                    </Paper>
                  </Box>
                  <CodeBlock>{`<Container maxWidth="sm">
  <Stack spacing={3}>
    <TextField label="Name" />
    <TextField label="Email" />
    <TextField label="Message" multiline />
    <Button variant="contained">Submit</Button>
  </Stack>
</Container>`}</CodeBlock>
                </Box>
              </Stack>
            </Box>

            {/* Quick Reference */}
            <Box>
              <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
                Quick Reference
              </Typography>

              <Grid container spacing={3}>
                <Grid sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <Card elevation={0} sx={{ height: '100%', border: `1px solid ${theme.palette.success.main}` }}>
                    <CardContent>
                      <Typography variant="h6" color="success.main" gutterBottom>
                        ✓ Do
                      </Typography>
                      <Stack spacing={1} component="ul" sx={{ pl: 2 }}>
                        <Typography variant="body2" component="li">
                          Use flexbox grid for card galleries
                        </Typography>
                        <Typography variant="body2" component="li">
                          Set <code>height: '100%'</code> on cards for even rows
                        </Typography>
                        <Typography variant="body2" component="li">
                          Use Container maxWidth="lg" as default
                        </Typography>
                        <Typography variant="body2" component="li">
                          Test mobile-first, then enhance
                        </Typography>
                        <Typography variant="body2" component="li">
                          Use spacing multiples of 8px (2, 3, 4, 6, 8)
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <Card elevation={0} sx={{ height: '100%', border: `1px solid ${theme.palette.error.main}` }}>
                    <CardContent>
                      <Typography variant="h6" color="error.main" gutterBottom>
                        ✗ Don't
                      </Typography>
                      <Stack spacing={1} component="ul" sx={{ pl: 2 }}>
                        <Typography variant="body2" component="li">
                          Mix breakpoint and flexbox in same grid
                        </Typography>
                        <Typography variant="body2" component="li">
                          Create more than 4 columns on desktop
                        </Typography>
                        <Typography variant="body2" component="li">
                          Use fixed pixel widths instead of responsive units
                        </Typography>
                        <Typography variant="body2" component="li">
                          Forget to test on mobile devices
                        </Typography>
                        <Typography variant="body2" component="li">
                          Use inconsistent spacing between sections
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>
    </DocsLayout>
  );
}
