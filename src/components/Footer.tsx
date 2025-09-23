'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-50 border-t border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 品牌信息 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://docs.bccsw.cn/logo.png" 
                alt="Logo" 
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <h3 className="text-lg font-light text-gray-900">天人合一与医美</h3>
                <p className="text-sm text-gray-600">中式美学的当代实践</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              融合中式美学智慧与现代医美技术，探索优雅医美的人文之路。
            </p>
          </div>

          {/* 联系信息 */}
          <div className="space-y-4">
            <h4 className="text-lg font-light text-gray-900">联系信息</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📍 重庆市渝中区临江支路28号</p>
              <p>📧 bccsw@cqlhlg.work</p>
              <p>📞 023-68726872</p>
            </div>
          </div>

          {/* 福利官二维码 */}
          <div className="space-y-4">
            <h4 className="text-lg font-light text-gray-900">福利官联系</h4>
            <div className="flex flex-col items-center space-y-2">
              <a 
                href="https://work.weixin.qq.com/kfid/kfcfc2a809493f31e8f"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://docs.bccsw.cn/consultant.png"
                  alt="福利官联系二维码"
                  className="w-24 h-24 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                  二维码
                </div>
              </a>
              <p className="text-xs text-gray-500 text-center">扫码联系福利官</p>
            </div>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 版权信息 */}
            <div className="text-sm text-gray-600 text-center md:text-left">
              <p>© 2024 重庆联合丽格科技有限公司 All rights reserved.</p>
              <p className="mt-1">
                <a 
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 transition-colors"
                >
                  渝 ICP 备 2024023473 号
                </a>
              </p>
            </div>

            {/* 技术信息 */}
            <div className="text-xs text-gray-500 text-center md:text-right">
              <p>Built with Next.js & Tailwind CSS</p>
              <p className="mt-1">Designed for Modern Reading Experience</p>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}