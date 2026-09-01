import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { getRelativeBengaliTime, toBengaliDigits, formatBengaliDate } from '../../utils/helpers';
import { 
  Filter, 
  Grid, 
  List, 
  Search, 
  MapPin, 
  Clock, 
  Eye, 
  ChevronRight,
  FolderOpen
} from 'lucide-react';
import { SATKHIRA_UPAZILAS, INITIAL_CATEGORIES } from '../../data/initialData';

export const CategoryArchiveView: React.FC = () => {
  const { 
    articles, 
    selectedCategory, 
    setSelectedCategory, 
    setSelectedArticleId, 
    setCurrentView, 
    searchQuery,
    setSearchQuery 
  } = useNews();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'views'>('latest');
  const [activeUpazilaFilter, setActiveUpazilaFilter] = useState<string>('সকল');

  // Parse if category is composite (e.g. "সাতক্ষীরা:শ্যামনগর")
  let targetCat = selectedCategory || '';
  let targetUpazila = '';

  if (targetCat.includes(':')) {
    const parts = targetCat.split(':');
    targetCat = parts[0];
    targetUpazila = parts[1];
  }

  // Filter articles
  let filtered = articles.filter(a => a.status === 'published');

  const selectedUpazila = targetUpazila || (activeUpazilaFilter !== 'সকল' ? activeUpazilaFilter : '');

  if (targetCat) {
    if (targetCat === 'সাতক্ষীরা') {
      if (selectedUpazila && selectedUpazila !== 'সকল') {
        filtered = filtered.filter(a => 
          a.upazila === selectedUpazila || 
          a.tags.includes(selectedUpazila) || 
          a.title.includes(selectedUpazila) ||
          a.content.includes(selectedUpazila) ||
          a.location?.includes(selectedUpazila)
        );
      } else {
        filtered = filtered.filter(a => 
          a.category === 'সাতক্ষীরা' || 
          Boolean(a.upazila) || 
          a.tags.includes('সাতক্ষীরা') || 
          a.location?.includes('সাতক্ষীরা') ||
          SATKHIRA_UPAZILAS.some(u => u !== 'সকল' && (a.title.includes(u) || a.tags.includes(u)))
        );
      }
    } else {
      filtered = filtered.filter(a => a.category === targetCat || a.tags.includes(targetCat));
    }
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (sortBy === 'latest') {
    filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } else {
    filtered.sort((a, b) => b.viewCount - a.viewCount);
  }

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setCurrentView('article');
  };

  return (
    <div className="max-w-7xl mx-auto my-6 px-4">
      
      {/* Archive Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
              <FolderOpen className="w-4 h-4" />
              <span>সংবাদ আর্কাইভ ও বিভাগ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif-bangla">
              {searchQuery ? `অনুসন্ধান ফলাফল: "${searchQuery}"` : targetCat ? (targetUpazila ? `${targetCat} — ${targetUpazila}` : targetCat) : 'সকল সংবাদ'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              মোট {toBengaliDigits(filtered.length)} টি সংবাদ পাওয়া গেছে
            </p>
          </div>

          {/* Search Bar in Archive */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="এই বিভাগে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600 w-48 sm:w-64"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-2 rounded text-slate-700 dark:text-slate-200 hover:bg-red-600 hover:text-white transition"
              >
                রিসেট
              </button>
            )}
          </div>
        </div>

        {/* Upazila sub-filters if in Satkhira category */}
        {targetCat === 'সাতক্ষীরা' && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">উপজেলা নির্বাচন:</span>
            {SATKHIRA_UPAZILAS.map((up) => (
              <button
                key={up}
                onClick={() => {
                  if (up === 'সকল') {
                    setSelectedCategory('সাতক্ষীরা');
                    setActiveUpazilaFilter('সকল');
                  } else {
                    setSelectedCategory(`সাতক্ষীরা:${up}`);
                    setActiveUpazilaFilter(up);
                  }
                }}
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition ${
                  (targetUpazila === up || (!targetUpazila && up === 'সকল'))
                    ? 'bg-red-600 text-white font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {up}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sorting & Layout Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">সর্ট করুন:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'latest' | 'views')}
            className="text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-200 outline-none"
          >
            <option value="latest">সর্বশেষ প্রকাশিত</option>
            <option value="views">সর্বাধিক পঠিত (জনপ্রিয়)</option>
          </select>
        </div>

        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-slate-900'}`}
            title="গ্রিড ভিউ"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-slate-900'}`}
            title="লিস্ট ভিউ"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
            দুঃখিত! এই বিভাগে কোনো সংবাদ খুঁজে পাওয়া যায়নি।
          </p>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
              setCurrentView('home');
            }}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2 rounded-lg transition"
          >
            হোমপেজে ফিরে যান
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <div
              key={article.id}
              onClick={() => handleArticleClick(article.id)}
              className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-red-500 transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {article.category}
                  </span>
                  {article.upazila && (
                    <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />
                      {article.upazila}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-red-600 transition font-serif-bangla leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-red-500" />
                  {getRelativeBengaliTime(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {toBengaliDigits(article.viewCount)} বার
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filtered.map((article) => (
            <div
              key={article.id}
              onClick={() => handleArticleClick(article.id)}
              className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:border-red-500 transition flex flex-col sm:flex-row gap-4 items-start"
            >
              <div className="w-full sm:w-56 aspect-video sm:aspect-auto sm:h-36 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                  {article.upazila && (
                    <span className="text-xs text-slate-500 font-medium">
                      {article.upazila}
                    </span>
                  )}
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] text-slate-400">
                    {formatBengaliDate(article.publishedAt)}
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-red-600 transition font-serif-bangla leading-snug mb-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {article.author.name}
                  </span>
                  <span className="text-red-600 font-bold flex items-center gap-0.5">
                    বিস্তারিত পড়ুন <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
