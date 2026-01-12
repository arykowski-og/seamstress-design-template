# Figma Structure Mapping Analysis
## Design Reference
**URL**: https://www.figma.com/design/ovXZlZTFwlNBTISlap4s4p/CDS-37-Patterns?node-id=3818-20031

**Design System**: Capital Design System (CDS-37)

**Analysis Date**: 2025-10-24

---

## 1. Component Hierarchy & Layer Structure

### Overview
The CDS-37 Patterns file represents the Capital Design System component library used across OpenGov applications. The structure follows a hierarchical organization optimized for both design and development workflows.

### Layer Organization Pattern

```
CDS-37-Patterns (File)
├── 📁 Foundations
│   ├── Colors (Primitives)
│   ├── Typography (Scales & Variants)
│   ├── Spacing (8px Grid System)
│   ├── Elevation (Shadows & Z-Index)
│   └── Border Radius (4px, 8px, 16px)
│
├── 📁 Components (Atomic Level)
│   ├── Buttons (Primary, Secondary, Text, Icon)
│   ├── Inputs (TextField, Select, Checkbox, Radio)
│   ├── Cards (Base, Elevated, Outlined)
│   ├── DataGrid (Table, Pagination, Filters)
│   ├── Navigation (NavBar, Breadcrumbs, Tabs)
│   └── Feedback (Alert, Dialog, Toast, Progress)
│
├── 📁 Patterns (Composition Level)
│   ├── List Views (DataGrid + Filters + Search)
│   ├── Forms (Validation, Multi-step, Wizards)
│   ├── Detail Views (Read-only, Metadata, Actions)
│   ├── Dashboards (Metrics, Charts, Grid Layouts)
│   └── Page Headers (Title, Actions, Breadcrumbs)
│
└── 📁 Templates (Page Level)
    ├── CRUD Templates (Create, Read, Update, Delete)
    ├── Dashboard Templates (Metrics, Analytics)
    └── Workflow Templates (Multi-step, Approval)
```

### Layer Naming Convention

Figma layers follow this structure:
- **Component/Pattern Name** (e.g., "List View - Skills")
- **State Variants** (Default, Hover, Active, Disabled, Error)
- **Size Variants** (Small, Medium, Large)
- **Nested Elements** (Clear semantic names like "Header", "Content", "Actions")

Example layer hierarchy for a List View:
```
List View - Skills
├── Page Header
│   ├── Title
│   ├── Subtitle
│   └── Actions
│       └── Create Button
├── Filters Bar
│   ├── Search Input
│   └── Status Filter
└── Data Grid
    ├── Column Headers
    ├── Rows (Auto Layout)
    └── Pagination
```

---

## 2. Design Patterns & Templates Present

### Core Patterns Identified

#### A. List View Pattern
**Figma Frame**: `List View Pattern`
**Components Used**:
- PageHeaderComposable (title, breadcrumbs, actions)
- TextField (search with debounce)
- Select (filters)
- DataGrid (columns, rows, pagination)
- Button (create action)

**Layout Structure**:
```typescript
<PageHeaderComposable
  title="Resources"
  actions={[<Button variant="contained">Create</Button>]}
/>
<Box sx={{ p: 3 }}>
  <TextField placeholder="Search..." />
  <Select label="Status" />
  <DataGrid rows={data} columns={columns} />
</Box>
```

**States Handled**:
- Loading (CircularProgress)
- Empty (EmptyState component)
- Error (Alert with message)
- Success (Data displayed)

#### B. Form Pattern
**Figma Frame**: `Form Pattern - Create/Edit`
**Components Used**:
- PageHeaderComposable
- TextField (with validation states)
- Select (dropdowns)
- Checkbox/Radio (selections)
- Button Group (Save/Cancel)
- Alert (error feedback)

**Layout Structure**:
```typescript
<PageHeaderComposable title="Create Resource" />
<Box component="form" sx={{ p: 3 }}>
  <TextField label="Name" required />
  <TextField label="Description" multiline />
  <Select label="Status" />
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Button variant="contained">Save</Button>
    <Button variant="outlined">Cancel</Button>
  </Box>
</Box>
```

