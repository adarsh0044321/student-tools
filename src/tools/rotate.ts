import { PDFDocument, degrees } from 'pdf-lib';

export const processRotate = async (
  file: { data: ArrayBuffer },
  rotations: number[]
): Promise<Blob> => {
  try {
    const pdfDoc = await PDFDocument.load(file.data);
    const pages = pdfDoc.getPages();

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const additionalRotation = rotations[i] || 0;
      
      if (additionalRotation !== 0) {
        const currentAngle = page.getRotation().angle;
        const targetAngle = (currentAngle + additionalRotation) % 360;
        page.setRotation(degrees(targetAngle));
      }
    }

    const outputBytes = await pdfDoc.save();
    return new Blob([outputBytes] as any, { type: 'application/pdf' });
  } catch (err: any) {
    console.error('Error rotating PDF:', err);
    throw new Error(`Failed to rotate PDF: ${err.message || err}`);
  }
};
