import { generatePDF } from '$lib/server/pdf';
import type { EmployeeInfo, RecordAppointment, Service, ServiceRecord } from '$lib/types';
import type { TDocumentInformation } from 'pdfmake/interfaces';

export const GET = async ({ params }) => {
	const metadata: TDocumentInformation = {
		author: 'John Doe',
		title: params.record.toString()
	};
//post request = sumbit response
	const doc: ServiceRecord = {
		stationnum: "123",
		empnum: "1111",
		gsis: "ddf4"
	}

	const info: EmployeeInfo ={
		firstName: 'sgsgsf',
		lastName: 'gsgffg',
		middleName: 'gsgs',
		birthdate: new Date('2002-11-02'),
		placeOfBirth: 'tbc'
	}	
	const serv: Service ={
	
	}
	
	const appnt: RecordAppointment = {
		position: "bhjfa",
		status: "jafjf",
		salary: 122222
	}
	
//should not be duplicate
	const pdf = await generatePDF(doc,info, [] ,metadata);

	return new Response(pdf, {
		status: 200,
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Length': pdf.size.toString(),
			'Last-Modified': new Date().toUTCString(),
			'Cache-Control': 'public, max-age=0'
		}
	});
};
