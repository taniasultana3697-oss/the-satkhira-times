import fs from 'fs';
import path from 'path';
import { INITIAL_ARTICLES, INITIAL_SETTINGS } from '../src/data/initialData';

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function prerenderArticles() {
  const distPath = path.resolve(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distPath, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.log('No dist/index.html found to prerender.');
    return;
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  console.log(`Prerendering ${INITIAL_ARTICLES.length} articles for static hosting (Netlify/Vercel)...`);

  INITIAL_ARTICLES.forEach((article) => {
    const title = escapeHtml(`${article.title} - ${INITIAL_SETTINGS.siteName}`);
    const rawTitle = escapeHtml(article.title);
    const description = escapeHtml(article.excerpt || article.content.substring(0, 160));
    const imageUrl = article.featuredImage || INITIAL_SETTINGS.seoSettings.ogImageUrl;
    const authorName = escapeHtml(article.author.name);
    const category = escapeHtml(article.category);

    let modifiedHtml = baseHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

    const metaTags = `
    <!-- Pre-rendered Social Open Graph Meta Tags for ${rawTitle} -->
    <meta name="description" content="${description}" />
    <meta name="author" content="${authorName}" />
    <link rel="image_src" href="${imageUrl}" />

    <!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
    <meta property="fb:app_id" content="966242223397117" />
    <meta property="og:site_name" content="${escapeHtml(INITIAL_SETTINGS.siteName)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://the-satkhira-times.netlify.app/news/${article.id}" />
    <meta property="og:title" content="${rawTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:secure_url" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${rawTitle}" />
    <meta property="og:locale" content="bn_BD" />
    <meta property="article:published_time" content="${article.publishedAt}" />
    <meta property="article:author" content="${authorName}" />
    <meta property="article:section" content="${category}" />
    <link rel="canonical" href="https://the-satkhira-times.netlify.app/news/${article.id}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${rawTitle}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:image:alt" content="${rawTitle}" />
    `;

    // Strip out generic og tags and inject article-specific ones
    modifiedHtml = modifiedHtml.replace(/<meta\s+(?:property|name)=["'](?:og:|twitter:|description)[\s\S]*?>/gi, '');
    modifiedHtml = modifiedHtml.replace('</head>', `${metaTags}\n  </head>`);

    // Write to dist/news/:id/index.html
    const newsDir = path.join(distPath, 'news', article.id);
    fs.mkdirSync(newsDir, { recursive: true });
    fs.writeFileSync(path.join(newsDir, 'index.html'), modifiedHtml);

    // Also write to dist/article/:id/index.html
    const articleDir = path.join(distPath, 'article', article.id);
    fs.mkdirSync(articleDir, { recursive: true });
    fs.writeFileSync(path.join(articleDir, 'index.html'), modifiedHtml);
  });

  console.log('Successfully prerendered article HTML files with dynamic social meta tags.');
}

prerenderArticles();
