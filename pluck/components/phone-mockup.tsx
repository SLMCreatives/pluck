"use client";

import type { PortfolioData } from "@/types/portfolio";
import { PortfolioPreview } from "./portfolio-preview";

interface PhoneMockupProps {
  data: PortfolioData;
  activeTab?: string;
}

export function PhoneMockup({ data, activeTab }: PhoneMockupProps) {
  return (
    <div className="flex items-center justify-center min-h-screen  sticky top-0">
      {/* Ambient glow like landing page */}
      {/*  <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-140px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute right-[-180px] top-[160px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute left-[-160px] bottom-[-180px] h-[520px] w-[520px] rounded-full bg-emerald-500/15 blur-3xl" />
      </div> */}

      <div className="relative z-10">
        {/* soft outer glow */}
        <div className="absolute -inset-6 -z-10 rounded-[3.5rem] bg-white/5 blur-2xl" />

        {/* Phone frame */}
        <div className="relative w-[450px] h-[780px] rounded-[3.25rem] p-3 bg-black shadow-2xl ring-1 ring-white/10">
          {/* Frame highlight */}
          <div className="absolute inset-0 rounded-[3.25rem] ring-1 ring-white/5 pointer-events-none" />

          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-44 h-8 bg-black rounded-b-3xl z-20 ring-1 ring-white/5">
            <div className="absolute left-1/2 top-2 -translate-x-1/2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-12 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Screen */}
          <div className="w-full h-full rounded-[2.75rem] overflow-hidden relative bg-black">
            {/* subtle inner border like glass */}
            <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-white/10 rounded-[2.75rem]" />

            {/* Scroll container */}
            <div className="absolute inset-0 overflow-y-auto overscroll-contain scrollbar-hide">
              <PortfolioPreview data={data} activeTab={activeTab} />
            </div>

            {/* Bottom fade mask for realism */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent z-20" />
          </div>
        </div>

        {/* Buttons */}
        <div className="absolute -right-1 top-36 w-1 h-16 bg-zinc-800 rounded-l" />
        <div className="absolute -left-1 top-36 w-1 h-12 bg-zinc-800 rounded-r" />
        <div className="absolute -left-1 top-52 w-1 h-12 bg-zinc-800 rounded-r" />

        {/* label (optional nice touch) */}
        <div className="mt-6 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
            Preview • Mobile-first
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
        </div>
      </div>
    </div>
  );
}
