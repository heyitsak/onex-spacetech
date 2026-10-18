'use client';

import { useState } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  certificate: boolean;
  price: number;
}

interface Certificate {
  id: number;
  name: string;
  description: string;
  issuer: string;
  price: number;
}

interface CoursesContentProps {
  courses: Course[];
  certificates: Certificate[];
}

const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

export default function CoursesContent({ courses, certificates }: CoursesContentProps) {
  const [level, setLevel] = useState('All Levels');
  const [query, setQuery] = useState('');

  const filtered = courses.filter(c => {
    if (level !== 'All Levels' && c.level !== level) return false;
    if (query) {
      const q = query.toLowerCase();
      return c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <section className="section-padding pt-32">
      <div className="container-xl">
        <div className="text-center mb-12">
          <span className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-[0.12em]">Education</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#E8ECF4] mt-3 tracking-tight">Courses &amp; Certifications</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 max-w-xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search courses..."
            className="input flex-1"
          />
          <div className="flex gap-2 flex-wrap justify-center">
            {levels.map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  level === l
                    ? 'bg-[rgba(84,114,230,0.1)] border-[rgba(84,114,230,0.3)] text-[#5472E6]'
                    : 'border-[rgba(255,255,255,0.06)] text-[#8A92A5] hover:border-[rgba(255,255,255,0.15)]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {filtered.map(c => (
            <div key={c.id} className="card p-6">
              <div className="flex items-center gap-2 mb-3">
                {c.certificate && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[rgba(84,114,230,0.1)] text-[#5472E6] border border-[rgba(84,114,230,0.2)]">
                    Certified
                  </span>
                )}
                <span className="text-[10px] font-medium text-[#5A6275] uppercase tracking-wider">{c.level}</span>
                <span className="text-[10px] text-[#5A6275]">{c.duration}</span>
              </div>
              <h3 className="text-sm font-semibold text-[#E8ECF4] mb-2">{c.title}</h3>
              <p className="text-xs text-[#8A92A5] leading-relaxed line-clamp-3">{c.description}</p>
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
                <span className="text-xs text-[#5A6275]">{c.category}</span>
                <span className="text-sm font-semibold text-[#E8ECF4]">${c.price}</span>
              </div>
            </div>
          ))}
        </div>

        {certificates.length > 0 && (
          <>
            <div className="text-center mb-12">
              <span className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-[0.12em]">Credentials</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#E8ECF4] mt-3 tracking-tight">Certificates</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {certificates.map(c => (
                <div key={c.id} className="card p-5 text-center">
                  <div className="w-8 h-8 rounded-full bg-[rgba(84,114,230,0.1)] flex items-center justify-center mx-auto mb-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5472E6" strokeWidth="1.5">
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-[#E8ECF4] mb-1">{c.name}</h3>
                  <p className="text-xs text-[#8A92A5] mb-2">{c.issuer}</p>
                  <p className="text-xs text-[#5A6275] line-clamp-2">{c.description}</p>
                  <div className="mt-3 text-xs font-semibold text-[#5472E6]">${c.price}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