**Validation States**:
- Pristine (initial)
- Dirty (user has edited)
- Validating (async checks)
- Invalid (error messages)
- Valid (success state)

#### C. Detail View Pattern
**Figma Frame**: `Detail View Pattern`
**Components Used**:
- PageHeaderComposable (with Edit/Delete actions)
- Card (content sections)
- Typography (labels and values)
- Divider (section separators)
- Chip (status badges)

**Layout Structure**:
```typescript
<PageHeaderComposable
  title={resource.name}
  actions={[
    <Button startIcon={<Edit />}>Edit</Button>,
    <Button startIcon={<Delete />}>Delete</Button>
  ]}
/>
<Box sx={{ p: 3 }}>
  <Card sx={{ p: 2, mb: 2 }}>
    <Typography variant="h6">Details</Typography>
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2" color="text.secondary">Name</Typography>
      <Typography variant="body1">{resource.name}</Typography>
    </Box>
  </Card>
</Box>
```

#### D. Dashboard Pattern
**Figma Frame**: `Dashboard Pattern`
**Components Used**:
- PageHeaderComposable
- Grid (responsive layout)
- Card (metric containers)
- Typography (numbers and labels)
- Charts (from recharts or similar)
- LinearProgress (loading per card)

**Layout Structure**:
```typescript
<PageHeaderComposable title="Dashboard" />
<Box sx={{ p: 3 }}>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h4">247</Typography>
        <Typography variant="body2">Total Items</Typography>
      </Card>
    </Grid>
  </Grid>
</Box>
```

#### E. Navigation Pattern
**Figma Frame**: `NavBar Component`
**Components Used**:
- @opengov/components-nav-bar
- Breadcrumbs
- Tabs
- Menu/Dropdown

**Key Features**:
- Entity-scoped routing
- Active state management
- Responsive collapse
- Utility tray (search, notifications, profile)

---

## 3. Component Naming Conventions & Organization

### Naming Structure

#### Component Names
Format: `[Category]/[Component Name]`

Examples:
- `Inputs/TextField`
- `Navigation/NavBar`
- `Data Display/DataGrid`
- `Feedback/Alert`

#### Pattern Names
Format: `[Pattern Type] - [Use Case]`

Examples:
- `List View - Skills`
- `Form - Create Agent`
- `Detail View - Task`
- `Dashboard - Metrics`

#### State Variants
Format: `[Component Name]/[State]`

Examples:
- `Button/Default`
- `Button/Hover`
- `Button/Active`
- `Button/Disabled`
- `TextField/Error`
- `TextField/Focused`

### File Organization in Figma

```
Pages:
├── 🎨 Foundations (Design Tokens)
├── 🧩 Components (Atomic Components)
├── 📐 Patterns (Composed Patterns)
├── 📄 Templates (Page Templates)
├── 🎭 Examples (Real-world Usage)
└── 📚 Documentation (Usage Guidelines)
```

### Asset Naming
- **Icons**: `icon-[name]-[size]` (e.g., `icon-plus-24`)
- **Images**: `img-[context]-[descriptor]` (e.g., `img-avatar-placeholder`)
- **Logos**: `logo-[variant]` (e.g., `logo-opengov-dark`)

---

## 4. Variables, Styles, & Tokens Being Used

### Design Token Architecture

The Figma file uses **Local Variables** that map directly to the Capital Design System tokens:

#### Color Tokens
```
Foundations/Colors/
├── Primitives (Base Colors)
│   ├── Blurple/700 → #4b3fff (Primary)
│   ├── Slate/50-900 → Grayscale palette
│   ├── Green/700 → #037730 (Success)
│   ├── Red/700 → #D32F2F (Error)
│   └── Orange/700 → #F57C00 (Warning)
│
└── Semantic (Contextual Colors)
    ├── Primary/Main → Blurple/700
    ├── Success/Main → Green/700
    ├── Error/Main → Red/700
    ├── Background/Default → Slate/50 (light) / Slate/900 (dark)
    └── Text/Primary → Slate/900 (light) / Slate/50 (dark)
```

