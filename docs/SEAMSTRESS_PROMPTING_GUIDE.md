# Seamstress Prompting Guide

**Quick Reference**: How to build production-ready OpenGov components using the @seamstress agent

---

## Prerequisites

Before using Seamstress, you need to install **Claude Code**, Anthropic's official CLI.

### Install Claude Code

```bash
# npm (Recommended)
npm install -g @anthropic-ai/claude-code

# Or with Homebrew
brew tap anthropics/claude-code
brew install claude-code

# Verify installation
claude --version
```

For other installation methods, visit: https://docs.claude.com/claude-code/installation

### Launch Claude Code

```bash
# Navigate to your Seamstress project
cd /path/to/seamstress

# Launch Claude Code
claude

# The @seamstress agent is now available!
```

---

## Core Pattern

```
@seamstress {action} {target} [with {context}]
```

**Actions**: `build`, `create`, `generate` (all equivalent)

**Targets**: Figma URL, pattern description, or file path

**Context**: Optional specifications, features, or requirements

---

## Scenario 1: Building from Figma

Use when you have a Figma design and optionally want to add specifications beyond what's visible.

### Basic Figma Build
```bash
@seamstress build https://figma.com/design/abc123
```

### Figma + Additional Context
```bash
# Add specific features
@seamstress build https://figma.com/design/abc123 with search and status filters

# Specify entity context
@seamstress build https://figma.com/design/abc123 for work orders

# Add mock data requirements
@seamstress build https://figma.com/design/abc123 with 50 mock work orders

# Multiple specifications
@seamstress build https://figma.com/design/abc123 with:
- Search by title and description
- Filter by status and priority
- Sort by due date
- 100 mock items
```

### Figma with Business Requirements
```bash
# Complex specifications
@seamstress build https://figma.com/design/abc123 for permits with:
- Required field validation (applicant name, address)
- Auto-save every 30 seconds
- Document upload integration
- Approval workflow hooks
```

---

## Scenario 2: Building from Prompt

Use when you don't have a Figma design—just requirements in text.

### Pattern-Based Generation

```bash
# List view
@seamstress build a list view for work orders with search and filters

# Form
@seamstress build a form for creating permits with validation

# Detail view
@seamstress build a detail view for assets showing maintenance history

# Dashboard
@seamstress create a dashboard showing work order metrics
```

### Detailed Specifications

```bash
# List view with full spec
@seamstress build a work orders list with:
- Search by title, description, asset name
- Filter by status (open, in progress, completed)
- Filter by priority (low, medium, high, critical)
- Sort by due date, priority, created date
- Bulk actions (assign, update status, export)
- 50 mock work orders with realistic data

# Form with validation
@seamstress create a permit application form with:
- Applicant info (required: name, email, phone)
- Property address with autocomplete
- Permit type dropdown (building, electrical, plumbing)
- Supporting documents upload
- Validation rules and error messages
- isDirty tracking with unsaved changes warning
- Auto-save draft every 30 seconds

# Detail view with actions
@seamstress build a detail view for assets showing:
- Asset information card (ID, name, type, status)
- Maintenance history timeline
- Related work orders table
- Location displayed on map
- Actions: edit, archive, clone, export PDF

# Dashboard with metrics
@seamstress generate a work orders dashboard with:
- Total count by status (cards)
- Priority distribution (pie chart)
- Completion rate trend over time (line chart)
- Recent activity timeline
- Overdue work orders alert banner
- Real-time updates every 5 seconds
```

### Entity-Specific Builds

**OpenGov Domains:**
- **EAM**: work-order, asset, maintenance, inventory
- **Permitting**: permit, license, inspection, application
- **Finance**: budget, invoice, account, adjustment, forecast
- **Citizen**: citizen, employee, vendor, contractor, department

```bash
# EAM examples
@seamstress build an asset maintenance list for EAM
@seamstress create a work order detail page with priority badges

# Permitting examples
@seamstress build a permit application form with fee calculator
@seamstress create an inspection schedule dashboard

# Finance examples
@seamstress build a budget line items list with fiscal year filter
@seamstress create an invoice detail view with payment history
```

---

## Scenario 3: Building from PRD/Documentation URL

Use when you have a Product Requirements Document or specification in Confluence, Notion, GitHub, etc.

### PRD URL Reference
```bash
# Build from Atlassian Confluence PRD
@seamstress build https://opengovinc.atlassian.net/wiki/x/CABhSAE

# Build from GitHub issue
@seamstress build https://github.com/org/repo/issues/123

# Build from Notion doc
@seamstress build https://notion.so/Feature-Spec-abc123
```

### Real Example: Agent Studio Dashboard
```bash
# This command produced the /dashboard for Agent Studio
@seamstress build https://opengovinc.atlassian.net/wiki/x/CABhSAE

# Result: Full dashboard with metrics, charts, and data visualization
# All generated from PRD specifications

# View live example: http://localhost:5173/dashboard
```

