import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';

export const processPdfToExcel = async (file: File): Promise<Blob> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;

    const sheetRows: string[][] = [];

    for (let i = 1; i <= totalPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // Group items by similar Y coordinates (lines)
      const linesMap: { [y: number]: any[] } = {};
      for (const item of textContent.items as any[]) {
        const y = Math.round(item.transform[5]);
        let matchedY = y;
        for (const existingY of Object.keys(linesMap).map(Number)) {
          if (Math.abs(existingY - y) <= 4) {
            matchedY = existingY;
            break;
          }
        }
        if (!linesMap[matchedY]) linesMap[matchedY] = [];
        linesMap[matchedY].push(item);
      }

      // Sort lines top-to-bottom
      const sortedY = Object.keys(linesMap).map(Number).sort((a, b) => b - a);

      for (const y of sortedY) {
        // Sort elements left-to-right
        const items = linesMap[y].sort((a, b) => a.transform[4] - b.transform[4]);
        
        // Group items that are physically close into same columns, or separate them
        const cells: string[] = [];
        let currentCell = '';
        let lastX = -1;

        for (const item of items) {
          const x = item.transform[4];
          if (lastX === -1) {
            currentCell = item.str;
          } else if (x - lastX > 15) {
            // New column cell boundary
            cells.push(currentCell.trim());
            currentCell = item.str;
          } else {
            currentCell += item.str;
          }
          lastX = x + item.width;
        }

        if (currentCell) {
          cells.push(currentCell.trim());
        }

        const filteredCells = cells.filter(c => c.length > 0);
        if (filteredCells.length > 0) {
          sheetRows.push(filteredCells);
        }
      }
      
      // Add empty separator row between pages
      if (i < totalPages) {
        sheetRows.push([]);
      }
    }

    const worksheet = XLSX.utils.aoa_to_sheet(sheetRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Converted PDF Sheet');

    const excelBytes = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    return new Blob([excelBytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  } catch (err: any) {
    console.error('Error in PDF to Excel conversion:', err);
    throw new Error(`Failed to convert PDF to Excel: ${err.message || err}`);
  }
};
