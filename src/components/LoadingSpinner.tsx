'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function LoadingSpinner({ size = 'md', color = 'primary' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-primary-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 ${colorClasses[color as keyof typeof colorClasses]} border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
}

interface PageLoaderProps {
  isLoading: boolean;
  message?: string;
}

export function PageLoader({ isLoading, message = '加载中...' }: PageLoaderProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600 font-medium">
          {message}{dots}
        </p>
      </div>
    </motion.div>
  );
}

export function InlineLoader({ message = '加载中...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center space-x-3 py-8">
      <LoadingSpinner size="sm" />
      <span className="text-gray-600 text-sm">{message}</span>
    </div>
  );
}