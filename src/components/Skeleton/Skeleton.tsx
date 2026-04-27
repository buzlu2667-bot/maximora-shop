"use client";

import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Skeleton({ width, height, borderRadius, className = '', style }: SkeletonProps) {
  const customStyle: React.CSSProperties = {
    width: width || '100%',
    height: height || '20px',
    borderRadius: borderRadius || '4px',
    ...style,
  };

  return <div className={`${styles.skeleton} ${className}`} style={customStyle} />;
}

export function ProductCardSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Skeleton height="280px" borderRadius="16px" />
      <Skeleton width="60%" height="16px" />
      <Skeleton width="40%" height="20px" />
    </div>
  );
}