**Figma Variable Structure**:
```
Collection: Capital Design Tokens
├── Mode: Light
│   ├── color/primary/main = #4b3fff
│   ├── color/background/default = #F8F9FA
│   └── color/text/primary = #1A202C
│
└── Mode: Dark
    ├── color/primary/main = #6956FF (lighter variant)
    ├── color/background/default = #1A202C
    └── color/text/primary = #F8F9FA
```

#### Typography Tokens
```
Foundations/Typography/
├── Font Family → Inter
├── Font Sizes
│   ├── h1 → 32px / 2rem
│   ├── h2 → 28px / 1.75rem
│   ├── h3 → 24px / 1.5rem
│   ├── h4 → 20px / 1.25rem
│   ├── h5 → 18px / 1.125rem
│   ├── h6 → 16px / 1rem
│   ├── body1 → 16px / 1rem
│   ├── body2 → 14px / 0.875rem
│   └── caption → 12px / 0.75rem
│
├── Font Weights
│   ├── Regular → 400
│   ├── Medium → 500
│   ├── Semibold → 600
│   └── Bold → 700
│
└── Line Heights
    ├── Tight → 1.2
    ├── Normal → 1.5
    └── Relaxed → 1.75
```

#### Spacing Tokens (8px Grid)
```
Foundations/Spacing/
├── 0 → 0px
├── 1 → 8px (0.5rem)
├── 2 → 16px (1rem)
├── 3 → 24px (1.5rem)
├── 4 → 32px (2rem)
├── 5 → 40px (2.5rem)
├── 6 → 48px (3rem)
├── 8 → 64px (4rem)
└── 10 → 80px (5rem)
```

**Usage in Figma**: Auto Layout spacing uses these values
**Mapping to Code**: `theme.spacing(2)` → 16px

#### Elevation (Shadows)
```
Foundations/Elevation/
├── 0 → none
├── 1 → 0px 2px 4px rgba(0,0,0,0.08)
├── 2 → 0px 4px 8px rgba(0,0,0,0.12)
├── 3 → 0px 8px 16px rgba(0,0,0,0.16)
└── 4 → 0px 12px 24px rgba(0,0,0,0.20)
```

#### Border Radius
```
Foundations/Borders/
├── none → 0px
├── sm → 4px
├── md → 8px
├── lg → 16px
└── full → 9999px (pill/circular)
```

### Token Sync Workflow

```
Figma Variables (Design Source of Truth)
    ↓
    [Export via Figma API]
    ↓
capital-design-tokens package
    ↓
    [@opengov/capital-mui-theme]
    ↓
React Components (Theme Provider)
```

**Sync Script**: `/Users/cbarnes/Projects/seamstress/scripts/sync-figma-variables.js`

---

## 5. How Structure Maps to React Components

### Mapping Strategy

The Figma structure uses a **top-down hierarchy** that maps directly to React component composition:

#### Figma Frame → React Component

| Figma Element | React Component | Package |
|---------------|-----------------|---------|
| **Frame** | `<Box>` or semantic container | `@mui/material` |
| **Auto Layout (Vertical)** | `<Stack direction="column">` | `@mui/material` |
| **Auto Layout (Horizontal)** | `<Stack direction="row">` | `@mui/material` |
| **Text** | `<Typography>` | `@mui/material` |
| **Button** | `<Button>` | `@mui/material` |
| **Input** | `<TextField>` | `@mui/material` |
| **Icon** | Component from `@opengov/react-capital-assets` | `@opengov/react-capital-assets` |
| **Card** | `<Card>` | `@mui/material` |
| **Grid** | `<Grid container>` | `@mui/material` |
| **DataGrid** | `<DataGrid>` | `@mui/x-data-grid` |
| **Page Header** | `<PageHeaderComposable>` | `@opengov/components-page-header` |
| **NavBar** | `<NavBar>` | `@opengov/components-nav-bar` |

