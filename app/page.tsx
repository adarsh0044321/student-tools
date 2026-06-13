import React from 'react';
import { HomeToolsList } from '../src/components/HomeToolsList';
import { BannerAd468x60, StudentPromotionalOffers } from '../src/components/Ads';

export const metadata = {
  title: 'Student Tools - Free Online PDF & Academic Calculators',
  description: 'Merge, split, and compress PDFs online. Access student calculators, GPA trackers, study timers, and word counters. 100% free, secure, and client-side.',
  alternates: {
    canonical: '/'
  }
};

export default function HomePage() {
  // Structured Schema data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://student-tools-seven.vercel.app/#website',
        'url': 'https://student-tools-seven.vercel.app/',
        'name': 'Student Tools',
        'description': 'Free client-side PDF, document, and study utility calculators for students.',
        'potentialAction': [
          {
            '@type': 'SearchAction',
            'target': 'https://student-tools-seven.vercel.app/?search={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        ]
      },
      {
        '@type': 'Organization',
        '@id': 'https://student-tools-seven.vercel.app/#organization',
        'name': 'Student Tools',
        'url': 'https://student-tools-seven.vercel.app/',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://student-tools-seven.vercel.app/logo.png',
          'width': 500,
          'height': 500
        }
      }
    ]
  };

  return (
    <div>
      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="hero">
        <h1 className="hero-title">
          Every tool you need to work with <span>PDFs</span> & study calculators, 100% Free
        </h1>
        <p className="hero-subtitle">
          Keep your studies organized, track sem GPA, count words, and compress textbooks safely in-browser. No uploads to external databases.
        </p>
      </section>

      {/* Client-side Tools List Filter */}
      <HomeToolsList />

      {/* Why Choose Us Section */}
      <section style={{ margin: '4rem 0 2rem 0', borderTop: '1px solid var(--border-color)', paddingTop: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-dark)' }}>🔒 Handcrafted for Student Privacy</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>Why thousands of academic users trust Student Tools for their assignments.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#e52d27' }}>1. Local In-Browser Processing</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Unlike typical PDF utilities that upload files to cloud servers, all our code processes variables locally inside your web browser. Your homework, exams, and transcripts never leave your device.</p>
          </div>
          <div style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ff6a00' }}>2. Speed & File Sizes</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Since files do not need to upload or download from backend APIs, processing is near-instantaneous. Perfect for heavy scanned study guides and textbook packages.</p>
          </div>
          <div style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#e52d27' }}>3. 100% Free & Unlimited</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>No registration sheets, no email lists, and no premium gates. Access all PDF converters and calculators instantly, whenever you need to meet a strict deadline.</p>
          </div>
        </div>
      </section>

      {/* Ads & Partner Deals */}
      <BannerAd468x60 />
      <StudentPromotionalOffers />

      {/* FAQs Section */}
      <section style={{ margin: '4rem 0', borderTop: '1px solid var(--border-color)', paddingTop: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, textAlign: 'center', marginBottom: '2rem' }}>💬 Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '0.5rem' }}>Do you save my grades or PDF files on your database?</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>No. We do not run any backend servers. All tools are compiled as local browser scripts, which means your files and grade datasets stay on your machine.</p>
          </div>
          <div style={{ padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '0.5rem' }}>Why did the site ask me to disable my adblocker?</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>To keep this academic platform 100% free and support our server hosting, we partner with sponsors. Whitelisting the site helps us maintain these tools for all students.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
