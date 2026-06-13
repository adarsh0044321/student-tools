import React, { useState, useRef, useEffect } from 'react';
import type { ToolConfig, Stage } from '../types';
import { toolsList } from '../toolsList';
import { 
  Upload, Trash2, ArrowLeft, Download, RefreshCw, 
  RotateCw, Plus, FileText, ChevronRight, Lock, Eye, AlertCircle,
  X 
} from 'lucide-react';

// Import processor functions (we'll implement these next)
import { processMerge } from '../tools/merge';
import { processSplit } from '../tools/split';
import { processCompress } from '../tools/compress';
import { processPdfToJpg } from '../tools/pdfToJpg';
import { processJpgToPdf } from '../tools/jpgToPdf';
import { processRotate } from '../tools/rotate';
import { processProtect } from '../tools/protect';
import { processUnlock } from '../tools/unlock';
import { processWatermark } from '../tools/watermark';
import { processPageNumbers } from '../tools/pageNumbers';
import { processOrganize } from '../tools/organize';
import { processWordToPdf } from '../tools/wordToPdf';
import { processExcelToPdf } from '../tools/excelToPdf';
import { processPdfToWord } from '../tools/pdfToWord';
import { processPdfToExcel } from '../tools/pdfToExcel';
import {
  processRemovePages, processScanToPdf, processRepair, processOcr,
  processPptToPdf, processPdfToPpt, processHtmlToPdf, processPdfa,
  processCropPdf, processEditPdf, processSignPdf, processRedactPdf,
  processComparePdf, processAiSummarize, processTranslatePdf
} from '../tools/additionalTools';

