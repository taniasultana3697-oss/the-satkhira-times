import React from 'react';
import { NewsProvider, useNews } from './context/NewsContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BreakingTicker } from './components/news/BreakingTicker';
import { HeadlineHero } from './components/news/HeadlineHero';
import { SatkhiraSpecialSection } from './components/news/SatkhiraSpecialSection';
import { CategoryGridSection } from './components/news/CategoryGridSection';
import { MediaGallerySection } from './components/news/MediaGallerySection';
import { OpinionSection } from './components/news/OpinionSection';
import { ArticleDetailPage } from './components/news/ArticleDetailPage';
import { CategoryArchiveView } from './components/news/CategoryArchiveView';
import { BookmarksView } from './components/news/BookmarksView';
import { StaticPages } from './components/pages/StaticPages';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdBanner } from './components/ads/AdBanner';
import { AdsterraGlobalScripts } from './components/ads/AdsterraGlobalScripts';
import { PopupAdModal } from './components/ads/PopupAdModal';

const MainPortalContent: React.FC = () => {
  const { currentView } = useNews();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-red-600 selection:text-white">
      {/* Global Adsterra Background Scripts (Popunder & Socialbar) */}
      <AdsterraGlobalScripts />

      {/* Pop-up Ad Modal (Welcome / Sponsored Pop-up Window) */}
      <PopupAdModal />

      {/* Top Main Navigation */}
      <Header />

      {/* Breaking News Ticker (visible on all public news views) */}
      {currentView !== 'admin' && <BreakingTicker />}

      {/* Main Content Router */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            {/* Top Headline Hero */}
            <HeadlineHero />

            {/* Special Local Satkhira Hub (7 Upazilas) */}
            <SatkhiraSpecialSection />

            {/* Adsterra Native Banner between sections */}
            <div className="max-w-7xl mx-auto px-4 my-4">
              <AdBanner slot="in_article" />
            </div>

            {/* Category News Grids */}
            <CategoryGridSection />

            {/* Adsterra Direct Link Smart Offer Card */}
            <div className="max-w-7xl mx-auto px-4 my-2">
              <AdBanner slot="direct_link" />
            </div>

            {/* Photo & Video Multimedia Gallery */}
            <MediaGallerySection />

            {/* Opinion & Reader Poll */}
            <OpinionSection />
          </>
        )}

        {currentView === 'article' && <ArticleDetailPage />}

        {currentView === 'category' && <CategoryArchiveView />}

        {currentView === 'bookmarks' && <BookmarksView />}

        {currentView === 'admin' && <AdminLayout />}

        {(currentView === 'about' || currentView === 'contact' || currentView === 'privacy' || currentView === 'terms') && (
          <StaticPages page={currentView} />
        )}
      </main>

      {/* Newspaper Footer with Sticky 728x90 Adsterra Banner */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <NewsProvider>
      <MainPortalContent />
    </NewsProvider>
  );
}
