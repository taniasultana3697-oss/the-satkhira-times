import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { Flame, Plus, Trash2, Power, Check, Bell } from 'lucide-react';
import { formatBengaliDate } from '../../utils/helpers';

export const AdminBreakingNews: React.FC = () => {
  const { 
    breakingNews, 
    addBreakingNews, 
    toggleBreakingNews, 
    deleteBreakingNews,
    articles 
  } = useNews();

  const [newTitle, setNewTitle] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      addBreakingNews(newTitle.trim(), selectedArticleId || undefined);
      setNewTitle('');
      setSelectedArticleId('');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Add Breaking News Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
          <div className="p-2 bg-red-100 dark:bg-red-950 text-red-600 rounded-lg">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-serif-bangla">
              ব্রেকিং নিউজ টিকার কন্ট্রোলার
            </h2>
            <p className="text-xs text-slate-500">
              ওয়েবসাইটের শীর্ষে লাল রঙের অ্যানিমেটেড ব্রেকিং নিউজ ফিতা নিয়ন্ত্রণ করুন
            </p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              জরুরি ব্রেকিং শিরোনাম (Breaking Alert Text) *
            </label>
            <input
              type="text"
              required
              placeholder="ব্রেকিং নিউজ শিরোনাম লিখুন..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-red-600 font-bold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                সংবাদের সাথে লিঙ্ক করুন (ঐচ্ছিক)
              </label>
              <select
                value={selectedArticleId}
                onChange={(e) => setSelectedArticleId(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none"
              >
                <option value="">কোনো সংবাদের সাথে লিঙ্ক ছাড়া</option>
                {articles.map((art) => (
                  <option key={art.id} value={art.id}>{art.title.slice(0, 50)}...</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 px-5 rounded-lg transition shadow flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>টিকার যোগ করুন</span>
            </button>
          </div>
        </form>
      </div>

      {/* Active Tickers List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-red-600" />
          <span>বর্তমান ব্রেকিং নিউজসমূহ</span>
        </h3>

        <div className="space-y-3">
          {breakingNews.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition ${
                item.isActive 
                  ? 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className={`p-1.5 rounded-full ${item.isActive ? 'bg-red-600 text-white' : 'bg-slate-400 text-white'}`}>
                  <Flame className="w-3.5 h-3.5 fill-current" />
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    যুক্ত হয়েছে: {formatBengaliDate(item.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => toggleBreakingNews(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    item.isActive 
                      ? 'bg-green-600 text-white' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Power className="w-3 h-3" />
                  <span>{item.isActive ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয় (Off)'}</span>
                </button>

                <button
                  onClick={() => deleteBreakingNews(item.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded transition"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
