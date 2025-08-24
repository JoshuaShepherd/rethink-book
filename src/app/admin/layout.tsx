import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin CMS - Rethink',
  description:
    'Content management system for creating and managing incarnational mission learning modules.',
};

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <div className="admin-layout">{children}</div>;
}
