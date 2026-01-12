import React from 'react';
import { Box } from '@mui/material';
import { PageHeaderComposable } from '@opengov/components-page-header';

interface BaseTemplateProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ title, description, children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Required: Every page must have PageHeaderComposable */}
      <PageHeaderComposable>
        <PageHeaderComposable.Header>
          <PageHeaderComposable.Title>{title}</PageHeaderComposable.Title>
          {description && (
            <PageHeaderComposable.Description>{description}</PageHeaderComposable.Description>
          )}
        </PageHeaderComposable.Header>
      </PageHeaderComposable>

      {/* Content Area */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};

export default BaseTemplate;