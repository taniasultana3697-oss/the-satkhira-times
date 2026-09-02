import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { NewsCategory, SatkhiraUpazila, NewsArticle } from '../../types';
import { SATKHIRA_UPAZILAS, INITIAL_CATEGORIES } from '../../data/initialData';
import { toBengaliDigits, formatBengaliDate } from '../../utils/helpers';
import { 
  PenSquare, 
  FileText, 
  UserCheck, 
  CreditCard, 
  KeyRound, 
  LogOut, 
  PlusCircle, 
  Eye, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Image as ImageIcon, 
  Sparkles, 
  Tag, 
  Send, 
  Lock, 
  UserPlus, 
  Check, 
  X, 
  Home, 
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Edit3,
  Building,
  Phone,
  Mail,
  MapPin,
  QrCode,
  Printer,
  Link2
} from 'lucide-react';
import { getArticleUrl } from '../../utils/helpers';

type ReporterTab = 'submit_news' | 'my_news' | 'press_card' | 'settings';

export const ReporterPortal: React.FC = () => {
  const { 
    currentReporter, 
    reporters, 
    loginReporter, 
    logoutReporter, 
    applyAsReporter,
    updateReporter,
    articles, 
    addArticle, 
    updateArticle, 
    openArticle,
    setCurrentView, 
    setSelectedArticleId 
  } = useNews();

  // Link copy state
  const [copiedArticleId, setCopiedArticleId] = useState<string | null>(null);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  // Register / Apply form state
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUpazila, setRegUpazila] = useState<SatkhiraUpazila>('শ্যামনগর');
  const [regDesignation, setRegDesignation] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regBio, setRegBio] = useState('');

  // Active Tab inside Portal
  const [activeTab, setActiveTab] = useState<ReporterTab>('submit_news');

  // News Editor Form State
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsSubtitle, setNewsSubtitle] = useState('');
  const [newsExcerpt, setNewsExcerpt] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCategory, setNewsCategory] = useState<NewsCategory>('সাতক্ষীরা');
  const [newsUpazila, setNewsUpazila] = useState<SatkhiraUpazila>('সাতক্ষীরা সদর');
  const [newsImage, setNewsImage] = useState('');
  const [newsImageCaption, setNewsImageCaption] = useState('');
  const [newsTags, setNewsTags] = useState('সাতক্ষীরা, সংবাদ');
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState('');

  // Password change in settings
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwSuccessMsg, setPwSuccessMsg] = useState('');

  // When reporter logs in, prefill their upazila
  React.useEffect(() => {
    if (currentReporter) {
      setNewsUpazila(currentReporter.upazila);
    }
  }, [currentReporter]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrorMsg('');
    const res = loginReporter(loginIdentifier, loginPassword);
    if (!res.success) {
      setLoginErrorMsg(res.message || 'লগইন ব্যর্থ হয়েছে!');
    }
  };

  // Quick 1-click login for testing
  const handleQuickLogin = (rep: typeof reporters[0]) => {
    setLoginIdentifier(rep.phone);
    setLoginPassword(rep.password);
    loginReporter(rep.phone, rep.password);
  };

  // Handle Application submission
  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim() || !regPassword.trim()) {
      alert('অনুগ্রহ করে প্রয়োজনীয় তথ্য পূরণ করুন।');
      return;
    }

    applyAsReporter({
      name: regName.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim() || `${regPhone.replace(/[^0-9]/g, '')}@satkhiratimes.com`,
      upazila: regUpazila,
      designation: regDesignation.trim() || `${regUpazila} প্রতিনিধি`,
      password: regPassword.trim(),
      bio: regBio.trim()
    });

    setApplySuccess(true);
  };

  // Handle News Submission
  const handleSubmitNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentReporter) return;

    if (!newsTitle.trim() || !newsContent.trim()) {
      alert('শিরোনাম ও মূল সংবাদ বিষয়বস্তু আবশ্যক।');
      return;
    }

    const defaultImage = newsImage.trim() || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80';
    const tagArray = newsTags.split(',').map(t => t.trim()).filter(Boolean);

    // Auto publish status based on reporter permission
    const articleStatus = currentReporter.canAutoPublish ? 'published' : 'pending_review';

    if (editingArticleId) {
      updateArticle(editingArticleId, {
        title: newsTitle.trim(),
        subtitle: newsSubtitle.trim(),
        excerpt: newsExcerpt.trim() || newsContent.slice(0, 140) + '...',
        content: newsContent.trim(),
        category: newsCategory,
        upazila: newsUpazila,
        featuredImage: defaultImage,
        imageCaption: newsImageCaption.trim(),
        tags: tagArray,
        updatedAt: new Date().toISOString()
      });
      setSubmitSuccessMsg('সংবাদটি সফলভাবে আপডেট করা হয়েছে!');
    } else {
      addArticle({
        slug: `satkhira-news-${Date.now()}`,
        title: newsTitle.trim(),
        subtitle: newsSubtitle.trim(),
        excerpt: newsExcerpt.trim() || newsContent.slice(0, 140) + '...',
        content: newsContent.trim(),
        category: newsCategory,
        upazila: newsUpazila,
        featuredImage: defaultImage,
        imageCaption: newsImageCaption.trim(),
        author: {
          name: currentReporter.name,
          role: currentReporter.designation,
          location: currentReporter.upazila,
          avatar: currentReporter.avatar
        },
        tags: tagArray,
        status: articleStatus,
        seo: {
          metaTitle: newsTitle.trim(),
          metaDescription: newsExcerpt.trim() || newsContent.slice(0, 140)
        }
      });

      if (currentReporter.canAutoPublish) {
        setSubmitSuccessMsg('🎉 অভিনন্দন! আপনার সংবাদটি সরাসরি প্রকাশিত হয়ে দ্য সাতক্ষীরা টাইমসে লাইভ হয়েছে।');
      } else {
        setSubmitSuccessMsg('📝 আপনার সংবাদটি সফলভাবে পাঠানো হয়েছে। প্রধান সম্পাদকের অনুমোদনের পর এটি প্রকাশিত হবে।');
      }
    }

    // Reset form
    setEditingArticleId(null);
    setNewsTitle('');
    setNewsSubtitle('');
    setNewsExcerpt('');
    setNewsContent('');
    setNewsImage('');
    setNewsImageCaption('');
  };

  // Edit existing article
  const handleEditExistingArticle = (art: NewsArticle) => {
    setEditingArticleId(art.id);
    setNewsTitle(art.title);
    setNewsSubtitle(art.subtitle || '');
    setNewsExcerpt(art.excerpt);
    setNewsContent(art.content);
    setNewsCategory(art.category);
    if (art.upazila) setNewsUpazila(art.upazila);
    setNewsImage(art.featuredImage);
    setNewsImageCaption(art.imageCaption || '');
    setNewsTags(art.tags.join(', '));
    setActiveTab('submit_news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Change individual password
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentReporter) return;

    if (!newPassword.trim()) {
      alert('নতুন পাসওয়ার্ড দিন।');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('উভয় পাসওয়ার্ড হুবহু এক হতে হবে।');
      return;
    }

    updateReporter(currentReporter.id, { password: newPassword.trim() });
    setPwSuccessMsg('আপনার পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে! পরবর্তী লগইনে এই পাসওয়ার্ড ব্যবহার করুন।');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Filter my articles
  const myArticles = currentReporter 
    ? articles.filter(a => a.author.name === currentReporter.name || a.author.name.includes(currentReporter.name))
    : [];

  const totalMyViews = myArticles.reduce((acc, curr) => acc + (curr.viewCount || 0), 0);
  const myPublishedCount = myArticles.filter(a => a.status === 'published').length;
  const myPendingCount = myArticles.filter(a => a.status === 'pending_review' || a.status === 'draft').length;

  // -------------------------------------------------------------
  // 1. IF NOT LOGGED IN: SHOW MODERN JOURNALIST DESK LOGIN
  // -------------------------------------------------------------
  if (!currentReporter) {
    return (
      <div className="min-h-[80vh] py-12 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full space-y-6">
          
          {/* Main Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                <PenSquare className="w-8 h-8" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif-bangla text-slate-900 dark:text-white">
                সাংবাদিক ও প্রতিনিধি ডেস্ক
              </h1>
              <p className="text-xs text-slate-500 font-serif-bangla">
                THE SATKHIRA TIMES — প্রতিনিধিদের নিজস্ব লগইন ও নিউজ সাবমিশন পোর্টাল
              </p>
            </div>

            {/* Toggle Login vs Register */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
              <button
                onClick={() => { setIsApplying(false); setLoginErrorMsg(''); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  !isApplying 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <KeyRound className="w-4 h-4 text-emerald-600" />
                <span>সাংবাদিক লগইন</span>
              </button>
              <button
                onClick={() => { setIsApplying(true); setApplySuccess(false); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  isApplying 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>নতুন প্রতিনিধি আবেদন</span>
              </button>
            </div>

            {/* Application Success Screen */}
            {isApplying && applySuccess ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/40 rounded-2xl p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif-bangla">
                  আবেদন সফলভাবে গ্রহণ করা হয়েছে!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-serif-bangla leading-relaxed">
                  ধন্যবাদ <strong>{regName}</strong>। দ্য সাতক্ষীরা টাইমসের সাংবাদিক হিসেবে আপনার আবেদনটি প্রধান সম্পাদকের পর্যালোচনায় রয়েছে। অনুমোদন পাওয়ার সাথে সাথেই আপনি আপনার দেওয়া পাসওয়ার্ড দিয়ে লগইন করতে পারবেন।
                </p>
                <button
                  onClick={() => { setIsApplying(false); setApplySuccess(false); }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow"
                >
                  লগইন স্ক্রিনে যান
                </button>
              </div>
            ) : isApplying ? (
              /* Registration / Join as reporter form */
              <form onSubmit={handleApply} className="space-y-4 text-xs">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-800 dark:text-emerald-300 text-[11px]">
                  💡 সাতক্ষীরার ৭টি উপজেলার যেকেউ সাংবাদিক/উপজেলা প্রতিনিধি হিসেবে যুক্ত হতে আবেদন করতে পারেন।
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মো: মনিরুল ইসলাম"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-serif-bangla"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      মোবাইল নম্বর (লগইন আইডি) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="017XXXXXXXX"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      পাসওয়ার্ড তৈরি করুন <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="গোপন পাসওয়ার্ড"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      উপজেলা <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={regUpazila}
                      onChange={(e) => setRegUpazila(e.target.value as SatkhiraUpazila)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600"
                    >
                      {SATKHIRA_UPAZILAS.filter(u => u !== 'সকল').map(u => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      প্রত্যাশিত পদবি
                    </label>
                    <input
                      type="text"
                      placeholder={`যেমন: ${regUpazila} প্রতিনিধি`}
                      value={regDesignation}
                      onChange={(e) => setRegDesignation(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ইমেইল (ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    placeholder="reporter@gmail.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    পূর্ব অভিজ্ঞতা / সংক্ষিপ্ত বিবরণ
                  </label>
                  <textarea
                    rows={2}
                    placeholder="সাংবাদিকতার অভিজ্ঞতা বা শিক্ষাগত যোগ্যতা..."
                    value={regBio}
                    onChange={(e) => setRegBio(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 resize-none font-serif-bangla"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>আবেদন জমা দিন</span>
                </button>
              </form>
            ) : (
              /* Journalist Login Form */
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    মোবাইল নম্বর / ইমেইল / প্রেস আইডি
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: 01712345001"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full text-sm font-semibold p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    গোপন পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="আপনার ব্যক্তিগত পাসওয়ার্ড"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-sm font-bold p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-mono tracking-wider"
                  />
                </div>

                {loginErrorMsg && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{loginErrorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>ডেস্কে প্রবেশ করুন</span>
                </button>
              </form>
            )}

            {/* Quick Demo Reporters (1-Click Test) */}
            {!isApplying && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                <span className="text-[11px] text-slate-400 font-bold block text-center uppercase tracking-wider">
                  ⚡ দ্রুত পরীক্ষার জন্য ডেমো সাংবাদিক অ্যাকাউন্ট
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {reporters.filter(r => r.status === 'active').slice(0, 4).map((rep) => (
                    <button
                      key={rep.id}
                      type="button"
                      onClick={() => handleQuickLogin(rep)}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 text-left transition flex items-center gap-2.5 group"
                    >
                      <img
                        src={rep.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                        alt={rep.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate font-serif-bangla group-hover:text-emerald-600">
                          {rep.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          {rep.designation} (পাস: {rep.password})
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Links */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={() => setCurrentView('admin')}
                className="hover:text-red-600 flex items-center gap-1 font-semibold"
              >
                <Lock className="w-3.5 h-3.5 text-red-600" />
                <span>প্রধান অ্যাডমিন প্যানেল</span>
              </button>
              <button
                onClick={() => setCurrentView('home')}
                className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
              >
                <Home className="w-3.5 h-3.5" />
                <span>হোমপেজে ফিরুন</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. WHEN LOGGED IN: JOURNALIST WORKSPACE
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Banner with Profile & Stats */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Profile Card */}
          <div className="flex items-center gap-4">
            <img
              src={currentReporter.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
              alt={currentReporter.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-md flex-shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold font-serif-bangla">
                  {currentReporter.name}
                </h1>
                <span className="bg-emerald-500/20 text-emerald-400 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {currentReporter.designation}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300 font-sans flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {currentReporter.upazila}
                </span>
                <span>•</span>
                <span className="font-mono text-emerald-300">
                  আইডি: {currentReporter.pressCardNumber}
                </span>
                <span>•</span>
                <span className="text-[11px] text-slate-400">
                  {currentReporter.canAutoPublish ? '🟢 অটো-পাবলিশ সক্রিয়' : '🟡 রিভিউ মডারেশন'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action & Logout */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => {
                setEditingArticleId(null);
                setNewsTitle('');
                setNewsSubtitle('');
                setNewsExcerpt('');
                setNewsContent('');
                setActiveTab('submit_news');
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>নতুন সংবাদ লিখুন</span>
            </button>
            <button
              onClick={logoutReporter}
              className="bg-slate-800 hover:bg-red-600 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl transition border border-slate-700 flex items-center gap-1.5"
              title="লগআউট করুন"
            >
              <LogOut className="w-4 h-4" />
              <span>লগআউট</span>
            </button>
          </div>

        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/50">
            <span className="text-[11px] text-slate-400 block">মোট সংবাদ</span>
            <span className="text-xl font-bold font-brand text-white mt-0.5 block">
              {toBengaliDigits(myArticles.length)} টি
            </span>
          </div>
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/50">
            <span className="text-[11px] text-emerald-400 block">অনুমোদিত ও লাইভ</span>
            <span className="text-xl font-bold font-brand text-emerald-400 mt-0.5 block">
              {toBengaliDigits(myPublishedCount)} টি
            </span>
          </div>
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/50">
            <span className="text-[11px] text-amber-400 block">অপেক্ষমাণ ড্রাফট</span>
            <span className="text-xl font-bold font-brand text-amber-400 mt-0.5 block">
              {toBengaliDigits(myPendingCount)} টি
            </span>
          </div>
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/50">
            <span className="text-[11px] text-blue-400 block">মোট পাঠক ভিউ</span>
            <span className="text-xl font-bold font-brand text-blue-400 mt-0.5 block">
              {toBengaliDigits(totalMyViews)} ভিউ
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 rounded-2xl shadow-sm overflow-x-auto">
        <button
          onClick={() => setActiveTab('submit_news')}
          className={`flex-1 min-w-[140px] py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'submit_news'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <PenSquare className="w-4 h-4" />
          <span>{editingArticleId ? 'সংবাদ এডিট' : 'নতুন সংবাদ পাঠান'}</span>
        </button>

        <button
          onClick={() => setActiveTab('my_news')}
          className={`flex-1 min-w-[140px] py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'my_news'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>আমার সংবাদসমূহ ({toBengaliDigits(myArticles.length)})</span>
        </button>

        <button
          onClick={() => setActiveTab('press_card')}
          className={`flex-1 min-w-[140px] py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'press_card'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>ডিজিটাল প্রেস কার্ড</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 min-w-[140px] py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>পাসওয়ার্ড ও প্রোফাইল</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      {submitSuccessMsg && (
        <div className="bg-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-serif-bangla">
              {submitSuccessMsg}
            </p>
          </div>
          <button
            onClick={() => setSubmitSuccessMsg('')}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TAB 1: SUBMIT NEWS EDITOR */}
      {activeTab === 'submit_news' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif-bangla text-slate-900 dark:text-white flex items-center gap-2">
                <PenSquare className="w-5 h-5 text-emerald-600" />
                <span>{editingArticleId ? 'সংবাদ সম্পাদনা (Edit News)' : 'নতুন সংবাদ লিখুন ও প্রকাশ করুন'}</span>
              </h2>
              <p className="text-xs text-slate-500 font-serif-bangla mt-0.5">
                প্রতিবেদক হিসেবে আপনার পাঠানো তথ্য ও ছবি সরাসরি প্রকাশিত হবে
              </p>
            </div>
            {editingArticleId && (
              <button
                onClick={() => {
                  setEditingArticleId(null);
                  setNewsTitle('');
                  setNewsSubtitle('');
                  setNewsExcerpt('');
                  setNewsContent('');
                }}
                className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-lg font-bold hover:bg-slate-200"
              >
                বাতিল করুন
              </button>
            )}
          </div>

          <form onSubmit={handleSubmitNews} className="space-y-5 text-xs">
            
            {/* Title */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5 text-sm">
                সংবাদের মূল শিরোনাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: শ্যামনগরে সুন্দরবনের সুরক্ষা ও বনায়ন প্রকল্পের উদ্বোধন"
                value={newsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
                className="w-full text-base font-bold p-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-serif-bangla"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                উপ-শিরোনাম (ঐচ্ছিক)
              </label>
              <input
                type="text"
                placeholder="যেমন: স্থানীয় প্রশাসন ও পরিবেশ কর্মীদের যৌথ উদ্যোগে বৃক্ষরোপণ কর্মসূচি"
                value={newsSubtitle}
                onChange={(e) => setNewsSubtitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-serif-bangla"
              />
            </div>

            {/* Category & Upazila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ক্যাটাগরি <span className="text-red-500">*</span>
                </label>
                <select
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value as NewsCategory)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600"
                >
                  {INITIAL_CATEGORIES.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  উপজেলা / অঞ্চল
                </label>
                <select
                  value={newsUpazila}
                  onChange={(e) => setNewsUpazila(e.target.value as SatkhiraUpazila)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600"
                >
                  {SATKHIRA_UPAZILAS.filter(u => u !== 'সকল').map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Featured Image & Caption */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ছবির লিঙ্ক (Image URL)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newsImage}
                  onChange={(e) => setNewsImage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ছবির ক্যাপশন
                </label>
                <input
                  type="text"
                  placeholder="যেমন: উদ্বোধনী অনুষ্ঠানে বৃক্ষরোপণ করেন অতিথিবৃন্দ — ছবি: সাতক্ষীরা টাইমস"
                  value={newsImageCaption}
                  onChange={(e) => setNewsImageCaption(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-serif-bangla"
                />
              </div>
            </div>

            {/* Content Body */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-sm">
                সংবাদের বিস্তারিত বিবরণ (News Body) <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={10}
                placeholder="এখানে বিস্তারিত সংবাদ লিখুন..."
                value={newsContent}
                onChange={(e) => setNewsContent(e.target.value)}
                className="w-full text-sm p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-serif-bangla leading-relaxed"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)
              </label>
              <input
                type="text"
                placeholder="সাতক্ষীরা, শ্যামনগর, সুন্দরবন, পরিবেশ"
                value={newsTags}
                onChange={(e) => setNewsTags(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-serif-bangla"
              />
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                প্রতিবেদক: <strong>{currentReporter.name}</strong> ({currentReporter.designation})
              </div>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition shadow-lg flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{editingArticleId ? 'আপডেট সংরক্ষণ করুন' : 'সংবাদ সাবমিট করুন'}</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* TAB 2: MY NEWS LIST */}
      {activeTab === 'my_news' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-bold font-serif-bangla text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>আমার পাঠানো সকল সংবাদ ({toBengaliDigits(myArticles.length)} টি)</span>
            </h2>
            <button
              onClick={() => setActiveTab('submit_news')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>নতুন সংবাদ</span>
            </button>
          </div>

          <div className="space-y-3">
            {myArticles.map((art) => (
              <div
                key={art.id}
                className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <img
                    src={art.featuredImage}
                    alt={art.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded">
                        {art.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        art.status === 'published'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                      }`}>
                        {art.status === 'published' ? '🟢 প্রকাশিত' : '🟡 পর্যালোচনায়'}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate font-serif-bangla">
                      {art.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span>{formatBengaliDate(art.publishedAt)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-bold">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        {toBengaliDigits(art.viewCount)} ভিউ
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center flex-shrink-0">
                  <button
                    onClick={() => {
                      const url = getArticleUrl(art);
                      navigator.clipboard.writeText(url);
                      setCopiedArticleId(art.id);
                      setTimeout(() => setCopiedArticleId(null), 2000);
                    }}
                    className={`border px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                      copiedArticleId === art.id
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-600 shadow-sm'
                    }`}
                    title="পোস্টের সরাসরি লিংক কপি করুন"
                  >
                    {copiedArticleId === art.id ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                    <span>{copiedArticleId === art.id ? 'কপি হয়েছে' : 'লিংক'}</span>
                  </button>

                  <button
                    onClick={() => handleEditExistingArticle(art)}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-600 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>এডিট</span>
                  </button>

                  <button
                    onClick={() => openArticle(art.id)}
                    className="bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>লাইভ দেখুন</span>
                  </button>
                </div>
              </div>
            ))}

            {myArticles.length === 0 && (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <FileText className="w-10 h-10 mx-auto opacity-40" />
                <p className="font-serif-bangla font-semibold">আপনি এখনো কোনো সংবাদ প্রকাশ করেননি।</p>
                <button
                  onClick={() => setActiveTab('submit_news')}
                  className="text-xs text-emerald-600 font-bold hover:underline"
                >
                  এখনই প্রথম সংবাদ লিখুন
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: DIGITAL PRESS CARD */}
      {activeTab === 'press_card' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm text-center space-y-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold font-serif-bangla text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <CreditCard className="w-6 h-6 text-emerald-600" />
              <span>ডিজিটাল প্রেস কার্ড (Press Accreditation)</span>
            </h2>
            <p className="text-xs text-slate-500 font-serif-bangla">
              দ্য সাতক্ষীরা টাইমস কর্তৃক অনুমোদিত অফিসিয়াল প্রতিনিধি পরিচয়পত্র
            </p>

            {/* Official Press Card Preview */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white p-6 rounded-3xl border-2 border-amber-500/40 shadow-2xl relative overflow-hidden text-left space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                <div>
                  <h3 className="text-sm font-black font-serif-bangla text-red-500 tracking-wider">
                    THE SATKHIRA TIMES
                  </h3>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-mono">
                    Official Press Accreditation Card
                  </span>
                </div>
                <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  PRESS
                </span>
              </div>

              {/* Card Body */}
              <div className="flex items-start gap-4">
                <img
                  src={currentReporter.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt={currentReporter.name}
                  className="w-20 h-24 rounded-xl object-cover border-2 border-amber-400 shadow flex-shrink-0"
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <h4 className="font-bold text-base text-white font-serif-bangla">
                    {currentReporter.name}
                  </h4>
                  <p className="text-xs text-amber-400 font-bold">
                    {currentReporter.designation}
                  </p>
                  <p className="text-[11px] text-slate-300">
                    এলাকা: <strong>{currentReporter.upazila}</strong>
                  </p>
                  <p className="text-[11px] font-mono text-slate-400">
                    আইডি: <span className="text-emerald-400 font-bold">{currentReporter.pressCardNumber}</span>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    মোবাইল: {currentReporter.phone}
                  </p>
                </div>
              </div>

              {/* Card Footer with QR & Seal */}
              <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-[10px] text-slate-400">
                <div>
                  <span className="block font-mono text-slate-300">VALID: 2026-2027</span>
                  <span className="text-[9px]">সম্পাদকের স্বাক্ষর অনুমোদিত</span>
                </div>
                <div className="flex items-center gap-2">
                  <QrCode className="w-7 h-7 text-white" />
                  <span className="text-[8px] uppercase font-mono leading-tight">
                    VERIFIED<br />JOURNALIST
                  </span>
                </div>
              </div>

            </div>

            <button
              onClick={() => window.print()}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow flex items-center gap-2 mx-auto"
            >
              <Printer className="w-4 h-4" />
              <span>প্রেস কার্ড প্রিন্ট বা ডাউনলোড করুন</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: PASSWORD & PROFILE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 max-w-xl mx-auto">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-lg font-bold font-serif-bangla text-slate-900 dark:text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-emerald-600" />
              <span>ব্যক্তিগত পাসওয়ার্ড ও প্রোফাইল নিরাপত্তা</span>
            </h2>
            <p className="text-xs text-slate-500 font-serif-bangla mt-0.5">
              আপনার রিপোর্টার অ্যাকাউন্টের গোপন পাসওয়ার্ড এখান থেকে পরিবর্তন করতে পারেন
            </p>
          </div>

          {pwSuccessMsg && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              {pwSuccessMsg}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                বর্তমান লগইন পাসওয়ার্ড
              </label>
              <input
                type="text"
                disabled
                value={currentReporter.password}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                নতুন পাসওয়ার্ড দিন <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                placeholder="নতুন পাসওয়ার্ড লিখুন"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-mono tracking-wider"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                নতুন পাসওয়ার্ড পুনরায় নিশ্চিত করুন <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                placeholder="হুবহু একই পাসওয়ার্ড লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-mono tracking-wider"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>পাসওয়ার্ড আপডেট করুন</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
