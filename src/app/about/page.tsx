import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of OBID SOBITOV — a luxury concierge boutique on Mirabad Avenue, Tashkent. Visit us, call, or reach out on Instagram.",
};

export default function AboutPage() {
  return <AboutView />;
}
