import { PDFDocument } from 'pdf-lib';
import { encryptPDF } from '@pdfsmaller/pdf-encrypt-lite';

export const processProtect = async (
  file: { data: ArrayBuffer },
  password?: string
): Promise<Blob> => {
  if (!password) {
    throw new Error('Please enter a protection password.');
  }

  try {
    const pdfDoc = await PDFDocument.load(file.data);
    const pdfBytes = await pdfDoc.save();

    // Use pdf-encrypt-lite to encrypt the PDF document
    const encryptedBytes = await encryptPDF(pdfBytes, password);
    return new Blob([encryptedBytes] as any, { type: 'application/pdf' });
  } catch (err: any) {
    console.error('Error encrypting PDF:', err);
    throw new Error(`Failed to encrypt PDF: ${err.message || err}`);
  }
};
