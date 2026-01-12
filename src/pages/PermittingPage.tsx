import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { PageHeaderComposable } from '@opengov/components-page-header';

export const PermittingPage: React.FC = () => {
  return (
    <Box>
      <PageHeaderComposable>
        <PageHeaderComposable.Header>
          <PageHeaderComposable.Title>Permitting & Licensing</PageHeaderComposable.Title>
          <PageHeaderComposable.Description>
            Manage permits, licenses, and inspections
          </PageHeaderComposable.Description>
        </PageHeaderComposable.Header>
      </PageHeaderComposable>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Permit Applications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Process and review permit applications
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Inspections
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Schedule and manage field inspections
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  License Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Issue and track business licenses
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PermittingPage;
