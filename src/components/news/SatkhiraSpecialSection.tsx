import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { SATKHIRA_UPAZILAS } from '../../data/initialData';
import { getRelativeBengaliTime, toBengaliDigits } from '../../utils/helpers';
import { MapPin, Flame, Clock, Eye, ChevronRight, Trees, Waves, Fish, Shield } from 'lucide-react';

export const SatkhiraSpecialSection: React.FC = () => {
  const { articles, openArticle, openCategory } = useNews();
  const [activeUpazila, setActiveUpazila] = useState<string>('সকল');

  const satkhiraArticles = articles.filter(a => {
    if (a.status !== 'published') return false;
    if (activeUpazila === 'সকল') {
      return a.category === 'সাতক্ষীরা' || a.upazila || a.tags.includes('সাতক্ষীরা');
    }
    return a.upazila === activeUpazila;
  });

  const handleArticleClick = (id: string) => {
    openArticle(id);
  };

  const handleViewAll = () => {
    openCategory(activeUpazila === 'সকল' ? 'সাতক্ষীরা' : `সাতক্ষীরা:${activeUpazila}`);
  };

  return (
    <section className="my-8 bg-gray-50 dark:bg-zinc-900/60 p-4 sm:p-6 rounded border border-gray-200 dark:border-zinc-800 shadow-sm">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-2 border-black dark:border-zinc-700 pb-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B0000]"></span>
            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white font-serif-bangla flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#8B0000]" />
              সাতক্ষীরা প্রতিদিন
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5 font-bangla">
            সুন্দরবন, উপকূল, চিংড়ি শিল্প, ভোমরা স্থলবন্দর ও সাতক্ষীরার ৭ উপজেলার তৃণমূল সংবাদ
          </p>
        </div>

        {/* Upazila Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {SATKHIRA_UPAZILAS.map((upazila) => (
            <button
              key={upazila}
              onClick={() => setActiveUpazila(upazila)}
              className={`text-xs font-semibold px-3 py-1 rounded transition whitespace-nowrap font-bangla ${
                activeUpazila === upazila
                  ? 'bg-[#8B0000] text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700'
              }`}
            >
              {upazila}
            </button>
          ))}
        </div>
      </div>

      {/* Satkhira Highlights Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 p-3 rounded flex items-center gap-3">
          <div className="p-2 rounded bg-emerald-700 text-white">
            <Trees className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900 dark:text-zinc-100 font-serif-bangla">সুন্দরবন রেঞ্জ</div>
            <div className="text-[10px] text-gray-500 dark:text-zinc-400">ম্যানগ্রোভ ও বন্যপ্রাণী</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 p-3 rounded flex items-center gap-3">
          <div className="p-2 rounded bg-[#8B0000] text-white">
            <Fish className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900 dark:text-zinc-100 font-serif-bangla">সাদা সোনা চিংড়ি</div>
            <div className="text-[10px] text-gray-500 dark:text-zinc-400">মৎস্য ও রফতানি</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 p-3 rounded flex items-center gap-3">
          <div className="p-2 rounded bg-black text-white">
            <Waves className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900 dark:text-zinc-100 font-serif-bangla">উপকূলীয় বেড়িবাঁধ</div>
            <div className="text-[10px] text-gray-500 dark:text-zinc-400">ভাঙন ও পুনর্বাসন</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 p-3 rounded flex items-center gap-3">
          <div className="p-2 rounded bg-[#8B0000] text-white">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900 dark:text-zinc-100 font-serif-bangla">ভোমরা স্থলবন্দর</div>
            <div className="text-[10px] text-gray-500 dark:text-zinc-400">আন্তর্জাতিক বাণিজ্য</div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {satkhiraArticles.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-base font-semibold font-bangla">{activeUpazila} উপজেলার কোনো নতুন সংবাদ পাওয়া যায়নি।</p>
          <button 
            onClick={() => setActiveUpazila('সকল')}
            className="mt-3 text-xs bg-[#8B0000] text-white px-4 py-2 rounded font-bold hover:bg-black transition"
          >
            সব সংবাদ দেখুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {satkhiraArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleArticleClick(article.id)}
              className="group cursor-pointer bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded overflow-hidden shadow-sm hover:border-[#8B0000] transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    {article.upazila && (
                      <span className="bg-[#8B0000] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1 font-bangla">
                        <MapPin className="w-3 h-3" />
                        {article.upazila}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#8B0000] transition leading-snug font-serif-bangla mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-2 leading-relaxed font-bangla">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-4 py-2.5 bg-gray-50 dark:bg-zinc-800/40 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-gray-500 dark:text-zinc-400 font-sans">
                <span className="flex items-center gap-1 font-bangla">
                  <Clock className="w-3 h-3 text-[#8B0000]" />
                  {getRelativeBengaliTime(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1 font-bangla">
                  <Eye className="w-3 h-3" />
                  {toBengaliDigits(article.viewCount)} বার
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer link to full Satkhira category */}
      <div className="mt-6 text-center">
        <button
          onClick={handleViewAll}
          className="inline-flex items-center gap-2 bg-black hover:bg-[#8B0000] text-white text-xs font-bold uppercase font-sans tracking-wider px-6 py-2.5 rounded shadow transition"
        >
          <span>{activeUpazila === 'সকল' ? 'সাতক্ষীরার আরও খবর' : `${activeUpazila} উপজেলার সকল খবর`}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};
