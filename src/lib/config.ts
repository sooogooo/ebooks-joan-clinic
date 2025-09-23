export const siteConfig = {
  name: '天人合一与医美',
  title: '天人合一与医美 - 中式美学的当代实践',
  description: '融合中式美学智慧与现代医美技术，探索优雅医美的人文之路。结合天人合一哲学与格式塔心理学，为当代医美实践提供全新视角。',
  url: process.env.NODE_ENV === 'production' 
    ? 'https://tianrenheyi-medical-aesthetics.vercel.app'
    : 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  author: '医美专家',
  creator: '重庆联合丽格科技有限公司',
  publisher: '重庆联合丽格科技有限公司',
  keywords: [
    '医美',
    '中式美学', 
    '天人合一',
    '格式塔心理学',
    '美学理论',
    '医疗美容',
    '东方美学',
    '人文关怀',
    '现代医美',
    '美学哲学'
  ],
  contact: {
    address: '重庆市渝中区临江支路28号',
    email: 'bccsw@cqlhlg.work',
    phone: '023-68726872',
    consultantQR: 'https://docs.bccsw.cn/consultant.png',
    consultantLink: 'https://work.weixin.qq.com/kfid/kfcfc2a809493f31e8f'
  },
  assets: {
    logo: 'https://docs.bccsw.cn/logo.png',
    favicon: 'https://docs.bccsw.cn/favicon.png'
  },
  analytics: {
    // 可以在这里添加分析工具配置
    googleAnalytics: '',
    baiduAnalytics: ''
  },
  social: {
    // 社交媒体链接
    wechat: '',
    weibo: '',
    douyin: ''
  }
};