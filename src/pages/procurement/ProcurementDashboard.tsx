import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Stack,
  useTheme,
  useMediaQuery,
  Chip,
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
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PageHeaderComposable } from '@opengov/components-page-header';
import BusinessIcon from '@mui/icons-material/Business';
import TimerIcon from '@mui/icons-material/Timer';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';
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
  procurementMockData,
  getSolicitationTypes,
  getBuyers,
  getSolicitationStatuses,
  formatCurrency,
  type Solicitation,
} from '../../data/procurementMockData';

/**
 * Filter state interface
 */
interface DashboardFilters {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  buyers: string[];
  solicitationTypes: string[];
  statuses: string[];
}

/**
 * ProcurementDashboard - Comprehensive dashboard for Procurement Pipeline & Performance
 *
 * Features:
 * - KPI tracking: Solicitations created, cycle time, supplier responses, compliance
 * - Time series visualization of solicitation trends
 * - Supplier engagement by category
 * - Detailed solicitation table with filtering and sorting
 * - Advanced filtering by date range, buyer, type, and status
 */
const ProcurementDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Get available filter options
  const availableTypes = useMemo(() => getSolicitationTypes(), []);
  const availableBuyers = useMemo(() => getBuyers(), []);
  const availableStatuses = useMemo(() => getSolicitationStatuses(), []);

  // Initialize default date range (last 180 days)
  const defaultEndDate = new Date();
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 180);

  // Filter state
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: {
      start: defaultStartDate,
      end: defaultEndDate,
    },
    buyers: [],
    solicitationTypes: [],
    statuses: [],
  });

  const [filtersExpanded, setFiltersExpanded] = useState(false);

  // Extract raw data from mock
  const { solicitations: allSolicitations, timeSeriesData: allTimeSeriesData } = procurementMockData;

  // Apply filters to solicitations
  const filteredSolicitations = useMemo(() => {
    return allSolicitations.filter((sol) => {
      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const solDate = new Date(sol.createdDate);
        if (filters.dateRange.start && solDate < filters.dateRange.start) return false;
        if (filters.dateRange.end && solDate > filters.dateRange.end) return false;
      }

      // Buyer filter
      if (filters.buyers.length > 0 && !filters.buyers.includes(sol.buyerName)) {
        return false;
      }

      // Solicitation type filter
      if (filters.solicitationTypes.length > 0 && !filters.solicitationTypes.includes(sol.solicitationType)) {
        return false;
      }

      // Status filter
      if (filters.statuses.length > 0 && !filters.statuses.includes(sol.solicitationStatus)) {
        return false;
      }

      return true;
    });
  }, [allSolicitations, filters]);

  // Calculate filtered KPIs
  const filteredKPIs = useMemo(() => {
    const solicitationsCount = filteredSolicitations.length;

    const awardedSols = filteredSolicitations.filter(
      sol => sol.awardDate && (sol.solicitationStatus === 'Awarded' || sol.solicitationStatus === 'Closed')
    );

    const avgDays = awardedSols.length > 0
      ? awardedSols.reduce((sum, sol) => {
          const createdDate = new Date(sol.createdDate);
          const awardDateObj = new Date(sol.awardDate!);
          const days = Math.floor((awardDateObj.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
          return sum + days;
        }, 0) / awardedSols.length
      : 0;

    const solsWithResponses = filteredSolicitations.filter(sol => sol.supplierResponseCount > 0);
    const avgResponses = solsWithResponses.length > 0
      ? solsWithResponses.reduce((sum, sol) => sum + sol.supplierResponseCount, 0) / solsWithResponses.length
      : 0;

    const compliantCount = filteredSolicitations.filter(sol => sol.isCompliant).length;
    const complianceRate = filteredSolicitations.length > 0
      ? (compliantCount / filteredSolicitations.length) * 100
      : 0;

    return {
      solicitationsCreated: solicitationsCount,
      avgRequestToAwardTime: avgDays.toFixed(1),
      avgSupplierResponses: avgResponses.toFixed(1),
      complianceRate: complianceRate.toFixed(1),
    };
  }, [filteredSolicitations]);

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

  // Calculate filtered responses by category
  const filteredResponsesByCategory = useMemo(() => {
    const categoryGroups = filteredSolicitations.reduce((acc, sol) => {
      if (sol.supplierResponseCount > 0) {
        if (!acc[sol.categoryName]) {
          acc[sol.categoryName] = { total: 0, count: 0 };
        }
        acc[sol.categoryName].total += sol.supplierResponseCount;
        acc[sol.categoryName].count += 1;
      }
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    return Object.entries(categoryGroups)
      .map(([categoryName, stats]) => ({
        categoryName,
        avgResponses: stats.total / stats.count,
        color: procurementMockData.responsesByCategory.find(c => c.categoryName === categoryName)?.color,
      }))
      .sort((a, b) => b.avgResponses - a.avgResponses);
  }, [filteredSolicitations]);

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      dateRange: {
        start: defaultStartDate,
        end: defaultEndDate,
      },
      buyers: [],
      solicitationTypes: [],
      statuses: [],
    });
  };

  // Check if any filters are active
  const hasActiveFilters = filters.buyers.length > 0 ||
                          filters.solicitationTypes.length > 0 ||
                          filters.statuses.length > 0;

  // Prepare time series data for chart
  const timeSeriesChartData = filteredTimeSeriesData.map((point) => ({
    timestamp: new Date(point.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    solicitations: point.solicitations,
  }));

  // Prepare responses by category data for bar chart
  const categoryChartData = filteredResponsesByCategory.slice(0, 10).map((item) => ({
    name: item.categoryName,
    value: parseFloat(item.avgResponses.toFixed(1)),
    color: item.color,
  }));

  // Prepare solicitation table data
  const solicitationTableColumns = [
    { id: 'solicitationId', label: 'ID', sortable: true, width: '10%' },
    { id: 'solicitationName', label: 'Name', sortable: true, width: '25%' },
    { id: 'solicitationType', label: 'Type', sortable: true, width: '8%' },
    {
      id: 'solicitationStatus',
      label: 'Status',
      sortable: true,
      align: 'left' as const,
      width: '10%',
      render: (value: string) => {
        const statusColors: { [key: string]: string } = {
          'Draft': 'default',
          'Open': 'info',
          'Evaluating': 'warning',
          'Awarded': 'success',
          'Cancelled': 'error',
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
    { id: 'buyerName', label: 'Buyer', sortable: true, width: '12%' },
    {
      id: 'createdDate',
      label: 'Created',
      sortable: true,
      align: 'right' as const,
      width: '10%',
      render: (value: string) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    },
    {
      id: 'awardDate',
      label: 'Awarded',
      sortable: true,
      align: 'right' as const,
      width: '10%',
      render: (value: string | undefined) => value ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-',
    },
    {
      id: 'daysOpen',
      label: 'Days Open',
      sortable: true,
      align: 'right' as const,
      width: '8%',
      render: (value: number) => `${value}d`,
    },
    {
      id: 'supplierResponseCount',
      label: 'Responses',
      sortable: true,
      align: 'right' as const,
      width: '7%',
    },
  ];

  const solicitationTableRows = filteredSolicitations.map((sol) => ({
    id: sol.solicitationId,
    solicitationId: sol.solicitationId,
    solicitationName: sol.solicitationName,
    solicitationType: sol.solicitationType,
    solicitationStatus: sol.solicitationStatus,
    buyerName: sol.buyerName,
    createdDate: sol.createdDate,
    awardDate: sol.awardDate,
    daysOpen: sol.daysOpen,
    supplierResponseCount: sol.supplierResponseCount,
    // Highlight solicitations with no responses or low compliance
    status: sol.supplierResponseCount === 0 || !sol.isCompliant ? 'warning' : 'neutral' as const,
    highlight: sol.supplierResponseCount === 0 || !sol.isCompliant,
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
              Procurement Pipeline & Performance
            </PageHeaderComposable.Title>
            <PageHeaderComposable.Description>
              Track procurement pipeline, cycle times, supplier engagement, and compliance across solicitations and contracts.
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
                      filters.buyers.length +
                      filters.solicitationTypes.length +
                      filters.statuses.length
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

                    {/* Buyer Filter */}
                    <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Buyer</InputLabel>
                        <Select
                          multiple
                          value={filters.buyers}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              buyers: e.target.value as string[],
                            })
                          }
                          input={<OutlinedInput label="Buyer" />}
                          renderValue={(selected) => `${selected.length} selected`}
                        >
                          {availableBuyers.map((buyer) => (
                            <MenuItem key={buyer} value={buyer}>
                              <Checkbox checked={filters.buyers.includes(buyer)} />
                              <ListItemText primary={buyer} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Solicitation Type Filter */}
                    <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Solicitation Type</InputLabel>
                        <Select
                          multiple
                          value={filters.solicitationTypes}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              solicitationTypes: e.target.value as string[],
                            })
                          }
                          input={<OutlinedInput label="Solicitation Type" />}
                          renderValue={(selected) => `${selected.length} selected`}
                        >
                          {availableTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                              <Checkbox checked={filters.solicitationTypes.includes(type)} />
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
              1. Procurement KPIs
              ================================================================ */}
          <Box>
            <Typography variant="h2" gutterBottom>
              Procurement KPIs
            </Typography>
            <Grid container spacing={2}>
              <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <MetricCard
                  label="Solicitations Created"
                  value={filteredKPIs.solicitationsCreated}
                  icon={<BusinessIcon />}
                />
              </Grid>
              <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <MetricCard
                  label="Avg Request-to-Award Time"
                  value={`${filteredKPIs.avgRequestToAwardTime} days`}
                  icon={<TimerIcon />}
                />
              </Grid>
              <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <MetricCard
                  label="Avg Supplier Responses"
                  value={filteredKPIs.avgSupplierResponses}
                  icon={<GroupsIcon />}
                />
              </Grid>
              <Grid sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <MetricCard
                  label="Compliance Rate"
                  value={`${filteredKPIs.complianceRate}%`}
                  icon={<VerifiedIcon />}
                />
              </Grid>
            </Grid>
          </Box>

          {/* ================================================================
              2. Pipeline & Supplier Engagement
              ================================================================ */}
          <Box>
            <Typography variant="h2" gutterBottom>
              Pipeline & Supplier Engagement
            </Typography>
            <Grid container spacing={3}>
              <Grid sx={{ flex: '1 1 400px', minWidth: isMobile ? '100%' : '400px' }}>
                <TimeSeriesChart
                  title="Solicitations Over Time"
                  data={timeSeriesChartData}
                  series={[
                    {
                      dataKey: 'solicitations',
                      name: 'Monthly Solicitations',
                      color: capitalDesignTokens.semanticColors.dataVisualization.sequence700,
                    },
                  ]}
                  variant="area"
                  timeWindows={['monthly']}
                  defaultTimeWindow="monthly"
                  height={300}
                />
              </Grid>
              <Grid sx={{ flex: '1 1 400px', minWidth: isMobile ? '100%' : '400px' }}>
                <BarChart
                  title="Responses by Category"
                  description="Average supplier responses by commodity or category"
                  data={categoryChartData}
                  limit={10}
                  height={300}
                  valueLabel="Avg Responses"
                />
              </Grid>
            </Grid>
          </Box>

          {/* ================================================================
              3. Solicitation Detail
              ================================================================ */}
          <Box>
            <Typography variant="h2" gutterBottom>
              Solicitation Detail
            </Typography>
            <PerformanceTable
              title="Solicitations"
              columns={solicitationTableColumns}
              rows={solicitationTableRows}
              searchable
              searchPlaceholder="Search solicitations..."
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

export default ProcurementDashboard;
