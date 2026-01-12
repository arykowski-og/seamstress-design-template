import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { PageHeaderComposable } from '@opengov/components-page-header';

export const CommandCenterPage: React.FC = () => {
  return (
    <Box>
      <PageHeaderComposable>
        <PageHeaderComposable.Header>
          <PageHeaderComposable.Title>Command Center</PageHeaderComposable.Title>
          <PageHeaderComposable.Description>
            Your central hub for monitoring and managing operations
          </PageHeaderComposable.Description>
        </PageHeaderComposable.Header>
      </PageHeaderComposable>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Dashboard Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Real-time metrics and KPIs for your organization
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Active Alerts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monitor and respond to system alerts
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Access frequently used operations
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CommandCenterPage;
