import React from 'react';
import { BaseLayout } from './BaseLayout';
import { procurementLayoutConfig } from '../config/procurementNavBarConfig';

interface ProcurementLayoutProps {
  children: React.ReactNode;
}

export function ProcurementLayout({ children }: ProcurementLayoutProps) {
  return <BaseLayout config={procurementLayoutConfig}>{children}</BaseLayout>;
}
