/**
 * Skeleton Loader Component
 * Smooth shimmer skeleton for loading states on low-end mobile devices.
 */

import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = 'h-4 w-full',
  variant = 'rounded',
}) => {
  const roundedClass =
    variant === 'circular'
      ? 'rounded-full'
      : variant === 'rectangular'
      ? 'rounded-none'
      : 'rounded-2xl';

  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-800/80 ${roundedClass} ${className}`}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
