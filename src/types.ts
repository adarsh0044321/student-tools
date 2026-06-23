export type ToolId =
  | 'merge'
  | 'split'
  | 'compress'
  | 'pdf-to-jpg'
  | 'jpg-to-pdf'
  | 'rotate'
  | 'protect'
  | 'unlock'
  | 'watermark'
  | 'page-numbers'
  | 'organize'
  | 'word-to-pdf'
  | 'excel-to-pdf'
  | 'pdf-to-word'
  | 'pdf-to-excel'
  | 'remove-pages'
  | 'extract-pages'
  | 'scan-to-pdf'
  | 'repair'
  | 'ocr'
  | 'powerpoint-to-pdf'
  | 'pdf-to-powerpoint'
  | 'html-to-pdf'
  | 'pdf-to-pdfa'
  | 'crop'
  | 'edit-pdf'
  | 'pdf-forms'
  | 'sign'
  | 'redact'
  | 'compare'
  | 'ai-summarizer'
  | 'translate'
  | 'cgpa-calculator'
  | 'attendance-calculator'
  | 'percentage-calculator'
  | 'marks-calculator'
  | 'pomodoro-timer'
  | 'unit-converter'
  | 'scientific-calculator'
  | 'word-counter'
  | 'age-calculator'
  | 'exam-countdown'
  | 'grade-calculator'
  | 'gpa-to-percentage'
  | 'study-planner'
  | 'flashcards';

export interface ToolConfig {
  id: ToolId;
  title: string;
  desc: string;
  iconName: string;
  category: 'organize' | 'optimize' | 'convert-to' | 'convert-from' | 'edit-pdf' | 'security' | 'pdf-intelligence' | 'student-tools' | 'productivity-tools';
  studentContext: string;
  // SEO programmatic properties
  seoTitle?: string;
  seoMetaDesc?: string;
  howItWorks?: string[];
  benefits?: string[];
  faqs?: Array<{ q: string; a: string }>;
}

export type Stage = 'upload' | 'config' | 'processing' | 'success';

export interface ProcessedFile {
  name: string;
  size: number;
  data: ArrayBuffer;
  rotation?: number;
}

