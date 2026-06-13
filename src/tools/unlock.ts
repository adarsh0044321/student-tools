import { PDFDocument } from 'pdf-lib';

export const processUnlock = async (
  file: { data: ArrayBuffer },
  _password?: string
): Promise<Blob> => {
  try {
    // Attempt loading with pdf-lib. If it requires decryption, pdf-lib doesn't support complete
    // decryption stream parsing client-side, but loading it with ignoreEncryption can sometimes recover it,
    // or if the PDF is not encrypted we save it.
    let pdfDoc;
    try {
      pdfDoc = await PDFDocument.load(file.data);
    } catch (err) {
      // Bypassing simple security parameters
      pdfDoc = await PDFDocument.load(file.data, { ignoreEncryption: true });
    }

    const savedBytes = await pdfDoc.save();
    return new Blob([savedBytes] as any, { type: 'application/pdf' });
  } catch (err: any) {
    console.error('Error unlocking PDF:', err);
    throw new Error(`Failed to unlock PDF: ${err.message || 'The file requires a decryption owner password which cannot be bypassed client-side.'}`);
  }
};
