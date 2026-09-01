import React from 'react';
import { useNews } from '../../context/NewsContext';
import { NewsCategory } from '../../types';
import { getRelativeBengaliTime, toBengaliDigits } from '../../utils/helpers';
import { Clock, Eye, ChevronRight } from 'lucide-react';

interface CategoryGridSectionProps {
  category: NewsCategory;
  title?: string;
  icon?: React.ReactNode;
  accentColor?: string;
}

export const CategoryGridSection: React.FC<CategoryGridSectionProps> = ({
  category,
  title,
  icon,
  accentColor = '#b91c1c'
}) => {
  const { articles, setSelectedArticleId, setCurrentView, setSelectedCategory } = useNews();

  const categoryArticles = articles
    .filter(a => a.status === 'published' && a.category === category)
    .slice(0, 4);

  if (categoryArticles.length === 0) return null;

  const lead = categoryArticles[0];
  const rest = categoryArticles.slice(1);

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setCurrentView('article');
  };

  const handleCategoryClick = () => {
    setSelectedCategory(category);
    setCurrentView('category');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded p-4 sm:p-5 shadow-sm">
      
      {/* Category Header */}
      <div className="flex items-center justify-between border-b-2 border-black dark:border-zinc-700 pb-2.5 mb-4">
        <h3 className="font-bold text-lg text-black dark:text-white flex items-center gap-2 font-serif-bangla">
          <span className="text-[#8B0000]">{icon}</span>
          <span>{title || category}</span>
        </h3>
        <button
          onClick={handleCategoryClick}
          className="text-xs font-bold font-sans uppercase text-[#8B0000] hover:text-black dark:hover:text-white flex items-center gap-0.5 tracking-wider transition"
        >
          <span>সব খবর</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Left Lead Card (7 cols) */}
        {lead && (
          <div 
            onClick={() => handleArticleClick(lead.id)}
            className="md:col-span-7 group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] rounded overflow-hidden bg-gray-100 dark:bg-zinc-800 mb-3">
              <img
                src={lead.featuredImage}
                alt={lead.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div>
              <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#8B0000] transition leading-snug font-serif-bangla mb-2">
                {lead.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-3 font-bangla">
                {lead.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-zinc-400 pt-2 border-t border-gray-100 dark:border-zinc-800 font-sans">
              <span className="flex items-center gap-1 font-bangla">
                <Clock className="w-3 h-3 text-[#8B0000]" />
                {getRelativeBengaliTime(lead.publishedAt)}
              </span>
              <span>•</span>
              <span className="font-bangla">{lead.author.name}</span>
            </div>
          </div>
        )}

        {/* Right Sub-items List (5 cols) */}
        <div className="md:col-span-5 flex flex-col justify-between divide-y divide-gray-100 dark:divide-zinc-800">
          {rest.map((item) => (
            <div
              key={item.id}
              onClick={() => handleArticleClick(item.id)}
              className="py-3 first:pt-0 last:pb-0 group cursor-pointer flex gap-3 items-start"
            >
              <div className="w-20 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-zinc-800">
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h5 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#8B0000] transition leading-snug font-serif-bangla">
                  {item.title}
                </h5>
                <span className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 font-bangla">
                  <Clock className="w-2.5 h-2.5 text-[#8B0000]" />
                  {getRelativeBengaliTime(item.publishedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
