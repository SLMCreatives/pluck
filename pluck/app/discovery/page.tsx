import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { DiscoveryPageClient } from "./DiscoveryPageClient";

export const metadata: Metadata = {
  title: "Discover Malaysian Freelancers & Creators — GoPeek",
  description:
    "Browse live portfolios from Malaysian freelancers — designers, developers, photographers, videographers, copywriters and more. Find talent or get inspired on GoPeek.",
  keywords: [
    "Malaysian freelancers",
    "freelancer portfolio Malaysia",
    "discover Malaysian designers",
    "Malaysian developers portfolio",
    "find freelancers Malaysia",
    "Malaysian creatives",
    "portfolio directory Malaysia",
    "GoPeek creators",
  ],
  alternates: { canonical: "/discovery" },
  openGraph: {
    title: "Discover Malaysian Freelancers & Creators — GoPeek",
    description:
      "Browse live portfolios from Malaysian freelancers — designers, developers, photographers, videographers, copywriters and more.",
    url: "https://gopeek.my/discovery",
    siteName: "GoPeek",
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/GoPeek.png",
        width: 1200,
        height: 630,
        alt: "Discover Malaysian Freelancers — GoPeek",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Malaysian Freelancers & Creators — GoPeek",
    description:
      "Browse live portfolios from Malaysian freelancers — designers, developers, photographers and more.",
    images: ["/GoPeek.png"],
  },
};

export default function DiscoveryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Discover Malaysian Freelancers & Creators",
            description:
              "A public directory of live portfolios from Malaysian freelancers built on GoPeek — designers, developers, photographers, videographers, copywriters and more.",
            url: "https://gopeek.my/discovery",
            isPartOf: { "@type": "WebSite", name: "GoPeek", url: "https://gopeek.my" },
            about: {
              "@type": "Thing",
              name: "Malaysian Freelancer Portfolios",
            },
          }),
        }}
      />
      <div className="min-h-screen bg-black text-white">
        <SiteHeader />
        <DiscoveryPageClient />
      </div>
    </>
  );
}
