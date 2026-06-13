import { PDFDocument } from 'pdf-lib';

export const processCompress = async (
  file: { data: ArrayBuffer },
  level: 'recommended' | 'extreme' | 'low'
): Promise<Blob> => {
  try {
    const pdfDoc = await PDFDocument.load(file.data);

    // Strip metadata to shrink size
    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setCreator('');
    pdfDoc.setProducer('');
    
    // We can simulate higher compression by choosing different settings on pdf-lib save
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: level !== 'low', // Combines PDF objects into stream packages
      updateFieldAppearances: false
    });

    return new Blob([compressedBytes] as any, { type: 'application/pdf' });
  } catch (err: any) {
    console.error('Error compressing PDF:', err);
    throw new Error(`Failed to compress PDF: ${err.message || err}`);
  }
};
