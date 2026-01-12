import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Stack,
  useTheme,
  useMediaQuery,
  Chip,
  Card,
  CardContent,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PageHeaderComposable } from '@opengov/components-page-header';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import { capitalDesignTokens } from '@opengov/capital-mui-theme';

// Import dashboard components
import MetricCard from '../../components/dashboard/MetricCard';
import TimeSeriesChart from '../../components/dashboard/TimeSeriesChart';
import BarChart from '../../components/dashboard/BarChart';
import PerformanceTable from '../../components/dashboard/PerformanceTable';

// Import mock data
import {
  permitLicenseMockData,
  getApplicationTypes,
  getReviewers,
  getStatuses,
  type Application,
} from '../../data/permitLicenseMockData';

/**
 * Filter state interface
 */
interface DashboardFilters {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  applicationTypes: string[];
  statuses: string[];
  reviewers: string[];
}

/**
 * PermittingDashboard - Comprehensive dashboard for Permitting & Licensing Operations
 *
 * Features:
 * - KPI tracking: New applications, approvals, processing time, backlog
 * - Time series visualization of application volume
 * - Backlog analysis by application type
 * - Detailed application table with filtering and sorting
 * - Advanced filtering by date range, type, status, and reviewer
 */
const PermittingDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Get available filter options
  const availableTypes = useMemo(() => getApplicationTypes(), []);
  const availableStatuses = useMemo(() => getStatuses(), []);
  const availableReviewers = useMemo(() => getReviewers(), []);

  // Initialize default date range (last 90 days)
  const defaultEndDate = new Date();
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 90);

  // Filter state
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: {
      start: defaultStartDate,
      end: defaultEndDate,
    },
    applicationTypes: [],
    statuses: [],
    reviewers: [],
  });

  const [filtersExpanded, setFiltersExpanded] = useState(false);

  // Extract raw data from mock
  const { applications: allApplications, timeSeriesData: allTimeSeriesData } = permitLicenseMockData;

  // Apply filters to applications
  const filteredApplications = useMemo(() => {
    return allApplications.filter((app) => {
      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const appDate = new Date(app.applicationDate);
        if (filters.dateRange.start && appDate < filters.dateRange.start) return false;
        if (filters.dateRange.end && appDate > filters.dateRange.end) return false;
      }

      // Application type filter
      if (filters.applicationTypes.length > 0 && !filters.applicationTypes.includes(app.applicationType)) {
        return false;
      }

      // Status filter
      if (filters.statuses.length > 0 && !filters.statuses.includes(app.applicationStatus)) {
        return false;
      }

      // Reviewer filter
      if (filters.reviewers.length > 0 && !filters.reviewers.includes(app.assignedReviewer)) {
        return false;
      }

      return true;
    });
  }, [allApplications, filters]);

  // Calculate filtered KPIs
  const filteredKPIs = useMemo(() => {
    const newAppsCount = filteredApplications.length;

    const approvedCount = filteredApplications.filter(
      app => app.applicationStatus === 'Approved'
    ).length;

    const closedApps = filteredApplications.filter(
      app => app.decisionDate && (app.applicationStatus === 'Approved' || app.applicationStatus === 'Rejected')
    );

    const avgDays = closedApps.length > 0
      ? closedApps.reduce((sum, app) => {
          const appDate = new Date(app.applicationDate);
          const decDate = new Date(app.decisionDate!);
          const days = Math.floor((decDate.getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24));
          return sum + days;
        }, 0) / closedApps.length
      : 0;

    const backlogCount = filteredApplications.filter(
      app => app.applicationStatus === 'In Review' ||
             app.applicationStatus === 'Submitted' ||
             app.applicationStatus === 'Pending'
    ).length;

    return {
      newApplications: newAppsCount,
      approvedApplications: approvedCount,
      avgDaysToDecision: avgDays.toFixed(1),
      openBacklog: backlogCount,
    };
  }, [filteredApplications]);

  // Calculate filtered time series
  const filteredTimeSeriesData = useMemo(() => {
    if (!filters.dateRange.start && !filters.dateRange.end) {
      return allTimeSeriesData;
    }

    return allTimeSeriesData.filter((point) => {
      const pointDate = new Date(point.date);
      if (filters.dateRange.start && pointDate < filters.dateRange.start) return false;
      if (filters.dateRange.end && pointDate > filters.dateRange.end) return false;
      return true;
    });
  }, [allTimeSeriesData, filters.dateRange]);

  // Calculate filtered backlog by type
  const filteredBacklogByType = useMemo(() => {
    const openApps = filteredApplications.filter(
      app => app.applicationStatus === 'In Review' ||
             app.applicationStatus === 'Submitted' ||
             app.applicationStatus === 'Pending'
    );

    const typeGroups = openApps.reduce((acc, app) => {
      acc[app.applicationType] = (acc[app.applicationType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeGroups)
      .map(([type, count], idx) => ({
        applicationType: type,
        openCount: count,
        color: permitLicenseMockData.backlogByType.find(b => b.applicationType === type)?.color,
      }))
      .sort((a, b) => b.openCount - a.openCount);
  }, [filteredApplications]);

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      dateRange: {
        start: defaultStartDate,
        end: defaultEndDate,
      },
      applicationTypes: [],
      statuses: [],
      reviewers: [],
    });
  };

  // Check if any filters are active
  const hasActiveFilters = filters.applicationTypes.length > 0 ||
                          filters.statuses.length > 0 ||
                          filters.reviewers.length > 0;

  // Prepare time series data for chart
  const timeSeriesChartData = filteredTimeSeriesData.map((point) => ({
    timestamp: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    applications: point.applications,
  }));

  // Prepare backlog data for bar chart
  const backlogChartData = filteredBacklogByType.map((item) => ({
    name: item.applicationType,
    value: item.openCount,
    color: item.color,
  }));

  // Prepare application table data
  const applicationTableColumns = [
    { id: 'applicationId', label: 'Application ID', sortable: true, width: '12%' },
    { id: 'applicationType', label: 'Type', sortable: true, width: '18%' },
    {
      id: 'applicationStatus',
      label: 'Status',
      sortable: true,
      align: 'left' as const,
      render: (value: string) => {
        const statusColors: { [key: string]: string } = {
          'Approved': 'success',
          'In Review': 'info',
          'Submitted': 'default',
          'Pending': 'warning',
          'Rejected': 'error',
          'Closed': 'default',
        };
        return (
          <Chip
            label={value}
            size="small"
            color={statusColors[value] as any || 'default'}
            sx={{ minWidth: 90 }}
          />
        );
      },
    },
    { id: 'applicantName', label: 'Applicant', sortable: true, width: '15%' },
    {
      id: 'applicationDate',
      label: 'Submitted',
      sortable: true,
      align: 'right' as const,
      render: (value: string) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    },
    { id: 'assignedReviewer', label: 'Reviewer', sortable: true, width: '15%' },
    {
      id: 'daysInStatus',
      label: 'Days in Status',
      sortable: true,
      align: 'right' as const,
      render: (value: number) => `${value}d`,
    },
  ];

  const applicationTableRows = filteredApplications.map((app) => ({
    id: app.applicationId,
    applicationId: app.applicationId,
    applicationType: app.applicationType,
    applicationStatus: app.applicationStatus,
    applicantName: app.applicantName,
    applicationDate: app.applicationDate,
    assignedReviewer: app.assignedReviewer,
    daysInStatus: app.daysInStatus,
    // Highlight urgent items
    status: app.daysInStatus > 30 ? 'warning' : 'neutral' as const,
    highlight: app.daysInStatus > 30,
  }));

  const getChangeType = (trend: 'up' | 'down' | 'stable') => {
    return trend === 'up' ? 'positive' : trend === 'down' ? 'negative' : 'neutral';
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
      }}
    >
      {/* Page Header */}
      <Box
        sx={{
          '& > div': {
            px: 3,
            py: 2.5,
          },
          '& > div > div': {
            px: 0,
          },
        }}
      >
        <PageHeaderComposable>
          <PageHeaderComposable.Header>
            <PageHeaderComposable.Title>
              Permitting & Licensing Overview
            </PageHeaderComposable.Title>
            <PageHeaderComposable.Description>
              Monitor permit and license volumes, turnaround times, and backlog for community development and licensing teams.
            </PageHeaderComposable.Description>
          </PageHeaderComposable.Header>
        </PageHeaderComposable>
      </Box>

      {/* Content Area */}
      <Box
        sx={{
          backgroundColor: 'background.secondary',
          padding: 3,
        }}
      >
        <Stack spacing={3}>
          {/* ================================================================
              Filters Section
              ================================================================ */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Accordion
              expanded={filtersExpanded}
              onChange={() => setFiltersExpanded(!filtersExpanded)}
              sx={{
                boxShadow: 1,
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: 'background.paper',
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    gap: 2,
                  },
                }}
              >
                <FilterListIcon />
                <Typography variant="h3" fontWeight="500">
                  Filters
                </Typography>
                {hasActiveFilters && (
                  <Chip
                    label={`${
                      filters.applicationTypes.length +
                      filters.statuses.length +
                      filters.reviewers.length
                    } active`}
                    size="small"
                    color="primary"
                  />
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <Grid container spacing={2}>
                    {/* Date Range Filters */}
                    <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                      <DatePicker
                        label="Start Date"
                        value={filters.dateRange.start}
                        onChange={(newValue) =>
                          setFilters({
                            ...filters,
                            dateRange: { ...filters.dateRange, start: newValue },
                          })
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: 'small',
                          },
                        }}
                      />
                    </Grid>
                    <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                      <DatePicker
                        label="End Date"
                        value={filters.dateRange.end}
                        onChange={(newValue) =>
                          setFilters({
                            ...filters,
                            dateRange: { ...filters.dateRange, end: newValue },
                          })
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: 'small',
                          },
                        }}
                      />
                    </Grid>

                    {/* Application Type Filter */}
                    <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Application Type</InputLabel>
                        <Select
                          multiple
                          value={filters.applicationTypes}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              applicationTypes: e.target.value as string[],
                            })
                          }
                          input={<OutlinedInput label="Application Type" />}
                          renderValue={(selected) => `${selected.length} selected`}
                        >
                          {availableTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                              <Checkbox checked={filters.applicationTypes.includes(type)} />
                              <ListItemText primary={type} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Status Filter */}
                    <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                          multiple
                          value={filters.statuses}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              statuses: e.target.value as string[],
                            })
                          }
                          input={<OutlinedInput label="Status" />}
                          renderValue={(selected) => `${selected.length} selected`}
                        >
                          {availableStatuses.map((status) => (
                            <MenuItem key={status} value={status}>
                              <Checkbox checked={filters.statuses.includes(status)} />
                              <ListItemText primary={status} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Reviewer Filter */}
                    <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Inspector/Reviewer</InputLabel>
                        <Select
                          multiple
                          value={filters.reviewers}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              reviewers: e.target.value as string[],
                            })
                          }
                          input={<OutlinedInput label="Inspector/Reviewer" />}
                          renderValue={(selected) => `${selected.length} selected`}
                        >
                          {availableReviewers.map((reviewer) => (
                            <MenuItem key={reviewer} value={reviewer}>
                              <Checkbox checked={filters.reviewers.includes(reviewer)} />
                              <ListItemText primary={reviewer} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* Clear Filters Button */}
                  {hasActiveFilters && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ClearIcon />}
                        onClick={handleClearFilters}
                      >
                        Clear Filters
                      </Button>
                    </Box>
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </LocalizationProvider>
          {/* ================================================================
              1. Throughput & Service Levels (KPI Cards)
              ================================================================ */}
          <Box>
            <Typography variant="h2" gutterBottom>
              Throughput & Service Levels
            </Typography>
            <Grid container spacing={2}>
              <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <MetricCard
                  label="New Applications"
                  value={filteredKPIs.newApplications}
                  icon={<AssessmentIcon />}
                />
              </Grid>
              <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <MetricCard
                  label="Approved Applications"
                  value={filteredKPIs.approvedApplications}
                  icon={<CheckCircleIcon />}
                />
              </Grid>
              <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <MetricCard
                  label="Avg Days to Decision"
                  value={`${filteredKPIs.avgDaysToDecision} days`}
                  icon={<AccessTimeIcon />}
                />
              </Grid>
              <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <MetricCard
                  label="Open Backlog"
                  value={filteredKPIs.openBacklog}
                  icon={<PendingActionsIcon />}
                />
              </Grid>
            </Grid>
          </Box>

          {/* ================================================================
              2. Volume & Backlog Trends
              ================================================================ */}
          <Box>
            <Typography variant="h2" gutterBottom>
              Volume & Backlog Trends
            </Typography>
            <Grid container spacing={3}>
              <Grid sx={{ flex: '1 1 400px', minWidth: isMobile ? '100%' : '400px' }}>
                <TimeSeriesChart
                  title="Applications Submitted Over Time"
                  data={timeSeriesChartData}
                  series={[
                    {
                      dataKey: 'applications',
                      name: 'Daily Submissions',
                      color: capitalDesignTokens.semanticColors.dataVisualization.sequence700,
                    },
                  ]}
                  variant="area"
                  timeWindows={['daily', 'weekly', 'monthly']}
                  defaultTimeWindow="daily"
                  height={300}
                />
              </Grid>
              <Grid sx={{ flex: '1 1 400px', minWidth: isMobile ? '100%' : '400px' }}>
                <BarChart
                  title="Backlog by Application Type"
                  description="Open applications grouped by permit or license type"
                  data={backlogChartData}
                  limit={15}
                  height={300}
                  valueLabel="Open Applications"
                />
              </Grid>
            </Grid>
          </Box>

          {/* ================================================================
              3. Application Detail
              ================================================================ */}
          <Box>
            <Typography variant="h2" gutterBottom>
              Application Detail
            </Typography>
            <PerformanceTable
              title="Applications"
              columns={applicationTableColumns}
              rows={applicationTableRows}
              searchable
              searchPlaceholder="Search applications..."
              paginated
              defaultRowsPerPage={25}
              rowsPerPageOptions={[10, 25, 50, 100]}
              maxHeight={600}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default PermittingDashboard;
