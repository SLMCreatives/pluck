"use client";

import { PortfolioPreview } from "@/components/portfolio-preview";
import type { PortfolioData } from "@/types/portfolio";

const MOCK: PortfolioData = {
  fullName: "Sulaiman",
  professionalTitle: "Web Designer & Digital Strategist",
  bio: "I build clean, fast digital experiences for Malaysian brands and freelancers. Founder of GoPeek — because every freelancer deserves a portfolio that works as hard as they do.",
  profileImage: "/sulaiman.jpg",
  phone: "",
  showPhone: false,
  socialLinks: [
    { platform: "linkedin", url: "https://www.linkedin.com/in/sulaiman-shafiq-208054193/" },
    { platform: "website", url: "https://slmcreatives.com" }
  ],
  tabs: [
    {
      id: "work",
      name: "Work",
      blocks: [
        {
          type: "gallery",
          images: [
            {
              url: "https://picsum.photos/seed/slm-a/400/520",
              alt: "GoPeek — portfolio builder"
            },
            {
              url: "https://picsum.photos/seed/slm-b/400/600",
              alt: "Brand identity — SLM Creatives"
            },
            {
              url: "https://picsum.photos/seed/slm-c/500/420",
              alt: "Web design — client project"
            },
            {
              url: "https://picsum.photos/seed/slm-d/400/480",
              alt: "UI — dashboard redesign"
            }
          ]
        }
      ]
    },
    {
      id: "xp",
      name: "About",
      blocks: [
        {
          type: "experience",
          title: "Founder",
          company: "GoPeek",
          period: "2025 — Present",
          description:
            "Building the simplest portfolio builder for Malaysian freelancers. GoPeek lets you go live in 5 minutes — no design skills needed."
        },
        {
          type: "experience",
          title: "Creative Director",
          company: "SLM Creatives",
          period: "2020 — Present",
          description:
            "Web design, brand strategy, and digital campaigns for SMEs and startups across Malaysia."
        }
      ]
    }
  ]
};

export function MockupHero() {
  return (
    <div className="relative select-none">
      {/* glow halo */}
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-indigo-500/10 blur-3xl" />

      {/* browser frame */}
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.7)]">
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.03] px-5 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/60" />
            <span className="h-3 w-3 rounded-full bg-green-400/60" />
          </div>
          <div className="rounded-md bg-white/5 px-4 py-1.5 text-[11px] font-medium text-zinc-400">
            gopeek.my/sulaimanshafiq
          </div>
          <div className="w-14" />
        </div>

        {/* scaled portfolio preview */}
        <div className="relative h-[520px] overflow-hidden">
          <div
            className="pointer-events-none absolute top-0"
            style={{
              transform: "scale(0.58)",
              transformOrigin: "top center",
              width: `${(1 / 0.58) * 100}%`,
              left: `-${((1 / 0.58 - 1) / 2) * 100}%`
            }}
          >
            <PortfolioPreview data={MOCK} activeTab="work" />
          </div>

          {/* fade out at the bottom to avoid hard clip */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>
      </div>
    </div>
  );
}
