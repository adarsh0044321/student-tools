import type { ToolConfig } from './types';

export const toolsList: ToolConfig[] = [
  // ORGANIZE PDF
  {
    id: 'merge',
    title: 'Merge PDF',
    desc: 'Combine research papers, lecture notes, or project components into a single organized PDF.',
    iconName: 'Merge',
    category: 'organize',
    studentContext: 'Perfect for combining handwritten assignments, scan pages, or group project contributions.',
    seoTitle: 'Merge PDF Online Free - Combine PDF Files',
    seoMetaDesc: 'Combine multiple PDF files into one document. 100% free, secure and runs fully in your browser. Perfect for joining student essays and lectures.',
    howItWorks: [
      'Select and upload the PDF documents you want to merge.',
      'Drag and drop the thumbnails to arrange the files in your preferred sequence.',
      'Click the "Process" button to compile them into a single file.',
      'Download your merged PDF immediately.'
    ],
    benefits: [
      'Secure client-side processing keeps your essays private.',
      'Drag-and-drop ordering makes layout arrangement fast.',
      'Combines unlimited files of any size.'
    ],
    faqs: [
      { q: 'Is it safe to merge my research paper here?', a: 'Yes. All file merging runs locally in your browser. No files are uploaded to any external server.' },
      { q: 'Can I reorder the pages after uploading?', a: 'Yes, you can visually drag the file cards to change the sequence before combining.' }
    ]
  },
  {
    id: 'split',
    title: 'Split PDF',
    desc: 'Extract specific pages, chapters, or sheets from textbooks or multi-page slide packages.',
    iconName: 'Split',
    category: 'organize',
    studentContext: 'Extract only the homework problems or specific lecture weeks from large books.',
    seoTitle: 'Split PDF Online Free - Extract PDF Pages',
    seoMetaDesc: 'Split a large PDF file into separate pages or custom ranges. Extract only the pages you need for your class assignments.',
    howItWorks: [
      'Upload the PDF book or slide deck.',
      'Enter the specific page ranges (e.g. 1-3, 5) or select split all pages.',
      'Click "Process" to compile the split files.',
      'Download the separate PDF or a ZIP archive containing all pages.'
    ],
    benefits: [
      'Supports custom ranges like 1-5, 8, 12-15.',
      'Processes files locally in seconds.',
      'Allows splitting the entire document page-by-page.'
    ],
    faqs: [
      { q: 'How do I split specific chapters?', a: 'Enter the page numbers of the chapter in the Page Ranges box, e.g., "15-30".' },
      { q: 'Will the text quality degrade?', a: 'No, splitting preserves the original high resolution and formatting of your PDF.' }
    ]
  },
  {
    id: 'remove-pages',
    title: 'Remove Pages',
    desc: 'Delete unwanted or unnecessary pages from your lecture handouts or textbooks.',
    iconName: 'Trash2',
    category: 'organize',
    studentContext: 'Clear out blank pages, cover sheets, or skipped units from your study files.',
    seoTitle: 'Remove PDF Pages Online Free',
    seoMetaDesc: 'Delete unnecessary pages from your PDFs instantly in-browser. Clean up textbook scans and lecture notes.',
    howItWorks: [
      'Upload your PDF document.',
      'Enter the page numbers or ranges you wish to delete (e.g. 1, 4-6).',
      'Click "Process" to output the clean PDF.',
      'Download your final document.'
    ],
    benefits: [
      'Easily clean up bulky scanned notes.',
      'Specify individual pages or wide ranges to remove.',
      'Saves storage by cutting out blank pages.'
    ],
    faqs: [
      { q: 'Can I undo page removal?', a: 'You can reload the page and re-upload the original file if you made an input mistake.' }
    ]
  },
  {
    id: 'extract-pages',
    title: 'Extract Pages',
    desc: 'Isolate and save only specific sheets or pages from a large PDF document.',
    iconName: 'Download',
    category: 'organize',
    studentContext: 'Isolate a single lab worksheet or essay template from your syllabus.',
    seoTitle: 'Extract PDF Pages Free - Save Specific Pages',
    seoMetaDesc: 'Extract and isolate specific PDF pages into a new document. Save custom worksheets or chapters.',
    howItWorks: [
      'Upload your multi-page PDF.',
      'Type the page numbers you want to save (e.g. 2, 5-7).',
      'Click "Process" to isolate those pages.',
      'Download the new PDF file.'
    ],
    benefits: [
      'Keep only the required assignments sheets.',
      'Generates a clean, smaller PDF file.',
      'Saves time when printing course materials.'
    ],
    faqs: []
  },
  {
    id: 'organize',
    title: 'Organize PDF',
    desc: 'Reorder, delete, or insert new pages in your PDF book or slide deck.',
    iconName: 'LayoutGrid',
    category: 'organize',
    studentContext: 'Re-arrange slides in order or delete unused pages from a course textbook.',
    seoTitle: 'Organize PDF Online Free - Reorder Pages',
    seoMetaDesc: 'Organize pages in your PDF document. Reorder, add, or delete pages visually with PDF page thumbnails.',
    howItWorks: [
      'Upload the PDF you want to organize.',
      'Hover over pages to delete them, or view the order.',
      'Re-arrange files or pages inside the visual grid.',
      'Click "Process" to download the organized PDF.'
    ],
    benefits: [
      'Interactive visual thumbnail grid.',
      'Perfect for correcting scanner output order.',
      'Secure in-browser compiling.'
    ],
    faqs: []
  },
  {
    id: 'scan-to-pdf',
    title: 'Scan to PDF',
    desc: 'Scan documents using your webcam or phone camera and save them instantly to PDF.',
    iconName: 'Camera',
    category: 'organize',
    studentContext: 'Take high-quality scans of handwritten answers on paper directly from your browser.',
    seoTitle: 'Scan to PDF Online Free - Web Camera Scanner',
    seoMetaDesc: 'Use your device camera or webcam to scan hand-written notes, sketches, and homework sheets directly to PDF.',
    howItWorks: [
      'Click to choose images or capture frames from your camera.',
      'Combine multiple page captures into the upload list.',
      'Click "Process" to compile the images.',
      'Download your scanned PDF.'
    ],
    benefits: [
      'No need to install separate mobile scanner apps.',
      'Assembles multiple sheets into a unified document.',
      'Generates standard layout print sizes.'
    ],
    faqs: []
  },

  // OPTIMIZE PDF
  {
    id: 'compress',
    title: 'Compress PDF',
    desc: 'Reduce file size while keeping text and layout readable for LMS submissions.',
    iconName: 'Minimize2',
    category: 'optimize',
    studentContext: 'Shrink textbook PDFs or image-heavy presentations to meet LMS upload size limits.',
    seoTitle: 'Compress PDF Online Free - Reduce PDF File Size',
    seoMetaDesc: 'Shrink your PDF file size while maintaining text legibility. Meet your university portal or canvas upload size restrictions.',
    howItWorks: [
      'Upload the heavy PDF file.',
      'Choose a compression level: Extreme, Recommended, or Low.',
      'Click "Process" to optimize your document.',
      'Download your compressed PDF.'
    ],
    benefits: [
      'Optimizes images and streams client-side.',
      'Avoids LMS upload size limit rejections.',
      'Maintains perfect text sharpness for reading.'
    ],
    faqs: [
      { q: 'Will my textbook become blurry?', a: 'Recommended compression balances size and quality, ensuring diagrams and equations remain fully readable.' }
    ]
  },
  {
    id: 'repair',
    title: 'Repair PDF',
    desc: 'Repair broken, damaged, or corrupted PDF files so they load correctly.',
    iconName: 'Wrench',
    category: 'optimize',
    studentContext: 'Fix files that show errors when uploading to your university portal.',
    seoTitle: 'Repair PDF Online Free - Fix Corrupted PDFs',
    seoMetaDesc: 'Repair corrupted or damaged PDF documents. Rebuild structural catalog references client-side.',
    howItWorks: [
      'Upload the damaged PDF file.',
      'Click "Process" to rebuild standard catalog streams.',
      'Download the recovered PDF file.'
    ],
    benefits: [
      'Fixes file descriptor syntax errors.',
      'Restores files corrupted during portal uploads.',
      'Safe, offline catalog rebuilding.'
    ],
    faqs: []
  },
  {
    id: 'ocr',
    title: 'OCR PDF',
    desc: 'Extract text from scanned PDFs or images to make them readable and searchable.',
    iconName: 'Eye',
    category: 'optimize',
    studentContext: 'Search text or copy quotes from scanned images or photos of book chapters.',
    seoTitle: 'OCR PDF Online Free - Extract Text from PDF',
    seoMetaDesc: 'Convert scanned PDF pages or images into searchable text files. Extract copyable quotes from course books.',
    howItWorks: [
      'Upload the scanned PDF or textbook image.',
      'Click "Process" to run in-browser text OCR recognition.',
      'Download your final text (.txt) file.'
    ],
    benefits: [
      'Makes scanned image text copyable.',
      'Speeds up citation copy-paste processes.',
      'Completely private text extraction.'
    ],
    faqs: []
  },

  // CONVERT TO PDF
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    desc: 'Convert pictures of handwritten sheets, sketches, or study guides into a clean PDF.',
    iconName: 'FileImage',
    category: 'convert-to',
    studentContext: 'Turn mobile photos of your handwritten homework into a professional PDF submission.',
    seoTitle: 'Convert JPG to PDF Online Free - Image to PDF',
    seoMetaDesc: 'Convert JPG, PNG, and GIF images to PDF. Ideal for assembling photos of hand-written homework answers.',
    howItWorks: [
      'Upload your image files.',
      'Select page orientation (Portrait/Landscape) and page dimensions.',
      'Click "Process" to stitch the images into pages.',
      'Download your compiled PDF document.'
    ],
    benefits: [
      'Creates professional document margins.',
      'Handles multiple images in batch.',
      'Fits images to standard A4/US Letter layouts.'
    ],
    faqs: []
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    desc: 'Convert DOCX documents to high-quality PDF files for final report submissions.',
    iconName: 'FileCode',
    category: 'convert-to',
    studentContext: 'Make sure your assignments look exactly as intended when professors open them.',
    seoTitle: 'Convert Word to PDF Online Free - DOCX to PDF',
    seoMetaDesc: 'Convert DOCX word documents to PDF format in-browser. Keep your formatting consistent across all devices.',
    howItWorks: [
      'Upload your Word (.docx) document.',
      'Click "Process" to render HTML layouts.',
      'Download the standard PDF file.'
    ],
    benefits: [
      'Avoids font and margin layout shifts.',
      'Completely client-side conversion.',
      'Instant ready-for-print output.'
    ],
    faqs: []
  },
  {
    id: 'powerpoint-to-pdf',
    title: 'PowerPoint to PDF',
    desc: 'Convert PPTX presentations into PDF handouts for easier reading and annotation.',
    iconName: 'Presentation',
    category: 'convert-to',
    studentContext: 'Convert presentation slides to PDF to write notes or submit slides easily.',
    seoTitle: 'Convert PowerPoint to PDF Online Free - PPTX to PDF',
    seoMetaDesc: 'Convert PowerPoint (.pptx) slide presentations into printable PDF handouts. Easy slide review and printing.',
    howItWorks: [
      'Upload your PowerPoint slide presentation.',
      'Click "Process" to compile the slides.',
      'Download your PDF handout file.'
    ],
    benefits: [
      'Keeps layout proportions intact.',
      'Converts slideshow pages into printable layouts.',
      'Quick in-browser slide compression.'
    ],
    faqs: []
  },
  {
    id: 'excel-to-pdf',
    title: 'Excel to PDF',
    desc: 'Format spreadsheets and lab result datasets into printable PDF reports.',
    iconName: 'Table',
    category: 'convert-to',
    studentContext: 'Turn charts and statistics sheets into neat reports for lab submission.',
    seoTitle: 'Convert Excel to PDF Online Free - XLSX to PDF',
    seoMetaDesc: 'Convert Excel (.xlsx) spreadsheets and lab records into readable PDF tables. Perfect for lab workbook submission.',
    howItWorks: [
      'Upload the Excel sheet file.',
      'Click "Process" to convert spreadsheets to table rows.',
      'Download your final PDF report.'
    ],
    benefits: [
      'Keeps grid columns and formulas mapped.',
      'Perfect for math and science data sheets.',
      'Renders worksheets page-by-page.'
    ],
    faqs: []
  },
  {
    id: 'html-to-pdf',
    title: 'HTML to PDF',
    desc: 'Convert web pages, articles, or online wiki tutorials into saved PDF documents.',
    iconName: 'Globe',
    category: 'convert-to',
    studentContext: 'Save reference web pages, documentation, or online essays offline for research citing.',
    seoTitle: 'Convert HTML to PDF Online Free',
    seoMetaDesc: 'Save reference web pages, tutorials, or articles as offline PDF papers. Perfect for research bibliographies.',
    howItWorks: [
      'Paste your raw HTML or text code in the options block.',
      'Click "Process" to compile and wrap layouts.',
      'Download your offline PDF page.'
    ],
    benefits: [
      'Cuts out web page advertisements and headers.',
      'Keeps study references saved offline.',
      'Maintains hyperlinks in text output.'
    ],
    faqs: []
  },

  // CONVERT FROM PDF
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    desc: 'Extract images or convert PDF pages into high-resolution JPG images.',
    iconName: 'Image',
    category: 'convert-from',
    studentContext: 'Turn PDF slides or textbook pages into image files to paste into notes or slides.',
    seoTitle: 'Convert PDF to JPG Online Free - PDF to Images',
    seoMetaDesc: 'Convert PDF document pages to JPG images in high resolution. Extract pictures and diagrams for notes.',
    howItWorks: [
      'Upload the source PDF file.',
      'Click "Process" to render page viewports onto canvases.',
      'Download a ZIP archive containing all pages as individual JPGs.'
    ],
    benefits: [
      'Exports high-definition page drawings.',
      'Perfect for visual slide presentations.',
      'Allows downloading all pages in a single ZIP.'
    ],
    faqs: []
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    desc: 'Convert PDFs to editable DOCX documents to revise text, add details, or write answers.',
    iconName: 'FileText',
    category: 'convert-from',
    studentContext: 'Turn lecture slides or worksheet PDFs into editable Word docs for taking notes.',
    seoTitle: 'Convert PDF to Word Online Free - PDF to DOCX',
    seoMetaDesc: 'Convert PDF files back to editable Word (.docx) documents. Easily edit text, fix mistakes, or copy study content.',
    howItWorks: [
      'Upload your PDF file.',
      'Click "Process" to parse textual blocks and lines.',
      'Download the editable Word document.'
    ],
    benefits: [
      'Extracts paragraphs and lists cleanly.',
      'Editable files output directly.',
      'No email registry required.'
    ],
    faqs: []
  },
  {
    id: 'pdf-to-powerpoint',
    title: 'PDF to PowerPoint',
    desc: 'Convert PDF files back to editable PowerPoint slides for presentation edits.',
    iconName: 'Video',
    category: 'convert-from',
    studentContext: 'Turn locked PDF handouts back into PPTX slides to give active presentations.',
    seoTitle: 'Convert PDF to PowerPoint Online Free - PDF to PPTX',
    seoMetaDesc: 'Convert your PDF documents back into editable PowerPoint slides. Fast, client-side slide layout reconstruction.',
    howItWorks: [
      'Upload the locked handout PDF.',
      'Click "Process" to rebuild slide decks.',
      'Download your presentation file.'
    ],
    benefits: [
      'Re-creates slides page-by-page.',
      'Makes presentation structures editable again.',
      'Safe, offline slide layout mapping.'
    ],
    faqs: []
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    desc: 'Extract tables from textbooks or financial reports into editable Excel sheets.',
    iconName: 'FileSpreadsheet',
    category: 'convert-from',
    studentContext: 'Convert lab tables and database rows in PDFs back to Excel for data analysis.',
    seoTitle: 'Convert PDF to Excel Online Free - PDF to XLSX',
    seoMetaDesc: 'Extract tables from PDF files into editable Excel (.xlsx) spreadsheets. Fast data extraction and mapping.',
    howItWorks: [
      'Upload the PDF containing data sheets.',
      'Click "Process" to run coordinate table parser.',
      'Download the Excel sheet file.'
    ],
    benefits: [
      'Extracts data tables without copy errors.',
      'Organizes rows and columns automatically.',
      'Saves hours of manual typing.'
    ],
    faqs: []
  },
  {
    id: 'pdf-to-pdfa',
    title: 'PDF to PDF/A',
    desc: 'Convert PDF files to ISO standardized PDF/A format for long-term archiving.',
    iconName: 'FileCheck',
    category: 'convert-from',
    studentContext: 'Format final thesis submissions to conform with digital library archive rules.',
    seoTitle: 'Convert PDF to PDF/A Online Free - Archive Standard',
    seoMetaDesc: 'Convert PDF documents to standardized PDF/A format for long-term archiving. Ideal for thesis and library submissions.',
    howItWorks: [
      'Upload the final thesis draft PDF.',
      'Click "Process" to append PDF/A catalog flags.',
      'Download the compliant PDF/A file.'
    ],
    benefits: [
      'Complies with university library archiving rules.',
      'Fixes device independence parameters.',
      'Embedded fonts and metadata alignment.'
    ],
    faqs: []
  },

  // EDIT PDF
  {
    id: 'rotate',
    title: 'Rotate PDF',
    desc: 'Rotate scanned notes or textbook pages to correct orientation.',
    iconName: 'RotateCw',
    category: 'edit-pdf',
    studentContext: 'Fix sideways or upside-down page scans of notes in a single click.',
    seoTitle: 'Rotate PDF Online Free - Turn PDF Pages',
    seoMetaDesc: 'Rotate individual pages or the entire PDF document. Fix sideways textbook scans or notes.',
    howItWorks: [
      'Upload your PDF file.',
      'Click the rotation icon on pages to tilt them by 90 degrees.',
      'Click "Process" to save orientation parameters.',
      'Download the rotated PDF.'
    ],
    benefits: [
      'Rotate specific pages or all pages.',
      'Visual rotation editor.',
      'Instant metadata updates.'
    ],
    faqs: []
  },
  {
    id: 'page-numbers',
    title: 'Add Page Numbers',
    desc: 'Add numbers to the pages of research papers, lab reports, or theses.',
    iconName: 'Hash',
    category: 'edit-pdf',
    studentContext: 'Format thesis drafts, lab reports, or essays to meet academic submission guidelines.',
    seoTitle: 'Add Page Numbers to PDF Online Free',
    seoMetaDesc: 'Add page numbers to your research paper or thesis PDF. Customize starting page, positioning, and layout format.',
    howItWorks: [
      'Upload the unnumbered PDF file.',
      'Set starting page number, position, and numbering format.',
      'Click "Process" to draw numbers onto layouts.',
      'Download the numbered PDF.'
    ],
    benefits: [
      'Custom numbering formats (e.g. 1 or Page 1 of 10).',
      'Select corner positions for margins.',
      'Academic format compliance.'
    ],
    faqs: []
  },
  {
    id: 'watermark',
    title: 'Watermark PDF',
    desc: 'Add text or image stamps to protect your original essays, assignments, or slides.',
    iconName: 'Stamp',
    category: 'edit-pdf',
    studentContext: 'Stamp your name and ID on reports to prevent plagiarism by other students.',
    seoTitle: 'Watermark PDF Online Free - Add Stamp to PDF',
    seoMetaDesc: 'Add text watermarks or stamps to your PDF documents. Set opacity and position to protect your essays.',
    howItWorks: [
      'Upload the assignment PDF.',
      'Enter the watermark text (e.g. COPYRIGHT, YOUR NAME).',
      'Adjust transparency and location parameters.',
      'Click "Process" to overlay the watermark and download.'
    ],
    benefits: [
      'Protects assignments from student plagiarism.',
      'Custom opacity sliders (10% to 100%).',
      'Stamps text cleanly on all pages.'
    ],
    faqs: []
  },
  {
    id: 'crop',
    title: 'Crop PDF',
    desc: 'Trim page margins or select custom dimensions for your PDF pages.',
    iconName: 'Crop',
    category: 'edit-pdf',
    studentContext: 'Cut out huge margins on textbook pages to make reading on phone screens easier.',
    seoTitle: 'Crop PDF Margins Online Free - Trim PDF Pages',
    seoMetaDesc: 'Crop PDF page dimensions and margins. Remove huge borders to make reading course books easier on mobile screens.',
    howItWorks: [
      'Upload the PDF book.',
      'Click "Process" to run the auto-margin crop.',
      'Download the cropped PDF document.'
    ],
    benefits: [
      'Auto-trims huge page border margins.',
      'Makes textbooks easier to read on phone screens.',
      'Reduces unnecessary whitespace.'
    ],
    faqs: []
  },
  {
    id: 'edit-pdf',
    title: 'Edit PDF',
    desc: 'Draw, add text annotations, shapes, or comments to your PDF pages.',
    iconName: 'PenTool',
    category: 'edit-pdf',
    studentContext: 'Annotate lecture notes or check off items on study guides directly.',
    seoTitle: 'Edit PDF Online Free - Annotate PDF Files',
    seoMetaDesc: 'Annotate your PDF pages. Write text comments, add notes, and draw highlights directly inside your browser.',
    howItWorks: [
      'Upload your course slide deck PDF.',
      'Enter the text annotation details.',
      'Click "Process" to write annotations on layers.',
      'Download the modified PDF.'
    ],
    benefits: [
      'Quick text stamps on layouts.',
      'Great for adding comments to essays.',
      'Processes everything offline.'
    ],
    faqs: []
  },
  {
    id: 'pdf-forms',
    title: 'Fill PDF Forms',
    desc: 'Fill out interactive PDF forms, student surveys, or application blanks.',
    iconName: 'FormInput',
    category: 'edit-pdf',
    studentContext: 'Fill out course registration blanks or internship surveys on-screen.',
    seoTitle: 'Fill PDF Forms Online Free',
    seoMetaDesc: 'Fill out PDF application blanks, course signups, and student surveys on-screen without printing.',
    howItWorks: [
      'Upload your PDF form document.',
      'Input the text you want to fill onto the form fields.',
      'Click "Process" to merge values.',
      'Download your completed PDF.'
    ],
    benefits: [
      'Saves paper by avoiding printing.',
      'Stamps text cleanly on empty lines.',
      'Saves filled records immediately.'
    ],
    faqs: []
  },

  // SECURITY
  {
    id: 'unlock',
    title: 'Unlock PDF',
    desc: 'Remove password restrictions from syllabus or textbook PDFs.',
    iconName: 'Unlock',
    category: 'security',
    studentContext: 'Access and edit lecture resources that are locked with permissions.',
    seoTitle: 'Unlock PDF Online Free - Remove PDF Password',
    seoMetaDesc: 'Remove password protection and permission limits from your PDF documents. Access locked student books.',
    howItWorks: [
      'Upload your locked PDF document.',
      'Enter the document password in the options bar.',
      'Click "Process" to decrypt and strip permissions.',
      'Download your unlocked PDF file.'
    ],
    benefits: [
      'Allows copying text from locked books.',
      'Bypasses print restriction tags.',
      'Safe, client-side decryption.'
    ],
    faqs: []
  },
  {
    id: 'protect',
    title: 'Protect PDF',
    desc: 'Secure exams, grade sheets, or private documents with strong password encryption.',
    iconName: 'Lock',
    category: 'security',
    studentContext: 'Password-protect your transcripts, grades, or resumes before emailing them.',
    seoTitle: 'Protect PDF Online Free - Add PDF Password',
    seoMetaDesc: 'Encrypt your PDF documents with strong passwords. Protect your transcripts and personal assignments.',
    howItWorks: [
      'Upload the private PDF file.',
      'Type your desired password in the options field.',
      'Click "Process" to compile with encryption.',
      'Download your protected PDF.'
    ],
    benefits: [
      'Secure, 128-bit file encryption.',
      'Prevents unauthorized viewing of grades.',
      'No credentials stored on servers.'
    ],
    faqs: []
  },
  {
    id: 'sign',
    title: 'Sign PDF',
    desc: 'Draw your signature on-screen and stamp it on internship or admission documents.',
    iconName: 'Pen',
    category: 'security',
    studentContext: 'Sign student applications, consent sheets, or lease forms without printing them.',
    seoTitle: 'Sign PDF Online Free - Add Signature to PDF',
    seoMetaDesc: 'Draw your signature on-screen and stamp it on admission forms, agreements, or internship documents.',
    howItWorks: [
      'Upload the document PDF.',
      'Use the drawing canvas box to draw your signature.',
      'Click "Process" to embed the signature image.',
      'Download the signed PDF.'
    ],
    benefits: [
      'Draw signatures with mouse or trackpad.',
      'Embeds signature transparently.',
      'Saves print/scan steps for applications.'
    ],
    faqs: []
  },
  {
    id: 'redact',
    title: 'Redact PDF',
    desc: 'Black out sensitive details like grades, phone numbers, or IDs securely.',
    iconName: 'Square',
    category: 'security',
    studentContext: 'Conceal personal data or other students grades before sharing class guides.',
    seoTitle: 'Redact PDF Online Free - Blackout PDF Text',
    seoMetaDesc: 'Black out sensitive text details like student IDs, phone numbers, and grades securely before sharing.',
    howItWorks: [
      'Upload the PDF report.',
      'Click "Process" to stamp blackout rectangle bars.',
      'Download the redacted PDF.'
    ],
    benefits: [
      'Permanent client-side metadata blackout.',
      'Protects classmates personal data privacy.',
      'Prevents grade exposure on group lists.'
    ],
    faqs: []
  },
  {
    id: 'compare',
    title: 'Compare PDF',
    desc: 'Upload two PDF documents and visually check side-by-side differences.',
    iconName: 'Columns',
    category: 'security',
    studentContext: 'Check changes between assignment revisions or verify thesis corrections.',
    seoTitle: 'Compare PDF Files Online Free',
    seoMetaDesc: 'Compare two PDF documents side-by-side. Spot text and catalog differences between assignment revisions.',
    howItWorks: [
      'Upload two different revisions of your PDF.',
      'Click "Process" to scan structure.',
      'Download a comparison report details log.'
    ],
    benefits: [
      'Spots text alignment modifications.',
      'Saves hours of word-by-word checks.',
      'Completely private document audit.'
    ],
    faqs: []
  },

  // INTEL
  {
    id: 'ai-summarizer',
    title: 'AI Summarizer',
    desc: 'Extract key concepts, definitions, and summaries using smart in-browser AI.',
    iconName: 'Sparkles',
    category: 'pdf-intelligence',
    studentContext: 'Get an instant bullet-point study guide of a 30-page textbook chapter.',
    seoTitle: 'AI PDF Summarizer Free - Study Guide Generator',
    seoMetaDesc: 'Analyze and summarize PDF textbooks and research papers in-browser. Get bullet-point study guides using AI.',
    howItWorks: [
      'Upload your textbook chapter PDF.',
      'Click "Process" to run key-phrase linguistic algorithms.',
      'Download an optimized Markdown (.md) study guide outline.'
    ],
    benefits: [
      'Summarizes 30-page chapters in seconds.',
      'Generates key vocabulary keyword terms lists.',
      'Safe, offline linguistic mapping.'
    ],
    faqs: []
  },
  {
    id: 'translate',
    title: 'Translate PDF',
    desc: 'Translate PDF texts into different languages to aid international studies.',
    iconName: 'Languages',
    category: 'pdf-intelligence',
    studentContext: 'Read foreign research papers or translation passages in your native language.',
    seoTitle: 'Translate PDF Online Free',
    seoMetaDesc: 'Translate text from your PDF files into other languages. Read foreign bibliography resources in your native language.',
    howItWorks: [
      'Upload the PDF resource paper.',
      'Select your target translation language.',
      'Click "Process" to execute text parsing and translation.',
      'Download the translated text (.txt) file.'
    ],
    benefits: [
      'Translates foreign research papers.',
      'Simplifies international study sources.',
      'Runs translation text streams offline.'
    ],
    faqs: []
  },

  // STUDENT TOOLS (CALCULATORS)
  {
    id: 'cgpa-calculator',
    title: 'CGPA Calculator',
    desc: 'Calculate your semester GPA and overall cumulative CGPA in seconds.',
    iconName: 'GraduationCap',
    category: 'student-tools',
    studentContext: 'Helps you track your grades and GPA requirements to maintain academic standing.',
    seoTitle: 'Free Student CGPA & GPA Calculator Online',
    seoMetaDesc: 'Calculate your semester GPA and cumulative CGPA easily. Free, fast, and offline-first grade tracker for university students.',
    howItWorks: [
      'Add semesters and input course names.',
      'Input the credits and grade points for each course.',
      'GPA for individual semesters and overall CGPA calculate automatically.',
      'Add or delete courses and semesters as required.'
    ],
    benefits: [
      'Tracks multiple semesters in a single screen.',
      'Handles variable credit loads.',
      'Instant offline calculation with zero server logging.'
    ],
    faqs: [
      { q: 'What is the difference between GPA and CGPA?', a: 'GPA (Grade Point Average) represents your score for a single semester, while CGPA (Cumulative Grade Point Average) is the average of all your semesters combined.' },
      { q: 'Is my grade data saved?', a: 'No, all grade calculations occur inside your browser. Your transcript data remains completely private.' }
    ]
  },
  {
    id: 'attendance-calculator',
    title: 'Attendance Calculator',
    desc: 'Calculate lectures needed or skip limits to maintain target attendance.',
    iconName: 'Calendar',
    category: 'student-tools',
    studentContext: 'Calculates exactly how many classes you can skip or need to attend to hit target percentages.',
    seoTitle: 'Free Student Attendance Calculator Online',
    seoMetaDesc: 'Check how many classes you need to attend or can afford to skip to maintain your target college attendance percentage (e.g. 75%).',
    howItWorks: [
      'Enter your lectures present and total lectures.',
      'Set your target attendance percentage (like 75%).',
      'The calculator computes how many consecutive classes you must attend or can safely skip.'
    ],
    benefits: [
      'Quick target calculation (e.g., 75% rule).',
      'Provides safe class-skipping buffers.',
      'Simple, clear recommendations.'
    ],
    faqs: [
      { q: 'How does the skip buffer work?', a: 'If your current attendance is higher than the target, the calculator tells you the maximum consecutive classes you can miss without dropping below that target.' }
    ]
  },
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    desc: 'Quick percentage differences, fractional calculations, and grade shares.',
    iconName: 'Percent',
    category: 'student-tools',
    studentContext: 'Quick grade shares, percentage markup, and discount values.',
    seoTitle: 'Free Online Percentage Calculator for Students',
    seoMetaDesc: 'Calculate percentages, percentage change, and fractional shares of scores. Easy homework helper tool.',
    howItWorks: [
      'Select a percentage calculation card.',
      'Enter the values (like X and Y).',
      'Results update instantly as you type.'
    ],
    benefits: [
      'Computes value shares, increase/decrease changes.',
      'Updates values in real-time.',
      'Essential math helper for worksheets.'
    ],
    faqs: []
  },
  {
    id: 'marks-calculator',
    title: 'Marks Calculator',
    desc: 'Inputs subjects list, exam scores, and displays average/total statistics.',
    iconName: 'ClipboardList',
    category: 'student-tools',
    studentContext: 'Inputs exam marks per subject and calculates total/average/percentage.',
    seoTitle: 'Free Student Marks Calculator - Grade Percentages',
    seoMetaDesc: 'Input your exam marks for different subjects and calculate your total marks, class average, and aggregate percentage.',
    howItWorks: [
      'Add your subject rows.',
      'Enter obtained marks and maximum marks for each.',
      'Total, class average, and aggregate percentage update dynamically.'
    ],
    benefits: [
      'Aggregate percentages for report cards.',
      'Tracks unlimited subject rows.',
      'Simple obtained-to-max percentage maps.'
    ],
    faqs: []
  },
  {
    id: 'pomodoro-timer',
    title: 'Study & Pomodoro Timer',
    desc: 'Visual countdown timer with work/break intervals, notifications, and audio alert.',
    iconName: 'Timer',
    category: 'productivity-tools',
    studentContext: 'Tracks study blocks (25m) and breaks (5m) to maximize learning focus.',
    seoTitle: 'Free Online Pomodoro Timer for Study Focus',
    seoMetaDesc: 'Focus on your study sessions using the Pomodoro technique. Custom work and break timers, HTML5 notifications, and chime alerts.',
    howItWorks: [
      'Select a mode: Focus (25 mins), Break (5 mins), or Rest (15 mins).',
      'Click "Start Session" to begin countdown.',
      'A Web Audio chime plays and browser alerts pop up when the block finishes.'
    ],
    benefits: [
      'Self-contained Web Audio synthesized beeps.',
      'Supports system-wide HTML5 notifications.',
      'Elegant, simple circular progress layout.'
    ],
    faqs: [
      { q: 'What is the Pomodoro Technique?', a: 'It is a time-management method where you focus on a task for 25 minutes, followed by a 5-minute break. After 4 cycles, you take a longer 15-minute break.' }
    ]
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    desc: 'Convert length, weight, data storage, and temperatures instantly in-browser.',
    iconName: 'RefreshCw',
    category: 'student-tools',
    studentContext: 'Converts length, weight, data storage, and temperatures instantly in-browser.',
    seoTitle: 'Free Online Unit Converter for Homework',
    seoMetaDesc: 'Convert metric and imperial units for length, weight, computer data, and temperatures. Complete client-side helper.',
    howItWorks: [
      'Choose a category (Length, Weight, Data, Temp).',
      'Input the values and select the source/target units.',
      'Converted values calculate in real-time.'
    ],
    benefits: [
      'Includes standard physics and computer science units.',
      'Converts fractions accurately.',
      'No advertisements inside inputs.'
    ],
    faqs: []
  },
  {
    id: 'scientific-calculator',
    title: 'Scientific Calculator',
    desc: 'Calculation pad for logs, trigonometry, exponents, and equations.',
    iconName: 'Calculator',
    category: 'student-tools',
    studentContext: 'In-browser calculation pad supporting trigonometric, log, exponential, and algebraic equations.',
    seoTitle: 'Free Online Scientific Calculator - Math Solver',
    seoMetaDesc: 'Solve algebraic equations, logarithms, trigonometry, square roots, and basic mathematics in-browser.',
    howItWorks: [
      'Click the keyboard buttons to type math expressions.',
      'Use parentheses to group equations.',
      'Click the "=" button to evaluate the formula.'
    ],
    benefits: [
      'Evaluates advanced trigonometry (sin, cos, tan).',
      'Resolves exponents and square roots.',
      'Lightweight, fast load times.'
    ],
    faqs: []
  },
  {
    id: 'word-counter',
    title: 'Word & Character Counter',
    desc: 'Real-time counter of text characters, words, sentences, reading time, and density.',
    iconName: 'FileText',
    category: 'productivity-tools',
    studentContext: 'Real-time counter of text characters, words, sentences, reading time, and keyword density.',
    seoTitle: 'Free Word Counter & Character Counter Online',
    seoMetaDesc: 'Count the number of words, characters, and sentences in your essay. Estimate reading time and check keyword densities.',
    howItWorks: [
      'Type or paste your research text into the box.',
      'Words, characters, sentences, and reading time update in real-time.',
      'Check the keyword distribution chips below the text block.'
    ],
    benefits: [
      'Ensures essays fit homework word limits.',
      'Calculates estimated presentation speech reading times.',
      'Finds repetitive keywords instantly.'
    ],
    faqs: []
  },
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    desc: 'Computes exact age in years, months, weeks, days, and time until next birthday.',
    iconName: 'Smile',
    category: 'student-tools',
    studentContext: 'Computes exact age in years, months, weeks, days, and time until next birthday based on birthdate.',
    seoTitle: 'Free Online Age Calculator - Birthday Countdown',
    seoMetaDesc: 'Find your exact age in years, months, and days. Track the countdown until your next birthday.',
    howItWorks: [
      'Select your birth date on the calendar input.',
      'Your exact age details calculate instantly.',
      'Shows remaining days to next birthday.'
    ],
    benefits: [
      'Calculates down to exact days.',
      'Calculates birthday countdown grids.',
      'Fast, offline-first execution.'
    ],
    faqs: []
  },
  {
    id: 'exam-countdown',
    title: 'Exam Countdown',
    desc: 'Tracks multiple exam names and dates, displaying custom countdown clocks.',
    iconName: 'Hourglass',
    category: 'productivity-tools',
    studentContext: 'Tracks multiple exam names and dates, displaying custom countdown clocks.',
    seoTitle: 'Free Online Exam Countdown - Study Planner',
    seoMetaDesc: 'Add your college or school exam dates and watch countdown timers. Keep track of study schedules.',
    howItWorks: [
      'Enter your exam name.',
      'Set exam date and time using datetime picker.',
      'Active countdown timers display in real-time.'
    ],
    benefits: [
      'Add multiple exam rows.',
      'Calculates days, hours, and minutes remaining.',
      'Keeps syllabus deadlines organized.'
    ],
    faqs: []
  },
  {
    id: 'grade-calculator',
    title: 'Grade Calculator',
    desc: 'Calculate the grade needed on final exams to achieve a target overall grade.',
    iconName: 'TrendingUp',
    category: 'student-tools',
    studentContext: 'Computes required scores in upcoming tests/finals to maintain target grades.',
    seoTitle: 'Free Student Final Exam Grade Calculator Online',
    seoMetaDesc: 'Find out exactly what score you need on your final exam to achieve your target overall class grade.',
    howItWorks: [
      'Enter your current class grade percentage.',
      'Enter your target grade percentage.',
      'Input the weight percentage of the final exam.',
      'Required score updates automatically.'
    ],
    benefits: [
      'Calculates exact target grade points.',
      'Displays helpful alerts for unreachable grades.',
      'Helps you prioritize study blocks.'
    ],
    faqs: [
      { q: 'How does the final grade weight work?', a: 'If your final exam is worth 30% of the class grade, the calculator assumes your current grades make up the remaining 70%.' }
    ]
  },
  {
    id: 'gpa-to-percentage',
    title: 'GPA to Percentage',
    desc: 'Convert GPA scores (on 4.0 or 10.0 scale) to aggregate percentage values.',
    iconName: 'BarChart2',
    category: 'student-tools',
    studentContext: 'Converts 4.0 or 10.0 scale GPA grades to percentage values.',
    seoTitle: 'Convert GPA to Percentage Online Free',
    seoMetaDesc: 'Convert your university GPA (on a 4.0 or 10.0 scale) into percentage grades. CBSE and standard formula options.',
    howItWorks: [
      'Enter your GPA score.',
      'Select your scale (CBSE 10.0, Standard 10.0, US 4.0).',
      'The equivalent grade percentage is computed immediately.'
    ],
    benefits: [
      'Supports CBSE board calculations (GPA * 9.5).',
      'US 4.0 GPA conversion mappings.',
      'Clear, instant calculation results.'
    ],
    faqs: []
  },
  {
    id: 'study-planner',
    title: 'Study Planner',
    desc: 'Generate a personalized daily revision timetable based on exam dates, subjects, difficulty, and study hours.',
    iconName: 'Calendar',
    category: 'productivity-tools',
    studentContext: 'Generates a day-by-day revision schedule distributing focus time according to subject difficulty.',
    seoTitle: 'Free Online Student Study Planner & Revision Timetable Generator',
    seoMetaDesc: 'Create a custom study plan for your upcoming exams. Set subject difficulty and daily study hours to build an optimized revision timetable.',
    howItWorks: [
      'Enter the start date and the end date (exam date) for your study block.',
      'List the subjects you need to study, selecting their difficulty level (Easy, Medium, Hard).',
      'Input the number of hours you can allocate for studying each day.',
      'Click "Generate Timetable" to dynamically build and display your study plan.',
      'Export the generated revision plan as a CSV file or print it for offline reference.'
    ],
    benefits: [
      'Difficulty-weighted scheduling distributes more study hours to complex topics.',
      'Generates chronological daily checklists with topics and rest times.',
      'No data collection; all inputs stay local in your browser.',
      'Supports printing and CSV download.'
    ],
    faqs: [
      { q: 'How does the difficulty weighting work?', a: 'Hard subjects are allocated 3x more focus slots than Easy subjects, and Medium subjects are allocated 2x more slots, ensuring you study tough topics thoroughly.' },
      { q: 'Can I export the schedule?', a: 'Yes, you can click the "Export CSV" button to download a spreadsheet or use the "Print" option to print it.' }
    ]
  },
  {
    id: 'flashcards',
    title: 'Flashcard Quizzer',
    desc: 'Create digital flashcards, practice with active recall, and take score-based quizzes.',
    iconName: 'BookOpen',
    category: 'productivity-tools',
    studentContext: 'Great for memorizing key vocabulary, scientific definitions, or historical dates through self-testing.',
    seoTitle: 'Free Online Flashcard Maker & Quiz Tool for Students',
    seoMetaDesc: 'Create custom flashcard decks online. Review using active recall flip cards, test yourself with multiple-choice quizzes, and track your scores.',
    howItWorks: [
      'Select a sample deck or start adding cards manually to a new deck.',
      'Enter the front (question/term) and back (answer/definition) for each card.',
      'Use the Review Mode to flip cards and grade your confidence.',
      'Switch to Quiz Mode to test yourself with randomly generated options.',
      'Track your results and review the summary page to identify weak spots.'
    ],
    benefits: [
      'Active recall review mode with self-grading.',
      'Dynamic quiz mode auto-generates wrong options from other cards in the deck.',
      'Import/Export decks as JSON files to share with study groups.',
      'Pre-loaded computer science and biology flashcards to practice immediately.'
    ],
    faqs: [
      { q: 'How does the quiz mode generate multiple choice answers?', a: 'It dynamically extracts answers from other cards in the same deck to create plausible options. For best results, ensure your deck has at least 4 cards.' },
      { q: 'Can I save my decks for later?', a: 'Yes, you can export your deck as a JSON file and load it back anytime you want to study.' }
    ]
  }
];
