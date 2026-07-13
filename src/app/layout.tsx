import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { BackToTop } from "@/components/ui/BackToTop";
import { FloatingTelegram } from "@/components/ui/FloatingTelegram";
import { Preloader } from "@/components/ui/Preloader";
import { Analytics } from "@/components/Analytics";
import { site } from "@/config/site";

// Refined serif for headings.
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
  display: "swap",
});

// Body / UI sans.
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "OBID SOBITOV — Luxury Watches & Designer Pieces",
    template: "%s · OBID SOBITOV",
  },
  description:
    "A luxury concierge boutique in Tashkent. Original watches, designer clothing, bags and accessories. We source any luxury piece on request.",
  keywords: [
    "OBID SOBITOV",
    "luxury watches Tashkent",
    "Rolex Tashkent",
    "Audemars Piguet",
    "Patek Philippe",
    "designer bags Uzbekistan",
    "concierge shopping",
  ],
  openGraph: {
    type: "website",
    title: "OBID SOBITOV — Luxury Watches & Designer Pieces",
    description:
      "A luxury concierge boutique in Tashkent. Original watches, designer clothing, bags and accessories.",
    siteName: "OBID SOBITOV",
    locale: "uz_UZ",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-base text-ink">
        {/* No-flash theme: apply the saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('obid-theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
        {/* Hide the welcome intro for users without JavaScript */}
        <noscript>
          <style>{`.preloader{display:none !important}`}</style>
        </noscript>
        <Providers>
          <Preloader />
          <Header />
          {/* Solid ivory header is fixed; offset content below it. */}
          <main className="pt-[var(--header-h)]">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingTelegram />
          <BackToTop />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
