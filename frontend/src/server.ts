import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

const DIST_FOLDER = join(process.cwd(), 'dist/frontend/browser');
const INDEX_HTML = existsSync(join(DIST_FOLDER, 'index.original.html'))
  ? 'index.original.html'
  : 'index.html';

function app(): express.Express {
  const server = express();
  server.use(express.static(DIST_FOLDER, { maxAge: '1y' }));
  server.all('*', (req: any, res: any) => {
    res.sendFile(join(DIST_FOLDER, INDEX_HTML));
  });
  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
