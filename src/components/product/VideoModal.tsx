"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { parseVideo } from "@/lib/video";

/** Fullscreen review-video player. Supports YouTube, Vimeo and direct .mp4. */
export function VideoModal({
  open,
  onClose,
  url,
  title,
}: {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
}) {
  const video = parseVideo(url);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && video ? (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-emerald-deep/95 p-4 backdrop-blur-md md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 text-ivory/80 transition-colors hover:text-gold"
          >
            <X size={28} strokeWidth={1.3} />
          </button>

          <motion.div
            className="relative w-full max-w-5xl overflow-hidden border border-gold/25 bg-black"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full">
              {video.kind === "file" ? (
                <video
                  src={video.embed}
                  controls
                  autoPlay
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <iframe
                  src={video.embed}
                  title={title}
                  allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
