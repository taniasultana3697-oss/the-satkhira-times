export type NewsCategory = 
  | 'সাতক্ষীরা'
  | 'জাতীয়'
  | 'রাজনীতি'
  | 'আন্তর্জাতিক'
  | 'খেলাধুলা'
  | 'বিনোদন'
  | 'প্রযুক্তি'
  | 'ব্যবসা-বাণিজ্য'
  | 'মতামত'
  | 'জীবনযাপন'
  | 'শিক্ষা'
  | 'পরিবেশ ও সুন্দরবন';

export type SatkhiraUpazila = 
  | 'সাতক্ষীরা সদর'
  | 'শ্যামনগর'
  | 'কালীগঞ্জ'
  | 'তালা'
  | 'আশাশুনি'
  | 'দেবহাটা'
  | 'কলারোয়া'
  | 'সারাদেশ';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  upazila?: SatkhiraUpazila;
  featuredImage: string;
  imageCaption?: string;
  author: {
    name: string;
    role: string;
    location: string;
    avatar?: string;
  };
  publishedAt: string; // ISO string
  updatedAt?: string;
  scheduledAt?: string;
  isBreaking?: boolean;
  isTopHeadline?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  viewCount: number;
  tags: string[];
  status: 'published' | 'draft' | 'scheduled' | 'pending_review';
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    keywords?: string[];
  };
}

export interface BreakingNewsItem {
  id: string;
  title: string;
  linkArticleId?: string;
  isActive: boolean;
  createdAt: string;
  priority?: number;
}

export interface AdConfiguration {
  id: string;
  slot: 'header_banner' | 'sidebar_banner' | 'in_article' | 'footer_banner' | 'popunder' | 'popup' | 'direct_link' | 'socialbar' | 'native_banner';
  name: string;
  enabled: boolean;
  codeSnippet: string;
  bannerType: 'image' | 'script' | 'direct_link' | 'adsense';
  bannerImageUrl?: string;
  targetUrl?: string;
  dimensions?: string;
  adSenseClientId?: string;
  adSenseSlotId?: string;
  note?: string;
}

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  ogImageUrl?: string;
  canonicalUrl?: string;
  googleAnalyticsId?: string;
  googleSearchConsoleCode?: string;
}

export interface WebsiteSettings {
  siteName: string;
  tagline: string;
  editorName: string;
  publisherName: string;
  contactEmail: string;
  contactPhone: string;
  mainOfficeAddress: string;
  dhakaOfficeAddress: string;
  facebookUrl: string;
  twitterUrl: string;
  telegramUrl: string;
  whatsappNumber: string;
  youtubeUrl: string;
  googleNewsUrl?: string;
  logoText: string;
  metaDescriptionDefault: string;
  footerNotice: string;
  ePaperUrl?: string;
  liveStreamUrl?: string;
  seoSettings?: SeoSettings;
}

export interface CommentItem {
  id: string;
  articleId: string;
  userName: string;
  userEmail: string;
  comment: string;
  createdAt: string;
  likes: number;
  isApproved: boolean;
}

export interface PollQuestion {
  id: string;
  question: string;
  totalVotes: number;
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
  isActive: boolean;
  createdAt: string;
}

export interface PhotoStory {
  id: string;
  title: string;
  imageUrl: string;
  photographer: string;
  location: string;
  caption: string;
  date: string;
}

export interface VideoNews {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  publishedAt: string;
  viewCount: number;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export interface RevenueSettings {
  cpmRateUsd: number; // e.g. $1.20 per 1000 pageviews
  usdToBdtRate: number; // e.g. 122.50 BDT per USD
  directAdMonthlyBdt: number; // Fixed direct local ads income
  activeAdNetwork: 'adsterra' | 'adsense' | 'all';
}

export interface DailyTrafficRecord {
  date: string; // e.g. '২০২৬-০৩-০১' or formatted
  dayName: string; // e.g. 'সোমবার'
  visitors: number;
  pageviews: number;
  earningsBdt: number;
  earningsUsd: number;
}

export interface TrafficSourceItem {
  name: string;
  percentage: number;
  count: number;
  color: string;
}

export interface LocationTrafficItem {
  name: string;
  percentage: number;
  count: number;
}

export interface ReporterAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string; // Individual secret password for each reporter
  designation: string; // e.g. 'সাতক্ষীরা সদর প্রতিনিধি', 'শ্যামনগর প্রতিনিধি', 'বিশেষ প্রতিবেদক'
  upazila: SatkhiraUpazila;
  avatar?: string;
  status: 'active' | 'pending' | 'suspended';
  canAutoPublish: boolean;
  joinedDate: string;
  pressCardNumber: string;
  bio?: string;
  nidOrIdNumber?: string;
}

