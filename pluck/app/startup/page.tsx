"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
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
import { LogOut, Check } from "lucide-react";
import { FREE_LIMITS, countTotalBlocks, countTotalImages } from "@/lib/limits";

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
  const existingProfile = useQuery(api.profiles.getMyProfile);

  useEffect(() => {
    if (existingProfile) router.replace("/dashboard");
  }, [existingProfile, router]);

  // Still loading — don't flash the wizard
  if (existingProfile === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  // Has a profile — redirect pending, show nothing
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
      case "preview":
        return (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Step 4 of 4
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Almost there!</h2>
              <p className="text-sm text-zinc-400">
                Your portfolio goes live instantly — free, forever. Check the preview, then publish.
              </p>
            </div>

            {/* Live badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
              <Check className="h-3 w-3" />
              Free — your profile goes live immediately
            </span>

            {saveError && <p className="text-sm text-red-400">{saveError}</p>}

            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setStep("tabs")}
                className="h-11 rounded-2xl text-zinc-400 hover:text-black"
              >
                ← Back
              </Button>
              <Button
                disabled={saving}
                onClick={async () => {
                  setSaving(true);
                  setSaveError(null);
                  try {
                    await saveProfile({ ...portfolioData });
                    router.push("/dashboard");
                  } catch (err: unknown) {
                    setSaveError(err instanceof Error ? err.message : "Something went wrong.");
                    setSaving(false);
                  }
                }}
                className="h-11 flex-1 rounded-2xl bg-white text-black hover:bg-zinc-900 hover:text-white transition-colors"
              >
                {saving ? "Publishing…" : "Publish My Portfolio"}
              </Button>
            </div>
          </div>
        );
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

        <button
          onClick={() => signOut()}
          className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </header>

      <div className="lg:grid lg:grid-cols-2 lg:min-h-[calc(100vh-57px)]">
        {/* Wizard panel */}
        <div className="flex items-start justify-center p-6 pt-10 lg:p-16">
          <div className="w-full max-w-lg">{renderStep()}</div>
        </div>

        {/* Live preview — desktop, hidden on preview step */}
        {step !== "preview" && step !== "blocks" && step !== "block-form" && (
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:border-l lg:border-white/8 lg:bg-white/1">
            <PhoneMockup data={portfolioData} activeTab={portfolioData.tabs[0]?.id} />
          </div>
        )}
      </div>
    </div>
  );
}
