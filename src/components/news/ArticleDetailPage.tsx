import React, { useState, useEffect } from 'react';
import { useNews } from '../../context/NewsContext';
import { 
  formatBengaliDate, 
  toBengaliDigits, 
  calculateReadTime, 
  getShareLinks 
} from '../../utils/helpers';
import { AdBanner } from '../ads/AdBanner';
import { 
  Clock, 
  Eye, 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  Printer, 
  MapPin, 
  Facebook, 
  Twitter, 
  Send, 
  Phone, 
  MessageSquare, 
  ThumbsUp, 
  Check, 
  Copy, 
  ChevronRight,
  Tag,
  Flame,
  User
} from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { 
    articles, 
    selectedArticleId, 
    setSelectedArticleId, 
    setCurrentView, 
    setSelectedCategory,
    bookmarkedIds, 
    toggleBookmark,
    incrementArticleViews,
    comments,
    addComment,
    likeComment,
    readingFontSize
  } = useNews();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const article = articles.find(a => a.id === selectedArticleId) || articles[0];

  useEffect(() => {
    if (article) {
      incrementArticleViews(article.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [article?.id]);

  if (!article) return null;

  const readTime = calculateReadTime(article.content);
  const articleUrl = window.location.href;
  const shareLinks = getShareLinks(articleUrl, article.title);

  // Related articles in same category
  const relatedArticles = articles
    .filter(a => a.id !== article.id && (a.category === article.category || (a.upazila && a.upazila === article.upazila)))
    .slice(0, 4);

  // Filter comments for this article
  const articleComments = comments.filter(c => c.articleId === article.id);

  // Text-To-Speech Reader
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('আপনার ব্রাউজারে টেক্সট-টু-স্পীচ সমর্থিত নয়।');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = `${article.title}। ${article.excerpt}। ${article.content}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.95;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentName.trim() && commentBody.trim()) {
      addComment(article.id, commentName.trim(), commentEmail.trim() || 'reader@satkhiratimes.com', commentBody.trim());
      setCommentBody('');
      setCommentName('');
      setCommentEmail('');
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 4000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Font size class based on context
  const fontSizeClass = readingFontSize === 'large' ? 'text-lg md:text-xl leading-relaxed' : readingFontSize === 'xlarge' ? 'text-xl md:text-2xl leading-loose' : 'text-base md:text-lg leading-relaxed';

  return (
    <div className="max-w-4xl mx-auto my-6 px-4 printable-article">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4 overflow-x-auto no-print">
        <button 
          onClick={() => { setCurrentView('home'); setSelectedArticleId(null); }}
          className="hover:text-red-600 transition"
        >
          প্রচ্ছদ
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button 
          onClick={() => { setSelectedCategory(article.category); setCurrentView('category'); }}
          className="hover:text-red-600 font-semibold text-slate-700 dark:text-slate-300 transition"
        >
          {article.category}
        </button>
        {article.upazila && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <button 
              onClick={() => { setSelectedCategory(`সাতক্ষীরা:${article.upazila}`); setCurrentView('category'); }}
              className="text-red-600 font-semibold hover:underline"
            >
              {article.upazila}
            </button>
          </>
        )}
      </nav>

      {/* Article Header */}
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#8B0000] text-white text-[11px] font-bold font-sans uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm">
            {article.category}
          </span>
          {article.upazila && (
            <span className="bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 text-xs px-2.5 py-0.5 rounded font-medium flex items-center gap-1 border border-gray-200 dark:border-zinc-700">
              <MapPin className="w-3 h-3 text-[#8B0000]" />
              {article.upazila}
            </span>
          )}
          {article.isBreaking && (
            <span className="bg-[#8B0000] text-white text-[11px] px-2 py-0.5 rounded font-bold font-sans uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3 h-3" />
              জরুরি খবর
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white font-serif-bangla leading-tight tracking-tight mb-3">
          {article.title}
        </h1>

        {article.subtitle && (
          <h2 className="text-base sm:text-lg text-gray-700 dark:text-zinc-300 font-medium leading-relaxed mb-4 border-l-4 border-[#8B0000] pl-3 font-bangla">
            {article.subtitle}
          </h2>
        )}

        {/* Reporter Info & Timestamps */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-200 dark:border-zinc-800 text-xs text-gray-600 dark:text-zinc-400 font-sans">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-50 dark:bg-zinc-800 text-[#8B0000] flex items-center justify-center font-bold border border-red-200 dark:border-zinc-700">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-900 dark:text-zinc-100 font-bangla">
                {article.author.name}
              </div>
              <div className="text-[11px] text-gray-500 font-bangla">
                {article.author.role} • {article.author.location}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 font-bangla">
              <Clock className="w-3.5 h-3.5 text-[#8B0000]" />
              <span>{formatBengaliDate(article.publishedAt)}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 font-bangla">
              <Eye className="w-3.5 h-3.5" />
              <span>{toBengaliDigits(article.viewCount)} ভিউ</span>
            </div>
            <div className="hidden md:block bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-[11px] font-bangla">
              {readTime}
            </div>
          </div>
        </div>

        {/* Interactive Action Bar (Audio reader, print, font, bookmarks, shares) */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 no-print bg-gray-50 dark:bg-zinc-900 px-4 rounded mt-3 border border-gray-200 dark:border-zinc-800">
          {/* Audio speech button */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold font-sans uppercase tracking-wider transition shadow-sm ${
              isPlayingAudio 
                ? 'bg-black text-white animate-pulse' 
                : 'bg-[#8B0000] hover:bg-black text-white'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="font-bangla">{isPlayingAudio ? 'পাঠ থামান' : 'সংবাদ শুনুন (অডিও)'}</span>
          </button>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-gray-500 mr-1 hidden sm:inline font-bangla">শেয়ার:</span>
            
            <a 
              href={shareLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 bg-[#1877F2] text-white rounded hover:opacity-90 transition"
              title="ফেসবুকে শেয়ার করুন"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <a 
              href={shareLinks.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 bg-[#25D366] text-white rounded hover:opacity-90 transition"
              title="হোয়াটসঅ্যাপে শেয়ার করুন"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a 
              href={shareLinks.telegram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 bg-[#229ED9] text-white rounded hover:opacity-90 transition"
              title="টেলিগ্রামে শেয়ার করুন"
            >
              <Send className="w-4 h-4" />
            </a>

            <a 
              href={shareLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 bg-black text-white rounded hover:opacity-90 transition"
              title="X (Twitter)-এ শেয়ার করুন"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyLink}
              className="p-1.5 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-200 rounded hover:bg-gray-300 transition"
              title="লিঙ্ক কপি করুন"
            >
              {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Bookmark and Print */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(article.id)}
              className={`p-1.5 rounded border transition ${
                bookmarkedIds.includes(article.id)
                  ? 'bg-red-50 border-red-300 text-[#8B0000] dark:bg-zinc-800'
                  : 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-300'
              }`}
              title="বুকমার্ক"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded text-gray-600 dark:text-zinc-300 hover:text-[#8B0000] transition"
              title="প্রিন্ট করুন"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {copiedLink && (
          <div className="bg-green-100 text-green-800 text-xs text-center py-1.5 rounded mt-2 font-semibold font-bangla">
            খবরের লিঙ্ক সফলভাবে কপি করা হয়েছে!
          </div>
        )}
      </header>

      {/* Featured Image */}
      <figure className="mb-6 rounded-xl overflow-hidden bg-slate-900 shadow-md">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full max-h-[480px] object-cover"
        />
        {article.imageCaption && (
          <figcaption className="p-3 bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 font-medium">
            {article.imageCaption}
          </figcaption>
        )}
      </figure>

      {/* Article Body Content */}
      <div className={`prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 ${fontSizeClass}`}>
        {/* Lead Excerpt */}
        <p className="font-semibold text-lg md:text-xl text-slate-900 dark:text-slate-100 mb-6 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Content Paragraphs with in-article ad slot */}
        <div className="space-y-4 whitespace-pre-line leading-relaxed font-bangla">
          {article.content}
        </div>

        {/* In-Article Ad Banner */}
        <div className="no-print">
          <AdBanner slot="in_article" />
        </div>
      </div>

      {/* Tags Section */}
      {article.tags && article.tags.length > 0 && (
        <div className="my-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 flex-wrap no-print">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-red-600" />
            বিষয় ও ট্যাগ:
          </span>
          {article.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedCategory(tag === 'সাতক্ষীরা' ? 'সাতক্ষীরা' : null);
                setCurrentView('category');
              }}
              className="text-xs bg-slate-100 hover:bg-red-50 hover:text-red-600 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 transition"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Share Bar */}
      <div className="my-8 p-4 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 no-print shadow-lg">
        <div>
          <h4 className="font-bold text-sm font-serif-bangla">সংবাদটি ভালো লাগলে বন্ধুদের সাথে শেয়ার করুন</h4>
          <p className="text-xs text-slate-400">সত্য ও বস্তুনিষ্ঠ তথ্য প্রচারে আমাদের পাশে থাকুন</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 hover:opacity-90">
            <Facebook className="w-3.5 h-3.5" /> ফেসবুক
          </a>
          <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 hover:opacity-90">
            <Phone className="w-3.5 h-3.5" /> হোয়াটসঅ্যাপ
          </a>
          <button onClick={handleCopyLink} className="bg-slate-800 border border-slate-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 hover:bg-slate-700">
            <Copy className="w-3.5 h-3.5" /> লিঙ্ক
          </button>
        </div>
      </div>

      {/* Facebook & OpenGraph Metadata Inspector Simulation Box */}
      <div className="my-6 p-4 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 no-print">
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-2">
          <Share2 className="w-4 h-4 text-blue-600" />
          সোশ্যাল মিডিয়া প্রিভিউ ও এসইও মেটাডাটা (Facebook & Google OpenGraph Ready)
        </h4>
        <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1 text-slate-600 dark:text-slate-300">
          <div><strong>og:title:</strong> {article.title}</div>
          <div><strong>og:description:</strong> {article.excerpt}</div>
          <div><strong>og:image:</strong> <span className="text-blue-600 truncate inline-block max-w-[300px]">{article.featuredImage}</span></div>
          <div><strong>og:site_name:</strong> THE SATKHIRA TIMES</div>
        </div>
      </div>

      {/* COMMENTS SECTION */}
      <section className="my-10 no-print">
        <div className="flex items-center justify-between border-b-2 border-red-600 pb-2 mb-6">
          <h3 className="font-bold text-xl text-slate-900 dark:text-white font-serif-bangla flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-red-600" />
            পাঠকের মন্তব্য ({toBengaliDigits(articleComments.length)})
          </h3>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 space-y-3">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
            আপনার মতামত প্রকাশ করুন
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="আপনার নাম *"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
            />
            <input
              type="email"
              placeholder="ইমেইল ঠিকানা (ঐচ্ছিক)"
              value={commentEmail}
              onChange={(e) => setCommentEmail(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
            />
          </div>

          <textarea
            required
            rows={3}
            placeholder="আপনার সুচিন্তিত মন্তব্য লিখুন..."
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
          ></textarea>

          <div className="flex items-center justify-between">
            <p className="text-[11px] text-slate-400"> শালীন ও গঠনমূলক মন্তব্য কাম্য।</p>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2 rounded-lg transition shadow"
            >
              মন্তব্য জমা দিন
            </button>
          </div>

          {commentSuccess && (
            <div className="bg-green-100 text-green-800 p-2 rounded text-xs text-center font-bold">
              আপনার মন্তব্য সফলভাবে প্রকাশিত হয়েছে! ধন্যবাদ।
            </div>
          )}
        </form>

        {/* Existing Comments List */}
        <div className="space-y-3">
          {articleComments.length === 0 ? (
            <p className="text-center py-6 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              এখনও কোনো মন্তব্য করা হয়নি। আপনিই প্রথম মন্তব্য করুন!
            </p>
          ) : (
            articleComments.map((comm) => (
              <div
                key={comm.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200">
                      {comm.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white">{comm.userName}</div>
                      <div className="text-[10px] text-slate-400">{formatBengaliDate(comm.createdAt)}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => likeComment(comm.id)}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{toBengaliDigits(comm.likes)}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-10">
                  {comm.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* RELATED NEWS (সম্পর্কিত খবর) */}
      {relatedArticles.length > 0 && (
        <section className="my-10 pt-6 border-t-2 border-slate-200 dark:border-slate-800 no-print">
          <h3 className="font-bold text-xl text-slate-900 dark:text-white font-serif-bangla mb-4 flex items-center gap-2">
            <span className="w-2 h-5 bg-red-600 rounded"></span>
            সম্পর্কিত আরও খবর
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  setSelectedArticleId(rel.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:border-red-500 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video overflow-hidden bg-slate-800">
                    <img
                      src={rel.featuredImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-red-600 transition font-serif-bangla leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                </div>

                <div className="p-3 pt-0 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-2">
                  <span>{rel.category}</span>
                  <span>{formatBengaliDate(rel.publishedAt).split(',')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
