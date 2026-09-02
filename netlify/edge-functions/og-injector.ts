// Netlify Edge Function for Dynamic OpenGraph & Social Sharing Meta Injection
// Runs at the global CDN edge before serving HTML to Facebook, WhatsApp, Twitter, etc.

interface ArticleMeta {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  featuredImage: string;
  author: string;
}

const BUILTIN_ARTICLES: Record<string, ArticleMeta> = {
  "art-1": {
    id: "art-1",
    title: "সুন্দরবনের সাতক্ষীরা রেঞ্জে বনদস্যু ও হরিণ শিকারী চক্রের ৩ সদস্য আটক",
    excerpt: "সুন্দরবনের গহীনে যৌথ অভিযান চালিয়ে হরিণ শিকারের সরঞ্জাম ও দেশীয় অস্ত্রসহ কুখ্যাত চক্রের তিন সদস্যকে গ্রেপ্তার করেছে কোস্টগার্ড ও বন বিভাগ।",
    category: "সাতক্ষীরা",
    featuredImage: "https://images.unsplash.com/photo-1544985361-b552945d8b88?w=1200&auto=format&fit=crop&q=80",
    author: "সাতক্ষীরা প্রতিনিধি"
  },
  "art-2": {
    id: "art-2",
    title: "ভোমরা স্থলবন্দরে রাজস্ব আদায়ের লক্ষ্যমাত্রা ছাড়িয়ে নতুন মাইলফলক",
    excerpt: "চলতি অর্থবছরের প্রথম ছয় মাসে সাতক্ষীরার ভোমরা স্থলবন্দরে রাজস্ব আদায় অতীতের সকল রেকর্ড অতিক্রম করেছে। আমদানি-রপ্তানি বাণিজ্যে ব্যাপক প্রাণচাঞ্চল্য।",
    category: "অর্থনীতি",
    featuredImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    author: "অর্থনীতি ডেস্ক"
  },
  "art-3": {
    id: "art-3",
    title: "সাতক্ষীরায় মিষ্টি পানির সংকট নিরসনে সৌরচালিত ওয়াটার ট্রিটমেন্ট প্ল্যান্ট উদ্বোধন",
    excerpt: "উপকূলীয় সাতক্ষীরার শ্যামনগর ও আশাশুনি উপজেলার লবণাক্ত এলাকায় নিরাপদ পানীয় জলের সুব্যবস্থা করতে ১০টি নতুন সৌরচালিত প্ল্যান্ট চালু করা হলো।",
    category: "সাতক্ষীরা",
    featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?w=1200&auto=format&fit=crop&q=80",
    author: "সাতক্ষীরা প্রতিনিধি"
  },
  "art-4": {
    id: "art-4",
    title: "নির্বাচন কমিশনের নতুন রোডম্যাপ ঘোষণা: আগামী নির্বাচনে আধুনিক বায়োমেট্রিক পদ্ধতি",
    excerpt: "সুষ্ঠু ও নিরপেক্ষ নির্বাচন আয়োজনের লক্ষ্যে নির্বাচন কমিশন নতুন সংশোধিত আচরণবিধি এবং ভোটার তালিকা হালনাগাদের সময়সূচি প্রকাশ করেছে।",
    category: "রাজনীতি",
    featuredImage: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&auto=format&fit=crop&q=80",
    author: "জাতীয় ডেস্ক"
  },
  "art-5": {
    id: "art-5",
    title: "সাতক্ষীরার হিমসাগর ও গোবিন্দভোগ আম জিআই পণ্যের আন্তর্জাতিক বাজারে রপ্তানি শুরু",
    excerpt: "গুণগত মান ও স্বাদের জন্য খ্যাত সাতক্ষীরার সুস্বাদু আম এবার ইউরোপ ও মধ্যপ্রাচ্যের দেশগুলোতে সরাসরি কার্গো ফ্লাইটে রপ্তানি কার্যক্রম শুরু হয়েছে।",
    category: "কৃষি",
    featuredImage: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=1200&auto=format&fit=crop&q=80",
    author: "কৃষি ডেস্ক"
  },
  "art-6": {
    id: "art-6",
    title: "সুন্দরবনের ইকো-ট্যুরিজমে নতুন সম্ভাবনা: পর্যটকদের জন্য কলাগাছি ও দোবেকীতে আধুনিক সুযোগ-সুবিধা",
    excerpt: "পরিবেশবান্ধব পর্যটন শিল্পের বিকাশে সাতক্ষীরা রেঞ্জের সুন্দরবন সংলগ্ন পর্যটন স্পটগুলোতে অবকাঠামোগত উন্নয়ন সম্পন্ন হয়েছে।",
    category: "লাইফস্টাইল ও ভ্রমণ",
    featuredImage: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=1200&auto=format&fit=crop&q=80",
    author: "ভ্রমণ প্রতিনিধি"
  },
  "art-7": {
    id: "art-7",
    title: "চ্যাম্পিয়ন্স ট্রফি ২০২৬: রোমাঞ্চকর ম্যাচে পাকিস্তানকে হারিয়ে ফাইনালে বাংলাদেশ",
    excerpt: "শেষ ওভারের শ্বাসরুদ্ধকর নাটকে তাসকিন ও মিরাজের দুর্দান্ত বোলিংয়ে পাকিস্তানকে পরাজিত করে ঐতিহাসিক জয় ছিনিয়ে নিল টাইগাররা।",
    category: "খেলা",
    featuredImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&auto=format&fit=crop&q=80",
    author: "ক্রীড়া প্রতিবেদক"
  },
  "art-8": {
    id: "art-8",
    title: "সাতক্ষীরা মেডিক্যাল কলেজ হাসপাতালে আধুনিক হৃদরোগ ও কিডনি ডায়ালাইসিস ইউনিটের যাত্রা শুরু",
    excerpt: "উপকূলীয় এলাকার সাধারণ রোগীদের উন্নত চিকিৎসার জন্য সাতক্ষীরা মেডিক্যাল কলেজ হাসপাতালে নতুন আইসিইউ ও বিশেষায়িত সেবা ইউনিট চালু।",
    category: "সাতক্ষীরা",
    featuredImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80",
    author: "স্বাস্থ্য প্রতিনিধি"
  },
  "art-9": {
    id: "art-9",
    title: "উপকূলীয় সাতক্ষীরার পরিবেশ সংকট ও আমাদের নাগরিক দায়বদ্ধতা",
    excerpt: "জলবায়ু পরিবর্তনের অভিঘাত মোকাবেলায় টেকসই বেড়িবাঁধ নির্মাণ ও ম্যানগ্রোভ বনায়নের গুরুত্ব এবং আমাদের করণীয় বিষয়ে বিশেষ কলাম।",
    category: "মতামত ও সম্পাদকীয়",
    featuredImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    author: "মো: আল ইমরান হোসেন"
  }
};

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(request: Request, context: any) {
  const url = new URL(request.url);

  // Extract article parameters
  const articleId = url.searchParams.get("article") || url.searchParams.get("id") || url.pathname.match(/^\/(?:news|article)\/([^/?]+)/)?.[1];
  const queryTitle = url.searchParams.get("og_t") || url.searchParams.get("og_title");
  const queryImg = url.searchParams.get("og_img") || url.searchParams.get("og_image");
  const queryDesc = url.searchParams.get("og_d") || url.searchParams.get("og_desc");

  // Call the next middleware / asset
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  // Only transform HTML responses
  if (!contentType.includes("text/html")) {
    return response;
  }

  // If no article ID and no query title, return standard response
  if (!articleId && !queryTitle) {
    return response;
  }

  // Resolve article data
  let title = queryTitle || "";
  let excerpt = queryDesc || "THE SATKHIRA TIMES - সত্য ও নিরপেক্ষ সংবাদ। সাতক্ষীরা সহ সমগ্র বাংলাদেশ ও বিশ্বের নির্ভরযোগ্য অনলাইন সংবাদ মাধ্যম।";
  let imageUrl = queryImg || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80";
  let category = "সাতক্ষীরা";
  let author = "দ্য সাতক্ষীরা টাইমস";

  if (articleId && BUILTIN_ARTICLES[articleId]) {
    const builtin = BUILTIN_ARTICLES[articleId];
    title = title || builtin.title;
    excerpt = queryDesc || builtin.excerpt;
    imageUrl = queryImg || builtin.featuredImage;
    category = builtin.category;
    author = builtin.author;
  }

  if (!title) {
    title = "THE SATKHIRA TIMES | সত্য ও নিরপেক্ষ সংবাদ";
  }

  const rawTitle = escapeHtml(title);
  const pageTitle = escapeHtml(`${title} - THE SATKHIRA TIMES`);
  const safeExcerpt = escapeHtml(excerpt);
  const safeImage = imageUrl;
  const canonicalUrl = url.href;

  let html = await response.text();

  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${pageTitle}</title>`);

  // Remove existing static meta tags
  html = html.replace(/<meta\s+(?:property|name)=["'](?:og:|twitter:|description)[\s\S]*?>/gi, '');
  html = html.replace(/<link\s+rel=["'](?:canonical|image_src)["'][\s\S]*?>/gi, '');

  const dynamicMetaTags = `
    <!-- Dynamic Social Share & Open Graph Meta Tags (Netlify Edge) -->
    <meta name="description" content="${safeExcerpt}" />
    <meta name="author" content="${escapeHtml(author)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="image_src" href="${safeImage}" />

    <!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
    <meta property="fb:app_id" content="966242223397117" />
    <meta property="og:site_name" content="THE SATKHIRA TIMES" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${rawTitle}" />
    <meta property="og:description" content="${safeExcerpt}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:image:secure_url" content="${safeImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${rawTitle}" />
    <meta property="og:locale" content="bn_BD" />
    <meta property="article:section" content="${escapeHtml(category)}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${rawTitle}" />
    <meta name="twitter:description" content="${safeExcerpt}" />
    <meta name="twitter:image" content="${safeImage}" />
    <meta name="twitter:image:alt" content="${rawTitle}" />
  `;

  html = html.replace('</head>', `${dynamicMetaTags}\n  </head>`);

  return new Response(html, {
    status: response.status,
    headers: response.headers
  });
}