#### Auto Layout → Flexbox/Grid

Figma's Auto Layout properties map to MUI's `sx` prop:

```typescript
// Figma: Auto Layout with 16px gap, horizontal
<Stack direction="row" spacing={2}>

// Figma: Auto Layout with 24px gap, vertical
<Stack direction="column" spacing={3}>

// Figma: Auto Layout with padding 16px
<Box sx={{ p: 2 }}>

// Figma: Auto Layout with stretch/fill
<Box sx={{ width: '100%', height: '100%' }}>
```

#### Design Token Variables → Theme Tokens

```typescript
// Figma Variable: color/primary/main
sx={{ color: 'primary.main' }}

// Figma Variable: spacing/2
sx={{ p: 2 }}

// Figma Variable: typography/h6
<Typography variant="h6">

// Figma Variable: border/radius/md
sx={{ borderRadius: 1 }} // 8px

// Figma Variable: elevation/2
<Card elevation={2}>
```

### Component Generation Process

#### 1. Analyze Figma Frame Structure
```
List View Frame
├── Page Header → <PageHeaderComposable>
├── Filters Row → <Box sx={{ display: 'flex', gap: 2 }}>
│   ├── Search Field → <TextField>
│   └── Status Filter → <Select>
└── Data Table → <DataGrid>
```

#### 2. Extract Design Properties
```typescript
// From Figma Inspect Panel:
Background: color/background/default → bgcolor: 'background.default'
Padding: 24px (spacing/3) → p: 3
Border Radius: 8px (border/md) → borderRadius: 1
Text: typography/h6/semibold → variant="h6" fontWeight={600}
```

#### 3. Generate React Component
```typescript
import React from 'react';
import { Box, TextField, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PageHeaderComposable } from '@opengov/components-page-header';

export function SkillsListPage() {
  return (
    <>
      <PageHeaderComposable
        title="Skills"
        actions={[<Button variant="contained">Create</Button>]}
      />
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField placeholder="Search..." />
          <Select defaultValue="all">
            <MenuItem value="all">All</MenuItem>
          </Select>
        </Box>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </>
  );
}
```

#### 4. Validate Against Figma
- Compare spacing (use DevTools to measure)
- Verify colors match tokens
- Check typography scales
- Test responsive behavior
- Validate all states (hover, focus, error)

---

## 6. Notable Architectural Patterns

### A. Component Hierarchy Priority

The Seamstress system enforces a strict component selection hierarchy:

```
Priority 1: OpenGov Packages (@opengov/*)
    ↓
Priority 2: MUI Components (@mui/material, @mui/x-data-grid)
    ↓
Priority 3: Custom Components (only if P1 & P2 don't provide)
```

**In Figma**: Components are organized to reflect this:
- OpenGov components have "OG" prefix
- MUI-based components follow Material Design specs
- Custom components are clearly marked

### B. Composition Over Inheritance

Both Figma and React code use **composition patterns**:

```typescript
// Page Header is composed of smaller elements
<PageHeaderComposable
  title="Skills"                    // Typography component
  breadcrumbs={<Breadcrumbs />}     // Navigation component
  actions={[<Button />]}            // Action components
/>

// Rather than inheritance:
class ExtendedPageHeader extends PageHeader { ... } // ❌ Avoid
```

### C. State-Driven Design

Figma variants map to React component states:

```
Figma Variants:
├── Default State
├── Hover State
├── Active State
├── Disabled State
├── Error State
└── Loading State

React Implementation:
const [state, setState] = useState('default');

<Button
  disabled={state === 'disabled'}
  sx={{
    '&:hover': hoverStyles,
    '&:active': activeStyles,
  }}
/>
```

### D. Entity-Scoped Routing Pattern

Figma designs show navigation that maps to entity-scoped routes:

```
Figma Navigation:
Entity → Skills → Skill Detail

React Routes:
/entity/:entityId/skills → List View
/entity/:entityId/skills/:skillId → Detail View
/entity/:entityId/skills/new → Create Form
/entity/:entityId/skills/:skillId/edit → Edit Form
```

