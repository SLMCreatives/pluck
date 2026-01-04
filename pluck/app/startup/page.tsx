"use client";

import { useState } from "react";
import type {
  PortfolioData,
  Tab,
  BlockType,
  ContentBlock
} from "@/types/portfolio";
import { PhoneMockup } from "@/components/phone-mockup";
import { StepOnboarding } from "@/components/wizard/step-onboarding";
import { StepSocial } from "@/components/wizard/step-social";
import { StepBlocks } from "@/components/wizard/step-blocks";
import { BlockForm } from "@/components/wizard/block-forms";
import { StepTabs } from "@/components/wizard/step-tabs";
//import { PortfolioPreview } from "@/components/portfolio-preview";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type WizardStep =
  | "onboarding"
  | "social"
  | "tabs"
  | "blocks"
  | "block-form"
  | "preview";

export default function Home() {
  const [step, setStep] = useState<WizardStep>("onboarding");
  const [selectedBlockType, setSelectedBlockType] = useState<BlockType | null>(
    null
  );
  const [currentTabId, setCurrentTabId] = useState<string | null>(null);

  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    fullName: "",
    professionalTitle: "",
    bio: "",
    profileImage: "",
    socialLinks: [],
    tabs: [{ id: "tab-1", name: "Work", blocks: [] }]
  });

  const updateBasicInfo = (data: Partial<PortfolioData>) => {
    setPortfolioData((prev) => ({ ...prev, ...data }));
  };

  const updateTabs = (tabs: Tab[]) => {
    setPortfolioData((prev) => ({ ...prev, tabs }));
  };

  const addBlockToTab = (tabId: string, block: ContentBlock) => {
    setPortfolioData((prev) => ({
      ...prev,
      tabs: prev.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, blocks: [...tab.blocks, block] } : tab
      )
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

  const renderStep = () => {
    switch (step) {
      case "onboarding":
        return (
          <StepOnboarding
            data={{
              fullName: portfolioData.fullName,
              professionalTitle: portfolioData.professionalTitle,
              bio: portfolioData.bio,
              profileImage: portfolioData.profileImage
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
              <h2 className="text-3xl font-bold">Your Portfolio is Ready!</h2>
              <p className="text-zinc-400">Preview your portfolio on mobile</p>
            </div>

            {/* <PortfolioPreview data={portfolioData} /> */}
            <div className="flex items-center justify-center gap-2">
              <PhoneMockup
                data={portfolioData}
                //activeTab={portfolioData.tabs[0]?.id}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("tabs")}
                className="flex-1 h-12 text-black"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Edit
              </Button>
              <Button
                onClick={() => {
                  alert("Portfolio Published!");
                }}
                className="flex-1 h-12"
              >
                Publish Portfolio
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
      <div className="lg:grid lg:grid-cols-2">
        {/* Wizard Panel */}
        <div className="min-h-screen p-6 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-xl">{renderStep()}</div>
        </div>

        {/* Preview Panel - Desktop Only */}
        {step !== "preview" && (
          <PhoneMockup
            data={portfolioData}
            activeTab={portfolioData.tabs[0]?.id}
          />
        )}
      </div>
    </div>
  );
}
