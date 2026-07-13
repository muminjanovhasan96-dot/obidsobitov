import Image from "next/image";

/**
 * Brand logo lockup: monogram emblem + "OBID SOBITOV" wordmark.
 *
 * TO USE THE CLIENT'S REAL LOGO:
 *   Replace /public/monogram.svg (the emblem) with the client's mark, or set
 *   `emblem={false}` and keep just the wordmark. If you have a full logo image,
 *   drop it in /public and swap the <Image>/text below for it.
 */
export function Logo({
  tone = "emerald",
  emblem = true,
  className = "",
  size = "md",
}: {
  /** "emerald" for ivory backgrounds, "ivory" for dark/emerald backgrounds. */
  tone?: "emerald" | "ivory";
  emblem?: boolean;
  className?: string;
  size?: "sm" | "md";
}) {
  const wordColor = tone === "ivory" ? "text-ivory" : "text-emerald";
  const wordSize = size === "sm" ? "text-[15px]" : "text-lg md:text-xl";
  const emblemSize = size === "sm" ? 22 : 26;

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {emblem ? (
        <Image
          src="/monogram.svg"
          alt=""
          width={emblemSize}
          height={emblemSize}
          className="shrink-0"
          priority
        />
      ) : null}
      <span
        className={`font-serif tracking-[0.26em] ${wordSize} ${wordColor}`}
      >
        OBID&nbsp;SOBITOV
      </span>
    </span>
  );
}
