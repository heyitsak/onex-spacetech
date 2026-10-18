import SocialLinks from '@/components/SocialLinks';

interface ContactContentProps {
  contactInfo: {
    email: string;
    location: string;
    website: string;
  };
  socialLinks: {
    discord: string;
    youtube: string;
    github: string;
    twitter: string;
  };
}

export default function ContactContent({ contactInfo, socialLinks }: ContactContentProps) {
  const details = [
    { label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { label: 'Location', value: contactInfo.location },
    { label: 'Website', value: contactInfo.website, href: contactInfo.website },
  ];

  return (
    <section className="section-padding pt-32">
      <div className="container-xl">
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-[0.12em]">Connect</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#E8ECF4] mt-3 tracking-tight">Contact</h1>
          <p className="text-[#8A92A5] text-sm mt-4 max-w-md mx-auto">
            Reach out to the community leadership or connect through any of our platforms.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          {details.map(d => (
            <div key={d.label} className="card p-6 text-center">
              <span className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-wider">{d.label}</span>
              {d.href ? (
                <a href={d.href} className="block mt-2 text-sm text-[#5472E6] hover:text-[#6384F2] transition-colors break-all">
                  {d.value}
                </a>
              ) : (
                <p className="mt-2 text-sm text-[#8A92A5]">{d.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <SocialLinks socialLinks={socialLinks} />
        </div>
      </div>
    </section>
  );
}
