import React from 'react';
import { toolsList } from '../../../src/toolsList';
import Link from 'next/link';
import * as Icons from 'lucide-react';

interface PageProps {
  params: {
    categoryId: string;
  };
}

const CATEGORIES = [
  { id: 'organize', title: 'PDF Organization Tools', desc: 'Merge, split, remove, and organize PDF pages client-side.' },
  { id: 'optimize', title: 'PDF Optimization Tools', desc: 'Compress, repair, and run OCR conversions on textbook sheets.' },
  { id: 'convert-to', title: 'Convert to PDF Tools', desc: 'Turn images, spreadsheets, and word documents into print-ready PDFs.' },
  { id: 'convert-from', title: 'Convert from PDF Tools', desc: 'Extract sheets into editable DOCX and XLSX documents.' },
  { id: 'edit-pdf', title: 'Edit & Annotate PDF Tools', desc: 'Draw, add watermarks, numbers, and crop margin spaces.' },
  { id: 'security', title: 'PDF Security & Signatures', desc: 'Protect, unlock, redact, and draw signatures on consent documents.' },
  { id: 'pdf-intelligence', title: 'PDF AI & Intelligence Tools', desc: 'Extract summaries and translate foreign textbook texts in-browser.' },
  { id: 'student-tools', title: 'Student Utility Calculators', desc: 'Track semesters GPA, CGPA, calculate class attendance, and grades.' },
  { id: 'productivity-tools', title: 'Academic Productivity Helpers', desc: 'Countdown exam dates, Pomodoro study timers, and count essay words.' }
];

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    categoryId: cat.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const cat = CATEGORIES.find(c => c.id === params.categoryId);
  if (!cat) return {};

  return {
    title: `${cat.title} - Free Student Online Utilities`,
    description: cat.desc,
    alternates: {
      canonical: `/categories/${cat.id}`
    }
  };
}

export default function CategoryPage({ params }: PageProps) {
  const cat = CATEGORIES.find(c => c.id === params.categoryId);

  if (!cat) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Category Not Found</h2>
        <Link href="/" style={{ color: '#e52d27', fontWeight: 700, textDecoration: 'none', display: 'block', marginTop: '1.5rem' }}>&larr; Back Home</Link>
      </div>
    );
  }

  const filteredTools = toolsList.filter(t => t.category === cat.id);

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent size={26} />;
    }
    return <Icons.File size={26} />;
  };

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
        'name': cat.title,
        'item': `https://student-tools-seven.vercel.app/categories/${cat.id}`
      }
    ]
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)' }}>{cat.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.5rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>{cat.desc}</p>
      </section>

      <div className="tool-grid" style={{ marginBottom: '4rem' }}>
        {filteredTools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.id}`}
            className="tool-card"
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
          >
            <div className="tool-icon-wrapper">
              {getIcon(tool.iconName)}
            </div>
            <h3 className="tool-title" style={{ color: 'var(--text-dark)' }}>{tool.title}</h3>
            <p className="tool-desc">{tool.desc}</p>
            <div style={{ marginTop: 'auto', paddingTop: '1rem', fontSize: '0.74rem', fontWeight: 700, color: '#ff6a00' }}>
              🎓 {tool.studentContext}
            </div>
          </Link>
        ))}
      </div>

      <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>💬 Category FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '0.25rem' }}>Are these tools free to use?</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Yes. All tools listed under this category are 100% free and run completely inside your web browser using HTML5 scripts.</p>
          </div>
          <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '0.25rem' }}>Can I use these tools offline?</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Once the page loads, all script calculations happen locally on your computer. You can disconnect your internet and the operations will continue to function.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
