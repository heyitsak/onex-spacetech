'use client';

import { useState } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
}

interface ServicesProps {
  services: Service[];
}

const categoryIcons: Record<string, string> = {
  'Technology & Software Dev': 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  'Artificial Intelligence': 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'Design': 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
};

export default function Services({ services }: ServicesProps) {
  const [active, setActive] = useState<string | null>(null);

  const grouped: Record<string, Service[]> = {};
  services.forEach(s => {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  });

  const categories = Object.keys(grouped);

  return (
    <section className="section-padding pt-0" id="services">
      <div className="container-xl">
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-[0.12em]">Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8ECF4] mt-3 tracking-tight">Services</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.slice(0, 12).map(cat => (
            <button
              key={cat}
              onClick={() => setActive(active === cat ? null : cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                active === cat
                  ? 'bg-[rgba(84,114,230,0.1)] border-[rgba(84,114,230,0.3)] text-[#5472E6]'
                  : 'border-[rgba(255,255,255,0.06)] text-[#8A92A5] hover:border-[rgba(255,255,255,0.15)] hover:text-[#E8ECF4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(active ? grouped[active] || [] : services.slice(0, 24)).map(service => (
            <div key={service.id} className="card p-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#5472E6] mb-3">
                <path d={categoryIcons[service.category] || 'M13 10V3L4 14h7v7l9-11h-7z'} />
              </svg>
              <h3 className="text-sm font-semibold text-[#E8ECF4] mb-1.5">{service.title}</h3>
              <p className="text-xs text-[#8A92A5] leading-relaxed line-clamp-2">{service.description}</p>
            </div>
          ))}
        </div>

        {categories.length > 12 && (
          <div className="text-center mt-8 text-xs text-[#5A6275]">
            {categories.length} categories &middot; {services.length} total services
          </div>
        )}
      </div>
    </section>
  );
}
