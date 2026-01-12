import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { PageHeaderComposable } from '@opengov/components-page-header';

export const ReportsPage: React.FC = () => {
  return (
    <Box>
      <PageHeaderComposable>
        <PageHeaderComposable.Header>
          <PageHeaderComposable.Title>Reports & Dashboards</PageHeaderComposable.Title>
          <PageHeaderComposable.Description>
            Create, view, and share reports and analytics dashboards
          </PageHeaderComposable.Description>
        </PageHeaderComposable.Header>
      </PageHeaderComposable>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Standard Reports
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Access pre-built report templates
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Custom Dashboards
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Build personalized analytics dashboards
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Scheduled Reports
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Automate report generation and distribution
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ReportsPage;
