import React, { useState, useEffect } from 'react';
import { useNews } from '../../context/NewsContext';
import { X, ExternalLink, ShieldCheck, Sparkles, Megaphone } from 'lucide-react';

export const PopupAdModal: React.FC = () => {
  const { adConfigs, currentView } = useNews();
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [canClose, setCanClose] = useState(false);

  const popupAd = adConfigs.find(a => a.slot === 'popup');

  useEffect(() => {
    // Listen for manual trigger from Admin panel
    const handleManualTrigger = () => {
      setIsOpen(true);
      setCanClose(true);
      setCountdown(0);
    };

    window.addEventListener('trigger-satkhira-popup-ad', handleManualTrigger);
    return () => {
      window.removeEventListener('trigger-satkhira-popup-ad', handleManualTrigger);
    };
  }, []);

  useEffect(() => {
    if (!popupAd || !popupAd.enabled || currentView === 'admin') {
      setIsOpen(false);
      return;
    }

    // Check if dismissed in this session
    const hasBeenDismissed = sessionStorage.getItem('satkhira_popup_ad_dismissed');
    if (hasBeenDismissed) {
      return;
    }

    // Auto display popup after 2.5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      setCountdown(3);
      setCanClose(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [popupAd, currentView]);

  // Countdown timer for close button
  useEffect(() => {
    if (!isOpen) return;

    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setCanClose(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanClose(true);
    }
  }, [isOpen, countdown]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('satkhira_popup_ad_dismissed', 'true');
  };

  const handleAdClick = () => {
    const targetUrl = popupAd?.targetUrl || 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen || !popupAd || !popupAd.enabled || currentView === 'admin') {
    return null;
  }

  const targetUrl = popupAd.targetUrl || 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2';
  const imageUrl = popupAd.bannerImageUrl || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transform transition-all scale-100">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-700 px-4 py-2.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-white/20 rounded-md">
              <Megaphone className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold font-serif-bangla tracking-wide">
              স্পন্সরড বিশেষ বার্তা ও বিজ্ঞাপন
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!canClose && countdown > 0 ? (
              <span className="text-[11px] bg-black/40 text-amber-200 px-2 py-0.5 rounded-full font-mono font-bold">
                {countdown}s
              </span>
            ) : null}

            <button
              onClick={handleClose}
              className="p-1 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full transition"
              title="বিজ্ঞাপন বন্ধ করুন (Close Ad)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 flex flex-col items-center">
          {popupAd.bannerType === 'image' || !popupAd.codeSnippet ? (
            <div 
              onClick={handleAdClick}
              className="w-full cursor-pointer group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-900"
            >
              <img
                src={imageUrl}
                alt="Sponsored Popup Advertisement"
                className="w-full max-h-[300px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-lg flex items-center gap-1.5">
                  <span>অফারটি দেখতে ক্লিক করুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
              <span className="absolute top-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-sans">
                AD
              </span>
            </div>
          ) : (
            <div className="w-full min-h-[220px] max-h-[320px] overflow-hidden flex justify-center items-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <iframe
                title="Popup Adsterra Code"
                srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><base target="_blank"><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;}</style></head><body>${popupAd.codeSnippet}</body></html>`}
                className="w-full h-[250px] border-0"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
              />
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition font-bangla"
          >
            বন্ধ করুন (Skip)
          </button>

          <button
            type="button"
            onClick={handleAdClick}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 active:scale-95 animate-pulse"
          >
            <span>অফার দেখুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
