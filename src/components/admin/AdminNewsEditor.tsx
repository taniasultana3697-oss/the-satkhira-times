import React, { useState, useEffect } from 'react';
import { useNews } from '../../context/NewsContext';
import { NewsArticle, NewsCategory, SatkhiraUpazila } from '../../types';
import { INITIAL_CATEGORIES, SATKHIRA_UPAZILAS } from '../../data/initialData';
import { 
  Save, 
  X, 
  Image as ImageIcon, 
  MapPin, 
  Flame, 
  Star, 
  Clock, 
  Upload, 
  Tag, 
  Check, 
  Sparkles,
  Search
} from 'lucide-react';

interface AdminNewsEditorProps {
  editArticleId?: string | null;
  onClose: () => void;
  onSaved: () => void;
}

export const AdminNewsEditor: React.FC<AdminNewsEditorProps> = ({
  editArticleId,
  onClose,
  onSaved
}) => {
  const { articles, addArticle, updateArticle, addMediaItem } = useNews();

  const existingArticle = editArticleId ? articles.find(a => a.id === editArticleId) : null;

  const [title, setTitle] = useState(existingArticle?.title || '');
  const [subtitle, setSubtitle] = useState(existingArticle?.subtitle || '');
  const [slug, setSlug] = useState(existingArticle?.slug || '');
  const [category, setCategory] = useState<NewsCategory>(existingArticle?.category || 'সাতক্ষীরা');
  const [upazila, setUpazila] = useState<SatkhiraUpazila | ''>(existingArticle?.upazila || 'সাতক্ষীরা সদর');
  const [excerpt, setExcerpt] = useState(existingArticle?.excerpt || '');
  const [content, setContent] = useState(existingArticle?.content || '');
  const [featuredImage, setFeaturedImage] = useState(existingArticle?.featuredImage || 'https://images.unsplash.com/photo-1544985361-b552945d8b88?w=1200&auto=format&fit=crop&q=80');
  const [imageCaption, setImageCaption] = useState(existingArticle?.imageCaption || '');
  const [authorName, setAuthorName] = useState(existingArticle?.author.name || 'সাতক্ষীরা প্রতিনিধি');
  const [authorRole, setAuthorRole] = useState(existingArticle?.author.role || 'প্রতিবেদক');
  const [authorLocation, setAuthorLocation] = useState(existingArticle?.author.location || 'সাতক্ষীরা');
  const [isBreaking, setIsBreaking] = useState(existingArticle?.isBreaking || false);
  const [isTopHeadline, setIsTopHeadline] = useState(existingArticle?.isTopHeadline || false);
  const [isFeatured, setIsFeatured] = useState(existingArticle?.isFeatured || false);
  const [status, setStatus] = useState<'published' | 'draft' | 'scheduled'>(existingArticle?.status || 'published');
  const [scheduledAt, setScheduledAt] = useState(existingArticle?.scheduledAt || '');
  const [tagsInput, setTagsInput] = useState(existingArticle?.tags.join(', ') || 'সাতক্ষীরা, খবর');
  const [metaTitle, setMetaTitle] = useState(existingArticle?.seo.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(existingArticle?.seo.metaDescription || '');

  const [imagePreview, setImagePreview] = useState(featuredImage);

  // Auto-generate slug and meta title from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!existingArticle) {
      const generatedSlug = val
        .trim()
        .toLowerCase()
        .replace(/[^\w\u0980-\u09FF\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
      setMetaTitle(`${val} | THE SATKHIRA TIMES`);
    }
  };

  // Image Upload simulation / Local File reader
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result as string;
        setFeaturedImage(resultStr);
        setImagePreview(resultStr);
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('অনুগ্রহ করে শিরোনাম ও বিস্তারিত সংবাদ পূরণ করুন।');
      return;
    }

    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const articleData = {
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      slug: slug.trim() || `news-${Date.now()}`,
      excerpt: excerpt.trim() || content.slice(0, 160) + '...',
      content: content.trim(),
      category,
      upazila: upazila ? (upazila as SatkhiraUpazila) : undefined,
      featuredImage,
      imageCaption: imageCaption.trim() || undefined,
      author: {
        name: authorName.trim() || 'দ্য সাতক্ষীরা টাইমস ডেস্ক',
        role: authorRole.trim() || 'প্রতিবেদক',
        location: authorLocation.trim() || 'সাতক্ষীরা'
      },
      isBreaking,
      isTopHeadline,
      isFeatured,
      isTrending: isTopHeadline,
      status,
      scheduledAt: status === 'scheduled' ? scheduledAt : undefined,
      tags: tagsArray.length > 0 ? tagsArray : ['সাতক্ষীরা'],
      seo: {
        metaTitle: metaTitle.trim() || `${title} | দ্য সাতক্ষীরা টাইমস`,
        metaDescription: metaDescription.trim() || excerpt.trim() || content.slice(0, 150),
        keywords: tagsArray
      }
    };

    if (existingArticle) {
      updateArticle(existingArticle.id, articleData);
    } else {
      addArticle(articleData);
    }

    onSaved();
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif-bangla flex items-center gap-2">
            <span className="w-2.5 h-6 bg-red-600 rounded"></span>
            {existingArticle ? 'সংবাদ সম্পাদনা করুন' : 'নতুন সংবাদ প্রকাশ করুন'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            সবুজ বাটনে ক্লিক করলেই সংবাদটি তাত্ক্ষণিকভাবে ওয়েবসাইটে প্রদর্শিত হবে।
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Title & Subtitle */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              সংবাদের মূল শিরোনাম (News Title) *
            </label>
            <input
              type="text"
              required
              placeholder="আকর্ষণীয় ও বস্তুনিষ্ঠ শিরোনাম লিখুন..."
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-serif-bangla text-base font-bold outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              উপ-শিরোনাম (Sub Heading - ঐচ্ছিক)
            </label>
            <input
              type="text"
              placeholder="সংবাদের সারমর্ম এক লাইনে লিখুন..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-red-600"
            />
          </div>
        </div>

        {/* Category & Upazila & Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              ক্যাটাগরি / বিভাগ *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as NewsCategory)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-red-600 font-semibold"
            >
              {INITIAL_CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              সাতক্ষীরা উপজেলা নির্বাচন (যদি প্রযোজ্য)
            </label>
            <select
              value={upazila}
              onChange={(e) => setUpazila(e.target.value as SatkhiraUpazila)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-red-600"
            >
              <option value="">উপজেলা প্রযোজ্য নয়</option>
              {SATKHIRA_UPAZILAS.filter(u => u !== 'সকল').map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              পাবলিশিং স্ট্যাটাস (Status)
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'published' | 'draft' | 'scheduled')}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-red-600 font-bold"
            >
              <option value="published">তাৎক্ষণিক প্রকাশ (Published)</option>
              <option value="draft">ড্রাফট রাখুন (Draft)</option>
              <option value="scheduled">শিডিউল প্রকাশ (Scheduled)</option>
            </select>
          </div>
        </div>

        {/* Featured Image URL & File Upload */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-red-600" />
              ফিচার ইমেজ (Featured Image URL অথবা ছবি আপলোড) *
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 space-y-2">
              <input
                type="url"
                placeholder="ইমেজ ওয়েব লিঙ্ক (URL) দিন..."
                value={featuredImage}
                onChange={(e) => {
                  setFeaturedImage(e.target.value);
                  setImagePreview(e.target.value);
                }}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:border-red-600"
              />

              <div className="flex items-center gap-2">
                <label className="cursor-pointer bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition">
                  <Upload className="w-3.5 h-3.5" />
                  <span>ডিভাইস থেকে ছবি আপলোড করুন</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <input
                type="text"
                placeholder="ছবির ক্যাপশন (ছবি: দ্য সাতক্ষীরা টাইমস)"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none"
              />
            </div>

            {/* Preview Box */}
            <div className="md:col-span-4">
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setImagePreview('https://images.unsplash.com/photo-1544985361-b552945d8b88?w=1200&auto=format&fit=crop&q=80')}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                    ইমেজ প্রিভিউ
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lead Excerpt */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            সংবাদের সারসংক্ষেপ (Excerpt - হোমপেজে দেখাবে)
          </label>
          <textarea
            rows={2}
            placeholder="২-৩ লাইনে সংবাদের সারসংক্ষেপ লিখুন..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-red-600"
          ></textarea>
        </div>

        {/* Main Content Body */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            সম্পূর্ণ বিস্তারিত সংবাদ (Full Content Body) *
          </label>
          <textarea
            required
            rows={8}
            placeholder="এখানে পূর্ণাঙ্গ সংবাদ লিখুন। অনুচ্ছেদ অনুযায়ী লিখলে পাঠকদের পড়তে সুবিধা হবে..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:border-red-600 font-bangla leading-relaxed"
          ></textarea>
        </div>

        {/* Reporter Info & Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              প্রতিবেদকের নাম (Author Name)
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              স্থান / অবস্থান (Reporting Location)
            </label>
            <input
              type="text"
              value={authorLocation}
              onChange={(e) => setAuthorLocation(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none"
            />
          </div>
        </div>

        {/* Feature Toggles (Breaking, Top Headline, Featured) */}
        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200">
            <input
              type="checkbox"
              checked={isBreaking}
              onChange={(e) => setIsBreaking(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded"
            />
            <span className="flex items-center gap-1 text-red-600">
              <Flame className="w-3.5 h-3.5 fill-red-600" />
              ব্রেকিং নিউজ টিকার (Breaking Alert)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200">
            <input
              type="checkbox"
              checked={isTopHeadline}
              onChange={(e) => setIsTopHeadline(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded"
            />
            <span className="flex items-center gap-1 text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              হোমপেজ প্রধান হেডলাইন (Top Headline Lead)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded"
            />
            <span>হাইলাইট স্টোরি (Featured)</span>
          </label>
        </div>

        {/* SEO Meta Box */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
            SEO ও সোশ্যাল মিডিয়া ওপেনগ্রাফ মেটাডাটা
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="SEO Meta Title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs outline-none text-slate-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="SEO Meta Description"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs outline-none text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-lg transition"
          >
            বাতিল
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-md transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{existingArticle ? 'হালনাগাদ সংরক্ষণ করুন' : 'সংবাদ প্রকাশ করুন'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
