'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MouseFollowerProps {
  className?: string;
  size?: number;
  color?: string;
  blur?: boolean;
  trail?: boolean;
}

export default function MouseFollower({
  className = '',
  size = 20,
  color = '#0ea5e9',
  blur = false,
  trail = false,
}: MouseFollowerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trailPositions, setTrailPositions] = useState<Array<{x: number, y: number}>>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      if (trail) {
        setTrailPositions(prev => {
          const newTrail = [newPosition, ...prev.slice(0, 9)]; // 保留最近10个位置
          return newTrail;
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('interactive')
      );
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [trail]);

  return (
    <>
      {/* 主跟随元素 */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-50 ${className}`}
        animate={{
          x: mousePosition.x - size / 2,
          y: mousePosition.y - size / 2,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          opacity: 0.6,
          filter: blur ? 'blur(2px)' : 'none',
          mixBlendMode: 'difference',
        }}
      />

      {/* 轨迹效果 */}
      {trail && trailPositions.map((position, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 pointer-events-none z-40"
          initial={{ 
            x: position.x - size / 4, 
            y: position.y - size / 4,
            opacity: 0.8 - index * 0.08,
            scale: 1 - index * 0.1,
          }}
          animate={{
            x: position.x - size / 4,
            y: position.y - size / 4,
            opacity: 0.8 - index * 0.08,
            scale: 1 - index * 0.1,
          }}
          transition={{
            duration: 0.1,
          }}
          style={{
            width: size / 2,
            height: size / 2,
            borderRadius: '50%',
            background: color,
          }}
        />
      ))}
    </>
  );
}

interface MouseSpotlightProps {
  className?: string;
  radius?: number;
  intensity?: number;
}

export function MouseSpotlight({
  className = '',
  radius = 200,
  intensity = 0.8,
}: MouseSpotlightProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-10 ${className}`}
      style={{
        background: `radial-gradient(circle ${radius}px at ${mousePosition.x}px ${mousePosition.y}px, 
          transparent 0%, 
          rgba(0, 0, 0, ${intensity * 0.3}) 50%, 
          rgba(0, 0, 0, ${intensity}) 100%)`,
        transition: 'background 0.1s ease-out',
      }}
    />
  );
}

interface ParticleFollowerProps {
  className?: string;
  particleCount?: number;
  particleSize?: number;
  color?: string;
}

export function ParticleFollower({
  className = '',
  particleCount = 20,
  particleSize = 3,
  color = '#0ea5e9',
}: ParticleFollowerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
  }>>([]);

  useEffect(() => {
    let animationId: number;
    let particleId = 0;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      setParticles(prev => {
        // 更新现有粒子
        const updated = prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 0.02,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98,
          }))
          .filter(particle => particle.life > 0);

        // 添加新粒子
        if (updated.length < particleCount) {
          const newParticle = {
            id: particleId++,
            x: mousePosition.x,
            y: mousePosition.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
          };
          updated.push(newParticle);
        }

        return updated;
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', updateMousePosition);
    animate();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      cancelAnimationFrame(animationId);
    };
  }, [mousePosition, particleCount]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-40 ${className}`}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x - particleSize / 2,
            top: particle.y - particleSize / 2,
            width: particleSize,
            height: particleSize,
            borderRadius: '50%',
            background: color,
            opacity: particle.life,
          }}
        />
      ))}
    </div>
  );
}