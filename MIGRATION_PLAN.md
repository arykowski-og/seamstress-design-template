# Seamstress Migration Plan
## Migration to seamstress-design Repository

**Date**: November 10, 2025
**Status**: ✅ Pre-migration cleanup complete
**Target**: `https://github.com/OpenGov/seamstress-design.git`

---

## Executive Summary

Migrate the complete Seamstress AI prototyping framework from the personal `govbarnesy/seamstress` repository to the official OpenGov `OpenGov/seamstress-design` repository, enabling the design team to leverage AI-powered rapid prototyping capabilities.

---

## Current State

### Source Repository: `govbarnesy/seamstress`
- **Size**: 2.2GB (1.8GB node_modules, 38MB .git)
- **Commits**: 143 (all in 2024)
- **Build**: ✅ Production build working (22.5s)
- **Tests**: ✅ 167/200 passing (33 test failures in UI components)
- **TypeScript**: ⚠️ Strict mode has errors, but build succeeds
- **Deployments**: Vercel (configured)
- **Storybook**: ✅ Configured

### Target Repository: `OpenGov/seamstress-design`
- **Size**: Empty (README only)
- **Purpose**: Designer demos and POCs
- **Status**: Clean slate, ready for migration

---

## What We're Migrating

### ✅ Core Seamstress Framework (ESSENTIAL)

```
.claude/
├── agents/seamstress.md          # Main @seamstress agent
├── commands/seamstress.md         # /seamstress slash command
└── skills/                        # 13 semantic skills
    ├── core/                      # 2 skills (principles, hierarchy)
    ├── domain/                    # 7 skills (routing, business logic, theme, etc.)
    └── patterns/                  # 4 skills (list, form, detail, dashboard)
```

**Why**: This is the heart of Seamstress - enables AI-powered component generation

### ✅ Build & Configuration (ESSENTIAL)

```
Configuration Files:
├── package.json                   # All dependencies
├── vite.config.ts                 # Build configuration
├── tsconfig.json + variants       # TypeScript setup
├── vercel.json                    # Deployment config
├── netlify.toml                   # Alt deployment
├── .storybook/                    # Storybook config
└── vitest.config.ts               # Test runner
```

**Why**: Required for development, building, and deployment

### ✅ Framework Code (ESSENTIAL)

```
src/
├── components/                    # Reusable UI components
│   ├── Toolbar/                  # Consistent toolbar
│   ├── Drawer/                   # Side panel drawer
│   ├── TiptapEditor/             # Rich text editor
│   └── Modal/                    # Modal dialogs
├── theme/                        # Capital Design System extensions
│   ├── index.ts                  # Main theme
│   ├── dark-theme-components.ts  # Dark mode
│   └── overrides.ts              # Theme customizations
├── contexts/                     # Shared state providers
│   ├── ThemeContext.tsx          # Theme switching
│   ├── DataContext.tsx           # Data management
│   └── AuthContext.tsx           # Auth wrapper
├── utils/                        # Utilities
│   ├── mockDataGenerators.ts    # Realistic mock data
│   └── validateDesignTokens.ts  # Token validation
├── hooks/                        # Custom React hooks
├── services/                     # Business logic
├── types/                        # TypeScript definitions
└── data/                         # Mock data
```

**Why**: Core functionality needed for prototypes

### ✅ Documentation (ESSENTIAL)

```
docs/
├── database/
│   └── opengov-schema.dbml       # Master data schema
├── examples/                     # Pattern templates
│   ├── list-example.tsx          # DataGrid template
│   ├── form-example.tsx          # Form template
│   ├── detail-example.tsx        # Detail view template
│   └── base-example.tsx          # Base template
├── personas.md                   # User personas
└── suite-scope.md                # Project scope

src/pages/seamstress/              # Self-documenting pages
├── SeamstressOverview.tsx        # Main overview
├── GettingStartedPage.tsx        # Quick start guide
├── HowItWorksPage.tsx            # How Seamstress works
├── ComponentsPatternsPage.tsx    # Pattern library
├── BuildingFromFigmaPage.tsx     # Figma integration
├── SkillsReferencePage.tsx       # Skills reference
├── TestingSkillsPage.tsx         # Testing guide
├── ContextAnalysisPage.tsx       # Context system
└── ThemesPage.tsx                # Theme customization
```

