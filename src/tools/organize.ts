import { PDFDocument } from 'pdf-lib';

export const processOrganize = async (
  file: { data: ArrayBuffer },
  pagesOrder: number[]
): Promise<Blob> => {
  try {
    const sourcePdf = await PDFDocument.load(file.data);
    const targetPdf = await PDFDocument.create();

    // pagesOrder is a list of 1-based page numbers (e.g. [1, 2, 4, 3])
    // Map them to 0-based index parameters
    const indices = pagesOrder.map((p) => p - 1);
    
    const copiedPages = await targetPdf.copyPages(sourcePdf, indices);
    copiedPages.forEach((page) => targetPdf.addPage(page));

    const outputBytes = await targetPdf.save();
    return new Blob([outputBytes] as any, { type: 'application/pdf' });
  } catch (err: any) {
    console.error('Error organizing PDF pages:', err);
    throw new Error(`Failed to organize pages: ${err.message || err}`);
  }
};
