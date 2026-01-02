"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ContentBlock } from "@/types/portfolio";
import { useState } from "react";
import { Plus, X } from "lucide-react";

interface BlockFormProps {
  type: "gallery" | "video" | "experience";
  onSave: (block: ContentBlock) => void;
  onCancel: () => void;
}

export function BlockForm({ type, onSave, onCancel }: BlockFormProps) {
  if (type === "gallery")
    return <GalleryForm onSave={onSave} onCancel={onCancel} />;
  if (type === "video")
    return <VideoForm onSave={onSave} onCancel={onCancel} />;
  if (type === "experience")
    return <ExperienceForm onSave={onSave} onCancel={onCancel} />;
  return null;
}

/** Shared styles */
const shell =
  "rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]";
const heading = "text-balance text-2xl font-semibold tracking-tight";
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
        className="h-12 flex-1 rounded-2xl border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
      >
        {left.label}
      </Button>
      <Button
        onClick={right.onClick}
        disabled={disabled}
        className="h-12 flex-1 rounded-2xl bg-white text-black hover:opacity-90"
      >
        {right.label}
      </Button>
    </div>
  );
}

function GalleryForm({ onSave, onCancel }: Omit<BlockFormProps, "type">) {
  const [images, setImages] = useState([{ url: "", alt: "" }]);

  const handleAdd = () => setImages([...images, { url: "", alt: "" }]);
  const handleRemove = (index: number) =>
    setImages(images.filter((_, i) => i !== index));
  const handleChange = (index: number, field: "url" | "alt", value: string) => {
    const updated = [...images];
    updated[index][field] = value;
    setImages(updated);
  };

  const handleSave = () => {
    const valid = images.filter((i) => i.url.trim());
    if (valid.length) onSave({ type: "gallery", images: valid });
  };

  const isValid = images.some((img) => img.url.trim());

  return (
    <div className={`${shell} space-y-6 animate-in fade-in-50 duration-500`}>
      <TopHeader
        title="Add Gallery Images"
        desc="Drop image links — we’ll make it look premium automatically."
      />

      <div className="space-y-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-black/20 p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`url-${index}`} className={fieldLabel}>
                    Image URL *
                  </Label>
                  <Input
                    id={`url-${index}`}
                    placeholder="https://example.com/image.jpg"
                    value={image.url}
                    onChange={(e) => handleChange(index, "url", e.target.value)}
                    className={inputBase}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`alt-${index}`} className={fieldLabel}>
                    Description
                  </Label>
                  <Input
                    id={`alt-${index}`}
                    placeholder="What’s happening in this image?"
                    value={image.alt}
                    onChange={(e) => handleChange(index, "alt", e.target.value)}
                    className={inputBase}
                  />
                </div>
              </div>

              {images.length > 1 && (
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
          Add Another Image
        </Button>
      </div>

      <BottomActions
        left={{ label: "Cancel", onClick: onCancel }}
        right={{ label: "Save Gallery", onClick: handleSave }}
        disabled={!isValid}
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
          <Label htmlFor="expImage" className={fieldLabel}>
            Company Logo URL (Optional)
          </Label>
          <Input
            id="expImage"
            placeholder="https://example.com/logo.png"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={inputBase}
          />
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
