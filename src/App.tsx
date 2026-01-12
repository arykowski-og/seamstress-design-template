import React, { lazy, Suspense } from 'react';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { WorkspaceChatProvider, useWorkspaceChat } from './contexts/WorkspaceChatContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { EAMLayout } from './components/EAMLayout';
import { ProcurementLayout } from './components/ProcurementLayout';
import { PrototypesLayout } from './components/PrototypesLayout';
import { UtilityBillingLayout } from './components/UtilityBillingLayout';
import { AppBuilderLayout } from './components/AppBuilderLayout';
import { WorkflowBuilderLayout } from './components/WorkflowBuilderLayout';
import { CommandCenterLayout } from './components/CommandCenterLayout';
import { TasksLayout } from './components/TasksLayout';
import { ProgramsLayout } from './components/ProgramsLayout';
import { ReportsLayout } from './components/ReportsLayout';
import { BudgetingLayout } from './components/BudgetingLayout';
import { FinancialsLayout } from './components/FinancialsLayout';
import { PermittingLayout } from './components/PermittingLayout';
import { MentionProvider } from './context/MentionProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { DataProvider } from './contexts/DataContext';
import PageTransition from './components/PageTransition';
import { ThemeEditorUtility } from './components/theme-editor/ThemeEditorUtility';
import { WorkspaceChatModal } from './components/WorkspaceChatModal';
import { DockedWorkspaceChat } from './components/DockedWorkspaceChat';

// Lazy load Agent Studio pages
const DashboardPage = lazy(() => import('./pages/agent-studio/DashboardPage'));
const AgentsListPage = lazy(() => import('./pages/agent-studio/AgentsListPageNew'));
const AgentDetailPage = lazy(() => import('./pages/agent-studio/AgentDetailPage'));
const AgentEditPage = lazy(() => import('./pages/agent-studio/AgentEditPage'));
const SkillsListPage = lazy(() => import('./pages/agent-studio/SkillsListPageNew'));
const SkillEditPage = lazy(() => import('./pages/agent-studio/SkillEditPage'));
const ToolsListPage = lazy(() => import('./pages/agent-studio/ToolsListPageNew'));
const ToolDetailPage = lazy(() => import('./pages/agent-studio/ToolDetailPage'));
const KnowledgePageEnhanced = lazy(() => import('./pages/agent-studio/KnowledgePageEnhanced'));
const KnowledgeEditPage = lazy(() => import('./pages/agent-studio/KnowledgeEditPage'));
const ChatInterfacePage = lazy(() => import('./pages/agent-studio/ChatInterfacePage'));

// Lazy load example prototype pages
const ProcurementProjectsPage = lazy(() => import('./pages/examples/procurement/ProcurementProjectsPage'));
const EAMDashboard = lazy(() => import('./pages/examples/eam/EAMDashboard'));
const EAMAnalyticsDashboard = lazy(() => import('./pages/eam/EAMAnalyticsDashboard'));

// Lazy load Seamstress documentation pages
const SeamstressOverview = lazy(() => import('./pages/seamstress/SeamstressOverview'));
const HowItWorksPage = lazy(() => import('./pages/seamstress/HowItWorksPage'));
const SkillsReferencePage = lazy(() => import('./pages/seamstress/SkillsReferencePage'));
const ComponentsPatternsPage = lazy(() => import('./pages/seamstress/ComponentsPatternsPage'));
const GettingStartedPage = lazy(() => import('./pages/seamstress/GettingStartedPage'));
const TestingSkillsPage = lazy(() => import('./pages/seamstress/TestingSkillsPage'));
const BuildingFromFigmaPage = lazy(() => import('./pages/seamstress/BuildingFromFigmaPage'));
const ThemeEditorTestPage = lazy(() => import('./pages/seamstress/ThemeEditorTestPage'));
const ThemesPage = lazy(() => import('./pages/seamstress/ThemesPage'));
const PrototypesIndexPage = lazy(() => import('./pages/PrototypesIndexPage'));
const HomePage = lazy(() => import('./pages/HomePage'));

// Lazy load design system documentation pages
const DocsOverview = lazy(() => import('./pages/docs/DocsOverview'));
const ThemeSystem = lazy(() => import('./pages/docs/ThemeSystem'));
const LayoutRules = lazy(() => import('./pages/docs/LayoutRules'));
const ComponentPatterns = lazy(() => import('./pages/docs/ComponentPatterns'));
const DataVisualization = lazy(() => import('./pages/docs/DataVisualization'));

// Lazy load Utility Billing pages
const BillingHomePage = lazy(() => import('./pages/utility-billing/BillingHomePage'));
const CutoffPage = lazy(() => import('./pages/utility-billing/CutoffPage'));
const AccountNumberFormatPage = lazy(() => import('./pages/utility-billing/AccountNumberFormatPage'));

