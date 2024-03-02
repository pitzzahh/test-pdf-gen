import PdfPrinter from 'pdfmake';
import blobStream, { type IBlobStream } from 'blob-stream';
import type { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';

const fonts: TFontDictionary = {
	Roboto: {
		normal: 'src/lib/assets/fonts/Roboto-Regular.ttf',
		bold: 'src/lib/assets/fonts/Roboto-Bold.ttf'
	}
};

const printer = new PdfPrinter(fonts);

export const generatePDF = async (recordId: string): Promise<Blob> => {
	const file: TDocumentDefinitions = {
		content: ['Record ID:', recordId, 'Date:', new Date().toDateString()],
		defaultStyle: {
			font: 'Roboto'
		}
	};

	return new Promise((resolve, reject) => {
		const pdf = printer.createPdfKitDocument(file);
		pdf
			.pipe(blobStream())
			.on('finish', function (this: IBlobStream) {
				console.log('Finished creating PDF with id', recordId);
				resolve(this.toBlob('application/pdf'));
			})
			.on('error', (err) => {
				console.log('Error creating PDF with id', recordId);
				reject(err);
			});
		pdf.end();
	});
};

