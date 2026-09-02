import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminNewsList } from './AdminNewsList';
import { AdminNewsEditor } from './AdminNewsEditor';
import { AdminBreakingNews } from './AdminBreakingNews';
import { AdminAdsManager } from './AdminAdsManager';
import { AdminMediaLibrary } from './AdminMediaLibrary';
import { AdminSettings } from './AdminSettings';
import { AdminSupabaseAndDeploy } from './AdminSupabaseAndDeploy';
import { AdminAnalyticsRevenue } from './AdminAnalyticsRevenue';
import { AdminReporterManager } from './AdminReporterManager';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Flame, 
  Megaphone, 
  Image as ImageIcon, 
  Settings, 
  Database, 
  LogOut, 
  ExternalLink, 
  Lock, 
  KeyRound, 
  ShieldAlert,
  Newspaper,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Users,
  PenSquare
} from 'lucide-react';

type AdminTab = 
  | 'dashboard' 
  | 'analytics'
  | 'reporters'
  | 'news_list' 
  | 'news_editor' 
  | 'breaking' 
  | 'ads' 
  | 'media' 
  | 'settings' 
  | 'supabase';

export const AdminLayout: React.FC = () => {
  const { setCurrentView, reporters } = useNews();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  const pendingReportersCount = reporters.filter(r => r.status === 'pending').length;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master password / pin
    if (adminPin === 'admin' || adminPin === '1234' || adminPin === 'satkhira') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleEditArticle = (id: string) => {
    setEditingArticleId(id);
    setActiveTab('news_editor');
  };

  const handleAddNewNews = () => {
    setEditingArticleId(null);
    setActiveTab('news_editor');
  };

  // If not authenticated, show modern newspaper admin login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center space-y-6">
          
          <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-bold font-serif-bangla text-slate-900 dark:text-white">
              অ্যাডমিন কন্ট্রোল প্যানেল
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              THE SATKHIRA TIMES — সেন্ট্রাল নিউজ ম্যানেজমেন্ট সিস্টেম
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="অ্যাডমিন পিন / পাসওয়ার্ড লিখুন"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className="w-full text-center tracking-widest text-base font-bold p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-600 font-bold">
                ভুল পাসওয়ার্ড! (ডিফল্ট পাসওয়ার্ড: <span className="underline">admin</span> অথবা <span className="underline">1234</span>)
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>লগইন করুন</span>
            </button>
          </form>

          {/* Link to Dedicated Reporter Panel */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 text-center space-y-2">
            <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-serif-bangla font-semibold block">
              আপনি কি দ্য সাতক্ষীরা টাইমসের একজন সাংবাদিক/প্রতিনিধি?
            </span>
            <button
              type="button"
              onClick={() => setCurrentView('reporter')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow flex items-center justify-center gap-1.5"
            >
              <PenSquare className="w-4 h-4" />
              <span>সাংবাদিক ও প্রতিনিধি ডেস্কে যান 👉</span>
            </button>
          </div>

          {/* Quick Demo Access */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={() => { setAdminPin('1234'); setIsAuthenticated(true); }}
              className="text-red-600 font-semibold hover:underline"
            >
              ⚡ ডেমো ১-ক্লিক অ্যাডমিন লগইন
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              হোমপেজে ফিরুন
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-6 px-4">
      
      {/* Top Admin Header */}
      <div className="bg-slate-950 text-white p-4 sm:p-5 rounded-2xl mb-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center shadow">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-brand font-black text-lg sm:text-xl uppercase tracking-wider text-white">
              THE <span className="text-red-600">SATKHIRA</span> TIMES <span className="text-xs bg-slate-800 text-slate-300 font-sans px-2 py-0.5 rounded font-normal ml-2">ADMIN PRO</span>
            </h1>
            <p className="text-[11px] text-slate-400">সুপার অ্যাডমিনিস্ট্রেটর পোর্টাল</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <button
            onClick={() => setCurrentView('home')}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>লাইভ ওয়েবসাইট দেখুন</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold px-3 py-2 rounded-lg transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {/* Main Admin Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Navigation Sidebar */}
        <aside className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-sm space-y-1">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition ${
                activeTab === 'dashboard'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>ড্যাশবোর্ড ওভারভিউ</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition relative ${
                activeTab === 'analytics'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>লাইভ ভিজিটর ও ইনকাম</span>
              </div>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reporters')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition ${
                activeTab === 'reporters'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-amber-500" />
                <span>সাংবাদিক ও প্রতিনিধি</span>
              </div>
              {pendingReportersCount > 0 ? (
                <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.2 rounded-full">
                  {pendingReportersCount}
                </span>
              ) : (
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('news_list')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition ${
                activeTab === 'news_list'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" />
                <span>সকল সংবাদ তালিকা</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={handleAddNewNews}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition ${
                activeTab === 'news_editor'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-4 h-4" />
                <span>নতুন সংবাদ প্রকাশ</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('breaking')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition ${
                activeTab === 'breaking'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4" />
                <span>ব্রেকিং নিউজ টিকার</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('ads')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition ${
                activeTab === 'ads'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Megaphone className="w-4 h-4" />
                <span>বিজ্ঞাপন ও Adsterra</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition ${
                activeTab === 'media'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4" />
                <span>মিডিয়া লাইব্রেরি</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition ${
                activeTab === 'settings'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>সাইট ও এসইও সেটিংস</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('supabase')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition ${
                activeTab === 'supabase'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4" />
                <span>Supabase ও Netlify</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

          </div>
        </aside>

        {/* Right Active Content Area */}
        <main className="lg:col-span-9">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              onAddNewNews={handleAddNewNews}
              onManageBreaking={() => setActiveTab('breaking')}
              onManageAds={() => setActiveTab('ads')}
              onViewNewsList={() => setActiveTab('news_list')}
              onViewAnalytics={() => setActiveTab('analytics')}
              onManageReporters={() => setActiveTab('reporters')}
            />
          )}

          {activeTab === 'analytics' && <AdminAnalyticsRevenue />}

          {activeTab === 'reporters' && <AdminReporterManager />}

          {activeTab === 'news_list' && (
            <AdminNewsList
              onAddNew={handleAddNewNews}
              onEdit={handleEditArticle}
            />
          )}

          {activeTab === 'news_editor' && (
            <AdminNewsEditor
              editArticleId={editingArticleId}
              onClose={() => setActiveTab('news_list')}
              onSaved={() => setActiveTab('news_list')}
            />
          )}

          {activeTab === 'breaking' && <AdminBreakingNews />}

          {activeTab === 'ads' && <AdminAdsManager />}

          {activeTab === 'media' && <AdminMediaLibrary />}

          {activeTab === 'settings' && <AdminSettings />}

          {activeTab === 'supabase' && <AdminSupabaseAndDeploy />}
        </main>

      </div>

    </div>
  );
};
