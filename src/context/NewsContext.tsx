import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  NewsArticle, 
  BreakingNewsItem, 
  AdConfiguration, 
  WebsiteSettings, 
  PollQuestion, 
  PhotoStory, 
  VideoNews, 
  NewsCategory, 
  CommentItem, 
  MediaItem,
  RevenueSettings,
  DailyTrafficRecord,
  TrafficSourceItem,
  LocationTrafficItem,
  ReporterAccount,
  SatkhiraUpazila
} from '../types';
import { 
  INITIAL_ARTICLES, 
  INITIAL_BREAKING_NEWS, 
  INITIAL_SETTINGS, 
  INITIAL_ADS, 
  INITIAL_POLL, 
  INITIAL_PHOTO_STORIES, 
  INITIAL_VIDEO_NEWS,
  INITIAL_REPORTERS
} from '../data/initialData';
import { updateArticleMetaTags, resetHomeMetaTags } from '../utils/seo';
import { 
  createArticleSlug, 
  getArticleUrl, 
  getArticleShareUrl, 
  parseRouteFromUrl 
} from '../utils/helpers';

interface NewsContextType {
  // Articles
  articles: NewsArticle[];
  addArticle: (article: Omit<NewsArticle, 'id' | 'viewCount' | 'publishedAt'>) => void;
  updateArticle: (id: string, updated: Partial<NewsArticle>) => void;
  deleteArticle: (id: string) => void;
  incrementArticleViews: (id: string) => void;
  
  // Breaking News
  breakingNews: BreakingNewsItem[];
  addBreakingNews: (title: string, linkArticleId?: string) => void;
  toggleBreakingNews: (id: string) => void;
  deleteBreakingNews: (id: string) => void;
  
  // Ads
  adConfigs: AdConfiguration[];
  updateAdConfig: (id: string, updated: Partial<AdConfiguration>) => void;
  
  // Settings
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;

  // Real-time Traffic & Revenue Analytics
  liveActiveVisitors: number;
  revenueSettings: RevenueSettings;
  updateRevenueSettings: (updated: Partial<RevenueSettings>) => void;
  trafficHistory: DailyTrafficRecord[];
  trafficSources: TrafficSourceItem[];
  locationTraffic: LocationTrafficItem[];
  calculateIncome: (pageviews: number, customCpm?: number) => { usd: number; bdt: number };
  
  // Poll
  poll: PollQuestion;
  votePoll: (optionId: string) => void;
  hasVotedPoll: boolean;
  
  // Photo & Video
  photoStories: PhotoStory[];
  videoNews: VideoNews[];
  addPhotoStory: (story: Omit<PhotoStory, 'id'>) => void;
  addVideoNews: (video: Omit<VideoNews, 'id' | 'viewCount'>) => void;
  
  // Comments
  comments: CommentItem[];
  addComment: (articleId: string, userName: string, userEmail: string, commentText: string) => void;
  likeComment: (commentId: string) => void;
  
  // Media Library
  mediaLibrary: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => void;
  deleteMediaItem: (id: string) => void;

  // Bookmarks
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;

  // Reporter System & Authentication
  reporters: ReporterAccount[];
  currentReporter: ReporterAccount | null;
  addReporter: (data: Omit<ReporterAccount, 'id' | 'joinedDate' | 'pressCardNumber'>) => void;
  updateReporter: (id: string, updated: Partial<ReporterAccount>) => void;
  deleteReporter: (id: string) => void;
  loginReporter: (identifier: string, password: string) => { success: boolean; message?: string };
  logoutReporter: () => void;
  applyAsReporter: (data: { name: string; phone: string; email: string; upazila: SatkhiraUpazila; designation: string; password: string; bio?: string }) => void;