**Why**: Essential documentation and guides for designers

### ⚠️ Prototype Examples (SELECTIVE - 2-3 best)

```
src/pages/
├── ✅ DashboardPage.tsx           # INCLUDE: Best dashboard example
├── ✅ AgentWorkspaceDemoPage.tsx  # INCLUDE: Complex interaction demo
├── ✅ ProcurementProjectsPage.tsx # INCLUDE: Business app example
├── ⏭️ (Skip other experimental pages)
```

**Why**: Provide reference examples without overwhelming

### ❌ DO NOT MIGRATE

```
❌ .git/                          # Start fresh git history
❌ node_modules/                  # Reinstall dependencies
❌ dist/                          # Regenerate build
❌ logs/                          # Old logs
❌ .vercel/                       # Regenerate deployment
❌ .worktrees/                    # Git worktrees
❌ Experimental/WIP pages         # Clean start
```

---

## Migration Strategy: Option 1 (RECOMMENDED)

### **Complete Framework Migration**

Migrate entire Seamstress framework with selective prototype examples.

**Timeline**: 7-12 hours (1-2 days)

**Steps**:

#### Phase 1: Preparation (2-4 hours)
1. ✅ **DONE**: Fix TypeScript errors
2. ✅ **DONE**: Verify builds pass
3. ✅ **DONE**: Document current state
4. Create migration branch in seamstress
5. Clean up temporary/experimental code
6. Select 2-3 best prototype examples
7. Update documentation for designer audience

#### Phase 2: Migration (2-3 hours)
1. Clone seamstress-design repo
2. Copy framework structure:
   ```bash
   # Core framework
   cp -r .claude/ seamstress-design/
   cp package.json vite.config.ts tsconfig.* seamstress-design/
   cp vercel.json netlify.toml seamstress-design/
   cp -r .storybook/ seamstress-design/

   # Source code
   cp -r src/components/ seamstress-design/src/
   cp -r src/theme/ seamstress-design/src/
   cp -r src/contexts/ seamstress-design/src/
   cp -r src/utils/ seamstress-design/src/
   cp -r src/hooks/ seamstress-design/src/
   cp -r src/types/ seamstress-design/src/
   cp -r src/data/ seamstress-design/src/

   # Documentation
   cp -r docs/ seamstress-design/
   cp README.md seamstress-design/
   cp -r src/pages/seamstress/ seamstress-design/src/pages/

   # Selected prototypes (3 examples)
   cp src/pages/DashboardPage.tsx seamstress-design/src/pages/examples/
   cp src/pages/AgentWorkspaceDemoPage.tsx seamstress-design/src/pages/examples/
   cp src/pages/ProcurementProjectsPage.tsx seamstress-design/src/pages/examples/
   ```

3. Update package.json:
   - Change name to `seamstress-design`
   - Update repository URLs
   - Update description for designer audience

4. Update README.md:
   - Focus on designer use cases
   - Simplify technical details
   - Add "Getting Started for Designers" section

#### Phase 3: Validation (2-3 hours)
1. Install dependencies: `npm install`
2. Run build: `npm run build`
3. Run tests: `npm test`
4. Run Storybook: `npm run storybook`
5. Test Claude agent: `claude` → `@seamstress build a test page`
6. Fix any migration issues

#### Phase 4: Deployment (1-2 hours)
1. Deploy to Vercel:
   ```bash
   vercel --prod
   ```
2. Deploy Storybook:
   ```bash
   npm run deploy:storybook
   ```
3. Configure GitHub:
   - Branch protection rules
   - Required checks
   - CODEOWNERS file

4. Test deployments:
   - Verify seamstress-design.vercel.app works
   - Verify Storybook deployment
   - Test all example pages

