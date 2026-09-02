import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { Flame, Play, Pause, ChevronLeft, ChevronRight, Bell } from 'lucide-react';

export const BreakingTicker: React.FC = () => {
  const { breakingNews, openArticle } = useNews();
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeNews = breakingNews.filter(item => item.isActive);

  if (activeNews.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeNews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeNews.length) % activeNews.length);
  };

  const handleItemClick = (articleId?: string) => {
    if (articleId) {
      openArticle(articleId);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-1.5 flex items-center gap-2 sm:gap-4 overflow-hidden">
        
        {/* Clean Minimalism Breaking News Badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-[#8B0000] text-white px-2.5 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase font-sans tracking-wider">
          <Flame className="w-3 h-3 fill-white text-white" />
          <span className="hidden sm:inline">জরুরি খবর</span>
          <span className="sm:hidden">জরুরি</span>
        </div>

        {/* Ticker Content */}
        <div 
          className="flex-1 overflow-hidden relative cursor-pointer group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Continuous scrolling ticker on wider screens */}
          <div className="hidden md:flex items-center gap-8 whitespace-nowrap overflow-hidden">
            <div className={`flex items-center gap-8 ${isPaused ? '' : 'animate-marquee'}`}>
              {activeNews.map((item, idx) => (
                <div 
                  key={item.id}
                  onClick={() => handleItemClick(item.linkArticleId)}
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-800 dark:text-zinc-200 hover:text-[#8B0000] transition"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000]"></span>
                  <span className="hover:underline">{item.title}</span>
                  {idx < activeNews.length - 1 && <span className="text-gray-400 dark:text-zinc-600 ml-4">•</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Stepped Single Item ticker on mobile & tablet */}
          <div className="md:hidden flex items-center">
            <div 
              onClick={() => handleItemClick(activeNews[currentIndex]?.linkArticleId)}
              className="text-xs sm:text-sm font-medium text-gray-800 dark:text-zinc-200 hover:text-[#8B0000] truncate flex items-center gap-2"
            >
              <Bell className="w-3.5 h-3.5 text-[#8B0000] flex-shrink-0" />
              <span className="truncate">{activeNews[currentIndex]?.title}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-shrink-0 flex items-center gap-1 bg-white dark:bg-zinc-800 rounded px-1 py-0.5 border border-gray-300 dark:border-zinc-700">
          <button 
            onClick={handlePrev}
            className="p-1 text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white rounded transition"
            title="পূর্ববর্তী"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white rounded transition"
            title={isPaused ? 'চালু করুন' : 'থামান'}
          >
            {isPaused ? <Play className="w-3 h-3 text-[#8B0000] fill-[#8B0000]" /> : <Pause className="w-3 h-3 text-gray-600 dark:text-zinc-300 fill-current" />}
          </button>

          <button 
            onClick={handleNext}
            className="p-1 text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white rounded transition"
            title="পরবর্তী"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
