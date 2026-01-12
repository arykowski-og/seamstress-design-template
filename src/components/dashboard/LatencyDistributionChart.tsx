import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Stack,
  Skeleton,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { statusColors } from '../../constants/dataVizColors';

/**
 * Percentile data structure
 */
export interface PercentileData {
  /** P50 (median) value */
  p50: number;
  /** P95 value */
  p95: number;
  /** P99 value */
  p99: number;
  /** Optional P90 value */
  p90?: number;
}

/**
 * Histogram bin structure
 */
export interface HistogramBin {
  /** Range label (e.g., "0-50ms") */
  range: string;
  /** Count of values in this bin */
  count: number;
  /** Start value of the range */
  start: number;
  /** End value of the range */
  end: number;
}

/**
 * Threshold configuration
 */
export interface ThresholdConfig {
  /** Threshold value */
  value: number;
  /** Label for the threshold */
  label: string;
  /** Color for the threshold line */
  color: string;
}

/**
 * Props for the LatencyDistributionChart component
 */
export interface LatencyDistributionChartProps {
  /** Title of the chart */
  title: string;
  /** Histogram data (bins) */
  data: HistogramBin[];
  /** Percentile values to display */
  percentiles: PercentileData;
  /** Optional threshold indicators */
  thresholds?: ThresholdConfig[];
  /** Unit of measurement (e.g., "ms", "s") */
  unit?: string;
  /** Chart height in pixels */
  height?: number;
  /** Loading state */
  loading?: boolean;
  /** Value formatter function */
  valueFormatter?: (value: number) => string;
}

/**
 * LatencyDistributionChart - Histogram/box plot for latency distribution
 *
 * Features:
 * - Histogram visualization of latency distribution
 * - Shows p50, p90, p95, p99 percentiles
 * - Threshold indicators
 * - Color-coded bins based on thresholds
 * - Responsive design
 * - Custom tooltips
 *
 * @example
 * ```tsx
 * <LatencyDistributionChart
 *   title="API Response Time"
 *   data={[
 *     { range: '0-50', count: 120, start: 0, end: 50 },
 *     { range: '50-100', count: 80, start: 50, end: 100 }
 *   ]}
 *   percentiles={{ p50: 45, p95: 180, p99: 250 }}
 *   thresholds={[
 *     { value: 200, label: 'SLA Target', color: '#ef4444' }
 *   ]}
 *   unit="ms"
 * />
 * ```
 */
const LatencyDistributionChart: React.FC<LatencyDistributionChartProps> = ({
  title,
  data,
  percentiles,
  thresholds = [],
  unit = 'ms',
  height = 300,
  loading = false,
  valueFormatter = (value: number) => `${value}${unit}`,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Determine color for each bin based on thresholds
  const getBarColor = (bin: HistogramBin) => {
    const midpoint = (bin.start + bin.end) / 2;

    // Sort thresholds by value
    const sortedThresholds = [...thresholds].sort((a, b) => a.value - b.value);

    // Find which threshold range the bin falls into
    for (let i = 0; i < sortedThresholds.length; i++) {
      if (midpoint <= sortedThresholds[i].value) {
        // Below first threshold or between thresholds
        return i === 0
          ? statusColors.success  // Good - green
          : statusColors.warning; // Warning - yellow
      }
    }

    // Above all thresholds
    return thresholds.length > 0
      ? statusColors.error  // Bad - red
      : theme.palette.primary.main;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as HistogramBin;
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 1.5,
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            {data.range}
            {unit}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Count: <strong>{data.count.toLocaleString()}</strong>
          </Typography>
        </Box>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Skeleton variant="text" width="40%" height={32} />
          <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <Skeleton variant="rectangular" width="25%" height={60} />
            <Skeleton variant="rectangular" width="25%" height={60} />
            <Skeleton variant="rectangular" width="25%" height={60} />
            <Skeleton variant="rectangular" width="25%" height={60} />
          </Stack>
          <Skeleton variant="rectangular" width="100%" height={height} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h3' fontSize={"1rem"} fontWeight="500" gutterBottom>
          {title}
        </Typography>

        {/* Percentile Stats */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 3, mt: 2 }}
          flexWrap="wrap"
        >
          <Paper
            variant="outlined"
            sx={{
              flex: 1,
              minWidth: 100,
              p: 1.5,
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block">
              P50 (Median)
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="primary.main">
              {valueFormatter(percentiles.p50)}
            </Typography>
          </Paper>
          {percentiles.p90 !== undefined && (
            <Paper
              variant="outlined"
              sx={{
                flex: 1,
                minWidth: 100,
                p: 1.5,
              }}
            >
              <Typography variant="caption" color="text.secondary" display="block">
                P90
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="primary.main">
                {valueFormatter(percentiles.p90)}
              </Typography>
            </Paper>
          )}
          <Paper
            variant="outlined"
            sx={{
              flex: 1,
              minWidth: 100,
              p: 1.5,
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block">
              P95
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="warning.main">
              {valueFormatter(percentiles.p95)}
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              flex: 1,
              minWidth: 100,
              p: 1.5,
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block">
              P99
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="error.main">
              {valueFormatter(percentiles.p99)}
            </Typography>
          </Paper>
        </Stack>

        {/* Histogram Chart */}
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis
              dataKey="range"
              tick={{ fontSize: isMobile ? 10 : 12, fill: theme.palette.text.secondary }}
              tickLine={{ stroke: theme.palette.divider }}
              label={{
                value: `Latency (${unit})`,
                position: 'insideBottom',
                offset: -5,
                style: { fontSize: isMobile ? 10 : 12, fill: theme.palette.text.secondary },
              }}
            />
            <YAxis
              tick={{ fontSize: isMobile ? 10 : 12, fill: theme.palette.text.secondary }}
              tickLine={{ stroke: theme.palette.divider }}
              label={{
                value: 'Count',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: isMobile ? 10 : 12, fill: theme.palette.text.secondary },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
              ))}
            </Bar>

            {/* Threshold lines */}
            {thresholds.map((threshold, index) => (
              <ReferenceLine
                key={index}
                y={threshold.value}
                stroke={threshold.color}
                strokeDasharray="5 5"
                strokeWidth={2}
                label={{
                  value: threshold.label,
                  position: 'top',
                  fill: threshold.color,
                  fontSize: isMobile ? 10 : 12,
                }}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>

        {/* Threshold legend */}
        {thresholds.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2 }}>
            {thresholds.map((threshold, index) => (
              <Chip
                key={index}
                label={`${threshold.label}: ${valueFormatter(threshold.value)}`}
                size="small"
                sx={{
                  backgroundColor: `${threshold.color}20`,
                  color: threshold.color,
                  fontWeight: 500,
                }}
              />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default LatencyDistributionChart;
