import fs from 'node:fs/promises';
import express from 'express';
import { getBlogPosts } from './blogPosts.js';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';

const app = express();

/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    /** @type {string} */
    let template;
    /** @type {import('./src/entry-server.ts').render} */
    let render;

    if (!isProduction) {
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const blogPosts = getBlogPosts();

    const [htmlStart, htmlEnd] = template.split('<!--app-html-->');
    const [headStart, headEnd] = htmlStart.split('<!--app-head-->');

    res.status(200);
    res.set({ 'Content-Type': 'text/html' });

    res.write(headStart);
    res.write(
      `<script>window.__BLOG_POSTS__='${JSON.stringify(blogPosts)}';</script>`,
    );
    res.write(headEnd);

    const appHtml = render(blogPosts);

    res.write(appHtml);
    res.end(htmlEnd);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