**Implementation**:
```typescript
<Routes>
  <Route path="/entity/:entityId/skills">
    <Route index element={<SkillsListPage />} />
    <Route path=":skillId" element={<SkillDetailPage />} />
    <Route path="new" element={<SkillFormPage />} />
    <Route path=":skillId/edit" element={<SkillFormPage />} />
  </Route>
</Routes>
```

### E. Theme Mode Support (Light/Dark)

Figma uses **Modes** for light/dark theme variants:

```
Collection: Capital Design Tokens
├── Mode: Light
│   └── All color variables in light values
└── Mode: Dark
    └── All color variables in dark values

React Implementation:
<ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
  <App />
</ThemeProvider>
```

**Token Usage**: Always use semantic tokens, never primitives
```typescript
// ❌ NEVER - Hardcoded color
sx={{ color: '#4b3fff' }}

// ❌ AVOID - Primitive token (breaks dark mode)
sx={{ color: theme.palette.blurple[700] }}

// ✅ CORRECT - Semantic token (adapts to theme mode)
sx={{ color: 'primary.main' }}
```

### F. Responsive Grid System

Figma's responsive frames map to MUI's Grid breakpoints:

```
Figma Breakpoints:        MUI Breakpoints:
- Mobile: 375px      →    xs (0px)
- Tablet: 768px      →    sm (600px), md (900px)
- Desktop: 1440px    →    lg (1200px), xl (1536px)

Implementation:
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    <Card />
  </Grid>
</Grid>
```

### G. Accessibility Patterns

Figma designs include accessibility annotations that map to React props:

```
Figma Annotation:         React Implementation:
- Alt text            →   alt="Description"
- ARIA label          →   aria-label="Action"
- Tab index           →   tabIndex={0}
- Focus visible       →   &:focus-visible styles
- Keyboard shortcut   →   onKeyDown handler
- Screen reader text  →   <VisuallyHidden>
```

### H. Loading & Empty States

Figma shows all component states; React implements them:

```typescript
// Loading State
if (loading) {
  return <CircularProgress />;
}

// Error State
if (error) {
  return <Alert severity="error">{error.message}</Alert>;
}

// Empty State
if (data.length === 0) {
  return <EmptyState message="No items found" />;
}

// Success State
return <DataGrid rows={data} columns={columns} />;
```

### I. Form Validation Patterns

Figma shows validation states that map to form logic:

```typescript
// Figma shows: Error state with helper text
<TextField
  error={!!errors.name}
  helperText={errors.name}
  required
  value={formData.name}
  onChange={(e) => {
    setFormData({ ...formData, name: e.target.value });
    validateField('name', e.target.value);
  }}
/>
```

### J. Data Grid Configuration

Figma's table designs map to DataGrid props:

```typescript
// Figma shows: Sortable columns, row selection, pagination
<DataGrid
  rows={rows}
  columns={[
    { field: 'name', headerName: 'Name', width: 200, sortable: true },
    { field: 'status', headerName: 'Status', width: 120 },
  ]}
  checkboxSelection
  pageSizeOptions={[10, 25, 50]}
  initialState={{
    pagination: { paginationModel: { pageSize: 25 } },
  }}
/>
```

---

## 7. Implementation Workflow

### Step-by-Step Process

#### 1. Receive Figma URL
```
https://www.figma.com/design/ovXZlZTFwlNBTISlap4s4p/CDS-37-Patterns?node-id=3818-20031
```

#### 2. Analyze Design Structure
- Identify pattern type (list, form, detail, dashboard)
- Extract component hierarchy
- Note all design tokens used
- Document states and variants
- Check for NavBar (trigger layout detection)

#### 3. Detect Layout Requirements
If NavBar present:
- Extract suite name
- Extract menu structure
- Generate or use existing layout
- Configure nav bar options

#### 4. Map Components
- Frame → Box/Container
- Text → Typography
- Buttons → Button
- Inputs → TextField/Select
- Icons → Capital Assets
- Complex components → OpenGov packages

