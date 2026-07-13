"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

/**
 * Product image gallery with a soft cross-fade + thumbnails, and a fullscreen
 * lightbox (click the main image to zoom, arrow keys / buttons to navigate).
 */
export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const gallery = images.length ? images : [""];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const go = (dir: number) =>
    setActive((i) => (i + dir + gallery.length) % gallery.length);

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, gallery.length]);

  return (
    <>
      <div className="flex flex-col-reverse gap-4 lg:flex-row">
        {/* Thumbnails */}
        {gallery.length > 1 ? (
          <div className="flex gap-3 lg:flex-col">
            {gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${alt} — ${i + 1}`}
                className={`relative aspect-square w-16 shrink-0 overflow-hidden border transition-colors duration-300 lg:w-20 ${
                  active === i
                    ? "border-gold"
                    : "border-line opacity-70 hover:opacity-100"
                }`}
              >
                <SafeImage src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}

        {/* Main image */}
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="group relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden bg-surface"
          aria-label={alt}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <SafeImage
                src={gallery[active]}
                alt={alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-base/80 text-emerald opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
            <Expand size={16} strokeWidth={1.5} />
          </span>
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-emerald-deep/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close"
              className="absolute right-6 top-6 z-10 text-ivory/80 transition-colors hover:text-gold"
            >
              <X size={28} strokeWidth={1.3} />
            </button>

            {gallery.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous"
                  className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center text-ivory/70 transition-colors hover:text-gold md:left-8"
                >
                  <ChevronLeft size={30} strokeWidth={1.2} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next"
                  className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center text-ivory/70 transition-colors hover:text-gold md:right-8"
                >
                  <ChevronRight size={30} strokeWidth={1.2} />
                </button>
              </>
            ) : null}

            <motion.div
              key={active}
              className="relative h-[82vh] w-[90vw] max-w-4xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage
                src={gallery[active]}
                alt={alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>

            <span className="nums absolute bottom-6 left-1/2 -translate-x-1/2 text-[12px] tracking-widest text-ivory/70">
              {active + 1} / {gallery.length}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
