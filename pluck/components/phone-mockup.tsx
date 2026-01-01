"use client"

import type { PortfolioData } from "@/types/portfolio"
import { PortfolioPreview } from "./portfolio-preview"

interface PhoneMockupProps {
  data: PortfolioData
  activeTab?: string
}

export function PhoneMockup({ data, activeTab }: PhoneMockupProps) {
  return (
    <div className="hidden lg:flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 sticky top-0">
      <div className="relative">
        {/* Phone frame */}
        <div className="relative w-[380px] h-[780px] bg-black rounded-[3rem] p-3 shadow-2xl ring-1 ring-white/10">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />

          {/* Screen */}
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            <div className="absolute inset-0 overflow-y-auto">
              <PortfolioPreview data={data} activeTab={activeTab} />
            </div>
          </div>
        </div>

        {/* Power button */}
        <div className="absolute -right-1 top-32 w-1 h-16 bg-zinc-800 rounded-l" />

        {/* Volume buttons */}
        <div className="absolute -left-1 top-32 w-1 h-12 bg-zinc-800 rounded-r" />
        <div className="absolute -left-1 top-48 w-1 h-12 bg-zinc-800 rounded-r" />
      </div>
    </div>
  )
}
