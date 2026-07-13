import { Hero } from "@/components/home/Hero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { FeaturedTimepieces } from "@/components/home/FeaturedTimepieces";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Lookbook } from "@/components/home/Lookbook";
import { ConciergeTeaser } from "@/components/home/ConciergeTeaser";
import { TrustRow } from "@/components/home/TrustRow";
import { InstagramStrip } from "@/components/home/InstagramStrip";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <FeaturedTimepieces />
      <CategoryGrid />
      <Lookbook />
      <ConciergeTeaser />
      <TrustRow />
      <InstagramStrip />
      <Testimonials />
    </>
  );
}
