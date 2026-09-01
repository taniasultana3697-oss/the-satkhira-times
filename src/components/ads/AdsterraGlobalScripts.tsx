import React, { useEffect, useRef } from 'react';
import { useNews } from '../../context/NewsContext';

export const AdsterraGlobalScripts: React.FC = () => {
  const { adConfigs, currentView } = useNews();
  const hasTriggeredClickRef = useRef(false);

  // Helper to extract script src from code snippet or return fallback
  const extractScriptSrc = (snippet: string | undefined, defaultUrl: string): string => {
    if (!snippet) return defaultUrl;
    const match = snippet.match(/src=["']([^"']+)["']/);
    if (match && match[1]) {
      return match[1].startsWith('//') ? `https:${match[1]}` : match[1];
    }
    if (snippet.startsWith('http://') || snippet.startsWith('https://')) {
      return snippet.trim();
    }
    return defaultUrl;
  };

  // 1. Popunder Script Loader
  useEffect(() => {
    if (currentView === 'admin') return;

    const popunderConfig = adConfigs.find(a => a.slot === 'popunder');
    const defaultPopunderUrl = 'https://pl31125455.profitableratecpmnetwork.com/d5/dd/ec/d5ddec2a1a03f6d7d8e6be14f9a193e5.js';
    const scriptSrc = extractScriptSrc(popunderConfig?.codeSnippet, defaultPopunderUrl);

    if (popunderConfig && popunderConfig.enabled) {
      const scriptId = 'adsterra-popunder-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'text/javascript';
        script.async = true;
        script.src = scriptSrc;
        document.body.appendChild(script);
      } else if (script.src !== scriptSrc) {
        script.src = scriptSrc;
      }
    } else {
      const script = document.getElementById('adsterra-popunder-script');
      if (script) script.remove();
    }
  }, [adConfigs, currentView]);

  // 2. Social Bar Script Loader
  useEffect(() => {
    if (currentView === 'admin') return;

    const socialbarConfig = adConfigs.find(a => a.slot === 'socialbar');
    const defaultSocialbarUrl = 'https://pl31125456.profitableratecpmnetwork.com/9b/98/69/9b986949090d2888ce3569ade4c3f2b2.js';
    const scriptSrc = extractScriptSrc(socialbarConfig?.codeSnippet, defaultSocialbarUrl);

    if (socialbarConfig && socialbarConfig.enabled) {
      const scriptId = 'adsterra-socialbar-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'text/javascript';
        script.async = true;
        script.src = scriptSrc;
        document.body.appendChild(script);
      } else if (script.src !== scriptSrc) {
        script.src = scriptSrc;
      }
    } else {
      const script = document.getElementById('adsterra-socialbar-script');
      if (script) script.remove();
    }
  }, [adConfigs, currentView]);

  // 3. Fallback Click Popunder Trigger on initial interaction
  useEffect(() => {
    if (currentView === 'admin') return;

    const popunderConfig = adConfigs.find(a => a.slot === 'popunder');
    if (!popunderConfig || !popunderConfig.enabled) return;

    const handleGlobalClick = (e: MouseEvent) => {
      // Don't trigger if clicked on an admin control or if already triggered in this session
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, input, select, textarea, .admin-container')) {
        return;
      }

      const hasTriggered = sessionStorage.getItem('satkhira_popunder_click_done');
      if (!hasTriggered && !hasTriggeredClickRef.current) {
        hasTriggeredClickRef.current = true;
        sessionStorage.setItem('satkhira_popunder_click_done', 'true');
        
        const directUrl = popunderConfig.targetUrl || 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2';
        try {
          const win = window.open(directUrl, '_blank');
          if (win) {
            win.blur();
            window.focus();
          }
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('click', handleGlobalClick, { passive: true });
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [adConfigs, currentView]);

  return null;
};
