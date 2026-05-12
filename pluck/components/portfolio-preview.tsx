/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { PortfolioData, ContentBlock } from "@/types/portfolio";
import {
  Instagram,
  Linkedin,
  Globe,
  X,
  Mail,
  Phone,
  MessageCircle,
  ArrowUpRight,
  Youtube,
  Github
} from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

interface PortfolioPreviewProps {
  data: PortfolioData;
  activeTab?: string;
}

const SOCIAL_ICONS: Record<string, any> = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: X,
  website: Globe,
  email: Mail,
  whatsapp: MessageCircle,
  youtube: Youtube,
  github: Github,
  tiktok: X,
  behance: Globe,
  dribbble: Globe
};

function contactIcon(href: string) {
  if (href.startsWith("tel:")) return Phone;
  if (href.includes("wa.me")) return MessageCircle;
  if (href.startsWith("mailto:")) return Mail;
  return ArrowUpRight;
}

export function PortfolioPreview({ data, activeTab }: PortfolioPreviewProps) {
  const initialTab = activeTab || data.tabs[0]?.id;
  const [selectedTabId, setSelectedTabId] = useState(initialTab);
  const currentTab =
    data.tabs.find((t) => t.id === selectedTabId) || data.tabs[0];

  const socials = useMemo(
    () => (data.socialLinks || []).filter(Boolean),
    [data.socialLinks]
  );

  const contactHref = useMemo(() => {
    if (data.showPhone && data.phone) {
      const digits = data.phone.replace(/\D/g, "");
      return `tel:+${digits}`;
    }
    const whatsapp = socials.find(
      (s) => s.platform?.toLowerCase() === "whatsapp"
    );
    if (whatsapp) {
      const digits = whatsapp.url.replace(/\D/g, "");
      return `https://wa.me/${digits}`;
    }
    const email = socials.find((s) => s.platform?.toLowerCase() === "email");
    if (email) return `mailto:${email.url}`;
    return socials[0]?.url ?? null;
  }, [data.showPhone, data.phone, socials]);

  const initials =
    data.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "??";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ── Ambient background ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute right-[-10%] top-[30%] h-[400px] w-[400px] rounded-full bg-fuchsia-600/15 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-emerald-600/10 blur-[100px]" />
      </div>

      {/* ── Hero ── */}
      <div className="mx-auto max-w-2xl px-5 pb-0 pt-16 sm:pt-20">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-6">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/30 to-emerald-500/20 blur-md" />
            <Avatar className="relative h-24 w-24 ring-2 ring-white/10 sm:h-28 sm:w-28">
              <AvatarImage
                src={data.profileImage || ""}
                alt={data.fullName}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-fuchsia-600 text-xl font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name + title */}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {data.fullName || "Your Name"}
          </h1>
          <p className="mt-2 text-base font-medium text-zinc-400">
            {data.professionalTitle || "Professional Title"}
          </p>

          {/* Bio */}
          {data.bio && (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
              {data.bio}
            </p>
          )}

          {/* CTA row */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {contactHref
              ? (() => {
                  const Icon = contactIcon(contactHref);
                  const isNative =
                    contactHref.startsWith("tel:") ||
                    contactHref.startsWith("mailto:");
                  return (
                    <a
                      href={contactHref}
                      target={isNative ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="group inline-flex h-10 items-center gap-2.5 rounded-full bg-white px-7 text-sm font-bold text-black shadow-[0_0_28px_rgba(255,255,255,0.15)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] active:scale-95"
                    >
                      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      Contact Me
                    </a>
                  );
                })()
              : null}

            {/* Social icon chips */}
            {socials
              .filter(
                (s) => s.platform?.toLowerCase() !== "whatsapp" || !contactHref
              )
              .map((link, idx) => {
                const Icon =
                  SOCIAL_ICONS[link.platform?.toLowerCase()] ?? Globe;
                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.platform}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
          </div>
        </div>

        {/* ── Tab navigation ── */}
        {data.tabs.length > 1 && (
          <div className="mt-12 flex items-center gap-1 overflow-x-auto border-b border-white/10 pb-px scrollbar-hide">
            {data.tabs.map((tab) => {
              const active = tab.id === selectedTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTabId(tab.id)}
                  className={[
                    "relative shrink-0 px-4 pb-3 pt-1 text-sm font-semibold transition-colors",
                    active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  ].join(" ")}
                >
                  {tab.name}
                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-white" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-2xl px-5 py-10">
        {!currentTab || currentTab.blocks.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-3xl border border-white/10 bg-white/5 text-2xl">
              🎨
            </div>
            <p className="text-sm text-zinc-500">No content here yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {currentTab.blocks.map((block, idx) => (
              <BlockRenderer key={idx} block={block} />
            ))}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="mx-auto max-w-2xl px-5 pb-10">
        <div className="flex items-center justify-center gap-2 border-t border-white/5 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-600 transition hover:text-zinc-400"
          >
            <span className="grid h-5 w-5 place-items-center rounded-lg bg-white/10 text-[10px] font-bold text-white">
              P
            </span>
            Built with Pluck
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Block Renderers
───────────────────────────────────────── */

function BlockRenderer({ block }: { block: ContentBlock }) {
  if (block.type === "gallery") return <GalleryBlock block={block} />;
  if (block.type === "video") return <VideoBlock block={block} />;
  if (block.type === "experience") return <ExperienceBlock block={block} />;
  return null;
}

function GalleryBlock({
  block
}: {
  block: Extract<ContentBlock, { type: "gallery" }>;
}) {
  if (!block.images.length) return null;
  return (
    <section className="space-y-4">
      <SectionLabel>
        {block.images.length === 1
          ? "Image"
          : `Gallery · ${block.images.length} items`}
      </SectionLabel>
      <div className="columns-2 gap-3 sm:columns-2">
        {block.images.map((img, idx) => (
          <div key={idx} className="mb-3 break-inside-avoid">
            <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/3">
              <img
                src={img.url || `/placeholder.svg?height=600&width=500`}
                alt={img.alt || ""}
                className="w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              {img.alt && (
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-6 transition duration-300 group-hover:translate-y-0">
                  <p className="text-xs font-medium text-white/90 line-clamp-2">
                    {img.alt}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VideoBlock({
  block
}: {
  block: Extract<ContentBlock, { type: "video" }>;
}) {
  const embedUrl = getEmbedUrl(block.url);
  return (
    <section className="space-y-4">
      <SectionLabel>Video</SectionLabel>
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/3">
        {block.title && (
          <div className="border-b border-white/8 px-5 py-3">
            <p className="text-sm font-semibold">{block.title}</p>
          </div>
        )}
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

function ExperienceBlock({
  block
}: {
  block: Extract<ContentBlock, { type: "experience" }>;
}) {
  return (
    <section className="space-y-4">
      <SectionLabel>Experience</SectionLabel>
      <div className="rounded-2xl border border-white/8 bg-white/3 p-5">
        <div className="flex gap-4">
          {/* Logo */}
          <div className="shrink-0">
            {block.image ? (
              <Image
                src={block.image}
                alt={block.company}
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl border border-white/10 object-cover"
              />
            ) : (
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-zinc-300">
                {block.company?.slice(0, 2).toUpperCase() || "CO"}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold leading-tight">{block.title}</p>
                <p className="mt-0.5 text-sm text-zinc-400">{block.company}</p>
              </div>
              {block.period && (
                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-400">
                  {block.period}
                </span>
              )}
            </div>
            {block.description && (
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {block.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
      {children}
    </p>
  );
}

function getEmbedUrl(url: string): string {
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
}
