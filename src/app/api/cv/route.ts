import { promises as fs } from 'fs';
import path from 'path';

const CV_FILE_NAME = 'Harvard Amgen Resume 2026.docx';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', CV_FILE_NAME);
  const fileBuffer = await fs.readFile(filePath);

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${CV_FILE_NAME}"`,
      'Cache-Control': 'public, max-age=0',
    },
  });
}