  // Navigation & View Routing State
  currentView: 'home' | 'article' | 'category' | 'search' | 'admin' | 'reporter' | 'about' | 'contact' | 'privacy' | 'terms' | 'bookmarks';
  setCurrentView: (view: 'home' | 'article' | 'category' | 'search' | 'admin' | 'reporter' | 'about' | 'contact' | 'privacy' | 'terms' | 'bookmarks') => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Dedicated URL Routing Helpers
  openArticle: (id: string, pushHistory?: boolean) => void;
  goToHome: (pushHistory?: boolean) => void;
  openCategory: (cat: string, pushHistory?: boolean) => void;
  openView: (view: 'home' | 'article' | 'category' | 'search' | 'admin' | 'reporter' | 'about' | 'contact' | 'privacy' | 'terms' | 'bookmarks', pushHistory?: boolean) => void;
  getArticleUrl: (article: NewsArticle | { id: string; title?: string } | string) => string;
  getArticleShareUrl: (article: NewsArticle) => string;
  createArticleSlug: (title: string) => string;
  
  // Theme & Reading experience
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  readingFontSize: 'normal' | 'large' | 'xlarge';
  setReadingFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  
  // Admin Auth simulation
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  
  // Reset / Export
  resetToDefaultData: () => void;
  exportDatabaseJson: () => string;
  importDatabaseJson: (jsonStr: string) => boolean;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Articles
  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('satkhira_news_articles');
    if (saved) {
      try {
        const parsed: NewsArticle[] = JSON.parse(saved);
        // Custom user-created articles (e.g. from reporter portal or admin)
        const customArticles = parsed.filter(p => !INITIAL_ARTICLES.some(init => init.id === p.id));
        
        // Initial articles: use latest INITIAL_ARTICLES definitions so fresh portal news is always visible
        const currentInitialArticles = INITIAL_ARTICLES.map(init => {
          const userModified = parsed.find(p => p.id === init.id);
          // If user edited viewCount or specific fields, preserve them, but ensure fields exist
          return userModified ? { ...init, viewCount: Math.max(init.viewCount, userModified.viewCount || 0) } : init;
        });

        // Combine: custom newly published articles first, then initial portal articles
        const combined = [...customArticles, ...currentInitialArticles];
        return combined.map(a => {
          if (a.id === 'art-9' && (a.author.name === 'অধ্যাপক এম এ হাসান' || a.author.name.includes('এম এ হাসান'))) {
            return {
              ...a,
              author: {
                ...a.author,
                name: 'মো: আল ইমরান হোসেন',
                role: 'কলামিস্ট ও লেখক',
                avatar: ''
              }
            };
          }
          return a;
        });
      } catch {
        return INITIAL_ARTICLES;
      }
    }
    return INITIAL_ARTICLES;
  });

  // Breaking News
  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>(() => {
    const saved = localStorage.getItem('satkhira_news_breaking');
    if (saved) {
      try {
        const parsed: BreakingNewsItem[] = JSON.parse(saved);
        const customBreaking = parsed.filter(p => !INITIAL_BREAKING_NEWS.some(init => init.id === p.id));
        return [...customBreaking, ...INITIAL_BREAKING_NEWS];
      } catch {
        return INITIAL_BREAKING_NEWS;
      }
    }
    return INITIAL_BREAKING_NEWS;
  });

  // Ads
  const [adConfigs, setAdConfigs] = useState<AdConfiguration[]>(() => {
    const saved = localStorage.getItem('satkhira_news_ads');
    if (saved) {
      try {
        const parsed: AdConfiguration[] = JSON.parse(saved);
        // Merge with initial ads to guarantee all slots (like popup, native_banner, popunder) exist
        const mergedAds = INITIAL_ADS.map(initAd => {
          const found = parsed.find(p => p.id === initAd.id || p.slot === initAd.slot);
          return found ? { ...initAd, ...found } : initAd;
        });
        return mergedAds;
      } catch {
        return INITIAL_ADS;
      }
    }
    return INITIAL_ADS;
  });

  // Settings
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('satkhira_news_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const merged: WebsiteSettings = {
          ...INITIAL_SETTINGS,
          ...parsed,
          seoSettings: {
            ...INITIAL_SETTINGS.seoSettings,
            ...(parsed.seoSettings || {})
          }
        };
        if (merged.telegramUrl === 'https://t.me/SatkhiraTimesOfficial' || !merged.telegramUrl) {
          merged.telegramUrl = INITIAL_SETTINGS.telegramUrl;
        }
        return merged;
      } catch {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });

  // Poll
  const [poll, setPoll] = useState<PollQuestion>(() => {
    const saved = localStorage.getItem('satkhira_news_poll');
    return saved ? JSON.parse(saved) : INITIAL_POLL;
  });
  const [hasVotedPoll, setHasVotedPoll] = useState<boolean>(() => {
    return localStorage.getItem('satkhira_poll_voted') === 'true';
  });

  // Photos & Videos
  const [photoStories, setPhotoStories] = useState<PhotoStory[]>(INITIAL_PHOTO_STORIES);
  const [videoNews, setVideoNews] = useState<VideoNews[]>(INITIAL_VIDEO_NEWS);

  // Comments
  const [comments, setComments] = useState<CommentItem[]>(() => {
    const saved = localStorage.getItem('satkhira_news_comments');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'c1',
        articleId: 'art-1',
        userName: 'মো. তরিকুল ইসলাম',
        userEmail: 'torikul@gmail.com',
        comment: 'সুন্দরবনের বন্যপ্রাণী রক্ষায় এমন কঠোর অভিযান নিয়মিত পরিচালনা করা জরুরি। বনবিভাগ ও কোস্টগার্ডকে ধন্যবাদ।',
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        likes: 12,
        isApproved: true
      },
      {
        id: 'c2',
        articleId: 'art-7',
        userName: 'আসিফ জামান',
        userEmail: 'asif@gmail.com',
        comment: 'সাতক্ষীরার গর্ব আমাদের মুস্তাফিজ ভাই! ফাইনালেও এমন আগুনে বোলিং দেখতে চাই। শুভকামনা টাইগারদের জন্য।',
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        likes: 28,
        isApproved: true
      }
    ];
  });

  // Media library
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([
    {
      id: 'm1',
      name: 'সুন্দরবন সাতক্ষীরা রেঞ্জ ফরেস্ট',
      url: 'https://images.unsplash.com/photo-1544985361-b552945d8b88?w=1200&auto=format&fit=crop&q=80',
      size: '1.2 MB',
      type: 'image/jpeg',
      uploadedAt: new Date().toLocaleDateString('bn-BD')
    },
    {
      id: 'm2',
      name: 'ভোমরা স্থলবন্দর বাণিজ্যিক টার্মিনাল',
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
      size: '2.4 MB',
      type: 'image/jpeg',
      uploadedAt: new Date().toLocaleDateString('bn-BD')
    },
    {
      id: 'm3',
      name: 'সাতক্ষীরা হিমসাগর আম বাগান',
      url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=1200&auto=format&fit=crop&q=80',
      size: '1.8 MB',
      type: 'image/jpeg',
      uploadedAt: new Date().toLocaleDateString('bn-BD')
    }
  ]);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('satkhira_bookmarks');
    return saved ? JSON.parse(saved) : ['art-1', 'art-3'];
  });

  // Router State initialized from URL query params or pathnames (/news/:id)
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'category' | 'search' | 'admin' | 'reporter' | 'about' | 'contact' | 'privacy' | 'terms' | 'bookmarks'>(() => {
    if (typeof window !== 'undefined') {
      const route = parseRouteFromUrl();
      if (route.articleId) return 'article';
      if (route.category) return 'category';
      if (route.view) return route.view as any;
    }
    return 'home';
  });

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const route = parseRouteFromUrl();
      return route.articleId;
    }
    return null;
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const route = parseRouteFromUrl();
      return route.category;
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const route = parseRouteFromUrl();
      return route.search || '';
    }
    return '';
  });

  // Dedicated Navigation Helper Functions
  const openArticle = (id: string, pushHistory = true) => {
    const art = articles.find(a => a.id === id);
    setSelectedArticleId(id);
    setCurrentView('article');
    if (art) {
      incrementArticleViews(id);
      updateArticleMetaTags(art, settings);
      if (pushHistory && typeof window !== 'undefined') {
        const articleUrl = getArticleUrl(art);
        window.history.pushState({ view: 'article', id }, '', articleUrl);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHome = (pushHistory = true) => {
    setCurrentView('home');
    setSelectedArticleId(null);
    setSelectedCategory(null);
    resetHomeMetaTags(settings);
    if (pushHistory && typeof window !== 'undefined') {
      window.history.pushState({ view: 'home' }, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCategory = (cat: string, pushHistory = true) => {
    setSelectedCategory(cat);
    setCurrentView('category');
    setSelectedArticleId(null);
    resetHomeMetaTags(settings);
    if (pushHistory && typeof window !== 'undefined') {
      const url = `${window.location.pathname}?category=${encodeURIComponent(cat)}`;
      window.history.pushState({ view: 'category', category: cat }, '', url);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openView = (view: 'home' | 'article' | 'category' | 'search' | 'admin' | 'reporter' | 'about' | 'contact' | 'privacy' | 'terms' | 'bookmarks', pushHistory = true) => {
    setCurrentView(view);
    setSelectedArticleId(null);
    resetHomeMetaTags(settings);
    if (pushHistory && typeof window !== 'undefined') {
      const url = view === 'home' ? window.location.pathname : `${window.location.pathname}?view=${view}`;
      window.history.pushState({ view }, '', url);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync URL search params and OpenGraph tags dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (currentView === 'article' && selectedArticleId) {
      const currentArt = articles.find(a => a.id === selectedArticleId);
      if (currentArt) {
        updateArticleMetaTags(currentArt, settings);
        const articleUrl = getArticleUrl(currentArt);
        window.history.replaceState({ view: 'article', id: selectedArticleId }, '', articleUrl);
      }
    } else if (currentView === 'category' && selectedCategory) {
      resetHomeMetaTags(settings);
      const url = `${window.location.pathname}?category=${encodeURIComponent(selectedCategory)}`;
      window.history.replaceState({ view: 'category', category: selectedCategory }, '', url);
    } else if (currentView === 'home') {
      resetHomeMetaTags(settings);
      window.history.replaceState({ view: 'home' }, '', window.location.pathname);
    } else {
      resetHomeMetaTags(settings);
      const url = `${window.location.pathname}?view=${currentView}`;
      window.history.replaceState({ view: currentView }, '', url);
    }
  }, [currentView, selectedArticleId, selectedCategory, articles, settings]);

  // Handle Browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const route = parseRouteFromUrl();

      if (route.articleId) {
        setSelectedArticleId(route.articleId);
        setCurrentView('article');
        const art = articles.find(a => a.id === route.articleId);
        if (art) updateArticleMetaTags(art, settings);
      } else if (route.category) {
        setSelectedCategory(route.category);
        setCurrentView('category');
        resetHomeMetaTags(settings);
      } else if (route.view) {
        setCurrentView(route.view as any);
        resetHomeMetaTags(settings);
      } else {
        setCurrentView('home');
        setSelectedArticleId(null);
        setSelectedCategory(null);
        resetHomeMetaTags(settings);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [articles, settings]);


  // Revenue Settings
  const [revenueSettings, setRevenueSettings] = useState<RevenueSettings>(() => {
    const saved = localStorage.getItem('satkhira_revenue_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      cpmRateUsd: 1.25, // $1.25 per 1,000 pageviews
      usdToBdtRate: 122.50, // 1 USD = 122.50 BDT
      directAdMonthlyBdt: 8500, // Monthly direct banners income
      activeAdNetwork: 'all'
    };
  });

  const updateRevenueSettings = (updated: Partial<RevenueSettings>) => {
    setRevenueSettings(prev => {
      const next = { ...prev, ...updated };
      localStorage.setItem('satkhira_revenue_settings', JSON.stringify(next));
      return next;
    });
  };

  // Real-time Live Visitors pulse (Realistic simulation based on active reading traffic)
  const [liveActiveVisitors, setLiveActiveVisitors] = useState<number>(() => {
    return Math.floor(Math.random() * 8) + 24; // 24 to 32 active readers
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveActiveVisitors(prev => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
        const nextVal = prev + delta;
        return Math.max(16, Math.min(68, nextVal));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate earnings helper
  const calculateIncome = (pageviews: number, customCpm?: number) => {
    const cpm = customCpm !== undefined ? customCpm : revenueSettings.cpmRateUsd;
    const usd = (pageviews / 1000) * cpm;
    const bdt = usd * revenueSettings.usdToBdtRate;
    return { usd, bdt };
  };

  // 7-day Traffic History
  const trafficHistory: DailyTrafficRecord[] = React.useMemo(() => {
    const totalCurrentViews = articles.reduce((acc, a) => acc + a.viewCount, 0);
    const days = [
      { name: 'আজ (চলমান)', offset: 0, viewShare: 0.18 },
      { name: 'গতকাল', offset: 1, viewShare: 0.16 },
      { name: '২ দিন আগে', offset: 2, viewShare: 0.15 },
      { name: '৩ দিন আগে', offset: 3, viewShare: 0.14 },
      { name: '৪ দিন আগে', offset: 4, viewShare: 0.13 },
      { name: '৫ দিন আগে', offset: 5, viewShare: 0.12 },
      { name: '৬ দিন আগে', offset: 6, viewShare: 0.12 },
    ];

    return days.map(d => {
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() - d.offset);
      const dateStr = dateObj.toLocaleDateString('bn-BD', { month: 'short', day: 'numeric' });
      
      const pviews = Math.round(totalCurrentViews * d.viewShare) + (d.offset === 0 ? 120 : 0);
      const visitors = Math.round(pviews * 0.38);
      const { usd, bdt } = calculateIncome(pviews);

      return {
        date: dateStr,
        dayName: d.name,
        visitors,
        pageviews: pviews,
        earningsBdt: Math.round(bdt * 10) / 10,
        earningsUsd: Math.round(usd * 100) / 100
      };
    });
  }, [articles, revenueSettings]);

  // Traffic Sources
  const trafficSources: TrafficSourceItem[] = [
    { name: 'ফেসবুক ও সোশ্যাল মিডিয়া (Facebook & Social)', percentage: 64, count: Math.round(articles.reduce((a, b) => a + b.viewCount, 0) * 0.64), color: '#1877F2' },
    { name: 'গুগল সার্চ ও অর্গানিক (Google Search & SEO)', percentage: 19, count: Math.round(articles.reduce((a, b) => a + b.viewCount, 0) * 0.19), color: '#EA4335' },
    { name: 'সরাসরি ওয়েব ব্রাউজিং (Direct URL / Bookmarks)', percentage: 11, count: Math.round(articles.reduce((a, b) => a + b.viewCount, 0) * 0.11), color: '#10B981' },
    { name: 'হোয়াটসঅ্যাপ ও মেসেঞ্জার শেয়ারিং (WhatsApp & Chat)', percentage: 6, count: Math.round(articles.reduce((a, b) => a + b.viewCount, 0) * 0.06), color: '#25D366' }
  ];

  // Location Traffic
  const locationTraffic: LocationTrafficItem[] = [
    { name: 'সাতক্ষীরা সদর ও পৌরসভা', percentage: 38, count: Math.round(articles.reduce((a, b) => a + b.viewCount, 0) * 0.38) },
    { name: 'শ্যামনগর ও উপকূলীয় সুন্দরবন অঞ্চল', percentage: 21, count: Math.round(articles.reduce((a, b) => a + b.viewCount, 0) * 0.21) },
    { name: 'কালীগঞ্জ ও আশাশুনি', percentage: 15, count: Math.round(articles.reduce((a, b) => a + b.viewCount, 0) * 0.15) },
    { name: 'কলারোয়া, দেবহাটা ও তালা', percentage: 12, count: Math.round(articles.reduce((a, b) => a + b.viewCount, 0) * 0.12) },
    { name: 'ঢাকা ও অন্যান্য জেলা', percentage: 8, count: Math.round(articles.reduce((a, b) => a + b.viewCount, 0) * 0.08) },
    { name: 'প্রবাসী পাঠক (মধ্যপ্রাচ্য, ইউরোপ, আমেরিকা)', percentage: 6, count: Math.round(articles.reduce((a, b) => a + b.viewCount, 0) * 0.06) }
  ];

  // UI Theme & Reading
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('satkhira_theme') === 'dark';
  });
  const [readingFontSize, setReadingFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Admin Auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('satkhira_admin_auth') === 'true';
  });

  // Reporter System State
  const [reporters, setReporters] = useState<ReporterAccount[]>(() => {
    const saved = localStorage.getItem('satkhira_reporters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_REPORTERS;
      }
    }
    return INITIAL_REPORTERS;
  });

  const [currentReporter, setCurrentReporter] = useState<ReporterAccount | null>(() => {
    const saved = sessionStorage.getItem('satkhira_reporter_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('satkhira_reporters', JSON.stringify(reporters));
  }, [reporters]);

  useEffect(() => {
    if (currentReporter) {
      sessionStorage.setItem('satkhira_reporter_user', JSON.stringify(currentReporter));
    } else {
      sessionStorage.removeItem('satkhira_reporter_user');
    }
  }, [currentReporter]);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('satkhira_news_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('satkhira_news_breaking', JSON.stringify(breakingNews));
  }, [breakingNews]);

  useEffect(() => {
    localStorage.setItem('satkhira_news_ads', JSON.stringify(adConfigs));
  }, [adConfigs]);

  useEffect(() => {
    localStorage.setItem('satkhira_news_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('satkhira_news_poll', JSON.stringify(poll));
  }, [poll]);

  useEffect(() => {
    localStorage.setItem('satkhira_news_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('satkhira_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('satkhira_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('satkhira_theme', 'light');
    }
  }, [isDarkMode]);

  // Actions
  const addArticle = (data: Omit<NewsArticle, 'id' | 'viewCount' | 'publishedAt'>) => {
    const newArt: NewsArticle = {
      ...data,
      id: `art-${Date.now()}`,
      viewCount: 1,
      publishedAt: new Date().toISOString(),
    };
    setArticles(prev => [newArt, ...prev]);
    
    // If marked as breaking, add to breaking ticker automatically
    if (newArt.isBreaking) {
      addBreakingNews(newArt.title, newArt.id);
    }
  };

  const updateArticle = (id: string, updated: Partial<NewsArticle>) => {
    setArticles(prev => prev.map(art => art.id === id ? { ...art, ...updated, updatedAt: new Date().toISOString() } : art));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(art => art.id !== id));
  };

  const incrementArticleViews = (id: string) => {
    setArticles(prev => prev.map(art => art.id === id ? { ...art, viewCount: art.viewCount + 1 } : art));
  };

  const addBreakingNews = (title: string, linkArticleId?: string) => {
    const newItem: BreakingNewsItem = {
      id: `b-${Date.now()}`,
      title,
      linkArticleId,
      isActive: true,
      createdAt: new Date().toISOString(),
      priority: 1
    };
    setBreakingNews(prev => [newItem, ...prev]);
  };

  const toggleBreakingNews = (id: string) => {
    setBreakingNews(prev => prev.map(item => item.id === id ? { ...item, isActive: !item.isActive } : item));
  };

  const deleteBreakingNews = (id: string) => {
    setBreakingNews(prev => prev.filter(item => item.id !== id));
  };

  const updateAdConfig = (id: string, updated: Partial<AdConfiguration>) => {
    setAdConfigs(prev => prev.map(ad => ad.id === id ? { ...ad, ...updated } : ad));
  };

  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings(prev => {
      const merged: WebsiteSettings = {
        ...prev,
        ...newSettings,
        seoSettings: {
          ...(prev.seoSettings || INITIAL_SETTINGS.seoSettings || {
            siteTitle: 'THE SATKHIRA TIMES',
            metaDescription: ''
          }),
          ...(newSettings.seoSettings || {})
        }
      };
      resetHomeMetaTags(merged);
      return merged;
    });
  };

  const votePoll = (optionId: string) => {
    if (hasVotedPoll) return;
    setPoll(prev => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      options: prev.options.map(opt => opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt)
    }));
    setHasVotedPoll(true);
    localStorage.setItem('satkhira_poll_voted', 'true');
  };

  const addPhotoStory = (story: Omit<PhotoStory, 'id'>) => {
    const newStory: PhotoStory = {
      ...story,
      id: `ps-${Date.now()}`
    };
    setPhotoStories(prev => [newStory, ...prev]);
  };

  const addVideoNews = (video: Omit<VideoNews, 'id' | 'viewCount'>) => {
    const newVideo: VideoNews = {
      ...video,
      id: `vn-${Date.now()}`,
      viewCount: 1
    };
    setVideoNews(prev => [newVideo, ...prev]);
  };

  const addComment = (articleId: string, userName: string, userEmail: string, commentText: string) => {
    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      articleId,
      userName,
      userEmail,
      comment: commentText,
      createdAt: new Date().toISOString(),
      likes: 0,
      isApproved: true
    };
    setComments(prev => [newComment, ...prev]);
  };

  const likeComment = (commentId: string) => {
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
  };

  const addMediaItem = (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    const newMedia: MediaItem = {
      ...item,
      id: `m-${Date.now()}`,
      uploadedAt: new Date().toLocaleDateString('bn-BD')
    };
    setMediaLibrary(prev => [newMedia, ...prev]);
  };

  const deleteMediaItem = (id: string) => {
    setMediaLibrary(prev => prev.filter(m => m.id !== id));
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const loginAdmin = (password: string) => {
    if (password === 'admin' || password === '1234' || password === 'satkhira' || password === 'admin123' || password === 'satkhira2026') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('satkhira_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('satkhira_admin_auth');
  };

  // Reporter Management Handlers
  const addReporter = (data: Omit<ReporterAccount, 'id' | 'joinedDate' | 'pressCardNumber'>) => {
    const newId = `rep-${Date.now()}`;
    const newReporter: ReporterAccount = {
      ...data,
      id: newId,
      joinedDate: new Date().toISOString().split('T')[0],
      pressCardNumber: `ST-REP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
    };
    setReporters(prev => [newReporter, ...prev]);
  };

  const updateReporter = (id: string, updated: Partial<ReporterAccount>) => {
    setReporters(prev => prev.map(rep => {
      if (rep.id === id) {
        const mod = { ...rep, ...updated };
        if (currentReporter && currentReporter.id === id) {
          setCurrentReporter(mod);
        }
        return mod;
      }
      return rep;
    }));
  };

  const deleteReporter = (id: string) => {
    setReporters(prev => prev.filter(r => r.id !== id));
    if (currentReporter && currentReporter.id === id) {
      setCurrentReporter(null);
    }
  };

  const loginReporter = (identifier: string, password: string): { success: boolean; message?: string } => {
    const cleanId = identifier.trim().toLowerCase();
    const found = reporters.find(r => 
      r.email.toLowerCase() === cleanId || 
      r.phone.replace(/[^0-9]/g, '') === cleanId.replace(/[^0-9]/g, '') ||
      r.name.toLowerCase() === cleanId ||
      r.pressCardNumber.toLowerCase() === cleanId
    );

    if (!found) {
      return { success: false, message: 'সাংবাদিক অ্যাকাউন্ট খুঁজে পাওয়া যায়নি! সঠিক ইমেইল বা ফোন নম্বর দিন।' };
    }

    if (found.status === 'suspended') {
      return { success: false, message: 'আপনার অ্যাকাউন্টটি সাময়িকভাবে স্থগিত (Suspended) করা হয়েছে। প্রধান সম্পাদকের সাথে যোগাযোগ করুন।' };
    }

    if (found.status === 'pending') {
      return { success: false, message: 'আপনার সাংবাদিক আবেদনটি এখনো প্রধান অ্যাডমিনের পর্যালোচনায় (Pending) রয়েছে। অনুমোদনের পর লগইন করতে পারবেন।' };
    }

    if (found.password !== password.trim()) {
      return { success: false, message: 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।' };
    }

    setCurrentReporter(found);
    return { success: true };
  };

  const logoutReporter = () => {
    setCurrentReporter(null);
    sessionStorage.removeItem('satkhira_reporter_user');
  };

  const applyAsReporter = (data: { name: string; phone: string; email: string; upazila: SatkhiraUpazila; designation: string; password: string; bio?: string }) => {
    const newReporter: ReporterAccount = {
      id: `rep-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      upazila: data.upazila,
      designation: data.designation || `${data.upazila} প্রতিনিধি`,
      bio: data.bio || '',
      status: 'pending',
      canAutoPublish: false,
      joinedDate: new Date().toISOString().split('T')[0],
      pressCardNumber: `ST-APP-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setReporters(prev => [newReporter, ...prev]);
  };

  const resetToDefaultData = () => {
    setArticles(INITIAL_ARTICLES);
    setBreakingNews(INITIAL_BREAKING_NEWS);
    setAdConfigs(INITIAL_ADS);
    setSettings(INITIAL_SETTINGS);
    setPoll(INITIAL_POLL);
    localStorage.removeItem('satkhira_poll_voted');
    setHasVotedPoll(false);
  };

  const exportDatabaseJson = () => {
    const payload = {
      articles,
      breakingNews,
      adConfigs,
      settings,
      poll,
      comments,
      photoStories,
      videoNews,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };
    return JSON.stringify(payload, null, 2);
  };

  const importDatabaseJson = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.articles) setArticles(data.articles);
      if (data.breakingNews) setBreakingNews(data.breakingNews);
      if (data.adConfigs) setAdConfigs(data.adConfigs);
      if (data.settings) setSettings(data.settings);
      if (data.poll) setPoll(data.poll);
      if (data.comments) setComments(data.comments);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <NewsContext.Provider value={{
      articles,
      addArticle,
      updateArticle,
      deleteArticle,
      incrementArticleViews,
      breakingNews,
      addBreakingNews,
      toggleBreakingNews,
      deleteBreakingNews,
      adConfigs,
      updateAdConfig,
      settings,
      updateSettings,
      liveActiveVisitors,
      revenueSettings,
      updateRevenueSettings,
      trafficHistory,
      trafficSources,
      locationTraffic,
      calculateIncome,
      poll,
      votePoll,
      hasVotedPoll,
      photoStories,
      videoNews,
      addPhotoStory,
      addVideoNews,
      comments,
      addComment,
      likeComment,
      mediaLibrary,
      addMediaItem,
      deleteMediaItem,
      bookmarkedIds,
      toggleBookmark,
      reporters,
      currentReporter,
      addReporter,
      updateReporter,
      deleteReporter,
      loginReporter,
      logoutReporter,
      applyAsReporter,
      currentView,
      setCurrentView,
      selectedArticleId,
      setSelectedArticleId,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      openArticle,
      goToHome,
      openCategory,
      openView,
      getArticleUrl,
      getArticleShareUrl,
      createArticleSlug,
      isDarkMode,
      toggleDarkMode,
      readingFontSize,
      setReadingFontSize,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      resetToDefaultData,
      exportDatabaseJson,
      importDatabaseJson
    }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
