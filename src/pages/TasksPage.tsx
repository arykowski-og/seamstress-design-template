import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { PageHeaderComposable } from '@opengov/components-page-header';

export const TasksPage: React.FC = () => {
  return (
    <Box>
      <PageHeaderComposable>
        <PageHeaderComposable.Header>
          <PageHeaderComposable.Title>Tasks & Notifications</PageHeaderComposable.Title>
          <PageHeaderComposable.Description>
            Manage your tasks, assignments, and notifications
          </PageHeaderComposable.Description>
        </PageHeaderComposable.Header>
      </PageHeaderComposable>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  My Tasks
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View and manage your assigned tasks
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Team Tasks
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monitor tasks across your team
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notifications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stay updated on important events
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TasksPage;
