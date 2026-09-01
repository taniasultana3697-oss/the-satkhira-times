import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

interface AdsterraEmbedProps {
  type: '728x90' | '300x250' | 'native' | 'custom';
  codeSnippet?: string;
  adKey?: string;
  targetUrl?: string;
  className?: string;
}

const DEFAULT_DIRECT_LINK = 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2';

export const AdsterraEmbed: React.FC<AdsterraEmbedProps> = ({
  type,
  codeSnippet,
  adKey,
  targetUrl = DEFAULT_DIRECT_LINK,
  className = ''
}) => {
  const nativeContainerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // 1. Native Banner Ad Handler
  if (type === 'native') {
    const directUrl = targetUrl || DEFAULT_DIRECT_LINK;
    
    // Sponsored Native Recommendation cards (High CTR Fallback & Native Content Grid)
    const nativeSponsoredItems = [
      {
        id: 's-1',
        title: 'ঘরে বসেই ফ্রিল্যান্সিং ও অনলাইন আয়ের সহজ ৫টি স্মার্ট উপায় জানুন',
        category: 'অনলাইন ক্যারিয়ার',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&auto=format&fit=crop&q=80',
        sponsor: 'Smart Work BD'
      },
      {
        id: 's-2',
        title: 'স্মার্টফোনের ব্যাটারি দীর্ঘস্থায়ী ও সুরক্ষিত রাখার আধুনিক টেকনিক',
        category: 'টেক টিপস',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
        sponsor: 'Tech Digest'
      },
      {
        id: 's-3',
        title: 'সেরা বাজেটে আকর্ষণীয় ল্যাপটপ ও ইলেকট্রনিক্স ডিল - এখনই দেখুন',
        category: 'স্পেশাল ডিল',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
        sponsor: 'Mega Offers'
      },
      {
        id: 's-4',
        title: 'আন্তর্জাতিক স্কলারশিপ ও উচ্চশিক্ষার জন্য প্রস্তুতি নেওয়ার গাইডলাইন',
        category: 'শিক্ষা ও ক্যারিয়ার',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
        sponsor: 'EduPath'
      }
    ];

    const containerId = 'container-9d9df04b79418e31830e5386e0057871';

    return (
      <div className={`w-full ${className}`}>
        {/* Custom script provided in admin */}
        {codeSnippet && codeSnippet.trim().length > 10 ? (
          <div className="w-full mb-3 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2">
            <iframe
              title="Custom Native Ad Code"
              srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><base target="_blank"><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;}</style></head><body>${codeSnippet}</body></html>`}
              className="w-full min-h-[140px] border-0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
            />
          </div>
        ) : (
          /* Adsterra Native Script Iframe */
          <div className="w-full mb-3 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-1">
            <iframe
              title="Adsterra Native Ad Banner"
              srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><base target="_blank"><style>*{box-sizing:border-box;}body{margin:0;padding:4px;display:flex;justify-content:center;align-items:center;background:transparent;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;}#${containerId}{width:100%;min-height:120px;}</style></head><body><div id="${containerId}"></div><script async="async" data-cfasync="false" src="https://pl31125550.profitableratecpmnetwork.com/9d9df04b79418e31830e5386e0057871/invoke.js"></script></body></html>`}
              className="w-full min-h-[140px] border-0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
            />
          </div>
        )}

        {/* Native News Style Sponsored Recommendation Grid */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 font-serif-bangla">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>আপনার জন্য নির্বাচিত স্পন্সরড বার্তা ও অফার</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              বিজ্ঞাপন / Sponsored
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {nativeSponsoredItems.map((item) => (
              <a
                key={item.id}
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex sm:flex-col gap-3 sm:gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-slate-100 dark:border-slate-800/80"
              >
                <div className="relative w-24 sm:w-full aspect-[16/10] flex-shrink-0 overflow-hidden rounded-md bg-slate-200 dark:bg-slate-700">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[8px] px-1 rounded">
                    {item.sponsor}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-red-600 dark:text-red-400 block mb-0.5">
                      {item.category}
                    </span>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug font-bangla">
                      {item.title}
                    </h5>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 font-bangla">
                    <span>বিস্তারিত দেখুন</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. 728x90 Header / Footer Banner
  if (type === '728x90') {
    const key = adKey || '6899df43cee03e4cbbb606088858f40c';
    const iframeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <base target="_blank">
          <style>
            * { box-sizing: border-box; }
            body { 
              margin: 0; 
              padding: 0; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              background: transparent; 
              overflow: hidden; 
            }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            atOptions = {
              'key' : '${key}',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highrevenueformat.com/${key}/invoke.js"></script>
        </body>
      </html>
    `;

    return (
      <div className={`w-full flex justify-center items-center overflow-x-auto ${className}`}>
        <div className="w-[728px] max-w-full h-[90px] flex-shrink-0">
          <iframe
            title={`Adsterra 728x90 Ad - ${key}`}
            srcDoc={iframeHtml}
            width="728"
            height="90"
            className="w-full h-full border-0 overflow-hidden"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
            scrolling="no"
          />
        </div>
      </div>
    );
  }

  // 3. 300x250 Sidebar Banner
  if (type === '300x250') {
    const key = adKey || '1b7a4aa64f6c8149c78e46f70b159fc8';
    const iframeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <base target="_blank">
          <style>
            * { box-sizing: border-box; }
            body { 
              margin: 0; 
              padding: 0; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              background: transparent; 
              overflow: hidden; 
            }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            atOptions = {
              'key' : '${key}',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highrevenueformat.com/${key}/invoke.js"></script>
        </body>
      </html>
    `;

    return (
      <div className={`w-full flex justify-center items-center ${className}`}>
        <div className="w-[300px] h-[250px] flex-shrink-0 bg-slate-50 dark:bg-zinc-800/40 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-700">
          <iframe
            title={`Adsterra 300x250 Ad - ${key}`}
            srcDoc={iframeHtml}
            width="300"
            height="250"
            className="w-full h-full border-0 overflow-hidden"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
            scrolling="no"
          />
        </div>
      </div>
    );
  }

  // 4. Custom Raw Code Snippet
  if (codeSnippet) {
    const iframeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <base target="_blank">
          <style>
            body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }
          </style>
        </head>
        <body>
          ${codeSnippet}
        </body>
      </html>
    `;

    return (
      <div className={`w-full flex justify-center ${className}`}>
        <iframe
          title="Custom Adsterra Code"
          srcDoc={iframeHtml}
          className="w-full min-h-[90px] border-0"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
          scrolling="no"
        />
      </div>
    );
  }

  return null;
};
