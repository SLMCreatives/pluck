/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface StepOnboardingProps {
  data: {
    fullName: string;
    professionalTitle: string;
    bio: string;
    profileImage: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const shell =
  "rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]";
const label = "text-xs font-semibold uppercase tracking-wider text-zinc-400";
const inputBase =
  "h-12 rounded-2xl border border-white/10 bg-black/30 text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0";
const textAreaBase =
  "min-h-28 rounded-2xl border border-white/10 bg-black/30 text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none";

export function StepOnboarding({
  data,
  onUpdate,
  onNext
}: StepOnboardingProps) {
  const [formData, setFormData] = useState(data);

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  const isValid = formData.fullName.trim() && formData.professionalTitle.trim();

  return (
    <div className={`${shell} space-y-7 animate-in fade-in-50 duration-500`}>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Onboarding
        </p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight">
          Let’s start with the basics
        </h2>
        <p className="text-sm leading-relaxed text-zinc-300">
          Fill this once. Everything else is automated.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName" className={label}>
            Full Name *
          </Label>
          <Input
            id="fullName"
            placeholder="Jane Doe"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="professionalTitle" className={label}>
            Professional Title *
          </Label>
          <Input
            id="professionalTitle"
            placeholder="Senior Product Designer"
            value={formData.professionalTitle}
            onChange={(e) => handleChange("professionalTitle", e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className={label}>
            Bio (Optional)
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell people what you do and what you're great at..."
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className={textAreaBase}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profileImage" className={label}>
            Profile Image URL (Optional)
          </Label>
          <Input
            id="profileImage"
            placeholder="https://example.com/photo.jpg"
            value={formData.profileImage}
            onChange={(e) => handleChange("profileImage", e.target.value)}
            className={inputBase}
          />
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!isValid}
        className="h-12 w-full rounded-2xl bg-white text-black hover:bg-black hover:text-white"
      >
        Continue
      </Button>
    </div>
  );
}
