import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { 
  Database, 
  Cloud, 
  Download, 
  Upload, 
  Copy, 
  Check, 
  Terminal, 
  FileCode, 
  ShieldCheck,
  Server,
  Eye,
  EyeOff
} from 'lucide-react';

export const AdminSupabaseAndDeploy: React.FC = () => {
  const { articles, adConfigs, settings, resetToDefault } = useNews();
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedNetlify, setCopiedNetlify] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [showAnonKey, setShowAnonKey] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState((import.meta as any).env?.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState((import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
  const [saveDbNotice, setSaveDbNotice] = useState(false);

  // Supabase SQL DDL
  const supabaseSqlSchema = `-- ==========================================
-- THE SATKHIRA TIMES: SUPABASE DATABASE SCHEMA
-- ==========================================

-- 1. Create Articles Table
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  upazila TEXT,
  featured_image TEXT NOT NULL,
  image_caption TEXT,
  author_name TEXT NOT NULL,
  author_role TEXT DEFAULT 'প্রতিবেদক',
  author_location TEXT DEFAULT 'সাতক্ষীরা',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  view_count INT DEFAULT 0,
  is_breaking BOOLEAN DEFAULT FALSE,
  is_top_headline BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published',
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Breaking News Table
CREATE TABLE IF NOT EXISTS public.breaking_news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  article_id UUID REFERENCES public.articles(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Ad Configurations Table
CREATE TABLE IF NOT EXISTS public.ad_configurations (
  id TEXT PRIMARY KEY,
  slot TEXT NOT NULL,
  name TEXT NOT NULL,
  code_snippet TEXT NOT NULL,
  banner_type TEXT DEFAULT 'image',
  banner_image_url TEXT,
  target_url TEXT,
  enabled BOOLEAN DEFAULT TRUE,
  note TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS) & Public Read Access
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Admin Insert Articles" ON public.articles FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.breaking_news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Breaking" ON public.breaking_news FOR SELECT USING (true);

ALTER TABLE public.ad_configurations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Ads" ON public.ad_configurations FOR SELECT USING (true);
`;

  // Netlify Configuration
  const netlifyToml = `# Netlify Deployment Configuration for THE SATKHIRA TIMES
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer-when-downgrade"
`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(supabaseSqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleCopyNetlify = () => {
    navigator.clipboard.writeText(netlifyToml);
    setCopiedNetlify(true);
    setTimeout(() => setCopiedNetlify(false), 2500);
  };

  const handleDownloadNetlifyConfig = () => {
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(netlifyToml);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "netlify.toml");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      siteName: 'THE SATKHIRA TIMES',
      settings,
      adConfigs,
      articles
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `satkhira-times-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Supabase Integration Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif-bangla">
                Supabase ডাটাবেস ইন্টিগ্রেশন
              </h2>
              <p className="text-xs text-slate-500">
                PostgreSQL ডাটাবেস স্কিমা, RLS পলিসি ও লাইভ ক্লাউড ডাটাবেস কানেকশন
              </p>
            </div>
          </div>

          <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1 rounded-full font-bold">
            PostgreSQL Ready
          </span>
        </div>

        {/* Supabase Credentials Input */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Supabase Project URL (<code className="font-mono text-emerald-600">VITE_SUPABASE_URL</code>)
            </label>
            <input
              type="text"
              placeholder="https://your-project.supabase.co"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              className="w-full p-2.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Supabase Anon Key (<code className="font-mono text-emerald-600">VITE_SUPABASE_ANON_KEY</code>)
              </label>
              <button
                type="button"
                onClick={() => setShowAnonKey(!showAnonKey)}
                className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                {showAnonKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showAnonKey ? 'হাইড করুন' : 'দেখান (Show Key)'}</span>
              </button>
            </div>
            <div className="relative">
              <input
                type={showAnonKey ? 'text' : 'password'}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={supabaseAnonKey}
                onChange={(e) => setSupabaseAnonKey(e.target.value)}
                className="w-full p-2.5 pr-20 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(supabaseAnonKey);
                  setCopiedKey(true);
                  setTimeout(() => setCopiedKey(false), 2000);
                }}
                className="absolute right-2 top-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1"
              >
                {copiedKey ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey ? 'কপি!' : 'কপি'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Where to find VITE_SUPABASE_ANON_KEY banner */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl p-3.5 text-xs text-emerald-900 dark:text-emerald-200 space-y-1.5 leading-relaxed">
          <p className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>কোথা থেকে <code className="font-mono bg-white dark:bg-zinc-900 px-1 py-0.5 rounded text-emerald-700 dark:text-emerald-300">VITE_SUPABASE_ANON_KEY</code> পাবেন?</span>
          </p>
          <ol className="list-decimal list-inside space-y-1 pl-1 text-[11px] text-emerald-800 dark:text-emerald-300">
            <li>আপনার <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline font-bold text-emerald-700 dark:text-emerald-200">Supabase ড্যাশবোর্ডে</a> যান এবং আপনার প্রজেক্ট সিলেক্ট করুন।</li>
            <li>বাম পাশের মেনু থেকে <strong>Project Settings (সেটিংস আইকন)</strong> &rarr; <strong>API</strong> ট্যাবে ক্লিক করুন।</li>
            <li>সেখানে <strong>Project URL</strong> এবং <strong>Project API Keys</strong> সেকশনের নিচে <code className="font-mono bg-white dark:bg-zinc-900 px-1 py-0.5 rounded text-red-600 font-bold">anon public</code> কি-টি দেখতে পাবেন।</li>
            <li>Netlify-তে ডেপলয় করার সময় Netlify ড্যাশবোর্ডের <strong>Site configuration &rarr; Environment variables</strong>-এ <code className="font-mono bg-white dark:bg-zinc-900 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> এবং <code className="font-mono bg-white dark:bg-zinc-900 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> হিসেবে এটি পেস্ট করুন।</li>
          </ol>
        </div>

        {/* Supabase SQL DDL Schema Code Box */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-600" />
              Supabase SQL Editor কোড (কপি করে আপনার Supabase ড্যাশবোর্ডে রান করুন)
            </span>
            <button
              onClick={handleCopySql}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded flex items-center gap-1 transition"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'কপি হয়েছে!' : 'SQL কপি করুন'}</span>
            </button>
          </div>

          <div className="bg-slate-950 text-emerald-400 p-3.5 rounded-xl text-xs font-mono overflow-x-auto max-h-48">
            <pre>{supabaseSqlSchema}</pre>
          </div>
        </div>
      </div>

      {/* 2. Netlify Deployment Guide & Config */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-100 dark:bg-sky-950 text-sky-600 rounded-xl">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif-bangla">
                Netlify ডিপ্লয়মেন্ট গাইড ও কনফিগ
              </h2>
              <p className="text-xs text-slate-500">
                সরাসরি Netlify-তে ড্র্যাগ-অ্যান্ড-ড্রপ অথবা গিটহাবের মাধ্যমে লাইভ করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownloadNetlifyConfig}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition shadow-sm"
              title="netlify.toml ফাইলটি ডাউনলোড করুন"
            >
              <Download className="w-3.5 h-3.5" />
              <span>netlify.toml ডাউনলোড</span>
            </button>
            <button
              onClick={handleCopyNetlify}
              className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
            >
              {copiedNetlify ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedNetlify ? 'কপি হয়েছে!' : 'netlify.toml কপি'}</span>
            </button>
          </div>
        </div>

        {/* Netlify Steps & Download Notice */}
        <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 p-4 rounded-xl space-y-3">
          <h3 className="text-xs font-bold text-sky-900 dark:text-sky-200 flex items-center gap-1.5">
            <Cloud className="w-4 h-4 text-sky-600" />
            Netlify-তে ওয়েবসাইট লাইভ করার সহজ ধাপসমূহ:
          </h3>
          <div className="text-xs text-sky-800 dark:text-sky-300 space-y-1.5 leading-relaxed font-sans">
            <p><strong>ধাপ ১ (সম্পূর্ণ প্রজেক্ট ডাউনলোড):</strong> Google AI Studio-এর উপরের ডানপাশের <strong>Settings (সেটিংস)</strong> বা <strong>Export (এক্সপোর্ট)</strong> মেনু থেকে <strong>"Download as ZIP"</strong> অথবা <strong>"Export to GitHub"</strong> ক্লিক করে সম্পূর্ণ প্রজেক্ট ডাউনলোড করুন।</p>
            <p><strong>ধাপ ২ (বিল্ড ও ডিপ্লয়):</strong> আপনার কম্পিউটারে টার্মিনাল খুলে <code className="bg-white dark:bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-red-600 font-bold">npm install</code> এবং <code className="bg-white dark:bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-red-600 font-bold">npm run build</code> কমান্ড রান করুন। অথবা সরাসরি Netlify-এর সাথে GitHub লিঙ্ক করুন।</p>
            <p><strong>ধাপ ৩ (কনফিগারেশন):</strong> প্রজেক্টের ভেতরে <code className="bg-white dark:bg-zinc-900 px-1.5 py-0.5 rounded font-mono">netlify.toml</code> এবং <code className="bg-white dark:bg-zinc-900 px-1.5 py-0.5 rounded font-mono">public/_redirects</code> ফাইল স্বয়ংক্রিয়ভাবে তৈরি রয়েছে। আপনি চাইলে উপরের <strong>"netlify.toml ডাউনলোড"</strong> বাটন ক্লিক করেও নামিয়ে নিতে পারেন।</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-white mb-1">১. Build Command:</strong>
            <code className="text-red-600 font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded">npm run build</code>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-white mb-1">২. Publish Directory:</strong>
            <code className="text-red-600 font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded">dist</code>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-white mb-1">৩. SPA Redirects:</strong>
            <span className="text-green-600 font-bold">স্বয়ংক্রিয়ভাবে সক্রিয় (_redirects)</span>
          </div>
        </div>
      </div>

      {/* 3. Backup & Restore */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            ডাটা ব্যাকআপ ও রিস্টোর (JSON Data Export)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            সকল সংবাদ, বিজ্ঞাপন ও সেটিংসের সম্পূর্ণ ব্যাকআপ সংরক্ষণ করুন
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportBackup}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
          >
            <Download className="w-4 h-4" />
            <span>JSON ব্যাকআপ ডাউনলোড</span>
          </button>
          
          <button
            onClick={resetToDefault}
            className="bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 text-xs font-bold px-4 py-2 rounded-lg transition"
          >
            ডিফল্ট ডাটা রিসেট
          </button>
        </div>
      </div>

    </div>
  );
};
