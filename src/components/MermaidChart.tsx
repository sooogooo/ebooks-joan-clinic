'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidChartProps {
  id: string;
  code: string;
  className?: string;
}

export default function MermaidChart({ id, code, className = '' }: MermaidChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化 Mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      themeVariables: {
        primaryColor: '#0ea5e9',
        primaryTextColor: '#1f2937',
        primaryBorderColor: '#e5e7eb',
        lineColor: '#6b7280',
        secondaryColor: '#f3f4f6',
        tertiaryColor: '#ffffff',
        background: '#ffffff',
        mainBkg: '#ffffff',
        secondBkg: '#f8fafc',
        tertiaryBkg: '#f1f5f9'
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'cardinal',
        padding: 20
      },
      mindmap: {
        useMaxWidth: true,
        padding: 20
      },
      gitGraph: {
        useMaxWidth: true
      },
      timeline: {
        useMaxWidth: true,
        padding: 20
      }
    });

    // 渲染图表
    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, code);
        if (chartRef.current) {
          chartRef.current.innerHTML = svg;
          
          // 添加交互性
          const svgElement = chartRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
            
            // 添加缩放功能
            svgElement.addEventListener('wheel', (e) => {
              e.preventDefault();
              const currentScale = svgElement.style.transform.match(/scale\(([\d.]+)\)/);
              const scale = currentScale ? parseFloat(currentScale[1]) : 1;
              const newScale = e.deltaY > 0 ? Math.max(0.5, scale - 0.1) : Math.min(2, scale + 0.1);
              svgElement.style.transform = `scale(${newScale})`;
              svgElement.style.transformOrigin = 'center';
            });
          }
        }
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        if (chartRef.current) {
          chartRef.current.innerHTML = `
            <div class="flex items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
              <div class="text-center">
                <div class="text-red-600 mb-2">图表渲染失败</div>
                <div class="text-sm text-red-500">请检查图表语法</div>
              </div>
            </div>
          `;
        }
      }
    };

    renderChart();

    return () => {
      // 清理
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }
    };
  }, [id, code]);

  return (
    <div className={`mermaid-container ${className}`}>
      <div 
        ref={chartRef}
        className="mermaid-chart bg-white rounded-lg p-4 border border-gray-200 overflow-auto"
        style={{ minHeight: '200px' }}
      />
      <div className="text-xs text-gray-500 mt-2 text-center">
        💡 提示：滚动鼠标滚轮可以缩放图表
      </div>
    </div>
  );
}