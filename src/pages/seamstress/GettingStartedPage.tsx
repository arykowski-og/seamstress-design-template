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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Rocket as RocketIcon,
  CheckCircle as CheckCircleIcon,
  Code as CodeIcon,
  Lightbulb as LightbulbIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { SeamstressLayout } from '../../components/SeamstressLayout';

const CodeBlock = ({ children, title }: any) => {
  const theme = useTheme();
  return (
    <Box>
      {title && (
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      )}
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
    </Box>
  );
};

export default function GettingStartedPage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  // Theme-aware agent color
  const agentColor = theme.palette.mode === 'dark' ? '#A855F7' : '#9333EA';

  return (
    <SeamstressLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 6 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <RocketIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              <Typography
                variant="h2"
                component="h1"
                sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                Getting Started
              </Typography>
            </Stack>
            <Typography variant="h5" color="text.secondary" paragraph>
              Build Your First Component in Minutes
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This quick start guide will help you install Claude Code, set up Seamstress, and generate
              your first component using natural language.
            </Typography>
          </Box>

          {/* Prerequisites & Installation */}
          <Paper
            elevation={0}
            sx={{
              mb: 6,
              p: 4,
              border: `2px solid ${theme.palette.info.main}`,
              bgcolor: alpha(theme.palette.info.main, 0.05),
            }}
          >
            <Typography variant="h4" gutterBottom>
              Step 0: Install Claude Code
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Seamstress requires Claude Code, Anthropic's official CLI for Claude.
            </Typography>

            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  1. Install Claude Code
                </Typography>
                <CodeBlock title="npm (Recommended):">
{`npm install -g @anthropic-ai/claude-code

# Or with Homebrew
brew tap anthropics/claude-code
brew install claude-code`}
                </CodeBlock>
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    For other installation methods, visit:{' '}
                    <strong>https://docs.claude.com/claude-code/installation</strong>
                  </Typography>
                </Alert>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  2. Verify Installation
                </Typography>
                <CodeBlock>
{`claude --version

# Should output: claude version x.x.x`}
                </CodeBlock>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  3. Navigate to Seamstress Project
                </Typography>
                <CodeBlock>
{`cd /path/to/seamstress

# Launch Claude Code
claude`}
                </CodeBlock>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  This opens the Claude Code interactive CLI in your terminal
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  4. Invoke the Seamstress Agent
                </Typography>
                <Typography variant="body2" paragraph color="text.secondary">
                  Once Claude Code is running, you can invoke the @seamstress agent:
                </Typography>
                <CodeBlock>
{`# In the Claude Code CLI, type:
@seamstress build a skills list page with search

# Or use the slash command:
/seamstress build a form for agents

# Or ask naturally:
"What are Seamstress golden rules?"`}
                </CodeBlock>
              </Box>
            </Stack>

            <Alert severity="success" sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                ✅ Ready to Go!
              </Typography>
              <Typography variant="body2">
                Once Claude Code is running in your Seamstress directory, the @seamstress agent
                is automatically available with all 13 semantic skills.
              </Typography>
            </Alert>
          </Paper>

          {/* Builder Agent Info */}
          <Paper
            elevation={0}
            sx={{
              mb: 6,
              p: 3,
              border: `2px solid ${agentColor}`,
              bgcolor: alpha(agentColor, 0.05),
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: agentColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                }}
              >
                🟣
              </Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Seamstress Agent
              </Typography>
            </Stack>
            <Typography variant="body2" paragraph>
              The <strong>@seamstress</strong> agent automatically handles code generation.
              You can invoke it three ways:
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                🟣 <strong>Direct Mention (Recommended):</strong> @seamstress build a skills list page with search
              </Typography>
              <Typography variant="body2">
                🎯 <strong>Slash Command:</strong> /seamstress build a form for agents
              </Typography>
              <Typography variant="body2">
                💬 <strong>Natural Language:</strong> &quot;Generate a dashboard for work orders&quot;
              </Typography>
            </Stack>
          </Paper>

          {/* Quick Validation */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 6,
              bgcolor: alpha(theme.palette.success.main, 0.05),
              border: `2px solid ${theme.palette.success.main}`,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Step 1: Validate Your Setup (30 seconds)
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Run this quick test to ensure skills are discoverable:
            </Typography>

            <CodeBlock>
              &quot;What are Seamstress golden rules?&quot;
            </CodeBlock>

            <Alert severity="success" sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                ✅ Expected Result
              </Typography>
              <Typography variant="body2">
                Claude should cite the <strong>seamstress-core-principles</strong> skill and list:
                <br />• PageHeaderComposable requirement
                <br />• Theme tokens only (no hardcoded values)
                <br />• Entity-scoped routes (/entity/{'{entityId}'}/resource)
                <br />• All 4 states (loading, error, empty, success)
              </Typography>
            </Alert>
          </Paper>

          {/* Interactive Workflow */}
          <Paper elevation={0} sx={{ p: 4, mb: 6, border: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              Step 2: Generate Your First Component
            </Typography>

            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel
                  onClick={() => setActiveStep(0)}
                  sx={{ cursor: 'pointer' }}
                >
                  <Typography variant="h6">Choose a Pattern</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" paragraph>
                    Start with one of the 4 core patterns. We&apos;ll use a list view as an example.
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          textAlign: 'center',
                          border: `2px solid ${theme.palette.success.main}`,
                          bgcolor: alpha(theme.palette.success.main, 0.05),
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
                          List View
                        </Typography>
                        <Typography variant="caption">Search, filters, table</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Paper
                        elevation={0}
                        sx={{ p: 2, textAlign: 'center', border: `1px solid ${theme.palette.divider}` }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
                          Form
                        </Typography>
                        <Typography variant="caption">Create/edit with validation</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Paper
                        elevation={0}
                        sx={{ p: 2, textAlign: 'center', border: `1px solid ${theme.palette.divider}` }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
                          Detail View
                        </Typography>
                        <Typography variant="caption">Read-only display</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Paper
                        elevation={0}
                        sx={{ p: 2, textAlign: 'center', border: `1px solid ${theme.palette.divider}` }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
                          Dashboard
                        </Typography>
                        <Typography variant="caption">Metrics and charts</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={() => setActiveStep(1)}>
                      Continue
                    </Button>
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel
                  onClick={() => setActiveStep(1)}
                  sx={{ cursor: 'pointer' }}
                >
                  <Typography variant="h6">Ask Claude in Natural Language</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" paragraph>
                    Describe what you want to build. Be specific but natural. The @seamstress
                    agent will handle the request automatically.
                  </Typography>
                  <CodeBlock title="Example Request:">
                    &quot;@seamstress build a skills list page with search, filters, and 20 mock items&quot;
                  </CodeBlock>
                  <Paper
                    elevation={0}
                    sx={{
                      mt: 2,
                      p: 2,
                      bgcolor: alpha(agentColor, 0.05),
                      border: `1px solid ${agentColor}`,
                    }}
                  >
                    <Typography variant="body2">
                      💡 You can also use <strong>/seamstress</strong> command or natural language
                    </Typography>
                  </Paper>
                  <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
                    The agent automatically discovers and loads the relevant skills:
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                    <Chip label="list-view-pattern" color="success" size="small" />
                    <Chip label="core-principles" color="primary" size="small" />
                    <Chip label="routing-patterns" color="secondary" size="small" />
                    <Chip label="business-logic" color="secondary" size="small" />
                  </Stack>
                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={() => setActiveStep(2)} sx={{ mr: 1 }}>
                      Continue
                    </Button>
                    <Button onClick={() => setActiveStep(0)}>Back</Button>
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel
                  onClick={() => setActiveStep(2)}
                  sx={{ cursor: 'pointer' }}
                >
                  <Typography variant="h6">Review Generated Code</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" paragraph>
                    Claude generates production-ready code following all Seamstress principles.
                    Verify these elements are present:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="PageHeaderComposable with title and Create button"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="DataGrid component for list display"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Search TextField with proper spacing"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Theme tokens used (p: 2, not padding: '16px')"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Entity-scoped routes (/entity/${'{entityId}'}/skills)"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="All 4 states: loading, error, empty, success"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Correct import order (React → OpenGov → MUI → Local)"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={() => setActiveStep(3)} sx={{ mr: 1 }}>
                      Continue
                    </Button>
                    <Button onClick={() => setActiveStep(1)}>Back</Button>
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>
                  <Typography variant="h6">Test Your Component</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" paragraph>
                    Save the generated code and run your dev server to see it in action!
                  </Typography>
                  <CodeBlock title="Run Dev Server:">
{`npm run dev
# or
yarn dev`}
                  </CodeBlock>
                  <Alert severity="success" sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      🎉 Success!
                    </Typography>
                    <Typography variant="body2">
                      You&apos;ve generated your first Seamstress component! The component follows
                      all Capital Design System patterns and is ready for production.
                    </Typography>
                  </Alert>
                  <Box sx={{ mt: 2 }}>
                    <Button onClick={() => setActiveStep(2)}>Back</Button>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </Paper>

          {/* Common Tasks */}
          <Paper elevation={0} sx={{ p: 4, mb: 6, border: `1px solid ${theme.palette.divider}` }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <LightbulbIcon color="primary" fontSize="large" />
              <Typography variant="h4">
                Common Tasks & Recipes
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              <Grid item sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.03), height: '100%' }}>
                  <Typography variant="h6" gutterBottom color="primary.main">
                    Generate a List Page
                  </Typography>
                  <CodeBlock>
                    &quot;@seamstress build a skills list page with search and 20 mock items&quot;
                  </CodeBlock>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Skills used: list-view-pattern, core-principles, routing-patterns
                  </Typography>
                </Paper>
              </Grid>

              <Grid item sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: alpha(theme.palette.secondary.main, 0.03), height: '100%' }}>
                  <Typography variant="h6" gutterBottom color="secondary.main">
                    Create a Form
                  </Typography>
                  <CodeBlock>
                    &quot;@seamstress build a form for editing agents with validation&quot;
                  </CodeBlock>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Skills used: form-pattern, core-principles, business-logic
                  </Typography>
                </Paper>
              </Grid>

              <Grid item sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: alpha(theme.palette.success.main, 0.03), height: '100%' }}>
                  <Typography variant="h6" gutterBottom color="success.main">
                    Build a Dashboard
                  </Typography>
                  <CodeBlock>
                    &quot;@seamstress create a dashboard showing work order metrics&quot;
                  </CodeBlock>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Skills used: dashboard-pattern, core-principles, business-logic
                  </Typography>
                </Paper>
              </Grid>

              <Grid item sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: alpha(theme.palette.info.main, 0.03), height: '100%' }}>
                  <Typography variant="h6" gutterBottom color="info.main">
                    Make a Detail View
                  </Typography>
                  <CodeBlock>
                    &quot;@seamstress build a detail view for skill entities&quot;
                  </CodeBlock>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Skills used: detail-view-pattern, core-principles, routing-patterns
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: alpha(theme.palette.warning.main, 0.03) }}>
                  <Typography variant="h6" gutterBottom color="warning.main">
                    Learn About Patterns
                  </Typography>
                  <Stack spacing={1}>
                    <CodeBlock>
                      &quot;What are Seamstress golden rules?&quot;
                    </CodeBlock>
                    <CodeBlock>
                      &quot;Explain the list view pattern&quot;
                    </CodeBlock>
                    <CodeBlock>
                      &quot;How do entity-scoped routes work?&quot;
                    </CodeBlock>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Ask questions to learn about skills, patterns, and best practices
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          {/* Quick Validation Tests */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 6,
              bgcolor: alpha(theme.palette.warning.main, 0.05),
              border: `2px solid ${theme.palette.warning.main}`,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <SpeedIcon fontSize="large" sx={{ color: 'warning.main' }} />
              <Typography variant="h4">
                5 Quick Validation Tests
              </Typography>
            </Stack>

            <Typography variant="body1" paragraph color="text.secondary">
              Run these tests to ensure everything is working correctly:
            </Typography>

            <List>
              <ListItem>
                <ListItemIcon>
                  <Chip label="1" color="warning" size="small" />
                </ListItemIcon>
                <ListItemText
                  primary='Ask: "What are Seamstress golden rules?"'
                  secondary="Should cite seamstress-core-principles skill"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Chip label="2" color="warning" size="small" />
                </ListItemIcon>
                <ListItemText
                  primary='Ask: "Explain the list view pattern"'
                  secondary="Should cite list-view-pattern skill"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Chip label="3" color="warning" size="small" />
                </ListItemIcon>
                <ListItemText
                  primary='Ask: "Generate a skills list page"'
                  secondary="Code should have PageHeaderComposable, theme tokens, entity routes"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Chip label="4" color="warning" size="small" />
                </ListItemIcon>
                <ListItemText
                  primary='Ask: "How do routes work?"'
                  secondary="Should explain /entity/{entityId}/resource pattern"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Chip label="5" color="warning" size="small" />
                </ListItemIcon>
                <ListItemText
                  primary='Ask: "Build a form for agents"'
                  secondary="Code should have validation, isDirty, unsaved warning"
                />
              </ListItem>
            </List>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button variant="contained" color="warning" href="/seamstress/testing">
                Full Testing Guide
              </Button>
            </Box>
          </Paper>

          {/* Next Steps */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Next Steps
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Now that you&apos;ve generated your first component, explore these resources:
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 2 }}>
              <Button variant="contained" href="/seamstress/how-it-works" startIcon={<CodeIcon />}>
                How It Works
              </Button>
              <Button
                variant="outlined"
                href="/seamstress/skills-reference"
                startIcon={<LightbulbIcon />}
              >
                View All 13 Skills
              </Button>
              <Button
                variant="outlined"
                href="/seamstress/components-patterns"
                startIcon={<CheckCircleIcon />}
              >
                Components & Patterns
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </SeamstressLayout>
  );
}
