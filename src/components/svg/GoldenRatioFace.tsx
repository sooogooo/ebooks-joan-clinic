'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GoldenRatioFaceProps {
  className?: string;
}

export default function GoldenRatioFace({ className = '' }: GoldenRatioFaceProps) {
  const [showGrid, setShowGrid] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(false);

  return (
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          面部黄金比例
        </h3>
        <p className="text-gray-600 text-sm">
          探索面部美学中的数学之美
        </p>
      </div>

      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
        <svg 
          width="300" 
          height="400" 
          viewBox="0 0 300 400" 
          className="mx-auto max-w-full h-auto"
        >
          {/* 面部轮廓 */}
          <defs>
            <radialGradient id="faceGradient" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
            </radialGradient>
          </defs>

          {/* 脸型轮廓 */}
          <ellipse 
            cx="150" 
            cy="200" 
            rx="80" 
            ry="120" 
            fill="url(#faceGradient)" 
            stroke="#d97706" 
            strokeWidth="2"
            opacity="0.8"
          />

          {/* 三庭分割线 */}
          {showGrid && (
            <>
              {/* 上庭：发际线到眉弓 */}
              <line x1="70" y1="100" x2="230" y2="100" stroke="#ef4444" strokeWidth="2" opacity="0.7" />
              <text x="240" y="105" fill="#ef4444" fontSize="12" fontWeight="bold">上庭</text>
              
              {/* 中庭：眉弓到鼻翼下缘 */}
              <line x1="70" y1="160" x2="230" y2="160" stroke="#10b981" strokeWidth="2" opacity="0.7" />
              <text x="240" y="165" fill="#10b981" fontSize="12" fontWeight="bold">中庭</text>
              
              {/* 下庭：鼻翼下缘到下巴 */}
              <line x1="70" y1="260" x2="230" y2="260" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
              <text x="240" y="265" fill="#3b82f6" fontSize="12" fontWeight="bold">下庭</text>
              
              {/* 下巴线 */}
              <line x1="70" y1="320" x2="230" y2="320" stroke="#6b7280" strokeWidth="1" strokeDasharray="5,5" />
            </>
          )}

          {/* 五眼分割 */}
          {showGrid && (
            <>
              {/* 五条垂直线 */}
              <line x1="90" y1="140" x2="90" y2="180" stroke="#8b5cf6" strokeWidth="1" opacity="0.6" />
              <line x1="120" y1="140" x2="120" y2="180" stroke="#8b5cf6" strokeWidth="1" opacity="0.6" />
              <line x1="150" y1="140" x2="150" y2="180" stroke="#8b5cf6" strokeWidth="1" opacity="0.6" />
              <line x1="180" y1="140" x2="180" y2="180" stroke="#8b5cf6" strokeWidth="1" opacity="0.6" />
              <line x1="210" y1="140" x2="210" y2="180" stroke="#8b5cf6" strokeWidth="1" opacity="0.6" />
              
              {/* 五眼标注 */}
              <text x="75" y="135" fill="#8b5cf6" fontSize="10" textAnchor="middle">1</text>
              <text x="105" y="135" fill="#8b5cf6" fontSize="10" textAnchor="middle">2</text>
              <text x="135" y="135" fill="#8b5cf6" fontSize="10" textAnchor="middle">3</text>
              <text x="165" y="135" fill="#8b5cf6" fontSize="10" textAnchor="middle">4</text>
              <text x="195" y="135" fill="#8b5cf6" fontSize="10" textAnchor="middle">5</text>
            </>
          )}

          {/* 面部特征 */}
          {/* 眼睛 */}
          <ellipse cx="120" cy="160" rx="12" ry="6" fill="#1f2937" />
          <ellipse cx="180" cy="160" rx="12" ry="6" fill="#1f2937" />
          <circle cx="120" cy="160" r="3" fill="white" />
          <circle cx="180" cy="160" r="3" fill="white" />

          {/* 眉毛 */}
          <path d="M 108 145 Q 120 140 132 145" fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
          <path d="M 168 145 Q 180 140 192 145" fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round" />

          {/* 鼻子 */}
          <path d="M 150 170 Q 145 200 150 210 Q 155 200 150 170" fill="none" stroke="#9ca3af" strokeWidth="2" />
          <ellipse cx="145" cy="205" rx="3" ry="2" fill="#9ca3af" opacity="0.5" />
          <ellipse cx="155" cy="205" rx="3" ry="2" fill="#9ca3af" opacity="0.5" />

          {/* 嘴唇 */}
          <path d="M 130 240 Q 150 250 170 240" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
          <path d="M 130 245 Q 150 255 170 245" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />

          {/* 黄金比例测量线 */}
          {showMeasurements && (
            <>
              {/* 1:1.618 比例标注 */}
              <g opacity="0.8">
                {/* 垂直测量 */}
                <line x1="50" y1="100" x2="50" y2="160" stroke="#f59e0b" strokeWidth="2" />
                <line x1="50" y1="160" x2="50" y2="260" stroke="#f59e0b" strokeWidth="2" />
                <text x="30" y="130" fill="#f59e0b" fontSize="12" textAnchor="middle">1</text>
                <text x="30" y="210" fill="#f59e0b" fontSize="12" textAnchor="middle">1.618</text>
                
                {/* 水平测量 */}
                <line x1="90" y1="380" x2="120" y2="380" stroke="#f59e0b" strokeWidth="2" />
                <line x1="120" y1="380" x2="180" y2="380" stroke="#f59e0b" strokeWidth="2" />
                <text x="105" y="395" fill="#f59e0b" fontSize="12" textAnchor="middle">1</text>
                <text x="150" y="395" fill="#f59e0b" fontSize="12" textAnchor="middle">1.618</text>
              </g>
            </>
          )}

          {/* 比例螺旋 */}
          {showMeasurements && (
            <g opacity="0.4">
              <path 
                d="M 150 160 Q 170 160 170 180 Q 170 200 150 200 Q 130 200 130 180 Q 130 160 140 160"
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="1" 
                strokeDasharray="3,3"
              />
            </g>
          )}
        </svg>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            showGrid
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {showGrid ? '隐藏网格' : '显示网格'}
        </button>
        
        <button
          onClick={() => setShowMeasurements(!showMeasurements)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            showMeasurements
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {showMeasurements ? '隐藏比例' : '显示比例'}
        </button>
      </div>

      {/* 说明文字 */}
      <div className="mt-6 space-y-3 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>三庭：上庭、中庭、下庭应当比例协调</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span>五眼：面部宽度应为五个眼睛的宽度</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>黄金比例：1:1.618的和谐关系</span>
        </div>
      </div>
    </div>
  );
}