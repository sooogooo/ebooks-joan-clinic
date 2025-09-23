'use client';

import React, { useState, useRef, useEffect, ReactNode, lazy, Suspense } from 'react';
import { useInView } from '@/lib/animations';

interface LazyLoadProps {
  children: ReactNode;
  className?: string;
  placeholder?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function LazyLoad({
  children,
  className = '',
  placeholder,
  threshold = 0.1,
  rootMargin = '100px',
  once = true,
}: LazyLoadProps) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: once,
  });

  return (
    <div ref={ref} className={className}>
      {inView ? children : (placeholder || <div className="h-32 bg-gray-100 animate-pulse rounded" />)}
    </div>
  );
}

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !isLoaded && !hasError) {
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => {
        setHasError(true);
        onError?.();
      };
      img.src = src;
    }
  }, [inView, src, isLoaded, hasError, onLoad, onError]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-50'
        } ${hasError ? 'filter grayscale' : ''}`}
        style={{
          filter: hasError ? 'grayscale(100%)' : 'none',
        }}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-500 text-sm">图片加载失败</span>
        </div>
      )}
    </div>
  );
}

// 懒加载SVG组件的高阶组件
export function withLazyLoading<T extends {}>(
  Component: React.ComponentType<T>,
  loadingComponent?: ReactNode
) {
  return function LazyComponent(props: T) {
    const LoadingFallback = loadingComponent || (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500 text-sm">加载中...</p>
        </div>
      </div>
    );

    return (
      <LazyLoad placeholder={LoadingFallback}>
        <Component {...props} />
      </LazyLoad>
    );
  };
}

// 预加载图片的Hook
export function useImagePreloader(imageSources: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  const preloadImage = (src: string) => {
    if (loadedImages.has(src) || loadingImages.has(src)) {
      return;
    }

    setLoadingImages(prev => new Set(prev).add(src));

    const img = new Image();
    img.onload = () => {
      setLoadedImages(prev => new Set(prev).add(src));
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(src);
        return newSet;
      });
    };
    img.onerror = () => {
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(src);
        return newSet;
      });
    };
    img.src = src;
  };

  const preloadAllImages = () => {
    imageSources.forEach(preloadImage);
  };

  return {
    loadedImages,
    loadingImages,
    preloadImage,
    preloadAllImages,
    isLoaded: (src: string) => loadedImages.has(src),
    isLoading: (src: string) => loadingImages.has(src),
  };
}

// 内容分块懒加载组件
interface LazyContentProps {
  content: string;
  chunkSize?: number;
  className?: string;
  renderDelay?: number;
}

export function LazyContent({
  content,
  chunkSize = 1000,
  className = '',
  renderDelay = 100,
}: LazyContentProps) {
  const [visibleChunks, setVisibleChunks] = useState(1);
  const chunks = [];
  
  // 将内容分块
  for (let i = 0; i < content.length; i += chunkSize) {
    chunks.push(content.slice(i, i + chunkSize));
  }

  const loadMoreChunks = () => {
    setTimeout(() => {
      setVisibleChunks(prev => Math.min(prev + 1, chunks.length));
    }, renderDelay);
  };

  return (
    <div className={className}>
      {chunks.slice(0, visibleChunks).map((chunk, index) => (
        <div key={index}>
          {chunk}
        </div>
      ))}
      
      {visibleChunks < chunks.length && (
        <LazyLoad
          threshold={0.5}
          rootMargin="200px"
          placeholder={
            <div className="text-center py-4">
              <div className="animate-pulse bg-gray-200 h-4 w-32 mx-auto rounded"></div>
            </div>
          }
        >
          <div onLoad={loadMoreChunks} />
        </LazyLoad>
      )}
    </div>
  );
}