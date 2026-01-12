# 🪡 Seamstress Design

**AI-Powered Rapid Prototyping for OpenGov Designers**

Transform designs into production-ready prototypes in seconds using Claude Code and OpenGov's Capital Design System.

---

## 🎯 What is Seamstress?

Seamstress is an AI prototyping assistant that generates pixel-perfect React components from:
- 🎨 **Figma designs** - Paste a Figma URL, get working code
- 📝 **Natural language** - Describe what you want, Seamstress builds it
- 📊 **Data schemas** - Point to a schema, get forms and views
- 🔗 **Documentation** - Link to PRDs, get complete pages

**Built specifically for OpenGov designers** - all components use Capital Design System patterns and tokens.

---

## ⚡ Quick Start (5 minutes)

### 1. Install Claude Code

```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

**Alternative**: Install via [Homebrew](https://docs.claude.com/claude-code/installation)

### 2. Clone & Setup

```bash
# Clone this repo
git clone https://github.com/OpenGov/seamstress-design.git
cd seamstress-design

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Start Prototyping!

```bash
# Launch Claude Code
claude

# Try building your first prototype
@seamstress build a work orders list with search and filters
```

That's it! Seamstress will generate a complete, working prototype with:
- ✅ DataGrid with sorting & pagination
- ✅ Search with debouncing
- ✅ Filters (status, priority, etc.)
- ✅ Realistic mock data
- ✅ Responsive layout
- ✅ Capital Design tokens

---

## 🎨 For Designers

### What Seamstress Can Build

**List Pages**
```bash
@seamstress build a projects list with search, filters, and bulk actions
```
→ DataGrid, search, filters, pagination, bulk operations

**Forms**
```bash
@seamstress build a form for creating purchase requisitions
```
→ Multi-step forms, validation, file uploads, auto-save

**Dashboards**
```bash
@seamstress build a dashboard showing budget vs actuals
```
→ Metric cards, charts, tables, real-time updates

**Detail Views**
```bash
@seamstress build a detail page for viewing asset information
```
→ Tabbed layout, metadata, related items, actions

### From Figma to Code

```bash
# Paste your Figma URL
@seamstress build https://figma.com/design/your-file-id

# Seamstress will:
# 1. Analyze the Figma layout
# 2. Map elements to Capital components
# 3. Extract design tokens
# 4. Generate working React code
```

### Natural Language Examples

```bash
# Simple
@seamstress build a vendors list

# Detailed
@seamstress build a vendors list with:
- Search by name and email
- Filter by status (active, inactive, pending)
- Sort by name, created date
- 50 mock vendors with realistic data

# From PRD
@seamstress build https://opengovinc.atlassian.net/wiki/x/YourPRD
```

---

## 📚 Learning Resources

### Browse Examples

Visit **http://localhost:5173** after running `npm run dev`:

1. **Seamstress Overview** - How the system works
2. **Getting Started** - Step-by-step guide
3. **Component Patterns** - List, form, detail, dashboard patterns
4. **Building from Figma** - Figma integration guide
5. **Example Prototypes**:
   - Dashboard with metrics & charts
   - Agent Workspace (complex interactions)
   - Procurement Projects (business app)

### Storybook Components

```bash
npm run storybook
```

Browse all reusable components:
- Toolbar (consistent headers)
- Drawer (side panels)
- TiptapEditor (rich text)
- Modal (dialogs)

---

## 🎓 How It Works

### The @seamstress Agent

When you type `@seamstress`, Claude Code loads 13 **semantic skills** that teach it how to build OpenGov prototypes:

**Core Skills** (2):
- Component hierarchy (what to use when)
- Core principles (patterns & standards)

**Domain Skills** (7):
- Routing patterns
- Business logic
- Theme system
- Figma integration
- Architecture
- Accessibility

**Pattern Skills** (4):
- List view pattern
- Form pattern
- Detail view pattern
- Dashboard pattern

### Automatic Pattern Detection

Seamstress detects patterns from your request:

