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
  const [copiedPostText, setCopiedPostText] = useState(false);
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
  const articleUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?article=${article.id}`
    : `https://satkhiratimes.com/?article=${article.id}`;
  const shareLinks = getShareLinks(articleUrl, article.title, article.featuredImage);

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

  const handleFacebookShare = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
    window.open(fbUrl, 'fbShareWindow', 'width=650,height=550,top=100,left=100,toolbar=no,status=no,resizable=yes');
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: `${article.title}\n\n${article.excerpt}`,
          url: articleUrl,
        });
      } catch (err) {
        // Ignored or cancelled
      }
    } else {
      handleFacebookShare();
    }
  };

  const handleCopyFormattedPost = () => {
    const text = `📌 ${article.title}\n\n${article.excerpt}\n\n🔗 সম্পূর্ণ প্রতিবেদনটি পড়তে ক্লিক করুন:\n${articleUrl}\n\n#TheSatkhiraTimes #SatkhiraNews #${article.category.replace(/\s+/g, '')}`;
    navigator.clipboard.writeText(text);
    setCopiedPostText(true);
    setTimeout(() => setCopiedPostText(false), 2500);
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
            
            <button 
              onClick={handleFacebookShare}
              className="px-2.5 py-1.5 bg-[#1877F2] text-white rounded hover:opacity-90 transition flex items-center gap-1.5 text-xs font-bold font-bangla shadow-sm"
              title="ফেসবুকে ছবি সহ শেয়ার করুন"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>ফেসবুক</span>
            </button>

            <button 
              onClick={handleNativeShare}
              className="p-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
              title="ডিভাইস শেয়ার (ফেসবুক/হোয়াটসঅ্যাপ অ্যাপ)"
            >
              <Share2 className="w-4 h-4" />
            </button>

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
        <div className="space-y-5 leading-relaxed font-bangla text-slate-800 dark:text-slate-200">
          {article.content
            .split(/\n\s*\n|\n/)
            .map(p => p.trim())
            .filter(p => p.length > 0)
            .map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <p className="text-base sm:text-lg leading-relaxed text-justify">
                  {paragraph}
                </p>

                {/* Insert Native Ad right inside the post (after 2nd paragraph or middle of short post) */}
                {(index === 1 || (arr.length <= 2 && index === 0)) && (
                  <div className="my-6 no-print">
                    <AdBanner slot="in_article" />
                  </div>
                )}
              </React.Fragment>
            ))}
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
      <div className="my-8 p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 no-print shadow-xl border border-slate-700/50">
        <div>
          <h4 className="font-bold text-base font-serif-bangla flex items-center gap-2">
            <Share2 className="w-4 h-4 text-red-500" />
            ফেসবুকে সরাসরি শেয়ার করুন
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">পোস্টের মূল ছবি ও শিরোনাম সহ ফেসবুকে শেয়ার হবে</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={handleFacebookShare}
            className="bg-[#1877F2] hover:bg-[#166fe5] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition shadow-md font-bangla active:scale-95"
          >
            <Facebook className="w-4 h-4" /> ফেসবুকে শেয়ার
          </button>
          
          <button 
            onClick={handleNativeShare}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition font-bangla shadow-md"
          >
            <Share2 className="w-4 h-4" /> ডিভাইস শেয়ার
          </button>

          <button 
            onClick={handleCopyFormattedPost}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition font-bangla"
            title="ফেসবুকে পোস্ট করার ফরম্যাট করা টেক্সট ও লিঙ্ক কপি"
          >
            {copiedPostText ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedPostText ? 'টেক্সট কপি হয়েছে!' : 'পোস্ট টেক্সট কপি'}</span>
          </button>

          <button 
            onClick={handleCopyLink} 
            className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition font-bangla"
            title="শুধু লিঙ্ক কপি"
          >
            <Copy className="w-3.5 h-3.5" /> {copiedLink ? 'লিঙ্ক কপি হয়েছে' : 'লিঙ্ক'}
          </button>
        </div>
      </div>

      {/* Facebook Link Preview Card Simulation (Exact Facebook Feed Look) */}
      <div className="my-6 p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 font-serif-bangla">
              <Facebook className="w-4 h-4 text-[#1877F2]" />
              ফেসবুক শেয়ার প্রিভিউ (Open Graph Live Preview)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ফেসবুকে লিঙ্কটি পেস্ট বা শেয়ার করলে নিচের কার্ডের মতো ছবি ও শিরোনাম প্রদর্শিত হবে:
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFacebookShare}
              className="text-xs px-3 py-1.5 bg-[#1877F2] text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center gap-1.5"
            >
              <Facebook className="w-3.5 h-3.5" /> শেয়ার টেস্ট
            </button>
            <a
              href={shareLinks.facebookDebugger}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1.5 rounded-lg"
              title="Facebook Sharing Debugger টুল দিয়ে ছবি রিফ্রেশ ও মেটাডাটা চেক করুন"
            >
              FB Debugger ↗
            </a>
          </div>
        </div>

        {/* Realistic Facebook Post Card Mockup */}
        <div className="max-w-xl mx-auto rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 shadow-sm transition hover:shadow-md cursor-pointer" onClick={handleFacebookShare}>
          {/* Post Image */}
          <div className="relative aspect-[1.91/1] w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-sans px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              {article.category}
            </div>
          </div>

          {/* Facebook Post Info */}
          <div className="p-3.5 bg-[#f0f2f5] dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-sans">
              SATKHIRATIMES.COM
            </div>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug mt-1 font-serif-bangla line-clamp-2">
              {article.title}
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-bangla">
              {article.excerpt}
            </p>
          </div>
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

      {/* Adsterra Smart Direct Link Offer */}
      <div className="my-6 no-print">
        <AdBanner slot="direct_link" />
      </div>

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
