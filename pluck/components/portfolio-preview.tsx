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
  Github,
  Moon,
  Sun,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import type { Id } from "@/convex/_generated/dataModel";
import { InlineEmojiReactions } from "@/components/emoji-reactions";

interface PortfolioPreviewProps {
  data: PortfolioData;
  activeTab?: string;
  showBadge?: boolean;
  profileId?: Id<"profiles">;
  initialTheme?: "light" | "dark";
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
  dribbble: Globe,
};

function contactIcon(href: string) {
  if (href.startsWith("tel:")) return Phone;
  if (href.includes("wa.me")) return MessageCircle;
  if (href.startsWith("mailto:")) return Mail;
  return ArrowUpRight;
}

function normaliseSocialHref(platform: string, url: string): string {
  const p = platform?.toLowerCase();
  if (p === "email") return url.startsWith("mailto:") ? url : `mailto:${url}`;
  if (p === "whatsapp") {
    const digits = url.replace(/\D/g, "");
    return url.includes("wa.me") ? url : `https://wa.me/${digits}`;
  }
  if (p === "phone") {
    const digits = url.replace(/\D/g, "");
    return url.startsWith("tel:") ? url : `tel:+${digits}`;
  }
  return url;
}

export function PortfolioPreview({
  data,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  activeTab: _activeTab,
  showBadge = true,
  profileId,
  initialTheme = "light",
}: PortfolioPreviewProps) {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);
  useEffect(() => { setTheme(initialTheme); }, [initialTheme]);
  const light = theme === "light";

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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        light ? "bg-[#F7F7FA] text-slate-900" : "bg-[#080808] text-white"
      }`}
    >
      <style>{`
        @keyframes pf-orb-1 {
          0%,100% { transform: translate(-50%,-25%) scale(1); }
          50%      { transform: translate(-50%,calc(-25% - 40px)) scale(1.08); }
        }
        @keyframes pf-orb-2 {
          0%,100% { transform: translate(0,0); }
          33%     { transform: translate(-30px,25px); }
          66%     { transform: translate(18px,-18px); }
        }
        @keyframes pf-orb-3 {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(25px,-30px); }
        }
        .pf-orb-1 { animation: pf-orb-1 14s ease-in-out infinite; }
        .pf-orb-2 { animation: pf-orb-2 20s ease-in-out infinite; }
        .pf-orb-3 { animation: pf-orb-3 16s ease-in-out infinite; }
      `}</style>

      {/* Dark-mode ambient background */}
      {!light && (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-indigo-950/55 via-indigo-950/18 to-transparent" />
          <div className="pf-orb-1 absolute left-1/2 top-0 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-indigo-500/22 blur-[110px]" />
          <div className="pf-orb-2 absolute right-[-6%] top-[22%] h-[360px] w-[360px] rounded-full bg-fuchsia-500/16 blur-[95px]" />
          <div className="pf-orb-3 absolute left-[-6%] bottom-[8%] h-[320px] w-[320px] rounded-full bg-violet-500/13 blur-[95px]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              opacity: 0.35,
            }}
          />
        </div>
      )}

      {/* Constrained content wrapper */}
      <div className="mx-auto max-w-md sm:max-w-2xl">

      {/* ── Cover photo (or plain top bar) ── */}
      {data.coverImage ? (
        <div className="relative h-44 w-full overflow-hidden">
          <img src={data.coverImage} alt="Cover" className="h-full w-full object-cover" />
          {/* Scrim so avatar ring blends */}
          <div
            className={`absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t ${
              light ? "from-[#F7F7FA]" : "from-[#080808]"
            } to-transparent`}
          />
          {/* Theme toggle overlaid */}
          <button
            onClick={() => setTheme(light ? "dark" : "light")}
            aria-label="Toggle theme"
            className={`absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border backdrop-blur transition-all duration-200 active:scale-95 ${
              light
                ? "border-white/60 bg-white/80 text-slate-600 hover:bg-white"
                : "border-white/15 bg-black/50 text-zinc-300 hover:text-white"
            }`}
          >
            {light ? <Moon className="h-[15px] w-[15px]" /> : <Sun className="h-[15px] w-[15px]" />}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end px-5 pt-5 pb-1">
          <button
            onClick={() => setTheme(light ? "dark" : "light")}
            aria-label="Toggle theme"
            className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-200 active:scale-95 ${
              light
                ? "border-slate-200 bg-white text-slate-500 shadow-sm hover:border-slate-300 hover:text-slate-700"
                : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {light ? <Moon className="h-[15px] w-[15px]" /> : <Sun className="h-[15px] w-[15px]" />}
          </button>
        </div>
      )}

      {/* ── Hero ── */}
      <div className={`px-6 pb-6 text-center ${data.coverImage ? "-mt-14" : "pt-3"}`}>
        {/* Avatar with soft halo */}
        <div className="relative mx-auto w-fit">
          <div
            className={`absolute rounded-full transition-colors duration-300 ${
              light ? "bg-indigo-100" : "bg-indigo-500/15"
            }`}
            style={{ inset: "-14px" }}
          />
          <Avatar
            className={`relative h-24 w-24 ring-4 transition-all duration-300 ${
              light
                ? "ring-[#F7F7FA] shadow-lg shadow-indigo-100/60"
                : "ring-[#080808]"
            }`}
          >
            <AvatarImage
              src={data.profileImage || ""}
              alt={data.fullName}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-violet-500 text-xl font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Hello, I'm */}
        <p
          className={`mt-5 text-sm font-semibold ${
            light ? "text-indigo-500" : "text-indigo-400"
          }`}
        >
          Hello, I&apos;m
        </p>

        {/* Name */}
        <h1
          className={`mt-0.5 text-[2.25rem] font-black tracking-[-0.03em] leading-tight ${
            light ? "text-slate-900" : "text-white"
          }`}
        >
          {data.fullName || "Your Name"}
        </h1>

        {/* Title */}
        <p
          className={`mt-1.5 text-[0.8125rem] font-semibold ${
            light ? "text-indigo-500" : "text-indigo-400"
          }`}
        >
          {data.professionalTitle || "Professional Title"}
        </p>

        {/* Bio */}
        {data.bio && (
          <p
            className={`mt-3 text-[0.8125rem] leading-relaxed ${
              light ? "text-slate-500" : "text-zinc-400/80"
            }`}
          >
            {data.bio}
          </p>
        )}

        {/* Social icons */}
        {socials.length > 0 && (
          <div className="mt-5 flex items-center justify-center gap-2.5">
            {socials.map((link, idx) => {
              const Icon = SOCIAL_ICONS[link.platform?.toLowerCase()] ?? Globe;
              const href = normaliseSocialHref(link.platform, link.url);
              const isNative =
                href.startsWith("mailto:") || href.startsWith("tel:");
              return (
                <a
                  key={idx}
                  href={href}
                  target={isNative ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  title={link.platform}
                  className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                    light
                      ? "border-slate-200 bg-white text-slate-500 shadow-sm hover:border-indigo-200 hover:text-indigo-500 hover:shadow-[0_4px_12px_rgba(99,102,241,0.15)]"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white hover:shadow-[0_4px_14px_rgba(0,0,0,0.3)]"
                  }`}
                >
                  <Icon className="h-[15px] w-[15px]" />
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Content sections ── */}
      <div className="space-y-8 px-5 pb-8">
        {data.tabs.map((tab) =>
          tab.blocks.length > 0 ? (
            <section key={tab.id}>
              <div className="mb-3 flex items-center justify-between">
                <h2
                  className={`text-[0.9375rem] font-bold ${
                    light ? "text-slate-900" : "text-white"
                  }`}
                >
                  {tab.name}
                </h2>
              </div>
              <div className="space-y-4">
                {tab.blocks.map((block, idx) => (
                  <BlockRenderer
                    key={idx}
                    block={block}
                    light={light}
                    tabName={tab.name}
                  />
                ))}
              </div>
            </section>
          ) : null
        )}
      </div>

      {/* ── Emoji reactions ── */}
      {profileId && (
        <div className="px-5 pb-4">
          <InlineEmojiReactions profileId={profileId} light={light} />
        </div>
      )}

      {/* ── Footer badge ── */}
      {showBadge && (
        <div className="px-5 pb-10">
          <div
            className={`flex items-center justify-center gap-2 border-t pt-6 ${
              light ? "border-slate-100" : "border-white/[0.05]"
            }`}
          >
            <Link
              href="/"
              className={`inline-flex items-center gap-1.5 text-xs transition-colors ${
                light
                  ? "text-slate-400 hover:text-slate-600"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              <span
                className={`grid h-5 w-5 place-items-center rounded-lg text-[10px] font-bold ${
                  light ? "bg-slate-100 text-slate-700" : "bg-white/10 text-white"
                }`}
              >
                P
              </span>
              Built with GoPeek
            </Link>
          </div>
        </div>
      )}

      </div>{/* end max-w-md wrapper */}

      {/* ── FAB + contact sheet ── */}
      {contactHref && (
        <ContactFab
          href={contactHref}
          name={data.fullName}
          light={light}
        />
      )}
    </div>
  );
}

function contactPlatform(href: string) {
  if (href.includes("wa.me")) return "WhatsApp";
  if (href.startsWith("tel:")) return "Phone";
  if (href.startsWith("mailto:")) return "Email";
  return "website";
}

function ContactFab({
  href,
  name,
  light,
}: {
  href: string;
  name: string;
  light: boolean;
}) {
  const [open, setOpen] = useState(false);
  const Icon = contactIcon(href);
  const platform = contactPlatform(href);
  const isNative = href.startsWith("tel:") || href.startsWith("mailto:");

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Contact"
        className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-[0_8px_32px_rgba(99,102,241,0.45)] transition-all duration-200 hover:bg-indigo-500 hover:scale-105 active:scale-95"
      >
        <Icon className="h-5 w-5" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Bottom sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          className={`mx-auto max-w-md rounded-t-3xl px-6 pb-10 pt-5 shadow-2xl ${
            light ? "bg-white" : "bg-zinc-900"
          }`}
        >
          {/* Drag handle */}
          <div
            className={`mx-auto mb-5 h-1 w-10 rounded-full ${
              light ? "bg-slate-200" : "bg-white/10"
            }`}
          />

          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/15">
              <Icon className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <p className={`text-xs font-medium ${light ? "text-slate-400" : "text-zinc-500"}`}>
                Get in touch with
              </p>
              <p className={`text-base font-bold ${light ? "text-slate-900" : "text-white"}`}>
                {name}
              </p>
            </div>
          </div>

          <a
            href={href}
            target={isNative ? "_self" : "_blank"}
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-indigo-600 text-sm font-bold text-white shadow-[0_4px_20px_rgba(99,102,241,0.35)] transition-all duration-200 hover:bg-indigo-500 active:scale-[0.98]"
          >
            <Icon className="h-4 w-4" />
            Contact via {platform}
          </a>

          <button
            onClick={() => setOpen(false)}
            className={`mt-3 flex h-12 w-full items-center justify-center rounded-2xl text-sm font-semibold transition ${
              light
                ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                : "bg-white/6 text-zinc-400 hover:bg-white/10"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   Block Renderers
───────────────────────────────────────── */

function BlockRenderer({
  block,
  light,
  tabName,
}: {
  block: ContentBlock;
  light: boolean;
  tabName: string;
}) {
  if (block.type === "gallery")
    return <GalleryBlock block={block} light={light} tabName={tabName} />;
  if (block.type === "video")
    return <VideoBlock block={block} light={light} />;
  if (block.type === "experience")
    return <ExperienceBlock block={block} light={light} />;
  return null;
}

function GalleryBlock({
  block,
  light,
  tabName,
}: {
  block: Extract<ContentBlock, { type: "gallery" }>;
  light: boolean;
  tabName: string;
}) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const goNext = useCallback(
    () =>
      setLightboxIdx((i) =>
        i === null ? null : (i + 1) % block.images.length
      ),
    [block.images.length]
  );
  const goPrev = useCallback(
    () =>
      setLightboxIdx((i) =>
        i === null
          ? null
          : (i - 1 + block.images.length) % block.images.length
      ),
    [block.images.length]
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, closeLightbox, goNext, goPrev]);

  if (!block.images.length) return null;

  const activeImg = lightboxIdx !== null ? block.images[lightboxIdx] : null;

  return (
    <section>
      <div className="grid grid-cols-2 gap-3">
        {block.images.map((img, idx) => (
          <div
            key={idx}
            className={`overflow-hidden rounded-2xl cursor-zoom-in transition-all duration-200 hover:-translate-y-0.5 ${
              light
                ? "bg-slate-100 shadow-sm hover:shadow-md"
                : "bg-zinc-900 border border-white/[0.05] hover:border-white/10"
            }`}
            onDoubleClick={() => setLightboxIdx(idx)}
            title="Double-click to view full screen"
          >
            <img
              src={img.url || `/placeholder.svg?height=300&width=250`}
              alt={img.alt || ""}
              className="w-full aspect-[4/3] object-cover pointer-events-none select-none"
              draggable={false}
            />
            {img.alt && (
              <div className="px-3 py-2.5">
                <p
                  className={`text-xs font-bold leading-tight ${
                    light ? "text-slate-800" : "text-white"
                  }`}
                >
                  {img.alt}
                </p>
                <p
                  className={`mt-0.5 text-[0.625rem] ${
                    light ? "text-slate-400" : "text-zinc-500"
                  }`}
                >
                  {tabName}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && activeImg && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === overlayRef.current) closeLightbox();
          }}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {block.images.length > 1 && (
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
              aria-label="Previous image"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M10 3L5 8l5 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div className="flex max-h-[90svh] max-w-[90vw] flex-col items-center gap-3">
            <img
              src={activeImg.url || ""}
              alt={activeImg.alt || ""}
              className="max-h-[82svh] max-w-[90vw] rounded-2xl object-contain shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
            />
            {activeImg.alt && (
              <p className="text-sm text-zinc-400">{activeImg.alt}</p>
            )}
            {block.images.length > 1 && (
              <p className="text-xs text-zinc-600">
                {lightboxIdx + 1} / {block.images.length}
              </p>
            )}
          </div>

          {block.images.length > 1 && (
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
              aria-label="Next image"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M6 3l5 5-5 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </section>
  );
}

function VideoBlock({
  block,
  light,
}: {
  block: Extract<ContentBlock, { type: "video" }>;
  light: boolean;
}) {
  const embedUrl = getEmbedUrl(block.url);
  return (
    <section>
      <div
        className={`overflow-hidden rounded-2xl ${
          light
            ? "bg-white border border-slate-100 shadow-sm"
            : "border border-white/[0.07] bg-white/[0.02]"
        }`}
      >
        {block.title && (
          <div
            className={`border-b px-4 py-3 ${
              light ? "border-slate-100" : "border-white/[0.07]"
            }`}
          >
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
  block,
  light,
}: {
  block: Extract<ContentBlock, { type: "experience" }>;
  light: boolean;
}) {
  return (
    <section>
      <div
        className={`rounded-2xl p-4 transition-all duration-200 ${
          light
            ? "bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200"
            : "border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.035]"
        }`}
      >
        <div className="flex gap-3">
          <div className="shrink-0">
            {block.image ? (
              <Image
                src={block.image}
                alt={block.company}
                width={44}
                height={44}
                className={`h-11 w-11 rounded-xl border object-cover ${
                  light ? "border-slate-100" : "border-white/10"
                }`}
              />
            ) : (
              <div
                className={`grid h-11 w-11 place-items-center rounded-xl border text-xs font-bold ${
                  light
                    ? "border-slate-100 bg-slate-50 text-slate-600"
                    : "border-white/10 bg-white/5 text-zinc-300"
                }`}
              >
                {block.company?.slice(0, 2).toUpperCase() || "CO"}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold leading-tight">
                  {block.title}
                </p>
                <p
                  className={`mt-0.5 text-xs ${
                    light ? "text-slate-500" : "text-zinc-400"
                  }`}
                >
                  {block.company}
                </p>
              </div>
              {block.period && (
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${
                    light
                      ? "bg-slate-100 text-slate-500"
                      : "border border-white/[0.08] bg-white/[0.04] text-zinc-500"
                  }`}
                >
                  {block.period}
                </span>
              )}
            </div>
            {block.description && (
              <p
                className={`mt-2.5 text-xs leading-relaxed ${
                  light ? "text-slate-500" : "text-zinc-400"
                }`}
              >
                {block.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
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
