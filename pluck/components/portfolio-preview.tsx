/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { PortfolioData, ContentBlock } from "@/types/portfolio";
import {
  Instagram,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  ArrowUpRight
} from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PortfolioPreviewProps {
  data: PortfolioData;
  activeTab?: string;
}

const shell =
  "rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]";
const softCard = "rounded-3xl border border-white/10 bg-white/[0.02]";
const inputChip =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 transition";
//const muted = "text-sm text-zinc-300 leading-relaxed";

export function PortfolioPreview({ data, activeTab }: PortfolioPreviewProps) {
  const initialTab = activeTab || data.tabs[0]?.id;
  const [selectedTabId, setSelectedTabId] = useState(initialTab);
  const currentTab =
    data.tabs.find((t) => t.id === selectedTabId) || data.tabs[0];

  const socials = useMemo(
    () => (data.socialLinks || []).filter(Boolean),
    [data.socialLinks]
  );

  const getSocialIcon = (platform: string) => {
    const icons: Record<string, any> = {
      instagram: Instagram,
      linkedin: Linkedin,
      twitter: Twitter,
      website: Globe,
      email: Mail
    };
    return icons[platform?.toLowerCase()] || Globe;
  };

  return (
    <div className="min-h-full bg-black text-white">
      {/* Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-120px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute right-[-160px] top-[160px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute left-[-160px] bottom-[-120px] h-[520px] w-[520px] rounded-full bg-emerald-500/15 blur-3xl" />
      </div>

      {/* Top Profile */}
      <div className="mx-auto max-w-5xl px-6 pt-12 pb-8">
        <div className={`${shell} p-7 sm:p-10`}>
          <div className="flex flex-col gap-8 items-center">
            <div className=" flex flex-row  md:flex-col items-center justify-between gap-5">
              <div className="flex gap-6">
                <Avatar className="h-16 w-16 ring-1 ring-white/10">
                  <AvatarImage
                    src={
                      data.profileImage ||
                      "/placeholder.svg?height=96&width=96&query=professional+headshot"
                    }
                    alt={data.fullName}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-lime-600 text-white font-semibold">
                    {data.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "UN"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-balance">
                      {data.fullName || "Your Name"}
                    </h1>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {data.professionalTitle || "Your Title"}
                  </p>
                  {data.bio && (
                    <p className="mt-3 max-w-xl text-sm text-zinc-300 leading-relaxed text-pretty">
                      {data.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex md:flex-col gap-3 sm:items-end">
              {/* Primary Contact */}
              <Button className="h-11  rounded-full bg-white text-black hover:text-white">
                Contact Me
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Social Chips */}
              {socials.length > 0 && (
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {socials.map((link, idx) => {
                    const Icon = getSocialIcon(link.platform);
                    return (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={inputChip}
                      >
                        <Icon className="h-4 w-4 text-white/80" />
                        <span className="capitalize">{link.platform}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          {data.tabs.length > 0 && (
            <div className="mt-8 border-t border-white/10 pt-5">
              <div className="relative overflow-x-auto scrollbar-hide">
                <div className="flex min-w-max items-center gap-2">
                  {data.tabs.map((tab) => {
                    const active = tab.id === selectedTabId;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTabId(tab.id)}
                        className={[
                          "relative rounded-full px-4 py-2 text-sm font-semibold transition",
                          active
                            ? "bg-white text-black"
                            : "bg-white/5 text-white/80 hover:bg-white/10"
                        ].join(" ")}
                      >
                        {tab.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Micro text */}
              <p className="mt-3 text-xs text-zinc-400">
                Tip: Tap a tab to explore — everything stays clean &
                mobile-first.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-6">
          {currentTab?.blocks?.map((block, idx) => (
            <BlockRenderer key={idx} block={block} />
          ))}

          {(!currentTab || currentTab.blocks.length === 0) && (
            <div className={`${softCard} p-10 text-center`}>
              <p className="text-sm text-zinc-300">No content added yet.</p>
              <p className="mt-2 text-xs text-zinc-500">
                Add a gallery, video, or experience block to make this page come
                alive.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** ---------------------------
 *  Block Renderer (Redesigned)
 *  --------------------------- */
function BlockRenderer({ block }: { block: ContentBlock }) {
  if (block.type === "gallery") {
    return (
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white/90">Gallery</h3>
          <p className="text-xs text-zinc-400">{block.images.length} items</p>
        </div>

        <div className="columns-2 gap-4 sm:columns-3">
          {block.images.map((img, idx) => (
            <div key={idx} className="mb-4 break-inside-avoid">
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
                <img
                  src={
                    img.url ||
                    `/placeholder.svg?height=600&width=500&query=portfolio+image+${idx}`
                  }
                  alt={img.alt}
                  className="w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />

                {/* hover overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  {img.alt && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-xs font-semibold text-white/90 line-clamp-2">
                        {img.alt}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "video") {
    const getEmbedUrl = (url: string) => {
      if (!url) return url;
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = url.includes("youtu.be")
          ? url.split("youtu.be/")[1]?.split("?")[0]
          : url.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.includes("vimeo.com")) {
        const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
        return `https://player.vimeo.com/video/${videoId}`;
      }
      return url;
    };

    return (
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white/90">
            {block.title || "Featured Video"}
          </h3>
          <span className="text-xs text-zinc-400">Video</span>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="aspect-video">
            <iframe
              src={getEmbedUrl(block.url)}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "experience") {
    return (
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-white/90">Experience</h3>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex gap-4">
            {block.image ? (
              <Image
                src={block.image}
                alt={block.company}
                width={480}
                height={480}
                className="h-12 w-12 rounded-2xl object-cover border border-white/10 bg-white/5"
              />
            ) : (
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-xs text-zinc-300 border border-white/10">
                {block.company?.slice(0, 2)?.toUpperCase() || "EX"}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="text-base font-semibold">{block.title}</h4>
                  <p className="text-sm text-zinc-300">{block.company}</p>
                </div>

                {block.period && (
                  <p className="text-xs text-zinc-400 sm:text-right">
                    {block.period}
                  </p>
                )}
              </div>

              {block.description && (
                <p className="mt-3 text-sm leading-relaxed text-zinc-300 text-pretty">
                  {block.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
