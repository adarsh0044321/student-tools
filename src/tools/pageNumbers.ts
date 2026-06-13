import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface PageNumberOptions {
  startNumber: number;
  position: 'bottom-center' | 'bottom-right' | 'top-center' | 'top-right';
  format: 'n' | 'n-of-m';
}

export const processPageNumbers = async (
  file: { data: ArrayBuffer },
  options: PageNumberOptions
): Promise<Blob> => {
  try {
    const pdfDoc = await PDFDocument.load(file.data);
    const pages = pdfDoc.getPages();
    const totalPages = pages.length;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    for (let i = 0; i < totalPages; i++) {
      const page = pages[i];
      const pageNum = options.startNumber + i;
      const text = options.format === 'n-of-m' ? `Page ${pageNum} of ${totalPages}` : `${pageNum}`;
      
      const { width, height } = page.getSize();
      const fontSize = 10;
      const textWidth = font.widthOfTextAtSize(text, fontSize);

      let x = 0;
      let y = 0;

      switch (options.position) {
        case 'bottom-right':
          x = width - textWidth - 40;
          y = 30;
          break;
        case 'bottom-center':
          x = (width - textWidth) / 2;
          y = 30;
          break;
        case 'top-right':
          x = width - textWidth - 40;
          y = height - 40;
          break;
        case 'top-center':
          x = (width - textWidth) / 2;
          y = height - 40;
          break;
        default:
          x = width - textWidth - 40;
          y = 30;
      }

      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0.3, 0.35, 0.4) // Charcoal color
      });
    }

    const outputBytes = await pdfDoc.save();
    return new Blob([outputBytes] as any, { type: 'application/pdf' });
  } catch (err: any) {
    console.error('Error adding page numbers:', err);
    throw new Error(`Failed to add page numbers: ${err.message || err}`);
  }
};
