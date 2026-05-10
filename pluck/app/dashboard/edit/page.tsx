"use client";

import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

type WizardStep = "onboarding" | "social" | "tabs" | "blocks" | "block-form" | "preview";

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
    socialLinks: [],
    tabs: [{ id: "tab-1", name: "Work", blocks: [] }],
  });

  useEffect(() => {
    if (profile === null) {
      router.replace("/startup");
      return;
    }
    if (profile && !ready) {
      setPortfolioData({
        fullName: profile.fullName,
        professionalTitle: profile.professionalTitle,
        bio: profile.bio,
        profileImage: profile.profileImage,
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
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  const updateBasicInfo = (data: Partial<PortfolioData>) =>
    setPortfolioData((prev) => ({ ...prev, ...data }));

  const updateTabs = (tabs: Tab[]) =>
    setPortfolioData((prev) => ({ ...prev, tabs }));

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

  const handleSelectBlock = (type: BlockType) => {
    setSelectedBlockType(type);
    setStep("block-form");
  };

  const handleAddContent = (tabId: string) => {
    setCurrentTabId(tabId);
    setStep("blocks");
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
            data={{
              fullName: portfolioData.fullName,
              professionalTitle: portfolioData.professionalTitle,
              bio: portfolioData.bio,
              profileImage: portfolioData.profileImage,
            }}
            onUpdate={updateBasicInfo}
            onNext={() => setStep("social")}
          />
        );

      case "social":
        return (
          <StepSocial
            data={portfolioData.socialLinks}
            onUpdate={(links) => updateBasicInfo({ socialLinks: links })}
            onNext={() => setStep("tabs")}
            onBack={() => setStep("onboarding")}
          />
        );

      case "tabs":
        return (
          <StepTabs
            tabs={portfolioData.tabs}
            onUpdate={updateTabs}
            onAddContent={handleAddContent}
            onBack={() => setStep("social")}
            onFinish={() => setStep("preview")}
          />
        );

      case "blocks":
        return (
          <StepBlocks
            onSelectBlock={handleSelectBlock}
            onBack={() => setStep("tabs")}
          />
        );

      case "block-form":
        return selectedBlockType && currentTabId ? (
          <BlockForm
            type={selectedBlockType}
            onSave={(block) => addBlockToTab(currentTabId, block)}
            onCancel={() => setStep("tabs")}
          />
        ) : null;

      case "preview":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Review
              </p>
              <h2 className="text-3xl font-bold">Looking good!</h2>
              <p className="text-zinc-400">
                Review your profile, then save your changes.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <PhoneMockup data={portfolioData} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Username</Label>
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                <span className="text-sm text-zinc-400">pluck.link/</span>
                <input
                  id="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
                    setSaveError(null);
                  }}
                  placeholder="yourname"
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                />
              </div>
              {saveError && <p className="text-sm text-red-400">{saveError}</p>}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("tabs")}
                className="flex-1 h-12 text-black"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                disabled={!slug || saving}
                onClick={handleSave}
                className="flex-1 h-12"
              >
                {saving ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-2xl bg-white/10 text-xs font-semibold">
            P
          </span>
          <span className="text-sm font-semibold">Pluck</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-xs text-zinc-400 transition hover:text-white"
          >
            ← Back to dashboard
          </button>
          <button
            onClick={() => signOut()}
            className="text-xs text-zinc-400 transition hover:text-white"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-2">
        <div className="min-h-screen p-6 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-xl">{renderStep()}</div>
        </div>

        {step !== "preview" && (
          <PhoneMockup data={portfolioData} activeTab={portfolioData.tabs[0]?.id} />
        )}
      </div>
    </div>
  );
}
