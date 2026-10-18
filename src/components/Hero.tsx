interface HeroProps {
  communityName: string;
  tagline: string;
  inspirational?: { quote: string; author: string };
}

export default function Hero({ communityName, tagline, inspirational }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-6 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5472E6]/[0.03] via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#5472E6]/[0.02] blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.06)] to-transparent" />
      </div>

      <div className="relative text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5472E6]" />
          <span className="text-[11px] font-medium text-[#8A92A5] uppercase tracking-wider">Private Community</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#E8ECF4] leading-[1.05] mb-6 text-balance">
          {communityName}
        </h1>

        <p className="text-lg sm:text-xl text-[#8A92A5] font-light leading-relaxed max-w-2xl mx-auto mb-10">
          {tagline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/courses" className="btn-primary px-8 py-3 text-sm">
            Explore Courses
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 7h12M7 1l6 6-6 6" />
            </svg>
          </a>
          <a href="/contact" className="btn-secondary px-8 py-3 text-sm">
            Get in Touch
          </a>
        </div>

        {inspirational?.quote && (
          <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.04)] max-w-lg mx-auto">
            <p className="text-sm text-[#5A6275] italic leading-relaxed">
              &ldquo;{inspirational.quote}&rdquo;
            </p>
            {inspirational.author && (
              <p className="text-xs text-[#5A6275] mt-2 font-medium">
                — {inspirational.author}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
