'use client';

export default function EasterOrbital() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 1440 900"
        className="w-full h-full"
        style={{ position: 'absolute', inset: 0 }}
      >
        <path
          d="M200 750 C400 600, 600 350, 900 200 C1000 150, 1200 140, 1350 180"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: 1600,
            strokeDashoffset: 1600,
            animation: 'orbitalFlash 2.5s ease-out forwards',
          }}
        />
      </svg>
    </div>
  );
}
