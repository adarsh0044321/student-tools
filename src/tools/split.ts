import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

interface SplitOptions {
  mode: 'ranges' | 'all';
  ranges: string;
}

export const processSplit = async (
  file: { data: ArrayBuffer; name: string },
  options: SplitOptions
): Promise<Blob> => {
  const sourcePdf = await PDFDocument.load(file.data);
  const totalPages = sourcePdf.getPageCount();

  if (options.mode === 'all') {
    const zip = new JSZip();
    
    for (let i = 0; i < totalPages; i++) {
      const singlePdf = await PDFDocument.create();
      const [copiedPage] = await singlePdf.copyPages(sourcePdf, [i]);
      singlePdf.addPage(copiedPage);
      
      const bytes = await singlePdf.save();
      zip.file(`page_${i + 1}.pdf`, bytes);
    }
    
    return await zip.generateAsync({ type: 'blob' });
  }

  // Parse page ranges (e.g. 1-3, 5, 8-10)
  const targetIndices: number[] = [];
  const parts = options.ranges.split(',');
  
  for (const part of parts) {
    const clean = part.trim();
    if (!clean) continue;

    if (clean.includes('-')) {
      const [startStr, endStr] = clean.split('-');
      const start = parseInt(startStr);
      const end = parseInt(endStr);
      
      if (isNaN(start) || isNaN(end) || start < 1 || end > totalPages || start > end) {
        throw new Error(`Invalid range format or page numbers out of bounds: "${clean}". Total pages: ${totalPages}`);
      }
      
      for (let i = start; i <= end; i++) {
        targetIndices.push(i - 1);
      }
    } else {
      const pageNum = parseInt(clean);
      if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
        throw new Error(`Invalid page number or page out of bounds: "${clean}". Total pages: ${totalPages}`);
      }
      targetIndices.push(pageNum - 1);
    }
  }

  if (targetIndices.length === 0) {
    throw new Error('Please specify valid page ranges to split.');
  }

  const outputPdf = await PDFDocument.create();
  const copiedPages = await outputPdf.copyPages(sourcePdf, targetIndices);
  copiedPages.forEach((page) => outputPdf.addPage(page));

  const outputBytes = await outputPdf.save();
  return new Blob([outputBytes] as any, { type: 'application/pdf' });
};
