import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  CircularProgress,
  Skeleton,
  useTheme,
} from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

/**
 * Props for the MetricCard component
 */
export interface MetricCardProps {
  /** Label displayed above the main value */
  label: string;
  /** Main value to display (can be string or number) */
  value: string | number;
  /** Optional change indicator (e.g., "+12%", "-5") */
  change?: string;
  /** Type of change to determine color (positive, negative, or neutral) */
  changeType?: 'positive' | 'negative' | 'neutral';
  /** Optional icon to display next to the label */
  icon?: React.ReactNode;
  /** Optional sparkline data for mini chart */
  sparklineData?: Array<{ value: number }>;
  /** Loading state - shows skeleton when true */
  loading?: boolean;
  /** Optional click handler for drill-down interactions */
  onClick?: () => void;
}

/**
 * MetricCard - Enhanced card component for displaying key metrics
 *
 * Features:
 * - Displays a label and value with optional change indicator
 * - Supports optional icon and sparkline chart
 * - Loading state with skeleton
 * - Clickable for drill-down interactions
 * - Responsive design with MUI theming
 *
 * @example
 * ```tsx
 * <MetricCard
 *   label="Total Revenue"
 *   value="$42,500"
 *   change="+12%"
 *   changeType="positive"
 *   icon={<AttachMoneyIcon />}
 *   sparklineData={[{value: 10}, {value: 20}, {value: 15}]}
 *   onClick={() => console.log('Drill down')}
 * />
 * ```
 */
const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  changeType = 'positive',
  icon,
  sparklineData,
  loading = false,
  onClick,
}) => {
  const theme = useTheme();

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return '#22c55e';
      case 'negative':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  if (loading) {
    return (
      <Card sx={{ height: '100%', p: 2 }}>
        <CardContent>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="80%" height={48} sx={{ my: 1 }} />
          <Skeleton variant="rectangular" width="30%" height={24} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: '100%',
        p: 2,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': onClick
          ? {
              boxShadow: theme.shadows[4],
              transform: 'translateY(-2px)',
            }
          : {},
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {icon && (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              {icon}
            </Box>
          )}
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>

        <Typography variant="h1" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {change && (
            <Chip
              label={change}
              size="small"
              sx={{
                backgroundColor: `${getChangeColor()}20`,
                color: getChangeColor(),
                fontWeight: 500,
              }}
            />
          )}

          {sparklineData && sparklineData.length > 0 && (
            <Box sx={{ flex: 1, minWidth: 80, height: 32 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={getChangeColor()}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
