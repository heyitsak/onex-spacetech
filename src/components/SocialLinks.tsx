interface SocialLinksProps {
  socialLinks: {
    discord: string;
    youtube: string;
    github: string;
    twitter: string;
  };
}

const platforms = [
  { key: 'discord', label: 'Discord', path: 'M14.73 2H9.27C5.82 2 3 4.82 3 8.27v7.46C3 19.18 5.82 22 9.27 22h5.46c3.45 0 6.27-2.82 6.27-6.27V8.27C21 4.82 18.18 2 14.73 2zM12 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-8H9V8h6v2z' },
  { key: 'youtube', label: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z' },
  { key: 'github', label: 'GitHub', path: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z' },
  { key: 'twitter', label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
];

export default function SocialLinks({ socialLinks }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-3">
      {platforms.map(p => {
        const url = socialLinks[p.key as keyof typeof socialLinks];
        if (!url) return null;
        return (
          <a
            key={p.key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="card p-2.5 flex items-center gap-2"
            aria-label={p.label}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#8A92A5]">
              <path d={p.path} />
            </svg>
            <span className="text-xs text-[#8A92A5] hidden sm:inline">{p.label}</span>
          </a>
        );
      })}
    </div>
  );
}
