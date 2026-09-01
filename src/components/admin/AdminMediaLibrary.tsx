import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { Upload, Image as ImageIcon, Copy, Check, Trash2, Search, ExternalLink } from 'lucide-react';
import { formatBengaliDate, toBengaliDigits } from '../../utils/helpers';

export const AdminMediaLibrary: React.FC = () => {
  const { mediaLibrary, addMediaItem, deleteMediaItem } = useNews();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result as string;
        addMediaItem({
          name: file.name,
          url: resultStr,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          type: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredMedia = mediaLibrary.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif-bangla flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-red-600" />
            <span>মিডিয়া লাইব্রেরি ও ফটো গ্যালারি</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            সংবাদের ফটো ও গ্রাফিক্স আপলোড করুন এবং যেকোনো আর্টিকেলে ব্যবহার করুন
          </p>
        </div>

        <label className="cursor-pointer bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-md flex items-center gap-2 self-start sm:self-auto transition">
          <Upload className="w-4 h-4" />
          <span>নতুন ফটো আপলোড</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <input
          type="text"
          placeholder="মিডিয়ার নাম দিয়ে খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group relative bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col justify-between"
          >
            <div className="aspect-square bg-slate-900 overflow-hidden relative">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button
                  onClick={() => handleCopy(item.id, item.url)}
                  className="p-1.5 bg-white text-slate-900 rounded-full hover:bg-red-600 hover:text-white transition"
                  title="লিঙ্ক কপি করুন"
                >
                  {copiedId === item.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => deleteMediaItem(item.id)}
                  className="p-1.5 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-2 text-[10px]">
              <div className="font-bold text-slate-900 dark:text-white truncate">
                {item.name}
              </div>
              <div className="text-slate-400 flex items-center justify-between mt-1">
                <span>{item.size}</span>
                <span>{copiedId === item.id && <span className="text-green-600 font-bold">কপি হয়েছে!</span>}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
