import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, IconButton, Fab } from '@mui/material';
import { PageHeaderComposable } from '@opengov/components-page-header';
import { Refresh, AiOgAssist } from '@opengov/react-capital-assets';
import { useDashboardStore } from '../../../stores/dashboardStore';
import { MetricWidget } from '../../../components/dashboard/MetricWidget';
import { ChartWidget } from '../../../components/dashboard/ChartWidget';
import { TableWidget } from '../../../components/dashboard/TableWidget';
import { MapWidget } from '../../../components/dashboard/MapWidget';
import { OGAssistModal } from '../../../components/OGAssist/OGAssistModal';
import { useOGAssist } from '../../../hooks/useOGAssist';
import {
  getWorkOrdersByStatus,
  getWorkOrdersByPriority,
  getCompletionTrends,
  getOverdueWorkOrders,
  getOpenWorkOrderLocations
} from '../../../data/mock/eam-work-orders';
import type { Widget } from '../../../types/dashboard.types';

/**
 * EAM Operations Dashboard
 *
 * AI-powered dashboard for Enterprise Asset Management with dynamic
 * visualization generation through natural conversation.
 *
 * Features:
 * - Default operational widgets (metrics, charts, tables)
 * - AI Assistant for custom visualization generation
 * - Real-time work order data and insights
 * - Interactive widget management
 */
