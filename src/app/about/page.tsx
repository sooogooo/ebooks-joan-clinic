'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Target, Users, Award } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面头部 */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
              关于我们
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              致力于融合中式美学智慧与现代医美技术，探索优雅医美的人文之路
            </p>
          </motion.div>

          {/* 核心理念 */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="text-center mb-8">
                <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h2 className="text-3xl font-light text-gray-900 mb-4">核心理念</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                <p className="text-center text-xl mb-6 text-primary-600 font-medium">
                  "天人合一与医美"
                </p>
                <p className="mb-4">
                  我们相信，真正的美学不仅仅是技术的精准执行，更是文化智慧与现代科学的完美融合。
                  通过将中国古典的"天人合一"哲学思想与西方的格式塔心理学相结合，
                  我们致力于为当代医美实践提供一个全新的视角和方法论。
                </p>
                <p className="mb-4">
                  在这个追求美的时代，我们希望能够帮助每一位求美者找到属于自己的独特之美，
                  不盲从流行，不追求千篇一律，而是在保持个性的基础上，
                  实现内在与外在、技术与艺术、传统与现代的和谐统一。
                </p>
                <p>
                  我们的使命是传播正确的审美观念，提升医美行业的人文品质，
                  让每一次医美实践都成为一场关于美学、哲学和人文关怀的深度体验。
                </p>
              </div>
            </div>
          </motion.section>

          {/* 价值观 */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-light text-gray-900 text-center mb-12">我们的价值观</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">专业精进</h3>
                <p className="text-gray-600 leading-relaxed">
                  坚持学术研究与临床实践相结合，不断提升专业技能和理论素养，
                  为行业发展贡献智慧和力量。
                </p>
              </div>

              <div className="text-center">
                <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-accent-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">人文关怀</h3>
                <p className="text-gray-600 leading-relaxed">
                  以人为本，关注每一位求美者的心理需求和精神体验，
                  让医美成为一种有温度的人文实践。
                </p>
              </div>

              <div className="text-center">
                <div className="bg-warm-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-warm-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">文化传承</h3>
                <p className="text-gray-600 leading-relaxed">
                  传承和发扬中华美学传统，在全球化背景下坚持文化自信，
                  探索具有东方特色的医美之路。
                </p>
              </div>
            </div>
          </motion.section>

          {/* 团队介绍 */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h2 className="text-3xl font-light text-gray-900 mb-4">专业团队</h2>
              </div>
              
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-gray-600 leading-relaxed mb-6">
                  我们的团队由资深医美专家、美学理论研究者、以及具有深厚文化底蕴的学者组成。
                  每一位成员都具备扎实的专业基础和丰富的实践经验，
                  致力于将理论与实践完美结合。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  通过多年的潜心研究和临床实践，我们形成了独特的医美美学体系，
                  并通过这本书与更多的同行和求美者分享我们的思考与心得。
                </p>
              </div>
            </div>
          </motion.section>

          {/* 联系信息 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-3xl font-light text-gray-900 text-center mb-8">联系我们</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">机构信息</h3>
                  <div className="space-y-3 text-gray-600">
                    <p><strong>机构名称：</strong>重庆联合丽格科技有限公司</p>
                    <p><strong>地址：</strong>重庆市渝中区临江支路28号</p>
                    <p><strong>电话：</strong>023-68726872</p>
                    <p><strong>邮箱：</strong>bccsw@cqlhlg.work</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">福利官联系</h3>
                  <div className="flex flex-col items-center">
                    <a 
                      href="https://work.weixin.qq.com/kfid/kfcfc2a809493f31e8f"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <img 
                        src="https://docs.bccsw.cn/consultant.png"
                        alt="福利官联系二维码"
                        className="w-32 h-32 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                        福利官二维码
                      </div>
                    </a>
                    <p className="text-sm text-gray-500 mt-2 text-center">扫码联系福利官</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}