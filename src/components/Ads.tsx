import React, { useEffect, useRef } from 'react';

// 468x60 Banner Ad Component
export const BannerAd468x60: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const adScript = document.createElement('script');
    adScript.type = 'text/javascript';
    adScript.innerHTML = `
      atOptions = {
        'key' : '874748397fc08947644160fe7cb03516',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = 'https://heavenlysuspicious.com/874748397fc08947644160fe7cb03516/invoke.js';

    containerRef.current.appendChild(adScript);
    containerRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem auto', gap: '0.25rem' }}>
      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', tracking: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>Sponsored</span>
      <div ref={containerRef} style={{ width: '468px', height: '60px', overflow: 'hidden', backgroundColor: 'transparent' }}></div>
    </div>
  );
};

// 160x300 Sidebar Ad Component
export const BannerAd160x300: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const adScript = document.createElement('script');
    adScript.type = 'text/javascript';
    adScript.innerHTML = `
      atOptions = {
        'key' : '26387d03d857f75166356e0b56912227',
        'format' : 'iframe',
        'height' : 300,
        'width' : 160,
        'params' : {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = 'https://heavenlysuspicious.com/26387d03d857f75166356e0b56912227/invoke.js';

    containerRef.current.appendChild(adScript);
    containerRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Advertisement</span>
      <div ref={containerRef} style={{ width: '160px', height: '300px', overflow: 'hidden', backgroundColor: 'transparent' }}></div>
    </div>
  );
};

// Native Banner Component
export const NativeAdBanner: React.FC = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.async = true;
    invokeScript.setAttribute('data-cfasync', 'false');
    invokeScript.src = 'https://heavenlysuspicious.com/c2c1190353251d1c6894e6ec9ae37c15/invoke.js';

    document.head.appendChild(invokeScript);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2.5rem 0', width: '100%', gap: '0.5rem' }}>
      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800 }}>Deals & Partner Recommendations</span>
      <div id="container-c2c1190353251d1c6894e6ec9ae37c15" style={{ width: '100%', minHeight: '100px' }}></div>
    </div>
  );
};

// Direct URL Smartlink Offers panel
export const StudentPromotionalOffers: React.FC = () => {
  const offers = [
    {
      title: "🎓 Unlock Student Discount Club",
      desc: "Get access to exclusive student rewards, premium coupons, software licenses, and study giveaways.",
      url: "https://heavenlysuspicious.com/yutww19m?key=99ceb8fd1d367be8beecde94d2fa824f",
      cta: "Claim Free Passes"
    },
    {
      title: "📚 Get Free Textbook Answers",
      desc: "Instant access to step-by-step guides, homework resources, lecture summaries, and expert guides.",
      url: "https://heavenlysuspicious.com/st4ekjuh6?key=b6a9c2573e8e8194b59f5bf9c32282d2",
      cta: "Search Resources"
    }
  ];

  return (
    <div style={{ margin: '3rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>🔥 Premium Student Partner Offers</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Exclusive academic savings, cheat sheets, and free software deals curated for students.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {offers.map((offer, idx) => (
          <div 
            key={idx}
            style={{
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px dashed #ff6a00',
              backgroundColor: 'var(--light-bg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onClick={() => window.open(offer.url, '_blank')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = '#e52d27';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#ff6a00';
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#e52d27' }}>{offer.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '1.25rem' }}>{offer.desc}</p>
            </div>
            <button 
              style={{
                alignSelf: 'flex-start',
                padding: '0.5rem 1rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#ffffff',
                backgroundColor: '#ff6a00',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {offer.cta} &rarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
