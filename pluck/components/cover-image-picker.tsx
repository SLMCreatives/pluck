"use client";

import { useState, useRef } from "react";
import { UploadCloud, Search, Link, X, Loader2, ImageIcon } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

type Tab = "upload" | "search" | "url";

interface CoverImagePickerProps {
  value: string;
  onChange: (url: string) => void;
}

// Curated fallbacks shown when no Unsplash key is configured
const PRESET_COVERS = [
  { label: "Code", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80" },
  { label: "Gradient", url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=900&q=80" },
  { label: "Dark desk", url: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&q=80" },
  { label: "Minimal", url: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=900&q=80" },
  { label: "City", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80" },
  { label: "Nature", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=80" },
];

export function CoverImagePicker({ value, onChange }: CoverImagePickerProps) {
  const [tab, setTab] = useState<Tab>("search");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; url: string; thumb: string; author: string }[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchErr, setSearchErr] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { startUpload } = useUploadThing("coverImage");

  const unsplashKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  async function handleSearch() {
    if (!query.trim()) return;
    setSearching(true);
    setSearchErr("");
    setResults([]);
    try {
      if (!unsplashKey) {
        // Filter presets by query as fallback
        const filtered = PRESET_COVERS.filter((p) =>
          p.label.toLowerCase().includes(query.toLowerCase())
        );
        setResults(
          filtered.map((p, i) => ({ id: String(i), url: p.url, thumb: p.url, author: "Unsplash" }))
        );
        if (filtered.length === 0) setSearchErr("Add NEXT_PUBLIC_UNSPLASH_ACCESS_KEY to enable full search.");
        return;
      }
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&orientation=landscape&client_id=${unsplashKey}`
      );
      const json = await res.json();
      setResults(
        (json.results ?? []).map((p: { id: string; urls: { regular: string; thumb: string }; user: { name: string } }) => ({
          id: p.id,
          url: p.urls.regular,
          thumb: p.urls.thumb,
          author: p.user.name,
        }))
      );
    } catch {
      setSearchErr("Search failed. Check your Unsplash key or try a URL instead.");
    } finally {
      setSearching(false);
    }
  }

  async function handleFileUpload(file: File) {
    setUploading(true);
    try {
      const res = await startUpload([file]);
      if (res?.[0]) onChange(res[0].ufsUrl);
    } finally {
      setUploading(false);
    }
  }

  const tabs: { id: Tab; label: string; icon: typeof Search }[] = [
    { id: "search", label: "Search", icon: Search },
    { id: "upload", label: "Upload", icon: UploadCloud },
    { id: "url", label: "Paste URL", icon: Link },
  ];

  return (
    <div className="space-y-4">
      {/* Current cover preview */}
      <div className="relative h-28 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        {value ? (
          <>
            <img src={value} alt="Cover" className="h-full w-full object-cover" />
            <button
              onClick={() => onChange("")}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80 transition"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <div className="flex h-full items-center justify-center gap-2 text-zinc-600">
            <ImageIcon className="h-5 w-5" />
            <span className="text-sm">No cover photo</span>
          </div>
        )}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 rounded-xl border border-white/8 bg-white/4 p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
              tab === id ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Search tab */}
      {tab === "search" && (
        <div className="space-y-3">
          {!unsplashKey && (
            <p className="rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-xs text-amber-400">
              Tip: Add <code className="font-mono">NEXT_PUBLIC_UNSPLASH_ACCESS_KEY</code> to .env.local for full search.
            </p>
          )}
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder='Search e.g. "abstract gradient"'
              className="h-10 flex-1 rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/25"
            />
            <button
              onClick={handleSearch}
              disabled={searching || !query.trim()}
              className="flex h-10 items-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white disabled:opacity-40 hover:bg-indigo-500 transition"
            >
              {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </button>
          </div>

          {searchErr && <p className="text-xs text-red-400">{searchErr}</p>}

          {/* Show presets initially */}
          {results.length === 0 && !searching && !searchErr && (
            <div>
              <p className="mb-2 text-xs text-zinc-600">Popular covers</p>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_COVERS.map((p) => (
                  <button
                    key={p.url}
                    onClick={() => onChange(p.url)}
                    className={`relative h-16 overflow-hidden rounded-xl border-2 transition ${
                      value === p.url ? "border-indigo-500" : "border-transparent hover:border-white/20"
                    }`}
                  >
                    <img src={p.url} alt={p.label} className="h-full w-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-black/50 py-0.5 text-center text-[10px] text-white/80">
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onChange(r.url)}
                  className={`relative h-16 overflow-hidden rounded-xl border-2 transition ${
                    value === r.url ? "border-indigo-500" : "border-transparent hover:border-white/20"
                  }`}
                >
                  <img src={r.thumb} alt={r.author} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upload tab */}
      {tab === "upload" && (
        <label className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] py-8 transition hover:border-white/40">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
          />
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
          ) : (
            <UploadCloud className="h-6 w-6 text-zinc-400" />
          )}
          <div className="text-center">
            <p className="text-sm text-white/70">
              {uploading ? "Uploading…" : "Click to upload a cover photo"}
            </p>
            <p className="text-xs text-zinc-600">PNG, JPG up to 4 MB · Landscape recommended</p>
          </div>
        </label>
      )}

      {/* URL tab */}
      {tab === "url" && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/cover.jpg"
              className="h-10 flex-1 rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/25"
            />
            <button
              onClick={() => { if (urlInput.trim()) { onChange(urlInput.trim()); setUrlInput(""); } }}
              disabled={!urlInput.trim()}
              className="flex h-10 items-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white disabled:opacity-40 hover:bg-indigo-500 transition"
            >
              Use
            </button>
          </div>
          <p className="text-xs text-zinc-600">Paste a direct image URL. Works with any public image.</p>
        </div>
      )}
    </div>
  );
}
