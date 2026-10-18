'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-[#0A0C10]/90 backdrop-blur-md border-b border-[rgba(255,255,255,0.04)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-[#5472E6] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">X</span>
          </div>
          <span className="text-sm font-semibold text-[#E8ECF4] tracking-tight">OneX</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm text-[#8A92A5] hover:text-[#E8ECF4] rounded-md transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            className="ml-4 px-4 py-2 text-sm font-medium text-white bg-[#5472E6] rounded-md hover:bg-[#6384F2] transition-colors"
          >
            Admin
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-[#8A92A5] hover:text-[#E8ECF4]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[rgba(255,255,255,0.04)] bg-[#0A0C10]">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-[#8A92A5] hover:text-[#E8ECF4] rounded-md hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="mt-2 px-3 py-2.5 text-sm font-medium text-white bg-[#5472E6] rounded-md text-center"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
