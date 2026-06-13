import type { ToolConfig } from './types';

export const toolsList: ToolConfig[] = [
  {
    id: 'merge',
    title: 'Merge PDF',
    desc: 'Combine research papers, lecture notes, or project components into a single organized PDF.',
    iconName: 'Merge',
    category: 'organize',
    studentContext: 'Perfect for combining handwritten assignments, scan pages, or group project contributions.'
  },
  {
    id: 'split',
    title: 'Split PDF',
    desc: 'Extract specific pages, chapters, or sheets from textbooks or multi-page slide packages.',
    iconName: 'Split',
    category: 'organize',
    studentContext: 'Extract only the homework problems or specific lecture weeks from large books.'
  },
  {
    id: 'compress',
    title: 'Compress PDF',
    desc: 'Reduce file size while keeping text and layout readable for LMS submissions.',
    iconName: 'Minimize2',
    category: 'optimize',
    studentContext: 'Shrink textbook PDFs or image-heavy presentations to meet LMS upload size limits.'
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    desc: 'Convert PDFs to editable DOCX documents to revise text, add details, or write answers.',
    iconName: 'FileText',
    category: 'convert-from',
    studentContext: 'Turn lecture slides or worksheet PDFs into editable Word docs for taking notes.'
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    desc: 'Convert DOCX documents to high-quality PDF files for final report submissions.',
    iconName: 'FileCode',
    category: 'convert-to',
    studentContext: 'Make sure your assignments look exactly as intended when professors open them.'
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    desc: 'Extract images or convert PDF pages into high-resolution JPG images.',
    iconName: 'Image',
    category: 'convert-from',
    studentContext: 'Turn PDF slides or textbook pages into image files to paste into notes or slides.'
  },
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    desc: 'Convert pictures of handwritten sheets, sketches, or study guides into a clean PDF.',
    iconName: 'FileImage',
    category: 'convert-to',
    studentContext: 'Turn mobile photos of your handwritten homework into a professional PDF submission.'
  },
  {
    id: 'rotate',
    title: 'Rotate PDF',
    desc: 'Rotate scanned notes or textbook pages to correct orientation.',
    iconName: 'RotateCw',
    category: 'organize',
    studentContext: 'Fix sideways or upside-down page scans of notes in a single click.'
  },
  {
    id: 'watermark',
    title: 'Watermark PDF',
    desc: 'Add text or image stamps to protect your original essays, assignments, or slides.',
    iconName: 'Stamp',
    category: 'security',
    studentContext: 'Stamp your name and ID on reports to prevent plagiarism by other students.'
  },
  {
    id: 'page-numbers',
    title: 'Add Page Numbers',
    desc: 'Add numbers to the pages of research papers, lab reports, or theses.',
    iconName: 'Hash',
    category: 'organize',
    studentContext: 'Format thesis drafts, lab reports, or essays to meet academic submission guidelines.'
  },
  {
    id: 'protect',
    title: 'Protect PDF',
    desc: 'Secure exams, grade sheets, or private documents with strong password encryption.',
    iconName: 'Lock',
    category: 'security',
    studentContext: 'Password-protect your transcripts, grades, or resumes before emailing them.'
  },
  {
    id: 'unlock',
    title: 'Unlock PDF',
    desc: 'Remove password restrictions from syllabus or textbook PDFs.',
    iconName: 'Unlock',
    category: 'security',
    studentContext: 'Access and edit lecture resources that are locked with permissions.'
  },
  {
    id: 'organize',
    title: 'Organize PDF',
    desc: 'Reorder, delete, or insert new pages in your PDF book or slide deck.',
    iconName: 'LayoutGrid',
    category: 'organize',
    studentContext: 'Re-arrange slides in order or delete unused pages from a course textbook.'
  },
  {
    id: 'excel-to-pdf',
    title: 'Excel to PDF',
    desc: 'Format spreadsheets and lab result datasets into printable PDF reports.',
    iconName: 'Table',
    category: 'convert-to',
    studentContext: 'Turn charts and statistics sheets into neat reports for lab submission.'
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    desc: 'Extract tables from textbooks or financial reports into editable Excel sheets.',
    iconName: 'FileSpreadsheet',
    category: 'convert-from',
    studentContext: 'Convert lab tables and database rows in PDFs back to Excel for data analysis.'
  }
];
