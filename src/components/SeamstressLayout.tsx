import React from 'react';
import { BaseLayout } from './BaseLayout';
import { seamstressLayoutConfig } from '../config/seamstressNavConfig';

interface SeamstressLayoutProps {
  children: React.ReactNode;
}

export function SeamstressLayout({ children }: SeamstressLayoutProps) {
  return <BaseLayout config={seamstressLayoutConfig}>{children}</BaseLayout>;
}
