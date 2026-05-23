"use client";

import { PortfolioPreview } from "@/components/portfolio-preview";
import type { PortfolioData } from "@/types/portfolio";

const MOCK: PortfolioData = {
  fullName: "Aisha Rahman",
  professionalTitle: "Brand & Motion Designer",
  bio: "Crafting visual identities that make brands impossible to ignore. 4+ years across FMCG, tech, and lifestyle categories.",
  profileImage: "https://randomuser.me/api/portraits/women/42.jpg",
  phone: "+60123456789",
  showPhone: true,
  socialLinks: [
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "linkedin", url: "https://linkedin.com" },
    { platform: "behance", url: "https://behance.net" }
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
              url: "https://picsum.photos/seed/pluck-a/400/520",
              alt: "Brand identity — Kopi Kita Co."
            },
            {
              url: "https://picsum.photos/seed/pluck-b/400/600",
              alt: "Campaign — Nestlé MY 2024"
            },
            {
              url: "https://picsum.photos/seed/pluck-c/500/420",
              alt: "UI Design — fintech app"
            },
            {
              url: "https://picsum.photos/seed/pluck-d/400/480",
              alt: "Packaging — skincare brand"
            }
          ]
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
          title: "Brand reel — 2024 highlights"
        }
      ]
    },
    {
      id: "xp",
      name: "Experience",
      blocks: [
        {
          type: "experience",
          title: "Senior Brand Designer",
          company: "Kasama Studio",
          period: "2022 — Present",
          description:
            "Led visual identity work for 12+ regional brands. Owned the motion design pipeline end-to-end and managed a team of 3 junior designers."
        },
        {
          type: "experience",
          title: "Visual Designer",
          company: "BBDO Malaysia",
          period: "2020 — 2022",
          description:
            "Campaign assets for Maxis, Digi, and McDonald's Malaysia. Specialised in OOH and digital production."
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
            gopeek.my/aisha
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
