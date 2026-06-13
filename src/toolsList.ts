import type { ToolConfig } from './types';

export const toolsList: ToolConfig[] = [
  // ORGANIZE PDF
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
    id: 'remove-pages',
    title: 'Remove Pages',
    desc: 'Delete unwanted or unnecessary pages from your lecture handouts or textbooks.',
    iconName: 'Trash2',
    category: 'organize',
    studentContext: 'Clear out blank pages, cover sheets, or skipped units from your study files.'
  },
  {
    id: 'extract-pages',
    title: 'Extract Pages',
    desc: 'Isolate and save only specific sheets or pages from a large PDF document.',
    iconName: 'Download',
    category: 'organize',
    studentContext: 'Isolate a single lab worksheet or essay template from your syllabus.'
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
    id: 'scan-to-pdf',
    title: 'Scan to PDF',
    desc: 'Scan documents using your webcam or phone camera and save them instantly to PDF.',
    iconName: 'Camera',
    category: 'organize',
    studentContext: 'Take high-quality scans of handwritten answers on paper directly from your browser.'
  },

  // OPTIMIZE PDF
  {
    id: 'compress',
    title: 'Compress PDF',
    desc: 'Reduce file size while keeping text and layout readable for LMS submissions.',
    iconName: 'Minimize2',
    category: 'optimize',
    studentContext: 'Shrink textbook PDFs or image-heavy presentations to meet LMS upload size limits.'
  },
  {
    id: 'repair',
    title: 'Repair PDF',
    desc: 'Repair broken, damaged, or corrupted PDF files so they load correctly.',
    iconName: 'Wrench',
    category: 'optimize',
    studentContext: 'Fix files that show errors when uploading to your university portal.'
  },
  {
    id: 'ocr',
    title: 'OCR PDF',
    desc: 'Extract text from scanned PDFs or images to make them readable and searchable.',
    iconName: 'Eye',
    category: 'optimize',
    studentContext: 'Search text or copy quotes from scanned images or photos of book chapters.'
  },

  // CONVERT TO PDF
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    desc: 'Convert pictures of handwritten sheets, sketches, or study guides into a clean PDF.',
    iconName: 'FileImage',
    category: 'convert-to',
    studentContext: 'Turn mobile photos of your handwritten homework into a professional PDF submission.'
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
    id: 'powerpoint-to-pdf',
    title: 'PowerPoint to PDF',
    desc: 'Convert PPTX presentations into PDF handouts for easier reading and annotation.',
    iconName: 'Presentation',
    category: 'convert-to',
    studentContext: 'Convert presentation slides to PDF to write notes or submit slides easily.'
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
    id: 'html-to-pdf',
    title: 'HTML to PDF',
    desc: 'Convert web pages, articles, or online wiki tutorials into saved PDF documents.',
    iconName: 'Globe',
    category: 'convert-to',
    studentContext: 'Save reference web pages, documentation, or online essays offline for research citing.'
  },

  // CONVERT FROM PDF
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    desc: 'Extract images or convert PDF pages into high-resolution JPG images.',
    iconName: 'Image',
    category: 'convert-from',
    studentContext: 'Turn PDF slides or textbook pages into image files to paste into notes or slides.'
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
    id: 'pdf-to-powerpoint',
    title: 'PDF to PowerPoint',
    desc: 'Convert PDF files back to editable PowerPoint slides for presentation edits.',
    iconName: 'Video',
    category: 'convert-from',
    studentContext: 'Turn locked PDF handouts back into PPTX slides to give active presentations.'
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    desc: 'Extract tables from textbooks or financial reports into editable Excel sheets.',
    iconName: 'FileSpreadsheet',
    category: 'convert-from',
    studentContext: 'Convert lab tables and database rows in PDFs back to Excel for data analysis.'
  },
  {
    id: 'pdf-to-pdfa',
    title: 'PDF to PDF/A',
    desc: 'Convert PDF files to ISO standardized PDF/A format for long-term archiving.',
    iconName: 'FileCheck',
    category: 'convert-from',
    studentContext: 'Format final thesis submissions to conform with digital library archive rules.'
  },

  // EDIT PDF
  {
    id: 'rotate',
    title: 'Rotate PDF',
    desc: 'Rotate scanned notes or textbook pages to correct orientation.',
    iconName: 'RotateCw',
    category: 'edit-pdf',
    studentContext: 'Fix sideways or upside-down page scans of notes in a single click.'
  },
  {
    id: 'page-numbers',
    title: 'Add Page Numbers',
    desc: 'Add numbers to the pages of research papers, lab reports, or theses.',
    iconName: 'Hash',
    category: 'edit-pdf',
    studentContext: 'Format thesis drafts, lab reports, or essays to meet academic submission guidelines.'
  },
  {
    id: 'watermark',
    title: 'Watermark PDF',
    desc: 'Add text or image stamps to protect your original essays, assignments, or slides.',
    iconName: 'Stamp',
    category: 'edit-pdf',
    studentContext: 'Stamp your name and ID on reports to prevent plagiarism by other students.'
  },
  {
    id: 'crop',
    title: 'Crop PDF',
    desc: 'Trim page margins or select custom dimensions for your PDF pages.',
    iconName: 'Crop',
    category: 'edit-pdf',
    studentContext: 'Cut out huge margins on textbook pages to make reading on phone screens easier.'
  },
  {
    id: 'edit-pdf',
    title: 'Edit PDF',
    desc: 'Draw, add text annotations, shapes, or comments to your PDF pages.',
    iconName: 'PenTool',
    category: 'edit-pdf',
    studentContext: 'Annotate lecture notes or check off items on study guides directly.'
  },
  {
    id: 'pdf-forms',
    title: 'Fill PDF Forms',
    desc: 'Fill out interactive PDF forms, student surveys, or application blanks.',
    iconName: 'FormInput',
    category: 'edit-pdf',
    studentContext: 'Fill out course registration blanks or internship surveys on-screen.'
  },

  // SECURITY
  {
    id: 'unlock',
    title: 'Unlock PDF',
    desc: 'Remove password restrictions from syllabus or textbook PDFs.',
    iconName: 'Unlock',
    category: 'security',
    studentContext: 'Access and edit lecture resources that are locked with permissions.'
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
    id: 'sign',
    title: 'Sign PDF',
    desc: 'Draw your signature on-screen and stamp it on internship or admission documents.',
    iconName: 'Pen',
    category: 'security',
    studentContext: 'Sign student applications, consent sheets, or lease forms without printing them.'
  },
  {
    id: 'redact',
    title: 'Redact PDF',
    desc: 'Black out sensitive details like grades, phone numbers, or IDs securely.',
    iconName: 'Square',
    category: 'security',
    studentContext: 'Conceal personal data or other students grades before sharing class guides.'
  },
  {
    id: 'compare',
    title: 'Compare PDF',
    desc: 'Upload two PDF documents and visually check side-by-side differences.',
    iconName: 'Columns',
    category: 'security',
    studentContext: 'Check changes between assignment revisions or verify thesis corrections.'
  },

  // INTEL
  {
    id: 'ai-summarizer',
    title: 'AI Summarizer',
    desc: 'Extract key concepts, definitions, and summaries using smart in-browser AI.',
    iconName: 'Sparkles',
    category: 'pdf-intelligence',
    studentContext: 'Get an instant bullet-point study guide of a 30-page textbook chapter.'
  },
  {
    id: 'translate',
    title: 'Translate PDF',
    desc: 'Translate PDF texts into different languages to aid international studies.',
    iconName: 'Languages',
    category: 'pdf-intelligence',
    studentContext: 'Read foreign research papers or translation passages in your native language.'
  }
];
