import mammoth from 'mammoth';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export const processWordToPdf = async (file: { data: ArrayBuffer }): Promise<Blob> => {
  try {
    const result = await mammoth.extractRawText({ arrayBuffer: file.data });
    const text = result.value;

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 11;
    const margin = 50;
    const lineHeight = 16;

    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    let y = height - margin;

    const paragraphs = text.split('\n');
    for (const para of paragraphs) {
      const cleanPara = para.trim();
      if (!cleanPara) {
        y -= lineHeight;
        if (y < margin) {
          page = pdfDoc.addPage();
          y = height - margin;
        }
        continue;
      }

      // Wrap text lines
      const words = cleanPara.split(/\s+/);
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testLineWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testLineWidth > width - margin * 2) {
          page.drawText(currentLine, {
            x: margin,
            y,
            size: fontSize,
            font,
            color: rgb(0.1, 0.1, 0.1)
          });
          y -= lineHeight;
          currentLine = word;

          if (y < margin) {
            page = pdfDoc.addPage();
            y = height - margin;
          }
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        page.drawText(currentLine, {
          x: margin,
          y,
          size: fontSize,
          font,
          color: rgb(0.1, 0.1, 0.1)
        });
        y -= lineHeight * 1.5; // paragraph margin spacer

        if (y < margin) {
          page = pdfDoc.addPage();
          y = height - margin;
        }
      }
    }

    const outputBytes = await pdfDoc.save();
    return new Blob([outputBytes] as any, { type: 'application/pdf' });
  } catch (err: any) {
    console.error('Error in Word to PDF conversion:', err);
    throw new Error(`Failed to convert Word to PDF: ${err.message || err}`);
  }
};
