import React from 'react';
import { useNews } from '../../context/NewsContext';
import { Bookmark, Clock, Eye, Trash2, ChevronRight, FolderOpen } from 'lucide-react';
import { getRelativeBengaliTime, toBengaliDigits } from '../../utils/helpers';

export const BookmarksView: React.FC = () => {
  const { 
    articles, 
    bookmarkedIds, 
    toggleBookmark, 
    setSelectedArticleId, 
    setCurrentView 
  } = useNews();

  const savedArticles = articles.filter(a => bookmarkedIds.includes(a.id));

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setCurrentView('article');
  };

  return (
    <div className="max-w-5xl mx-auto my-6 px-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 dark:bg-red-950 text-red-600 rounded-xl">
            <Bookmark className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-serif-bangla">
              সংরক্ষিত সংবাদ (বুকমার্কস)
            </h1>
            <p className="text-xs text-slate-500">
              আপনার সংরক্ষিত {toBengaliDigits(savedArticles.length)} টি সংবাদ এখানে রয়েছে
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('home')}
          className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold px-4 py-2 rounded-lg transition"
        >
          প্রচ্ছদে ফিরুন
        </button>
      </div>

      {savedArticles.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">
            আপনার কোনো সংবাদ বুকমার্ক করা নেই
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            যেকোনো সংবাদের বুকমার্ক আইকনে ক্লিক করে পরবর্তীতে পড়ার জন্য সংরক্ষণ করুন।
          </p>
          <button
            onClick={() => setCurrentView('home')}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2 rounded-lg transition"
          >
            সংবাদ পড়ুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleArticleClick(article.id)}
              className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:border-red-500 transition flex gap-4 items-start relative"
            >
              <div className="w-28 h-20 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <span className="text-[10px] font-bold text-red-600 uppercase">
                  {article.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-red-600 transition font-serif-bangla mt-0.5 leading-snug">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-2">
                  <Clock className="w-3 h-3 text-red-500" />
                  <span>{getRelativeBengaliTime(article.publishedAt)}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(article.id);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-600 p-1 transition"
                title="বুকমার্ক মুছুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
