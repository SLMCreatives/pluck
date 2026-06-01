"use client";

import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { PhoneMockup } from "@/components/phone-mockup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Edit2,
  ExternalLink,
  Copy,
  LogOut,
  Check,
  Eye,
  Lock,
  Globe,
  ArrowUpRight,
  CalendarClock,
  AlertTriangle,
  BarChart2,
  Share2,
} from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

const TIER_LABEL: Record<string, string> = {
  free: "Free",
  publish: "Publish",
  pro: "Pro",
};

function formatExpiry(ts: number): string {
  return new Date(ts).toLocaleDateString("en-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function daysUntil(ts: number): number {
  return Math.ceil((ts - Date.now()) / (1000 * 60 * 60 * 24));
}

function TierBadge({ tier }: { tier: string }) {
  if (tier === "pro")
    return (
      <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-400 ring-1 ring-inset ring-indigo-500/30">
        Pro
      </span>
    );
  if (tier === "publish")
    return (
      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
        Publish
      </span>
    );
  return (
    <span className="rounded-full bg-zinc-700/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 ring-1 ring-inset ring-white/10">
      Free
    </span>
  );
}

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      disabled={disabled}
      className={[
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-emerald-500" : "bg-white/15",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200",
          checked ? "translate-x-6" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
}

export default function DashboardPage() {
  const profile = useQuery(api.profiles.getMyProfile);
  const setPublished = useMutation(api.profiles.setPublished);
  const { signOut } = useAuthActions();
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [publishToggling, setPublishToggling] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  useEffect(() => {
    if (profile === null) router.replace("/startup");
  }, [profile, router]);

  if (profile === undefined || profile === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  const data: PortfolioData = {
    fullName: profile.fullName,
    professionalTitle: profile.professionalTitle,
    bio: profile.bio,
    profileImage: profile.profileImage,
    phone: profile.phone ?? "",
    showPhone: profile.showPhone ?? false,
    socialLinks: profile.socialLinks ?? [],
    tabs: (profile.tabs ?? []) as PortfolioData["tabs"],
  };

  const tier = profile.tier ?? "free";
  const isPaid = tier !== "free";
  const expiresAt = profile.subscriptionExpiresAt ?? null;
  const daysLeft = expiresAt ? daysUntil(expiresAt) : null;
  const isExpiringSoon = daysLeft !== null && daysLeft <= 7 && daysLeft > 0;
  const publicUrl = `gopeek.my/${profile.slug}`;
  const totalBlocks = data.tabs.reduce((n, t) => n + t.blocks.length, 0);

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${publicUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fullUrl = `https://${publicUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out my portfolio: ${fullUrl}`)}`;
  const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent("Check out my portfolio!")}&url=${encodeURIComponent(fullUrl)}`;

  const shareToInstagram = () => {
    navigator.clipboard.writeText(fullUrl);
    setShareToast("Link copied — paste it in your Instagram bio or story!");
    setTimeout(() => setShareToast(null), 3000);
  };

  const handleTogglePublish = async () => {
    setPublishToggling(true);
    setPublishError(null);
    try {
      await setPublished({ published: !profile.published });
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : "Failed to update visibility.");
    } finally {
      setPublishToggling(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <Image src="/GoPeek.png" width={32} height={32} alt="GoPeek logo" className="rounded-xl object-contain" />
          <Image src="/gopeek_logo_text.png" width={72} height={20} alt="GoPeek" className="object-contain" />
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-1.5 text-xs text-zinc-400 transition hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </header>

      <div className="lg:grid lg:grid-cols-2 lg:min-h-[calc(100vh-57px)]">
        {/* ── Left panel ── */}
        <div className="flex flex-col gap-4 p-6 lg:p-10">

          {/* Profile strip */}
          <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/3 p-5">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.fullName}
                className="h-14 w-14 shrink-0 rounded-2xl border border-white/10 object-cover"
              />
            ) : (
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-xl font-bold">
                {profile.fullName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate font-semibold">{profile.fullName}</p>
                <TierBadge tier={tier} />
              </div>
              <p className="truncate text-sm text-zinc-400">{profile.professionalTitle}</p>
            </div>
          </div>

          {/* ── Three primary cards ── */}
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Edit */}
            <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/3 p-6">
              <div className="flex items-center gap-2 text-zinc-400">
                <Edit2 className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-wider">Edit</p>
              </div>
              <div className="flex flex-1 gap-6">
                <div>
                  <p className="text-3xl font-bold">{data.tabs.length}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">Projects</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{totalBlocks}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">Blocks</p>
                </div>
              </div>
              <Link
                href="/dashboard/edit"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                <Edit2 className="h-4 w-4" />
                Edit Portfolio
              </Link>
            </div>

            {/* Analytics */}
            <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/3 p-6">
              <div className="flex items-center gap-2 text-zinc-400">
                <BarChart2 className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-wider">Analytics</p>
              </div>
              {isPaid ? (
                <>
                  <div className="flex-1">
                    <p className="text-3xl font-bold">{profile.viewCount ?? 0}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">Total profile views</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-xs text-emerald-400">Live tracking</span>
                  </div>
                </>
              ) : (
                <div className="relative flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/3 py-6">
                  <Lock className="h-5 w-5 text-zinc-600" />
                  <p className="text-xs text-zinc-500">Unlock with Publish</p>
                  <Link
                    href="/pricing"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 transition hover:text-indigo-300"
                  >
                    Upgrade <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Share — full width */}
          <div className="rounded-3xl border border-white/10 bg-white/3 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400">
                <Share2 className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-wider">Share</p>
              </div>
              {isPaid && (
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs font-semibold ${profile.published ? "text-emerald-400" : "text-zinc-500"}`}>
                    {publishToggling ? "Updating…" : profile.published ? "Live" : "Hidden"}
                  </span>
                  <span className={`h-1.5 w-1.5 rounded-full ${profile.published ? "animate-pulse bg-emerald-400" : "bg-zinc-600"}`} />
                  <Toggle checked={!!profile.published} onChange={handleTogglePublish} disabled={publishToggling} />
                </div>
              )}
            </div>

            {/* URL bar */}
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              <Globe className="h-4 w-4 shrink-0 text-zinc-500" />
              <span className="flex-1 truncate font-mono text-sm text-zinc-300">{publicUrl}</span>
              <button
                onClick={copyUrl}
                className="flex shrink-0 items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <Link
                href={`/${profile.slug}`}
                target="_blank"
                className="flex shrink-0 items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View
              </Link>
            </div>

            {publishError && <p className="text-xs text-red-400">{publishError}</p>}

            {/* Social share */}
            <div className="flex gap-2">
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366]/10 px-3 py-2.5 text-xs font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href={xShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </a>
              <button
                onClick={shareToInstagram}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E1306C]/10 px-3 py-2.5 text-xs font-semibold text-[#E1306C] transition hover:bg-[#E1306C]/20"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </button>
            </div>
            {shareToast && <p className="text-xs text-emerald-400">{shareToast}</p>}
          </div>

          {/* Plan & Billing — compact */}
          <div className="rounded-3xl border border-white/10 bg-white/3 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Plan</p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="font-semibold">{TIER_LABEL[tier]}</p>
                  <TierBadge tier={tier} />
                </div>
                {isPaid && expiresAt && (
                  <p className="mt-0.5 text-xs text-zinc-500">Active until {formatExpiry(expiresAt)}</p>
                )}
                {!isPaid && (
                  <p className="mt-0.5 text-xs text-zinc-500">Free forever — upgrade for custom username & analytics</p>
                )}
              </div>
              <Button
                asChild
                className={`h-9 shrink-0 rounded-xl px-4 text-xs font-semibold ${
                  isPaid
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-indigo-500 text-white hover:bg-indigo-400"
                }`}
              >
                <Link href="/pricing" className="flex items-center gap-1.5">
                  {isPaid ? (
                    <><CalendarClock className="h-3.5 w-3.5" /> Renew</>
                  ) : (
                    <><ArrowUpRight className="h-3.5 w-3.5" /> Upgrade</>
                  )}
                </Link>
              </Button>
            </div>
            {isExpiringSoon && (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
                <p className="text-xs text-amber-300">
                  Expires in {daysLeft} day{daysLeft === 1 ? "" : "s"} — renew to stay live.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* ── Right panel — phone preview (desktop only) ── */}
        <div className="hidden lg:block">
          <PhoneMockup data={data} activeTab={data.tabs[0]?.id} />
        </div>
      </div>
    </div>
  );
}
