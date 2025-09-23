'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ChapterTemplate from '@/components/ChapterTemplate';
import { bookData } from '@/data/bookData';

export default function ContentsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 收集所有章节
  const allChapters = bookData.parts.flatMap(part => part.chapters);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      
      {/* 返回首页按钮 */}
      <div className="fixed top-20 left-4 z-40">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            href="/"
            className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm hover:bg-white 
                     text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg shadow-sm 
                     border border-gray-200 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">返回首页</span>
          </Link>
        </motion.div>
      </div>

      <main className="pt-16">
        <ChapterTemplate chapters={allChapters} />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}