```bash
"build a list" → Loads list-view-pattern
"create a form" → Loads form-pattern
"show metrics" → Loads dashboard-pattern
```

No memorization required - just describe what you want!

---

## 🏗️ Project Structure

```
seamstress-design/
├── .claude/
│   ├── agents/seamstress.md        # Main AI agent
│   └── skills/                     # 13 semantic skills
│       ├── core/                   # 2 core skills
│       ├── domain/                 # 7 domain skills
│       └── patterns/               # 4 pattern skills
│
├── src/
│   ├── pages/
│   │   ├── seamstress/            # Self-documenting guides
│   │   └── examples/              # 3 reference prototypes
│   ├── components/                # Reusable UI components
│   ├── theme/                     # Capital theme extensions
│   └── utils/                     # Mock data generators
│
├── docs/
│   ├── database/opengov-schema.dbml  # Master data schema
│   └── examples/                     # Pattern templates
│
└── package.json                   # All dependencies configured
```

---

## 🎯 Common Tasks

### Create a New Prototype

```bash
# 1. Launch Claude Code
claude

# 2. Use @seamstress
@seamstress build a [description]

# 3. View in browser
# Seamstress auto-adds to App.tsx routes
# Visit http://localhost:5173/your-page
```

### Customize a Prototype

```bash
# Ask Seamstress to modify
@seamstress update the vendors list to include a rating column

# Or edit directly
# Files are in src/pages/
```

### Use Mock Data

```bash
@seamstress build a purchase orders list with 100 realistic items

# Seamstress auto-generates:
# - Realistic names, dates, amounts
# - Proper status distributions
# - Related data (vendors, line items)
```

### Apply Your Theme

```bash
# Seamstress uses your theme automatically
# Edit src/theme/ to customize colors, spacing, etc.

# All generated code uses theme tokens:
sx={{ p: 2 }}  // NOT padding: '16px'
sx={{ color: 'primary.main' }}  // NOT color: '#0066CC'
```

---

## 🚀 Development Workflow

### Local Development

```bash
npm run dev
```

Your app will be running at `http://localhost:5173`

### Share with Stakeholders

1. Run the development server locally
2. Share your screen or use a local tunnel service
3. Gather feedback
4. Iterate with `@seamstress update...`

---

## 💡 Tips & Tricks

### Be Specific

❌ "Build a list"
✅ "Build a vendors list with search, filters, and 50 mock items"

### Reference Examples

```bash
@seamstress build a page like the Dashboard example but for budget data
```

### Iterate Quickly

```bash
@seamstress build a projects list
# Review output
@seamstress add a priority filter
# Review again
@seamstress make the search work across all fields
```

### Use Real Data Schemas

```bash
@seamstress build a form based on docs/database/opengov-schema.dbml table "purchase_orders"
```

---

## 🆘 Getting Help

### Documentation

- Run `npm run dev` → Visit http://localhost:5173
- Check `docs/examples/` for pattern templates
- Read `.claude/skills/` for detailed guidance

### Common Issues

**"Component not found"**
- Make sure you ran `npm install`
- Check if OpenGov package versions are current

**"Build failing"**
- Run `npm run clean` then `npm install`
- Check Node version: `node --version` (should be 20+)

**"Seamstress not responding"**
- Make sure you're in the seamstress-design directory
- Try `claude` again
- Check `.claude/agents/seamstress.md` exists

### Support

