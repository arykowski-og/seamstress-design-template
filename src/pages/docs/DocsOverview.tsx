import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Stack,
  Chip,
  useTheme,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  GridOn as GridIcon,
  Category as ComponentsIcon,
  CheckCircle as CheckIcon,
  Code as CodeIcon,
  Description as DocsIcon,
} from '@mui/icons-material';
import { DocsLayout } from '../../components/DocsLayout';

export default function DocsOverview() {
  const theme = useTheme();

  return (
    <DocsLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.1)} 100%)`,
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
              Design System Documentation
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: 800 }}>
              A comprehensive guide to building consistent, accessible, and beautiful user interfaces
              with the OpenGov Capital Design System
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Chip label="Material-UI v7" color="primary" />
              <Chip label="Capital Design System" color="success" />
              <Chip label="React + TypeScript" />
            </Stack>
          </Container>
        </Box>

        {/* Content */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* Introduction */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" gutterBottom>
              Introduction
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              This design system provides a unified framework for building OpenGov applications. It combines
              Material-UI's robust component library with OpenGov's Capital Design System tokens and patterns
              to ensure consistency, accessibility, and maintainability across all products.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Whether you're building dashboards, forms, or data-heavy interfaces, this documentation will
              guide you through theming, layout, and component usage to create professional, user-friendly
              experiences.
            </Typography>
          </Box>

          {/* Key Features */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
              Key Features
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card elevation={0} sx={{ height: '100%', border: `1px solid ${theme.palette.divider}` }}>
                  <CardContent>
                    <PaletteIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Comprehensive Theming
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Built on Material-UI with Capital Design System tokens for colors, typography,
                      spacing, and more. Full dark mode support included.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card elevation={0} sx={{ height: '100%', border: `1px solid ${theme.palette.divider}` }}>
                  <CardContent>
                    <GridIcon color="success" sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Flexible Layouts
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Responsive grid systems, flexbox patterns, and container utilities for building
                      layouts that work on any screen size.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card elevation={0} sx={{ height: '100%', border: `1px solid ${theme.palette.divider}` }}>
                  <CardContent>
                    <ComponentsIcon color="info" sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Rich Component Library
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      50+ production-ready components from Material-UI and OpenGov Capital,
                      including data grids, charts, and specialized business components.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* Quick Start */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" gutterBottom>
              Quick Start Guide
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="1. Understand the Theme System"
                  secondary="Learn about color tokens, typography scale, and spacing units"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="2. Study Layout Rules"
                  secondary="Master page structure, grid systems, and responsive patterns"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="3. Explore Component Patterns"
                  secondary="Discover UI patterns for common use cases like lists, forms, and dashboards"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="4. Build Your First Page"
                  secondary="Apply what you've learned to create a consistent, accessible interface"
                />
              </ListItem>
            </List>
          </Box>

          {/* Design Principles */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
              Design Principles
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Consistency
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Use theme tokens and standard components throughout your application.
                    Consistent spacing, typography, and color usage creates professional,
                    cohesive experiences.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
                  <Typography variant="h6" gutterBottom color="success">
                    Accessibility
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Design for everyone. Ensure proper color contrast, keyboard navigation,
                    screen reader support, and semantic HTML. Follow WCAG 2.1 AA standards.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
                  <Typography variant="h6" gutterBottom color="info">
                    Clarity
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Design clear visual hierarchies. Use typography, spacing, and color
                    purposefully to guide users through content and actions.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
                  <Typography variant="h6" gutterBottom color="warning">
                    Efficiency
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Optimize for user productivity. Minimize cognitive load, reduce clicks,
                    provide clear feedback, and design efficient workflows.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Resources */}
          <Box>
            <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
              Additional Resources
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.02),
                    },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <CodeIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Material-UI Documentation
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Official MUI component library docs
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    '&:hover': {
                      borderColor: theme.palette.success.main,
                      bgcolor: alpha(theme.palette.success.main, 0.02),
                    },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <DocsIcon color="success" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        OpenGov Capital Design System
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Internal design tokens and components
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </DocsLayout>
  );
}
