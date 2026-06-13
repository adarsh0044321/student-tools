import React from 'react';
import { toolsList } from '../../../src/toolsList';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic import of browser-only ToolWrapper component with SSR disabled
const ToolWrapper = dynamic(
  () => import('../../../src/components/ToolWrapper').then(mod => mod.ToolWrapper),
  { ssr: false }
);

interface PageProps {
  params: {
    toolId: string;
  };
}

export async function generateStaticParams() {
  return toolsList.map((tool) => ({
    toolId: tool.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const tool = toolsList.find((t) => t.id === params.toolId);
  if (!tool) return {};

  return {
    title: tool.seoTitle || `${tool.title} | Free Online Student Tool`,
    description: tool.seoMetaDesc || tool.desc,
    alternates: {
      canonical: `/tools/${tool.id}`
    }
  };
}

export default function ToolPage({ params }: PageProps) {
  const tool = toolsList.find((t) => t.id === params.toolId);

  if (!tool) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Tool Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>The requested tool does not exist.</p>
        <Link href="/" style={{ color: '#e52d27', fontWeight: 700, textDecoration: 'none', display: 'block', marginTop: '1.5rem' }}>&larr; Back to Dashboard</Link>
      </div>
    );
  }

  // Pre-render JSON-LD Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://student-tools-seven.vercel.app/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': tool.title,
        'item': `https://student-tools-seven.vercel.app/tools/${tool.id}`
      }
    ]
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': `Student ${tool.title}`,
    'operatingSystem': 'All (Web-based)',
    'applicationCategory': tool.category === 'student-tools' ? 'EducationalApplication' : 'UtilityApplication',
    'browserRequirements': 'Requires HTML5 and Javascript support',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  const faqSchema = tool.faqs && tool.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': tool.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  } : null;

  // Get related tools in the same category
  const relatedTools = toolsList
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Main Interactive Tool Workspace */}
      <div style={{ marginBottom: '4rem' }}>
        <ToolWrapper toolConfig={tool} />
      </div>

      {/* Programmatic SEO content - Statically Pre-rendered */}
      <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '3rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* How it works */}
        {tool.howItWorks && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '1rem' }}>❓ How to use Student {tool.title}</h2>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: 1.6, fontSize: '0.92rem', color: 'var(--text-main)' }}>
              {tool.howItWorks.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Benefits */}
        {tool.benefits && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '1rem' }}>🌟 Benefits & Key Features</h2>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: 1.6, fontSize: '0.92rem', color: 'var(--text-main)' }}>
              {tool.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQs */}
        {tool.faqs && tool.faqs.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '1.25rem' }}>💬 FAQs regarding {tool.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {tool.faqs.map((faq, idx) => (
                <div key={idx} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '0.25rem' }}>{faq.q}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '1rem' }}>🔗 Related Academic Tools</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {relatedTools.map(t => (
                <Link
                  key={t.id}
                  href={`/tools/${t.id}`}
                  className="related-tool-card"
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--white)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}
                >
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#e52d27', marginBottom: '0.25rem' }}>{t.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>{t.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
