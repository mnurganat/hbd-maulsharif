"use client";

import { useState } from "react";
import Image from "next/image";
import { GALLERY_PHOTOS } from "@/config/event";

// Placeholder colors for when no real photos exist yet
const PLACEHOLDER_COLORS = [
  "#1a0033", "#0d1a33", "#1a1a0d", "#0d331a",
  "#33001a", "#001a33", "#1a330d", "#33100d",
  "#0d0033", "#330d1a", "#1a0d33", "#0d330d",
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos = GALLERY_PHOTOS;
  const hasPhotos = photos.length > 0;

  const goNext = () => setLightbox((prev) => (prev === null ? null : (prev + 1) % photos.length));
  const goPrev = () => setLightbox((prev) => (prev === null ? null : (prev - 1 + photos.length) % photos.length));

  return (
    <section id="gallery" className="relative z-10 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-[#9d7cc8] text-xs tracking-[0.3em] uppercase mb-3">воспоминания</p>
          <h2 className="font-display font-black text-3xl md:text-4xl glow-cyan text-[#00e5ff]">
            Фотогалерея 📸
          </h2>
        </div>

        {hasPhotos ? (
          /* Real photos grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="relative aspect-square rounded-xl overflow-hidden neon-card group cursor-pointer"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#bf00ff10] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        ) : (
          /* Placeholder state */
          <div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 opacity-40">
              {PLACEHOLDER_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl border border-[#3d0060]"
                  style={{ background: color }}
                />
              ))}
            </div>
            <p className="text-center text-[#9d7cc8] text-sm mt-6">
              📸 Фото скоро появятся
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && hasPhotos && (
        <div
          className="lightbox-overlay fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-[#ff2d78] transition-colors z-10 p-2"
            aria-label="Предыдущее фото"
          >
            ‹
          </button>

          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto object-contain rounded-xl"
            />
            <p className="text-center text-[#9d7cc8] text-sm mt-2">
              {lightbox + 1} / {photos.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-[#ff2d78] transition-colors z-10 p-2"
            aria-label="Следующее фото"
          >
            ›
          </button>

          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white text-2xl hover:text-[#ff2d78] transition-colors p-2"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
