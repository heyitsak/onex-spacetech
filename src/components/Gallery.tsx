'use client';

import { useState } from 'react';

interface GalleryItem {
  url: string;
  description?: string;
}

interface GalleryProps {
  images: GalleryItem[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);
  if (!images || images.length === 0) return null;

  return (
    <section className="section-padding pt-0">
      <div className="container-xl">
        <div className="text-center mb-12">
          <span className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-[0.12em]">Media</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8ECF4] mt-3 tracking-tight">Gallery</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="card overflow-hidden aspect-[4/3] p-0 group"
            >
              <img
                src={img.url}
                alt={img.description || ''}
                className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-80"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.9)] flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 text-[#8A92A5] hover:text-[#E8ECF4] transition-colors"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <img
            src={images[selected].url}
            alt={images[selected].description || ''}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        </div>
      )}
    </section>
  );
}
