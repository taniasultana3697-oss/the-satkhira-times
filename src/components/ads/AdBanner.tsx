import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { AdsterraEmbed } from './AdsterraEmbed';
import { X, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

interface AdBannerProps {
  slot: 'header_banner' | 'sidebar_banner' | 'in_article' | 'footer_banner' | 'popunder' | 'popup' | 'direct_link' | 'socialbar' | 'native_banner';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '' }) => {
  const { adConfigs } = useNews();
  const [isDismissed, setIsDismissed] = useState(false);

  // Match slot (allow native_banner or in_article interchangeably)
  const ad = adConfigs.find(a => a.slot === slot) || 
    (slot === 'native_banner' ? adConfigs.find(a => a.slot === 'in_article') : undefined) ||
    (slot === 'in_article' ? adConfigs.find(a => a.slot === 'native_banner') : undefined);

  if (!ad || !ad.enabled || isDismissed) {
    return null;
  }

  // 1. Sticky footer banner (728x90 Adsterra)
  if (slot === 'footer_banner') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 border-t border-slate-300 dark:border-slate-700 shadow-2xl backdrop-blur-md transition-all">
        <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex-1 flex justify-center items-center overflow-hidden w-full">
            {ad.bannerType === 'image' && ad.bannerImageUrl ? (
              <a 
                href={ad.targetUrl || 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2'} 
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
              <div className="w-full flex justify-center">
                <AdsterraEmbed 
                  type="728x90" 
                  adKey="6899df43cee03e4cbbb606088858f40c" 
                  codeSnippet={ad.codeSnippet}
                  targetUrl={ad.targetUrl}
                />
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsDismissed(true)}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 transition flex-shrink-0 self-end sm:self-center"
            title="বিজ্ঞাপন বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 2. In-Article or Homepage Native Banner (নেটিভ ব্যানার)
  if (slot === 'in_article' || slot === 'native_banner') {
    return (
      <div className={`my-6 p-2 sm:p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-center shadow-sm ${className}`}>
        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5 font-sans">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8B0000]" />
          <span>স্পন্সরড বার্তা ও নেটিভ বিজ্ঞাপন (Native Banner)</span>
        </div>
        
        {ad.bannerType === 'image' && ad.bannerImageUrl ? (
          <a 
            href={ad.targetUrl || 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block relative group overflow-hidden rounded-lg max-w-full border border-slate-200 dark:border-slate-800 hover:border-red-500 transition shadow-sm"
          >
            <img 
              src={ad.bannerImageUrl} 
              alt="Sponsored Banner" 
              className="max-h-40 md:max-h-48 w-auto object-cover rounded-lg hover:opacity-95 transition"
            />
            <span className="absolute top-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-sans uppercase">
              বিজ্ঞাপন
            </span>
          </a>
        ) : (
          <div className="w-full">
            <AdsterraEmbed 
              type="native" 
              codeSnippet={ad.codeSnippet}
              targetUrl={ad.targetUrl}
            />
          </div>
        )}
      </div>
    );
  }

  // 3. Sidebar 300x250 Banner
  if (slot === 'sidebar_banner') {
    return (
      <div className={`ad-container text-center my-4 ${className}`}>
        <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
          বিজ্ঞাপন (300x250)
        </div>
        {ad.bannerType === 'image' && ad.bannerImageUrl ? (
          <a 
            href={ad.targetUrl || 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block relative group overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 hover:border-red-500 transition"
          >
            <img 
              src={ad.bannerImageUrl} 
              alt={ad.name} 
              className="w-[300px] h-[250px] object-cover rounded-lg"
            />
          </a>
        ) : (
          <div className="w-full flex justify-center">
            <AdsterraEmbed 
              type="300x250" 
              adKey="1b7a4aa64f6c8149c78e46f70b159fc8" 
              codeSnippet={ad.codeSnippet}
              targetUrl={ad.targetUrl}
            />
          </div>
        )}
      </div>
    );
  }

  // 4. Header 728x90 Banner
  if (slot === 'header_banner') {
    return (
      <div className={`ad-container text-center my-3 max-w-7xl mx-auto px-4 ${className}`}>
        <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
          বিজ্ঞাপন (728x90)
        </div>
        {ad.bannerType === 'image' && ad.bannerImageUrl ? (
          <a 
            href={ad.targetUrl || 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block relative group overflow-hidden rounded border border-slate-200 dark:border-slate-800 hover:border-red-500 transition max-w-full"
          >
            <img 
              src={ad.bannerImageUrl} 
              alt={ad.name} 
              className="w-full h-auto object-cover rounded max-h-[90px]"
            />
          </a>
        ) : (
          <div className="w-full flex justify-center">
            <AdsterraEmbed 
              type="728x90" 
              adKey="6899df43cee03e4cbbb606088858f40c" 
              codeSnippet={ad.codeSnippet}
              targetUrl={ad.targetUrl}
            />
          </div>
        )}
      </div>
    );
  }

  // 5. Direct Link Card / Button
  if (slot === 'direct_link') {
    const directUrl = ad.targetUrl || 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2';
    return (
      <div className={`my-4 p-4 bg-gradient-to-r from-red-600 via-amber-600 to-red-700 text-white rounded-xl shadow-md flex items-center justify-between gap-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Zap className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-sm font-serif-bangla">বিশেষ স্পন্সরড অফার</h4>
            <p className="text-xs text-white/80">সর্বশেষ অফার ও আপডেট দেখতে ক্লিক করুন</p>
          </div>
        </div>
        <a 
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white text-red-700 hover:bg-red-50 text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5 flex-shrink-0"
        >
          <span>অফার দেখুন</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  // 6. Fallback Custom Snippet
  return (
    <div className={`ad-container text-center ${className}`}>
      <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">বিজ্ঞাপন</div>
      <AdsterraEmbed 
        type="custom" 
        codeSnippet={ad.codeSnippet} 
        targetUrl={ad.targetUrl}
      />
    </div>
  );
};
