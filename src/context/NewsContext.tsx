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
  MediaItem
} from '../types';
import { 
  INITIAL_ARTICLES, 
  INITIAL_BREAKING_NEWS, 
  INITIAL_SETTINGS, 
  INITIAL_ADS, 
  INITIAL_POLL, 
  INITIAL_PHOTO_STORIES, 
  INITIAL_VIDEO_NEWS 
} from '../data/initialData';

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

  // Navigation & View Routing State
  currentView: 'home' | 'article' | 'category' | 'search' | 'admin' | 'about' | 'contact' | 'privacy' | 'terms' | 'bookmarks';
  setCurrentView: (view: 'home' | 'article' | 'category' | 'search' | 'admin' | 'about' | 'contact' | 'privacy' | 'terms' | 'bookmarks') => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
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
        return parsed.map(a => {
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
    return saved ? JSON.parse(saved) : INITIAL_BREAKING_NEWS;
  });

  // Ads
  const [adConfigs, setAdConfigs] = useState<AdConfiguration[]>(() => {
    const saved = localStorage.getItem('satkhira_news_ads');
    return saved ? JSON.parse(saved) : INITIAL_ADS;
  });

  // Settings
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('satkhira_news_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
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

  // Router State
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'category' | 'search' | 'admin' | 'about' | 'contact' | 'privacy' | 'terms' | 'bookmarks'>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // UI Theme & Reading
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('satkhira_theme') === 'dark';
  });
  const [readingFontSize, setReadingFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Admin Auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('satkhira_admin_auth') === 'true';
  });

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
    setSettings(prev => ({ ...prev, ...newSettings }));
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
    if (password === 'admin123' || password === 'satkhira2026') {
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
      currentView,
      setCurrentView,
      selectedArticleId,
      setSelectedArticleId,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
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
