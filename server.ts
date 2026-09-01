import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_ARTICLES, INITIAL_SETTINGS } from './src/data/initialData';

const app = express();
const PORT = 3000;

app.use(express.json());

// API health endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API endpoint to fetch dynamic OpenGraph and article meta tags for social crawlers / share tools
app.get('/api/article-meta/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const article = INITIAL_ARTICLES.find(a => a.id === id);
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  res.json({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    featuredImage: article.featuredImage,
    publishedAt: article.publishedAt,
    author: article.author.name,
    ogTags: {
      'og:title': article.title,
      'og:description': article.excerpt,
      'og:image': article.featuredImage,
      'og:type': 'article',
      'twitter:card': 'summary_large_image',
      'twitter:title': article.title,
      'twitter:description': article.excerpt,
      'twitter:image': article.featuredImage
    }
  });
});

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function injectArticleMetaTags(html: string, articleId: string | null, hostUrl: string): string {
  if (!articleId) {
    return html;
  }

  const article = INITIAL_ARTICLES.find(a => a.id === articleId);
  if (!article) {
    return html;
  }

  const title = escapeHtml(`${article.title} - ${INITIAL_SETTINGS.siteName}`);
  const description = escapeHtml(article.excerpt || article.content.substring(0, 160));
  const rawTitle = escapeHtml(article.title);
  const imageUrl = article.featuredImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80';
  const canonicalUrl = `${hostUrl}/?article=${article.id}`;
  const siteName = escapeHtml(INITIAL_SETTINGS.siteName);
  const authorName = escapeHtml(article.author.name);
  const category = escapeHtml(article.category);

  // Replace Title
  let modifiedHtml = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  // Meta Tags block to inject
  const metaTags = `
    <!-- Social Share & Open Graph Meta Tags for ${rawTitle} -->
    <meta name="description" content="${description}" />
    <meta name="author" content="${authorName}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="image_src" href="${imageUrl}" />

    <!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${rawTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:secure_url" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${rawTitle}" />
    <meta property="og:locale" content="bn_BD" />
    <meta property="article:published_time" content="${article.publishedAt}" />
    <meta property="article:author" content="${authorName}" />
    <meta property="article:section" content="${category}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${rawTitle}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:image:alt" content="${rawTitle}" />
  `;

  // Remove existing static og & twitter tags to avoid duplication
  modifiedHtml = modifiedHtml
    .replace(/<meta\s+(?:property|name)=["'](?:og:|twitter:|description)[\s\S]*?>/gi, '');

  // Inject before </head>
  modifiedHtml = modifiedHtml.replace('</head>', `${metaTags}\n  </head>`);

  return modifiedHtml;
}

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    // Custom middleware to inject OpenGraph meta tags for HTML requests
    app.use(async (req: Request, res: Response, next: NextFunction) => {
      const url = req.originalUrl || req.url;

      // Only handle HTML navigation requests
      if (req.method === 'GET' && !url.startsWith('/@') && !url.startsWith('/src') && !url.startsWith('/node_modules') && !url.includes('.')) {
        try {
          const host = req.get('host') || 'localhost:3000';
          const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
          const hostUrl = `${protocol}://${host}`;

          // Extract article id from query ?article=... or ?id=... or path /news/...
          const articleQuery = req.query.article as string || req.query.id as string;
          let articleId = articleQuery || null;

          const matchNews = url.match(/^\/(?:news|article)\/([^/?]+)/);
          if (matchNews && matchNews[1]) {
            articleId = matchNews[1];
          }

          let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          
          if (articleId) {
            template = injectArticleMetaTags(template, articleId, hostUrl);
          }

          return res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } catch (err) {
          vite.ssrFixStacktrace(err as Error);
          next(err);
        }
      } else {
        next();
      }
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const indexHtmlPath = path.join(distPath, 'index.html');

    app.use(express.static(distPath, { index: false }));

    app.get('*', (req: Request, res: Response) => {
      const url = req.originalUrl || req.url;
      const host = req.get('host') || 'localhost:3000';
      const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
      const hostUrl = `${protocol}://${host}`;

      const articleQuery = req.query.article as string || req.query.id as string;
      let articleId = articleQuery || null;

      const matchNews = url.match(/^\/(?:news|article)\/([^/?]+)/);
      if (matchNews && matchNews[1]) {
        articleId = matchNews[1];
      }

      let template = fs.readFileSync(indexHtmlPath, 'utf-8');
      if (articleId) {
        template = injectArticleMetaTags(template, articleId, hostUrl);
      }

      res.set({ 'Content-Type': 'text/html' }).send(template);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Satkhira Times server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
