import React, { useEffect, useState } from 'react';

export interface ProgressBarProps {
  value?: number;
  progress?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'safety' | 'success' | 'info' | 'danger' | 'warning';
  animated?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  progress,
  max = 100,
  size = 'md',
  showLabel = false,
  color = 'safety',
  animated = true,
  className = '',
}: ProgressBarProps) {
  const numericValue = value ?? progress ?? 0;
  const [width, setWidth] = useState(animated ? 0 : (numericValue / max) * 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setWidth((numericValue / max) * 100), 100);
      return () => clearTimeout(timer);
    }
    setWidth((numericValue / max) * 100);
  }, [numericValue, max, animated]);

  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };
  const colors = {
    safety: 'bg-safety',
    success: 'bg-success',
    info: 'bg-info',
    danger: 'bg-danger',
    warning: 'bg-warning',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1.5">
          <span className="text-sm text-mine-300">Progress</span>
          <span className="text-sm font-semibold text-white">{Math.round(width)}%</span>
        </div>
      )}
      <div className={`w-full ${heights[size]} bg-mine-700 rounded-full overflow-hidden`}>
        <div
          className={`${heights[size]} ${colors[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  color = '#f0c800',
  label,
}: ProgressRingProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 200);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold">{Math.round(animatedValue)}%</span>
        {label && <span className="text-xs text-mine-400">{label}</span>}
      </div>
    </div>
  );
}
