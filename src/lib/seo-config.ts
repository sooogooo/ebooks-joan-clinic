// SEO配置文件
export const siteConfig = {
  name: "天人合一与医美",
  title: "天人合一与医美 - 中式美学的当代实践",
  description: "融合中式美学智慧与现代医美技术，探索优雅医美的人文之路。结合天人合一哲学与格式塔心理学，为当代医美实践提供全新视角。",
  keywords: [
    "医美",
    "中式美学", 
    "天人合一",
    "格式塔心理学",
    "美学理论",
    "医疗美容",
    "东方美学",
    "现代医美",
    "美容医学",
    "面部美学",
    "医美哲学",
    "审美心理学"
  ],
  authors: ["医美专家"],
  creator: "重庆联合丽格科技有限公司",
  publisher: "重庆联合丽格科技有限公司",
  
  // 网站信息
  url: "https://tianrenheyi-medical-aesthetics.vercel.app",
  domain: "tianrenheyi-medical-aesthetics.vercel.app",
  locale: "zh_CN",
  
  // 公司信息
  company: {
    name: "重庆联合丽格科技有限公司",
    email: "bccsw@cqlhlg.work",
    phone: "023-68726872",
    address: {
      street: "临江支路28号",
      locality: "渝中区", 
      region: "重庆市",
      country: "CN",
      postalCode: ""
    },
    icp: "渝ICP备2024000000号"
  },
  
  // 社交媒体
  social: {
    wechat: "medical-aesthetics-wechat",
    weibo: "@医美专家",
    xiaohongshu: "medical-aesthetics"
  },
  
  // 图片资源
  images: {
    logo: "https://docs.bccsw.cn/logo.png",
    favicon: "https://docs.bccsw.cn/favicon.png",
    ogImage: "/og-image.jpg",
    cover: "/cover-image.jpg"
  },
  
  // 页面配置
  pages: {
    home: {
      title: "首页 - 天人合一与医美",
      description: "探索中式美学与现代医美的完美融合，开启优雅医美的人文之旅。",
      keywords: ["医美首页", "中式美学", "现代医美"]
    },
    about: {
      title: "关于本书 - 天人合一与医美", 
      description: "了解《天人合一与医美》的创作理念，探索中式美学在医美领域的应用。",
      keywords: ["关于本书", "创作理念", "医美理论"]
    },
    contents: {
      title: "目录 - 天人合一与医美",
      description: "浏览《天人合一与医美》完整目录，系统学习中式医美美学理论。",
      keywords: ["书籍目录", "章节导航", "医美学习"]
    }
  }
};

// 结构化数据生成器
export function generateBookStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": siteConfig.title,
    "alternateName": "中式美学遇到格式塔心理学 - 当代优雅医美的思辨与实践",
    "author": {
      "@type": "Person",
      "name": siteConfig.authors[0]
    },
    "publisher": {
      "@type": "Organization", 
      "name": siteConfig.company.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.company.address.street,
        "addressLocality": siteConfig.company.address.locality,
        "addressRegion": siteConfig.company.address.region,
        "addressCountry": siteConfig.company.address.country
      },
      "email": siteConfig.company.email,
      "telephone": siteConfig.company.phone
    },
    "description": siteConfig.description,
    "genre": ["医学", "美学", "哲学"],
    "inLanguage": siteConfig.locale,
    "datePublished": "2024",
    "keywords": siteConfig.keywords.join(", "),
    "url": siteConfig.url,
    "image": siteConfig.url + siteConfig.images.cover
  };
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.company.name,
    "url": siteConfig.url,
    "logo": siteConfig.images.logo,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.company.phone,
      "contactType": "客户服务",
      "availableLanguage": ["Chinese"]
    },
    "address": {
      "@type": "PostalAddress", 
      "streetAddress": siteConfig.company.address.street,
      "addressLocality": siteConfig.company.address.locality,
      "addressRegion": siteConfig.company.address.region,
      "addressCountry": siteConfig.company.address.country
    },
    "sameAs": [
      `https://weibo.com/${siteConfig.social.weibo.replace('@', '')}`,
      `https://www.xiaohongshu.com/user/${siteConfig.social.xiaohongshu}`
    ]
  };
}

export function generateWebSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "inLanguage": siteConfig.locale,
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.company.name
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// 面包屑导航结构化数据
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// 页面SEO元数据生成器
export function generatePageMetadata(pageKey: keyof typeof siteConfig.pages, customData?: {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
}) {
  const pageConfig = siteConfig.pages[pageKey];
  
  return {
    title: customData?.title || pageConfig.title,
    description: customData?.description || pageConfig.description,
    keywords: [...(customData?.keywords || []), ...pageConfig.keywords, ...siteConfig.keywords],
    canonical: customData?.canonical || `${siteConfig.url}/${pageKey}`,
    openGraph: {
      title: customData?.title || pageConfig.title,
      description: customData?.description || pageConfig.description,
      url: customData?.canonical || `${siteConfig.url}/${pageKey}`,
      siteName: siteConfig.name,
      images: [siteConfig.images.ogImage],
      locale: siteConfig.locale,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: customData?.title || pageConfig.title,
      description: customData?.description || pageConfig.description,
      images: [siteConfig.images.ogImage]
    }
  };
}