import React, { useState, useRef } from 'react';
import { NewsArticle } from '../../types';
import { getShareLinks } from '../../utils/helpers';
import { 
  X, 
  Facebook, 
  Share2, 
  Send, 
  Twitter, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Sparkles,
  MessageCircle,
  QrCode,
  Image as ImageIcon,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface SocialShareModalProps {
  article: NewsArticle;
  isOpen: boolean;
  onClose: () => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  article,
  isOpen,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPostText, setCopiedPostText] = useState(false);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [generatedCardUrl, setGeneratedCardUrl] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  const articleUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?article=${article.id}`
    : `https://satkhiratimes.com/?article=${article.id}`;

  const shareLinks = getShareLinks(articleUrl, article.title, article.featuredImage);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyFormattedPost = () => {
    const formatted = `📰 ${article.title}\n\n${article.excerpt}\n\n🔗 সম্পূর্ণ প্রতিবেদনটি পড়তে ক্লিক করুন:\n${articleUrl}\n\n#TheSatkhiraTimes #SatkhiraNews #${article.category.replace(/\s+/g, '')}`;
    navigator.clipboard.writeText(formatted);
    setCopiedPostText(true);
    setTimeout(() => setCopiedPostText(false), 2500);
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
    window.open(fbUrl, '_blank', 'width=650,height=550,top=100,left=100,toolbar=no,status=no,resizable=yes');
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
        // Ignored if cancelled
      }
    } else {
      handleFacebookShare();
    }
  };

  // Generate a HD 1200x630 social news card on HTML5 Canvas
  const handleGenerateNewsCard = () => {
    setIsGeneratingCard(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsGeneratingCard(false);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = article.featuredImage;

    const drawCard = () => {
      // Draw Background Image
      try {
        ctx.drawImage(img, 0, 0, 1200, 630);
      } catch {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, 1200, 630);
      }

      // Dark gradient overlay for text readability
      const gradient = ctx.createLinearGradient(0, 0, 0, 630);
      gradient.addColorStop(0, 'rgba(0,0,0,0.3)');
      gradient.addColorStop(0.5, 'rgba(0,0,0,0.6)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1200, 630);

      // Top Red Brand Header
      ctx.fillStyle = '#8B0000';
      ctx.fillRect(0, 0, 1200, 75);

      // Brand Logo Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px "Cinzel", "Playfair Display", serif';
      ctx.fillText('THE SATKHIRA TIMES', 50, 50);

      // Top Category Badge
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(`• ${article.category.toUpperCase()}`, 900, 50);

      // Headline Text (with wrapping)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px "Hind Siliguri", "Tiro Bangla", sans-serif';
      
      const words = article.title.split(' ');
      let line = '';
      let y = 360;
      const maxWidth = 1100;
      const lineHeight = 58;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, 50, y);
          line = words[n] + ' ';
          y += lineHeight;
          if (y > 480) break; // cap lines
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 50, y);

      // Bottom Footer with Date & Web Link
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '22px sans-serif';
      ctx.fillText(`সাতক্ষীরা • www.satkhiratimes.com`, 50, 580);

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('বিস্তারিত পড়তে ভিজিট করুন ➔', 850, 580);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setGeneratedCardUrl(dataUrl);
      setIsGeneratingCard(false);
    };

    img.onload = drawCard;
    img.onerror = () => {
      // Fallback without image
      drawCard();
    };
  };

  const handleDownloadCard = () => {
    if (!generatedCardUrl) return;
    const a = document.createElement('a');
    a.href = generatedCardUrl;
    a.download = `satkhira-times-${article.id}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 my-auto relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-xl">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-serif-bangla leading-snug">
                সোশ্যাল মিডিয়ায় শেয়ার করুন
              </h3>
              <p className="text-[11px] text-slate-500">
                ছবি ও শিরোনাম সহ ফেসবুক, হোয়াটসঅ্যাপ ও অন্যান্য মাধ্যমে শেয়ার
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Social Preview Card */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
            <span>ফেসবুক ও সোশ্যাল প্রিভিউ (Live Card)</span>
            <span className="text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ছবি সহ শেয়ার উপযোগী</span>
            </span>
          </div>

          <div 
            onClick={handleFacebookShare}
            className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 shadow-sm cursor-pointer group hover:border-blue-500 transition"
          >
            <div className="relative aspect-[16/9] w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <img 
                src={article.featuredImage} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded font-sans uppercase">
                {article.category}
              </div>
            </div>
            <div className="p-3 bg-[#f0f2f5] dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-sans">
                SATKHIRATIMES.COM
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 mt-0.5 font-serif-bangla leading-snug">
                {article.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-1 font-bangla">
                {article.excerpt}
              </p>
            </div>
          </div>
        </div>

        {/* Social Action Buttons Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1">
          <button
            onClick={handleFacebookShare}
            className="p-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
          >
            <Facebook className="w-5 h-5" />
            <span>ফেসবুক</span>
          </button>

          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 shadow-sm transition active:scale-95 text-center"
          >
            <MessageCircle className="w-5 h-5" />
            <span>হোয়াটসঅ্যাপ</span>
          </a>

          <button
            onClick={handleNativeShare}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
          >
            <Share2 className="w-5 h-5" />
            <span>ডিভাইস শেয়ার</span>
          </button>

          <a
            href={shareLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-[#229ED9] hover:bg-[#1e8ec3] text-white rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 shadow-sm transition active:scale-95 text-center"
          >
            <Send className="w-5 h-5" />
            <span>টেলিগ্রাম</span>
          </a>

          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 shadow-sm transition active:scale-95 text-center"
          >
            <Twitter className="w-5 h-5" />
            <span>X (টুইটার)</span>
          </a>

          <button
            onClick={handleCopyFormattedPost}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
          >
            {copiedPostText ? <Check className="w-5 h-5 text-green-300" /> : <Copy className="w-5 h-5" />}
            <span>{copiedPostText ? 'কপি হয়েছে' : 'পোস্ট টেক্সট'}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="p-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
          >
            {copiedLink ? <Check className="w-5 h-5 text-green-300" /> : <Copy className="w-5 h-5" />}
            <span>{copiedLink ? 'কপি হয়েছে' : 'লিঙ্ক কপি'}</span>
          </button>

          <button
            onClick={() => setShowQr(!showQr)}
            className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition active:scale-95"
          >
            <QrCode className="w-5 h-5" />
            <span>QR কোড</span>
          </button>
        </div>

        {/* QR Code view */}
        {showQr && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-4 text-center">
            <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(articleUrl)}`} 
                alt="QR Code" 
                className="w-24 h-24"
              />
            </div>
            <div className="text-left text-xs space-y-1">
              <h5 className="font-bold text-slate-900 dark:text-white">মোবাইলে স্ক্যান করে পড়ুন</h5>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                যেকোনো স্মার্টফোনের ক্যামেরা দিয়ে কিউআর কোড স্ক্যান করে আর্টিকেলটি সরাসরি ওপেন করুন।
              </p>
            </div>
          </div>
        )}

        {/* News Card Image Generator */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <ImageIcon className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>সোশ্যাল মিডিয়া ব্যানার কার্ড (ছবি সহ পোস্ট করতে ডাউনলোড করুন)</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!generatedCardUrl ? (
              <button
                onClick={handleGenerateNewsCard}
                disabled={isGeneratingCard}
                className="w-full sm:w-auto text-xs bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 font-bold px-3.5 py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isGeneratingCard ? 'তৈরি হচ্ছে...' : 'সোশ্যাল কার্ড তৈরি করুন'}</span>
              </button>
            ) : (
              <button
                onClick={handleDownloadCard}
                className="w-full sm:w-auto text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>কার্ড ডাউনলোড করুন (.jpg)</span>
              </button>
            )}
          </div>
        </div>

        {/* Preview of generated card if ready */}
        {generatedCardUrl && (
          <div className="relative rounded-xl overflow-hidden border border-emerald-500/50 shadow-md">
            <img src={generatedCardUrl} alt="Generated Social News Card" className="w-full h-auto" />
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center justify-between">
              <span>✓ হাই-রেজোলিউশন সোশ্যাল কার্ড তৈরি হয়েছে</span>
              <button onClick={handleDownloadCard} className="underline text-xs flex items-center gap-1">
                <Download className="w-3 h-3" /> ডাউনলোড
              </button>
            </div>
          </div>
        )}

        {/* Facebook Debugger Helper */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <span>ফেসবুকে ছবি না দেখা গেলে বা ক্যাশ রিফ্রেশ করতে:</span>
          </div>
          <a
            href={shareLinks.facebookDebugger}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 flex-shrink-0"
          >
            <span>FB Debugger ↗</span>
          </a>
        </div>

      </div>
    </div>
  );
};
