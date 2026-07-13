export type VideoKind = "youtube" | "vimeo" | "file";

/**
 * Parse a video URL (YouTube, Vimeo or a direct .mp4/.webm) into an embeddable
 * source. Returns null if the URL isn't a recognised video.
 */
export function parseVideo(
  url: string,
): { kind: VideoKind; embed: string } | null {
  if (!url) return null;

  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (yt) {
    return {
      kind: "youtube",
      embed: `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1&autoplay=1`,
    };
  }

  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) {
    return { kind: "vimeo", embed: `https://player.vimeo.com/video/${vm[1]}?autoplay=1` };
  }

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
    return { kind: "file", embed: url };
  }

  return null;
}
