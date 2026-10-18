interface Partner {
  id: number;
  name: string;
  logo: string;
  url: string;
  category?: string;
}

interface PartnersProps {
  partners: Partner[];
}

export default function Partners({ partners }: PartnersProps) {
  if (!partners || partners.length === 0) return null;

  return (
    <section className="section-padding pt-0">
      <div className="container-xl">
        <div className="text-center mb-12">
          <span className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-[0.12em]">Partners</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8ECF4] mt-3 tracking-tight">Trusted By</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {partners.map(p => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 flex items-center justify-center"
            >
              {p.logo ? (
                <img src={p.logo} alt={p.name} className="max-h-8 opacity-40 grayscale hover:opacity-70 transition-opacity" />
              ) : (
                <span className="text-sm text-[#5A6275]">{p.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
