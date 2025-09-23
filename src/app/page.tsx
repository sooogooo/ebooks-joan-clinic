'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, BookOpen, Clock, Eye, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { bookData } from '@/data/bookData';

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-warm-50" />
      
      {/* 装饰性几何图形 */}
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute top-20 left-10 w-32 h-32 text-primary-300" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-20 right-10 w-24 h-24 text-accent-300" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute top-1/2 right-1/4 w-16 h-16 text-warm-300" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* 主标题 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight">
            <span className="block">天人合一</span>
            <span className="block text-primary-600">与医美</span>
          </h1>

          {/* 副标题 */}
          <motion.p
            className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            中式美学遇到格式塔心理学<br />
            <span className="text-lg text-gray-500">当代优雅医美的思辨与实践</span>
          </motion.p>

          {/* 核心概念标签 */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {['天人合一', '格式塔心理学', '东方美学', '人文关怀'].map((tag, index) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-700 border border-gray-200 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA按钮 */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link href="/contents" className="btn btn-primary text-lg px-8 py-4">
              开始阅读
              <BookOpen className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/about" className="btn btn-secondary text-lg px-8 py-4">
              了解更多
            </Link>
          </motion.div>
        </motion.div>

        {/* 滚动提示 */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400"
          >
            <span className="text-sm mb-2">继续探索</span>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BookStructureSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-light text-gray-900 mb-6">书籍结构</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            四大部分，十个章节，从理论到实践，从科学到艺术，全面探索医美的人文之路
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bookData.parts.map((part, index) => (
            <motion.div
              key={part.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card h-full hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-600 font-medium text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    {part.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {part.description}
                </p>
                <div className="space-y-2">
                  {part.chapters.slice(0, 2).map((chapter) => (
                    <div key={chapter.id} className="text-xs text-gray-500 flex items-center">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                      {chapter.title.replace(/第.*章：/, '')}
                    </div>
                  ))}
                  {part.chapters.length > 2 && (
                    <div className="text-xs text-gray-400">
                      +{part.chapters.length - 2} 更多章节
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: '丰富内容',
      description: '10个章节，44万字深度内容，从理论到实践的完整体系',
      highlight: '44万字'
    },
    {
      icon: Eye,
      title: '可视化展示',
      description: 'Mermaid图表、SVG插图、交互式演示，让抽象概念生动可见',
      highlight: '交互式'
    },
    {
      icon: Sparkles,
      title: '现代体验',
      description: '响应式设计、流畅动效、深色模式，优雅的阅读体验',
      highlight: '优雅体验'
    },
    {
      icon: Clock,
      title: '进度追踪',
      description: '阅读进度保存、章节导航、智能书签，个性化学习路径',
      highlight: '智能导航'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-light text-gray-900 mb-6">特色功能</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            现代化的阅读体验，让知识的获取变得更加愉悦和高效
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card h-full hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 text-xs rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-light text-white mb-6">
            开启美学探索之旅
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            在这个追求美的时代，让我们一起探索更深层的美学智慧，
            找到属于自己的优雅之路。
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/contents" 
              className="bg-white text-primary-600 hover:bg-primary-50 transition-colors px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl"
            >
              立即开始阅读
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      
      <main>
        <HeroSection />
        <BookStructureSection />
        <FeaturesSection />
        <CTASection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}