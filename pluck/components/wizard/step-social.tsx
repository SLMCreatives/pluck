"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { SocialLink } from "@/types/portfolio";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface StepSocialProps {
  data: SocialLink[];
  onUpdate: (data: SocialLink[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const shell =
  "rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]";
const label = "text-xs font-semibold uppercase tracking-wider text-zinc-400";
const inputBase =
  "h-12 rounded-2xl border border-white/10 bg-black/30 text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0";

export function StepSocial({
  data,
  onUpdate,
  onNext,
  onBack
}: StepSocialProps) {
  const [links, setLinks] = useState<SocialLink[]>(
    data.length > 0 ? data : [{ platform: "", url: "" }]
  );

  const handleAdd = () => {
    const updated = [...links, { platform: "", url: "" }];
    setLinks(updated);
    onUpdate(updated);
  };

  const handleRemove = (index: number) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
    onUpdate(updated);
  };

  const handleChange = (
    index: number,
    field: "platform" | "url",
    value: string
  ) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
    onUpdate(updated);
  };

  return (
    <div className={`${shell} space-y-7 animate-in fade-in-50 duration-500`}>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Social
        </p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight">
          Add your social links
        </h2>
        <p className="text-sm leading-relaxed text-zinc-300">
          Optional — add your presence, or skip it completely.
        </p>
      </div>

      <div className="space-y-4">
        {links.map((link, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-black/20 p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`platform-${index}`} className={label}>
                    Platform
                  </Label>
                  <Input
                    id={`platform-${index}`}
                    placeholder="LinkedIn"
                    value={link.platform}
                    onChange={(e) =>
                      handleChange(index, "platform", e.target.value)
                    }
                    className={inputBase}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`url-${index}`} className={label}>
                    URL
                  </Label>
                  <Input
                    id={`url-${index}`}
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => handleChange(index, "url", e.target.value)}
                    className={inputBase}
                  />
                </div>
              </div>

              {links.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(index)}
                  className="mt-8 h-10 w-10 rounded-2xl bg-white/5 text-white/80 hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={handleAdd}
          className="h-12 w-full rounded-2xl border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Link
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-12 flex-1 rounded-2xl border-white/15 bg-white/5 text-white/90 hover:bg-white"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="h-10 w-full border-white/15 rounded-2xl bg-white text-black hover:bg-black hover:text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
