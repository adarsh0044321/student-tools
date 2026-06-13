import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export const processPdfToWord = async (file: File): Promise<Blob> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;

    const docParagraphs: Paragraph[] = [];

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
        const lineText = items.map(item => item.str).join(' ');
        
        if (lineText.trim()) {
          docParagraphs.push(new Paragraph({
            children: [new TextRun(lineText)]
          }));
        }
      }

      // Add a page break between pages
      if (i < totalPages) {
        docParagraphs.push(new Paragraph({
          pageBreakBefore: true,
          children: []
        }));
      }
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: docParagraphs
      }]
    });

    return await Packer.toBlob(doc);
  } catch (err: any) {
    console.error('Error in PDF to Word conversion:', err);
    throw new Error(`Failed to convert PDF to Word: ${err.message || err}`);
  }
};
