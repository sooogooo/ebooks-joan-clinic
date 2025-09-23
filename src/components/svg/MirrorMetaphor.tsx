'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MirrorMetaphorProps {
  className?: string;
}

export default function MirrorMetaphor({ className = '' }: MirrorMetaphorProps) {
  const [activeMirror, setActiveMirror] = useState<'reality' | 'desire' | 'both'>('both');
  const [showReflections, setShowReflections] = useState(true);
  const [animationCycle, setAnimationCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationCycle(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          双镜寓言
        </h3>
        <p className="text-gray-600 text-sm">
          现实之镜与渴望之镜的对话
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <svg width="100%" height="400" viewBox="0 0 800 400" className="overflow-visible">
          {/* 背景环境 */}
          <defs>
            <linearGradient id="roomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#e0e7ff" />
            </linearGradient>
            
            <filter id="mirror-effect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
              <feOffset dx="2" dy="2" result="offset"/>
              <feFlood floodColor="#000000" floodOpacity="0.1"/>
              <feComposite in2="offset" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <pattern id="mirror-texture" patternUnits="userSpaceOnUse" width="4" height="4">
              <rect width="4" height="4" fill="#f8fafc"/>
              <circle cx="2" cy="2" r="0.5" fill="#e2e8f0" opacity="0.5"/>
            </pattern>
          </defs>

          {/* 诊室背景 */}
          <rect width="800" height="400" fill="url(#roomGradient)" opacity="0.3"/>
          
          {/* 工作台 */}
          <rect x="250" y="320" width="300" height="60" rx="8" fill="#8b5cf6" opacity="0.2"/>
          
          {/* 现实之镜 */}
          <g className={`transition-opacity duration-500 ${activeMirror === 'desire' ? 'opacity-30' : 'opacity-100'}`}>
            <motion.g
              initial={{ x: -20 }}
              animate={{ x: animationCycle === 0 ? 0 : -10 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {/* 镜框 */}
              <rect x="150" y="100" width="120" height="160" rx="12" fill="#374151" filter="url(#mirror-effect)"/>
              <rect x="155" y="105" width="110" height="150" rx="8" fill="url(#mirror-texture)"/>
              
              {/* 镜面标签 */}
              <text x="205" y="90" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="bold">
                现实之镜
              </text>
              
              {/* 反射内容 - 真实面孔 */}
              {showReflections && (
                <g opacity="0.8">
                  {/* 面部轮廓 */}
                  <ellipse cx="205" cy="180" rx="35" ry="45" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
                  
                  {/* 细纹和瑕疵 */}
                  <line x1="185" y1="160" x2="195" y2="165" stroke="#9ca3af" strokeWidth="1" opacity="0.7"/>
                  <line x1="215" y1="165" x2="225" y2="160" stroke="#9ca3af" strokeWidth="1" opacity="0.7"/>
                  <circle cx="220" cy="190" r="1.5" fill="#dc2626" opacity="0.5"/>
                  <circle cx="190" cy="195" r="1" fill="#92400e" opacity="0.6"/>
                  
                  {/* 眼睛（略显疲惫） */}
                  <ellipse cx="195" cy="170" rx="6" ry="4" fill="#1f2937"/>
                  <ellipse cx="215" cy="170" rx="6" ry="4" fill="#1f2937"/>
                  <circle cx="195" cy="170" r="1.5" fill="white"/>
                  <circle cx="215" cy="170" r="1.5" fill="white"/>
                  
                  {/* 嘴部（中性表情） */}
                  <path d="M 195 195 Q 205 198 215 195" fill="none" stroke="#be123c" strokeWidth="2"/>
                  
                  {/* 分析线条 */}
                  <line x1="170" y1="170" x2="175" y2="170" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2"/>
                  <line x1="235" y1="170" x2="240" y2="170" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2"/>
                  <text x="245" y="174" fill="#ef4444" fontSize="8">精确测量</text>
                </g>
              )}
            </motion.g>
          </g>

          {/* 渴望之镜 */}
          <g className={`transition-opacity duration-500 ${activeMirror === 'reality' ? 'opacity-30' : 'opacity-100'}`}>
            <motion.g
              initial={{ x: 20 }}
              animate={{ x: animationCycle === 1 ? 0 : 10 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {/* 镜框 */}
              <rect x="530" y="100" width="120" height="160" rx="12" fill="#7c3aed" filter="url(#mirror-effect)"/>
              <rect x="535" y="105" width="110" height="150" rx="8" fill="url(#mirror-texture)"/>
              
              {/* 镜面标签 */}
              <text x="590" y="90" textAnchor="middle" fill="#7c3aed" fontSize="14" fontWeight="bold">
                渴望之镜
              </text>
              
              {/* 反射内容 - 理想面孔 */}
              {showReflections && (
                <g opacity="0.8">
                  {/* 面部轮廓（更完美） */}
                  <ellipse cx="590" cy="180" rx="35" ry="45" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1"/>
                  
                  {/* 光泽效果 */}
                  <ellipse cx="590" cy="175" rx="25" ry="30" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.3"/>
                  
                  {/* 眼睛（明亮有神） */}
                  <ellipse cx="580" cy="170" rx="7" ry="5" fill="#1f2937"/>
                  <ellipse cx="600" cy="170" rx="7" ry="5" fill="#1f2937"/>
                  <circle cx="580" cy="170" r="2" fill="white"/>
                  <circle cx="600" cy="170" r="2" fill="white"/>
                  <circle cx="581" cy="169" r="0.5" fill="#3b82f6"/> {/* 眼神光 */}
                  <circle cx="601" cy="169" r="0.5" fill="#3b82f6"/>
                  
                  {/* 嘴部（微笑） */}
                  <path d="M 580 195 Q 590 200 600 195" fill="none" stroke="#be123c" strokeWidth="2"/>
                  
                  {/* 理想标记 */}
                  <circle cx="575" cy="155" r="2" fill="#10b981" opacity="0.7"/>
                  <circle cx="605" cy="155" r="2" fill="#10b981" opacity="0.7"/>
                  <text x="610" y="158" fill="#10b981" fontSize="8">理想比例</text>
                  
                  {/* 柔和光环 */}
                  <circle cx="590" cy="180" r="50" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.2" strokeDasharray="3,3"/>
                </g>
              )}
            </motion.g>
          </g>

          {/* 中央人物 */}
          <motion.g
            animate={{ 
              x: animationCycle === 2 ? 5 : 0,
              y: animationCycle === 2 ? -5 : 0 
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* 人物轮廓 */}
            <ellipse cx="400" cy="200" rx="25" ry="35" fill="#fbbf24" opacity="0.7"/>
            
            {/* 头发 */}
            <path d="M 375 170 Q 400 160 425 170 Q 420 175 400 175 Q 380 175 375 170" fill="#8b5cf6" opacity="0.8"/>
            
            {/* 面部特征 */}
            <circle cx="390" cy="190" r="2" fill="#1f2937"/>
            <circle cx="410" cy="190" r="2" fill="#1f2937"/>
            <path d="M 390 205 Q 400 210 410 205" fill="none" stroke="#be123c" strokeWidth="1.5"/>
            
            {/* 身体 */}
            <rect x="385" y="230" width="30" height="50" rx="8" fill="#6b7280" opacity="0.6"/>
            
            {/* 思考气泡 */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <ellipse cx="400" cy="120" rx="60" ry="25" fill="white" stroke="#d1d5db" strokeWidth="1"/>
              <circle cx="390" cy="140" r="3" fill="white" stroke="#d1d5db" strokeWidth="1"/>
              <circle cx="395" cy="145" r="2" fill="white" stroke="#d1d5db" strokeWidth="1"/>
              <text x="400" y="115" textAnchor="middle" fill="#4b5563" fontSize="10">
                我想要变美，
              </text>
              <text x="400" y="127" textAnchor="middle" fill="#4b5563" fontSize="10">
                但不想失去自己
              </text>
            </motion.g>
          </motion.g>

          {/* 光线连接 */}
          {showReflections && (
            <g opacity="0.4">
              {/* 从人到现实之镜 */}
              <motion.line 
                x1="375" y1="190" x2="270" y2="180" 
                stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              
              {/* 从人到渴望之镜 */}
              <motion.line 
                x1="425" y1="190" x2="530" y2="180" 
                stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
            </g>
          )}

          {/* 标注文字 */}
          <text x="205" y="280" textAnchor="middle" fill="#4b5563" fontSize="12">
            看到瑕疵、细纹
          </text>
          <text x="205" y="295" textAnchor="middle" fill="#4b5563" fontSize="12">
            精确的医学诊断
          </text>
          
          <text x="590" y="280" textAnchor="middle" fill="#4b5563" fontSize="12">
            期待的美好状态
          </text>
          <text x="590" y="295" textAnchor="middle" fill="#4b5563" fontSize="12">
            内心的理想投射
          </text>
        </svg>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => setActiveMirror(activeMirror === 'reality' ? 'both' : 'reality')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeMirror === 'reality'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          现实之镜
        </button>
        
        <button
          onClick={() => setActiveMirror(activeMirror === 'desire' ? 'both' : 'desire')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeMirror === 'desire'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          渴望之镜
        </button>
        
        <button
          onClick={() => setShowReflections(!showReflections)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            showReflections
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {showReflections ? '隐藏倒影' : '显示倒影'}
        </button>
      </div>

      {/* 深度解读 */}
      <div className="mt-8 bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">双镜寓言的深层含义</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="font-medium text-red-600">现实之镜</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 医学的精准诊断</li>
              <li>• 客观的皮肤状态</li>
              <li>• 可量化的美学数据</li>
              <li>• 技术的理性评估</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h5 className="font-medium text-purple-600">渴望之镜</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 内心的美好期待</li>
              <li>• 自我认知的投射</li>
              <li>• 情感的主观需求</li>
              <li>• 生活状态的映射</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>医美的艺术</strong>：在两面镜子之间找到平衡点，既要尊重医学的客观性，
            又要理解求美者的主观期待，最终实现"技术与情感的和谐统一"。
          </p>
        </div>
      </div>
    </div>
  );
}