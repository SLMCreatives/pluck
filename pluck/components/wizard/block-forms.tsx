"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ContentBlock } from "@/types/portfolio";
import { useState, useCallback } from "react";
import { Plus, X, UploadCloud, Loader2 } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

interface BlockFormProps {
  type: "gallery" | "video" | "experience";
  onSave: (block: ContentBlock) => void;
  onCancel: () => void;
  remainingImages?: number;
}

export function BlockForm({ type, onSave, onCancel, remainingImages }: BlockFormProps) {
  if (type === "gallery")
    return <GalleryForm onSave={onSave} onCancel={onCancel} remainingImages={remainingImages} />;
  if (type === "video")
    return <VideoForm onSave={onSave} onCancel={onCancel} />;
  if (type === "experience")
    return <ExperienceForm onSave={onSave} onCancel={onCancel} />;
  return null;
}

/** Shared styles */
const shell =
  "rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]";
const heading = "text-balance text-2xl font-semibold tracking-tight text-white";
const sub = "text-sm leading-relaxed text-zinc-300";
const fieldLabel =
  "text-xs font-semibold uppercase tracking-wider text-zinc-400";
const inputBase =
  "h-12 rounded-2xl border border-white/10 bg-black/30 text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0";
const textAreaBase =
  "min-h-28 rounded-2xl border border-white/10 bg-black/30 text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none";

function TopHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Add content
      </p>
      <h3 className={heading}>{title}</h3>
      <p className={sub}>{desc}</p>
    </div>
  );
}

function BottomActions({
  left,
  right,
  disabled
}: {
  left: { label: string; onClick: () => void };
  right: { label: string; onClick: () => void };
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        variant="outline"
        onClick={left.onClick}
        className="h-12 flex-1 rounded-2xl border-white/15 bg-white/5 text-white/90 hover:bg-white/10 hover:text-black"
      >
        {left.label}
      </Button>
      <Button
        onClick={right.onClick}
        disabled={disabled}
        className="h-12 flex-1 rounded-2xl bg-white text-black hover:bg-zinc-900 hover:text-white transition-colors"
      >
        {right.label}
      </Button>
    </div>
  );
}

function GalleryForm({ onSave, onCancel, remainingImages }: Omit<BlockFormProps, "type">) {
  const [images, setImages] = useState<{ url: string; alt: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  const { startUpload } = useUploadThing("galleryImage");

  const imageLimit = remainingImages ?? Infinity;
  const slotsLeft = Math.max(0, imageLimit - images.length);
  const atImageLimit = isFinite(imageLimit) && images.length >= imageLimit;

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const allowed = Array.from(files).slice(0, slotsLeft);
      if (allowed.length === 0) return;
      setUploading(true);
      try {
        const res = await startUpload(allowed);
        if (res) {
          const uploaded = res.map((f) => ({ url: f.ufsUrl, alt: "" }));
          setImages((prev) => [...prev, ...uploaded]);
        }
      } finally {
        setUploading(false);
      }
    },
    [startUpload, slotsLeft]
  );

  const handleAltChange = (index: number, value: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, alt: value } : img))
    );
  };

  const handleRemove = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const handleSave = () => {
    if (images.length) onSave({ type: "gallery", images });
  };

  return (
    <div className={`${shell} space-y-6 animate-in fade-in-50 duration-500`}>
      <TopHeader
        title="Add Gallery Images"
        desc="Upload photos from your device — we’ll make it look premium automatically."
      />

      {/* Image limit indicator */}
      {isFinite(imageLimit) && (
        <div className={[
          "flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold",
          atImageLimit
            ? "border-indigo-500/30 bg-indigo-500/5 text-indigo-400"
            : "border-white/10 bg-white/3 text-zinc-400",
        ].join(" ")}>
          <span>Images: {images.length} / {imageLimit}</span>
          {atImageLimit && (
            <a href="/pricing" className="underline underline-offset-2 hover:text-indigo-300">
              Upgrade for unlimited
            </a>
          )}
        </div>
      )}

      {/* Drop zone */}
      <label className={[
        "group flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed p-10 transition",
        atImageLimit
          ? "cursor-not-allowed border-white/10 bg-white/1 opacity-40"
          : "cursor-pointer border-white/20 bg-white/2 hover:border-white/40 hover:bg-white/4",
      ].join(" ")}>
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={uploading || atImageLimit}
        />
        {uploading ? (
          <Loader2 className="h-7 w-7 animate-spin text-zinc-400" />
        ) : (
          <UploadCloud className="h-7 w-7 text-zinc-400 transition group-hover:text-white" />
        )}
        <div className="text-center">
          <p className="text-sm font-semibold text-white/80">
            {uploading ? "Uploading…" : atImageLimit ? "Image limit reached" : "Click to upload images"}
          </p>
          <p className="text-xs text-zinc-500">
            {isFinite(imageLimit) && !atImageLimit
              ? `${slotsLeft} slot${slotsLeft === 1 ? "" : "s"} remaining · PNG, JPG, WEBP up to 4 MB each`
              : "PNG, JPG, WEBP up to 4 MB each"}
          </p>
        </div>
      </label>

      {/* Uploaded images */}
      {images.length > 0 && (
        <div className="space-y-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="h-14 w-14 rounded-xl object-cover border border-white/10 shrink-0"
              />
              <Input
                placeholder="Add a description…"
                value={image.alt}
                onChange={(e) => handleAltChange(index, e.target.value)}
                className={`${inputBase} flex-1`}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(index)}
                className="h-9 w-9 shrink-0 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <BottomActions
        left={{ label: "Cancel", onClick: onCancel }}
        right={{ label: "Save Gallery", onClick: handleSave }}
        disabled={images.length === 0 || uploading}
      />
    </div>
  );
}

