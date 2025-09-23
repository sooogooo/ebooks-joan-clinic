'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Eye, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Chapter } from '@/types';
import MermaidChart from '@/components/MermaidChart';
import GestaltDemo from '@/components/svg/GestaltDemo';
import GoldenRatioFace from '@/components/svg/GoldenRatioFace';
import OgeeCurve from '@/components/svg/OgeeCurve';

interface ReadingProgressProps {
  progress: number;
}

function ReadingProgress({ progress }: ReadingProgressProps) {
  return (
    <div className="reading-progress">
      <motion.div 
        className="reading-progress-bar"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

interface ChapterNavigationProps {
  chapters: Chapter[];
  currentChapter: string;
  onChapterSelect: (chapterId: string) => void;
}

function ChapterNavigation({ chapters, currentChapter, onChapterSelect }: ChapterNavigationProps) {
  return (
    <div className="chapter-nav bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-light text-gray-900 mb-4 flex items-center">
        <BookOpen className="h-5 w-5 mr-2 text-primary-600" />
        章节导航
      </h3>
      <nav className="space-y-2">
        {chapters.map((chapter, index) => (
          <motion.button
            key={chapter.id}
            onClick={() => onChapterSelect(chapter.id)}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              currentChapter === chapter.id
                ? 'bg-primary-50 border border-primary-200 text-primary-900'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500">
                    {index + 1}
                  </span>
                  <h4 className="font-medium text-sm line-clamp-2">
                    {chapter.title}
                  </h4>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {chapter.description}
                </p>
                <div className="flex items-center space-x-3 mt-2 text-xs text-gray-400">
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {chapter.readingTime}分钟
                  </span>
                  {chapter.hasVisualizations && (
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      可视化
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </motion.button>
        ))}
      </nav>
    </div>
  );
}

interface ChapterContentProps {
  chapter: Chapter;
}

function ChapterContent({ chapter }: ChapterContentProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* 章节头部 */}
        <header className="text-center pb-8 border-b border-gray-200">
          <motion.h1 
            className="text-4xl font-light text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {chapter.title}
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {chapter.description}
          </motion.p>
          <motion.div 
            className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              预计阅读 {chapter.readingTime} 分钟
            </span>
            {chapter.hasVisualizations && (
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                包含可视化内容
              </span>
            )}
          </motion.div>
        </header>

        {/* 正文内容 */}
        <motion.div
          className="prose-chinese"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          dangerouslySetInnerHTML={{ 
            __html: chapter.content.replace(/\n\n/g, '</p><p>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
          }}
        />

        {/* Mermaid图表区域 */}
        {chapter.mermaidCharts && chapter.mermaidCharts.length > 0 && (
          <motion.section
            className="mt-12 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl font-light text-gray-900 text-center">
              图表解析
            </h2>
            {chapter.mermaidCharts.map((chart) => (
              <div key={chart.id} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                  {chart.title}
                </h3>
                <MermaidChart id={chart.id} code={chart.code} />
                {chart.description && (
                  <p className="text-sm text-gray-600 mt-4 text-center italic">
                    {chart.description}
                  </p>
                )}
              </div>
            ))}
          </motion.section>
        )}

        {/* SVG插图区域 */}
        {chapter.svgIllustrations && chapter.svgIllustrations.length > 0 && (
          <motion.section
            className="mt-12 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-2xl font-light text-gray-900 text-center">
              可视化展示
            </h2>
            {chapter.svgIllustrations.map((illustration) => (
              <div key={illustration.id} className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                  {illustration.title}
                </h3>
                <div className="bg-white rounded-lg overflow-hidden">
                  {renderSVGComponent(illustration.component)}
                </div>
                {illustration.description && (
                  <p className="text-sm text-gray-600 mt-4 text-center italic">
                    {illustration.description}
                  </p>
                )}
              </div>
            ))}
          </motion.section>
        )}
      </motion.div>
    </article>
  );
}

// 渲染SVG组件的辅助函数
function renderSVGComponent(componentName: string): React.ReactNode {
  switch (componentName) {
    case 'GestaltDemo':
      return <GestaltDemo />;
    case 'GoldenRatioFace':
      return <GoldenRatioFace />;
    case 'OgeeCurve':
      return <OgeeCurve />;
    case 'MirrorMetaphor':
      // 可以创建更多组件
      return (
        <div className="p-8 text-center text-gray-500">
          <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Eye className="h-8 w-8 text-primary-600" />
          </div>
          <p className="text-sm">双镜寓言 - 即将推出</p>
        </div>
      );
    default:
      return (
        <div className="p-8 text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-gray-600" />
          </div>
          <p className="text-sm">可视化组件：{componentName}</p>
        </div>
      );
  }
}

interface ChapterTemplateProps {
  chapters: Chapter[];
  initialChapter?: string;
}

export default function ChapterTemplate({ chapters, initialChapter }: ChapterTemplateProps) {
  const [currentChapter, setCurrentChapter] = useState(initialChapter || chapters[0]?.id);
  const [readingProgress, setReadingProgress] = useState(0);

  // 计算阅读进度
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentChapterData = chapters.find(chapter => chapter.id === currentChapter);

  if (!currentChapterData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">章节未找到</h2>
          <Link href="/" className="btn btn-primary">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress progress={readingProgress} />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 侧边栏导航 */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <ChapterNavigation
                  chapters={chapters}
                  currentChapter={currentChapter}
                  onChapterSelect={setCurrentChapter}
                />
              </div>
            </aside>

            {/* 主内容区 */}
            <main className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8 lg:p-12">
                  <ChapterContent chapter={currentChapterData} />
                </div>
              </div>

              {/* 章节导航按钮 */}
              <div className="flex justify-between items-center mt-8">
                <motion.div
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* 上一章 */}
                  <Link 
                    href="#"
                    className="btn btn-secondary flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                    上一章
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* 下一章 */}
                  <Link 
                    href="#"
                    className="btn btn-primary flex items-center"
                  >
                    下一章
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}