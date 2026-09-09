import React from 'react';
import { Clock, AlertTriangle, PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  icon?: 'coming-soon' | 'empty' | 'warning';
  title: string;
  message: string;
  children?: React.ReactNode;
}

export default function EmptyState({ icon = 'empty', title, message, children }: EmptyStateProps) {
  const icons = {
    'coming-soon': <Clock className="w-12 h-12 text-safety" />,
    empty: <PackageOpen className="w-12 h-12 text-mine-400" />,
    warning: <AlertTriangle className="w-12 h-12 text-warning" />,
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-mine-800 border border-mine-600 flex items-center justify-center mb-6">
        {icons[icon]}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-mine-400 max-w-md mb-6">{message}</p>
      {children}
    </div>
  );
}
