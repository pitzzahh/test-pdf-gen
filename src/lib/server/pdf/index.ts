import PdfPrinter from 'pdfmake';
import depedLogo from '$lib/assets/images/deped-official-seal.png';
import blobStream, { type IBlobStream } from 'blob-stream';
import type {
	TDocumentDefinitions,
	TDocumentInformation,
	TFontDictionary
} from 'pdfmake/interfaces';
import { text } from '@sveltejs/kit';

const fonts: TFontDictionary = {
	Roboto: {
		normal: 'src/lib/assets/fonts/roboto-regular.ttf',
		bold: 'src/lib/assets/fonts/roboto-bold.ttf'
	},
	OldEnglish: {
		normal: 'src/lib/assets/fonts/old-english.ttf',
		bold: 'src/lib/assets/fonts/old-english.ttf',
		italics: 'src/lib/assets/fonts/old-english.ttf'
	},
	Trajan: {
		normal: 'src/lib/assets/fonts/trajan-regular.ttf',
		bold: 'src/lib/assets/fonts/trajan-bold.otf',
		italics: 'src/lib/assets/fonts/trajan-regular.ttf'
	},
	Calibri: {
		normal: 'src/lib/assets/fonts/calibri-regular.ttf',
		bold: 'src/lib/assets/fonts/calibri-bold.ttf',
		italics: 'src/lib/assets/fonts/calibri-italic.ttf',
		bolditalics: 'src/lib/assets/fonts/calibri-bold-italic.ttf'
	},
	Courier: {
		normal: 'Courier',
		bold: 'Courier-Bold',
		italics: 'Courier-Oblique',
		bolditalics: 'Courier-BoldOblique'
	},
	Helvetica: {
		normal: 'Helvetica',
		bold: 'Helvetica-Bold',
		italics: 'Helvetica-Oblique',
		bolditalics: 'Helvetica-BoldOblique'
	},
	Times: {
		normal: 'Times-Roman',
		bold: 'Times-Bold',
		italics: 'Times-Italic',
		bolditalics: 'Times-BoldItalic'
	},
	Symbol: {
		normal: 'Symbol'
	},
	ZapfDingbats: {
		normal: 'ZapfDingbats'
	}
};

const printer = new PdfPrinter(fonts);

export const generatePDF = async (
	recordId: string,
	metadata?: TDocumentInformation
): Promise<Blob> => {
	const file: TDocumentDefinitions = {
		info: metadata,
		pageSize: 'A4',
		content: [
			{
				image: 'src/lib/assets/images/deped-official-seal.png',
				alignment: 'center',
				height: 100,
				width: 100
			},
			{
				text: 'Reupublic of the philippines',
				font: 'OldEnglish',
				fontSize: 14,
				bold: true,
				alignment: 'center'
			},
			{
				text: 'Department of Education',
				font: 'OldEnglish',
				fontSize: 18,
				bold: true,
				alignment: 'center'
			},
			{
				text: 'Region V - Bicol',
				font: 'Trajan',
				fontSize: 12,
				bold: true,
				alignment: 'center'
			},
			{
				text: 'SCHOOLS DIVISION OFFICE - LEGAZPI CITY',
				font: 'Roboto',
				fontSize: 12,
				bold: true,
				alignment: 'center'
			},
			'_____________________________________________________________________________________',
			{
				text: 'SERVICE RECORD',
				font: 'Times',
				bold: true,
				fontSize: 16,
				alignment: 'center',
				marginTop: 10,
				marginBottom: 10
			},
			{
				text: '(To be accomplished by the employer)',
				font: 'Courier',
				fontSize: 8,
				alignment: 'center',
				italics: true
			},
			{
				text: ['Station No: ', { text: recordId, fontSize: 15, decoration: 'underline' }],
				alignment: 'right'
			},
			{
				text: ['Employee No: ', { text: recordId, fontSize: 15, decoration: 'underline' }],
				alignment: 'right'
			},
			{
				text: ['GSIS BP No: ', { text: recordId, fontSize: 15, decoration: 'underline' }],
				alignment: 'right'
			}
		],
		styles: {
			header: {
				fontSize: 18,
				bold: true,
				alignment: 'center'
			},
			subheader: {
				fontSize: 15,
				bold: true
			},
			quote: {
				italics: true
			},
			small: {
				fontSize: 8
			}
		},
		defaultStyle: {
			font: 'Calibri'
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
