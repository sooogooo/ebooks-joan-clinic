'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface OgeeCurveProps {
  className?: string;
}

export default function OgeeCurve({ className = '' }: OgeeCurveProps) {
  const [showConstruction, setShowConstruction] = useState(false);
  const [animateCurve, setAnimateCurve] = useState(false);

  return (
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Ogee曲线的生命力
        </h3>
        <p className="text-gray-600 text-sm">
          探索自然界中最优美的S形曲线
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 原理展示 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4 text-center">Ogee曲线原理</h4>
          
          <svg width="280" height="200" viewBox="0 0 280 200" className="mx-auto">
            {/* 构造辅助线 */}
            {showConstruction && (
              <g opacity="0.3">
                {/* 上圆弧的圆心和半径 */}
                <circle cx="100" cy="80" r="2" fill="#ef4444" />
                <circle cx="100" cy="80" r="50" fill="none" stroke="#ef4444" strokeDasharray="3,3" />
                <text x="105" y="85" fill="#ef4444" fontSize="12">R1</text>
                
                {/* 下圆弧的圆心和半径 */}
                <circle cx="180" cy="120" r="2" fill="#10b981" />
                <circle cx="180" cy="120" r="50" fill="none" stroke="#10b981" strokeDasharray="3,3" />
                <text x="185" y="125" fill="#10b981" fontSize="12">R2</text>
                
                {/* 切点 */}
                <circle cx="140" cy="100" r="3" fill="#f59e0b" />
                <text x="145" y="105" fill="#f59e0b" fontSize="12">切点</text>
              </g>
            )}

            {/* Ogee曲线 */}
            <motion.path
              d="M 50 50 Q 100 80 140 100 Q 180 120 230 150"
              fill="none"
              stroke="#6366f1"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: animateCurve ? 1 : 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* 方向箭头 */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                      refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
              </marker>
            </defs>
            <path
              d="M 220 145 L 230 150"
              stroke="#6366f1"
              strokeWidth="4"
              markerEnd="url(#arrowhead)"
            />

            {/* 特征标注 */}
            <text x="140" y="180" textAnchor="middle" fill="#6b7280" fontSize="12">
              连续、流畅、富有张力
            </text>
          </svg>
        </div>

        {/* 面部轮廓应用 */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4 text-center">面部轮廓应用</h4>
          
          <svg width="280" height="200" viewBox="0 0 280 200" className="mx-auto">
            {/* 面部轮廓 */}
            <path
              d="M 140 20 
                 Q 180 30 200 60 
                 Q 210 90 200 120
                 Q 180 150 140 160
                 Q 100 150 80 120
                 Q 70 90 80 60
                 Q 100 30 140 20 Z"
              fill="rgba(251, 146, 60, 0.1)"
              stroke="#fb923c"
              strokeWidth="2"
            />

            {/* 关键轮廓线 */}
            <motion.path
              d="M 80 60 Q 100 45 140 50 Q 180 45 200 60"
              fill="none"
              stroke="#dc2626"
              strokeWidth="3"
              strokeDasharray={animateCurve ? "0" : "5,5"}
            />
            <text x="140" y="40" textAnchor="middle" fill="#dc2626" fontSize="11">额头线</text>

            <motion.path
              d="M 200 60 Q 210 90 200 120"
              fill="none"
              stroke="#059669"
              strokeWidth="3"
              strokeDasharray={animateCurve ? "0" : "5,5"}
            />
            <text x="220" y="90" fill="#059669" fontSize="11">面颊线</text>

            <motion.path
              d="M 200 120 Q 180 150 140 160 Q 100 150 80 120"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeDasharray={animateCurve ? "0" : "5,5"}
            />
            <text x="140" y="180" textAnchor="middle" fill="#2563eb" fontSize="11">下颌线</text>

            {/* 注射点示意 */}
            {showConstruction && (
              <g>
                <circle cx="120" cy="80" r="2" fill="#f59e0b" />
                <circle cx="160" cy="80" r="2" fill="#f59e0b" />
                <circle cx="190" cy="100" r="2" fill="#f59e0b" />
                <circle cx="160" cy="140" r="2" fill="#f59e0b" />
                <circle cx="120" cy="140" r="2" fill="#f59e0b" />
                <circle cx="90" cy="100" r="2" fill="#f59e0b" />
                
                <text x="140" y="25" textAnchor="middle" fill="#f59e0b" fontSize="10">
                  关键支撑点
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* 自然界中的Ogee曲线 */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4 text-center">自然界的启示</h4>
        
        <div className="grid grid-cols-3 gap-4">
          {/* 河流 */}
          <div className="text-center">
            <svg width="80" height="60" viewBox="0 0 80 60" className="mx-auto mb-2">
              <path
                d="M 10 30 Q 25 20 40 30 Q 55 40 70 30"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 10 35 Q 25 25 40 35 Q 55 45 70 35"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                opacity="0.5"
              />
            </svg>
            <p className="text-xs text-gray-600">河流蜿蜒</p>
          </div>

          {/* 花瓣 */}
          <div className="text-center">
            <svg width="80" height="60" viewBox="0 0 80 60" className="mx-auto mb-2">
              <path
                d="M 40 10 Q 20 20 30 40 Q 40 50 50 40 Q 60 20 40 10 Z"
                fill="rgba(236, 72, 153, 0.3)"
                stroke="#ec4899"
                strokeWidth="2"
              />
            </svg>
            <p className="text-xs text-gray-600">花瓣舒展</p>
          </div>

          {/* 脊椎 */}
          <div className="text-center">
            <svg width="80" height="60" viewBox="0 0 80 60" className="mx-auto mb-2">
              <path
                d="M 40 10 Q 35 25 40 30 Q 45 35 40 50"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* 椎骨 */}
              <circle cx="40" cy="15" r="2" fill="#f59e0b" />
              <circle cx="38" cy="22" r="2" fill="#f59e0b" />
              <circle cx="40" cy="30" r="2" fill="#f59e0b" />
              <circle cx="42" cy="38" r="2" fill="#f59e0b" />
              <circle cx="40" cy="45" r="2" fill="#f59e0b" />
            </svg>
            <p className="text-xs text-gray-600">脊椎弯曲</p>
          </div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => setShowConstruction(!showConstruction)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            showConstruction
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {showConstruction ? '隐藏构造' : '显示构造'}
        </button>
        
        <button
          onClick={() => setAnimateCurve(!animateCurve)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          动画演示
        </button>
      </div>

      {/* 原理说明 */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h5 className="font-medium text-gray-900 mb-2">Ogee曲线的美学特点：</h5>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• <strong>连续性</strong>：两段圆弧在切点处平滑连接</li>
          <li>• <strong>对比性</strong>：凸凹相间，产生视觉张力</li>
          <li>• <strong>流动性</strong>：符合人眼的自然跟踪轨迹</li>
          <li>• <strong>生命力</strong>：模拟自然生长的有机形态</li>
        </ul>
      </div>
    </div>
  );
}