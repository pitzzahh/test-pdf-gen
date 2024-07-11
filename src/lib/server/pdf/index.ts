import PdfPrinter from 'pdfmake';
import blobStream, { type IBlobStream } from 'blob-stream';
import type {
	TDocumentDefinitions,
	TDocumentInformation,
	TFontDictionary
} from 'pdfmake/interfaces';
import type { EmployeeInfo, ServiceRecord } from '$lib/types';

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
	},
	ArialNarrow:{
		normal: 'src/lib/assets/fonts/arial-narrow.ttf',
		bold: 'src/lib/assets/fonts/arial-narrow-bold.ttf',
		italics: 'src/lib/assets/fonts/arial-narrow-italic.ttf'
	}
};


type Alignment = 'center' | 'right'
type TableData = {
	text: string,
	alignment: Alignment
}

const printer = new PdfPrinter(fonts);

export const generatePDF = async (
	doc: ServiceRecord,
	info: EmployeeInfo,
	data: TableData[][],
	metadata?: TDocumentInformation,
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
			{
				canvas:[{type: 'line',x1: 15, y1: 0, x2: 520, y2: 0 }],
				alignment: 'center'
			},
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
				font: 'ArialNarrow',
				fontSize: 8,
				alignment: 'center',
				italics: true
			},
			{
				text: ['Station No: ', { text: doc.stationnum, fontSize: 12, decoration: 'underline' }],
				fontSize: 14,
				alignment: 'right'
			},
			{
				text: ['Employee No: ', { text: doc.empnum, fontSize: 12, decoration: 'underline' }],
				fontSize: 14,
				alignment: 'right'
			},
			{
				text: ['GSIS BP No: ',  { text: doc.gsis, fontSize: 12, decoration: 'underline' }],
				fontSize: 14,
				alignment: 'right'
				
			},
			{
				text: 'Name:		',
				bold: true,
				fontSize: 14,
				alignment: 'left',
				absolutePosition: {x: 30, y:280}
			},
			{
				stack: [
					{text:	[`${info.lastName}`],absolutePosition: {x: 100, y: 280}},
					{ text: [`${info.firstName}`], absolutePosition: {x: 220, y: 280}},
					{ text: [`${info.middleName}`], absolutePosition: {x: 350, y: 280}},

				],
				fontSize: 12,
				alignment: 'left',
                marginBottom: 5,
			},
			{
				text:'(If married woman, give also the maiden name)', fontSize: 7, absolutePosition: {x:400, y:279},italics: true, alignment: 'right'
			},
			{
				canvas:[{type: 'line',x1: 50, y1: 9.50, x2: 400, y2: 9.50 }]
			},
			{
				stack: [
					{text:	[`(Surname)`],absolutePosition: {x: 100, y: 299}},
					{ text: [`(Given Name)`], absolutePosition: {x: 220, y: 299}},
					{ text: [`(Middle Name)`], absolutePosition: {x: 350, y: 299}},
				],
				font: 'ArialNarrow',
				fontSize: 8,
				alignment: 'left',
				italics: true,
			},
			{
				text: 'Birth:		',
				bold: true,
				fontSize: 14,
				alignment: 'left',
				absolutePosition: {x: 30, y:312}
			},
			{
				stack: [
					{text:	info.birthdate.toISOString(),absolutePosition: {x: 100, y: 312}},
					{ text: [`${info.placeOfBirth}`], absolutePosition: {x: 280, y: 312}},
				],
				fontSize: 12,
				alignment: 'left',
                marginBottom: 5,	
			},
			{
				canvas:[{type: 'line',x1: 50, y1: 25, x2: 400, y2: 25 }]
			},
			{
				stack: [
					{text:	[`(Date)`],absolutePosition: {x: 100, y: 330}},
					{ text: [`(Place)`], absolutePosition: {x: 280, y: 330}},
				],
				font: 'ArialNarrow',
				fontSize: 8,
				alignment: 'left',
				italics: true,
			},
			{
				text:'(Date herein should be checked from birth or baptismal certificate or other reliable documents.)', fontSize: 7, absolutePosition: {x:430, y:306},italics: true, alignment: 'right'
			},
			{
				stack: [
					{text:'This is to certify that the employee named herein above actually rendered service in this office as shown by the service record below,'},
					{text: 'each line of which is supported by appointment and other papers actually issued by this office and approved by the authorities concerned'}

				],
				font: 'ArialNarrow',
				fontSize: 9,
				alignment: 'center',
				absolutePosition:{x:22, y:340}
			},
			{
				canvas:[{type: 'line',x1: 15, y1: 423, x2: 520, y2: 423 }],
				alignment: 'center'
			},
			{
				image: 'src/lib/assets/images/DepEd-MATATAG_BagongPilipinas.png',
				alignment: 'left',
				height: 100,
				width: 200,
				absolutePosition: {x:30,y:750}
			},
			{
				image: 'src/lib/assets/images/deped-official-seal.png',
				alignment: 'left',
				height: 100,
				width: 100,
				absolutePosition: {x:245,y:748}
			},
			{
				image: 'src/lib/assets/icons/home.png',
				absolutePosition:{x:22, y:353},
			},
			{
				table: {	
					widths:[20,32,'*','*','*','*','*',40],
					body: [
						[{text:'SERVICE', colSpan:2, font:'ArialNarrow',fontSize:11,alignment:'center', bold:true}, {},
						 {text:'RECORD OF APPOINTMENT',colSpan:3,font:'ArialNarrow',fontSize:11, alignment:'center',bold:true},{},{},
						 {text:'OFFICE/ENTITY',alignment:'center',font:'ArialNarrow',fontSize:11, bold:true},
						 {text:'\nSOURCE\nOF\nFUND',rowSpan:3,font:'ArialNarrow', alignment:'center',fontSize:11, bold:true},
						 {text:'\n\nREMARKS', rowSpan:3,font:'ArialNarrow', alignment:'center',fontSize:11, bold:true}
						],
						[{text:'Inclusive Date', colSpan:2,alignment:'center'},{},
						 {text:'\nPOSITON', rowSpan:2,alignment:'center'}, 
						 {text:'STATUS'},
						 {text:'SALARY'},
						 {text:'DIV/STATION/PLACE\nOF\nASSIGNMENT', rowSpan:2, alignment:'center'},{},{}
						],
						[{text:'TO',alignment:'center'},
						 {text:'FROM',alignment:'center'},{},
						 {text:'1',alignment:'center'},{text:'2',alignment:'center'	},{},{},{}
						],
						...data
					]
				},
	
					alignment:'center',
					absolutePosition:{x:30,y:375}
			},

			
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
			},
			table: {
				font: 'ArialNarrow'
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
				resolve(this.toBlob('application/pdf'));
			})
			.on('error', (err) => {
				reject(err);
			});
		pdf.end();
	});
};
 