#### 5. Extract Design Tokens
```typescript
// From Figma Inspect:
Padding: 24px → p: 3
Color: Primary/Main → color: 'primary.main'
Font: H6/Semibold → variant="h6"
Gap: 16px → spacing={2}
Border: 1px → border: 1
Radius: 8px → borderRadius: 1
```

#### 6. Generate Component
```typescript
// Use Write tool to create file
Write('/Users/cbarnes/Projects/seamstress/src/pages/ResourceListPage.tsx', componentCode);
```

#### 7. Validate Output
- Run validation checklist
- Compare with Figma pixel-by-pixel
- Test all states
- Verify accessibility
- Check responsive behavior

#### 8. Return Summary
```markdown
✅ Component Generated: ResourceListPage.tsx
📁 File Path: src/pages/ResourceListPage.tsx
🎨 Pattern: List View
🏷️ Entity: Resource
📊 Features:
  - DataGrid with sorting/filtering
  - Search with debouncing
  - Status filters
  - Create action button
  - All 4 states handled

🔗 Next Steps:
1. Add route to App.tsx
2. Import component
3. Test in browser
```

---

## 8. Quality Validation Checklist

### Figma Design Fidelity
- [ ] Spacing matches 8px grid
- [ ] Colors use theme tokens
- [ ] Typography matches scale
- [ ] Border radius correct
- [ ] Elevation/shadows match
- [ ] Icons correct size
- [ ] Button heights correct
- [ ] All states represented

### Component Implementation
- [ ] PageHeaderComposable present
- [ ] Theme tokens used (no hardcoded values)
- [ ] All 4 states handled (loading, error, empty, success)
- [ ] Entity-scoped routes
- [ ] TypeScript types defined
- [ ] Component hierarchy followed (OpenGov → MUI → Custom)
- [ ] Accessibility props included
- [ ] Responsive breakpoints configured

### Code Quality
- [ ] Import order correct (React → OpenGov → MUI → Local)
- [ ] No console.log statements
- [ ] Error boundaries in place
- [ ] Loading states shown
- [ ] Empty states handled
- [ ] Form validation working
- [ ] Comments where helpful
- [ ] No TypeScript errors

---

## 9. Common Figma-to-React Mappings

### Quick Reference Table

| Figma Property | React/MUI Equivalent | Example |
|---------------|---------------------|---------|
| Frame | `<Box>` | `<Box sx={{ ... }}>` |
| Auto Layout (H) | `<Stack direction="row">` | `<Stack direction="row" spacing={2}>` |
| Auto Layout (V) | `<Stack direction="column">` | `<Stack spacing={3}>` |
| Text | `<Typography>` | `<Typography variant="h6">` |
| Fill Color | `sx={{ bgcolor }}` | `sx={{ bgcolor: 'primary.main' }}` |
| Stroke | `sx={{ border }}` | `sx={{ border: 1, borderColor: 'divider' }}` |
| Corner Radius | `sx={{ borderRadius }}` | `sx={{ borderRadius: 1 }}` (8px) |
| Padding | `sx={{ p }}` | `sx={{ p: 2 }}` (16px) |
| Gap | `spacing` prop | `<Stack spacing={2}>` |
| Shadow | `elevation` | `<Card elevation={2}>` |
| Width | `sx={{ width }}` | `sx={{ width: '100%' }}` |
| Height | `sx={{ height }}` | `sx={{ minHeight: 400 }}` |
| Display/Flex | `sx={{ display }}` | `sx={{ display: 'flex' }}` |
| Align Items | `alignItems` | `<Stack alignItems="center">` |
| Justify Content | `justifyContent` | `<Stack justifyContent="space-between">` |
| Opacity | `sx={{ opacity }}` | `sx={{ opacity: 0.6 }}` |
| Variants | Component states | `disabled`, `error`, hover styles |
| Components | Instances | Import and use |
| Constraints | Responsive props | `xs={12} md={6}` |

---

## 10. Anti-Patterns to Avoid

