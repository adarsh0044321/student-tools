import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

interface WatermarkOptions {
  text: string;
  opacity: number;
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const processWatermark = async (
  file: { data: ArrayBuffer },
  options: WatermarkOptions
): Promise<Blob> => {
  try {
    const pdfDoc = await PDFDocument.load(file.data);
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    for (const page of pages) {
      const { width, height } = page.getSize();
      const fontSize = 48;
      const textWidth = font.widthOfTextAtSize(options.text, fontSize);
      
      let x = 0;
      let y = 0;
      let rotation = 0;

      switch (options.position) {
        case 'center':
          // Center page with 45-degree angle
          x = (width - textWidth) / 2;
          y = (height - fontSize) / 2;
          rotation = 45;
          break;
        case 'top-left':
          x = 40;
          y = height - 80;
          break;
        case 'top-right':
          x = width - textWidth - 40;
          y = height - 80;
          break;
        case 'bottom-left':
          x = 40;
          y = 60;
          break;
        case 'bottom-right':
          x = width - textWidth - 40;
          y = 60;
          break;
        default:
          x = (width - textWidth) / 2;
          y = (height - fontSize) / 2;
      }

      page.drawText(options.text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0.85, 0.15, 0.15), // Crimson primary color
        opacity: options.opacity,
        rotate: degrees(rotation)
      });
    }

    const outputBytes = await pdfDoc.save();
    return new Blob([outputBytes] as any, { type: 'application/pdf' });
  } catch (err: any) {
    console.error('Error watermarking PDF:', err);
    throw new Error(`Failed to apply watermark: ${err.message || err}`);
  }
};