export const EAMDashboard: React.FC = () => {
  const { widgets, resetToDefaults, addWidget } = useDashboardStore();
  const [assistModalOpen, setAssistModalOpen] = useState(false);
  const { conversation, selectedAgent, setSelectedAgent } = useOGAssist();

  // Set the agent to eamDashboard when the component mounts
  useEffect(() => {
    if (selectedAgent !== 'eamDashboard') {
      setSelectedAgent('eamDashboard');
    }
  }, [selectedAgent, setSelectedAgent]);

  // Handler for adding widgets from chat suggestions
  const handleAddWidget = useCallback((widgetData: any) => {
    // widgetData contains the full suggestedWidget object from agent response
    const newWidget = createWidgetFromSpec(widgetData?.spec || widgetData);
    if (newWidget) {
      addWidget(newWidget);
    }
  }, [addWidget, conversation.conversationId]);

  // Helper function to create actual widget from spec
  const createWidgetFromSpec = (spec: any): Omit<Widget, 'id' | 'createdAt'> | null => {
    if (!spec) return null;

    const baseWidget = {
      source: 'agent-generated' as const,
      conversationId: conversation.conversationId,
      gridPosition: { x: 0, y: 0, w: 6, h: 4 }
    };

    switch (spec.type) {
      case 'chart':
        if (spec.chartType === 'pie' && spec.title.includes('Status')) {
          return {
            ...baseWidget,
            type: 'chart',
            chartType: 'pie',
            title: spec.title,
            data: getWorkOrdersByStatus(),
            chartConfig: { showLegend: true }
          };
        } else if (spec.chartType === 'line' && spec.title.includes('Trends')) {
          return {
            ...baseWidget,
            type: 'chart',
            chartType: 'line',
            title: spec.title,
            data: getCompletionTrends(),
            chartConfig: {
              xField: 'month',
              yField: 'completions',
              showGrid: true,
              showLegend: false
            }
          };
        }
        break;

      case 'table':
        if (spec.title.includes('Overdue')) {
          const overdueData = getOverdueWorkOrders();
          return {
            ...baseWidget,
            type: 'table',
            title: spec.title,
            columns: [
              { key: 'id', label: 'WO #', width: '100px' },
              { key: 'description', label: 'Description' },
              { key: 'priority', label: 'Priority', width: '100px' },
              { key: 'assigned_to', label: 'Assigned To', width: '140px' },
              { key: 'due_date', label: 'Due Date', width: '120px' }
            ],
            data: overdueData,
            rowsPerPage: 10,
            gridPosition: { x: 0, y: 0, w: 12, h: 4 }
          };
        }
        break;

      case 'map':
        const locations = getOpenWorkOrderLocations();
        return {
          ...baseWidget,
          type: 'map',
          title: spec.title,
          markers: locations,
          center: [42.3601, -71.0589],
          zoom: 13,
          gridPosition: { x: 0, y: 0, w: 12, h: 5 }
        };

      default:
        return null;
    }

    return null;
  };

  const renderWidget = (widget: Widget) => {
    const isAgentGenerated = widget.source === 'agent-generated';

    switch (widget.type) {
      case 'metric':
        return <MetricWidget widget={widget} isAgentGenerated={isAgentGenerated} />;
      case 'chart':
        return <ChartWidget widget={widget} isAgentGenerated={isAgentGenerated} />;
      case 'table':
        return <TableWidget widget={widget} isAgentGenerated={isAgentGenerated} />;
      case 'map':
        return <MapWidget widget={widget} isAgentGenerated={isAgentGenerated} />;
      default:
        return null;
    }
  };

  // Separate default widgets from AI-generated widgets
  const defaultWidgets = widgets.filter(w => w.source === 'default');
  const aiGeneratedWidgets = widgets.filter(w => w.source === 'agent-generated');

  // Render stat cards (metrics)
  const renderStatCards = () => {
    const metricWidgets = defaultWidgets.filter(w => w.type === 'metric');

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2,
          mb: 3
        }}
      >
        {metricWidgets.map(widget => (
          <Box key={widget.id}>
            {renderWidget(widget)}
          </Box>
        ))}
      </Box>
    );
  };

  // Render default charts and tables
  const renderDefaultCharts = () => {
    const chartAndTableWidgets = defaultWidgets.filter(w => w.type !== 'metric');

    // Group by row
    const rows: Record<number, Widget[]> = {};
    chartAndTableWidgets.forEach(widget => {
      const y = widget.gridPosition.y;
      if (!rows[y]) rows[y] = [];
      rows[y].push(widget);
    });

    return Object.keys(rows).sort((a, b) => Number(a) - Number(b)).map(rowKey => {
      const rowWidgets = rows[Number(rowKey)].sort((a, b) => a.gridPosition.x - b.gridPosition.x);
      const maxHeight = Math.max(...rowWidgets.map(w => w.gridPosition.h));

      return (
        <Box
          key={`row-${rowKey}`}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 2,
            mb: 2,
            minHeight: `${maxHeight * 100}px`
          }}
        >
          {rowWidgets.map(widget => (
            <Box
              key={widget.id}
              sx={{
                gridColumn: `span ${widget.gridPosition.w}`,
                height: '100%'
              }}
            >
              {renderWidget(widget)}
            </Box>
          ))}
        </Box>
      );
    });
  };

  // Render AI-generated cards with consistent sizing
  // 1 card = 100% width, 2+ cards = 2-column grid
  const renderAICards = () => {
    if (aiGeneratedWidgets.length === 0) return null;

    const gridColumns = aiGeneratedWidgets.length === 1 ? '1fr' : 'repeat(2, 1fr)';

    return (
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: gridColumns,
            gap: 2
          }}
        >
          {aiGeneratedWidgets.map(widget => (
            <Box
              key={widget.id}
              sx={{
                height: '400px' // Consistent height for all AI cards
              }}
            >
              {renderWidget(widget)}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Page Header - Required by Seamstress pattern */}
      <PageHeaderComposable>
        <PageHeaderComposable.Header
          actions={[
            <Button
              key="reset"
              variant="outlined"
              startIcon={<Refresh />}
              onClick={resetToDefaults}
              size="small"
            >
              Reset
            </Button>,
            <Button
              key="assistant"
              variant="contained"
              startIcon={<AiOgAssist />}
              onClick={() => setAssistModalOpen(true)}
              sx={{
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              Assistant
            </Button>
          ]}
        >
          <PageHeaderComposable.Title>Operations Dashboard</PageHeaderComposable.Title>
          <PageHeaderComposable.Description>
            Enterprise Asset Management
          </PageHeaderComposable.Description>
        </PageHeaderComposable.Header>
      </PageHeaderComposable>

      {/* Dashboard Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 3,
          bgcolor: 'background.default'
        }}
      >
        {/* Stat Cards */}
        {renderStatCards()}

        {/* AI-Generated Cards */}
        {renderAICards()}

        {/* Default Charts and Tables */}
        {renderDefaultCharts()}
      </Box>

      {/* Floating Assistant Button (mobile) */}
      <Fab
        color="primary"
        aria-label="assistant"
        onClick={() => setAssistModalOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: { xs: 'flex', md: 'none' } // Only show on mobile
        }}
      >
        <AiOgAssist />
      </Fab>

      {/* OG Assist Modal */}
      <OGAssistModal
        open={assistModalOpen}
        onClose={() => setAssistModalOpen(false)}
        onVisualizationAdd={handleAddWidget}
      />
    </Box>
  );
};

export default EAMDashboard;
