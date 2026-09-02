import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Flame, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Link2,
  Copy,
  Check
} from 'lucide-react';
import { formatBengaliDate, toBengaliDigits, getArticleUrl } from '../../utils/helpers';
import { INITIAL_CATEGORIES } from '../../data/initialData';

interface AdminNewsListProps {
  onAddNew: () => void;
  onEdit: (articleId: string) => void;
}

export const AdminNewsList: React.FC<AdminNewsListProps> = ({ onAddNew, onEdit }) => {
  const { 
    articles, 
    deleteArticle, 
    updateArticle, 
    openArticle
  } = useNews();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('সকল');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  let filtered = [...articles];

  if (selectedCat !== 'সকল') {
    filtered = filtered.filter(a => a.category === selectedCat);
  }

  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.author.name.toLowerCase().includes(q) ||
      (a.upazila && a.upazila.toLowerCase().includes(q))
    );
  }

  const handleDelete = (id: string) => {
    deleteArticle(id);
    setDeleteConfirmId(null);
  };

  const handleCopyLink = (e: React.MouseEvent, art: typeof articles[0]) => {
    e.stopPropagation();
    const url = getArticleUrl(art);
    navigator.clipboard.writeText(url);
    setCopiedId(art.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 sm:p-6">
      
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif-bangla flex items-center gap-2">
            <span>সকল সংবাদ তালিকা</span>
            <span className="text-xs bg-red-100 dark:bg-red-950 text-red-600 px-2.5 py-0.5 rounded-full font-bold">
              {toBengaliDigits(filtered.length)} টি সংবাদ
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">সংবাদ প্রকাশ, সম্পাদন, ব্রেকিং ও ডিলিট নিয়ন্ত্রণ করুন</p>
        </div>

        <button
          onClick={onAddNew}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-md transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন সংবাদ যোগ করুন</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="শিরোনাম বা প্রতিবেদকের নামে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">বিভাগ:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="text-xs font-semibold p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
          >
            <option value="সকল">সকল বিভাগ</option>
            {INITIAL_CATEGORIES.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* News Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">সংবাদ ও শিরোনাম</th>
              <th className="py-3 px-3">বিভাগ / এলাকা</th>
              <th className="py-3 px-3 text-center">ভিউ সংখ্যা</th>
              <th className="py-3 px-3 text-center">ব্রেকিং / টপ</th>
              <th className="py-3 px-3">স্ট্যাটাস</th>
              <th className="py-3 px-3 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((art) => (
              <tr key={art.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                
                {/* News details */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={art.featuredImage}
                      alt={art.title}
                      className="w-12 h-9 rounded object-cover flex-shrink-0 bg-slate-200"
                    />
                    <div className="max-w-xs md:max-w-sm">
                      <div className="font-bold text-slate-900 dark:text-white line-clamp-1 font-serif-bangla text-xs sm:text-sm">
                        {art.title}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{art.author.name}</span>
                        <span>•</span>
                        <span>{formatBengaliDate(art.publishedAt).split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Category & Location */}
                <td className="py-3 px-3">
                  <div className="space-y-1">
                    <span className="inline-block bg-red-50 dark:bg-red-950 text-red-600 font-bold px-2 py-0.5 rounded text-[10px]">
                      {art.category}
                    </span>
                    {art.upazila && (
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-amber-500" />
                        <span>{art.upazila}</span>
                      </div>
                    )}
                  </div>
                </td>

                {/* View count */}
                <td className="py-3 px-3 text-center font-bold">
                  <span className="flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3 text-slate-400" />
                    {toBengaliDigits(art.viewCount)}
                  </span>
                </td>

                {/* Toggles */}
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => updateArticle(art.id, { isBreaking: !art.isBreaking })}
                      className={`p-1 rounded transition ${art.isBreaking ? 'bg-red-600 text-white' : 'text-slate-300 hover:text-red-600'}`}
                      title="ব্রেকিং নিউজ টগল"
                    >
                      <Flame className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => updateArticle(art.id, { isTopHeadline: !art.isTopHeadline })}
                      className={`p-1 rounded transition ${art.isTopHeadline ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-amber-500'}`}
                      title="টপ হেডলাইন টগল"
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    art.status === 'published' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' 
                      : art.status === 'scheduled'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {art.status === 'published' ? 'প্রকাশিত' : art.status === 'scheduled' ? 'শিডিউলড' : 'ড্রাফট'}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Copy Direct Link */}
                    <button
                      onClick={(e) => handleCopyLink(e, art)}
                      className={`p-1.5 rounded transition ${
                        copiedId === art.id 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300'
                      }`}
                      title={copiedId === art.id ? 'লিংক কপি হয়েছে!' : 'সরাসরি পোস্ট লিংক কপি করুন'}
                    >
                      {copiedId === art.id ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>

                    {/* Live Preview link */}
                    <button
                      onClick={() => openArticle(art.id)}
                      className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition"
                      title="সংবাদটি লাইভ পড়ুন"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => onEdit(art.id)}
                      className="p-1.5 rounded bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 text-blue-600 dark:text-blue-400 transition"
                      title="সম্পাদনা করুন"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteConfirmId(art.id)}
                      className="p-1.5 rounded bg-red-50 dark:bg-red-950 hover:bg-red-100 text-red-600 transition"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif-bangla">
              আপনি কি নিশ্চিতভাবে এই সংবাদটি মুছে ফেলতে চান?
            </h3>
            <p className="text-xs text-slate-500">
              এটি ডিলিট করলে ওয়েবসাইট থেকে তৎক্ষণাৎ অপসারণ হবে।
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold"
              >
                না, রাখুন
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