// Lazy load new scaffolded pages
const AppBuilderPage = lazy(() => import('./pages/AppBuilderPage'));
const WorkflowBuilderPage = lazy(() => import('./pages/WorkflowBuilderPage'));
const CommandCenterPage = lazy(() => import('./pages/CommandCenterPage'));
const CommandCenterDashboard = lazy(() => import('./pages/command-center/CommandCenterDashboard'));
const TasksPage = lazy(() => import('./pages/TasksPage'));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const BudgetingPage = lazy(() => import('./pages/BudgetingPage'));
const FinancialsPage = lazy(() => import('./pages/FinancialsPage'));
const PermittingPage = lazy(() => import('./pages/PermittingPage'));

// Lazy load Permitting pages
const PermittingDashboard = lazy(() => import('./pages/permitting/PermittingDashboard'));

// Lazy load Procurement pages
const ProcurementDashboard = lazy(() => import('./pages/procurement/ProcurementDashboard'));

// Lazy load Financials pages
const FinancialsDashboard = lazy(() => import('./pages/financials/FinancialsDashboard'));

// Lazy load App Builder pages
const PermitLicenseDashboard = lazy(() => import('./pages/app-builder/PermitLicenseDashboard'));

// Loading component
const PageLoader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh'
    }}
  >
    <CircularProgress />
  </Box>
);

