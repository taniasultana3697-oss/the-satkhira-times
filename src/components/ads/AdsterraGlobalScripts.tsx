import React, { useEffect } from 'react';
import { useNews } from '../../context/NewsContext';

export const AdsterraGlobalScripts: React.FC = () => {
  const { adConfigs } = useNews();

  // 1. Popunder Script Loader
  useEffect(() => {
    const popunderConfig = adConfigs.find(a => a.slot === 'popunder');
    if (popunderConfig && popunderConfig.enabled) {
      const scriptId = 'adsterra-popunder-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'text/javascript';
        script.src = 'https://pl31125455.profitableratecpmnetwork.com/d5/dd/ec/d5ddec2a1a03f6d7d8e6be14f9a193e5.js';
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [adConfigs]);

  // 2. Social Bar Script Loader
  useEffect(() => {
    const socialbarConfig = adConfigs.find(a => a.slot === 'socialbar');
    if (socialbarConfig && socialbarConfig.enabled) {
      const scriptId = 'adsterra-socialbar-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'text/javascript';
        script.src = 'https://pl31125456.profitableratecpmnetwork.com/9b/98/69/9b986949090d2888ce3569ade4c3f2b2.js';
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [adConfigs]);

  return null;
};
