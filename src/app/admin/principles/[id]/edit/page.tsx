'use client';

import { use } from 'react';
// We would reuse the PrincipleBuilderPage component here
// For now, let's create a simple placeholder that redirects to the builder

export default function EditPrinciplePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // In a real app, this would fetch the principle data and pass it to the builder
  // For now, we'll just show a placeholder

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          Edit Principle: {id}
        </h1>
        <p className="text-text-secondary">
          Edit functionality would be implemented here using the same builder
          component.
        </p>
      </div>
    </div>
  );
}
