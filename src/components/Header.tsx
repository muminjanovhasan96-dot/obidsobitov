"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X, Search, Heart } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { SearchOverlay } from "@/components/search/SearchOverlay";

type NavItem = { href: string; key: string };

const NAV: NavItem[] = [
  { href: "/", key: "nav.home" },
  { href: "/catalog", key: "nav.catalog" },
  { href: "/concierge", key: "nav.concierge" },
  { href: "/about", key: "nav.about" },
];

export function Header() {
  const { t } = useLocale();
  const { count, isReady, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 h-[var(--header-h)] border-b transition-all duration-500 ${
          scrolled
            ? "border-hairline bg-base/85 backdrop-blur-xl"
            : "border-line bg-base"
        }`}
      >
        <div className="mx-auto flex h-full max-w-shell items-center justify-between px-6 md:px-10">
          {/* Left — wordmark */}
          <Link href="/" aria-label="OBID SOBITOV — home">
            <Logo emblem={false} />
          </Link>

          {/* Center — nav (desktop) */}
          <nav className="hidden items-center gap-10 lg:flex">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative text-[11px] uppercase tracking-label transition-colors duration-300 ${
                    active ? "text-emerald" : "text-muted hover:text-emerald"
                  }`}
                >
                  {t(item.key)}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-500 ease-lux ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right — language + search + wishlist + cart + mobile trigger */}
          <div className="flex items-center gap-4 md:gap-5">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="text-emerald transition-colors duration-300 hover:text-gold"
              aria-label={t("search.title")}
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            <Link
              href="/wishlist"
              className="relative hidden text-emerald transition-colors duration-300 hover:text-gold sm:block"
              aria-label={t("wishlist.title")}
            >
              <Heart size={19} strokeWidth={1.5} />
              {wishCount > 0 ? (
                <span className="nums absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-emerald-deep">
                  {wishCount}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              className="relative text-emerald transition-colors duration-300 hover:text-gold"
              aria-label={t("nav.cart")}
            >
              <ShoppingBag size={19} strokeWidth={1.4} />
              {isReady && count > 0 ? (
                <span className="nums absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-emerald-deep">
                  {count}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              className="text-emerald transition-colors duration-300 hover:text-gold lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label={t("nav.menu")}
            >
              <Menu size={22} strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-emerald-deep/30 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col border-l border-line bg-base lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex h-[var(--header-h)] items-center justify-between border-b border-line px-6">
                <Logo emblem={false} size="sm" />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label={t("nav.close")}
                  className="text-muted transition-colors hover:text-gold"
                >
                  <X size={22} strokeWidth={1.4} />
                </button>
              </div>

              <nav className="flex flex-col px-6 py-8">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      className={`block border-b border-line py-5 font-serif text-2xl transition-colors duration-300 ${
                        isActive(item.href) ? "text-gold" : "text-emerald"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + NAV.length * 0.06, duration: 0.4 }}
                >
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 border-b border-line py-5 font-serif text-2xl text-emerald transition-colors duration-300"
                  >
                    <Heart size={20} strokeWidth={1.4} />
                    {t("wishlist.title")}
                    {wishCount > 0 ? (
                      <span className="nums text-base text-gold">
                        ({wishCount})
                      </span>
                    ) : null}
                  </Link>
                </motion.div>
              </nav>

              <div className="mt-auto flex items-center justify-between border-t border-line px-6 py-6">
                <div className="flex items-center gap-5">
                  <LanguageSwitcher align="left" />
                  <ThemeToggle />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openDrawer();
                  }}
                  className="flex items-center gap-2 text-[11px] uppercase tracking-label text-muted hover:text-gold"
                >
                  <ShoppingBag size={17} strokeWidth={1.4} />
                  {t("nav.cart")}
                  {isReady && count > 0 ? ` (${count})` : ""}
                </button>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      {/* Search */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
