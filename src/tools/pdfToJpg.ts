import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

export const processPdfToJpg = async (file: File): Promise<Blob> => {
  const arrayBuffer = await file.arrayBuffer();
  const zip = new JSZip();

  try {
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const pageCount = pdf.numPages;

    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 }); // Render at 2.0x scale for crisp images
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      if (!context) {
        throw new Error('Could not create canvas context');
      }

      await page.render({ canvasContext: context, viewport } as any).promise;
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const base64Data = dataUrl.substring(dataUrl.indexOf(',') + 1);

      zip.file(`page_${i}.jpg`, base64Data, { base64: true });
    }

    return await zip.generateAsync({ type: 'blob' });
  } catch (err: any) {
    console.error('Error rendering PDF to JPG:', err);
    throw new Error(`Failed to convert PDF to images: ${err.message || err}`);
  }
};
