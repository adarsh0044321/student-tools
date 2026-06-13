'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toolsList } from '../toolsList';
import * as Icons from 'lucide-react';

type CategoryFilter = 'all' | 'organize' | 'optimize' | 'convert-to' | 'convert-from' | 'edit-pdf' | 'security' | 'pdf-intelligence' | 'student-tools' | 'productivity-tools';

export const HomeToolsList: React.FC = () => {
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
    <div className="tool-grid-container">
      {/* Search and Filters */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2.5rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '1.5rem'
      }}>
        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {([
            'all', 'organize', 'optimize', 'convert-to', 'convert-from', 'edit-pdf', 'security', 'pdf-intelligence', 'student-tools', 'productivity-tools'
          ] as CategoryFilter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.55rem 1.1rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                borderRadius: '50px',
                border: '1px solid var(--border-color)',
                backgroundColor: filter === cat ? '#e52d27' : 'var(--white)',
                color: filter === cat ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: '0.15s ease',
                textTransform: 'capitalize'
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
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1.1rem',
              fontSize: '0.85rem',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--white)',
              color: 'var(--text-main)',
              borderRadius: '8px',
              outline: 'none',
              transition: '0.15s ease'
            }}
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="tool-grid">
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
            
            <div style={{
              marginTop: 'auto',
              paddingTop: '1rem',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#ff6a00',
              display: 'block'
            }}>
              🎓 {tool.studentContext}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
