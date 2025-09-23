import { Chapter } from '@/types';

// 搜索内容
export interface SearchResult {
  chapter: Chapter;
  matches: SearchMatch[];
  score: number;
}

export interface SearchMatch {
  text: string;
  startIndex: number;
  endIndex: number;
  context: string;
}

// 简单的全文搜索功能
export function searchContent(
  chapters: Chapter[],
  query: string,
  options: {
    maxResults?: number;
    contextLength?: number;
    caseSensitive?: boolean;
  } = {}
): SearchResult[] {
  const {
    maxResults = 20,
    contextLength = 100,
    caseSensitive = false
  } = options;

  if (!query.trim()) return [];

  const searchQuery = caseSensitive ? query : query.toLowerCase();
  const results: SearchResult[] = [];

  chapters.forEach(chapter => {
    const content = caseSensitive ? chapter.content : chapter.content.toLowerCase();
    const title = caseSensitive ? chapter.title : chapter.title.toLowerCase();
    const description = caseSensitive ? chapter.description : chapter.description.toLowerCase();

    const matches: SearchMatch[] = [];
    let score = 0;

    // 在标题中搜索 (权重最高)
    if (title.includes(searchQuery)) {
      score += 10;
      matches.push({
        text: chapter.title,
        startIndex: 0,
        endIndex: chapter.title.length,
        context: chapter.title
      });
    }

    // 在描述中搜索 (权重中等)
    if (description.includes(searchQuery)) {
      score += 5;
      matches.push({
        text: chapter.description,
        startIndex: 0,
        endIndex: chapter.description.length,
        context: chapter.description
      });
    }

    // 在内容中搜索 (权重较低但可能有多个匹配)
    let startIndex = 0;
    while (true) {
      const index = content.indexOf(searchQuery, startIndex);
      if (index === -1) break;

      score += 1;
      
      // 提取上下文
      const contextStart = Math.max(0, index - contextLength / 2);
      const contextEnd = Math.min(content.length, index + searchQuery.length + contextLength / 2);
      const context = content.slice(contextStart, contextEnd);
      
      matches.push({
        text: chapter.content.slice(index, index + searchQuery.length),
        startIndex: index,
        endIndex: index + searchQuery.length,
        context: (contextStart > 0 ? '...' : '') + 
                chapter.content.slice(contextStart, contextEnd) + 
                (contextEnd < content.length ? '...' : '')
      });

      startIndex = index + 1;
    }

    if (matches.length > 0) {
      results.push({
        chapter,
        matches,
        score
      });
    }
  });

  // 按分数排序，然后按匹配数量排序
  results.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return b.matches.length - a.matches.length;
  });

  return results.slice(0, maxResults);
}

// 高亮搜索结果
export function highlightSearchTerms(
  text: string,
  query: string,
  caseSensitive: boolean = false
): string {
  if (!query.trim()) return text;

  const searchQuery = caseSensitive ? query : query.toLowerCase();
  const searchText = caseSensitive ? text : text.toLowerCase();
  
  if (!searchText.includes(searchQuery)) return text;

  // 使用正则表达式进行替换，保持原始大小写
  const regex = new RegExp(
    query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    caseSensitive ? 'g' : 'gi'
  );

  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$&</mark>');
}

// 搜索建议/自动完成
export function getSearchSuggestions(
  chapters: Chapter[],
  query: string,
  maxSuggestions: number = 5
): string[] {
  if (!query.trim()) return [];

  const suggestions = new Set<string>();
  const searchQuery = query.toLowerCase();

  // 从章节标题中提取建议
  chapters.forEach(chapter => {
    const words = chapter.title.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (word.includes(searchQuery) && word.length > searchQuery.length) {
        suggestions.add(word);
      }
    });
  });

  // 从内容中提取关键词
  const keywords = [
    '格式塔', '心理学', '美学', '医美', '天人合一',
    '黄金比例', '面部', '轮廓', '注射', '填充',
    '肉毒素', '玻尿酸', '激光', '射频', '光电',
    '审美', '文化', '东方', '西方', '现代',
    '传统', '艺术', '技术', '临床', '实践'
  ];

  keywords.forEach(keyword => {
    if (keyword.includes(searchQuery)) {
      suggestions.add(keyword);
    }
  });

  return Array.from(suggestions).slice(0, maxSuggestions);
}

// 搜索历史管理
export class SearchHistory {
  private static readonly STORAGE_KEY = 'tianrenheyi_search_history';
  private static readonly MAX_HISTORY = 10;

  static getHistory(): string[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const history = localStorage.getItem(this.STORAGE_KEY);
      return history ? JSON.parse(history) : [];
    } catch {
      return [];
    }
  }

  static addToHistory(query: string): void {
    if (typeof window === 'undefined' || !query.trim()) return;

    try {
      const history = this.getHistory();
      const trimmedQuery = query.trim();
      
      // 移除重复项
      const filteredHistory = history.filter(item => item !== trimmedQuery);
      
      // 添加到开头
      filteredHistory.unshift(trimmedQuery);
      
      // 限制历史记录数量
      const limitedHistory = filteredHistory.slice(0, this.MAX_HISTORY);
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('保存搜索历史失败:', error);
    }
  }

  static clearHistory(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('清除搜索历史失败:', error);
    }
  }

  static removeFromHistory(query: string): void {
    if (typeof window === 'undefined') return;

    try {
      const history = this.getHistory();
      const filteredHistory = history.filter(item => item !== query);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredHistory));
    } catch (error) {
      console.error('删除搜索历史项失败:', error);
    }
  }
}