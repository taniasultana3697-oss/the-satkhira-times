import { NewsArticle, WebsiteSettings } from '../types';

/**
 * Updates or creates a <meta> tag in document.head
 */
export const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
  if (typeof document === 'undefined') return;
  
  let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * Dynamically updates all OpenGraph, Twitter, and SEO metadata for an article
 */
export const updateArticleMetaTags = (article: NewsArticle, settings?: WebsiteSettings) => {
  if (typeof document === 'undefined' || !article) return;

  const origin = window.location.origin;
  const canonicalUrl = `${origin}${window.location.pathname}?article=${article.id}`;
  const siteBrand = settings?.siteName || 'THE SATKHIRA TIMES';
  const fullTitle = `${article.title} - ${siteBrand}`;
  const description = article.excerpt || article.content.substring(0, 160);
  const imageUrl = article.featuredImage || settings?.seoSettings?.ogImageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80';

  // Update Page Title
  document.title = fullTitle;

  // Standard Meta Tags
  setMetaTag('name', 'description', description);
  setMetaTag('name', 'author', article.author.name);
  if (article.tags && article.tags.length > 0) {
    setMetaTag('name', 'keywords', article.tags.join(', '));
  }

  // Facebook & OpenGraph Meta Tags
  setMetaTag('property', 'og:site_name', siteBrand);
  setMetaTag('property', 'og:type', 'article');
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:title', article.title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:image', imageUrl);
  setMetaTag('property', 'og:image:secure_url', imageUrl);
  setMetaTag('property', 'og:image:alt', article.title);
  setMetaTag('property', 'og:image:width', '1200');
  setMetaTag('property', 'og:image:height', '630');
  setMetaTag('property', 'article:published_time', article.publishedAt);
  setMetaTag('property', 'article:author', article.author.name);
  setMetaTag('property', 'article:section', article.category);

  // Twitter Cards
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', article.title);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', imageUrl);
  setMetaTag('name', 'twitter:image:alt', article.title);

  // Canonical Link Tag
  let canonicalLink = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);
};

/**
 * Resets Meta Tags to Homepage / Dynamic Settings Default
 */
export const resetHomeMetaTags = (settings?: WebsiteSettings) => {
  if (typeof document === 'undefined') return;

  const origin = window.location.origin;
  const canonicalUrl = `${origin}${window.location.pathname}`;
  const siteBrand = settings?.siteName || 'THE SATKHIRA TIMES';
  const defaultTitle = settings?.seoSettings?.siteTitle || `${siteBrand} | ${settings?.tagline || 'সত্য ও নিরপেক্ষ সংবাদ'}`;
  const defaultDesc = settings?.seoSettings?.metaDescription || settings?.metaDescriptionDefault || `${siteBrand} - সত্য ও নিরপেক্ষ সংবাদ। সাতক্ষীরা, জাতীয়, আন্তর্জাতিক, রাজনীতি, অর্থনীতি ও খেলাধুলার সর্বশেষ তাজা খবর।`;
  const defaultImage = settings?.seoSettings?.ogImageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80';
  const keywords = settings?.seoSettings?.metaKeywords || 'সাতক্ষীরা নিউজ, দ্য সাতক্ষীরা টাইমস, Satkhira Times, বাংলা সংবাদ, সুন্দরবন খবর';

  document.title = defaultTitle;
  setMetaTag('name', 'description', defaultDesc);
  setMetaTag('name', 'keywords', keywords);
  setMetaTag('property', 'og:site_name', siteBrand);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:title', defaultTitle);
  setMetaTag('property', 'og:description', defaultDesc);
  setMetaTag('property', 'og:image', defaultImage);
  setMetaTag('property', 'og:image:secure_url', defaultImage);
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', defaultTitle);
  setMetaTag('name', 'twitter:description', defaultDesc);
  setMetaTag('name', 'twitter:image', defaultImage);
};
