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
  | 'translate';

export interface ToolConfig {
  id: ToolId;
  title: string;
  desc: string;
  iconName: string;
  category: 'organize' | 'optimize' | 'convert-to' | 'convert-from' | 'edit-pdf' | 'security' | 'pdf-intelligence';
  studentContext: string; // Explanation of how this helps students
}

export type Stage = 'upload' | 'config' | 'processing' | 'success';

export interface ProcessedFile {
  name: string;
  size: number;
  data: ArrayBuffer;
  rotation?: number; // Rotate angle for visual previews (0, 90, 180, 270)
}
