import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  hover = true,
  glow = false,
  padding = 'md',
  onClick,
}: CardProps) {
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };

  return (
    <div
      className={`card-base ${paddings[padding]} ${glow ? 'card-glow' : ''} ${
        hover ? '' : 'hover:transform-none hover:shadow-[var(--shadow-card)]'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
