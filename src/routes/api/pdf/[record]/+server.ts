import { generatePDF } from '$lib/server/pdf';
import type { TDocumentInformation } from 'pdfmake/interfaces';

export const GET = async ({ params }) => {
	const metadata: TDocumentInformation = {
		author: 'John Doe',
		title: params.record.toString()
	};
	const pdf = await generatePDF(params.record.toString(), metadata);

	return new Response(pdf, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Length': pdf.size.toString(),
			'Last-Modified': new Date().toUTCString(),
			'Cache-Control': 'public, max-age=0'
		}
	});
};
