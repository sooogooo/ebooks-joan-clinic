'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Book, Search, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export default function Header({ onMenuToggle, isMenuOpen = false }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo区域 */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="https://docs.bccsw.cn/logo.png" 
                alt="Logo" 
                className="h-8 w-auto transition-transform group-hover:scale-105"
                onError={(e) => {
                  // 如果logo加载失败，显示默认图标
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Book className="h-8 w-8 text-primary-600 hidden" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-light text-gray-900">天人合一与医美</h1>
              <p className="text-xs text-gray-500 -mt-1">中式美学的当代实践</p>
            </div>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className="text-gray-700 hover:text-primary-600 transition-colors font-light"
            >
              首页
            </Link>
            <Link 
              href="/contents"
              className="text-gray-700 hover:text-primary-600 transition-colors font-light"
            >
              目录
            </Link>
            <Link 
              href="/about"
              className="text-gray-700 hover:text-primary-600 transition-colors font-light"
            >
              关于
            </Link>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-primary-600 transition-colors font-light">
                <Search className="h-4 w-4" />
                <span className="ml-2">搜索</span>
              </button>
            </div>
          </nav>

          {/* 工具栏 */}
          <div className="flex items-center space-x-4">
            {/* 主题切换 */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="切换主题"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-600" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* 移动端菜单按钮 */}
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="切换菜单"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6 text-gray-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <Link 
                href="/"
                className="block text-gray-700 hover:text-primary-600 transition-colors font-light"
              >
                首页
              </Link>
              <Link 
                href="/contents"
                className="block text-gray-700 hover:text-primary-600 transition-colors font-light"
              >
                目录
              </Link>
              <Link 
                href="/about"
                className="block text-gray-700 hover:text-primary-600 transition-colors font-light"
              >
                关于
              </Link>
              <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                <Search className="h-4 w-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="搜索内容..."
                  className="flex-1 text-sm border-none outline-none bg-transparent text-gray-700 placeholder-gray-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}