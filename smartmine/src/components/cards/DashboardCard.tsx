import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  color?: 'safety' | 'success' | 'info' | 'danger';
}

const colorMap = {
  safety: { bg: 'bg-safety/10', border: 'border-safety/20', text: 'text-safety' },
  success: { bg: 'bg-success/10', border: 'border-success/20', text: 'text-success' },
  info: { bg: 'bg-info/10', border: 'border-info/20', text: 'text-info' },
  danger: { bg: 'bg-danger/10', border: 'border-danger/20', text: 'text-danger' },
};

export default function DashboardCard({ title, value, icon: Icon, subtitle, color = 'safety' }: DashboardCardProps) {
  const c = colorMap[color];

  return (
    <div className="card-base p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-mine-400">{title}</div>
      {subtitle && <div className="text-xs text-mine-500 mt-1">{subtitle}</div>}
    </div>
  );
}
