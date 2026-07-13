import type { ElementType, ReactNode } from "react";

/**
 * Section wrapper — consistent max-width and generous vertical rhythm.
 * Use `bleed` to run edge-to-edge (still padded on the sides).
 */
export function Section({
  children,
  as: Tag = "section",
  className = "",
  container = true,
  padded = true,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Wrap children in the centered max-width shell. */
  container?: boolean;
  /** Apply the default vertical padding. */
  padded?: boolean;
}) {
  const vertical = padded ? "py-20 md:py-28" : "";
  return (
    <Tag className={`${vertical} ${className}`}>
      {container ? (
        <div className="mx-auto w-full max-w-shell px-6 md:px-10">{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}

/** Small section header: gold eyebrow + serif title + optional subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ? <span className="eyebrow mb-4">{eyebrow}</span> : null}
      <h2 className="max-w-2xl text-3xl leading-tight md:text-[42px] md:leading-[1.1]">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 max-w-xl text-[15px] leading-relaxed text-muted ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/** Thin gold divider between sections. */
export function GoldRule({ className = "" }: { className?: string }) {
  return <div className={`rule-gold ${className}`} aria-hidden="true" />;
}
