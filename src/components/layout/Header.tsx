import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { getCurrentBengaliCalendar } from '../../utils/helpers';
import { AdBanner } from '../ads/AdBanner';
import { 
  Globe, 
  Newspaper, 
  Search, 
  Moon, 
  Sun, 
  Bookmark, 
  Lock, 
  Tv, 
  FileText, 
  CloudSun, 
  Menu, 
  X, 
  ChevronDown,
  Facebook, 
  Twitter, 
  Send, 
  Phone,
  Flame,
  Clock,
  PenSquare
} from 'lucide-react';
import { INITIAL_CATEGORIES, SATKHIRA_UPAZILAS } from '../../data/initialData';

export const Header: React.FC = () => {
  const { 
    settings, 
    isDarkMode, 
    toggleDarkMode, 
    bookmarkedIds, 
    setCurrentView, 
    selectedCategory,
    setSelectedCategory, 
    setSelectedArticleId, 
    setSearchQuery,
    readingFontSize,
    setReadingFontSize,
    currentView,
    currentReporter,
    openCategory,
    openView,
    goToHome
  } = useNews();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearchInput, setLocalSearchInput] = useState('');
  const [satkhiraDropdownOpen, setSatkhiraDropdownOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const cal = getCurrentBengaliCalendar();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchInput.trim()) {
      setSearchQuery(localSearchInput.trim());
      openView('search');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleCategoryClick = (cat: string) => {
    openCategory(cat);
    setMobileMenuOpen(false);
    setSatkhiraDropdownOpen(false);
    setMegaMenuOpen(false);
  };

  const handleUpazilaClick = (upazila: string) => {
    openCategory(upazila === 'সকল' ? 'সাতক্ষীরা' : `সাতক্ষীরা:${upazila}`);
    setSatkhiraDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 transition-colors duration-200">
      {/* 1. TOP BAR - Clean Black & Crimson Line */}
      <div className="bg-black text-white text-xs py-1.5 px-4 md:px-6 border-b border-[#8B0000]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Date & Satkhira Weather */}
          <div className="flex items-center gap-4 flex-wrap font-sans text-xs">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <span className="text-[#8B0000] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000] inline-block animate-pulse"></span>
                LIVE
              </span>
              <span className="text-zinc-600">|</span>
              <Clock className="w-3.5 h-3.5 text-[#8B0000]" />
              <span className="font-bangla">{cal.banglaDate}</span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-zinc-400 hidden sm:inline">{cal.englishDate}</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1.5 text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-[11px]">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bangla">সাতক্ষীরা: ২৯°C মেঘলা</span>
            </div>
          </div>

          {/* Right: Quick Tools & Social Icons */}
          <div className="flex items-center gap-3">
            {/* Font Size Adjuster */}
            <div className="hidden lg:flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
              <span className="text-[10px] text-zinc-400 font-sans uppercase">হরফ:</span>
              <button 
                onClick={() => setReadingFontSize('normal')}
                className={`px-1 rounded text-xs ${readingFontSize === 'normal' ? 'text-red-400 font-bold' : 'text-zinc-400'}`}
                title="সাধারণ ফন্ট সাইজ"
              >
                অ
              </button>
              <button 
                onClick={() => setReadingFontSize('large')}
                className={`px-1 rounded text-sm ${readingFontSize === 'large' ? 'text-red-400 font-bold' : 'text-zinc-400'}`}
                title="বড় ফন্ট সাইজ"
              >
                অ+
              </button>
            </div>

            {/* Bookmarks */}
            <button
              onClick={() => openView('bookmarks')}
              className="flex items-center gap-1 hover:text-red-400 transition text-zinc-300"
              title="সংরক্ষিত খবর"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#8B0000]" />
              <span className="hidden sm:inline font-bangla">বুকমার্ক</span>
              {bookmarkedIds.length > 0 && (
                <span className="bg-[#8B0000] text-white text-[10px] px-1.5 py-0.2 rounded font-bold font-sans">
                  {bookmarkedIds.length}
                </span>
              )}
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 transition flex items-center gap-1 border border-zinc-800"
              title={isDarkMode ? 'লাইট মোড অন করুন' : 'ডার্ক মোড অন করুন'}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-zinc-400" />}
            </button>

            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-2 border-l border-zinc-800 pl-3">
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a 
                href={settings.telegramUrl || 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 hover:text-[#229ED9] transition"
                title="টেলিগ্রাম চ্যানেলে যুক্ত হন"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 hover:text-[#25D366] transition"
                title="হোয়াটসঅ্যাপে যোগাযোগ ও খবর"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Reporter Portal Button */}
            <button
              onClick={() => openView('reporter')}
              className={`flex items-center gap-1 font-sans font-bold text-[11px] px-2.5 py-0.5 rounded transition shadow-sm tracking-wider ${
                currentReporter 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-zinc-800 hover:bg-emerald-700 hover:text-white text-zinc-300 border border-zinc-700'
              }`}
              title="সাংবাদিক ও প্রতিনিধি ডেস্ক"
            >
              <PenSquare className="w-3 h-3 text-emerald-400" />
              <span>{currentReporter ? currentReporter.name.split(' ')[0] : 'সাংবাদিক ডেস্ক'}</span>
            </button>

            {/* Admin Panel Button */}
            <button
              onClick={() => openView('admin')}
              className="flex items-center gap-1 bg-[#8B0000] hover:bg-red-800 text-white font-sans uppercase font-bold text-[11px] px-2.5 py-0.5 rounded transition shadow-sm tracking-wider"
              title="প্রধান অ্যাডমিন প্যানেল"
            >
              <Lock className="w-3 h-3" />
              <span>অ্যাডমিন</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN LOGO & BRANDING MASTHEAD - Clean Minimalism with Thick Black Rule */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 border-b-4 border-black dark:border-zinc-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left / Center: Logo & Slogan */}
          <div 
            onClick={goToHome}
            className="cursor-pointer text-center md:text-left group flex flex-col md:flex-row items-center gap-4"
          >
            {/* Emblem Seal */}
            <div className="w-14 h-14 bg-[#8B0000] text-white rounded-full flex items-center justify-center shadow-md relative overflow-hidden group-hover:scale-105 transition-transform flex-shrink-0">
              <Globe className="w-7 h-7 opacity-30 absolute -top-1 -right-1" />
              <Newspaper className="w-7 h-7 relative z-10 text-white" />
            </div>

            <div>
              <h1 className="font-brand font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-black dark:text-white uppercase leading-none">
                THE SATKHIRA <span className="text-[#8B0000]">TIMES</span>
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-1.5">
                <div className="h-[2px] w-6 bg-[#8B0000]"></div>
                <p className="text-xs sm:text-sm font-sans tracking-[.25em] uppercase text-gray-600 dark:text-gray-400 font-medium">
                  {settings.tagline} • সত্য ও নিরপেক্ষ সংবাদ
                </p>
              </div>
            </div>
          </div>

          {/* Right: Weather Metric & Quick Action Buttons */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-end gap-4">
            {/* Weather Box Clean Metric */}
            <div className="hidden lg:flex flex-col items-end text-right border-r border-gray-300 dark:border-zinc-700 pr-4">
              <div className="text-2xl font-bold font-sans text-black dark:text-white leading-tight">২৯°C</div>
              <div className="text-[10px] uppercase font-sans text-gray-500 tracking-wider">সাতক্ষীরা, বাংলাদেশ</div>
            </div>

            <div className="flex items-center gap-2">
              {/* e-Paper Button */}
              <button 
                onClick={() => {
                  alert('সাতক্ষীরা টাইমস আজকের ই-পেপার সংস্করণ শীঘ্রই প্রকাশিত হচ্ছে।');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-black dark:text-white text-xs font-bold font-sans uppercase rounded border border-gray-300 dark:border-zinc-700 transition"
              >
                <FileText className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>ই-পেপার</span>
              </button>

              {/* Live TV / Special */}
              <a 
                href={settings.liveStreamUrl || '#'}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8B0000] hover:bg-red-800 text-white text-xs font-bold font-sans uppercase rounded transition shadow-sm"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>লাইভ সংবাদ</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 3. STICKY MAIN NAVIGATION BAR - Crisp Clean Minimal White/Dark Bar with Underlines */}
      <nav className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-gray-100 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-4 overflow-x-auto py-2">
              <button
                onClick={goToHome}
                className={`px-3 py-1 text-sm font-bold tracking-wide transition ${
                  currentView === 'home' 
                    ? 'text-[#8B0000] border-b-2 border-[#8B0000] pb-1' 
                    : 'text-gray-800 dark:text-gray-200 hover:text-[#8B0000]'
                }`}
              >
                প্রচ্ছদ
              </button>

              {/* Satkhira Special Dropdown */}
              <div className="relative group flex items-center">
                <button
                  onClick={() => handleCategoryClick('সাতক্ষীরা')}
                  className={`px-2.5 py-1 text-sm font-bold flex items-center gap-1 transition ${
                    selectedCategory?.startsWith('সাতক্ষীরা') 
                      ? 'text-[#8B0000] border-b-2 border-[#8B0000] pb-1' 
                      : 'text-gray-800 dark:text-gray-200 hover:text-[#8B0000]'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-[#8B0000]" />
                  <span>সাতক্ষীরা</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSatkhiraDropdownOpen(!satkhiraDropdownOpen)}
                  onMouseEnter={() => setSatkhiraDropdownOpen(true)}
                  className="p-1 text-gray-500 hover:text-[#8B0000] transition"
                  title="উপজেলা নির্বাচন করুন"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {satkhiraDropdownOpen && (
                  <div 
                    onMouseLeave={() => setSatkhiraDropdownOpen(false)}
                    className="absolute top-full left-0 w-52 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 rounded-b shadow-xl border-t-2 border-[#8B0000] border-x border-b border-gray-200 dark:border-zinc-800 py-2 z-50 animate-fadeIn"
                  >
                    <div className="text-[10px] font-bold text-gray-400 px-3 py-1 uppercase tracking-wider font-sans">
                      সাতক্ষীরা জেলা ও উপজেলাসমূহ
                    </div>
                    <button
                      onClick={() => handleCategoryClick('সাতক্ষীরা')}
                      className="w-full text-left px-3 py-1.5 text-xs font-bold text-red-700 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition flex items-center justify-between border-b border-gray-100 dark:border-zinc-800"
                    >
                      <span>সকল সাতক্ষীরা সংবাদ</span>
                    </button>
                    {SATKHIRA_UPAZILAS.filter(u => u !== 'সকল').map((upazila) => (
                      <button
                        key={upazila}
                        onClick={() => handleUpazilaClick(upazila)}
                        className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-[#8B0000] transition flex items-center justify-between"
                      >
                        <span>{upazila}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Standard Categories */}
              {INITIAL_CATEGORIES.slice(1, 7).map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`px-2.5 py-1 text-sm font-medium transition whitespace-nowrap ${
                    selectedCategory === cat.name 
                      ? 'text-[#8B0000] font-bold border-b-2 border-[#8B0000] pb-1' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-[#8B0000]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}

              <button
                onClick={() => handleCategoryClick('মতামত')}
                className={`px-2.5 py-1 text-sm font-medium transition whitespace-nowrap ${
                  selectedCategory === 'মতামত' 
                    ? 'text-[#8B0000] font-bold border-b-2 border-[#8B0000] pb-1' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#8B0000]'
                }`}
              >
                মতামত
              </button>

              <button
                onClick={() => handleCategoryClick('পরিবেশ ও সুন্দরবন')}
                className={`px-2.5 py-1 text-sm font-medium transition whitespace-nowrap text-[#8B0000] font-bold ${
                  selectedCategory === 'পরিবেশ ও সুন্দরবন' 
                    ? 'border-b-2 border-[#8B0000] pb-1' 
                    : 'hover:opacity-80'
                }`}
              >
                সুন্দরবন
              </button>

              {/* Mega Menu Toggle */}
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="px-2.5 py-1 text-xs font-bold bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded text-gray-800 dark:text-gray-200 transition flex items-center gap-1 border border-gray-200 dark:border-zinc-700"
              >
                <Menu className="w-3.5 h-3.5" />
                <span>সব বিভাগ</span>
              </button>
            </div>

            {/* Mobile Header Icons */}
            <div className="flex md:hidden items-center justify-between w-full py-2.5">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 transition flex items-center gap-1.5 text-xs font-bold font-sans uppercase"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span>মেনু</span>
              </button>

              <span className="font-brand font-bold text-sm tracking-wide uppercase text-black dark:text-white">
                THE SATKHIRA <span className="text-[#8B0000]">TIMES</span>
              </span>

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 rounded bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 transition"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Search Trigger on Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-50 dark:bg-zinc-800 rounded px-2 py-1 border border-gray-300 dark:border-zinc-700">
                  <input
                    type="text"
                    placeholder="সংবাদ অনুসন্ধান করুন..."
                    value={localSearchInput}
                    onChange={(e) => setLocalSearchInput(e.target.value)}
                    className="bg-transparent text-gray-900 dark:text-gray-100 text-xs px-2 py-0.5 outline-none w-48 font-bangla"
                    autoFocus
                  />
                  <button type="submit" className="text-gray-600 dark:text-gray-300 hover:text-[#8B0000] p-0.5">
                    <Search className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-[#8B0000] p-0.5 ml-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-1.5 text-gray-700 dark:text-gray-300 hover:text-[#8B0000] transition flex items-center gap-1 text-xs font-semibold"
                  title="খবর অনুসন্ধান করুন"
                >
                  <Search className="w-4 h-4" />
                  <span>অনুসন্ধান</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {megaMenuOpen && (
          <div className="bg-white dark:bg-zinc-950 border-t-2 border-[#8B0000] border-b border-gray-300 dark:border-zinc-800 text-gray-900 dark:text-zinc-100 p-6 shadow-2xl animate-fadeIn">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 pb-3 mb-4">
                <h3 className="text-base font-bold text-[#8B0000] flex items-center gap-2 font-serif-bangla">
                  <Globe className="w-5 h-5" />
                  দ্য সাতক্ষীরা টাইমস — সকল বিভাগ ও ফিচার
                </h3>
                <button onClick={() => setMegaMenuOpen(false)} className="p-1 text-gray-400 hover:text-black dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-[#8B0000] uppercase font-sans tracking-wider mb-2">সাতক্ষীরা প্রতিদিন</h4>
                  <ul className="space-y-1.5 text-xs text-gray-700 dark:text-zinc-300">
                    {SATKHIRA_UPAZILAS.map((u) => (
                      <li key={u}>
                        <button onClick={() => handleUpazilaClick(u)} className="hover:text-[#8B0000] transition">
                          {u}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#8B0000] uppercase font-sans tracking-wider mb-2">প্রধান সংবাদ</h4>
                  <ul className="space-y-1.5 text-xs text-gray-700 dark:text-zinc-300">
                    <li><button onClick={() => handleCategoryClick('জাতীয়')} className="hover:text-[#8B0000]">জাতীয় সংবাদ</button></li>
                    <li><button onClick={() => handleCategoryClick('রাজনীতি')} className="hover:text-[#8B0000]">রাজনীতি</button></li>
                    <li><button onClick={() => handleCategoryClick('আন্তর্জাতিক')} className="hover:text-[#8B0000]">আন্তর্জাতিক</button></li>
                    <li><button onClick={() => handleCategoryClick('ব্যবসা-বাণিজ্য')} className="hover:text-[#8B0000]">ব্যবসা ও অর্থনীতি</button></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#8B0000] uppercase font-sans tracking-wider mb-2">খেলা ও বিনোদন</h4>
                  <ul className="space-y-1.5 text-xs text-gray-700 dark:text-zinc-300">
                    <li><button onClick={() => handleCategoryClick('খেলাধুলা')} className="hover:text-[#8B0000]">ক্রিকেট ও ফুটবল</button></li>
                    <li><button onClick={() => handleCategoryClick('বিনোদন')} className="hover:text-[#8B0000]">সিনেমা ও সংস্কৃতি</button></li>
                    <li><button onClick={() => handleCategoryClick('জীবনযাপন')} className="hover:text-[#8B0000]">লাইফস্টাইল ও স্বাস্থ্য</button></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#8B0000] uppercase font-sans tracking-wider mb-2">বিজ্ঞান ও মতামত</h4>
                  <ul className="space-y-1.5 text-xs text-gray-700 dark:text-zinc-300">
                    <li><button onClick={() => handleCategoryClick('প্রযুক্তি')} className="hover:text-[#8B0000]">তথ্যপ্রযুক্তি ও গ্যাজেট</button></li>
                    <li><button onClick={() => handleCategoryClick('মতামত')} className="hover:text-[#8B0000]">সম্পাদকীয় ও কলাম</button></li>
                    <li><button onClick={() => handleCategoryClick('পরিবেশ ও সুন্দরবন')} className="hover:text-[#8B0000]">সুন্দরবন ও জীববৈচিত্র্য</button></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#8B0000] uppercase font-sans tracking-wider mb-2">অন্যান্য সেবাসমূহ</h4>
                  <ul className="space-y-1.5 text-xs text-gray-700 dark:text-zinc-300">
                    <li><button onClick={() => { setCurrentView('about'); setMegaMenuOpen(false); }} className="hover:text-[#8B0000]">আমাদের কথা</button></li>
                    <li><button onClick={() => { setCurrentView('contact'); setMegaMenuOpen(false); }} className="hover:text-[#8B0000]">যোগাযোগ ও বিজ্ঞাপন</button></li>
                    <li><button onClick={() => { setCurrentView('privacy'); setMegaMenuOpen(false); }} className="hover:text-[#8B0000]">গোপনীয়তা নীতি</button></li>
                    <li><button onClick={() => { setCurrentView('terms'); setMegaMenuOpen(false); }} className="hover:text-[#8B0000]">ব্যবহারের শর্তাবলী</button></li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-zinc-900 p-3 rounded border border-gray-200 dark:border-zinc-800">
                  <h4 className="text-xs font-bold text-black dark:text-white mb-2">জরুরি বার্তা ও নিউজলেটার</h4>
                  <p className="text-[11px] text-gray-500 mb-3">প্রতিদিনের গুরুত্বপূর্ণ খবরের আপডেট পেতে যুক্ত থাকুন।</p>
                  <button 
                    onClick={() => {
                      setCurrentView('contact');
                      setMegaMenuOpen(false);
                    }}
                    className="w-full bg-[#8B0000] hover:bg-red-800 text-white text-xs font-bold py-1.5 rounded transition font-sans uppercase"
                  >
                    বার্তা পাঠান
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-gray-100 px-4 py-4 space-y-3 animate-fadeIn">
            {/* Search Input on Mobile */}
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100 dark:bg-zinc-900 rounded px-3 py-1.5 border border-gray-300 dark:border-zinc-700">
              <input
                type="text"
                placeholder="সংবাদ অনুসন্ধান..."
                value={localSearchInput}
                onChange={(e) => setLocalSearchInput(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-900 dark:text-white outline-none font-bangla"
              />
              <button type="submit" className="text-[#8B0000]">
                <Search className="w-4 h-4" />
              </button>
            </form>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setCurrentView('home');
                  setSelectedArticleId(null);
                  setSelectedCategory(null);
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 bg-gray-100 dark:bg-zinc-900 rounded font-semibold text-sm hover:text-[#8B0000] transition"
              >
                প্রচ্ছদ
              </button>
              
              {INITIAL_CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="text-left px-3 py-2 bg-gray-100 dark:bg-zinc-900 rounded font-medium text-sm hover:text-[#8B0000] transition"
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Upazila Accordion on Mobile */}
            <div className="pt-2 border-t border-gray-200 dark:border-zinc-800">
              <div className="text-xs font-bold text-[#8B0000] uppercase tracking-wider mb-2 font-sans">
                সাতক্ষীরা জেলা উপজেলা
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SATKHIRA_UPAZILAS.map((upazila) => (
                  <button
                    key={upazila}
                    onClick={() => handleUpazilaClick(upazila)}
                    className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-zinc-900 hover:bg-[#8B0000] rounded text-gray-700 dark:text-gray-300 hover:text-white transition border border-gray-200 dark:border-zinc-800"
                  >
                    {upazila}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-zinc-800 text-xs">
              <button
                onClick={() => {
                  openView('bookmarks');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-[#8B0000]"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>বুকমার্ক ({bookmarkedIds.length})</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    openView('reporter');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold font-sans"
                >
                  <PenSquare className="w-3.5 h-3.5" />
                  <span>সাংবাদিক পোর্টাল</span>
                </button>

                <button
                  onClick={() => {
                    openView('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-[#8B0000] font-bold font-sans uppercase"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>অ্যাডমিন</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Top 728x90 Header Adsterra Banner */}
      {currentView !== 'admin' && currentView !== 'reporter' && (
        <div className="bg-transparent py-2">
          <AdBanner slot="header_banner" />
        </div>
      )}
    </header>
  );
};
