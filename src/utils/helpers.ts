// Bengali digits converter
export const toBengaliDigits = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/[0-9]/g, (match) => bnDigits[parseInt(match, 10)]);
};

// Format ISO date to rich Bengali string (e.g. মঙ্গলবার, ১ সেপ্টেম্বর ২০২৬)
export const formatBengaliDate = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const days = [
      'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
    ];

    const dayName = days[date.getDay()];
    const day = toBengaliDigits(date.getDate());
    const month = months[date.getMonth()];
    const year = toBengaliDigits(date.getFullYear());
    
    // Time
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'অপরাহ্ন' : 'পূর্বাহ্ন';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const timeStr = `${toBengaliDigits(hours)}:${minutes < 10 ? '০' + toBengaliDigits(minutes) : toBengaliDigits(minutes)} ${ampm}`;

    return `${dayName}, ${day} ${month} ${year}, ${timeStr}`;
  } catch {
    return 'আজকের সংবাদ';
  }
};

// Calculate relative time in Bengali (e.g. ২৫ মিনিট আগে, ২ ঘণ্টা আগে)
export const getRelativeBengaliTime = (isoString: string): string => {
  try {
    const now = Date.now();
    const past = new Date(isoString).getTime();
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
      return 'এইমাত্র';
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${toBengaliDigits(diffInMinutes)} মিনিট আগে`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${toBengaliDigits(diffInHours)} ঘণ্টা আগে`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${toBengaliDigits(diffInDays)} দিন আগে`;
    }
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${toBengaliDigits(diffInMonths)} মাস আগে`;
  } catch {
    return 'কিছুক্ষণ আগে';
  }
};

// Current Bengali Calendar Date
export const getCurrentBengaliCalendar = (): {
  englishDate: string;
  banglaDate: string;
  banglaYear: string;
} => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const englishDate = now.toLocaleDateString('en-US', options);

  const months = [
    'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন',
    'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
  ];
  const weekDays = [
    'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
  ];

  const dayName = weekDays[now.getDay()];
  const dateNum = toBengaliDigits(now.getDate());
  
  // Approximate Bengali month in late August/early September is 'ভাদ্র' (১৪৩৩ বঙ্গাব্দ)
  return {
    englishDate,
    banglaDate: `${dayName}, ${dateNum} ভাদ্র ১৪৩৩`,
    banglaYear: '১৪৩৩ বঙ্গাব্দ'
  };
};

// Calculate estimate reading time in minutes
export const calculateReadTime = (content: string): string => {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${toBengaliDigits(minutes)} মিনিট পাঠ`;
};

/**
 * Creates a clean URL slug from a Bengali/English title
 * e.g. "সাতক্ষীরায় সুন্দরবনের মধু সংগ্রহ শুরু" -> "সাতক্ষীরায়-সুন্দরবনের-মধু-সংগ্রহ-শুরু"
 */
export const createArticleSlug = (title: string): string => {
  if (!title) return 'news';
  return title
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '') // Keep Unicode letters (Bengali, English etc.), numbers, spaces, hyphens
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 120);
};

/**
 * Generates the unique, direct permalink for an individual article
 */
export const getArticleUrl = (article: { id: string; title?: string } | string): string => {
  const id = typeof article === 'string' ? article : article.id;
  const title = typeof article === 'string' ? '' : article.title || '';
  const slug = title ? createArticleSlug(title) : '';
  
  if (typeof window === 'undefined') {
    return `https://the-satkhira-times.netlify.app/?article=${id}${slug ? `&slug=${encodeURIComponent(slug)}` : ''}`;
  }
  
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  return `${baseUrl}?article=${id}${slug ? `&slug=${encodeURIComponent(slug)}` : ''}`;
};

/**
 * Generates rich share URL with OpenGraph title & image params for crawlers
 */
export const getArticleShareUrl = (article: { id: string; title: string; featuredImage?: string }): string => {
  if (typeof window === 'undefined') {
    return `https://the-satkhira-times.netlify.app/?article=${article.id}`;
  }
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const slug = createArticleSlug(article.title);
  const params = new URLSearchParams();
  params.set('article', article.id);
  if (slug) params.set('slug', slug);
  if (article.title) params.set('og_t', article.title);
  if (article.featuredImage) params.set('og_img', article.featuredImage);

  return `${baseUrl}?${params.toString()}`;
};

/**
 * Parses article ID, view, and category from current browser URL / Search / Hash / Path
 */
export const parseRouteFromUrl = (): {
  articleId: string | null;
  view: string | null;
  category: string | null;
  search: string | null;
} => {
  if (typeof window === 'undefined') {
    return { articleId: null, view: null, category: null, search: null };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;
  const hash = window.location.hash;

  // 1. Check Query Params (?article=art-1 or ?news=art-1 or ?id=art-1)
  let articleId = urlParams.get('article') || urlParams.get('news') || urlParams.get('id');

  // 2. Check Pathname (/news/art-1 or /article/art-1)
  if (!articleId) {
    const pathMatch = pathname.match(/^\/(?:news|article)\/([^/?#]+)/);
    if (pathMatch && pathMatch[1]) {
      articleId = pathMatch[1];
    }
  }

  // 3. Check Hash (#news/art-1 or #article-art-1 or #/article/art-1)
  if (!articleId && hash) {
    const hashMatch = hash.match(/#(?:news\/|article\/|article-|)(art-[0-9a-zA-Z_-]+)/);
    if (hashMatch && hashMatch[1]) {
      articleId = hashMatch[1];
    }
  }

  // 4. Check View
  const view = urlParams.get('view') || 
    (pathname.includes('/admin') ? 'admin' : 
     pathname.includes('/reporter') ? 'reporter' : 
     pathname.includes('/bookmarks') ? 'bookmarks' : null);

  // 5. Check Category
  let category = urlParams.get('category') || urlParams.get('cat');
  if (!category && pathname.startsWith('/category/')) {
    category = decodeURIComponent(pathname.replace('/category/', ''));
  }

  // 6. Check Search
  const search = urlParams.get('q') || urlParams.get('search');

  return { articleId, view, category, search };
};

// Social Share Link Builders
export const getShareLinks = (url: string, title: string, imageUrl?: string) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=291494419107518&redirect_uri=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebookDebugger: `https://developers.facebook.com/tools/debug/?q=${encodedUrl}`
  };
};