### PRD with Additional Context
```bash
# PRD + overrides
@seamstress build https://opengovinc.atlassian.net/wiki/x/CABhSAE but use 100 mock items

# PRD + specific focus
@seamstress build https://opengovinc.atlassian.net/wiki/x/CABhSAE focusing on the metrics section

# PRD + entity specification
@seamstress build https://opengovinc.atlassian.net/wiki/x/CABhSAE for work orders domain
```

---

## Scenario 4: Building from Local File

Use when you have requirements documented in a local markdown file.

### File Reference
```bash
# Simple file reference
@seamstress build from docs/feature-spec.md

# Alternate syntax
@seamstress build @docs/citizen-portal-requirements.md
```

### File with Overrides
```bash
# Override specific aspects
@seamstress build from docs/invoice-list.md but use 100 mock items

# Multiple overrides
@seamstress build from docs/permit-workflow.md but:
- Use 50 mock permits
- Add bulk approval action
- Include export to PDF
```

### Multiple File References
```bash
# Combine specifications
@seamstress build combining:
- docs/ui-spec.md (for layout)
- docs/business-rules.md (for logic)
- docs/validation-rules.md (for form validation)
```

---

## Universal Modifiers

Add these to any prompt for additional control:

### Mock Data
```bash
# Specify count
... with 50 realistic mock items
... and generate 100 mock work orders

# Specify scenarios
... with mock data for 3 scenarios: empty, standard, large
... and realistic data including overdue items
```

### Pattern Override
```bash
# Force specific pattern
... using the dashboard pattern
... as a form with multi-step wizard
... as a detail view with tabs
```

### Feature Flags
```bash
# Exclude features
... without search functionality
... excluding the delete action
... with read-only mode

# Add specific features
... with real-time updates every 5 seconds
... including export to PDF and CSV
... with bulk actions
```

### Integration Requirements
```bash
# Specify integrations
... integrating with the existing asset management API
... using the shared approval workflow component
... connected to the notification service
```

### Accessibility
```bash
# Enhanced accessibility
... with enhanced keyboard navigation
... and WCAG AAA compliance
... including screen reader optimizations
```

### Performance
```bash
# Performance requirements
... with virtualized scrolling for large datasets
... and optimistic updates
... using debounced search (500ms)
```

---

## Pattern Detection Keywords

The @seamstress agent automatically detects patterns from keywords:

| Keywords | Detected Pattern | Generated Component |
|----------|-----------------|-------------------|
| list, table, grid, search, index | **List View** | DataGrid with search/filters |
| form, create, edit, new, save | **Form** | Form with validation |
| detail, view, show, display, read-only | **Detail View** | Read-only display |
| dashboard, metrics, charts, overview | **Dashboard** | Metrics + charts |

---

## Quick Examples by Use Case

### Common Tasks

```bash
# Quick list view
@seamstress build a skills list with search

# Simple form
@seamstress create a form for agents

# Basic detail view
@seamstress build a detail page for tasks

# Simple dashboard
@seamstress generate a metrics dashboard
```

### Production-Ready Components

```bash
# Full-featured list
@seamstress build a work orders list with:
- Search by multiple fields
- Advanced filtering (status, priority, assignee, date range)
- Sorting by any column
- Bulk actions (assign, update, export)
- Row selection with checkboxes
- Pagination with customizable page size
- 100 realistic mock items

# Complete form
@seamstress create an asset form with:
- All required field validation
- Conditional field visibility
- Real-time validation feedback
- Auto-save drafts
- Unsaved changes warning
- File upload for photos/documents
- Integration with asset management system

# Comprehensive detail view
@seamstress build an asset detail page showing:
- Overview card with key information
- Maintenance history in timeline format
- Related work orders table with inline actions
- Location map with marker
- Photo gallery with lightbox
- Actions: edit, archive, clone, print, export
- Activity log with user attribution

# Executive dashboard
@seamstress generate a work orders dashboard with:
- KPI cards (total, open, overdue, completed)
- Status breakdown donut chart
- Priority distribution bar chart
- Completion trend line chart (30 days)
- Top 10 overdue work orders table
- Recent activity feed
- Real-time updates
- Export all data to Excel
```

---

## Structured Context Pattern

For complex builds, use structured specifications:

```bash
@seamstress build a component where:
ENTITY: Utility billing accounts
PATTERN: List view with inline editing
FEATURES:
  - Search by account number, name, address
  - Filter by status (active, suspended, closed)
  - Sort by balance, due date, account number
  - Bulk actions: send notice, update status, export
  - Inline edit for contact information
BUSINESS RULES:
  - Only active accounts can be edited
  - Suspended accounts show warning badge
  - Overdue balances highlighted in red
  - Balance over $1000 requires manager approval
MOCK DATA: 100 accounts with varied statuses and balances
VALIDATIONS:
  - Email format validation
  - Phone number format (XXX-XXX-XXXX)
  - Account number must be unique
```

