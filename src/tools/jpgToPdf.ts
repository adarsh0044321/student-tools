import { PDFDocument, PageSizes } from 'pdf-lib';

interface JpgToPdfLayout {
  orientation: 'portrait' | 'landscape';
  pageSize: 'a4' | 'letter' | 'fit';
  margin: 'none' | 'small' | 'big';
}

export const processJpgToPdf = async (
  files: Array<{ data: ArrayBuffer; name: string }>,
  layout: JpgToPdfLayout
): Promise<Blob> => {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    let imageObj;
    
    try {
      if (ext === '.png') {
        imageObj = await pdfDoc.embedPng(file.data);
      } else {
        // default to JPEG embed
        imageObj = await pdfDoc.embedJpg(file.data);
      }
    } catch (err) {
      console.warn('Embedding PNG failed, attempting JPG fallback:', err);
      // Fallback for custom image formats/headers
      imageObj = await pdfDoc.embedJpg(file.data);
    }

    const { width, height } = imageObj.scale(1.0);
    
    // Page Dims
    let pageWidth = width;
    let pageHeight = height;

    if (layout.pageSize === 'a4') {
      pageWidth = layout.orientation === 'portrait' ? PageSizes.A4[0] : PageSizes.A4[1];
      pageHeight = layout.orientation === 'portrait' ? PageSizes.A4[1] : PageSizes.A4[0];
    } else if (layout.pageSize === 'letter') {
      pageWidth = layout.orientation === 'portrait' ? PageSizes.Letter[0] : PageSizes.Letter[1];
      pageHeight = layout.orientation === 'portrait' ? PageSizes.Letter[1] : PageSizes.Letter[0];
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Margins
    let marginSize = 0;
    if (layout.margin === 'small') marginSize = 20;
    else if (layout.margin === 'big') marginSize = 40;

    const printableWidth = pageWidth - marginSize * 2;
    const printableHeight = pageHeight - marginSize * 2;

    const scaleFactor = Math.min(printableWidth / width, printableHeight / height);
    const drawWidth = width * scaleFactor;
    const drawHeight = height * scaleFactor;

    const drawX = marginSize + (printableWidth - drawWidth) / 2;
    const drawY = marginSize + (printableHeight - drawHeight) / 2;

    page.drawImage(imageObj, {
      x: drawX,
      y: drawY,
      width: drawWidth,
      height: drawHeight
    });
  }

  const outputBytes = await pdfDoc.save();
  return new Blob([outputBytes] as any, { type: 'application/pdf' });
};
