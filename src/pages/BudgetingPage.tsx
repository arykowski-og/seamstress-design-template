import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { PageHeaderComposable } from '@opengov/components-page-header';

export const BudgetingPage: React.FC = () => {
  return (
    <Box>
      <PageHeaderComposable>
        <PageHeaderComposable.Header>
          <PageHeaderComposable.Title>Budgeting & Performance</PageHeaderComposable.Title>
          <PageHeaderComposable.Description>
            Manage budgets, forecasts, and performance metrics
          </PageHeaderComposable.Description>
        </PageHeaderComposable.Header>
      </PageHeaderComposable>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Budget Planning
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create and manage annual budgets
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Performance Tracking
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monitor KPIs and performance indicators
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Forecasting
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Project future budget scenarios
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BudgetingPage;
