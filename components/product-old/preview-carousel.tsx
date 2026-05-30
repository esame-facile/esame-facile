"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Lock, Eye } from "lucide-react";

interface PreviewCarouselProps {
  slug: string;
  previewCount?: number;
}

export function PreviewCarousel({ slug, previewCount = 3 }: PreviewCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const previews = Array.from({ length: previewCount }, (_, i) => ({
    src: `/images/products/previews/${slug}/preview-${i + 1}.jpg`,
    isBlurred: i === previewCount - 1,
  }));

  // If all images errored, don't show the component
  if (imageErrors.size >= previewCount) return null;

  const next = () => setCurrent((c) => (c + 1) % previewCount);
  const prev = () => setCurrent((c) => (c - 1 + previewCount) % previewCount);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Eye size={16} className="text-primary-500" />
        <h2 className="text-body-lg font-bold">Anteprima del kit</h2>
      </div>

      <div className="relative rounded-brand overflow-hidden bg-neutral-100 border border-neutral-200">
        {/* Image */}
        <div className="relative aspect-[3/4] w-full">
          {previews.map((preview, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-300 ${
                i === current ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={preview.src}
                alt={`Anteprima pagina ${i + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 448px) 100vw, 448px"
                onError={() => setImageErrors((prev) => new Set(prev).add(i))}
              />

              {/* Blur overlay on last image */}
              {preview.isBlurred && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm">
                  <div className="bg-white/90 rounded-2xl p-6 text-center shadow-lg mx-6">
                    <Lock size={28} className="text-primary-500 mx-auto mb-3" />
                    <p className="text-body-md font-bold text-neutral-900 mb-1">
                      25+ schemi nel kit completo
                    </p>
                    <p className="text-body-sm text-neutral-500">
                      Acquista per sbloccare tutto il contenuto
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-neutral-700 hover:bg-white active:scale-95 transition-all"
          aria-label="Pagina precedente"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-neutral-700 hover:bg-white active:scale-95 transition-all"
          aria-label="Pagina successiva"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5">
        {previews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current
                ? "bg-primary-500 w-4"
                : "bg-neutral-300"
            }`}
            aria-label={`Vai a pagina ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
