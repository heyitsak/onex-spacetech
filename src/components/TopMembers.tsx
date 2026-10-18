interface TopMember {
  name: string;
  role: string;
  description: string;
}

interface TopMembersProps {
  members: TopMember[];
}

export default function TopMembers({ members }: TopMembersProps) {
  if (!members || members.length === 0) return null;

  return (
    <section className="section-padding pt-0">
      <div className="container-xl">
        <div className="text-center mb-12">
          <span className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-[0.12em]">Leadership</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8ECF4] mt-3 tracking-tight">Top Members</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {members.map((m, i) => (
            <div key={i} className="card p-6">
              <div className="w-10 h-10 rounded-full bg-[rgba(84,114,230,0.1)] border border-[rgba(84,114,230,0.15)] flex items-center justify-center mb-4">
                <span className="text-sm font-semibold text-[#5472E6]">
                  {m.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#E8ECF4] mb-1">{m.name}</h3>
              <p className="text-xs font-medium text-[#5472E6] mb-2">{m.role}</p>
              <p className="text-xs text-[#8A92A5] leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
