import * as XLSX from 'xlsx';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export const processExcelToPdf = async (file: { data: ArrayBuffer }): Promise<Blob> => {
  try {
    const workbook = XLSX.read(new Uint8Array(file.data), { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 9;
    const margin = 40;
    const rowHeight = 20;

    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    let y = height - margin;

    const colCount = rows.reduce((max, row) => Math.max(max, row.length), 0) || 5;
    const colWidth = (width - margin * 2) / colCount;

    for (const row of rows) {
      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        const value = String(row[colIdx] ?? '');
        const x = margin + colIdx * colWidth;
        
        // draw cell content clipping if too long
        let drawText = value;
        const maxChar = Math.floor(colWidth / 6);
        if (drawText.length > maxChar) {
          drawText = drawText.substring(0, maxChar) + '..';
        }

        page.drawText(drawText, {
          x,
          y: y + 4,
          size: fontSize,
          font,
          color: rgb(0.15, 0.15, 0.15)
        });
      }

      // Draw thin separator borders
      page.drawLine({
        start: { x: margin, y },
        end: { x: width - margin, y },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8)
      });

      y -= rowHeight;
      if (y < margin) {
        page = pdfDoc.addPage();
        y = height - margin;
      }
    }

    const outputBytes = await pdfDoc.save();
    return new Blob([outputBytes] as any, { type: 'application/pdf' });
  } catch (err: any) {
    console.error('Error in Excel to PDF conversion:', err);
    throw new Error(`Failed to convert Excel to PDF: ${err.message || err}`);
  }
};
