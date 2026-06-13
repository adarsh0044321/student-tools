import React, { useState } from 'react';
import { toolsList } from '../toolsList';
import type { ToolId } from '../types';
import * as Icons from 'lucide-react';
import { BannerAd468x60, StudentPromotionalOffers } from '../components/Ads';

interface HomeProps {
  setCurrentTool: (tool: ToolId) => void;
}

type CategoryFilter = 'all' | 'organize' | 'optimize' | 'convert-to' | 'convert-from' | 'edit-pdf' | 'security' | 'pdf-intelligence';

export const Home: React.FC<HomeProps> = ({ setCurrentTool }) => {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = toolsList.filter((tool) => {
    const matchesCategory = filter === 'all' || tool.category === filter;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent size={26} />;
    }
    return <Icons.File size={26} />;
  };

  return (
    <div>
      {/* Hero Header */}
      <section className="hero">
        <h1 className="hero-title">
          Every tool you need to work with <span>PDFs</span>, 100% Free
        </h1>
        <p className="hero-subtitle">
          Keep your studies organized, compress large documents for LMS uploads, and convert files safely in-browser. No uploads to external servers.
        </p>
      </section>

      <div className="tool-grid-container">
        {/* Search and Filters */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '1.25rem'
        }}>
          {/* Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {(['all', 'organize', 'optimize', 'convert-to', 'convert-from', 'edit-pdf', 'security', 'pdf-intelligence'] as CategoryFilter[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  borderRadius: '50px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: filter === cat ? '#e52d27' : '#ffffff',
                  color: filter === cat ? '#ffffff' : '#475569',
                  cursor: 'pointer',
                  transition: '0.15s ease',
                  textTransform: 'capitalize'
                }}
                onMouseEnter={(e) => {
                  if (filter !== cat) e.currentTarget.style.backgroundColor = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  if (filter !== cat) e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                {cat === 'all' ? 'All Tools' : cat.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search PDF tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 1rem',
                fontSize: '0.88rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                outline: 'none',
                transition: '0.15s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff6a00'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="tool-grid">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="tool-card"
              onClick={() => setCurrentTool(tool.id)}
            >
              <div className="tool-icon-wrapper">
                {getIcon(tool.iconName)}
              </div>
              <h3 className="tool-title">{tool.title}</h3>
              <p className="tool-desc">{tool.desc}</p>
              
              <div style={{
                marginTop: '1.25rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#94a3b8',
                backgroundColor: '#f8fafc',
                padding: '0.35rem 0.6rem',
                borderRadius: '4px',
                border: '1px solid #f1f5f9',
                display: 'block'
              }}>
                🎓 {tool.studentContext}
              </div>
            </div>
          ))}
        </div>

        {/* Banner Ad */}
        <BannerAd468x60 />

        {/* Student Smartlink Offers */}
        <StudentPromotionalOffers />
      </div>
    </div>
  );
};
