"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";
import type { PortfolioData, Tab, BlockType, ContentBlock } from "@/types/portfolio";
import { PhoneMockup } from "@/components/phone-mockup";
import { StepOnboarding } from "@/components/wizard/step-onboarding";
import { StepSocial } from "@/components/wizard/step-social";
import { StepBlocks } from "@/components/wizard/step-blocks";
import { BlockForm } from "@/components/wizard/block-forms";
import { StepTabs } from "@/components/wizard/step-tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Check, ArrowLeft } from "lucide-react";
import { limitsForTier, countTotalBlocks, countTotalImages } from "@/lib/limits";

type WizardStep = "onboarding" | "social" | "tabs" | "blocks" | "block-form" | "preview";

const STEP_LABELS = ["Profile", "Socials", "Content", "Preview"];
const STEP_INDEX: Record<WizardStep, number> = {
  onboarding: 0, social: 1, tabs: 2, blocks: 2, "block-form": 2, preview: 3,
};

export default function EditProfilePage() {
  const profile = useQuery(api.profiles.getMyProfile);
  const updateProfile = useMutation(api.profiles.updateProfile);
  const { signOut } = useAuthActions();
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [step, setStep] = useState<WizardStep>("onboarding");
  const [selectedBlockType, setSelectedBlockType] = useState<BlockType | null>(null);
  const [currentTabId, setCurrentTabId] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    if (profile === null) { router.replace("/startup"); return; }
    if (profile && !ready) {
      setPortfolioData({
        fullName: profile.fullName,
        professionalTitle: profile.professionalTitle,
        bio: profile.bio,
        profileImage: profile.profileImage,
        phone: profile.phone ?? "",
        showPhone: profile.showPhone ?? false,
        socialLinks: profile.socialLinks ?? [],
        tabs: (profile.tabs ?? []) as PortfolioData["tabs"],
      });
      setSlug(profile.slug ?? "");
      setReady(true);
    }
  }, [profile, ready, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

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

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await updateProfile({ ...portfolioData, slug });
      router.push("/dashboard");
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case "onboarding":
        return (
          <StepOnboarding
            data={{ fullName: portfolioData.fullName, professionalTitle: portfolioData.professionalTitle, bio: portfolioData.bio, profileImage: portfolioData.profileImage }}
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
        const limits = limitsForTier(profile?.tier);
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
            maxTabs={limits.tabs}
            maxBlocks={limits.blocks}
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
        const limits = limitsForTier(profile?.tier);
        const usedImages = countTotalImages(portfolioData.tabs);
        const remainingImages = Math.max(0, limits.images - usedImages);
        return selectedBlockType && currentTabId ? (
          <BlockForm
            type={selectedBlockType}
            onSave={(block) => addBlockToTab(currentTabId, block)}
            onCancel={() => setStep("tabs")}
            remainingImages={isFinite(limits.images) ? remainingImages : undefined}
          />
        ) : null;
      }
      case "preview": {
        const tier = profile?.tier ?? "free";
        const isPaid = tier !== "free";
        return (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Step 4 of 4
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Looking good!</h2>
              <p className="text-sm text-zinc-400">
                Review your changes{isPaid ? ", update your username if needed," : ""} then save.
              </p>
            </div>

            {/* Username — Publish/Pro only */}
            {isPaid ? (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Username
                </label>
                <div className="flex h-11 items-center gap-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 focus-within:border-white/30 transition-colors">
                  <span className="shrink-0 border-r border-white/10 bg-white/3 px-3 text-sm text-zinc-500">
                    gopeek.my/
                  </span>
                  <input
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
                      setSaveError(null);
                    }}
                    placeholder="yourname"
                    className="flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-600"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Your URL
                </label>
                <div className="flex h-11 items-center overflow-hidden rounded-xl border border-white/10 bg-white/5 px-3">
                  <span className="text-sm text-zinc-400">gopeek.my/{slug}</span>
                </div>
                <p className="text-xs text-zinc-500">
                  <a href="/pricing" className="text-indigo-400 hover:text-indigo-300 transition">Upgrade to Publish</a>{" "}
                  to set a custom username.
                </p>
              </div>
            )}

            {saveError && <p className="text-sm text-red-400">{saveError}</p>}

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setStep("tabs")}
                className="h-11 gap-2 rounded-2xl text-zinc-400 hover:text-black"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                disabled={saving}
                onClick={handleSave}
                className="h-11 flex-1 rounded-2xl bg-white text-black hover:bg-zinc-900 hover:text-white transition-colors"
              >
                {saving ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </div>
        );
      }
    }
  };

  const currentStepIndex = STEP_INDEX[step];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
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

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-xs text-zinc-500 transition hover:text-white"
          >
            ← Dashboard
          </button>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-2 lg:min-h-[calc(100vh-57px)]">
        {/* Wizard panel */}
        <div className="flex items-start justify-center p-6 pt-10 lg:p-16">
          <div className="w-full max-w-lg">{renderStep()}</div>
        </div>

        {/* Live preview — desktop */}
        {step !== "blocks" && step !== "block-form" && (
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:border-l lg:border-white/8 lg:bg-white/1">
            <PhoneMockup data={portfolioData} activeTab={portfolioData.tabs[0]?.id} />
          </div>
        )}
      </div>
    </div>
  );
}
