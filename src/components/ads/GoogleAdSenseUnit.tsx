import React, { useEffect, useRef } from 'react';

interface GoogleAdSenseUnitProps {
  client?: string;
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  layout?: string;
  layoutKey?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_CLIENT_ID = 'ca-pub-7007492474198710';

export const GoogleAdSenseUnit: React.FC<GoogleAdSenseUnitProps> = ({
  client = DEFAULT_CLIENT_ID,
  slot,
  format = 'auto',
  layout,
  layoutKey,
  responsive = true,
  className = '',
  style = {}
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isPushedRef = useRef<boolean>(false);

  useEffect(() => {
    // Only attempt push once per element mount
    if (isPushedRef.current) return;

    try {
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle = adsbygoogle;
        
        // Wait a tiny frame for DOM paint
        const timer = setTimeout(() => {
          try {
            if (adRef.current && adRef.current.innerHTML.trim() === '') {
              adsbygoogle.push({});
              isPushedRef.current = true;
            }
          } catch (err) {
            // Suppress benign AdSense double-fill or ad-block errors in SPA
            console.debug('Google AdSense render status:', err);
          }
        }, 150);

        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.debug('Google AdSense initialization notice:', e);
    }
  }, [slot, format]);

  return (
    <div className={`google-adsense-container w-full overflow-hidden flex flex-col items-center my-3 ${className}`}>
      <div className="text-[9px] text-slate-400 dark:text-slate-500 font-sans tracking-widest uppercase mb-1">
        Google Ads
      </div>
      
      <div className="w-full flex justify-center items-center min-h-[90px] bg-slate-50/50 dark:bg-slate-900/30 rounded-lg p-1 border border-dashed border-slate-200 dark:border-slate-800">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            minWidth: '250px',
            minHeight: '90px',
            width: '100%',
            ...style
          }}
          data-ad-client={client}
          {...(slot ? { 'data-ad-slot': slot } : {})}
          data-ad-format={format}
          {...(layout ? { 'data-ad-layout': layout } : {})}
          {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
};
