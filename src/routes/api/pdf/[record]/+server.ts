import { generatePDF } from '$lib/server/pdf';

export const GET = async ({ params }) => {
	const pdf = await generatePDF(params.record.toString());

	return new Response(pdf, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Length': pdf.size.toString(),
			'Last-Modified': new Date().toUTCString(),
			'Cache-Control': 'public, max-age=600'
		}
	});
};
