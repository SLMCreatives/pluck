"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { SocialLink } from "@/types/portfolio";
import { Plus, Trash2, ArrowLeft, Phone } from "lucide-react";
import { useState } from "react";

interface StepSocialProps {
  data: SocialLink[];
  phone: string;
  showPhone: boolean;
  onUpdate: (data: SocialLink[]) => void;
  onUpdatePhone: (phone: string, showPhone: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

const PLATFORMS = [
  { value: "linkedin",  label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter",   label: "Twitter / X" },
  { value: "whatsapp",  label: "WhatsApp" },
  { value: "email",     label: "Email" },
  { value: "website",   label: "Website" },
  { value: "tiktok",    label: "TikTok" },
  { value: "youtube",   label: "YouTube" },
  { value: "github",    label: "GitHub" },
  { value: "behance",   label: "Behance" },
  { value: "dribbble",  label: "Dribbble" },
];

function urlPlaceholder(platform: string) {
  if (platform === "whatsapp") return "60123456789  (digits only)";
  if (platform === "email") return "you@email.com";
  if (platform === "linkedin") return "https://linkedin.com/in/yourname";
  if (platform === "instagram") return "https://instagram.com/yourhandle";
  if (platform === "github") return "https://github.com/yourname";
  return "https://";
}

const inputBase =
  "h-11 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/30 transition-colors";

const selectBase =
  "h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer";

export function StepSocial({ data, phone, showPhone, onUpdate, onUpdatePhone, onNext, onBack }: StepSocialProps) {
  const [links, setLinks] = useState<SocialLink[]>(data.length > 0 ? data : []);
  const [localPhone, setLocalPhone] = useState(phone);
  const [localShowPhone, setLocalShowPhone] = useState(showPhone);

  const push = (l: SocialLink[]) => { setLinks(l); onUpdate(l); };

  const handleAdd = () =>
    push([...links, { platform: PLATFORMS[0].value, url: "" }]);

  const handleRemove = (i: number) =>
    push(links.filter((_, idx) => idx !== i));

  const handleChange = (i: number, field: "platform" | "url", value: string) => {
    const next = [...links];
    next[i] = { ...next[i], [field]: value };
    if (field === "platform") next[i].url = "";
    push(next);
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^0-9+\s()-]/g, "");
    setLocalPhone(cleaned);
    onUpdatePhone(cleaned, localShowPhone);
  };

  const handleToggle = () => {
    const next = !localShowPhone;
    setLocalShowPhone(next);
    onUpdatePhone(localPhone, next);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      <div className="space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Step 2 of 4
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Your social links</h2>
        <p className="text-sm text-zinc-400">
          Add your presence, or skip it completely.
        </p>
      </div>

      {/* Phone number card */}
      <div className="rounded-2xl border border-white/10 bg-white/3 p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/8">
              <Phone className="h-4 w-4 text-zinc-300" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Phone Number</p>
              <p className="text-xs text-zinc-500">Powers the Contact Me button</p>
            </div>
          </div>

          {/* Toggle */}
          <button
            role="switch"
            aria-checked={localShowPhone}
            onClick={handleToggle}
            className={[
              "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200",
              localShowPhone ? "bg-emerald-500" : "bg-white/15",
            ].join(" ")}
          >
            <span
              className={[
                "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200",
                localShowPhone ? "translate-x-6" : "translate-x-1",
              ].join(" ")}
            />
          </button>
        </div>

        <Input
          placeholder="+60123456789"
          value={localPhone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          type="tel"
          className={inputBase}
        />

        {localShowPhone && localPhone && (
          <p className="text-xs text-emerald-400">
            ✓ Visitors will see a Contact Me button linking to this number.
          </p>
        )}
        {localShowPhone && !localPhone && (
          <p className="text-xs text-amber-400">
            Enter a phone number above to enable the Contact Me button.
          </p>
        )}
      </div>

      {/* Social links */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Social links
        </p>

        {links.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-white/10 py-8 text-center">
            <p className="text-sm text-zinc-500">No links added yet.</p>
            <p className="text-xs text-zinc-600">Click below to add your first link.</p>
          </div>
        )}

        {links.map((link, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_1.4fr_auto] items-center gap-2 rounded-2xl border border-white/8 bg-white/3 p-3"
          >
            {/* Platform select */}
            <div className="relative">
              <select
                value={link.platform}
                onChange={(e) => handleChange(i, "platform", e.target.value)}
                className={selectBase}
              >
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value} className="bg-zinc-900">
                    {p.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                ▾
              </span>
            </div>

            <Input
              placeholder={urlPlaceholder(link.platform)}
              value={link.url}
              type={link.platform === "email" ? "email" : "text"}
              onChange={(e) => handleChange(i, "url", e.target.value)}
              className={inputBase}
            />

            <button
              onClick={() => handleRemove(i)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5 text-zinc-500 transition hover:bg-red-500/15 hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        <button
          onClick={handleAdd}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 text-sm font-medium text-zinc-400 transition hover:border-white/30 hover:text-white"
        >
          <Plus className="h-4 w-4" />
          Add a link
        </button>
      </div>

      <div className="flex gap-3">
        <Button
          variant="ghost"
          onClick={onBack}
          className="h-11 gap-2 rounded-2xl text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="h-11 flex-1 rounded-2xl bg-white text-black hover:opacity-90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
