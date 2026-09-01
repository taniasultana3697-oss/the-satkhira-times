import React, { useEffect, useRef } from 'react';

interface AdsterraEmbedProps {
  type: '728x90' | '300x250' | 'native' | 'custom';
  codeSnippet?: string;
  adKey?: string;
  className?: string;
}

export const AdsterraEmbed: React.FC<AdsterraEmbedProps> = ({
  type,
  codeSnippet,
  adKey,
  className = ''
}) => {
  const nativeRef = useRef<HTMLDivElement>(null);

  // Native banner dynamic script loader
  useEffect(() => {
    if (type === 'native' && nativeRef.current) {
      // Clear existing content to prevent duplicates on route change
      nativeRef.current.innerHTML = '<div id="container-9d9df04b79418e31830e5386e0057871"></div>';
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl31125550.profitableratecpmnetwork.com/9d9df04b79418e31830e5386e0057871/invoke.js';
      
      nativeRef.current.appendChild(script);

      return () => {
        if (nativeRef.current) {
          nativeRef.current.innerHTML = '';
        }
      };
    }
  }, [type]);

  if (type === '728x90') {
    const key = adKey || '6899df43cee03e4cbbb606088858f40c';
    const iframeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
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
            scrolling="no"
          />
        </div>
      </div>
    );
  }

  if (type === '300x250') {
    const key = adKey || '1b7a4aa64f6c8149c78e46f70b159fc8';
    const iframeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
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
            scrolling="no"
          />
        </div>
      </div>
    );
  }

  if (type === 'native') {
    const containerId = 'container-9d9df04b79418e31830e5386e0057871';
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
              padding: 4px; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              background: transparent; 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            #${containerId} {
              width: 100%;
              min-height: 140px;
            }
          </style>
        </head>
        <body>
          <div id="${containerId}"></div>
          <script async="async" data-cfasync="false" src="https://pl31125550.profitableratecpmnetwork.com/9d9df04b79418e31830e5386e0057871/invoke.js"></script>
        </body>
      </html>
    `;

    return (
      <div className={`w-full flex justify-center ${className}`}>
        <div className="w-full min-h-[160px] bg-slate-50 dark:bg-slate-900/60 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-1">
          <iframe
            title="Adsterra Native Ad Banner"
            srcDoc={iframeHtml}
            className="w-full min-h-[160px] border-0"
            scrolling="no"
          />
        </div>
      </div>
    );
  }

  // Custom Raw Snippet rendering
  if (codeSnippet) {
    const iframeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
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
          scrolling="no"
        />
      </div>
    );
  }

  return null;
};