- Report issues: [GitHub Issues](https://github.com/OpenGov/seamstress-design/issues)
- Ask questions: [#seamstress-design](https://opengov.slack.com/channels/seamstress-design)
- Request features: Talk to the design systems team

---

## 🎨 Design System Integration

### Capital Design System

All Seamstress components use:
- ✅ Capital theme tokens
- ✅ MUI components styled with Capital
- ✅ OpenGov component packages
- ✅ Accessibility standards
- ✅ Responsive breakpoints

### Theme Tokens

Seamstress only generates code with theme tokens:

```tsx
// ✅ Good - Uses theme
sx={{
  p: 2,  // theme.spacing(2)
  color: 'primary.main',  // theme.palette.primary.main
  backgroundColor: 'background.paper'  // theme.palette.background.paper
}}

// ❌ Bad - Hardcoded
sx={{
  padding: '16px',
  color: '#0066CC',
  backgroundColor: '#FFFFFF'
}}
```

---

## 📊 What Makes Seamstress Different?

### vs. Traditional Prototyping
- ❌ Manual HTML/CSS coding → ✅ Natural language
- ❌ Generic components → ✅ OpenGov patterns
- ❌ Fake data → ✅ Realistic mock data
- ❌ Hours per page → ✅ Seconds per page

### vs. Design Tools (Figma, Sketch)
- ❌ Static mockups → ✅ Working code
- ❌ No interactions → ✅ Full functionality
- ❌ Manual handoff → ✅ Direct to code
- ❌ Disconnect from dev → ✅ Production patterns

### vs. AI Code Generators
- ❌ Generic UI → ✅ OpenGov-specific
- ❌ Inconsistent patterns → ✅ Enforced standards
- ❌ No context → ✅ Domain-aware
- ❌ Requires editing → ✅ Production-ready

---

## 🎯 Success Stories

### Case Study: Budget Dashboard
**Before Seamstress**: 2 days of designer + developer time
**With Seamstress**: 10 minutes

```bash
@seamstress build a budget dashboard showing:
- Current year budget vs actuals
- Spending by department
- Top 5 over-budget line items
- Monthly trend chart
```

Result: Pixel-perfect dashboard with real interactions, ready for stakeholder demo.

### Case Study: Procurement Module
**Before Seamstress**: 1 week sprint
**With Seamstress**: 2 hours

Used Seamstress to generate:
- Projects list page
- Project detail page
- Create/edit forms
- All with realistic data

Accelerated feedback loop from weeks to hours.

---

## 🛠️ Advanced Features

### Custom Patterns

Add your own patterns to `.claude/skills/patterns/`:

```markdown
# your-pattern/SKILL.md
Pattern for building [your use case]
Keywords: custom, special, unique
[Instructions...]
```

Seamstress will auto-detect and use your pattern!

### Theme Customization

Edit `src/theme/index.ts`:

```typescript
export const customTheme = createTheme(capitalTheme, {
  palette: {
    primary: {
      main: '#YOUR_COLOR',
    },
  },
});
```

All generated components use your theme automatically.

### Mock Data Generators

Extend `src/utils/mockDataGenerators.ts`:

```typescript
export const generateMockYourEntity = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `entity_${i}`,
    name: faker.company.name(),
    // ... your fields
  }));
};
```

Seamstress can use your generators!

---

## 🚦 Status & Roadmap

### Current (v1.0)
- ✅ Complete framework
- ✅ 13 semantic skills
- ✅ 4 core patterns
- ✅ Figma integration
- ✅ Capital Design System
- ✅ Mock data generation

### Planned (v1.1)
- 🔄 Real API integration
- 🔄 User testing patterns
- 🔄 A/B testing support
- 🔄 Analytics integration

### Ideas (v2.0)
- 💡 Multi-page flows
- 💡 State machine generation
- 💡 Real-time collaboration
- 💡 Version history

---

## 📄 License

**Internal Use Only** - OpenGov Proprietary

This tool is for OpenGov designers and developers only. Do not share outside the organization.

---

## 🙏 Credits

Built by the **OpenGov Design Systems Team** to accelerate prototype development and maintain design consistency.

**Contributors**:
- AI Engineering Team
- Capital Design System Team
- Frontend Platform Team

---

## 🪡 Happy Prototyping!

**Remember**: Seamstress isn't just about speed—it's about building the *right* way, every time.

Start creating: `claude` → `@seamstress build...`

---

*Questions? Reach out in [#seamstress-design](https://opengov.slack.com/channels/seamstress-design)*
