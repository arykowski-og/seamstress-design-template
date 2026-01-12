import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Stack,
  Chip,
  Paper,
  useTheme,
  alpha,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as DocumentationIcon,
  Science as LabsIcon,
  AutoAwesome as SeamstressIcon,
  SmartToy as AgentStudioIcon,
  Build as BuildIcon,
  Hub as CommandCenterIcon,
  Public as PublicIcon,
  AccountBalance as FinanceIcon,
  Engineering as PermittingIcon,
  Business as ProcurementIcon,
  ElectricalServices as UtilityIcon,
  Palette as ThemeIcon,
  Animation as AnimationIcon,
  MenuBook as GuideIcon,
  Code as CodeIcon,
  Category as ComponentsIcon,
  Lightbulb as ConceptsIcon,
  RocketLaunch as QuickStartIcon,
  School as SkillsIcon,
  AssignmentTurnedIn as PermitAppIcon,
  Campaign as MarketingIcon,
} from '@mui/icons-material';

interface SectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
  badge?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  icon,
  href,
  color = 'primary',
  badge,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
          borderColor: theme.palette[color].main,
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(href)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          p: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: alpha(theme.palette[color].main, 0.1),
              color: `${color}.main`,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          {badge && (
            <Chip
              label={badge}
              size="small"
              color={color}
              sx={{ ml: 'auto' }}
            />
          )}
        </Box>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {description}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 12,
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 900,
                fontSize: { xs: '3rem', md: '4.5rem' },
                letterSpacing: '-0.03em',
                mb: 2,
              }}
            >
              Prototypes
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              paragraph
              sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
            >
              Explore prototypes, documentation, experimental features, and AI-powered component
              generation for the OpenGov Capital Design System
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<QuickStartIcon />}
                onClick={() => navigate('/seamstress/getting-started')}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<DocumentationIcon />}
                onClick={() => navigate('/docs/overview')}
              >
                View Documentation
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<DashboardIcon />}
                onClick={() => navigate('/prototypes')}
              >
                Browse Prototypes
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {/* Seamstress Guides - Featured First */}
          <Grid sx={{ flex: '1 1 400px', minWidth: '400px' }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                  borderColor: theme.palette.info.main,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      color: 'info.main',
                      mr: 2,
                    }}
                  >
                    <SeamstressIcon fontSize="large" />
                  </Box>
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Seamstress Guides
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  AI-powered Figma-to-React code generation
                </Typography>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/seamstress')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Overview →
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/seamstress/getting-started')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Getting Started →
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/seamstress/skills-reference')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Skills Reference →
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/seamstress/building-from-figma')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Building from Figma →
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Public Service Platform */}
          <Grid sx={{ flex: '1 1 400px', minWidth: '400px' }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                      mr: 2,
                    }}
                  >
                    <DashboardIcon fontSize="large" />
                  </Box>
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Public Service Platform
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Platform prototypes for citizen-facing and internal services
                </Typography>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/agent-studio/dashboard')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Agent Studio →
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/app-builder/dashboard')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    App Builder →
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/utility-billing/home')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Utility Billing →
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/permitting/dashboard')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Permitting →
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/procurement/dashboard')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Procurement →
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Documentation */}
          <Grid sx={{ flex: '1 1 400px', minWidth: '400px' }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                  borderColor: theme.palette.success.main,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: 'success.main',
                      mr: 2,
                    }}
                  >
                    <DocumentationIcon fontSize="large" />
                  </Box>
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Documentation
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Design system guidelines and best practices
                </Typography>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/docs/overview')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Overview →
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/docs/theme-system')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Theme System →
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/docs/layout-rules')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Layout Rules →
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/docs/component-patterns')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Component Patterns →
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Labs */}
          <Grid sx={{ flex: '1 1 400px', minWidth: '400px' }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                  borderColor: theme.palette.warning.main,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      color: 'warning.main',
                      mr: 2,
                    }}
                  >
                    <LabsIcon fontSize="large" />
                  </Box>
                  <Chip label="Experiments" size="small" color="warning" />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Labs
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Experimental features and prototypes
                </Typography>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => navigate('/seamstress/theme-editor')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Theme Editor →
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Public Portal */}
          <Grid sx={{ flex: '1 1 400px', minWidth: '400px' }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                border: `1px dashed ${theme.palette.divider}`,
                bgcolor: alpha(theme.palette.secondary.main, 0.02),
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                      color: 'secondary.main',
                      mr: 2,
                    }}
                  >
                    <PublicIcon fontSize="large" />
                  </Box>
                  <Chip label="Coming Soon" size="small" color="secondary" />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Public Portal
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Unified public-facing portal for residents and businesses. Portal experience for public services, applications, and citizen engagement.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Marketing */}
          <Grid sx={{ flex: '1 1 400px', minWidth: '400px' }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                border: `1px dashed ${theme.palette.divider}`,
                bgcolor: alpha(theme.palette.info.main, 0.02),
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      color: 'info.main',
                      mr: 2,
                    }}
                  >
                    <MarketingIcon fontSize="large" />
                  </Box>
                  <Chip label="Coming Soon" size="small" color="info" />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Marketing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Marketing automation, campaign management, and analytics platform for government communications and public engagement.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Footer */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Ready to Build?
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4, opacity: 0.9 }}>
            Start exploring prototypes, dive into documentation, or experiment with the theme editor
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
              onClick={() => navigate('/seamstress/getting-started')}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: alpha(theme.palette.common.white, 0.1),
                },
              }}
              onClick={() => navigate('/prototypes')}
            >
              Explore All Prototypes
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
