// 格式化阅读时间
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return '不到1分钟';
  if (minutes === 1) return '1分钟';
  return `${minutes}分钟`;
}

// 格式化日期
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
}

// 生成安全的ID
export function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// 截断文本
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// 计算阅读进度
export function calculateReadingProgress(): number {
  if (typeof window === 'undefined') return 0;
  
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  
  if (docHeight === 0) return 0;
  
  return Math.min((scrollTop / docHeight) * 100, 100);
}

// 平滑滚动到元素
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.offsetTop - offset;
  
  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth'
  });
}

// 防抖函数
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 节流函数
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 深度克隆对象
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  
  if (typeof obj === 'object') {
    const cloned = {} as { [key: string]: any };
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned as T;
  }
  
  return obj;
}

// 检查是否为移动设备
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// 获取元素在视口中的可见比例
export function getElementVisibility(element: Element): number {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  if (rect.top >= windowHeight || rect.bottom <= 0) {
    return 0;
  }
  
  const visibleTop = Math.max(0, rect.top);
  const visibleBottom = Math.min(windowHeight, rect.bottom);
  const visibleHeight = visibleBottom - visibleTop;
  const elementHeight = rect.height;
  
  return Math.min(visibleHeight / elementHeight, 1);
}

// 复制文本到剪贴板
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'absolute';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        return true;
      } catch (err) {
        console.error('复制失败:', err);
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  } catch (err) {
    console.error('复制失败:', err);
    return false;
  }
}

// 生成分享链接
export function generateShareUrl(
  platform: 'wechat' | 'weibo' | 'qq' | 'link',
  url: string,
  title: string,
  description?: string
): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = description ? encodeURIComponent(description) : '';
  
  switch (platform) {
    case 'weibo':
      return `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}&content=utf8&searchPic=false`;
    
    case 'qq':
      return `https://connect.qq.com/widget/shareqq/index.html?url=${encodedUrl}&title=${encodedTitle}&desc=${encodedDesc}`;
    
    case 'wechat':
      // 微信分享需要通过微信JS-SDK，这里返回当前页面URL
      return url;
    
    case 'link':
    default:
      return url;
  }
}

// 性能监控
export function measurePerformance(name: string, fn: () => void): void {
  if (typeof window === 'undefined' || !window.performance) {
    fn();
    return;
  }
  
  const start = performance.now();
  fn();
  const end = performance.now();
  
  console.log(`${name} 执行时间: ${(end - start).toFixed(2)}ms`);
}

// 懒加载图片
export function lazyLoadImage(img: HTMLImageElement, src: string): void {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = src;
          img.classList.remove('opacity-0');
          img.classList.add('opacity-100');
          observer.unobserve(img);
        }
      });
    });
    
    observer.observe(img);
  } else {
    // 降级方案
    img.src = src;
  }
}