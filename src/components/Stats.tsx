interface StatsProps {
  stats: {
    members: number;
    services: number;
    projects: number;
    events: number;
  };
}

const items = [
  { key: 'members', label: 'Members', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { key: 'services', label: 'Services', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { key: 'projects', label: 'Projects', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { key: 'events', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
];

export default function Stats({ stats }: StatsProps) {
  return (
    <section className="section-padding">
      <div className="container-xl">
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-[0.12em]">By the Numbers</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8ECF4] mt-3 tracking-tight">Our Reach</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(item => {
            const value = stats[item.key as keyof typeof stats];
            return (
              <div key={item.key} className="card p-6 sm:p-8 text-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#5472E6] mx-auto mb-4">
                  <path d={item.icon} />
                </svg>
                <div className="text-3xl sm:text-4xl font-bold text-[#E8ECF4] tabular-nums mb-1">
                  {value?.toLocaleString() || '0'}
                </div>
                <div className="text-sm text-[#8A92A5] font-medium">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
