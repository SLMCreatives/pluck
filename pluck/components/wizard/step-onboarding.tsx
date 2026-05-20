/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

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
  const [avatarUploading, setAvatarUploading] = useState(false);
  const { startUpload } = useUploadThing("profileImage");

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
          <Label className={label}>Profile Photo (Optional)</Label>
          <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-4 transition hover:border-white/40">
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={avatarUploading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setAvatarUploading(true);
                try {
                  const res = await startUpload([file]);
                  if (res?.[0]) handleChange("profileImage", res[0].ufsUrl);
                } finally {
                  setAvatarUploading(false);
                }
              }}
            />
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt="Profile"
                className="h-14 w-14 rounded-2xl object-cover border border-white/10 shrink-0"
              />
            ) : (
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 shrink-0">
                {avatarUploading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
                ) : (
                  <UploadCloud className="h-5 w-5 text-zinc-400" />
                )}
              </div>
            )}
            <div>
              <p className="text-sm text-white/80">
                {avatarUploading ? "Uploading…" : formData.profileImage ? "Click to replace" : "Upload a photo"}
              </p>
              <p className="text-xs text-zinc-500">PNG, JPG up to 2 MB</p>
            </div>
          </label>
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!isValid}
        className="h-12 w-full rounded-2xl bg-white text-black hover:bg-zinc-900 hover:text-white transition-colors"
      >
        Continue
      </Button>
    </div>
  );
}
