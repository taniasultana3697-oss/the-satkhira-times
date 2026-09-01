import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
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
  Building
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useNews();
  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSeoChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      seoSettings: {
        ...prev.seoSettings,
        [field]: value
      }
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
      
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-100 dark:bg-red-950 text-red-600 rounded-xl">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif-bangla">
              ওয়েবসাইট ও এসইও (SEO) সেটিংস
            </h2>
            <p className="text-xs text-slate-500">
              পোর্টালের নাম, স্লোগান, অফিস ঠিকানা, সোশ্যাল লিঙ্ক ও মেটাডাটা পরিচালনা করুন
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-lg text-xs font-bold animate-fade-in">
            <Check className="w-4 h-4" />
            সেটিংস হালনাগাদ সফল হয়েছে!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* 1. Basic Branding */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-red-600" />
            ব্র্যান্ডিং ও পরিচিতি
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                ওয়েবসাইটের নাম (Site Name)
              </label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                স্লোগান (Tagline)
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
              />
            </div>
          </div>
        </div>

        {/* 2. Editorial & Organization */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-red-600" />
            সম্পাদকমণ্ডলী ও কার্যালয়
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                সম্পাদক (Editor)
              </label>
              <input
                type="text"
                value={formData.editorName}
                onChange={(e) => handleChange('editorName', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                প্রকাশক (Publisher)
              </label>
              <input
                type="text"
                value={formData.publisherName}
                onChange={(e) => handleChange('publisherName', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                সাতক্ষীরা প্রধান কার্যালয়ের ঠিকানা
              </label>
              <input
                type="text"
                value={formData.mainOfficeAddress}
                onChange={(e) => handleChange('mainOfficeAddress', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                ঢাকা ব্যুরো কার্যালয়ের ঠিকানা
              </label>
              <input
                type="text"
                value={formData.dhakaOfficeAddress}
                onChange={(e) => handleChange('dhakaOfficeAddress', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Communication & Social Channels */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-red-600" />
            যোগাযোগ ও সোশ্যাল মিডিয়া লিঙ্ক
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                বার্তা কক্ষ ফোন
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                ইমেইল ঠিকানা
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                হোয়াটসঅ্যাপ নম্বর
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
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
                value={formData.facebookUrl}
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
                value={formData.youtubeUrl}
                onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Telegram গ্রুপ লিঙ্ক
              </label>
              <input
                type="url"
                value={formData.telegramUrl}
                onChange={(e) => handleChange('telegramUrl', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* 4. Global SEO Settings */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-red-600" />
            গ্লোবাল এসইও মেটাডাটা (Global SEO Meta)
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Default Meta Title
              </label>
              <input
                type="text"
                value={formData.seoSettings.siteTitle}
                onChange={(e) => handleSeoChange('siteTitle', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Default Meta Description
              </label>
              <textarea
                rows={2}
                value={formData.seoSettings.metaDescription}
                onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>সকল পরিবর্তন সংরক্ষণ করুন</span>
          </button>
        </div>

      </form>
    </div>
  );
};
