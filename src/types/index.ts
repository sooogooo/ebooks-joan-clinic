export interface BookStructure {
  title: string;
  subtitle: string;
  author: string;
  parts: Part[];
}

export interface Part {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  content: string;
  readingTime: number;
  hasVisualizations?: boolean;
  mermaidCharts?: MermaidChart[];
  svgIllustrations?: SVGIllustration[];
}

export interface MermaidChart {
  id: string;
  title: string;
  type: 'flowchart' | 'mindmap' | 'gitgraph' | 'timeline';
  code: string;
  description?: string;
}

export interface SVGIllustration {
  id: string;
  title: string;
  component: string;
  description?: string;
  interactive?: boolean;
}

export interface ReadingProgress {
  currentChapter: string;
  progress: number;
  lastRead: Date;
}

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  children?: NavigationItem[];
}