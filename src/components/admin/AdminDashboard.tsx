import React from 'react';
import { useNews } from '../../context/NewsContext';
import { 
  Newspaper, 
  Eye, 
  Flame, 
  MessageSquare, 
  TrendingUp, 
  MapPin, 
  Plus, 
  Megaphone,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { toBengaliDigits, formatBengaliDate } from '../../utils/helpers';
import { SATKHIRA_UPAZILAS, INITIAL_CATEGORIES } from '../../data/initialData';

interface AdminDashboardProps {
  onAddNewNews: () => void;
  onManageBreaking: () => void;
  onManageAds: () => void;
  onViewNewsList: () => void;
  onViewAnalytics?: () => void;
  onManageReporters?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onAddNewNews,
  onManageBreaking,
  onManageAds,
  onViewNewsList,
  onViewAnalytics,
  onManageReporters
}) => {
  const { 
    articles, 
    breakingNews, 
    comments, 
    adConfigs, 
    reporters,
    liveActiveVisitors, 
    trafficHistory, 
    revenueSettings, 
    calculateIncome 
  } = useNews();

  // Computations
  const totalArticles = articles.length;
  const totalViews = articles.reduce((acc, a) => acc + a.viewCount, 0);
  const activeBreakingCount = breakingNews.filter(b => b.isActive).length;
  const activeAdsCount = adConfigs.filter(a => a.enabled).length;
  const pendingReportersCount = reporters.filter(r => r.status === 'pending').length;

  const todayRecord = trafficHistory[0] || {
    visitors: Math.round(totalViews * 0.18 * 0.38),
    pageviews: Math.round(totalViews * 0.18),
    earningsBdt: 0,
    earningsUsd: 0
  };

  const totalEstimatedIncome = calculateIncome(totalViews);

  // Category counts
  const catDistribution = INITIAL_CATEGORIES.map(cat => ({
    name: cat.name,
    count: articles.filter(a => a.category === cat.name).length
  })).sort((a, b) => b.count - a.count);

  // Upazila counts
  const upazilaDistribution = SATKHIRA_UPAZILAS.filter(u => u !== 'সকল').map(up => ({
    name: up,
    count: articles.filter(a => a.upazila === up).length
  })).sort((a, b) => b.count - a.count);

  // Top 5 most viewed
  const topViewed = [...articles].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-red-950 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
        <div>
          <span className="text-xs bg-red-600 text-white font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            সুপার অ্যাডমিন ড্যাশবোর্ড
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-bangla mt-2">
            দ্য সাতক্ষীরা টাইমস নিউজ ম্যানেজমেন্ট
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            সত্য ও বস্তুনিষ্ঠ সাংবাদিকতা ব্যবস্থাপনার পূর্ণাঙ্গ কন্ট্রোল প্যানেল
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onViewAnalytics && (
            <button
              onClick={onViewAnalytics}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs px-3.5 py-2.5 rounded-lg transition shadow flex items-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4" />
              <span>ভিজিটর ও আয় অ্যানালিটিক্স</span>
            </button>
          )}
          <button
            onClick={onAddNewNews}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition shadow flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন সংবাদ তৈরি</span>
          </button>
          <button
            onClick={onManageBreaking}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-2.5 rounded-lg transition flex items-center gap-1.5"
          >
            <Flame className="w-4 h-4" />
            <span>ব্রেকিং কন্ট্রোল</span>
          </button>
        </div>
      </div>

      {/* Real-time Visitor & Revenue Quick Feature Card */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border-2 border-emerald-500/40 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/30">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  🟢 লাইভ ট্রাফিক মিটার
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                  eCPM: ${revenueSettings.cpmRateUsd.toFixed(2)}
                </span>
              </div>
              <p className="text-slate-200 font-bold text-sm sm:text-base font-serif-bangla mt-0.5">
                বর্তমানে <span className="text-emerald-400 font-brand text-lg">{toBengaliDigits(liveActiveVisitors)} জন</span> পাঠক সাইটে সরাসরি সংবাদ পড়ছেন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <div className="bg-slate-800/80 border border-slate-700/60 px-3.5 py-1.5 rounded-xl">
              <span className="text-[10px] text-slate-400 block">আজকের আয়</span>
              <span className="text-xs font-bold text-emerald-400 font-brand">৳{toBengaliDigits(todayRecord.earningsBdt.toFixed(1))} (${todayRecord.earningsUsd.toFixed(2)})</span>
            </div>
            {onViewAnalytics && (
              <button
                onClick={onViewAnalytics}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5 flex-shrink-0"
              >
                <span>কত ভিজিটরে কত ইনকাম দেখুন</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total News */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">মোট প্রকাশিত সংবাদ</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-brand mt-1">
              {toBengaliDigits(totalArticles)}
            </div>
            <span className="text-[10px] text-green-600 font-bold flex items-center gap-0.5 mt-1">
              <CheckCircle className="w-3 h-3" /> সক্রিয় ও দৃশ্যমান
            </span>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-950 text-red-600 rounded-xl">
            <Newspaper className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Total Page Views */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">মোট পাঠক ভিউ (Views)</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-brand mt-1">
              {toBengaliDigits(totalViews)}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3 h-3" /> লাইভ ট্র্যাকিং সক্রিয়
            </span>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-xl">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Estimated Total Income */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">মোট আনুমানিক আয়</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-brand mt-1">
              ৳{toBengaliDigits(Math.round(totalEstimatedIncome.bdt))}
            </div>
            <span className="text-[10px] text-slate-500 font-mono block mt-1">
              ≈ ${totalEstimatedIncome.usd.toFixed(2)} USD
            </span>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Active Ads */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">সক্রিয় বিজ্ঞাপন স্লট</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-brand mt-1">
              {toBengaliDigits(activeAdsCount)}/৬
            </div>
            <span className="text-[10px] text-blue-600 font-bold flex items-center gap-0.5 mt-1">
              <Megaphone className="w-3 h-3" /> Adsterra মনিটাইজেশন
            </span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-xl">
            <Megaphone className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top 5 Most Viewed Articles */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 font-serif-bangla">
              <TrendingUp className="w-5 h-5 text-red-600" />
              সর্বাধিক পঠিত সংবাদ (Top Performing Articles)
            </h3>
            <button
              onClick={onViewNewsList}
              className="text-xs text-red-600 font-bold hover:underline"
            >
              সবগুলো দেখুন
            </button>
          </div>

          <div className="space-y-3">
            {topViewed.map((art, index) => (
              <div
                key={art.id}
                className="flex items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {toBengaliDigits(index + 1)}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate font-serif-bangla">
                      {art.title}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      {art.category} • {formatBengaliDate(art.publishedAt).split(',')[0]}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1 justify-end">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    {toBengaliDigits(art.viewCount)} ভিউ
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upazila & Regional Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 font-serif-bangla">
              <MapPin className="w-5 h-5 text-red-600" />
              উপজেলা অনুযায়ী সংবাদ কভারেজ
            </h3>
          </div>

          <div className="space-y-2.5">
            {upazilaDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {item.name}
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold px-2 py-0.5 rounded text-[11px]">
                  {toBengaliDigits(item.count)} টি
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
