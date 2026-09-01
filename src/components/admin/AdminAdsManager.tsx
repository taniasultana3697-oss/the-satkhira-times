import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { AdConfiguration } from '../../types';
import { 
  Megaphone, 
  Code, 
  Image as ImageIcon, 
  Power, 
  ExternalLink, 
  Save, 
  Check, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export const AdminAdsManager: React.FC = () => {
  const { adConfigs, updateAdConfig } = useNews();
  const [editingAd, setEditingAd] = useState<AdConfiguration | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggle = (id: string, currentEnabled: boolean) => {
    updateAdConfig(id, { enabled: !currentEnabled });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAd) {
      updateAdConfig(editingAd.id, editingAd);
      setEditingAd(null);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 dark:bg-red-950 text-red-600 rounded-xl">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif-bangla">
                Adsterra ও ব্যানার বিজ্ঞাপন কন্ট্রোল
              </h2>
              <p className="text-xs text-slate-500">
                হেডার, সাইডবার, আর্টিকেলের ভেতর, স্টিকি ফুটার, পপআন্ডার ও ডাইরেক্ট লিঙ্ক কোড কনফিগার করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Adsterra Ready</span>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 mb-4 bg-green-100 text-green-800 rounded-lg text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4" />
            বিজ্ঞাপন কোড সফলভাবে সংরক্ষণ করা হয়েছে এবং ওয়েবসাইটে কার্যকর হয়েছে!
          </div>
        )}

        {/* Ads Slots Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adConfigs.map((ad) => (
            <div
              key={ad.id}
              className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                ad.enabled 
                  ? 'bg-white dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 shadow-sm' 
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${ad.enabled ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {ad.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleToggle(ad.id, ad.enabled)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition flex items-center gap-1 ${
                      ad.enabled 
                        ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' 
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Power className="w-3 h-3" />
                    <span>{ad.enabled ? 'চালু (ON)' : 'বন্ধ (OFF)'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-500 mb-3">{ad.note}</p>

                {/* Preview Thumbnail / Code Snippet */}
                {ad.bannerType === 'image' && ad.bannerImageUrl ? (
                  <div className="aspect-[16/6] bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 mb-3 relative">
                    <img
                      src={ad.bannerImageUrl}
                      alt={ad.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded">
                      প্রিভিউ
                    </span>
                  </div>
                ) : (
                  <div className="bg-slate-950 text-emerald-400 p-2 rounded text-[11px] font-mono overflow-x-auto mb-3 max-h-16">
                    <code>{ad.codeSnippet.slice(0, 100)}...</code>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono uppercase">
                  স্লট: {ad.slot}
                </span>
                <button
                  onClick={() => setEditingAd({ ...ad })}
                  className="text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 rounded transition"
                >
                  কোড পরিবর্তন
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Ad Modal */}
      {editingAd && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif-bangla">
              বিজ্ঞাপন স্লট সম্পাদনা: {editingAd.name}
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  বিজ্ঞাপনের ধরন (Banner Type)
                </label>
                <select
                  value={editingAd.bannerType}
                  onChange={(e) => setEditingAd({ ...editingAd, bannerType: e.target.value as any })}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="image">ইমেজ ব্যানার ও লিঙ্ক (Image Banner)</option>
                  <option value="script">Adsterra JS / HTML কোড (Raw Script)</option>
                  <option value="direct_link">ডাইরেক্ট লিঙ্ক (Smart Direct Link)</option>
                </select>
              </div>

              {editingAd.bannerType === 'image' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      ব্যানার ইমেজ লিঙ্ক (Image URL)
                    </label>
                    <input
                      type="url"
                      value={editingAd.bannerImageUrl || ''}
                      onChange={(e) => setEditingAd({ ...editingAd, bannerImageUrl: e.target.value })}
                      className="w-full p-2 text-xs rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      টার্গেট লিঙ্ক (Click Target URL)
                    </label>
                    <input
                      type="url"
                      value={editingAd.targetUrl || ''}
                      onChange={(e) => setEditingAd({ ...editingAd, targetUrl: e.target.value })}
                      className="w-full p-2 text-xs rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Adsterra / Custom কোড বা স্ক্রিপ্ট (Code Snippet)
                </label>
                <textarea
                  rows={4}
                  value={editingAd.codeSnippet}
                  onChange={(e) => setEditingAd({ ...editingAd, codeSnippet: e.target.value })}
                  className="w-full p-2 text-xs font-mono rounded border border-slate-300 dark:border-slate-700 bg-slate-950 text-emerald-400 outline-none"
                  placeholder="<!-- Adsterra script tag -->"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingAd(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition shadow"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
