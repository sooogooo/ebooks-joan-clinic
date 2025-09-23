'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReadingProgress } from '@/lib/animations';

interface ReadingProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

export default function ReadingProgress({
  className = '',
  color = '#0ea5e9',
  height = 3,
  position = 'top',
}: ReadingProgressProps) {
  const progress = useReadingProgress();

  return (
    <div
      className={`fixed left-0 right-0 z-50 ${
        position === 'top' ? 'top-0' : 'bottom-0'
      } ${className}`}
      style={{
        height: `${height}px`,
        background: 'rgba(0, 0, 0, 0.1)',
      }}
    >
      <motion.div
        className="h-full origin-left"
        style={{
          background: color,
          scaleX: progress / 100,
        }}
        initial={{ scaleX: 0 }}
        transition={{
          duration: 0.1,
          ease: 'linear',
        }}
      />
    </div>
  );
}

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
}

export function CircularProgress({
  progress,
  size = 60,
  strokeWidth = 4,
  className = '',
  color = '#0ea5e9',
  backgroundColor = '#e5e7eb',
  showPercentage = false,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-600">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
}