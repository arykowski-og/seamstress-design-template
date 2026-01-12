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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  TextFields as TypographyIcon,
  SpaceBar as SpacingIcon,
  DarkMode as DarkModeIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { DocsLayout } from '../../components/DocsLayout';

export default function ThemeSystem() {
  const theme = useTheme();

  const ColorSwatch = ({ color, label, value }: { color: string; label: string; value?: string }) => (
    <Stack spacing={1} alignItems="center">
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: 2,
          bgcolor: color,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[2],
        }}
      />
      <Typography variant="caption" fontWeight="bold">
        {label}
      </Typography>
      {value && (
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
          {value}
        </Typography>
      )}
    </Stack>
  );

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
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
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
              Theme System
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: 800 }}>
              Comprehensive guide to theme tokens, color palettes, typography, spacing, and dark mode support
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Chip label="Material-UI v7" color="primary" />
              <Chip label="OpenGov Capital Tokens" color="success" />
              <Chip label="Dark Mode Ready" />
            </Stack>
          </Container>
        </Box>

        {/* Content */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* Introduction */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" gutterBottom>
              Theme Architecture
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The Seamstress theme system is built on Material-UI v7 and extends the OpenGov Capital Design System.
              It provides a consistent, accessible color palette, typography scale, spacing system, and full dark mode support.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The theme is created using the <code>createSeamstressTheme(mode)</code> function, which combines:
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Paper elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  1. OpenGov Capital MUI Theme
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Base theme with Capital Design System tokens for colors, typography, and spacing
                </Typography>
              </Paper>
              <Paper elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  2. Seamstress Component Overrides
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimal customizations for Papers, Chips, DataGrids, and Accordions
                </Typography>
              </Paper>
              <Paper elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  3. Dark Mode Palette & Overrides
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Complete dark mode palette with proper contrast ratios and component adjustments
                </Typography>
              </Paper>
            </Stack>
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* Color Palette */}
          <Box sx={{ mb: 8 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
              <PaletteIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h3">Color Palette</Typography>
            </Stack>

            {/* Primary & Secondary */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" gutterBottom>
                Primary & Secondary Colors
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Primary color is used for main actions, links, and focus states. Secondary color is used for secondary actions and accents.
              </Typography>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={6} sm={3}>
                  <ColorSwatch color={theme.palette.primary.light} label="Primary Light" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ColorSwatch color={theme.palette.primary.main} label="Primary Main" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ColorSwatch color={theme.palette.primary.dark} label="Primary Dark" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ColorSwatch color={theme.palette.secondary.main} label="Secondary" />
                </Grid>
              </Grid>
            </Box>

            {/* Semantic Colors */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" gutterBottom>
                Semantic Colors
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Semantic colors convey meaning and state. Use these for alerts, notifications, and status indicators.
              </Typography>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={6} sm={3}>
                  <ColorSwatch color={theme.palette.error.main} label="Error" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ColorSwatch color={theme.palette.warning.main} label="Warning" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ColorSwatch color={theme.palette.info.main} label="Info" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ColorSwatch color={theme.palette.success.main} label="Success" />
                </Grid>
              </Grid>
            </Box>

            {/* Text Colors */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" gutterBottom>
                Text Colors
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Text colors ensure proper contrast and readability across light and dark modes.
              </Typography>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={6} sm={4}>
                  <ColorSwatch color={theme.palette.text.primary} label="Text Primary" />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <ColorSwatch color={theme.palette.text.secondary} label="Text Secondary" />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <ColorSwatch color={theme.palette.text.disabled} label="Text Disabled" />
                </Grid>
              </Grid>
            </Box>

            {/* Background Colors */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" gutterBottom>
                Background Colors
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Background colors establish visual hierarchy and content grouping.
              </Typography>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={6} sm={4}>
                  <ColorSwatch color={theme.palette.background.default} label="Default" />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <ColorSwatch color={theme.palette.background.paper} label="Paper" />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <ColorSwatch
                    color={(theme.palette.background as any).secondary || '#f8f8f8'}
                    label="Secondary"
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Using Colors */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Using Theme Colors
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Access theme colors via the <code>theme</code> object or MUI's <code>sx</code> prop shorthand:
              </Typography>
              <CodeBlock>{`import { useTheme } from '@mui/material';

const theme = useTheme();

// Using theme object
<Box sx={{ bgcolor: theme.palette.primary.main }} />

// Using sx shorthand (preferred)
<Box sx={{ bgcolor: 'primary.main' }} />
<Typography color="text.secondary" />
<Paper sx={{ bgcolor: 'background.paper' }} />`}</CodeBlock>
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* Typography */}
          <Box sx={{ mb: 8 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
              <TypographyIcon color="success" sx={{ fontSize: 40 }} />
              <Typography variant="h3">Typography</Typography>
            </Stack>

            <Typography variant="body1" color="text.secondary" paragraph>
              The theme uses Material-UI's typography system with OpenGov Capital fonts. The type scale is designed for
              clarity and hierarchy across all screen sizes.
            </Typography>

            <TableContainer component={Paper} elevation={0} sx={{ mt: 3, border: `1px solid ${theme.palette.divider}` }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Variant</strong></TableCell>
                    <TableCell><strong>Use Case</strong></TableCell>
                    <TableCell><strong>Example</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell><code>h1</code></TableCell>
                    <TableCell>Page titles</TableCell>
                    <TableCell><Typography variant="h1" sx={{ fontSize: '2rem' }}>Heading 1</Typography></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>h2</code></TableCell>
                    <TableCell>Section titles</TableCell>
                    <TableCell><Typography variant="h2" sx={{ fontSize: '1.5rem' }}>Heading 2</Typography></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>h3</code></TableCell>
                    <TableCell>Subsection titles</TableCell>
                    <TableCell><Typography variant="h3" sx={{ fontSize: '1.25rem' }}>Heading 3</Typography></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>body1</code></TableCell>
                    <TableCell>Primary body text</TableCell>
                    <TableCell><Typography variant="body1">Body text example</Typography></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>body2</code></TableCell>
                    <TableCell>Secondary body text</TableCell>
                    <TableCell><Typography variant="body2">Smaller body text</Typography></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>caption</code></TableCell>
                    <TableCell>Captions, labels</TableCell>
                    <TableCell><Typography variant="caption">Caption text</Typography></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Using Typography
              </Typography>
              <CodeBlock>{`// Using Typography component
<Typography variant="h1">Page Title</Typography>
<Typography variant="body1" color="text.secondary">
  Body text with secondary color
</Typography>

// Font weight
<Typography variant="h3" fontWeight="bold">
  Bold heading
</Typography>

// Text alignment
<Typography variant="body1" align="center">
  Centered text
</Typography>`}</CodeBlock>
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* Spacing */}
          <Box sx={{ mb: 8 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
              <SpacingIcon color="info" sx={{ fontSize: 40 }} />
              <Typography variant="h3">Spacing System</Typography>
            </Stack>

            <Typography variant="body1" color="text.secondary" paragraph>
              Material-UI uses an 8px spacing unit by default. Use the <code>theme.spacing()</code> function or
              shorthand multipliers in the <code>sx</code> prop.
            </Typography>

            <TableContainer component={Paper} elevation={0} sx={{ mt: 3, border: `1px solid ${theme.palette.divider}` }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Multiplier</strong></TableCell>
                    <TableCell><strong>Pixels</strong></TableCell>
                    <TableCell><strong>Usage</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell><code>0.5</code></TableCell>
                    <TableCell>4px</TableCell>
                    <TableCell>Minimal spacing, tight layouts</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>1</code></TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell>Small gaps, compact elements</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>2</code></TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell>Standard spacing between elements</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>3</code></TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>Medium spacing, card padding</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>4</code></TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>Large spacing, section separation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>6</code></TableCell>
                    <TableCell>48px</TableCell>
                    <TableCell>Extra large spacing, major sections</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>8</code></TableCell>
                    <TableCell>64px</TableCell>
                    <TableCell>Hero sections, page padding</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Using Spacing
              </Typography>
              <CodeBlock>{`// Padding and margin with multipliers
<Box sx={{ p: 2 }}>          {/* 16px padding all sides */}
<Box sx={{ pt: 3, pb: 3 }}>  {/* 24px top and bottom */}
<Box sx={{ mx: 'auto' }}>    {/* Centered horizontally */}
<Stack spacing={2}>          {/* 16px gap between children */}

// Using theme.spacing() function
import { useTheme } from '@mui/material';
const theme = useTheme();

<Box sx={{ padding: theme.spacing(3) }} />  {/* 24px */}`}</CodeBlock>
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* Dark Mode */}
          <Box sx={{ mb: 8 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
              <DarkModeIcon sx={{ fontSize: 40, color: theme.palette.mode === 'dark' ? 'primary.main' : 'text.secondary' }} />
              <Typography variant="h3">Dark Mode Support</Typography>
            </Stack>

            <Typography variant="body1" color="text.secondary" paragraph>
              The theme includes full dark mode support with a carefully designed palette that maintains proper contrast
              ratios and readability. Components automatically adapt when the theme mode changes.
            </Typography>

            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Light Mode
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Default mode with bright backgrounds and dark text. Uses OpenGov Capital light palette.
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="caption" fontFamily="monospace">
                        background.default: #ffffff
                      </Typography>
                      <Typography variant="caption" fontFamily="monospace">
                        background.paper: #ffffff
                      </Typography>
                      <Typography variant="caption" fontFamily="monospace">
                        text.primary: rgba(0, 0, 0, 0.87)
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Dark Mode
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Dark backgrounds with light text. Reduces eye strain in low-light environments.
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="caption" fontFamily="monospace">
                        background.default: #121212
                      </Typography>
                      <Typography variant="caption" fontFamily="monospace">
                        background.paper: #1e1e1e
                      </Typography>
                      <Typography variant="caption" fontFamily="monospace">
                        text.primary: rgba(255, 255, 255, 0.87)
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Implementing Dark Mode
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Use the ThemeProvider to control theme mode. The theme automatically adapts all components:
              </Typography>
              <CodeBlock>{`import { ThemeProvider } from './contexts/ThemeContext';
import { createSeamstressTheme } from './theme';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = createSeamstressTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      {/* All components auto-adapt */}
    </ThemeProvider>
  );
}`}</CodeBlock>
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* Best Practices */}
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
              <CodeIcon color="warning" sx={{ fontSize: 40 }} />
              <Typography variant="h3">Best Practices</Typography>
            </Stack>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.success.main}`, height: '100%' }}>
                  <Typography variant="h6" color="success" gutterBottom>
                    ✓ Do
                  </Typography>
                  <Stack spacing={1} component="ul" sx={{ pl: 2 }}>
                    <Typography variant="body2" component="li">
                      Use theme tokens via <code>sx</code> prop or <code>useTheme()</code>
                    </Typography>
                    <Typography variant="body2" component="li">
                      Use semantic colors (error, warning, success) for meaning
                    </Typography>
                    <Typography variant="body2" component="li">
                      Use spacing multipliers (1, 2, 3, 4, 6, 8)
                    </Typography>
                    <Typography variant="body2" component="li">
                      Test components in both light and dark modes
                    </Typography>
                    <Typography variant="body2" component="li">
                      Use Typography component for consistent text styles
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.error.main}`, height: '100%' }}>
                  <Typography variant="h6" color="error" gutterBottom>
                    ✗ Don't
                  </Typography>
                  <Stack spacing={1} component="ul" sx={{ pl: 2 }}>
                    <Typography variant="body2" component="li">
                      Hardcode color values like <code>#ffffff</code>
                    </Typography>
                    <Typography variant="body2" component="li">
                      Use arbitrary pixel values for spacing
                    </Typography>
                    <Typography variant="body2" component="li">
                      Override theme tokens without good reason
                    </Typography>
                    <Typography variant="body2" component="li">
                      Assume colors will work in both light and dark modes
                    </Typography>
                    <Typography variant="body2" component="li">
                      Use inline styles for theming
                    </Typography>
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
