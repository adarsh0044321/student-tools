import { PDFDocument } from 'pdf-lib';

export const processMerge = async (files: Array<{ data: ArrayBuffer }>): Promise<Blob> => {
  if (files.length === 0) {
    throw new Error('No files provided for merging.');
  }

  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    try {
      const pdf = await PDFDocument.load(file.data);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    } catch (err: any) {
      console.error('Error loading file for merge:', err);
      throw new Error(`Failed to load PDF file: ${err.message || err}`);
    }
  }

  const mergedBytes = await mergedPdf.save();
  return new Blob([mergedBytes] as any, { type: 'application/pdf' });
};
