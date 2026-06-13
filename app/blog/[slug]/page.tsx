import React from 'react';
import { blogPosts } from '../../../src/blogPosts';
import Link from 'next/link';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Student Tools Blog`,
    description: post.metaDesc,
    alternates: {
      canonical: `/blog/${post.slug}`
    }
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Article Not Found</h2>
        <Link href="/blog" style={{ color: '#e52d27', fontWeight: 700, textDecoration: 'none', display: 'block', marginTop: '1.5rem' }}>&larr; Back to Blog Index</Link>
      </div>
    );
  }

  // Parses markdown links like [Text](/url) into JSX Next Link elements
  const renderContentWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const elements = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(text.slice(lastIndex, match.index));
      }
      elements.push(
        <Link key={match.index} href={match[2]} style={{ color: '#e52d27', fontWeight: 700, textDecoration: 'underline' }}>
          {match[1]}
        </Link>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(text.slice(lastIndex));
    }

    return elements.length > 0 ? elements : text;
  };

  // Pre-render JSON-LD schemas
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
        'name': 'Blog',
        'item': 'https://student-tools-seven.vercel.app/blog'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': post.title,
        'item': `https://student-tools-seven.vercel.app/blog/${post.slug}`
      }
    ]
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': post.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  } : null;

  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Schema scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Header Info */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ff6a00', textTransform: 'uppercase' }}>
          {post.category} &bull; {post.readTime}
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.25, margin: '0.5rem 0' }}>
          {post.title}
        </h1>
        <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>Published on {post.date}</span>
      </div>

      {/* Feature Image */}
      <img 
        src={post.image} 
        alt={post.title} 
        style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Table of Contents - Sticky Left (on desktop) */}
        <div style={{
          padding: '1.25rem',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--light-bg)'
        }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
            Table of Contents
          </h3>
          <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: 0 }}>
            {post.sections.map((section, idx) => (
              <li key={idx}>
                <a 
                  href={`#section-${idx}`} 
                  style={{ fontSize: '0.88rem', color: '#e52d27', fontWeight: 700, textDecoration: 'none' }}
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body */}
        <div style={{ lineHeight: 1.7, fontSize: '0.96rem', color: 'var(--text-main)' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-dark)', fontWeight: 500, marginBottom: '2rem' }}>
            {post.introduction}
          </p>

          {post.sections.map((section, idx) => (
            <div key={idx} id={`section-${idx}`} style={{ marginBottom: '2.5rem', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.75rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.25rem' }}>
                {section.heading}
              </h2>
              <p style={{ margin: 0 }}>
                {renderContentWithLinks(section.content)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Statically Rendered Article FAQs */}
      {post.faqs && post.faqs.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem', marginTop: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem' }}>💬 Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {post.faqs.map((faq, idx) => (
              <div key={idx} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '0.25rem' }}>{faq.q}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem', marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>Related Guides</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {relatedPosts.map(p => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  backgroundColor: 'var(--white)'
                }}
              >
                <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#e52d27', margin: 0 }}>{p.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: '0.5rem', marginBottom: 0 }}>{p.metaDesc}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
