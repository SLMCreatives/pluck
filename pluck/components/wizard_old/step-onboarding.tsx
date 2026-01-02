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
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-balance">
          Let&apos;s start with the basics
        </h2>
        <p className="text-zinc-400 text-pretty">
          Tell us about yourself to create your professional portfolio
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-base">
            Full Name *
          </Label>
          <Input
            id="fullName"
            placeholder="Jane Doe"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="professionalTitle" className="text-base">
            Professional Title *
          </Label>
          <Input
            id="professionalTitle"
            placeholder="Senior Product Designer"
            value={formData.professionalTitle}
            onChange={(e) => handleChange("professionalTitle", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-base">
            Bio (Optional)
          </Label>
          <Textarea
            id="bio"
            placeholder="A brief description about yourself and what you do..."
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="min-h-24 text-base resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profileImage" className="text-base">
            Profile Image URL (Optional)
          </Label>
          <Input
            id="profileImage"
            placeholder="https://example.com/photo.jpg"
            value={formData.profileImage}
            onChange={(e) => handleChange("profileImage", e.target.value)}
            className="h-12 text-base"
          />
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!isValid}
        className="w-full h-12 text-base"
        size="lg"
      >
        Continue
      </Button>
    </div>
  );
}
