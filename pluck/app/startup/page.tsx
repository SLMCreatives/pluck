"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";
import type { PortfolioData, Tab, BlockType, ContentBlock } from "@/types/portfolio";
import { PhoneMockup } from "@/components/phone-mockup";
import { PortfolioPreview } from "@/components/portfolio-preview";
import { StepOnboarding } from "@/components/wizard/step-onboarding";
import { StepSocial } from "@/components/wizard/step-social";
import { StepBlocks } from "@/components/wizard/step-blocks";
import { BlockForm } from "@/components/wizard/block-forms";
import { StepTabs } from "@/components/wizard/step-tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Check, Copy, CheckCheck, ArrowRight, Share2 } from "lucide-react";
import { FREE_LIMITS, countTotalBlocks, countTotalImages } from "@/lib/limits";

const STORAGE_KEY = "pluck_pending_portfolio";

type WizardStep = "onboarding" | "social" | "tabs" | "blocks" | "block-form" | "preview";

const STEP_LABELS = ["Profile", "Socials", "Content", "Preview"];
const STEP_INDEX: Record<WizardStep, number> = {
  onboarding: 0, social: 1, tabs: 2, blocks: 2, "block-form": 2, preview: 3,
};

export default function StartupPage() {
  const [step, setStep] = useState<WizardStep>("onboarding");
  const [selectedBlockType, setSelectedBlockType] = useState<BlockType | null>(null);
  const [currentTabId, setCurrentTabId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [launchSlug, setLaunchSlug] = useState<string | null>(null);

  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    fullName: "",
    professionalTitle: "",
    bio: "",
    profileImage: "",
    phone: "",
    showPhone: false,
    socialLinks: [],
    tabs: [{ id: "tab-1", name: "Work", blocks: [] }],
  });

  const saveProfile = useMutation(api.profiles.saveProfile);
  const { signOut } = useAuthActions();
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const existingProfile = useQuery(api.profiles.getMyProfile);

  // After signing up, restore pending portfolio data and jump to preview
  useEffect(() => {
    if (!isAuthenticated) return;
    const pending = sessionStorage.getItem(STORAGE_KEY);
    if (!pending) return;
    try {
      const data = JSON.parse(pending) as PortfolioData;
      setPortfolioData(data);
      setStep("preview");
    } catch {
      // ignore corrupt data
    } finally {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [isAuthenticated]);

  // Redirect to dashboard if the user already has a profile
  useEffect(() => {
    if (existingProfile) router.replace("/dashboard");
  }, [existingProfile, router]);

  // Show spinner while auth is initialising or while checking for an existing profile
  if (isAuthLoading || (isAuthenticated && existingProfile === undefined)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  // Redirect pending — render nothing to avoid flash
  if (existingProfile) return null;

  const updateBasicInfo = (data: Partial<PortfolioData>) =>
    setPortfolioData((prev) => ({ ...prev, ...data }));

  const updateTabs = (tabs: Tab[]) =>
    setPortfolioData((prev) => ({ ...prev, tabs }));

  const deleteBlockFromTab = (tabId: string, blockIndex: number) => {
    setPortfolioData((prev) => ({
      ...prev,
      tabs: prev.tabs.map((tab) =>
        tab.id === tabId
          ? { ...tab, blocks: tab.blocks.filter((_, i) => i !== blockIndex) }
          : tab
      ),
    }));
  };

  const addBlockToTab = (tabId: string, block: ContentBlock) => {
    setPortfolioData((prev) => ({
      ...prev,
      tabs: prev.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, blocks: [...tab.blocks, block] } : tab
      ),
    }));
    setStep("tabs");
    setSelectedBlockType(null);
    setCurrentTabId(null);
  };

  // Save data to sessionStorage then redirect to auth
  const handleSaveAndRedirect = (mode: "signup" | "signin") => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
    router.push(`/auth?mode=${mode === "signup" ? "signup" : "signin"}`);
  };

  const handlePublish = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const result = await saveProfile({ ...portfolioData });
      setLaunchSlug(result.slug);
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Something went wrong.");
      setSaving(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case "onboarding":
        return (
          <StepOnboarding
            data={{ fullName: portfolioData.fullName, professionalTitle: portfolioData.professionalTitle, bio: portfolioData.bio, profileImage: portfolioData.profileImage, coverImage: portfolioData.coverImage }}
            onUpdate={updateBasicInfo}
            onNext={() => setStep("social")}
          />
        );
      case "social":
        return (
          <StepSocial
            data={portfolioData.socialLinks}
            phone={portfolioData.phone}
            showPhone={portfolioData.showPhone}
            onUpdate={(links) => updateBasicInfo({ socialLinks: links })}
            onUpdatePhone={(phone, showPhone) => updateBasicInfo({ phone, showPhone })}
            onNext={() => setStep("tabs")}
            onBack={() => setStep("onboarding")}
          />
        );
      case "tabs": {
        const totalBlocks = countTotalBlocks(portfolioData.tabs);
        return (
          <StepTabs
            tabs={portfolioData.tabs}
            onUpdate={updateTabs}
            onAddContent={(tabId) => { setCurrentTabId(tabId); setStep("blocks"); }}
            onDeleteBlock={deleteBlockFromTab}
            onBack={() => setStep("social")}
            onFinish={() => setStep("preview")}
            totalBlocks={totalBlocks}
            maxTabs={FREE_LIMITS.tabs}
            maxBlocks={FREE_LIMITS.blocks}
          />
        );
      }
      case "blocks":
        return (
          <StepBlocks
            onSelectBlock={(type) => { setSelectedBlockType(type); setStep("block-form"); }}
            onBack={() => setStep("tabs")}
          />
        );
      case "block-form": {
        const usedImages = countTotalImages(portfolioData.tabs);
        const remainingImages = Math.max(0, FREE_LIMITS.images - usedImages);
        return selectedBlockType && currentTabId ? (
          <BlockForm
            type={selectedBlockType}
            onSave={(block) => addBlockToTab(currentTabId, block)}
            onCancel={() => setStep("tabs")}
            remainingImages={remainingImages}
          />
        ) : null;
      }
      default:
        return null;
    }
  };

  const currentStepIndex = STEP_INDEX[step];

  const header = (
    <header className="flex items-center justify-between border-b border-white/8 px-6 py-4">
      <div className="flex items-center gap-2">
        <Image src="/GoPeek.png" width={32} height={32} alt="GoPeek logo" className="rounded-xl object-contain" />
        <Image src="/gopeek_logo_text.png" width={72} height={20} alt="GoPeek" className="object-contain" />
      </div>

      {/* Step progress — desktop */}
      <div className="hidden items-center gap-1 sm:flex">
        {STEP_LABELS.map((label, i) => {
          const done = i < currentStepIndex;
          const active = i === currentStepIndex;
          return (
            <div key={label} className="flex items-center gap-1">
              <div className={[
                "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-colors",
                done ? "bg-emerald-500 text-black" : active ? "bg-white text-black" : "bg-white/10 text-zinc-500",
              ].join(" ")}>
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span className={["text-xs font-medium transition-colors", active ? "text-white" : "text-zinc-600"].join(" ")}>
                {label}
              </span>
              {i < STEP_LABELS.length - 1 && (
                <div className={["mx-1 h-px w-6 transition-colors", done ? "bg-emerald-500/50" : "bg-white/10"].join(" ")} />
              )}
            </div>
          );
        })}
      </div>

      {isAuthenticated ? (
        <button
          onClick={() => signOut()}
          className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      ) : (
        <Link
          href="/auth"
          className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
        >
          Sign in
        </Link>
      )}
    </header>
  );

  // Launch celebration overlay
  if (launchSlug !== null) {
    return <LaunchCelebration slug={launchSlug} name={portfolioData.fullName} title={portfolioData.professionalTitle} />;
  }

  // Preview step: full-screen portfolio with sticky publish bar
  if (step === "preview") {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        {header}
        <div className="pb-24">
          <PortfolioPreview data={portfolioData} showBadge />
        </div>

        {/* Sticky bottom publish bar */}
        <div className="fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-zinc-950/90 backdrop-blur-md">
          <div className="mx-auto max-w-2xl flex items-center gap-3 px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => setStep("tabs")}
              className="h-11 rounded-2xl text-zinc-400 hover:text-white shrink-0"
            >
              ← Edit
            </Button>

            {isAuthenticated ? (
              <div className="flex flex-1 flex-col gap-1">
                {saveError && <p className="text-xs text-red-400 text-center">{saveError}</p>}
                <Button
                  disabled={saving}
                  onClick={handlePublish}
                  className="h-11 w-full rounded-2xl bg-white text-black hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  {saving ? "Publishing…" : "Publish My Portfolio"}
                </Button>
              </div>
            ) : (
              <div className="flex flex-1 items-center gap-2">
                <Button
                  onClick={() => handleSaveAndRedirect("signup")}
                  className="h-11 flex-1 rounded-2xl bg-white text-black hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  Sign up &amp; Publish — Free
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSaveAndRedirect("signin")}
                  className="h-11 rounded-2xl border-white/15 text-zinc-300 hover:bg-white/10 hover:text-white shrink-0"
                >
                  Sign in
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Wizard steps: two-column layout with phone mockup on desktop
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {header}

      <div className="lg:grid lg:grid-cols-2 lg:min-h-[calc(100vh-57px)]">
        {/* Wizard panel */}
        <div className="flex items-start justify-center p-6 pt-10 lg:p-16">
          <div className="w-full max-w-lg">{renderStep()}</div>
        </div>

        {/* Live preview — desktop, hidden for blocks/block-form */}
        {step !== "blocks" && step !== "block-form" && (
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:border-l lg:border-white/8 lg:bg-white/1">
            <PhoneMockup data={portfolioData} activeTab={portfolioData.tabs[0]?.id} />
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Launch Celebration Screen
// ============================================================
function LaunchCelebration({
  slug,
  name,
  title,
}: {
  slug: string;
  name: string;
  title: string;
}) {
  const router = useRouter();
  const url = `gopeek.my/${slug}`;
  const fullUrl = `https://gopeek.my/${slug}`;
  const caption = `My freelancer portfolio is live. Check it out 👉 ${fullUrl}`;

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyCaption = async () => {
    await navigator.clipboard.writeText(caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-white">
      {/* glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* checkmark */}
        <div className="flex justify-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/40">
            <Check className="h-8 w-8 text-emerald-400" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold">You&apos;re live!</h1>
          <p className="mt-2 text-zinc-400">Your portfolio is out in the world.</p>
        </div>

        {/* Shareable card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center space-y-1">
          <p className="text-sm font-semibold text-white">{name}</p>
          {title && <p className="text-xs text-zinc-400">{title}</p>}
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-sm font-medium text-emerald-300">{url}</span>
          </div>
        </div>

        {/* Copy link */}
        <button
          onClick={copyLink}
          className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm transition hover:bg-white/10"
        >
          <span className="text-zinc-300">Copy your portfolio link</span>
          {copiedLink ? (
            <CheckCheck className="h-4 w-4 text-emerald-400" />
          ) : (
            <Copy className="h-4 w-4 text-zinc-500" />
          )}
        </button>

        {/* Pre-written caption */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Share to Instagram / WhatsApp Stories
          </p>
          <p className="text-sm leading-relaxed text-zinc-300">{caption}</p>
          <button
            onClick={copyCaption}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-white/10"
          >
            {copiedCaption ? (
              <><CheckCheck className="h-3.5 w-3.5 text-emerald-400" /> Copied!</>
            ) : (
              <><Copy className="h-3.5 w-3.5" /> Copy caption</>
            )}
          </button>
        </div>

        {/* Dashboard CTA */}
        <Button
          onClick={() => router.push("/dashboard")}
          className="h-12 w-full rounded-2xl bg-white text-black hover:bg-zinc-900 hover:text-white transition-colors"
        >
          Go to your dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