### Figma Design Issues
- ❌ Using pixel values not on 8px grid
- ❌ Hardcoded colors instead of variables
- ❌ Inconsistent component naming
- ❌ Missing state variants
- ❌ No accessibility annotations
- ❌ Mixing design systems

### Code Implementation Issues
- ❌ Hardcoded values: `color: '#4b3fff'`
- ❌ Magic numbers: `padding: '17px'`
- ❌ Wrong import order
- ❌ Skipping PageHeaderComposable
- ❌ Missing loading/error states
- ❌ Incorrect routing patterns
- ❌ Using wrong component hierarchy
- ❌ Not following 8px grid

### Validation Failures
- ❌ Spacing off by more than 1px
- ❌ Colors don't match tokens
- ❌ Typography scale wrong
- ❌ Missing responsive breakpoints
- ❌ Accessibility props missing
- ❌ States not implemented

---

## 11. Advanced Patterns

### A. Nested Routing
```
Figma Design: Skill Detail → Tasks Tab → Task Detail

Implementation:
/entity/:entityId/skills/:skillId → SkillDetailPage
  └─ /tasks → TasksTabContent
      └─ /:taskId → TaskDetailView (modal/drawer)
```

### B. Multi-Step Forms
```
Figma: Wizard with steps 1-5

Implementation:
const [activeStep, setActiveStep] = useState(0);

<Stepper activeStep={activeStep}>
  {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
</Stepper>
```

### C. Dynamic Filters
```
Figma: Filter bar with dynamic filter chips

Implementation:
const [filters, setFilters] = useState<Filter[]>([]);

<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
  {filters.map((filter) => (
    <Chip key={filter.id} label={filter.label} onDelete={() => removeFilter(filter.id)} />
  ))}
</Box>
```

### D. Inline Editing
```
Figma: Table with editable cells

Implementation:
<DataGrid
  rows={rows}
  columns={columns}
  processRowUpdate={handleRowUpdate}
  experimentalFeatures={{ newEditingApi: true }}
/>
```

---

## 12. Summary & Best Practices

### Key Takeaways

1. **Figma is Source of Truth** for design tokens and visual specifications
2. **Capital Design System** provides the component library and patterns
3. **Seamstress** enforces consistent implementation through skills and validation
4. **Design tokens** eliminate hardcoded values and support theming
5. **Component hierarchy** ensures OpenGov components are used before MUI or custom
6. **Entity-scoped routing** provides consistent navigation patterns
7. **All states matter** - loading, error, empty, and success must be handled
8. **Accessibility** is built-in through proper component usage and props

### Development Workflow

```
Figma Design → Analysis → Component Mapping → Token Extraction →
Code Generation → Validation → Testing → Delivery
```

### Quality Gates

Before considering any component complete:
- ✅ Figma comparison passed
- ✅ All validation checkboxes checked
- ✅ TypeScript compiles without errors
- ✅ Accessibility tests pass
- ✅ Responsive behavior verified
- ✅ All states tested
- ✅ Design tokens used exclusively

### Resources

- **Figma File**: https://www.figma.com/design/ovXZlZTFwlNBTISlap4s4p/CDS-37-Patterns
- **Capital Design System**: `@opengov/capital-mui-theme`
- **Component Library**: `@opengov/components-*`
- **Icons**: `@opengov/react-capital-assets`
- **Seamstress Skills**: `/Users/cbarnes/Projects/seamstress/.claude/skills/`

---

## Conclusion

The CDS-37 Patterns Figma file represents a comprehensive design system that maps directly to React components through design tokens, component hierarchy, and established patterns. By following the structure mapping outlined in this document, developers can build pixel-perfect, accessible, and maintainable OpenGov applications that strictly adhere to the Capital Design System.

The Seamstress system automates much of this mapping process through skills-based code generation, ensuring consistency across all implementations while maintaining flexibility for custom requirements.

**Remember**: Every design decision in Figma has a corresponding implementation pattern in React. The key is understanding the mapping and following the principles consistently.
