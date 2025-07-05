import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr';
import express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

const DIST_FOLDER = join(process.cwd(), 'dist/frontend/browser');
const INDEX_HTML = existsSync(join(DIST_FOLDER, 'index.original.html'))
  ? 'index.original.html'
  : 'index.html';

function app(): express.Express {
  const server = express();
  server.use(express.static(DIST_FOLDER, { maxAge: '1y' }));
  server.all('*', async (req, res) => {
    await writeResponseToNodeResponse(
      res,
      await createNodeRequestHandler({
        build: AngularNodeAppEngine,
        indexHtml: INDEX_HTML,
      })(req, res)
    );
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

if (isMainModule(import.meta)) {
  run();
}
