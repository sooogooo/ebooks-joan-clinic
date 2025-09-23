'use client';

import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useScrollAnimation, useInView } from '@/lib/animations';

interface AnimatedElementProps extends MotionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'bounceIn';
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function AnimatedElement({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  once = true,
  ...motionProps
}: AnimatedElementProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: once,
  });

  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 0 },
    },
    slideInRight: {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    bounceIn: {
      hidden: { opacity: 0, scale: 0.3 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[animation]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredListProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight';
}

export function StaggeredList({
  children,
  className = '',
  staggerDelay = 0.1,
  animation = 'slideUp',
}: StaggeredListProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    slideInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants[animation]}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function ParallaxElement({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxElementProps) {
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: inView ? 0 : direction === 'up' ? -50 * speed : 50 * speed,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
}

export function TypewriterText({
  text,
  className = '',
  speed = 50,
  delay = 0,
  showCursor = true,
}: TypewriterTextProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={`${className} ${showCursor ? 'typewriter' : ''}`}
      initial={{ width: 0 }}
      animate={inView ? { width: "auto" } : { width: 0 }}
      transition={{
        duration: (text.length * speed) / 1000,
        delay: delay / 1000,
        ease: "linear",
      }}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </motion.div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className = '',
  amplitude = 10,
  duration = 3,
  delay = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

interface GlowElementProps {
  children: ReactNode;
  className?: string;
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlowElement({
  children,
  className = '',
  color = '#0ea5e9',
  intensity = 'medium',
}: GlowElementProps) {
  const glowIntensity = {
    low: '5px',
    medium: '10px',
    high: '20px',
  };

  return (
    <motion.div
      className={className}
      whileHover={{
        boxShadow: [
          `0 0 ${glowIntensity[intensity]} ${color}`,
          `0 0 ${parseInt(glowIntensity[intensity]) * 2}px ${color}`,
          `0 0 ${glowIntensity[intensity]} ${color}`,
        ],
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

interface PulseElementProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

export function PulseElement({
  children,
  className = '',
  scale = 1.05,
  duration = 2,
}: PulseElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export { useScrollAnimation, useInView } from '@/lib/animations';