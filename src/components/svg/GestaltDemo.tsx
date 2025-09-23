'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GestaltDemoProps {
  className?: string;
}

export default function GestaltDemo({ className = '' }: GestaltDemoProps) {
  const [activeDemo, setActiveDemo] = useState('similarity');

  const demos = {
    similarity: {
      title: '相似性原理',
      description: '相似的元素会被视为一组',
      component: SimilarityDemo
    },
    proximity: {
      title: '接近性原理', 
      description: '距离相近的元素会被组合在一起',
      component: ProximityDemo
    },
    closure: {
      title: '封闭性原理',
      description: '大脑会自动补全不完整的形状',
      component: ClosureDemo
    },
    continuity: {
      title: '连续性原理',
      description: '眼睛会沿着连续的线条移动',
      component: ContinuityDemo
    }
  };

  return (
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      {/* 选项卡 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(demos).map(([key, demo]) => (
          <button
            key={key}
            onClick={() => setActiveDemo(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeDemo === key
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {demo.title}
          </button>
        ))}
      </div>

      {/* 演示区域 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {demos[activeDemo as keyof typeof demos].title}
            </h3>
            <p className="text-gray-600 text-sm">
              {demos[activeDemo as keyof typeof demos].description}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 min-h-64 flex items-center justify-center">
            {React.createElement(demos[activeDemo as keyof typeof demos].component)}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SimilarityDemo() {
  const [showGrouping, setShowGrouping] = useState(false);

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center items-center space-x-4">
        {/* 圆形组 */}
        <div className={`flex space-x-2 p-3 rounded-lg transition-all ${showGrouping ? 'bg-blue-100 border-2 border-blue-300' : ''}`}>
          <div className="w-6 h-6 bg-blue-500 rounded-full" />
          <div className="w-6 h-6 bg-blue-500 rounded-full" />
          <div className="w-6 h-6 bg-blue-500 rounded-full" />
        </div>
        
        {/* 方形组 */}
        <div className={`flex space-x-2 p-3 rounded-lg transition-all ${showGrouping ? 'bg-green-100 border-2 border-green-300' : ''}`}>
          <div className="w-6 h-6 bg-green-500" />
          <div className="w-6 h-6 bg-green-500" />
          <div className="w-6 h-6 bg-green-500" />
        </div>
        
        {/* 三角形组 */}
        <div className={`flex space-x-2 p-3 rounded-lg transition-all ${showGrouping ? 'bg-red-100 border-2 border-red-300' : ''}`}>
          <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-red-500" />
          <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-red-500" />
          <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-red-500" />
        </div>
      </div>
      
      <button
        onClick={() => setShowGrouping(!showGrouping)}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        {showGrouping ? '隐藏分组' : '显示分组'}
      </button>
    </div>
  );
}

function ProximityDemo() {
  const [spacing, setSpacing] = useState(2);

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-6 gap-2" style={{ gap: `${spacing * 0.5}rem` }}>
          {/* 第一组 */}
          <div className="w-4 h-4 bg-purple-500 rounded" />
          <div className="w-4 h-4 bg-purple-500 rounded" />
          <div className="w-4 h-4 bg-purple-500 rounded" />
          
          {/* 间隔 */}
          <div style={{ width: `${spacing}rem` }} />
          
          {/* 第二组 */}
          <div className="w-4 h-4 bg-purple-500 rounded" />
          <div className="w-4 h-4 bg-purple-500 rounded" />
          <div className="w-4 h-4 bg-purple-500 rounded" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm text-gray-600">调整间距</label>
        <input
          type="range"
          min="0.5"
          max="4"
          step="0.5"
          value={spacing}
          onChange={(e) => setSpacing(Number(e.target.value))}
          className="w-48"
        />
        <p className="text-xs text-gray-500">
          {spacing < 2 ? '元素被视为一组' : '元素被视为两组'}
        </p>
      </div>
    </div>
  );
}

function ClosureDemo() {
  const [showComplete, setShowComplete] = useState(false);

  return (
    <div className="text-center space-y-6">
      <div className="relative w-32 h-32 mx-auto">
        <svg width="128" height="128" viewBox="0 0 128 128">
          {/* 不完整的圆 */}
          <circle
            cx="64"
            cy="64"
            r="40"
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            strokeDasharray={showComplete ? "0" : "10 5"}
            strokeDashoffset={showComplete ? "0" : "20"}
            className="transition-all duration-500"
          />
          
          {/* 完整的圆（用于对比） */}
          {showComplete && (
            <circle
              cx="64"
              cy="64"
              r="40"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              className="opacity-50"
            />
          )}
        </svg>
      </div>
      
      <button
        onClick={() => setShowComplete(!showComplete)}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        {showComplete ? '显示不完整圆' : '显示完整圆'}
      </button>
      
      <p className="text-xs text-gray-500 max-w-xs mx-auto">
        大脑会自动将破碎的线条补全为完整的圆形
      </p>
    </div>
  );
}

function ContinuityDemo() {
  const [showPaths, setShowPaths] = useState(false);

  return (
    <div className="text-center space-y-6">
      <div className="relative w-48 h-32 mx-auto">
        <svg width="192" height="128" viewBox="0 0 192 128">
          {/* 交叉的线条 */}
          <path
            d="M 20 20 Q 50 60 80 40 Q 110 20 140 60 Q 170 100 200 80"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            className={showPaths ? 'opacity-100' : 'opacity-50'}
          />
          <path
            d="M 20 100 Q 50 60 80 80 Q 110 100 140 60 Q 170 20 200 40"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            className={showPaths ? 'opacity-100' : 'opacity-50'}
          />
          
          {/* 高亮显示连续路径 */}
          {showPaths && (
            <>
              <path
                d="M 20 20 Q 50 60 80 40 Q 110 20 140 60 Q 170 100 200 80"
                fill="none"
                stroke="#ef4444"
                strokeWidth="5"
                opacity="0.3"
              />
              <path
                d="M 20 100 Q 50 60 80 80 Q 110 100 140 60 Q 170 20 200 40"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="5"
                opacity="0.3"
              />
            </>
          )}
        </svg>
      </div>
      
      <button
        onClick={() => setShowPaths(!showPaths)}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        {showPaths ? '隐藏路径' : '显示连续路径'}
      </button>
      
      <p className="text-xs text-gray-500 max-w-xs mx-auto">
        眼睛会自然地跟随每条线的连续路径，而不会在交叉点跳转
      </p>
    </div>
  );
}