function VideoForm({ onSave, onCancel }: Omit<BlockFormProps, "type">) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleSave = () => {
    if (url.trim())
      onSave({
        type: "video",
        url: url.trim(),
        title: title.trim() || undefined
      });
  };

  return (
    <div className={`${shell} space-y-6 animate-in fade-in-50 duration-500`}>
      <TopHeader
        title="Embed a Video"
        desc="Paste a YouTube/Vimeo link. We’ll format it beautifully."
      />

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="videoUrl" className={fieldLabel}>
            Video URL *
          </Label>
          <Input
            id="videoUrl"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="videoTitle" className={fieldLabel}>
            Title (Optional)
          </Label>
          <Input
            id="videoTitle"
            placeholder="Project walkthrough"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputBase}
          />
        </div>
      </div>

      <BottomActions
        left={{ label: "Cancel", onClick: onCancel }}
        right={{ label: "Save Video", onClick: handleSave }}
        disabled={!url.trim()}
      />
    </div>
  );
}

function ExperienceForm({ onSave, onCancel }: Omit<BlockFormProps, "type">) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [logoUploading, setLogoUploading] = useState(false);
  const { startUpload: startLogoUpload } = useUploadThing("companyLogo");

  const handleSave = () => {
    if (title.trim() && company.trim()) {
      onSave({
        type: "experience",
        title: title.trim(),
        company: company.trim(),
        period: period.trim(),
        description: description.trim(),
        image: image.trim() || undefined
      });
    }
  };

  const isValid = title.trim() && company.trim();

  return (
    <div className={`${shell} space-y-6 animate-in fade-in-50 duration-500`}>
      <TopHeader
        title="Add Experience"
        desc="A clean entry that makes you look legit instantly."
      />

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="expTitle" className={fieldLabel}>
            Job Title *
          </Label>
          <Input
            id="expTitle"
            placeholder="Senior Designer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expCompany" className={fieldLabel}>
            Company *
          </Label>
          <Input
            id="expCompany"
            placeholder="Tech Company Inc."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expPeriod" className={fieldLabel}>
            Period
          </Label>
          <Input
            id="expPeriod"
            placeholder="2020 — Present"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expDescription" className={fieldLabel}>
            Description
          </Label>
          <Textarea
            id="expDescription"
            placeholder="Highlight your impact, wins, and responsibilities..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={textAreaBase}
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>Company Logo (Optional)</Label>
          <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-white/20 bg-white/2 p-4 transition hover:border-white/40">
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={logoUploading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setLogoUploading(true);
                try {
                  const res = await startLogoUpload([file]);
                  if (res?.[0]) setImage(res[0].ufsUrl);
                } finally {
                  setLogoUploading(false);
                }
              }}
            />
            {image ? (
              <img src={image} alt="logo" className="h-10 w-10 rounded-xl object-cover border border-white/10" />
            ) : (
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                {logoUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                ) : (
                  <UploadCloud className="h-4 w-4 text-zinc-400" />
                )}
              </div>
            )}
            <div>
              <p className="text-sm text-white/80">
                {logoUploading ? "Uploading…" : image ? "Click to replace" : "Upload logo"}
              </p>
              <p className="text-xs text-zinc-500">PNG, JPG up to 1 MB</p>
            </div>
          </label>
        </div>
      </div>

      <BottomActions
        left={{ label: "Cancel", onClick: onCancel }}
        right={{ label: "Save Experience", onClick: handleSave }}
        disabled={!isValid}
      />
    </div>
  );
}
