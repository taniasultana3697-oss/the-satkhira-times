import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  Smartphone, 
  Monitor, 
  Globe, 
  Calculator, 
  Settings, 
  Save, 
  Check, 
  Zap, 
  ArrowUpRight, 
  Sparkles, 
  Activity, 
  Flame, 
  Layers, 
  Share2, 
  Search, 
  Calendar,
  CreditCard,
  Percent
} from 'lucide-react';
import { toBengaliDigits, formatBengaliDate } from '../../utils/helpers';

export const AdminAnalyticsRevenue: React.FC = () => {
  const { 
    articles, 
    liveActiveVisitors, 
    revenueSettings, 
    updateRevenueSettings, 
    trafficHistory, 
    trafficSources, 
    locationTraffic,
    calculateIncome 
  } = useNews();

  // Custom Calculator state
  const [calcVisitors, setCalcVisitors] = useState<number>(5000);
  const [calcCpm, setCalcCpm] = useState<number>(revenueSettings.cpmRateUsd);
  const [selectedNetwork, setSelectedNetwork] = useState<'adsterra' | 'adsense' | 'all'>('all');

  // Rate Settings Modal/Section state
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [editCpm, setEditCpm] = useState<number>(revenueSettings.cpmRateUsd);
  const [editExchangeRate, setEditExchangeRate] = useState<number>(revenueSettings.usdToBdtRate);
  const [editDirectMonthly, setEditDirectMonthly] = useState<number>(revenueSettings.directAdMonthlyBdt);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Overall computations
  const totalAllArticlesViews = articles.reduce((acc, a) => acc + a.viewCount, 0);
  const totalLifetimeVisitors = Math.round(totalAllArticlesViews * 0.42);
  const totalLifetimeEarnings = calculateIncome(totalAllArticlesViews);

  const todayRecord = trafficHistory[0] || {
    visitors: Math.round(totalAllArticlesViews * 0.18 * 0.38),
    pageviews: Math.round(totalAllArticlesViews * 0.18),
    earningsBdt: 0,
    earningsUsd: 0
  };

  // Monthly estimate (approx 30 days projection based on active views)
  const monthlyProjectedViews = totalAllArticlesViews * 1.8;
  const monthlyProjectedEarnings = calculateIncome(monthlyProjectedViews);

  // Active readers per article (Dynamic distribution among top 5 articles)
  const topReadArticles = [...articles]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5)
    .map((art, idx) => {
      const activeReadersCount = Math.max(
        2, 
        Math.round((liveActiveVisitors * (0.35 - idx * 0.06)))
      );
      return {
        ...art,
        currentLiveReaders: activeReadersCount
      };
    });

  // Calculate milestone tiers for the table
  const milestoneTiers = [
    { visitors: 100, label: '১০০ পাঠক / ভিউ' },
    { visitors: 500, label: '৫০০ পাঠক / ভিউ' },
    { visitors: 1000, label: '১,০০০ পাঠক (১ CPM)' },
    { visitors: 2500, label: '২,৫০০ পাঠক / ভিউ' },
    { visitors: 5000, label: '৫,০০০ পাঠক / ভিউ' },
    { visitors: 10000, label: '১০,০০০ পাঠক / ভিউ' },
    { visitors: 25000, label: '২৫,০০০ পাঠক / ভিউ' },
    { visitors: 50000, label: '৫০,০০০ পাঠক / ভিউ' },
    { visitors: 100000, label: '১,০০,০০০ (১ লাখ) ভিউ' },
    { visitors: 500000, label: '৫,০০,০০০ (৫ লাখ) ভিউ' },
    { visitors: 1000000, label: '১০,০০,০০০ (১ মিলিয়ন) ভিউ' },
  ];

  // Custom calculator result
  const calculatedResult = {
    dailyUsd: (calcVisitors / 1000) * calcCpm,
    dailyBdt: ((calcVisitors / 1000) * calcCpm) * revenueSettings.usdToBdtRate,
    monthlyUsd: ((calcVisitors / 1000) * calcCpm) * 30,
    monthlyBdt: (((calcVisitors / 1000) * calcCpm) * 30) * revenueSettings.usdToBdtRate,
    yearlyBdt: (((calcVisitors / 1000) * calcCpm) * 365) * revenueSettings.usdToBdtRate,
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateRevenueSettings({
      cpmRateUsd: Number(editCpm) || 1.25,
      usdToBdtRate: Number(editExchangeRate) || 122.50,
      directAdMonthlyBdt: Number(editDirectMonthly) || 0
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditingSettings(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-600 text-white font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              লাইভ ট্রাফিক ও রেভিনিউ ইঞ্জিন
            </span>
            <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">
              ১ USD = ৳{revenueSettings.usdToBdtRate}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-bangla mt-1">
            রিয়েল-টাইম ভিজিটর ও আয় অ্যানালিটিক্স
          </h2>
          <p className="text-xs text-slate-300">
            ওয়েবসাইটের লাইভ পাঠক সংখ্যা, দৈনিক-মাসিক ট্রাফিক এবং প্রতি ভিজিটরে আনুমানিক ইনকাম হিসাব
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditingSettings(!isEditingSettings)}
            className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
          >
            <Settings className="w-4 h-4" />
            <span>{isEditingSettings ? 'সেটিংস বন্ধ করুন' : 'CPM ও ইনকাম রেট পরিবর্তন'}</span>
          </button>
        </div>
      </div>

      {/* Real-time Online Visitors Pulse Header */}
      <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500/40 dark:border-emerald-500/30 rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                <Users className="w-7 h-7" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  রিয়েল-টাইম অনলাইন পাঠক
                </span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-mono">
                  প্রতি ৫ সেকেন্ডে আপডেট
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-brand">
                  {toBengaliDigits(liveActiveVisitors)}
                </span>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                  জন এই মুহূর্তে সরাসরি সংবাদ পড়ছেন
                </span>
              </div>
            </div>
          </div>

          {/* Device Split Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-3.5 py-2 rounded-xl text-xs">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-slate-500 block text-[10px]">মোবাইল ফোন</span>
                <span className="font-bold text-slate-900 dark:text-white">৮২% (স্মার্টফোন)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-3.5 py-2 rounded-xl text-xs">
              <Monitor className="w-4 h-4 text-blue-600" />
              <div>
                <span className="text-slate-500 block text-[10px]">কম্পিউটার/ল্যাপটপ</span>
                <span className="font-bold text-slate-900 dark:text-white">১৬% (ডেস্কটপ)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-3.5 py-2 rounded-xl text-xs">
              <Globe className="w-4 h-4 text-purple-600" />
              <div>
                <span className="text-slate-500 block text-[10px]">ট্যাবলেট ও অন্যান্য</span>
                <span className="font-bold text-slate-900 dark:text-white">২% (ট্যাব)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editable Settings Drawer if toggled */}
      {isEditingSettings && (
        <form 
          onSubmit={handleSaveSettings}
          className="bg-slate-900 text-white p-5 rounded-2xl border border-emerald-500/40 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Settings className="w-4 h-4" />
              <span>মনিটাইজেশন ও CPM রেট কনফিগারেশন</span>
            </div>
            <span className="text-xs text-slate-400">
              আপনার Adsterra বা Google AdSense এর বর্তমান গড় CPM রেট বসান
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                প্রতি ১,০০০ ভিউয়ে গড় eCPM ($ USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  step="0.05"
                  min="0.10"
                  max="50"
                  value={editCpm}
                  onChange={(e) => setEditCpm(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-7 pr-3 text-white font-bold outline-none focus:border-emerald-500"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Adsterra গড় CPM $১.০০ - $২.৫০</p>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ১ ডলার ($ USD) = বাংলাদেশি টাকা (BDT ৳)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">৳</span>
                <input
                  type="number"
                  step="0.50"
                  min="50"
                  value={editExchangeRate}
                  onChange={(e) => setEditExchangeRate(parseFloat(e.target.value) || 120)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-7 pr-3 text-white font-bold outline-none focus:border-emerald-500"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">বর্তমান ব্যাংকিং/রেমিট্যান্স রেট</p>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                মাসিক লোকাল স্পন্সর/ব্যানার চুক্তি (৳ BDT)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">৳</span>
                <input
                  type="number"
                  step="500"
                  min="0"
                  value={editDirectMonthly}
                  onChange={(e) => setEditDirectMonthly(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-7 pr-3 text-white font-bold outline-none focus:border-emerald-500"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">সাতক্ষীরার স্থানীয় বিজ্ঞাপনী আয়</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditingSettings(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              {saveSuccess ? <Check className="w-4 h-4 text-green-950" /> : <Save className="w-4 h-4" />}
              <span>{saveSuccess ? 'সংরক্ষিত হয়েছে!' : 'সেটিংস সংরক্ষণ করুন'}</span>
            </button>
          </div>
        </form>
      )}

      {/* 4 Major KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Today Visitors */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">আজকের ইউনিক পাঠক</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-brand mt-1">
              {toBengaliDigits(todayRecord.visitors)}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3 h-3" /> পেজভিউ: {toBengaliDigits(todayRecord.pageviews)} টি
            </span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Today's Estimated Earnings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">আজকের আনুমানিক ইনকাম</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-brand mt-1">
              ৳{toBengaliDigits(todayRecord.earningsBdt.toFixed(1))}
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">
              ≈ ${todayRecord.earningsUsd.toFixed(2)} USD
            </span>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Monthly Projected Earnings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">চলতি মাসের আনুমানিক আয়</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-brand mt-1">
              ৳{toBengaliDigits(Math.round(monthlyProjectedEarnings.bdt))}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3 h-3" /> ট্রাফিক গ্রোথ বাড়ছে
            </span>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950 text-purple-600 rounded-xl">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Current eCPM Rate */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">গড় eCPM রেট (প্রতি ১০০০ ভিউ)</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-brand mt-1">
              ৳{toBengaliDigits(Math.round(revenueSettings.cpmRateUsd * revenueSettings.usdToBdtRate))}
            </div>
            <span className="text-[10px] text-blue-600 font-bold block mt-1">
              $ {revenueSettings.cpmRateUsd.toFixed(2)} USD / ১০০০ ভিউ
            </span>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950 text-amber-600 rounded-xl">
            <Zap className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Split: Milestone Earnings Table + Live Custom Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: "কত ভিজিটরে কত ইনকাম" Matrix Table */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 font-serif-bangla">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                কত ভিজিটরে কত ইনকাম (Visitor to Earnings Matrix)
              </h3>
              <p className="text-xs text-slate-500">
                বর্তমান eCPM রেট (${revenueSettings.cpmRateUsd} / ১,০০০ ভিউ) অনুযায়ী নির্ধারিত আয়
              </p>
            </div>
            <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
              সক্রিয় রেট: ১K = ৳{Math.round(revenueSettings.cpmRateUsd * revenueSettings.usdToBdtRate)}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2.5 px-3">পাঠক / পেজভিউ সংখ্যা</th>
                  <th className="py-2.5 px-3">দৈনিক আয় (টাকায় ৳)</th>
                  <th className="py-2.5 px-3">ডলারে ($ USD)</th>
                  <th className="py-2.5 px-3">মাসিক সম্ভাব্য আয়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {milestoneTiers.map((tier) => {
                  const { usd, bdt } = calculateIncome(tier.visitors);
                  const monthlyBdt = bdt * 30;
                  const isHighlight = tier.visitors === 1000 || tier.visitors === 10000 || tier.visitors === 100000;

                  return (
                    <tr 
                      key={tier.visitors}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition ${
                        isHighlight ? 'bg-emerald-50/50 dark:bg-emerald-950/20 font-bold' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${tier.visitors >= 50000 ? 'bg-purple-500' : tier.visitors >= 5000 ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        <span className="text-slate-900 dark:text-white">{tier.label}</span>
                      </td>
                      <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">
                        ৳{toBengaliDigits(bdt.toFixed(2))}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400 font-mono">
                        ${usd.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 text-slate-900 dark:text-slate-200 font-bold">
                        ৳{toBengaliDigits(Math.round(monthlyBdt).toLocaleString())}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
            <p className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              টিপস: আয় কীভাবে দ্বিগুণ করবেন?
            </p>
            <p>
              সংবাদের ভেতরে ইন-আর্টিকেল ব্যানার ও সোশ্যাল বার চালু রাখলে পেজভিউ প্রতি ক্লিক ও ইম্প্রেশন বাড়ে, ফলে CPM $২.৫০+ পর্যন্ত বৃদ্ধি পায়।
            </p>
          </div>
        </div>

        {/* Right 5 Cols: Interactive Custom Calculator Tool */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 rounded-2xl p-5 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-serif-bangla">
                <Calculator className="w-5 h-5" />
                <span>লাইভ ইনকাম ক্যালকুলেটর</span>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                কাস্টম এস্টিমেটর
              </span>
            </div>

            {/* Input Slider for Visitors */}
            <div className="space-y-4 mt-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label className="text-slate-300 font-semibold">
                    সম্ভাব্য পাঠক / পেজভিউ সংখ্যা:
                  </label>
                  <span className="text-emerald-400 font-black font-brand text-base">
                    {toBengaliDigits(calcVisitors.toLocaleString())} ভিউ
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={calcVisitors}
                  onChange={(e) => setCalcVisitors(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>৫০০</span>
                  <span>২৫,০০০</span>
                  <span>৫০,০০০</span>
                  <span>১,০০,০০০</span>
                </div>
              </div>

              {/* Number Input if specific */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-[11px] text-slate-400 block mb-1">সরাসরি ভিউ সংখ্যা লিখুন:</label>
                  <input
                    type="number"
                    value={calcVisitors}
                    onChange={(e) => setCalcVisitors(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[11px] text-slate-400 block mb-1">eCPM রেট ($):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={calcCpm}
                    onChange={(e) => setCalcCpm(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Calculated Result Displays */}
              <div className="space-y-2.5 pt-2">
                
                <div className="bg-slate-850 border border-slate-750 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-300">দৈনিক সম্ভাব্য আয়:</span>
                  <div className="text-right">
                    <span className="text-base font-black text-emerald-400 font-brand">
                      ৳{toBengaliDigits(Math.round(calculatedResult.dailyBdt))}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      ≈ ${calculatedResult.dailyUsd.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                <div className="bg-slate-850 border border-emerald-500/30 p-3.5 rounded-xl flex items-center justify-between bg-emerald-950/20">
                  <span className="text-xs text-emerald-300 font-bold">মাসিক সম্ভাব্য মোট আয় (৩০ দিন):</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-emerald-400 font-brand">
                      ৳{toBengaliDigits(Math.round(calculatedResult.monthlyBdt).toLocaleString())}
                    </span>
                    <span className="text-[10px] text-emerald-400/80 block font-mono">
                      ≈ ${calculatedResult.monthlyUsd.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                <div className="bg-slate-850 border border-slate-750 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-300">বাৎসরিক আনুমানিক আয়:</span>
                  <div className="text-right">
                    <span className="text-base font-black text-purple-400 font-brand">
                      ৳{toBengaliDigits(Math.round(calculatedResult.yearlyBdt).toLocaleString())}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 text-center">
            * হিসাবটি বর্তমান eCPM এবং ডলারের মান (৳{revenueSettings.usdToBdtRate}) অনুযায়ী স্বয়ংক্রিয়ভাবে পরিগণিত।
          </div>
        </div>

      </div>

      {/* Real-time Currently Active Articles & 7-Day Traffic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Cols: Currently Being Read (Real-time live news readers) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 font-serif-bangla">
              <Flame className="w-5 h-5 text-red-600" />
              এই মুহূর্তে পাঠকরা কোন সংবাদ পড়ছেন
            </h3>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              লাইভ রিডিং
            </span>
          </div>

          <div className="space-y-3">
            {topReadArticles.map((art, idx) => (
              <div 
                key={art.id}
                className="flex items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {toBengaliDigits(idx + 1)}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate font-serif-bangla">
                      {art.title}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      {art.category} • মোট ভিউ: {toBengaliDigits(art.viewCount)}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{toBengaliDigits(art.currentLiveReaders)} জন</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6 Cols: 7-Day Traffic & Income History Table */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 font-serif-bangla">
              <Calendar className="w-5 h-5 text-blue-600" />
              গত ৭ দিনের ট্রাফিক ও দৈনিক আয় হিস্ট্রি
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              ৭ Days Trend
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2 px-3">দিন / তারিখ</th>
                  <th className="py-2 px-3">ইউনিক পাঠক</th>
                  <th className="py-2 px-3">পেজভিউ</th>
                  <th className="py-2 px-3">দৈনিক আয় (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {trafficHistory.map((day, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white">
                      {day.dayName}
                    </td>
                    <td className="py-2 px-3 text-slate-600 dark:text-slate-300">
                      {toBengaliDigits(day.visitors)} জন
                    </td>
                    <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">
                      {toBengaliDigits(day.pageviews)}
                    </td>
                    <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400 font-bold">
                      ৳{toBengaliDigits(day.earningsBdt.toFixed(1))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Traffic Sources & Geographic Readers Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Traffic Sources */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 font-serif-bangla">
              <Share2 className="w-5 h-5 text-blue-600" />
              পাঠক কোথা থেকে আসছেন (Traffic Source Breakdown)
            </h3>
          </div>

          <div className="space-y-3">
            {trafficSources.map((source) => (
              <div key={source.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{source.name}</span>
                  <span className="text-slate-900 dark:text-white font-bold">{toBengaliDigits(source.percentage)}% ({toBengaliDigits(source.count)} ভিউ)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${source.percentage}%`, backgroundColor: source.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Traffic */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 font-serif-bangla">
              <Globe className="w-5 h-5 text-emerald-600" />
              ভৌগোলিক পাঠক পরিসংখ্যান (Regional Demographics)
            </h3>
          </div>

          <div className="space-y-2.5">
            {locationTraffic.map((loc) => (
              <div key={loc.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {loc.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold px-2 py-0.5 rounded text-[11px]">
                    {toBengaliDigits(loc.percentage)}%
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    ({toBengaliDigits(loc.count)} পাঠক)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