---

## Best Practices

### ✅ DO

```bash
# Be specific about features
@seamstress build a skills list with search by name/description, status filter, and 25 mock items

# Include business context
@seamstress create a budget form with account code validation and approval workflow

# Reference Figma when available
@seamstress build https://figma.com/design/xyz123
```

### ❌ DON'T

```bash
# Too vague
@seamstress build something with search

# Over-specified for simple cases
@seamstress build a React component using DataGrid from MUI for work orders entity with...
# Better: "build a work orders list with search"

# Unclear mixing
build the thing at this url with stuff
# Better: specify what you want clearly
```

---

## What You Always Get

Every component generated by @seamstress includes:

- ✅ **PageHeaderComposable** - Required at top of every page
- ✅ **Theme Tokens** - `color: 'primary.main'`, `p: 2` (no hardcoded values)
- ✅ **All 4 States** - Loading, error, empty, success
- ✅ **Entity-Scoped Routes** - `/entity/${entityId}/resource`
- ✅ **TypeScript Types** - Explicit interfaces for props and data
- ✅ **Import Order** - React → OpenGov → MUI → Local
- ✅ **Mock Data** - Realistic test data when needed
- ✅ **Validation** - Checked against Seamstress principles

---

## Advanced Patterns

### Multi-Step Forms
```bash
@seamstress create a permit application wizard with:
- Step 1: Applicant information
- Step 2: Property details
- Step 3: Permit type and scope
- Step 4: Supporting documents
- Step 5: Review and submit
- Progress indicator
- Save draft at each step
- Navigate between steps
```

### Nested Routing
```bash
@seamstress build a detail view for assets with tabs:
- Overview tab (default)
- Maintenance history tab
- Work orders tab
- Documents tab
- Activity log tab
Route structure: /entity/:entityId/assets/:assetId/:tab
```

### Real-Time Updates
```bash
@seamstress generate a dashboard with:
- Real-time metric updates via WebSocket
- Live notification feed
- Auto-refresh every 30 seconds
- Connection status indicator
- Reconnection on disconnect
```

### Inline Editing
```bash
@seamstress build a table with inline editing:
- Click cell to edit
- Save/cancel per row
- Validation before save
- Optimistic updates
- Error rollback on failure
```

---

## Troubleshooting

### Pattern Not Detected
**Problem**: Generated wrong type of component

**Solution**: Use explicit keywords or specify pattern
```bash
@seamstress build a LIST VIEW for work orders with search
@seamstress build a FORM for creating permits
```

### Missing Features
**Problem**: Component doesn't include expected features

**Solution**: Be explicit in your request
```bash
# Instead of:
@seamstress build a work orders list

# Use:
@seamstress build a work orders list with search, filters, sorting, and bulk actions
```

### Wrong Entity Context
**Problem**: Generated for wrong domain

**Solution**: Specify entity clearly
```bash
@seamstress build a permits list for the Permitting domain
@seamstress create a work order form for Enterprise Asset Management
```

---

## Summary

### Four Main Scenarios

1. **Figma + Context**: `@seamstress build {figma_url} [with {specifications}]`
2. **Prompt Only**: `@seamstress build {pattern} for {entity} [with {features}]`
3. **PRD/Documentation URL**: `@seamstress build {confluence_url|github_url|notion_url}`
4. **Local File**: `@seamstress build from {file_path}` or `@seamstress build @{file_path}`

### Key Distinctions

- **Has `figma.com` URL**: Scenario 1 (Figma-based)
- **Has PRD/doc URL** (Confluence, GitHub, Notion): Scenario 3 (PRD-based)
- **Has file path** (docs/, @docs/): Scenario 4 (File-based)
- **No URL or file**: Scenario 2 (Prompt-based)

### Universal Formula

```
@seamstress {action} {target} [with {context}]

WHERE:
  action = build | create | generate
  target = figma_url | pattern description | file path
  context = features, requirements, specifications (optional)
```

---

## Quick Reference Card

| Task | Command |
|------|---------|
| **List from Figma** | `@seamstress build https://figma.com/design/xyz` |
| **List from prompt** | `@seamstress build a work orders list with search` |
| **From PRD** | `@seamstress build https://opengovinc.atlassian.net/wiki/x/ABC` |
| **Form from Figma** | `@seamstress build https://figma.com/design/xyz for permits` |
| **Form from prompt** | `@seamstress create a permit form with validation` |
| **Detail from spec** | `@seamstress build a detail view for assets showing maintenance history` |
| **Dashboard** | `@seamstress generate a work orders dashboard with metrics` |
| **From file** | `@seamstress build from docs/feature-spec.md` |
| **Complex build** | `@seamstress build a work orders list with:` (multiline) |

---

**Remember**: The @seamstress agent uses Claude Code's semantic skills discovery to automatically load relevant patterns. You don't need to specify which skills to use—just describe what you want to build!

🪡 **Happy Building!**
