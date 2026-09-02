import React from 'react';
import { useNews } from '../../context/NewsContext';
import { getRelativeBengaliTime, toBengaliDigits } from '../../utils/helpers';
import { Flame, Clock, Eye, Bookmark, Share2, MapPin, ChevronRight, TrendingUp } from 'lucide-react';
import { AdBanner } from '../ads/AdBanner';

export const HeadlineHero: React.FC = () => {
  const { 
    articles, 
    openArticle,
    openCategory,
    bookmarkedIds,
    toggleBookmark 
  } = useNews();

  // Find top lead story
  const publishedArticles = articles.filter(a => a.status === 'published');
  const leadArticle = publishedArticles.find(a => a.isTopHeadline) || publishedArticles[0];
  
  // Secondary headlines
  const subLeadArticles = publishedArticles
    .filter(a => a.id !== leadArticle?.id)
    .slice(0, 3);

  // Trending / Latest for the side column
  const latestArticles = [...publishedArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  const handleArticleClick = (id: string) => {
    openArticle(id);
  };

  const handleCategoryClick = (e: React.MouseEvent, cat: string) => {
    e.stopPropagation();
    openCategory(cat);
  };

  if (!leadArticle) return null;

  return (
    <section className="my-4 md:my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT & CENTER: Lead Story + Sub-leads (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Top Lead Story */}
          <div 
            onClick={() => handleArticleClick(leadArticle.id)}
            className="group cursor-pointer bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded overflow-hidden shadow-sm hover:border-[#8B0000] transition duration-300"
          >
            <div className="relative overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-zinc-900">
              <img 
                src={leadArticle.featuredImage} 
                alt={leadArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              
              {/* Category & Location Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
                <button
                  onClick={(e) => handleCategoryClick(e, leadArticle.category)}
                  className="bg-[#8B0000] hover:bg-red-800 text-white text-[10px] sm:text-xs font-bold font-sans uppercase px-2.5 py-0.5 rounded shadow-sm tracking-wider transition"
                >
                  {leadArticle.category}
                </button>
                {leadArticle.upazila && (
                  <span className="bg-black/70 backdrop-blur-sm text-amber-300 text-xs px-2 py-0.5 rounded font-sans font-medium flex items-center gap-1 border border-white/20">
                    <MapPin className="w-3 h-3 text-[#8B0000]" />
                    {leadArticle.upazila}
                  </span>
                )}
                {leadArticle.isBreaking && (
                  <span className="bg-[#8B0000] text-white text-[10px] sm:text-xs px-2 py-0.5 rounded font-bold font-sans uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-white" />
                    জরুরি
                  </span>
                )}
              </div>

              {/* Bottom Overlay Title & Subtitle */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight group-hover:text-red-200 transition duration-200 font-serif-bangla drop-shadow-md">
                  {leadArticle.title}
                </h2>
                {leadArticle.subtitle && (
                  <p className="text-xs sm:text-sm text-zinc-300 mt-2 line-clamp-1 hidden sm:block font-medium">
                    {leadArticle.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Details & Excerpt */}
            <div className="p-4 md:p-5">
              <p className="text-sm md:text-base text-gray-700 dark:text-zinc-300 leading-relaxed line-clamp-2 md:line-clamp-3 font-bangla">
                {leadArticle.excerpt}
              </p>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400 font-sans">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-800 dark:text-zinc-200">
                    {leadArticle.author.name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bangla">
                    <Clock className="w-3.5 h-3.5 text-[#8B0000]" />
                    {getRelativeBengaliTime(leadArticle.publishedAt)}
                  </span>
                  <span className="hidden sm:flex items-center gap-1 font-bangla">
                    <Eye className="w-3.5 h-3.5" />
                    {toBengaliDigits(leadArticle.viewCount)} বার পঠিত
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(leadArticle.id);
                    }}
                    className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition ${
                      bookmarkedIds.includes(leadArticle.id) ? 'text-[#8B0000]' : 'text-gray-400'
                    }`}
                    title="বুকমার্ক করুন"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                  <span className="text-[#8B0000] font-bold flex items-center gap-0.5 font-bangla group-hover:translate-x-1 transition">
                    সম্পূর্ণ পড়ুন <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Sub-Lead Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subLeadArticles.map((article) => (
              <div 
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                className="group cursor-pointer bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded p-3 shadow-sm hover:border-[#8B0000] transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video rounded overflow-hidden mb-2.5 bg-gray-100 dark:bg-zinc-800">
                    <img 
                      src={article.featuredImage} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-[#8B0000] text-white text-[10px] font-bold uppercase font-sans px-2 py-0.5 rounded shadow">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm md:text-base text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#8B0000] transition leading-snug font-serif-bangla">
                    {article.title}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-gray-500 dark:text-zinc-400 font-sans">
                  <span className="flex items-center gap-1 font-bangla">
                    <Clock className="w-3 h-3 text-[#8B0000]" />
                    {getRelativeBengaliTime(article.publishedAt)}
                  </span>
                  {article.upazila && (
                    <span className="text-gray-700 dark:text-zinc-300 font-medium font-bangla">
                      {article.upazila}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Trending / Latest News Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded p-4 shadow-sm">
          
          <div className="flex items-center justify-between border-b-2 border-black dark:border-zinc-700 pb-2 mb-3">
            <h3 className="font-bold text-base text-black dark:text-white flex items-center gap-1.5 font-serif-bangla">
              <TrendingUp className="w-4 h-4 text-[#8B0000]" />
              সর্বশেষ ও জনপ্রিয় সংবাদ
            </h3>
            <span className="text-[10px] font-bold font-sans uppercase text-[#8B0000] bg-red-50 dark:bg-zinc-800 px-2 py-0.5 rounded tracking-wider">
              লাইভ আপডেট
            </span>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-zinc-800">
            {latestArticles.map((article, idx) => (
              <div 
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                className="py-3 group cursor-pointer flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-zinc-800/50 p-2 rounded transition"
              >
                {/* Ranking Digit */}
                <div className="w-6 h-6 rounded bg-black text-white group-hover:bg-[#8B0000] flex items-center justify-center font-bold text-xs font-sans flex-shrink-0 transition">
                  {idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#8B0000] uppercase font-sans tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-gray-300 dark:text-zinc-700">•</span>
                    <span className="text-[10px] text-gray-400 font-bangla flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {getRelativeBengaliTime(article.publishedAt)}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-zinc-100 line-clamp-2 group-hover:text-[#8B0000] transition leading-snug font-bangla">
                    {article.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Adsterra 300x250 Sidebar Banner */}
          <div className="mt-4">
            <AdBanner slot="sidebar_banner" />
          </div>

          {/* Quick Newsletter Signup Box inside Side Column */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded text-center">
            <h4 className="text-xs font-bold text-black dark:text-white font-serif-bangla">
              দৈনিক খবরের আপডেট পেতে চান?
            </h4>
            <p className="text-[11px] text-gray-600 dark:text-zinc-400 mt-1">
              আমাদের হোয়াটসঅ্যাপ ও টেলিগ্রাম চ্যানেলে যুক্ত থাকুন।
            </p>
            <div className="mt-2.5 flex justify-center gap-2">
              <a 
                href="https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#229ED9] hover:opacity-90 text-white text-xs font-bold px-3 py-1 rounded transition shadow-sm font-sans flex items-center gap-1"
                title="টেলিগ্রাম চ্যানেলে জয়েন করুন"
              >
                <span>টেলিগ্রাম</span>
              </a>
              <a 
                href="https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:opacity-90 text-white text-xs font-bold px-3 py-1 rounded transition shadow-sm font-sans flex items-center gap-1"
                title="হোয়াটসঅ্যাপ চ্যানেলে যুক্ত হোন"
              >
                <span>হোয়াটসঅ্যাপ</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
