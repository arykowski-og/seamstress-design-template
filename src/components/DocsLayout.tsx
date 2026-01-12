import React from 'react';
import { BaseLayout } from './BaseLayout';
import { docsLayoutConfig } from '../config/docsNavConfig';

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return <BaseLayout config={docsLayoutConfig}>{children}</BaseLayout>;
}
