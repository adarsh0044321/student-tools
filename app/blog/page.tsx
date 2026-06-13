import React from 'react';
import { blogPosts } from '../../src/blogPosts';
import Link from 'next/link';

export const metadata = {
  title: 'Student Productivity Blog - Guides & Tips',
  description: 'Learn how to optimize files, organize study routines, study with Pomodoro timers, and calculate CGPA grades with our student-focused articles.',
  alternates: {
    canonical: '/blog'
  }
};

export default function BlogIndexPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)' }}>🎓 Student Productivity Blog</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.5rem' }}>Practical guides, productivity hacks, and tech tips curated for modern students.</p>
      </section>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem'
      }}>
        {blogPosts.map((post) => (
          <Link 
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card-link"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              backgroundColor: 'var(--white)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <img 
              src={post.image} 
              alt={post.title} 
              style={{ width: '100%', height: '180px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#ff6a00', marginBottom: '0.5rem' }}>
                <span>{post.category}</span>
                <span style={{ color: 'var(--text-muted)' }}>{post.readTime}</span>
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.25rem 0', color: 'var(--text-dark)', lineHeight: 1.4 }}>{post.title}</h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: '0.5rem' }}>{post.metaDesc}</p>
              
              <div style={{ marginTop: 'auto', paddingTop: '1.25rem', fontSize: '0.85rem', fontWeight: 700, color: '#e52d27' }}>
                Read Guide &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