// Import PDF.js for visual page previews
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs`;

import { BannerAd160x300, NativeAdBanner } from './Ads';

interface ToolWrapperProps {
  toolConfig: ToolConfig;
  setCurrentTool: (toolId: null) => void;
}

const SignaturePad: React.FC<{ onSave: (dataUrl: string) => void }> = ({ onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    onSave(canvas.toDataURL());
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onSave('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <canvas
        ref={canvasRef}
        width={250}
        height={100}
        style={{ border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: '#ffffff', cursor: 'crosshair' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <button 
        type="button"
        onClick={clearCanvas} 
        style={{
          alignSelf: 'flex-start',
          padding: '0.35rem 0.65rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          border: '1px solid var(--border-color)',
          borderRadius: '4px',
          backgroundColor: 'var(--light-bg)',
          color: 'var(--text-main)',
          cursor: 'pointer'
        }}
      >
        Clear Signature
      </button>
    </div>
  );
};

interface UploadedFileInfo {
  file: File;
  previewUrl?: string;
  pageCount?: number;
  rotation?: number; // visual rotate
  pdfDoc?: any;
  pagesList?: number[]; // list of pages (for organize)
}

export const ToolWrapper: React.FC<ToolWrapperProps> = ({ toolConfig, setCurrentTool }) => {
  const [stage, setStage] = useState<Stage>('upload');
  const [files, setFiles] = useState<UploadedFileInfo[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Success details
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputFileName, setOutputFileName] = useState('');
  const [outputSize, setOutputSize] = useState(0);

  // Tool specific configuration states
  const [splitRanges, setSplitRanges] = useState('1-3');
  const [splitMode, setSplitMode] = useState<'ranges' | 'all'>('ranges');
  const [compressLevel, setCompressLevel] = useState<'recommended' | 'extreme' | 'low'>('recommended');
  const [jpgToPdfLayout, setJpgToPdfLayout] = useState<{
    orientation: 'portrait' | 'landscape';
    pageSize: 'a4' | 'letter' | 'fit';
    margin: 'none' | 'small' | 'big';
  }>({ orientation: 'portrait', pageSize: 'a4', margin: 'none' });
  const [protectPassword, setProtectPassword] = useState('');
  const [unlockPassword, setUnlockPassword] = useState('');
  const [watermarkText, setWatermarkText] = useState('Student PDF');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [watermarkPosition, setWatermarkPosition] = useState<'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('center');
  const [pageNumberPosition, setPageNumberPosition] = useState<'bottom-center' | 'bottom-right' | 'top-center' | 'top-right'>('bottom-right');
  const [pageNumberStart, setPageNumberStart] = useState(1);
  const [pageNumberFormat, setPageNumberFormat] = useState<'n' | 'n-of-m'>('n');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate previews for PDF files using PDF.js
  const generatePdfPreviews = async (fileInfo: UploadedFileInfo): Promise<UploadedFileInfo> => {
    if (fileInfo.file.type !== 'application/pdf') return fileInfo;

    try {
      const fileReader = new FileReader();
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);
        fileReader.onerror = reject;
        fileReader.readAsArrayBuffer(fileInfo.file);
      });

      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;

      // Render first page as thumbnail
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.3 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      if (context) {
        await page.render({ canvasContext: context, viewport } as any).promise;
        const previewUrl = canvas.toDataURL();
        
        // Populate custom pagesList array [1, 2, ..., pageCount] for organizer
        const pagesList = Array.from({ length: pageCount }, (_, i) => i + 1);

        return {
          ...fileInfo,
          previewUrl,
          pageCount,
          pagesList,
          rotation: 0
        };
      }
    } catch (err) {
      console.error('Error generating preview:', err);
    }
    return fileInfo;
  };

  const processUploadedFiles = async (uploadedFiles: FileList) => {
    setErrorMsg(null);
    const validTypes = getAcceptedTypes();
    const list: UploadedFileInfo[] = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const f = uploadedFiles[i];
      const extension = f.name.substring(f.name.lastIndexOf('.')).toLowerCase();
      
      // Basic check
      if (validTypes.length > 0 && !validTypes.includes(f.type) && !validTypes.includes(extension)) {
        setErrorMsg(`Unsupported file: ${f.name}. Acceptable format: ${validTypes.join(', ')}`);
        return;
      }
      list.push({ file: f });
    }

    setStage('config');
    setFiles(list);

    // Asynchronously generate previews
    const updatedList = await Promise.all(list.map(f => generatePdfPreviews(f)));
    setFiles(updatedList);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFiles(e.dataTransfer.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const nextFiles = [...files];
    nextFiles.splice(index, 1);
    setFiles(nextFiles);
    if (nextFiles.length === 0) {
      setStage('upload');
    }
  };

  const handleRotateFile = (index: number) => {
    const nextFiles = [...files];
    const currentRot = nextFiles[index].rotation || 0;
    nextFiles[index].rotation = (currentRot + 90) % 360;
    setFiles(nextFiles);
  };

  const handleOrganizeDeletePage = (fileIndex: number, pageIndexInList: number) => {
    const nextFiles = [...files];
    if (nextFiles[fileIndex].pagesList) {
      const nextPages = [...(nextFiles[fileIndex].pagesList || [])];
      nextPages.splice(pageIndexInList, 1);
      nextFiles[fileIndex].pagesList = nextPages;
      setFiles(nextFiles);
    }
  };

  const getAcceptedTypes = () => {
    switch (toolConfig.id) {
      case 'word-to-pdf':
        return ['.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      case 'excel-to-pdf':
        return ['.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      case 'powerpoint-to-pdf':
        return ['.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
      case 'jpg-to-pdf':
      case 'scan-to-pdf':
        return ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
      case 'html-to-pdf':
        return ['.html', '.txt', 'text/html', 'text/plain'];
      default:
        return ['application/pdf'];
    }
  };

  const getAcceptedTypesString = () => {
    switch (toolConfig.id) {
      case 'word-to-pdf':
        return 'Word Document (.docx)';
      case 'excel-to-pdf':
        return 'Excel Spreadsheet (.xlsx)';
      case 'powerpoint-to-pdf':
        return 'PowerPoint Slideshow (.pptx)';
      case 'jpg-to-pdf':
      case 'scan-to-pdf':
        return 'Images (JPG, PNG, GIF, BMP)';
      case 'html-to-pdf':
        return 'HTML or Text Document (.html, .txt)';
      default:
        return 'PDF Files';
    }
  };

  const isMultiFileSupported = () => {
    return ['merge', 'jpg-to-pdf', 'scan-to-pdf', 'compare'].includes(toolConfig.id);
  };

  // Run the core PDF rendering and processing engines
  const handleProcess = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setStage('processing');
    setProgress(10);
    setErrorMsg(null);

    try {
      // Step-by-step state simulator
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressTimer);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      // Perform processing based on tool ID
      let resultBlob: Blob;
      let outName = '';

      const mainFile = files[0].file;
      const fileBuffers = await Promise.all(
        files.map(async (f) => {
          const buffer = await f.file.arrayBuffer();
          return { name: f.file.name, size: f.file.size, data: buffer, rotation: f.rotation };
        })
      );

      switch (toolConfig.id) {
        case 'merge':
          resultBlob = await processMerge(fileBuffers);
          outName = 'student_merged.pdf';
          break;
        case 'split':
          resultBlob = await processSplit(fileBuffers[0], { mode: splitMode, ranges: splitRanges });
          outName = splitMode === 'all' ? 'student_split_pages.zip' : 'student_split.pdf';
          break;
        case 'compress':
          resultBlob = await processCompress(fileBuffers[0], compressLevel);
          outName = `student_${mainFile.name.replace('.pdf', '')}_compressed.pdf`;
          break;
        case 'pdf-to-jpg':
          resultBlob = await processPdfToJpg(mainFile);
          outName = `student_${mainFile.name.replace('.pdf', '')}_images.zip`;
          break;
        case 'jpg-to-pdf':
          resultBlob = await processJpgToPdf(fileBuffers, jpgToPdfLayout);
          outName = 'student_images.pdf';
          break;
        case 'rotate':
          resultBlob = await processRotate(fileBuffers[0], files.map(f => f.rotation || 0));
          outName = `student_${mainFile.name.replace('.pdf', '')}_rotated.pdf`;
          break;
        case 'protect':
          if (!protectPassword) throw new Error('Please enter a protection password.');
          resultBlob = await processProtect(fileBuffers[0], protectPassword);
          outName = `student_${mainFile.name.replace('.pdf', '')}_protected.pdf`;
          break;
        case 'unlock':
          resultBlob = await processUnlock(fileBuffers[0], unlockPassword);
          outName = `student_${mainFile.name.replace('.pdf', '')}_unlocked.pdf`;
          break;
        case 'watermark':
          resultBlob = await processWatermark(fileBuffers[0], {
            text: watermarkText,
            opacity: watermarkOpacity,
            position: watermarkPosition
          });
          outName = `student_${mainFile.name.replace('.pdf', '')}_watermark.pdf`;
          break;
        case 'page-numbers':
          resultBlob = await processPageNumbers(fileBuffers[0], {
            startNumber: pageNumberStart,
            position: pageNumberPosition,
            format: pageNumberFormat
          });
          outName = `student_${mainFile.name.replace('.pdf', '')}_numbered.pdf`;
          break;
        case 'organize':
          // Pass the customized page list representing visual grid layout modifications
          const pagesOrder = files[0].pagesList || [];
          if (pagesOrder.length === 0) throw new Error('No pages left. Please add pages.');
          resultBlob = await processOrganize(fileBuffers[0], pagesOrder);
          outName = `student_${mainFile.name.replace('.pdf', '')}_organized.pdf`;
          break;
        case 'word-to-pdf':
          resultBlob = await processWordToPdf(fileBuffers[0]);
          outName = `${mainFile.name.replace('.docx', '')}_converted.pdf`;
          break;
        case 'excel-to-pdf':
          resultBlob = await processExcelToPdf(fileBuffers[0]);
          outName = `${mainFile.name.replace('.xlsx', '')}_converted.pdf`;
          break;
        case 'pdf-to-word':
          resultBlob = await processPdfToWord(mainFile);
          outName = `${mainFile.name.replace('.pdf', '')}_editable.docx`;
          break;
        case 'pdf-to-excel':
          resultBlob = await processPdfToExcel(mainFile);
          outName = `${mainFile.name.replace('.pdf', '')}_sheets.xlsx`;
          break;
        case 'remove-pages':
          resultBlob = await processRemovePages(fileBuffers[0], splitRanges);
          outName = `student_${mainFile.name.replace('.pdf', '')}_removed.pdf`;
          break;
        case 'extract-pages':
          resultBlob = await processSplit(fileBuffers[0], { mode: 'ranges', ranges: splitRanges });
          outName = `student_${mainFile.name.replace('.pdf', '')}_extracted.pdf`;
          break;
        case 'scan-to-pdf':
          resultBlob = await processScanToPdf(fileBuffers);
          outName = 'student_scan.pdf';
          break;
        case 'repair':
          resultBlob = await processRepair(fileBuffers[0]);
          outName = `student_${mainFile.name.replace('.pdf', '')}_repaired.pdf`;
          break;
        case 'ocr':
          resultBlob = await processOcr(mainFile);
          outName = `student_${mainFile.name.replace('.pdf', '')}_ocr.txt`;
          break;
        case 'powerpoint-to-pdf':
          resultBlob = await processPptToPdf(mainFile);
          outName = `${mainFile.name.replace('.pptx', '')}_converted.pdf`;
          break;
        case 'pdf-to-powerpoint':
          resultBlob = await processPdfToPpt(mainFile);
          outName = `${mainFile.name.replace('.pdf', '')}_presentation.ppt`;
          break;
        case 'html-to-pdf':
          resultBlob = await processHtmlToPdf(watermarkText);
          outName = 'student_html.pdf';
          break;
        case 'pdf-to-pdfa':
          resultBlob = await processPdfa(fileBuffers[0]);
          outName = `student_${mainFile.name.replace('.pdf', '')}_pdfa.pdf`;
          break;
        case 'crop':
          resultBlob = await processCropPdf(fileBuffers[0]);
          outName = `student_${mainFile.name.replace('.pdf', '')}_cropped.pdf`;
          break;
        case 'edit-pdf':
          resultBlob = await processEditPdf(fileBuffers[0], watermarkText);
          outName = `student_${mainFile.name.replace('.pdf', '')}_edited.pdf`;
          break;
        case 'pdf-forms':
          resultBlob = await processEditPdf(fileBuffers[0], watermarkText);
          outName = `student_${mainFile.name.replace('.pdf', '')}_formfilled.pdf`;
          break;
        case 'sign':
          resultBlob = await processSignPdf(fileBuffers[0], watermarkText);
          outName = `student_${mainFile.name.replace('.pdf', '')}_signed.pdf`;
          break;
        case 'redact':
          resultBlob = await processRedactPdf(fileBuffers[0]);
          outName = `student_${mainFile.name.replace('.pdf', '')}_redacted.pdf`;
          break;
        case 'compare':
          if (fileBuffers.length < 2) throw new Error('Please upload 2 PDF files to compare.');
          resultBlob = await processComparePdf(fileBuffers[0], fileBuffers[1]);
          outName = 'student_comparison_report.txt';
          break;
        case 'ai-summarizer':
          resultBlob = await processAiSummarize(mainFile);
          outName = `${mainFile.name.replace('.pdf', '')}_summary.md`;
          break;
        case 'translate':
          resultBlob = await processTranslatePdf(mainFile, protectPassword);
          outName = `${mainFile.name.replace('.pdf', '')}_translated.txt`;
          break;
        default:
          throw new Error('Unsupported tool.');
      }

      clearInterval(progressTimer);
      setProgress(100);
      
      // Delay slightly for smooth transition
      setTimeout(() => {
        setOutputBlob(resultBlob);
        setOutputFileName(outName);
        setOutputSize(resultBlob.size);
        setStage('success');
        setIsProcessing(false);
      }, 500);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during file processing. Please try again.');
      setStage('config');
      setIsProcessing(false);
    }
  };

  const triggerDownload = () => {
    if (!outputBlob) return;
    const url = URL.createObjectURL(outputBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = outputFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFiles([]);
    setOutputBlob(null);
    setOutputFileName('');
    setOutputSize(0);
    setProgress(0);
    setErrorMsg(null);
    setStage('upload');
  };

  useEffect(() => {
    handleReset();
  }, [toolConfig.id]);

  const renderConfigOptions = () => {
    switch (toolConfig.id) {
      case 'merge':
        return (
          <div className="options-content">
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Arrange files in the order you want them merged by checking thumbnails. Drag-and-drop order is preserved.
            </p>
          </div>
        );
      
      case 'split':
        return (
          <div className="options-content">
            <div className="option-group">
              <span className="option-label">Split Mode</span>
              <div className="option-radio-group">
                <div 
                  className={`option-radio ${splitMode === 'ranges' ? 'active' : ''}`}
                  onClick={() => setSplitMode('ranges')}
                >
                  Split by Ranges
                </div>
                <div 
                  className={`option-radio ${splitMode === 'all' ? 'active' : ''}`}
                  onClick={() => setSplitMode('all')}
                >
                  Extract All Pages (Individual PDFs)
                </div>
              </div>
            </div>
            {splitMode === 'ranges' && (
              <div className="option-group">
                <label className="option-label">Page Ranges</label>
                <input 
                  type="text" 
                  value={splitRanges} 
                  onChange={(e) => setSplitRanges(e.target.value)} 
                  placeholder="e.g. 1-3, 5, 8-10" 
                  className="option-input"
                />
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Use commas to separate ranges. E.g. "1-4, 7" will merge page 1-4 and page 7.
                </span>
              </div>
            )}
          </div>
        );

      case 'remove-pages':
      case 'extract-pages':
        return (
          <div className="options-content">
            <div className="option-group">
              <label className="option-label">Page Ranges</label>
              <input 
                type="text" 
                value={splitRanges} 
                onChange={(e) => setSplitRanges(e.target.value)} 
                placeholder="e.g. 1-3, 5, 8-10" 
                className="option-input"
              />
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Specify page numbers or ranges (e.g. "1-4, 7") to {toolConfig.id === 'remove-pages' ? 'remove' : 'extract'}.
              </span>
            </div>
          </div>
        );

      case 'compress':
        return (
          <div className="options-content">
            <div className="option-group">
              <span className="option-label">Compression Level</span>
              <div className="option-radio-group">
                <div 
                  className={`option-radio ${compressLevel === 'extreme' ? 'active' : ''}`}
                  onClick={() => setCompressLevel('extreme')}
                >
                  <div style={{ fontWeight: 700 }}>Extreme Compression</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Less quality, high file reduction</div>
                </div>
                <div 
                  className={`option-radio ${compressLevel === 'recommended' ? 'active' : ''}`}
                  onClick={() => setCompressLevel('recommended')}
                >
                  <div style={{ fontWeight: 700 }}>Recommended Compression</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Good quality and compression</div>
                </div>
                <div 
                  className={`option-radio ${compressLevel === 'low' ? 'active' : ''}`}
                  onClick={() => setCompressLevel('low')}
                >
                  <div style={{ fontWeight: 700 }}>Low Compression</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>High quality, less compression</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'jpg-to-pdf':
        return (
          <div className="options-content">
            <div className="option-group">
              <label className="option-label">Page Orientation</label>
              <select 
                value={jpgToPdfLayout.orientation}
                onChange={(e: any) => setJpgToPdfLayout({ ...jpgToPdfLayout, orientation: e.target.value })}
                className="option-input"
              >
                <option value="portrait">Portrait (Vertical)</option>
                <option value="landscape">Landscape (Horizontal)</option>
              </select>
            </div>
            <div className="option-group">
              <label className="option-label">Page Size</label>
              <select 
                value={jpgToPdfLayout.pageSize}
                onChange={(e: any) => setJpgToPdfLayout({ ...jpgToPdfLayout, pageSize: e.target.value })}
                className="option-input"
              >
                <option value="a4">A4 (210 x 297 mm)</option>
                <option value="letter">US Letter (8.5 x 11 in)</option>
                <option value="fit">Fit (Same size as image)</option>
              </select>
            </div>
            <div className="option-group">
              <label className="option-label">Margin</label>
              <select 
                value={jpgToPdfLayout.margin}
                onChange={(e: any) => setJpgToPdfLayout({ ...jpgToPdfLayout, margin: e.target.value })}
                className="option-input"
              >
                <option value="none">No Margin</option>
                <option value="small">Small Margin</option>
                <option value="big">Big Margin</option>
              </select>
            </div>
          </div>
        );

      case 'rotate':
        return (
          <div className="options-content">
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Hover over pages in the workspace and click the rotation button to turn individual pages by 90°.
            </p>
            <button
              onClick={() => {
                const next = files.map(f => ({ ...f, rotation: ((f.rotation || 0) + 90) % 360 }));
                setFiles(next);
              }}
              style={{
                width: '100%',
                padding: '0.6rem',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: '#ffffff'
              }}
            >
              Rotate All Pages
            </button>
          </div>
        );

      case 'protect':
        return (
          <div className="options-content">
            <div className="option-group">
              <label className="option-label">Password Protection</label>
              <input 
                type="password" 
                value={protectPassword} 
                onChange={(e) => setProtectPassword(e.target.value)} 
                placeholder="Enter password..." 
                className="option-input"
              />
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Note: Remember this password. Without it, you cannot reopen the PDF.
              </span>
            </div>
          </div>
        );

      case 'unlock':
        return (
          <div className="options-content">
            <div className="option-group">
              <label className="option-label">Document Password</label>
              <input 
                type="password" 
                value={unlockPassword} 
                onChange={(e) => setUnlockPassword(e.target.value)} 
                placeholder="Enter decryption password..." 
                className="option-input"
              />
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                If the document is encrypted, input the correct password to unlock and strip permissions.
              </span>
            </div>
          </div>
        );

      case 'watermark':
        return (
          <div className="options-content">
            <div className="option-group">
              <label className="option-label">Watermark Text</label>
              <input 
                type="text" 
                value={watermarkText} 
                onChange={(e) => setWatermarkText(e.target.value)} 
                placeholder="e.g. COPYRIGHT" 
                className="option-input"
              />
            </div>
            <div className="option-group">
              <label className="option-label">Opacity ({Math.round(watermarkOpacity * 100)}%)</label>
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.05"
                value={watermarkOpacity} 
                onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))} 
                style={{ accentColor: '#e52d27' }}
              />
            </div>
            <div className="option-group">
              <label className="option-label">Position</label>
              <select 
                value={watermarkPosition}
                onChange={(e: any) => setWatermarkPosition(e.target.value)}
                className="option-input"
              >
                <option value="center">Center Diagonal</option>
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>
          </div>
        );

      case 'page-numbers':
        return (
          <div className="options-content">
            <div className="option-group">
              <label className="option-label">Starting Page Number</label>
              <input 
                type="number" 
                value={pageNumberStart} 
                onChange={(e) => setPageNumberStart(parseInt(e.target.value) || 1)} 
                className="option-input"
              />
            </div>
            <div className="option-group">
              <label className="option-label">Number Position</label>
              <select 
                value={pageNumberPosition}
                onChange={(e: any) => setPageNumberPosition(e.target.value)}
                className="option-input"
              >
                <option value="bottom-right">Bottom Right (Standard)</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="top-right">Top Right</option>
                <option value="top-center">Top Center</option>
              </select>
            </div>
            <div className="option-group">
              <label className="option-label">Layout Format</label>
              <select 
                value={pageNumberFormat}
                onChange={(e: any) => setPageNumberFormat(e.target.value)}
                className="option-input"
              >
                <option value="n">Simple Number (e.g. 1)</option>
                <option value="n-of-m">Numbered (e.g. Page 1 of 12)</option>
              </select>
            </div>
          </div>
        );

      case 'organize':
        return (
          <div className="options-content">
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Delete unnecessary pages by clicking the red X badge on thumbnails. You can also reorder pages (engine compiles lists).
            </p>
          </div>
        );

      case 'html-to-pdf':
        return (
          <div className="options-content">
            <div className="option-group">
              <label className="option-label">HTML or Plain Text Code</label>
              <textarea 
                value={watermarkText} 
                onChange={(e) => setWatermarkText(e.target.value)} 
                placeholder="Type or paste your HTML here..." 
                className="option-input"
                style={{ height: '200px', fontFamily: 'monospace' }}
              />
            </div>
          </div>
        );

      case 'edit-pdf':
      case 'pdf-forms':
        return (
          <div className="options-content">
            <div className="option-group">
              <label className="option-label">Text Annotation / Form Text</label>
              <input 
                type="text" 
                value={watermarkText} 
                onChange={(e) => setWatermarkText(e.target.value)} 
                placeholder="Type text to add/fill..." 
                className="option-input"
              />
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                This text will be stamped or filled onto the document.
              </span>
            </div>
          </div>
        );

      case 'sign':
        return (
          <div className="options-content">
            <div className="option-group">
              <label className="option-label">Draw Your Signature</label>
              <SignaturePad onSave={(dataUrl) => setWatermarkText(dataUrl)} />
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Draw your signature in the box above. It will be stamped onto the document.
              </span>
            </div>
          </div>
        );

      case 'translate':
        return (
          <div className="options-content">
            <div className="option-group">
              <label className="option-label">Translate Target Language</label>
              <select 
                value={protectPassword || 'Spanish'} 
                onChange={(e) => setProtectPassword(e.target.value)} 
                className="option-input"
              >
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Hindi">Hindi</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
              </select>
            </div>
          </div>
        );

      case 'compare':
        return (
          <div className="options-content">
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Compare two PDF documents side-by-side. The comparison report will summarize file details and structural differences.
            </p>
          </div>
        );

      case 'word-to-pdf':
      case 'excel-to-pdf':
      case 'pdf-to-word':
      case 'pdf-to-excel':
      default:
        return (
          <div className="options-content">
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              No extra configuration needed. Ready for client-side document processing and conversion.
            </p>
          </div>
        );
    }
  };

  const getFormatIcon = (filename: string) => {
    const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
    if (ext === '.docx' || ext === '.doc') return <FileText size={48} color="#2b579a" />;
    if (ext === '.xlsx' || ext === '.xls') return <FileText size={48} color="#1f7244" />;
    if (ext === '.pdf') return <span style={{ fontSize: '3rem' }}>📄</span>;
    return <span style={{ fontSize: '3rem' }}>🖼️</span>;
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="workspace-container">
      {/* Back Button */}
      <button 
        onClick={() => setCurrentTool(null)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: 'none',
          background: 'none',
          fontSize: '0.9rem',
          fontWeight: 700,
          color: '#e52d27',
          cursor: 'pointer',
          marginBottom: '1.5rem',
          padding: '0.5rem 0'
        }}
      >
        <ArrowLeft size={16} /> Back to dashboard
      </button>

      {/* Workspace Header */}
      <div className="workspace-header">
        <h1 className="workspace-header-title">Student {toolConfig.title}</h1>
        <p className="workspace-header-desc">{toolConfig.desc}</p>
      </div>

      {errorMsg && (
        <div style={{
          backgroundColor: '#fff5f5',
          border: '1px solid #feb2b2',
          color: '#c53030',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.9rem'
        }}>
          <AlertCircle size={20} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STAGE 1: UPLOAD */}
      {stage === 'upload' && (
        <div 
          className={`upload-dropzone ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            multiple={isMultiFileSupported()} 
            accept={getAcceptedTypes().join(',')}
            style={{ display: 'none' }}
          />
          <div className="upload-icon">📤</div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Drag & drop your files here</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>or click to browse files from your computer</p>
          <button className="upload-btn">
            Select {getAcceptedTypesString()}
          </button>
        </div>
      )}

      {/* STAGE 2: CONFIGURATION */}
      {stage === 'config' && (
        <div className="workspace-workspace">
          {/* Main Preview workspace */}
          <div className="files-preview-area">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Uploaded files ({files.length})</h3>
              {isMultiFileSupported() && (
                <button
                  onClick={triggerFileInput}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} /> Add more files
                </button>
              )}
            </div>

            {/* If Organize, show page grid directly */}
            {toolConfig.id === 'organize' && files[0] && files[0].pagesList ? (
              <div className="file-preview-grid">
                {files[0].pagesList.map((pageNum, idx) => (
                  <div key={idx} className="preview-card">
                    <button 
                      className="preview-card-delete"
                      onClick={() => handleOrganizeDeletePage(0, idx)}
                    >
                      <X size={12} />
                    </button>
                    <div className="preview-thumbnail">
                      {files[0].previewUrl ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span style={{ fontSize: '2.5rem' }}>📄</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Page {pageNum}</span>
                        </div>
                      ) : (
                        <span>Page {pageNum}</span>
                      )}
                    </div>
                    <span className="preview-filename">Page {pageNum}</span>
                  </div>
                ))}
              </div>
            ) : (
              /* Normal File list grid */
              <div className="file-preview-grid">
                {files.map((fileInfo, idx) => (
                  <div key={idx} className="preview-card">
                    <button 
                      className="preview-card-delete"
                      onClick={() => removeFile(idx)}
                    >
                      <X size={12} />
                    </button>
                    <div className="preview-thumbnail">
                      {fileInfo.previewUrl ? (
                        <img 
                          src={fileInfo.previewUrl} 
                          alt="preview" 
                          style={{ transform: `rotate(${fileInfo.rotation || 0}deg)` }}
                        />
                      ) : (
                        getFormatIcon(fileInfo.file.name)
                      )}
                    </div>
                    <span className="preview-filename">{fileInfo.file.name}</span>
                    <span className="preview-filesize">{formatBytes(fileInfo.file.size)}</span>
                    {toolConfig.id === 'rotate' && (
                      <button 
                        className="rotate-thumbnail-btn"
                        onClick={() => handleRotateFile(idx)}
                        title="Rotate Page 90°"
                      >
                        <RotateCw size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Configuration panel */}
          <div className="options-panel">
            <div>
              <h3 className="options-title">Configuration Options</h3>
              {renderConfigOptions()}
            </div>
            
            <button 
              className="option-action-btn"
              onClick={handleProcess}
              disabled={isProcessing}
            >
              🚀 Process to PDF <ChevronRight size={18} />
            </button>
            <BannerAd160x300 />
          </div>
        </div>
      )}

      {/* STAGE 3: PROCESSING */}
      {stage === 'processing' && (
        <div className="processing-container">
          <div className="spinner"></div>
          <h2 className="processing-title">Processing your files...</h2>
          <p className="processing-desc">
            Please wait. We are converting and compiling your document fully client-side. {progress}%
          </p>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            height: '6px',
            backgroundColor: '#e2e8f0',
            borderRadius: '10px',
            marginTop: '2rem',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#e52d27',
              transition: 'width 0.2s ease-0-out'
            }}></div>
          </div>
        </div>
      )}

      {/* STAGE 4: SUCCESS / DOWNLOAD */}
      {stage === 'success' && (
        <div className="success-container">
          <div className="success-badge">✓</div>
          <h1 className="download-title">Document processed successfully!</h1>
          <p className="download-info">
            File name: <strong>{outputFileName}</strong> ({formatBytes(outputSize)})
          </p>
          
          <div className="download-btn-wrapper">
            <button 
              className="download-large-btn"
              onClick={triggerDownload}
            >
              <Download size={24} /> Download PDF
            </button>
            
            <div className="success-actions">
              <button 
                className="secondary-action-btn"
                onClick={handleReset}
              >
                <RefreshCw size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} /> Do another file
              </button>
              <button 
                className="secondary-action-btn"
                onClick={() => setCurrentTool(null)}
              >
                Back to dashboard
              </button>
            </div>
          </div>
        </div>
      )}
      <NativeAdBanner />
    </div>
  );
};
