import { useEffect, useRef } from 'react';
import { adsConfig } from '@/config/ads';

interface AdBannerProps {
  slot: keyof typeof adsConfig.adSlots;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: { push: (arg: unknown) => void }[];
  }
}

export function AdBanner({ slot, className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const adConfig = adsConfig.adSlots[slot];

  useEffect(() => {
    if (!adsConfig.enabled) return;

    // Initialize ad
    const initAd = () => {
      if (typeof window.adsbygoogle !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      }
    };

    // Load ad script if not already loaded
    const loadAdScript = () => {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
      script.onload = initAd;
    };

    // Check if script is already loaded
    if (!document.querySelector('script[src*="adsbygoogle"]')) {
      loadAdScript();
    } else {
      initAd();
    }

    // Implement lazy loading
    if (adRef.current && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              initAd();
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: `${adsConfig.lazyLoadOffset}px` }
      );

      observer.observe(adRef.current);
      return () => observer.disconnect();
    }
  }, [slot]);

  if (!adsConfig.enabled) return null;

  return (
    <div
      ref={adRef}
      className={`ad-container overflow-hidden ${className}`}
      style={{
        minHeight: adConfig.sizes[0][1],
        minWidth: adConfig.sizes[0][0],
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adConfig.id}
        data-ad-format={adConfig.responsive ? 'auto' : 'fixed'}
        data-full-width-responsive={adConfig.responsive}
      />
    </div>
  );
} 