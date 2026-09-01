import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

interface AdBannerProps {
  slot: 'header_banner' | 'sidebar_banner' | 'in_article' | 'footer_banner' | 'popunder' | 'direct_link';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '' }) => {
  const { adConfigs } = useNews();
  const [isDismissed, setIsDismissed] = useState(false);

  const ad = adConfigs.find(a => a.slot === slot);

  if (!ad || !ad.enabled || isDismissed) {
    return null;
  }

  // Sticky footer banner
  if (slot === 'footer_banner') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 border-t border-slate-300 dark:border-slate-700 shadow-2xl backdrop-blur-md transition-all">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex-1 flex justify-center items-center overflow-hidden">
            {ad.bannerType === 'image' && ad.bannerImageUrl ? (
              <a 
                href={ad.targetUrl || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative group block overflow-hidden rounded border border-slate-200 dark:border-slate-800"
              >
                <img 
                  src={ad.bannerImageUrl} 
                  alt="Advertisement" 
                  className="h-14 sm:h-16 md:h-20 w-auto object-cover rounded max-w-full"
                />
                <span className="absolute top-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded uppercase tracking-wider">বিজ্ঞাপন</span>
              </a>
            ) : (
              <div 
                className="text-xs text-slate-500 text-center" 
                dangerouslySetInnerHTML={{ __html: ad.codeSnippet }}
              />
            )}
          </div>
          
          <button 
            onClick={() => setIsDismissed(true)}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 transition"
            title="বিজ্ঞাপন বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // In Article banner
  if (slot === 'in_article') {
    return (
      <div className={`my-6 p-3 bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-center ${className}`}>
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-red-600" />
          বিজ্ঞাপন ও স্পন্সরড বার্তা (Adsterra)
        </div>
        {ad.bannerType === 'image' && ad.bannerImageUrl ? (
          <a 
            href={ad.targetUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block relative group overflow-hidden rounded max-w-full"
          >
            <img 
              src={ad.bannerImageUrl} 
              alt="Sponsored Banner" 
              className="max-h-32 md:max-h-40 w-auto object-cover rounded hover:opacity-95 transition"
            />
          </a>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: ad.codeSnippet }} />
        )}
      </div>
    );
  }

  // Header and Sidebar Banners
  return (
    <div className={`ad-container text-center ${className}`}>
      <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">বিজ্ঞাপন</div>
      {ad.bannerType === 'image' && ad.bannerImageUrl ? (
        <a 
          href={ad.targetUrl || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block relative group overflow-hidden rounded border border-slate-200 dark:border-slate-800 hover:border-red-500 transition"
        >
          <img 
            src={ad.bannerImageUrl} 
            alt={ad.name} 
            className="w-full h-auto object-cover rounded max-h-[120px] md:max-h-[140px]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded shadow flex items-center gap-1 font-medium">
              বিস্তারিত জানুন <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </a>
      ) : (
        <div 
          className="p-2 bg-slate-100 dark:bg-slate-800 rounded min-h-[90px] flex items-center justify-center text-xs text-slate-500"
          dangerouslySetInnerHTML={{ __html: ad.codeSnippet }}
        />
      )}
    </div>
  );
};
