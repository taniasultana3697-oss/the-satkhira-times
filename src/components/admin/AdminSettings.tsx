import React, { useState, useEffect } from 'react';
import { useNews } from '../../context/NewsContext';
import { INITIAL_SETTINGS } from '../../data/initialData';
import { WebsiteSettings } from '../../types';
import { 
  Settings, 
  Globe, 
  Save, 
  Check, 
  Share2, 
  Phone, 
  Mail, 
  MapPin, 
  Search,
  Building,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Tv,
  FileText
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useNews();
  
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'editorial' | 'social' | 'epaper'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Deep clone and merge with safe fallbacks
  const getSafeFormData = (source: WebsiteSettings): WebsiteSettings => ({
    ...INITIAL_SETTINGS,
    ...source,
    seoSettings: {
      ...INITIAL_SETTINGS.seoSettings,
      ...(source.seoSettings || {})
    }
  });

  const [formData, setFormData] = useState<WebsiteSettings>(() => getSafeFormData(settings));

  // Sync state if context settings update
  useEffect(() => {
    setFormData(getSafeFormData(settings));
  }, [settings]);

  const handleChange = (field: keyof WebsiteSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSeoChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      seoSettings: {
        ...(prev.seoSettings || INITIAL_SETTINGS.seoSettings || {
          siteTitle: 'THE SATKHIRA TIMES',
          metaDescription: ''
        }),
        [field]: value
      }
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('আপনি কি নিশ্চিত যে সকল সাইট ও এসইও সেটিংস ডিফল্ট মানে ফিরিয়ে নিতে চান?')) {
      setFormData(INITIAL_SETTINGS);
      updateSettings(INITIAL_SETTINGS);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const seoData = formData.seoSettings || INITIAL_SETTINGS.seoSettings || {
    siteTitle: formData.siteName,
    metaDescription: formData.metaDescriptionDefault,
    metaKeywords: '',
    ogImageUrl: '',
    googleAnalyticsId: '',
    googleSearchConsoleCode: ''
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-100 dark:bg-red-950 text-red-600 rounded-xl">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif-bangla">
              ওয়েবসাইট ও এসইও (SEO) কনফিগারেশন
            </h2>
            <p className="text-xs text-slate-500">
              পোর্টালের নাম, স্লোগান, এসইও মেটাডাটা, গুগল সার্চ কনসোল ও যোগাযোগ ঠিকানা পরিচালনা করুন
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <div className="flex items-center gap-1.5 bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 px-3 py-1.5 rounded-lg text-xs font-bold animate-fadeIn shadow-sm">
              <Check className="w-4 h-4 text-green-600" />
              <span>সেটিংস সংরক্ষিত হয়েছে!</span>
            </div>
          )}
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-red-600 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1"
            title="ডিফল্ট সেটিংসে ফিরিয়ে নিন"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">রিসেট ডিফল্ট</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-100 dark:border-slate-800 no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'general'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>সাধারণ ও ব্র্যান্ডিং</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'seo'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>এসইও ও মেটাডাটা (Google SEO)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('editorial')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'editorial'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>সম্পাদনা ও কার্যালয়</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'social'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>যোগাযোগ ও সোশ্যাল মিডিয়া</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('epaper')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'epaper'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
          <span>লাইভ ও ই-পেপার</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* TAB 1: General & Branding */}
        {activeTab === 'general' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  পোর্টালের নাম (Site Name) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.siteName || ''}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold outline-none focus:border-red-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  স্লোগান (Tagline)
                </label>
                <input
                  type="text"
                  value={formData.tagline || ''}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600 font-bangla"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  লোগো টেক্সট (Logo Brand Text)
                </label>
                <input
                  type="text"
                  value={formData.logoText || ''}
                  onChange={(e) => handleChange('logoText', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ডিফল্ট মেটা সারাংশ (Default Short Summary)
                </label>
                <input
                  type="text"
                  value={formData.metaDescriptionDefault || ''}
                  onChange={(e) => handleChange('metaDescriptionDefault', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none font-bangla"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                ফুটার কপিরাইট নোটিশ (Footer Notice)
              </label>
              <textarea
                rows={2}
                value={formData.footerNotice || ''}
                onChange={(e) => handleChange('footerNotice', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none font-bangla"
              ></textarea>
            </div>
          </div>
        )}

        {/* TAB 2: SEO & Metadata */}
        {activeTab === 'seo' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                  <span>হোমপেজ মেটা টাইটেল (Default Meta Title)</span>
                  <span className="text-[10px] text-slate-400">Google সার্চের নীল শিরোনাম হিসেবে দেখাবে</span>
                </label>
                <input
                  type="text"
                  value={seoData.siteTitle || ''}
                  onChange={(e) => handleSeoChange('siteTitle', e.target.value)}
                  placeholder="THE SATKHIRA TIMES | সত্য ও নিরপেক্ষ সংবাদ - দ্য সাতক্ষীরা টাইমস"
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none font-bangla font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                  <span>হোমপেজ মেটা ডেসক্রিপশন (Meta Description for Google SEO)</span>
                  <span className="text-[10px] text-slate-400">Google ও Facebook এর বর্ণনামূলক লেখা</span>
                </label>
                <textarea
                  rows={2}
                  value={seoData.metaDescription || ''}
                  onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                  placeholder="THE SATKHIRA TIMES - সত্য ও নিরপেক্ষ সংবাদ। সাতক্ষীরা, জাতীয়, আন্তর্জাতিক, রাজনীতি, অর্থনীতি ও খেলাধুলার সর্বশেষ তাজা খবর।"
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none font-bangla text-xs"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  মেটা কিওয়ার্ডস (SEO Keywords - কমা দিয়ে লিখুন)
                </label>
                <input
                  type="text"
                  value={seoData.metaKeywords || ''}
                  onChange={(e) => handleSeoChange('metaKeywords', e.target.value)}
                  placeholder="সাতক্ষীরা খবর, দ্য সাতক্ষীরা টাইমস, Satkhira News, বাংলা সংবাদ, সুন্দরবন, ভোমরা"
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none font-bangla"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ডিফল্ট ওপেনগ্রাফ ব্যানার ছবি (Facebook / OG Image URL)
                  </label>
                  <input
                    type="url"
                    value={seoData.ogImageUrl || ''}
                    onChange={(e) => handleSeoChange('ogImageUrl', e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ক্যানোনিকাল সাইট ইউআরএল (Canonical URL)
                  </label>
                  <input
                    type="url"
                    value={seoData.canonicalUrl || ''}
                    onChange={(e) => handleSeoChange('canonicalUrl', e.target.value)}
                    placeholder="https://satkhiratimes.com"
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Google Analytics ট্র্যাকিং আইডি (G-XXXXXXXXXX)
                  </label>
                  <input
                    type="text"
                    value={seoData.googleAnalyticsId || ''}
                    onChange={(e) => handleSeoChange('googleAnalyticsId', e.target.value)}
                    placeholder="G-1234567890"
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Google Search Console ভেরিফিকেশন কোড
                  </label>
                  <input
                    type="text"
                    value={seoData.googleSearchConsoleCode || ''}
                    onChange={(e) => handleSeoChange('googleSearchConsoleCode', e.target.value)}
                    placeholder="google-site-verification=..."
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Live Google Search Preview Simulation */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                <span>Google সার্চ ইঞ্জিন রেজাল্ট প্রিভিউ (Live Google SERP Preview)</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm max-w-xl font-sans">
                <div className="text-xs text-slate-700 dark:text-slate-400 flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-red-700 text-white text-[9px] flex items-center justify-center font-bold">S</span>
                  <span>satkhiratimes.com</span>
                </div>
                <h4 className="text-base text-[#1a0dab] dark:text-[#8ab4f8] hover:underline font-medium cursor-pointer line-clamp-1 mt-0.5">
                  {seoData.siteTitle || formData.siteName || 'THE SATKHIRA TIMES | সত্য ও নিরপেক্ষ সংবাদ'}
                </h4>
                <p className="text-xs text-[#4d5156] dark:text-[#bdc1c6] mt-1 line-clamp-2 leading-relaxed font-bangla">
                  {seoData.metaDescription || formData.metaDescriptionDefault || 'সাতক্ষীরা সহ সমগ্র বাংলাদেশ ও বিশ্বের নির্ভরযোগ্য অনলাইন সংবাদ মাধ্যম।'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Editorial & Office */}
        {activeTab === 'editorial' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  সম্পাদক (Editor in Chief)
                </label>
                <input
                  type="text"
                  value={formData.editorName || ''}
                  onChange={(e) => handleChange('editorName', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none font-bangla"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  প্রকাশক (Publisher)
                </label>
                <input
                  type="text"
                  value={formData.publisherName || ''}
                  onChange={(e) => handleChange('publisherName', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none font-bangla"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  সাতক্ষীরা প্রধান কার্যালয়ের ঠিকানা
                </label>
                <input
                  type="text"
                  value={formData.mainOfficeAddress || ''}
                  onChange={(e) => handleChange('mainOfficeAddress', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none font-bangla"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ঢাকা ব্যুরো কার্যালয়ের ঠিকানা
                </label>
                <input
                  type="text"
                  value={formData.dhakaOfficeAddress || ''}
                  onChange={(e) => handleChange('dhakaOfficeAddress', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none font-bangla"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Social & Communication */}
        {activeTab === 'social' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  বার্তা কক্ষ ফোন (Phone)
                </label>
                <input
                  type="text"
                  value={formData.contactPhone || ''}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ইমেইল ঠিকানা (Email)
                </label>
                <input
                  type="email"
                  value={formData.contactEmail || ''}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  হোয়াটসঅ্যাপ নম্বর (WhatsApp)
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber || ''}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Facebook পেজ লিঙ্ক
                </label>
                <input
                  type="url"
                  value={formData.facebookUrl || ''}
                  onChange={(e) => handleChange('facebookUrl', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  YouTube চ্যানেল লিঙ্ক
                </label>
                <input
                  type="url"
                  value={formData.youtubeUrl || ''}
                  onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  টেলিগ্রাম / আর্নিং লিঙ্ক
                </label>
                <input
                  type="url"
                  value={formData.telegramUrl || ''}
                  onChange={(e) => handleChange('telegramUrl', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Twitter / X প্রোফাইল লিঙ্ক
                </label>
                <input
                  type="url"
                  value={formData.twitterUrl || ''}
                  onChange={(e) => handleChange('twitterUrl', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Google News পাবলিশার লিঙ্ক
                </label>
                <input
                  type="url"
                  value={formData.googleNewsUrl || ''}
                  onChange={(e) => handleChange('googleNewsUrl', e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Live Stream & E-Paper */}
        {activeTab === 'epaper' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  লাইভ টিভি / ইউটিউব লাইভ ভিডিও লিঙ্ক (Live Stream URL)
                </label>
                <input
                  type="url"
                  value={formData.liveStreamUrl || ''}
                  onChange={(e) => handleChange('liveStreamUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-1">হেডার ও ফোটারের 'লাইভ টিভি' বাটনে এই লিঙ্কটি কাজ করবে।</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ই-পেপার পোর্টাল লিঙ্ক (E-Paper URL)
                </label>
                <input
                  type="text"
                  value={formData.ePaperUrl || ''}
                  onChange={(e) => handleChange('ePaperUrl', e.target.value)}
                  placeholder="https://epaper.satkhiratimes.com"
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-1">হেডারের 'ই-পেপার' বাটনে এই লিঙ্কটি কাজ করবে।</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit & Save Footer */}
        <div className="pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 font-bangla">
            পরিবর্তনগুলো সাথে সাথে ওয়েবসাইটে সংরক্ষিত হবে।
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-2 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>সকল পরিবর্তন সংরক্ষণ করুন</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
