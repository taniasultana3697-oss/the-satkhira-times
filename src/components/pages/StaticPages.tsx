import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Send, 
  CheckCircle,
  Globe,
  Award,
  Users
} from 'lucide-react';

interface StaticPageProps {
  page: 'about' | 'contact' | 'privacy' | 'terms';
}

export const StaticPages: React.FC<StaticPageProps> = ({ page }) => {
  const { settings, setCurrentView } = useNews();
  
  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactSubject('');
      setContactMessage('');
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      
      {/* 1. ABOUT US */}
      {page === 'about' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b-2 border-red-600 pb-4">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif-bangla flex items-center gap-3">
              <Globe className="w-8 h-8 text-red-600" />
              আমাদের সম্পর্কে (THE SATKHIRA TIMES)
            </h1>
            <p className="text-sm text-slate-500 mt-1">{settings.tagline} — সত্য ও নিরপেক্ষ সংবাদ</p>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              'দ্য সাতক্ষীরা টাইমস' (THE SATKHIRA TIMES) দক্ষিণ-পশ্চিমাঞ্চল তথা সমগ্র বাংলাদেশের শীর্ষস্থানীয় আধুনিক ও বস্তুনিষ্ঠ অনলাইন সংবাদ মাধ্যম।
            </p>
            <p>
              আমরা সাতক্ষীরা জেলার প্রান্তিক মানুষের জীবনগাথা, সুন্দরবনের প্রাকৃতিক ঐতিহ্য, উপকূলীয় সমস্যা ও সম্ভাবনা, ভোমরা স্থলবন্দরের অর্থনৈতিক গতিশীলতা এবং বিশ্বমঞ্চের সর্বশেষ ঘটনাপ্রবাহ সাহসিকতা ও নিরপেক্ষতার সাথে তুলে ধরতে প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <ShieldCheck className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">বস্তুনিষ্ঠতা ও সত্য</h3>
              <p className="text-xs text-slate-500 mt-1">গুজব ও পক্ষপাতমুক্ত শতভাগ যাচাইকৃত তথ্য পরিবেশন</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">তৃণমূলের কণ্ঠস্বর</h3>
              <p className="text-xs text-slate-500 mt-1">সাতক্ষীরার ৭ উপজেলার প্রতিটি গ্রামের মানুষের পাশে</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <Award className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">ডিজিটাল উৎকর্ষ</h3>
              <p className="text-xs text-slate-500 mt-1">বিশ্বমানের আল্ট্রাফাস্ট রিডিং এক্সপেরিয়েন্স ও সোশ্যাল কানেক্টিভিটি</p>
            </div>
          </div>

          {/* Editorial Board */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              সম্পাদকমণ্ডলী ও পরিচালনা পর্ষদ
            </h2>
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <div><strong>সম্পাদক:</strong> {settings.editorName}</div>
              <div><strong>প্রকাশক:</strong> {settings.publisherName}</div>
              <div><strong>বার্তা প্রধান:</strong> এস কে মাহমুদ উল্লাহ</div>
              <div><strong>প্রধান কার্যালয়:</strong> {settings.mainOfficeAddress}</div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CONTACT US */}
      {page === 'contact' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b-2 border-red-600 pb-4">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif-bangla flex items-center gap-3">
              <Mail className="w-8 h-8 text-red-600" />
              যোগাযোগ ও বিজ্ঞাপন
            </h1>
            <p className="text-sm text-slate-500 mt-1">যেকোনো সংবাদ, পরামর্শ বা বিজ্ঞাপনের জন্য সরাসরি যোগাযোগ করুন</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white">সাতক্ষীরা প্রধান কার্যালয়:</strong>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">{settings.mainOfficeAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white">ঢাকা ব্যুরো অফিস:</strong>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">{settings.dhakaOfficeAddress}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white">জরুরি বার্তা ও ফোন:</strong>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">{settings.contactPhone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white">ইমেইল:</strong>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">{settings.contactEmail}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-[#229ED9] hover:opacity-90 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>টেলিগ্রাম চ্যানেল</span>
                  </a>
                  <a
                    href="https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-[#25D366] hover:opacity-90 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>হোয়াটসঅ্যাপ বার্তা</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <form onSubmit={handleContactSubmit} className="space-y-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                আমাদের সরাসরি বার্তা পাঠান
              </h3>
              
              <input
                type="text"
                required
                placeholder="আপনার পূর্ণ নাম *"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  required
                  placeholder="ইমেইল *"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
                />
                <input
                  type="tel"
                  placeholder="মোবাইল নম্বর"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
                />
              </div>

              <input
                type="text"
                required
                placeholder="বার্তার বিষয় *"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
              />

              <textarea
                required
                rows={4}
                placeholder="আপনার বিস্তারিত বার্তা বা বিজ্ঞাপনের বিবরণ লিখুন..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-lg transition shadow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>বার্তা পাঠান</span>
              </button>

              {submitted && (
                <div className="bg-green-100 text-green-800 p-2.5 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  আপনার বার্তা সফলভাবে বার্তা কক্ষে পাঠানো হয়েছে!
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 3. PRIVACY POLICY */}
      {page === 'privacy' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b-2 border-red-600 pb-4">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif-bangla flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-red-600" />
              গোপনীয়তা নীতি (Privacy Policy)
            </h1>
            <p className="text-xs text-slate-500 mt-1">সর্বশেষ হালনাগাদ: ১ সেপ্টেম্বর ২০২৬</p>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-4">
            <p>
              'দ্য সাতক্ষীরা টাইমস' (The Satkhira Times) তার পাঠকদের ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ। এই ওয়েবসাইটে প্রবেশের মাধ্যমে আপনি আমাদের তথ্য সংরক্ষণ ও প্রক্রিয়াকরণ নীতি মেনে নিচ্ছেন।
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">১. সংগৃহীত তথ্য</h3>
            <p>
              পাঠকের ব্রাউজিং অভিজ্ঞতা উন্নত করতে আমরা ব্রাউজার টাইপ, আইপি অ্যাড্রেস এবং কুকিজ (Cookies) তথ্য সংগ্রহ করতে পারি। এছাড়া নিউজলেটার বা মন্তব্যের সময় আপনার প্রদত্ত নাম ও ইমেইল শুধুমাত্র যাচাইয়ের কাজে ব্যবহৃত হয়।
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">২. বিজ্ঞাপন ও তৃতীয় পক্ষের সেবা</h3>
            <p>
              আমাদের সাইটে Adsterra এবং Google বিজ্ঞাপনের নেটওয়ার্ক ব্যবহৃত হতে পারে, যা আপনার রুচি অনুযায়ী বিজ্ঞাপন পরিবেশন করতে ব্যক্তিগতভাবে সনাক্তযোগ্য নয় এমন ব্রাউজিং ডাটা ব্যবহার করতে পারে।
            </p>
          </div>
        </div>
      )}

      {/* 4. TERMS & CONDITIONS */}
      {page === 'terms' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b-2 border-red-600 pb-4">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif-bangla flex items-center gap-3">
              <FileText className="w-8 h-8 text-red-600" />
              ব্যবহারের শর্তাবলী (Terms & Conditions)
            </h1>
            <p className="text-xs text-slate-500 mt-1">দ্য সাতক্ষীরা টাইমস পাঠক নীতিমালা</p>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">১. কপিরাইট ও স্বত্বাধিকার</h3>
            <p>
              এই পোর্টালে প্রকাশিত সকল সংবাদ, ছবি, ভিডিও, লোগো এবং অডিও 'সাতক্ষীরা মিডিয়া পাবলিকেশন্স লিমিটেড'-এর মেধাসম্পদ। অনুমতি ছাড়া কোনো কনটেন্ট বাণিজ্যিক উদ্দেশ্যে পুনঃপ্রকাশ সম্পূর্ণ বেআইনি।
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">২. মন্তব্য ও পাঠক মতামত</h3>
            <p>
              পাঠকদের মন্তব্যের জন্য সাতক্ষীরা টাইমস কর্তৃপক্ষ সরাসরি দায়ী নয়। কোনো ধরনের বিদ্বেষমূলক, অশালীন বা উসকানিমূলক মন্তব্য স্বয়ংক্রিয়ভাবে মুছে ফেলা হবে।
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
