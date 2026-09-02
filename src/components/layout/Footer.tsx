import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { SATKHIRA_UPAZILAS, INITIAL_CATEGORIES } from '../../data/initialData';
import { AdBanner } from '../ads/AdBanner';
import { 
  Globe, 
  Newspaper, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Send, 
  ChevronUp, 
  SendHorizonal, 
  CheckCircle2,
  ShieldCheck,
  FileCode,
  Lock,
  PenSquare
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { 
    settings, 
    openCategory,
    openView,
    goToHome
  } = useNews();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const handleCategoryClick = (cat: string) => {
    openCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpazilaClick = (upazila: string) => {
    openCategory(upazila === 'সকল' ? 'সাতক্ষীরা' : `সাতক্ষীরা:${upazila}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-black text-zinc-300 pt-12 pb-24 md:pb-16 border-t-4 border-[#8B0000] no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* 1. TOP BRANDING & NEWSLETTER BAR */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#8B0000] text-white rounded flex items-center justify-center shadow">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif-bangla font-bold text-2xl sm:text-3xl tracking-tight text-white uppercase leading-none">
                THE <span className="text-[#8B0000]">SATKHIRA</span> TIMES
              </h2>
              <p className="text-xs font-bangla text-zinc-400 mt-1">
                {settings.tagline} • বস্তুনিষ্ঠ সাংবাদিকতার অগ্রদূত
              </p>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="w-full lg:w-auto">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:w-72">
                <input
                  type="email"
                  required
                  placeholder="আপনার ইমেইল লিখুন..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-xs text-white px-3.5 py-2.5 rounded outline-none focus:border-[#8B0000] transition font-bangla"
                />
                <Mail className="w-4 h-4 text-zinc-500 absolute right-3 top-3" />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#8B0000] hover:bg-zinc-800 text-white font-bold text-xs uppercase font-sans tracking-wider px-5 py-2.5 rounded transition flex items-center justify-center gap-1.5 shadow"
              >
                <span>সাবস্ক্রাইব</span>
                <SendHorizonal className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <p className="text-emerald-400 text-xs mt-1.5 flex items-center gap-1 font-bangla">
                <CheckCircle2 className="w-3.5 h-3.5" />
                নিউজলেটার সাবস্ক্রিপশন সম্পন্ন হয়েছে!
              </p>
            )}
          </div>

        </div>

        {/* 2. MAIN FOOTER MULTI-COLUMN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-10 border-b border-zinc-800 text-xs font-bangla">
          
          {/* Col 1: About & Contact Info */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider text-[#8B0000] font-serif-bangla">
              প্রধান কার্যালয় ও বার্তা কক্ষ
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              <strong>সম্পাদক:</strong> {settings.editorName} <br />
              <strong>প্রকাশক:</strong> {settings.publisherName}
            </p>
            <div className="space-y-1.5 text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8B0000] flex-shrink-0 mt-0.5" />
                <span>{settings.mainOfficeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8B0000] flex-shrink-0" />
                <span className="font-sans">{settings.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8B0000] flex-shrink-0" />
                <span className="font-sans">{settings.contactEmail}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-2">
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-zinc-900 hover:bg-[#8B0000] text-zinc-300 hover:text-white flex items-center justify-center transition border border-zinc-800" title="ফেসবুক পেজ">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-zinc-900 hover:bg-[#8B0000] text-zinc-300 hover:text-white flex items-center justify-center transition border border-zinc-800" title="এক্স (টুইটার)">
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href={settings.telegramUrl || 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded bg-zinc-900 hover:bg-[#229ED9] text-zinc-300 hover:text-white flex items-center justify-center transition border border-zinc-800"
                title="টেলিগ্রাম চ্যানেল"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href="https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded bg-zinc-900 hover:bg-[#25D366] text-zinc-300 hover:text-white flex items-center justify-center transition border border-zinc-800"
                title="হোয়াটসঅ্যাপ হেল্পলাইন ও চ্যানেল"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Satkhira Upazilas */}
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider text-[#8B0000] font-serif-bangla mb-3">
              সাতক্ষীরার ৭ উপজেলা
            </h3>
            <ul className="space-y-1.5 text-zinc-400">
              {SATKHIRA_UPAZILAS.map((upazila) => (
                <li key={upazila}>
                  <button
                    onClick={() => handleUpazilaClick(upazila)}
                    className="hover:text-white hover:underline transition text-left"
                  >
                    {upazila}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider text-[#8B0000] font-serif-bangla mb-3">
              জনপ্রিয় বিভাগ
            </h3>
            <ul className="space-y-1.5 text-zinc-400">
              {INITIAL_CATEGORIES.slice(1, 8).map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => handleCategoryClick(cat.name)}
                    className="hover:text-white hover:underline transition text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleCategoryClick('পরিবেশ ও সুন্দরবন')}
                  className="text-emerald-400 hover:underline"
                >
                  সুন্দরবন ও পরিবেশ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Legal */}
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider text-[#8B0000] font-serif-bangla mb-3">
              অন্যান্য ও তথ্য
            </h3>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button onClick={() => { openView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white">
                  আমাদের কথা
                </button>
              </li>
              <li>
                <button onClick={() => { openView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white">
                  বিজ্ঞাপন ও যোগাযোগ
                </button>
              </li>
              <li>
                <button onClick={() => { openView('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white">
                  গোপনীয়তা নীতি
                </button>
              </li>
              <li>
                <button onClick={() => { openView('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white">
                  ব্যবহারের শর্তাবলী
                </button>
              </li>
              <li className="pt-2 space-y-2">
                <button
                  onClick={() => { openView('reporter'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-emerald-400 hover:text-white font-bold flex items-center gap-1 font-sans uppercase tracking-wider text-[11px]"
                >
                  <PenSquare className="w-3.5 h-3.5" />
                  <span>সাংবাদিক পোর্টাল (লগইন)</span>
                </button>
                <button
                  onClick={() => { openView('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#8B0000] hover:text-white font-bold flex items-center gap-1 font-sans uppercase tracking-wider text-[11px]"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>প্রধান অ্যাডমিন প্যানেল</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. COPYRIGHT & TECH BADGES */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-sans">
          <p className="text-center md:text-left font-bangla">
            {settings.footerNotice}
          </p>

          <div className="flex items-center gap-3">
            <span className="bg-zinc-900 text-zinc-400 px-2.5 py-1 rounded border border-zinc-800">
              Netlify Ready • SEO & OpenGraph Optimized
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-zinc-900 hover:bg-[#8B0000] hover:text-white rounded border border-zinc-800 transition"
              title="উপরে যান"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Footer Ad */}
      <AdBanner slot="footer_banner" />
    </footer>
  );
};
