import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  Alert,
  Chip,
  Card,
  CardContent,
  useTheme,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { SeamstressLogo } from '../../components/SeamstressLogo';
import {
  AutoAwesome as AutoAwesomeIcon,
  Code as CodeIcon,
  Palette as PaletteIcon,
  Speed as SpeedIcon,
  Architecture as ArchitectureIcon,
  CheckCircle as CheckCircleIcon,
  GitHub as GitHubIcon,
  Terminal as TerminalIcon,
  Description as DescriptionIcon,
  IntegrationInstructions as IntegrationIcon,
} from '@mui/icons-material';
import { SeamstressLayout } from '../../components/SeamstressLayout';

const CodeBlock = ({ children, language = 'bash' }: any) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        fontFamily: 'monospace',
        fontSize: '14px',
        overflow: 'auto',
      }}
    >
      <pre style={{ margin: 0 }}>{children}</pre>
    </Paper>
  );
};

const FeatureCard = ({ icon, title, description }: any) => {
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" component="h3" sx={{ ml: 2 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function SeamstressOverview() {
  const theme = useTheme();

  // Theme-aware agent color
  const agentColor = theme.palette.mode === 'dark' ? '#A855F7' : '#9333EA';

  return (
    <SeamstressLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
            borderBottom: `1px solid ${theme.palette.divider}`,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={7}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ mr: 2 }}>
                    <SeamstressLogo size={64} variant="auto" animated={true} />
                  </Box>
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontWeight: 900,
                      fontSize: '3rem',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    Seamstress
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  paragraph
                  sx={{ mb: 3 }}
                >
                  AI-Powered Figma to React Code Generation
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Transform Figma designs and data schemas into production-ready React components
                  using the Capital Design System. Seamstress understands your design intent and
                  generates clean, maintainable TypeScript code that follows OpenGov patterns.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 4, mb: 2 }}>
                  <Chip label="@opengov Components" color="primary" />
                  <Chip label="Figma MCP Integration" color="secondary" />
                  <Chip label="TypeScript + React" />
                  <Chip label="AI Agent Workflow" />
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                <Stack spacing={2}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: `2px solid ${agentColor}`,
                      borderRadius: 2,
                      bgcolor: alpha(agentColor, 0.05),
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: agentColor }} gutterBottom>
                      Quick Start - Build from Figma
                    </Typography>
                    <CodeBlock>
{`# Build from Figma URL with @seamstress agent

@seamstress build https://figma.com/design/abc123

# With additional context
@seamstress build https://figma.com/design/abc123 with search and filters

# For specific entity
@seamstress build https://figma.com/design/abc123 for work orders`}
                    </CodeBlock>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: `2px solid ${theme.palette.info.main}`,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.info.main, 0.05),
                    }}
                  >
                    <Typography variant="subtitle2" color="info.main" gutterBottom>
                      Quick Start - Build from PRD
                    </Typography>
                    <CodeBlock>
{`# Build from Product Requirements Document

@seamstress build https://opengovinc.atlassian.net/wiki/x/CABhSAE

# Example: Agent Studio Dashboard
# Produced /dashboard for Agent Studio from PRD specs`}
                    </CodeBlock>
                    <Alert severity="info" sx={{ mt: 2, py: 0.5, display: 'flex', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Seamstress analyzes PRD content and generates components matching the specifications.
                        <Button
                          component="a"
                          href="/dashboard"
                          size="small"
                          variant="text"
                          sx={{
                            minWidth: 'auto',
                            p: 0,
                            textTransform: 'none',
                            fontSize: 'inherit',
                            lineHeight: 'inherit',
                          }}
                        >
                          View Agent Studio Dashboard →
                        </Button>
                      </Typography>
                    </Alert>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                    }}
                  >
                    <Typography variant="subtitle2" color="primary.main" gutterBottom>
                      Quick Start - Natural Language
                    </Typography>
                    <CodeBlock>
{`# Just ask Claude naturally - skills auto-discovered!

@seamstress build a skills list page with 20 mock items

@seamstress build a form for editing agents with validation

# Or learn about patterns
"Explain the list view pattern"
"What are Seamstress golden rules?"`}
                    </CodeBlock>
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Prerequisites - Install Claude Code */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: `2px solid ${theme.palette.warning.main}`,
              bgcolor: alpha(theme.palette.warning.main, 0.05),
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <TerminalIcon sx={{ color: 'warning.main', mt: 0.5 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Prerequisites: Claude Code Required
              </Typography>
              <Typography variant="body2" paragraph>
                Seamstress runs on Claude Code, Anthropic&apos;s official CLI. Install it first:
              </Typography>
              <CodeBlock>
{`# Install via npm (recommended)
npm install -g @anthropic-ai/claude-code

# Navigate to Seamstress and launch
cd seamstress
claude

# The @seamstress agent is now available!`}
              </CodeBlock>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  href="/seamstress/getting-started"
                >
                  Full Installation Guide
                </Button>
                <Button
                  size="small"
                  variant="text"
                  color="warning"
                  href="https://docs.claude.com/claude-code/installation"
                  target="_blank"
                >
                  Claude Code Docs
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>

        {/* Skills Framework Banner */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: `2px solid ${theme.palette.success.main}`,
              bgcolor: alpha(theme.palette.success.main, 0.05),
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <AutoAwesomeIcon color="success" sx={{ mt: 0.5 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                🎉 Powered by Semantic Skills Framework
              </Typography>
              <Typography variant="body2" paragraph>
                Seamstress now uses Claude Code's native skills system with 13 semantic skills.
                No commands to remember - just ask Claude what you want to build in natural language!
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  href="/seamstress/skills"
                >
                  Learn About Skills Framework
                </Button>
                <Button
                  size="small"
                  variant="text"
                  color="success"
                  href="/seamstress/skills-reference"
                >
                  View Skills Reference
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>

        {/* Benefits Metrics */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
              Why Seamstress?
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <Box textAlign="center">
                  <Typography variant="h2" color="success.main" fontWeight="bold">
                    13
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    Semantic Skills
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Auto-discovered composable knowledge modules
                  </Typography>
                </Box>
              </Grid>
              <Grid item sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <Box textAlign="center">
                  <Typography variant="h2" color="primary.main" fontWeight="bold">
                    4
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    UI Patterns
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    List, Form, Detail, Dashboard
                  </Typography>
                </Box>
              </Grid>
              <Grid item sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <Box textAlign="center">
                  <Typography variant="h2" color="secondary.main" fontWeight="bold">
                    100%
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    Natural Language
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    No commands to memorize
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>

        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* How It Works */}
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Skills Discovery Process
          </Typography>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item sx={{ flex: '1 1 300px', minWidth: '300px' }}>
              <Paper elevation={0} sx={{ p: 4, height: '100%', bgcolor: alpha(theme.palette.primary.main, 0.02), border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h5" gutterBottom color="primary.main">
                  Natural Language → Skills
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Intent Analysis"
                      secondary='You ask: "Generate a skills list page with 20 items"'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Semantic Discovery"
                      secondary="Claude identifies keywords: list, page, skills → loads list-view-pattern"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Skill Composition"
                      secondary="Auto-loads: core-principles, component-hierarchy, routing-patterns"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Efficient Context"
                      secondary="Only loads relevant skills for your request"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item sx={{ flex: '1 1 300px', minWidth: '300px' }}>
              <Paper elevation={0} sx={{ p: 4, height: '100%', bgcolor: alpha(theme.palette.secondary.main, 0.02), border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h5" gutterBottom color="secondary.main">
                  Skills → Production Code
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Pattern Application"
                      secondary="list-view-pattern provides DataGrid structure, search, filters"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Principles Enforcement"
                      secondary="core-principles ensures PageHeaderComposable, theme tokens, entity routes"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Component Selection"
                      secondary="component-hierarchy enforces Priority 1: OpenGov → 2: MUI → 3: Custom"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Code Generation"
                      secondary="Complete TypeScript component with validation, mock data, all 4 states"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>

          {/* Pattern Recognition */}
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Intelligent Pattern Recognition
          </Typography>

          <Grid container spacing={3} sx={{ mb: 8 }}>
            <Grid item sx={{ flex: '1 1 200px', minWidth: '200px' }}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', height: '100%', border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h6" color="primary.main" gutterBottom>
                  List View
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  DataGrid, search, filters
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label="table" size="small" sx={{ m: 0.5 }} />
                  <Chip label="grid" size="small" sx={{ m: 0.5 }} />
                  <Chip label="search" size="small" sx={{ m: 0.5 }} />
                  <Chip label="filter" size="small" sx={{ m: 0.5 }} />
                </Box>
              </Paper>
            </Grid>

            <Grid item sx={{ flex: '1 1 200px', minWidth: '200px' }}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', height: '100%', border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h6" color="secondary.main" gutterBottom>
                  Form Pattern
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Input fields, validation, save
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label="create" size="small" sx={{ m: 0.5 }} />
                  <Chip label="edit" size="small" sx={{ m: 0.5 }} />
                  <Chip label="save" size="small" sx={{ m: 0.5 }} />
                  <Chip label="input" size="small" sx={{ m: 0.5 }} />
                </Box>
              </Paper>
            </Grid>

            <Grid item sx={{ flex: '1 1 200px', minWidth: '200px' }}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', height: '100%', border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h6" color="success.main" gutterBottom>
                  Detail View
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Read-only display, metadata
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label="view" size="small" sx={{ m: 0.5 }} />
                  <Chip label="detail" size="small" sx={{ m: 0.5 }} />
                  <Chip label="show" size="small" sx={{ m: 0.5 }} />
                  <Chip label="display" size="small" sx={{ m: 0.5 }} />
                </Box>
              </Paper>
            </Grid>

            <Grid item sx={{ flex: '1 1 200px', minWidth: '200px' }}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', height: '100%', border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h6" color="warning.main" gutterBottom>
                  Dashboard
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Metrics, charts, overview
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label="metrics" size="small" sx={{ m: 0.5 }} />
                  <Chip label="charts" size="small" sx={{ m: 0.5 }} />
                  <Chip label="summary" size="small" sx={{ m: 0.5 }} />
                  <Chip label="stats" size="small" sx={{ m: 0.5 }} />
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Builder Agent Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 8,
              bgcolor: alpha(agentColor, 0.05),
              border: `2px solid ${agentColor}`,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: agentColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                🟣
              </Box>
              <Typography variant="h4" component="h2">
                Seamstress-Builder Agent
              </Typography>
            </Stack>

            <Typography variant="body1" paragraph color="text.secondary">
              The <strong>@seamstress</strong> is a specialized AI agent that orchestrates the entire code generation process.
              It uses Claude Code's semantic skills framework to automatically discover relevant patterns and generate production-ready React components.
            </Typography>

            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item sx={{ flex: '1 1 250px', minWidth: '250px' }}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', height: '100%' }}>
                  <Typography variant="h6" gutterBottom color="primary.main">
                    💬 Natural Language
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Just describe what you want to build:
                  </Typography>
                  <Box
                    component="code"
                    sx={{
                      display: 'block',
                      p: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      borderRadius: 1,
                      fontSize: '0.875rem',
                    }}
                  >
                    "Generate a skills list page with search and 20 mock items"
                  </Box>
                </Paper>
              </Grid>

              <Grid item sx={{ flex: '1 1 250px', minWidth: '250px' }}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', height: '100%' }}>
                  <Typography variant="h6" gutterBottom color="secondary.main">
                    🎯 Slash Command
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Quick invocation via command:
                  </Typography>
                  <Box
                    component="code"
                    sx={{
                      display: 'block',
                      p: 2,
                      bgcolor: alpha(theme.palette.secondary.main, 0.05),
                      borderRadius: 1,
                      fontSize: '0.875rem',
                    }}
                  >
                    /seamstress build a form for agents
                  </Box>
                </Paper>
              </Grid>

              <Grid item sx={{ flex: '1 1 250px', minWidth: '250px' }}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: agentColor }}>
                    🟣 Direct Mention
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Invoke the agent directly:
                  </Typography>
                  <Box
                    component="code"
                    sx={{
                      display: 'block',
                      p: 2,
                      bgcolor: alpha(agentColor, 0.05),
                      borderRadius: 1,
                      fontSize: '0.875rem',
                    }}
                  >
                    @seamstress create a dashboard
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                What the Builder Agent Does
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: agentColor }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Skills Discovery"
                    secondary="Automatically identifies and loads relevant skills based on your request"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: agentColor }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Code Generation"
                    secondary="Generates complete TypeScript components with all required imports, types, and patterns"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: agentColor }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Validation"
                    secondary="Ensures all Seamstress principles are followed (PageHeaderComposable, theme tokens, entity routes)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: agentColor }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Quality Guarantee"
                    secondary="Every component includes all 4 states, proper error handling, and production-ready code"
                  />
                </ListItem>
              </List>
            </Box>
          </Paper>

          {/* Core Features */}
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Core Capabilities
          </Typography>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item sx={{ flex: '1 1 250px', minWidth: '250px' }}>
              <FeatureCard
                icon={<IntegrationIcon color="primary" fontSize="large" />}
                title="Figma MCP Integration"
                description="Direct connection to Figma via MCP protocol. Extract designs, variables, styles, and components with AI understanding of design intent."
              />
            </Grid>
            <Grid item sx={{ flex: '1 1 250px', minWidth: '250px' }}>
              <FeatureCard
                icon={<PaletteIcon color="secondary" fontSize="large" />}
                title="Capital Design System"
                description="Full integration with @opengov components including NavBar, PageHeaderComposable, DataGrid, and 50+ production components."
              />
            </Grid>
            <Grid item sx={{ flex: '1 1 250px', minWidth: '250px' }}>
              <FeatureCard
                icon={<CodeIcon color="success" fontSize="large" />}
                title="Clean Code Generation"
                description="Generates TypeScript React code with proper imports, Effect.ts patterns, custom hooks, and follows OpenGov architecture."
              />
            </Grid>
            <Grid item sx={{ flex: '1 1 250px', minWidth: '250px' }}>
              <FeatureCard
                icon={<ArchitectureIcon color="info" fontSize="large" />}
                title="Context-Aware AI"
                description="Understands your project structure, existing patterns, and automatically follows your team's conventions and style guide."
              />
            </Grid>
            <Grid item sx={{ flex: '1 1 250px', minWidth: '250px' }}>
              <FeatureCard
                icon={<SpeedIcon color="warning" fontSize="large" />}
                title="Mock Data Generation"
                description="Intelligent mock data based on entity schemas with scenarios: empty, minimal, standard, and large datasets for testing."
              />
            </Grid>
            <Grid item sx={{ flex: '1 1 250px', minWidth: '250px' }}>
              <FeatureCard
                icon={<DescriptionIcon color="error" fontSize="large" />}
                title="Full Documentation"
                description="Comprehensive context system with patterns, components, schemas, routing, and business logic documentation."
              />
            </Grid>
          </Grid>

          {/* Skills Inventory */}
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
            12 Semantic Skills
          </Typography>

          <Alert severity="info" sx={{ mb: 4 }}>
            <Typography variant="subtitle2" gutterBottom>
              Skills live in .claude/skills/ and are auto-discovered by Claude
            </Typography>
            <Typography variant="body2">
              Each skill is a focused knowledge module that Claude loads on-demand based on your request.
              Skills compose automatically - no manual routing needed!
            </Typography>
          </Alert>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item sx={{ flex: '1 1 250px', minWidth: '250px' }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: `2px solid ${theme.palette.primary.main}`,
                  bgcolor: alpha(theme.palette.primary.main, 0.03),
                  height: '100%',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Chip label="Core" color="primary" size="small" />
                  <Typography variant="h6">2 Skills</Typography>
                </Stack>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="seamstress-core-principles"
                      secondary="Golden rules, validation, anti-patterns"
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="seamstress-component-hierarchy"
                      secondary="Import priority, component selection"
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item sx={{ flex: '1 1 250px', minWidth: '250px' }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: `2px solid ${theme.palette.secondary.main}`,
                  bgcolor: alpha(theme.palette.secondary.main, 0.03),
                  height: '100%',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Chip label="Domain" color="secondary" size="small" />
                  <Typography variant="h6">6 Skills</Typography>
                </Stack>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon fontSize="small" color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="seamstress-routing-patterns"
                      secondary="Entity-scoped routing"
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon fontSize="small" color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="seamstress-business-logic"
                      secondary="Effect.ts, data fetching"
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon fontSize="small" color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="seamstress-theme-system"
                      secondary="Theme tokens, styling"
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon fontSize="small" color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="+ 3 more domain skills"
                      secondary="figma-integration, architecture, accessibility"
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item sx={{ flex: '1 1 250px', minWidth: '250px' }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: `2px solid ${theme.palette.success.main}`,
                  bgcolor: alpha(theme.palette.success.main, 0.03),
                  height: '100%',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Chip label="Patterns" color="success" size="small" />
                  <Typography variant="h6">4 Skills</Typography>
                </Stack>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="list-view-pattern"
                      secondary="DataGrid with search/filters"
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="form-pattern"
                      secondary="Create/edit with validation"
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="detail-view-pattern"
                      secondary="Read-only with actions"
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="dashboard-pattern"
                      secondary="Metrics and visualizations"
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Button
              variant="contained"
              size="large"
              href="/seamstress/skills-reference"
              sx={{ mr: 2 }}
            >
              View All Skills
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="/seamstress/testing"
            >
              Test Your Setup
            </Button>
          </Box>

          {/* Getting Started */}
          <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.paper', border: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h5" gutterBottom>
              Getting Started with Skills
            </Typography>

            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" gutterBottom color="primary.main">
                  1. Ask Claude Naturally
                </Typography>
                <CodeBlock>
{`# Just describe what you want in natural language

"Generate a complete skills list page for entity-scoped context
with search, filters, and 20 realistic mock items"

# Claude discovers and loads relevant skills automatically`}
                </CodeBlock>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom color="primary.main">
                  2. Learn About Patterns
                </Typography>
                <CodeBlock>
{`# Ask questions to understand patterns

"Explain the list view pattern"
"How do I build a form in Seamstress?"
"What are the core principles?"

# Claude cites relevant skills and provides detailed guidance`}
                </CodeBlock>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom color="primary.main">
                  3. Validate Your Setup
                </Typography>
                <CodeBlock>
{`# Quick validation (5 tests)

1. Ask: "What are Seamstress golden rules?"
   → Expect: Claude cites seamstress-core-principles

2. Ask: "Explain list view pattern"
   → Expect: Claude cites list-view-pattern skill

3. Ask: "Generate a skills list page"
   → Expect: Code with PageHeaderComposable + theme tokens

4. Ask: "How do routes work?"
   → Expect: /entity/{entityId}/resource pattern

5. Ask: "Build a form for agents"
   → Expect: Code with validation + isDirty + unsaved warning`}
                </CodeBlock>
              </Box>
            </Stack>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="outlined"
                href="/seamstress/testing"
              >
                View Full Test Suite →
              </Button>
            </Box>
          </Paper>

          {/* Call to Action */}
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" sx={{ gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                href="/seamstress/getting-started"
                startIcon={<TerminalIcon />}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="/seamstress/how-it-works"
                startIcon={<ArchitectureIcon />}
              >
                How It Works
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="/seamstress/components-patterns"
              >
                Components & Patterns
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </SeamstressLayout>
  );
}