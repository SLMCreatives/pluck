import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { DiscoveryPageClient } from "./DiscoveryPageClient";

export const metadata: Metadata = {
  title: "Discover Creators — GoPeek",
  description: "Browse portfolios from Malaysian freelancers and creators on GoPeek.",
};

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <DiscoveryPageClient />
    </div>
  );
}