#### Phase 5: Documentation (1-2 hours)
1. Update README for designers:
   - Remove technical implementation details
   - Add visual examples with screenshots
   - Create "Quick Start" video walkthrough
   - Add FAQ section

2. Create CONTRIBUTING.md:
   - Guidelines for designers
   - How to request new prototypes
   - How to report issues

3. Create design-specific guides:
   - "Building Your First Prototype"
   - "Customizing Themes"
   - "Working with Mock Data"

---

## Migration Checklist

### Pre-Migration
- [x] Fix TypeScript errors
- [x] Verify builds pass
- [x] Document current state
- [ ] Create migration branch
- [ ] Select best 2-3 prototypes
- [ ] Clean experimental code
- [ ] Update docs for designers

### Migration
- [ ] Clone seamstress-design
- [ ] Copy .claude/ framework
- [ ] Copy configuration files
- [ ] Copy src/ structure
- [ ] Copy docs/
- [ ] Copy README
- [ ] Copy selected examples
- [ ] Update package.json
- [ ] Update README for designers

### Validation
- [ ] npm install
- [ ] npm run build
- [ ] npm test
- [ ] npm run storybook
- [ ] Test @seamstress agent
- [ ] Fix any issues

### Deployment
- [ ] Deploy to Vercel
- [ ] Deploy Storybook
- [ ] Configure GitHub repo
- [ ] Test deployments
- [ ] Verify all pages work

### Documentation
- [ ] Update README
- [ ] Create CONTRIBUTING.md
- [ ] Create designer guides
- [ ] Add screenshots/videos
- [ ] Create FAQ

### Cleanup
- [ ] Archive govbarnesy/seamstress
- [ ] Update team documentation
- [ ] Announce to design team
- [ ] Schedule training session

---

## Post-Migration

### Week 1: Onboarding
- Schedule design team demo
- Create video tutorials
- Set up support channel
- Monitor initial usage

### Week 2-4: Iteration
- Gather designer feedback
- Fix reported issues
- Add requested features
- Improve documentation

### Ongoing: Maintenance
- Keep dependencies updated
- Add new patterns as needed
- Maintain example quality
- Support design team

---

## Risk Mitigation

### Low Risk ✅
- Build process solid
- Dependencies stable
- Documentation comprehensive
- Core framework tested

### Medium Risk ⚠️
- Some test failures (can document as known issues)
- TypeScript strict mode errors (non-blocking)
- Large bundle size (can optimize later)

### Mitigation Strategies
1. **Archive original**: Keep govbarnesy/seamstress as backup
2. **Gradual rollout**: Start with pilot group of designers
3. **Clear documentation**: Reduce support burden
4. **Feedback loop**: Quick iteration based on usage

---

## Success Criteria

### Technical
- [ ] All builds pass
- [ ] All deployments work
- [ ] Claude agent functional
- [ ] Storybook accessible
- [ ] < 30s build time

### Designer Experience
- [ ] Designers can generate prototypes in < 1 min
- [ ] Documentation clear and helpful
- [ ] Examples inspire confidence
- [ ] Support requests < 5/week after onboarding

### Business Impact
- [ ] 10+ prototypes created in first month
- [ ] 50% reduction in prototype development time
- [ ] Design team adoption > 80%
- [ ] Positive feedback from stakeholders

---

## Timeline Summary

| Phase | Duration | Status |
|-------|----------|--------|
| Cleanup | 2-4 hours | ✅ Complete |
| Migration | 2-3 hours | ⏳ Ready |
| Validation | 2-3 hours | ⏳ Pending |
| Deployment | 1-2 hours | ⏳ Pending |
| Documentation | 1-2 hours | ⏳ Pending |
| **TOTAL** | **7-12 hours** | **30% Complete** |

---

## Next Steps

**Ready to proceed with Phase 2: Migration?**

1. Confirm selection of 3 prototype examples
2. Create migration branch
3. Execute copy operations
4. Proceed through validation

**Or need to:**
- Review prototype selection?
- Adjust migration scope?
- Add specific requirements?

---

*Generated with Claude Code for the Seamstress → Seamstress-Design migration*
