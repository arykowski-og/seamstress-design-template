import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../theme';
import { MentionProvider } from '../context/MentionProvider';
import { OGAssistProvider } from '../contexts/OGAssistContext';

interface AllTheProvidersProps {
  children: React.ReactNode;
}

function AllTheProviders({ children }: AllTheProvidersProps) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <OGAssistProvider>
          <MentionProvider>
            {children}
          </MentionProvider>
        </OGAssistProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
export { default as userEvent } from '@testing-library/user-event';