// Inner component that uses the workspace chat context
const AppContent = () => {
  const { isDocked, isOpen, dockedWidth } = useWorkspaceChat();
  const [isResizing, setIsResizing] = React.useState(false);

  // Listen for resize events
  React.useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      if (isDocked && isOpen) {
        setIsResizing(true);
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          setIsResizing(false);
        }, 100);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(resizeTimeout);
    };
  }, [isDocked, isOpen]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        marginRight: (isDocked && isOpen) ? `${dockedWidth}px` : 0,
        transition: isResizing ? 'none' : 'margin-right 0.3s ease-in-out',
      }}
    >
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
        <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Home page - comprehensive landing page */}
                <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />

                {/* Agent Studio Routes - uses AppLayout with MentionProvider */}
                <Route path="/agent-studio/*" element={
                  <MentionProvider>
                    <AppLayout>
                      <Routes>
                        <Route path="/" element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
                        <Route path="chat" element={<PageTransition><ChatInterfacePage /></PageTransition>} />
                        <Route path="agents" element={<PageTransition><AgentsListPage /></PageTransition>} />
                        <Route path="agents/:id" element={<PageTransition><AgentDetailPage /></PageTransition>} />
                        <Route path="agents/:id/edit" element={<PageTransition><AgentEditPage /></PageTransition>} />
                        <Route path="skills" element={<PageTransition><SkillsListPage /></PageTransition>} />
                        <Route path="skills/:id" element={<PageTransition><SkillEditPage /></PageTransition>} />
                        <Route path="tools" element={<PageTransition><ToolsListPage /></PageTransition>} />
                        <Route path="tools/:id" element={<PageTransition><ToolDetailPage /></PageTransition>} />
                        <Route path="knowledge" element={<PageTransition><KnowledgePageEnhanced /></PageTransition>} />
                        <Route path="knowledge/:id" element={<PageTransition><KnowledgeEditPage /></PageTransition>} />
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </AppLayout>
                  </MentionProvider>
                } />

                {/* Seamstress Documentation Routes */}
                <Route path="/seamstress" element={<PageTransition><SeamstressOverview /></PageTransition>} />
                <Route path="/seamstress/how-it-works" element={<PageTransition><HowItWorksPage /></PageTransition>} />
                <Route path="/seamstress/skills-reference" element={<PageTransition><SkillsReferencePage /></PageTransition>} />
                <Route path="/seamstress/components-patterns" element={<PageTransition><ComponentsPatternsPage /></PageTransition>} />
                <Route path="/seamstress/getting-started" element={<PageTransition><GettingStartedPage /></PageTransition>} />
                <Route path="/seamstress/building-from-figma" element={<PageTransition><BuildingFromFigmaPage /></PageTransition>} />
                <Route path="/seamstress/testing" element={<PageTransition><TestingSkillsPage /></PageTransition>} />
                <Route path="/seamstress/theme-editor" element={<PageTransition><ThemeEditorTestPage /></PageTransition>} />
                <Route path="/seamstress/themes" element={<PageTransition><ThemesPage /></PageTransition>} />
                <Route path="/seamstress/*" element={<PageTransition><SeamstressOverview /></PageTransition>} />

                {/* Design System Documentation Routes */}
                <Route path="/docs" element={<PageTransition><DocsOverview /></PageTransition>} />
                <Route path="/docs/overview" element={<PageTransition><DocsOverview /></PageTransition>} />
                <Route path="/docs/theme-system" element={<PageTransition><ThemeSystem /></PageTransition>} />
                <Route path="/docs/layout-rules" element={<PageTransition><LayoutRules /></PageTransition>} />
                <Route path="/docs/component-patterns" element={<PageTransition><ComponentPatterns /></PageTransition>} />
                <Route path="/docs/data-visualization" element={<PageTransition><DataVisualization /></PageTransition>} />

                {/* Prototypes Index Routes */}
                <Route path="/prototypes" element={
                  <PageTransition>
                    <PrototypesLayout>
                      <PrototypesIndexPage />
                    </PrototypesLayout>
                  </PageTransition>
                } />


                {/* Procurement with Layout */}
                <Route path="/procurement/*" element={
                  <PageTransition>
                    <ProcurementLayout>
                      <Routes>
                        <Route path="/" element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<PageTransition><ProcurementDashboard /></PageTransition>} />
                        <Route path="projects" element={<PageTransition><ProcurementProjectsPage /></PageTransition>} />
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </ProcurementLayout>
                  </PageTransition>
                } />

                {/* EAM with Layout */}
                <Route path="/eam/*" element={
                  <PageTransition>
                    <EAMLayout>
                      <Routes>
                        <Route path="/" element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<PageTransition><EAMDashboard /></PageTransition>} />
                        <Route path="analytics" element={<PageTransition><EAMAnalyticsDashboard /></PageTransition>} />
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </EAMLayout>
                  </PageTransition>
                } />

                {/* Utility Billing Routes with Layout */}
                <Route path="/utility-billing/*" element={
                  <PageTransition>
                    <UtilityBillingLayout>
                      <Routes>
                        <Route path="/" element={<Navigate to="home" replace />} />
                        <Route path="home" element={<PageTransition><BillingHomePage /></PageTransition>} />
                        <Route path="workflows/cutoff" element={<PageTransition><CutoffPage /></PageTransition>} />
                        <Route path="settings/account-number-format" element={<PageTransition><AccountNumberFormatPage /></PageTransition>} />
                        <Route path="*" element={<Navigate to="home" replace />} />
                      </Routes>
                    </UtilityBillingLayout>
                  </PageTransition>
                } />

                {/* Capability Pages */}
                <Route path="/app-builder/*" element={
                  <PageTransition>
                    <AppBuilderLayout>
                      <Routes>
                        <Route path="/" element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<PageTransition><PermitLicenseDashboard /></PageTransition>} />
                        <Route path="library" element={<PageTransition><AppBuilderPage /></PageTransition>} />
                        <Route path="templates" element={<PageTransition><AppBuilderPage /></PageTransition>} />
                        <Route path="settings" element={<PageTransition><AppBuilderPage /></PageTransition>} />
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </AppBuilderLayout>
                  </PageTransition>
                } />
                <Route path="/workflow-builder" element={
                  <PageTransition>
                    <WorkflowBuilderLayout>
                      <WorkflowBuilderPage />
                    </WorkflowBuilderLayout>
                  </PageTransition>
                } />

                {/* Action Hub Pages */}
                <Route path="/command-center" element={
                  <PageTransition>
                    <CommandCenterLayout>
                      <CommandCenterDashboard />
                    </CommandCenterLayout>
                  </PageTransition>
                } />
                <Route path="/tasks" element={
                  <PageTransition>
                    <TasksLayout>
                      <TasksPage />
                    </TasksLayout>
                  </PageTransition>
                } />
                <Route path="/programs" element={
                  <PageTransition>
                    <ProgramsLayout>
                      <ProgramsPage />
                    </ProgramsLayout>
                  </PageTransition>
                } />
                <Route path="/reports" element={
                  <PageTransition>
                    <ReportsLayout>
                      <ReportsPage />
                    </ReportsLayout>
                  </PageTransition>
                } />

                {/* Module Pages */}
                <Route path="/budgeting" element={
                  <PageTransition>
                    <BudgetingLayout>
                      <BudgetingPage />
                    </BudgetingLayout>
                  </PageTransition>
                } />
                <Route path="/financials/*" element={
                  <PageTransition>
                    <FinancialsLayout>
                      <Routes>
                        <Route path="/" element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<PageTransition><FinancialsDashboard /></PageTransition>} />
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </FinancialsLayout>
                  </PageTransition>
                } />
                <Route path="/permitting/*" element={
                  <PageTransition>
                    <PermittingLayout>
                      <Routes>
                        <Route path="/" element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<PageTransition><PermittingDashboard /></PageTransition>} />
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </PermittingLayout>
                  </PageTransition>
                } />

                {/* Fallback to Agent Studio dashboard */}
                <Route path="*" element={<Navigate to="/agent-studio/dashboard" replace />} />
              </Routes>
        </Suspense>
      </BrowserRouter>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider>
      <WorkspaceChatProvider>
        <CssBaseline />
        <ThemeEditorUtility />
        <WorkspaceChatModal />
        <ErrorBoundary>
          <DataProvider defaultSource="mock">
            <AppContent />
            <DockedWorkspaceChat />
          </DataProvider>
        </ErrorBoundary>
      </WorkspaceChatProvider>
    </ThemeProvider>
  );
}

export default App;
