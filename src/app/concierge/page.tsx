import type { Metadata } from "next";
import { ConciergeView } from "@/components/concierge/ConciergeView";

export const metadata: Metadata = {
  title: "Concierge",
  description:
    "Our personal-shopping service — we find and import any luxury item on request. Tell us what you're looking for and we handle the rest.",
};

export default function ConciergePage() {
  return <ConciergeView />;
}
