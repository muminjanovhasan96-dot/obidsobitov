"use client";

import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "gold-solid" | "gold-outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-sans uppercase tracking-label text-[11px] transition-all duration-500 ease-lux disabled:opacity-40 disabled:pointer-events-none select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  // Primary — emerald fill + ivory text; hover shifts to gold. One per view.
  "gold-solid":
    "bg-emerald text-ivory border border-emerald hover:bg-gold hover:text-emerald-deep hover:border-gold",
  // Secondary — 1px emerald outline; hover fills emerald.
  "gold-outline":
    "border border-emerald text-emerald bg-transparent hover:bg-emerald hover:text-ivory",
  // Ghost — quietest, for tertiary actions.
  ghost: "text-muted hover:text-emerald bg-transparent border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-14 px-9 text-[12px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes(variant: Variant, size: Size, className?: string) {
  return [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = "gold-outline", size = "md", className, children } = props;

    if ("href" in props && props.href !== undefined) {
      const { href, external, onClick } = props;
      const cls = classes(variant, size, className);
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cls}
            onClick={onClick}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={cls} onClick={onClick}>
          {children}
        </Link>
      );
    }

    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props as ButtonAsButton;
    return (
      <button
        ref={ref}
        className={classes(variant, size, className)}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
