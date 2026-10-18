interface ProjectValueProps {
  projectInfo: {
    title: string;
    description: string;
    value: number;
  };
}

export default function ProjectValue({ projectInfo }: ProjectValueProps) {
  const formatted = projectInfo?.value
    ? `$${projectInfo.value.toLocaleString()}+`
    : '—';

  return (
    <section className="section-padding pt-0">
      <div className="container-xl">
        <div className="card-elevated p-8 sm:p-12 lg:p-16 text-center">
          <span className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-[0.12em]">
            {projectInfo?.title || 'Ecosystem Value'}
          </span>
          <div className="mt-6 mb-4">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#E8ECF4] tracking-tight tabular-nums">
              {formatted}
            </span>
          </div>
          <p className="text-[#8A92A5] text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            {projectInfo?.description || ''}
          </p>
        </div>
      </div>
    </section>
  );
}
