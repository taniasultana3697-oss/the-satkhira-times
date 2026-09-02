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
  Zap, 
  Eye, 
  Sparkles, 
  Layers,
  Globe,
  Copy
} from 'lucide-react';

const ADSENSE_PUBLISHER_ID = 'ca-pub-7007492474198710';

export const AdminAdsManager: React.FC = () => {
  const { adConfigs, updateAdConfig } = useNews();
  const [editingAd, setEditingAd] = useState<AdConfiguration | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleToggle = (id: string, currentEnabled: boolean) => {
    updateAdConfig(id, { enabled: !currentEnabled });
  };

  const handleTestPopup = () => {
    window.dispatchEvent(new CustomEvent('trigger-satkhira-popup-ad'));
  };

  const handleCopyAdSenseCode = () => {
    const code = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7007492474198710"\n     crossorigin="anonymous"></script>`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleApplyAdSenseToSlot = (id: string, slotType: string) => {
    const snippet = `<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="${ADSENSE_PUBLISHER_ID}"\n     data-ad-slot=""\n     data-ad-format="${slotType === 'in_article' ? 'fluid' : 'auto'}"\n     data-full-width-responsive="true"></ins>\n<script>\n     (adsbygoogle = window.adsbygoogle || []).push({});\n</script>`;
    
    updateAdConfig(id, {
      bannerType: 'adsense',
      adSenseClientId: ADSENSE_PUBLISHER_ID,
      codeSnippet: snippet,
      note: `Google AdSense (${ADSENSE_PUBLISHER_ID}) রেসপন্সিভ বিজ্ঞাপন ইউনিট সক্রিয়।`
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
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
      
      {/* Google AdSense Integration Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border border-blue-800/60 rounded-2xl p-5 sm:p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-500/30 border border-blue-400/40 text-blue-200 text-[11px] font-bold rounded-full font-mono uppercase tracking-wider">
                Google AdSense Active
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                হেডার ট্যাগে সক্রিয়
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-serif-bangla flex items-center gap-2 text-white">
              <Globe className="w-5 h-5 text-blue-400" />
              <span>গুগল অ্যাডসেন্স মনিটাইজেশন কনফিগারেশন</span>
            </h3>
            <p className="text-xs text-blue-200/90 leading-relaxed font-bangla">
              আপনার গুগল অ্যাডসেন্স পাবলিশার আইডি (<span className="font-mono font-bold text-amber-300">{ADSENSE_PUBLISHER_ID}</span>) ওয়েবসাইটের মূল <span className="font-mono text-white">&lt;head&gt;</span> ট্যাগে সরাসরি যুক্ত করা হয়েছে। স্বয়ংক্রিয় অটো অ্যাডস (Auto Ads) এবং ম্যানুয়াল ব্যানার স্লট উভয়ই রিয়েল টাইমে কার্যকর।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
            <button
              onClick={handleCopyAdSenseCode}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'কোড কপি হয়েছে!' : 'অ্যাডসেন্স কোড কপি'}</span>
            </button>
            <div className="px-3.5 py-2 bg-white/10 backdrop-blur rounded-xl border border-white/20 text-xs text-blue-100 font-mono">
              ID: {ADSENSE_PUBLISHER_ID}
            </div>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 dark:bg-red-950 text-red-600 rounded-xl">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif-bangla">
                বিজ্ঞাপন ও মনিটাইজেশন কন্ট্রোল সেন্টার
              </h2>
              <p className="text-xs text-slate-500">
                গুগল অ্যাডসেন্স, Adsterra, পপ-আপ, নেটিভ ব্যানার, হেডার ও সাইডবার বিজ্ঞাপন নিয়ন্ত্রণ করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestPopup}
              className="flex items-center gap-1.5 text-xs bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 rounded-xl font-bold shadow-sm transition"
              title="পপ-আপ বিজ্ঞাপন টেস্ট করুন"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>পপ-আপ টেস্ট করুন</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-xl font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>AdSense & Adsterra Ready</span>
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 mb-4 bg-green-100 text-green-800 rounded-lg text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4" />
            বিজ্ঞাপন কোড সফলভাবে সংরক্ষণ করা হয়েছে এবং ওয়েবসাইটে তাৎক্ষণিকভাবে কার্যকর হয়েছে!
          </div>
        )}

        {/* Ads Slots Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adConfigs.map((ad) => {
            const isAdSense = ad.bannerType === 'adsense' || (ad.codeSnippet && ad.codeSnippet.includes(ADSENSE_PUBLISHER_ID));

            return (
              <div
                key={ad.id}
                className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                  ad.enabled 
                    ? 'bg-white dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 shadow-sm' 
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-75'
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

                    <div className="flex items-center gap-1.5">
                      {isAdSense && (
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold rounded-md font-sans">
                          AdSense
                        </span>
                      )}

                      {ad.slot === 'popup' && (
                        <button
                          onClick={handleTestPopup}
                          className="px-2 py-1 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-200 text-[10px] font-bold rounded-lg transition flex items-center gap-1"
                          title="পপআপ টেস্ট"
                        >
                          <Eye className="w-3 h-3" />
                          <span>টেস্ট</span>
                        </button>
                      )}

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
                  </div>

                  <p className="text-xs text-slate-500 mb-3 leading-relaxed">{ad.note}</p>

                  {/* Preview Thumbnail / Code Snippet */}
                  {isAdSense ? (
                    <div className="bg-blue-950 text-blue-200 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto mb-3 border border-blue-900">
                      <div className="text-amber-300 font-bold mb-1">Google AdSense Unit:</div>
                      <code>client="{ad.adSenseClientId || ADSENSE_PUBLISHER_ID}"</code>
                    </div>
                  ) : ad.bannerType === 'image' && ad.bannerImageUrl ? (
                    <div className="aspect-[16/6] bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 mb-3 relative">
                      <img
                        src={ad.bannerImageUrl}
                        alt={ad.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-sans uppercase">
                        ইমেজ প্রিভিউ
                      </span>
                    </div>
                  ) : (
                    <div className="bg-slate-950 text-emerald-400 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto mb-3 max-h-16 border border-slate-800">
                      <code>{ad.codeSnippet ? ad.codeSnippet.slice(0, 110) + '...' : 'কাস্টম কোড দেওয়া নেই'}</code>
                    </div>
                  )}

                  {ad.targetUrl && !isAdSense && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate mb-2">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">লিঙ্ক:</span>
                      <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline truncate flex items-center gap-1">
                        <span>{ad.targetUrl}</span>
                        <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      স্লট: {ad.slot}
                    </span>
                    {!isAdSense && (
                      <button
                        type="button"
                        onClick={() => handleApplyAdSenseToSlot(ad.id, ad.slot)}
                        className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-bold"
                      >
                        + AdSense করুন
                      </button>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setEditingAd({ ...ad })}
                    className="text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-lg transition shadow-sm"
                  >
                    সেটিংস ও কোড পরিবর্তন
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Ad Modal */}
      {editingAd && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-serif-bangla">
                বিজ্ঞাপন স্লট কনফিগারেশন: {editingAd.name}
              </h3>
              {editingAd.slot === 'popup' && (
                <button
                  type="button"
                  onClick={handleTestPopup}
                  className="text-[11px] bg-amber-500 hover:bg-amber-600 text-white font-bold px-2.5 py-1 rounded-lg transition flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>টেস্ট প্রিভিউ</span>
                </button>
              )}
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  বিজ্ঞাপনের ধরন (Ad Network & Type)
                </label>
                <select
                  value={editingAd.bannerType}
                  onChange={(e) => {
                    const newType = e.target.value as any;
                    let updatedCode = editingAd.codeSnippet;
                    if (newType === 'adsense' && !updatedCode.includes('adsbygoogle')) {
                      updatedCode = `<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="${ADSENSE_PUBLISHER_ID}"\n     data-ad-slot=""\n     data-ad-format="auto"\n     data-full-width-responsive="true"></ins>\n<script>\n     (adsbygoogle = window.adsbygoogle || []).push({});\n</script>`;
                    }
                    setEditingAd({ 
                      ...editingAd, 
                      bannerType: newType,
                      adSenseClientId: newType === 'adsense' ? ADSENSE_PUBLISHER_ID : editingAd.adSenseClientId,
                      codeSnippet: updatedCode
                    });
                  }}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="adsense">Google AdSense (গুগল অ্যাডসেন্স - ca-pub-7007492474198710)</option>
                  <option value="script">Adsterra JS / HTML কোড (Raw Script Code)</option>
                  <option value="image">ইমেজ ব্যানার ও লিঙ্ক (Image Banner + Target URL)</option>
                  <option value="direct_link">ডাইরেক্ট লিঙ্ক (Smart Direct Link)</option>
                </select>
              </div>

              {editingAd.bannerType === 'adsense' && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      Google AdSense প্যারামিটার
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">ভেরিফাইড</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      পাবলিশার ক্লায়েন্ট আইডি (Publisher Client ID)
                    </label>
                    <input
                      type="text"
                      value={editingAd.adSenseClientId || ADSENSE_PUBLISHER_ID}
                      onChange={(e) => setEditingAd({ ...editingAd, adSenseClientId: e.target.value })}
                      placeholder="ca-pub-7007492474198710"
                      className="w-full p-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      অ্যাড ইউনিট স্লট আইডি (Ad Unit Slot ID - ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={editingAd.adSenseSlotId || ''}
                      onChange={(e) => setEditingAd({ ...editingAd, adSenseSlotId: e.target.value })}
                      placeholder="যেমন: 1234567890 (ফাঁকা রাখলে অটো রেসপন্সিভ কাজ করবে)"
                      className="w-full p-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {editingAd.bannerType !== 'adsense' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    টার্গেট আর্নিং লিঙ্ক (Direct / Click Target URL)
                  </label>
                  <input
                    type="url"
                    value={editingAd.targetUrl || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, targetUrl: e.target.value })}
                    placeholder="https://www.profitableratecpmnetwork.com/..."
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-500 block mt-0.5">ব্যবহারকারী বিজ্ঞাপনে ক্লিক করলে এই লিঙ্কে যাবে।</span>
                </div>
              )}

              {(editingAd.bannerType === 'image' || editingAd.slot === 'popup') && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ব্যানার ইমেজ লিঙ্ক (Banner Image URL)
                  </label>
                  <input
                    type="url"
                    value={editingAd.bannerImageUrl || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, bannerImageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  {editingAd.bannerImageUrl && (
                    <div className="mt-2 aspect-[16/7] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 max-h-32 bg-slate-100">
                      <img src={editingAd.bannerImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {editingAd.bannerType === 'adsense' ? 'কাস্টম অ্যাডসেন্স HTML / ইউনিট কোড' : 'Adsterra / কাস্টম HTML ও JS কোড'}
                </label>
                <textarea
                  rows={4}
                  value={editingAd.codeSnippet}
                  onChange={(e) => setEditingAd({ ...editingAd, codeSnippet: e.target.value })}
                  className="w-full p-2.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-950 text-emerald-400 outline-none"
                  placeholder="<!-- Ad code tag or HTML -->"
                ></textarea>
                <span className="text-[10px] text-slate-500 block mt-0.5">গুগল অ্যাডসেন্স বা Adsterra থেকে প্রাপ্ত কোড এখানে সংরক্ষণ করা যায়।</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  নোট বা বিবরণ (Note)
                </label>
                <input
                  type="text"
                  value={editingAd.note || ''}
                  onChange={(e) => setEditingAd({ ...editingAd, note: e.target.value })}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingAd(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition shadow"
                >
                  সংরক্ষণ ও কার্যকর করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
