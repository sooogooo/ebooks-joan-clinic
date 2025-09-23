import type { Metadata } from 'next'
import './globals.css'
import ReadingProgress from '@/components/ReadingProgress'
import MouseFollower from '@/components/MouseFollower'

export const metadata: Metadata = {
  title: '天人合一与医美 - 中式美学的当代实践',
  description: '融合中式美学智慧与现代医美技术，探索优雅医美的人文之路。结合天人合一哲学与格式塔心理学，为当代医美实践提供全新视角。',
  keywords: '医美, 中式美学, 天人合一, 格式塔心理学, 美学理论, 医疗美容',
  authors: [{ name: '医美专家' }],
  creator: '重庆联合丽格科技有限公司',
  publisher: '重庆联合丽格科技有限公司',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tianrenheyi-medical-aesthetics.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '天人合一与医美 - 中式美学的当代实践',
    description: '融合中式美学智慧与现代医美技术，探索优雅医美的人文之路',
    url: 'https://tianrenheyi-medical-aesthetics.vercel.app',
    siteName: '天人合一与医美',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '天人合一与医美',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '天人合一与医美 - 中式美学的当代实践',
    description: '融合中式美学智慧与现代医美技术，探索优雅医美的人文之路',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // 添加各种搜索引擎验证
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="https://docs.bccsw.cn/favicon.png" />
        <link rel="apple-touch-icon" href="https://docs.bccsw.cn/favicon.png" />
        
        {/* 预连接到外部资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://docs.bccsw.cn" />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              "name": "天人合一与医美",
              "alternateName": "中式美学遇到格式塔心理学 - 当代优雅医美的思辨与实践",
              "author": {
                "@type": "Person",
                "name": "医美专家"
              },
              "publisher": {
                "@type": "Organization",
                "name": "重庆联合丽格科技有限公司",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "临江支路28号",
                  "addressLocality": "渝中区",
                  "addressRegion": "重庆市",
                  "addressCountry": "CN"
                },
                "email": "bccsw@cqlhlg.work",
                "telephone": "023-68726872"
              },
              "description": "融合中式美学智慧与现代医美技术，探索优雅医美的人文之路。结合天人合一哲学与格式塔心理学，为当代医美实践提供全新视角。",
              "genre": ["医学", "美学", "哲学"],
              "inLanguage": "zh-CN",
              "datePublished": "2024",
              "keywords": "医美, 中式美学, 天人合一, 格式塔心理学, 美学理论, 医疗美容",
              "url": "https://tianrenheyi-medical-aesthetics.vercel.app"
            })
          }}
        />
        
        {/* 网站配置 */}
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="color-scheme" content="light dark" />
        
        {/* 性能提示 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//docs.bccsw.cn" />
      </head>
      <body className="antialiased">
        {/* 阅读进度条 */}
        <ReadingProgress />
        
        {/* 鼠标跟随效果 */}
        <MouseFollower size={16} color="#0ea5e9" blur={true} />
        
        {/* 跳过链接，用于无障碍访问 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50"
        >
          跳转到主内容
        </a>
        
        <div id="main-content">
          {children}
        </div>
        
        {/* 全局脚本 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 主题检测和设置
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              })();
              
              // 基础性能监控
              window.addEventListener('load', function() {
                if ('performance' in window) {
                  const navigation = performance.getEntriesByType('navigation')[0];
                  console.log('页面加载时间:', navigation.loadEventEnd - navigation.fetchStart, 'ms');
                }
              });
              
              // 滚动动画触发器
              const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
              };
              
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                  }
                });
              }, observerOptions);
              
              // 观察所有具有滚动动画类的元素
              document.addEventListener('DOMContentLoaded', () => {
                const elements = document.querySelectorAll('.scroll-reveal');
                elements.forEach(el => observer.observe(el));
              });
            `
          }}
        />
      </body>
    </html>
  )
}