"use client";

import { useState } from "react";
import {
  Moon,
  Sun,
  Globe,
  Mail,
  MessageCircle,
  ImageIcon,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK = {
  fullName: "Sulaiman Shafiq",
  professionalTitle: "Web Developer",
  bio: "I build fast, beautiful web experiences for Malaysian businesses. Let's create something great together.",
  profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-e0aFGCiGCJpqRGa1gJiAGk0Zqj7K-oDrQ&s",
  coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
  socials: [
    { icon: Globe, label: "Website" },
    { icon: Mail, label: "Email" },
    { icon: MessageCircle, label: "WhatsApp" },
  ],
};

// Cover photo variations to preview
const COVER_OPTIONS = [
  {
    label: "Abstract code",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
  },
  {
    label: "Gradient mesh",
    url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
  },
  {
    label: "Dark workspace",
    url: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80",
  },
  {
    label: "No cover",
    url: "",
  },
];

export default function TestCoverPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [coverIdx, setCoverIdx] = useState(0);
  const light = theme === "light";
  const cover = COVER_OPTIONS[coverIdx].url;

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center py-10 px-4 gap-8">

      {/* ── Controls ── */}
      <div className="w-full max-w-md space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-lg">Cover Photo — Test</h1>
          <a href="/" className="text-zinc-500 hover:text-zinc-300 text-sm transition">
            ← Back
          </a>
        </div>

        {/* Cover picker */}
        <div className="flex gap-2 flex-wrap">
          {COVER_OPTIONS.map((opt, i) => (
            <button
              key={i}
              onClick={() => setCoverIdx(i)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                coverIdx === i
                  ? "bg-indigo-600 text-white"
                  : "bg-white/8 text-zinc-400 hover:bg-white/12 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <div className="flex gap-2">
          {(["light", "dark"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                theme === t
                  ? "bg-white/15 text-white"
                  : "bg-white/5 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {t === "light" ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Phone-frame preview ── */}
      <div
        className="w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-white/10"
        style={{ minHeight: 720 }}
      >
        <ProfileWithCover light={light} cover={cover} />
      </div>

      <p className="text-zinc-600 text-xs">
        Test page — not linked in production nav
      </p>
    </div>
  );
}

// ─── Profile with cover photo ─────────────────────────────────────────────────

function ProfileWithCover({ light, cover }: { light: boolean; cover: string }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const bg = light ? "bg-[#F7F7FA] text-slate-900" : "bg-[#080808] text-white";

  return (
    <div className={`relative min-h-[720px] transition-colors duration-300 ${bg}`}>

      {/* ── Cover photo ── */}
      <div className="relative h-44 w-full overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt="Cover"
            className="h-full w-full object-cover"
          />
        ) : (
          // Placeholder gradient when no cover
          <div
            className={`h-full w-full flex items-center justify-center gap-2 ${
              light
                ? "bg-gradient-to-br from-indigo-100 via-violet-100 to-slate-100"
                : "bg-gradient-to-br from-indigo-950 via-violet-950 to-zinc-900"
            }`}
          >
            <ImageIcon className={`h-6 w-6 ${light ? "text-indigo-300" : "text-indigo-700"}`} />
            <span className={`text-sm font-medium ${light ? "text-indigo-300" : "text-indigo-700"}`}>
              No cover photo
            </span>
          </div>
        )}

        {/* Scrim at bottom so avatar ring blends */}
        <div
          className={`absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t ${
            light ? "from-[#F7F7FA]" : "from-[#080808]"
          } to-transparent`}
        />

        {/* Theme toggle — top right */}
        <button
          className={`absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border backdrop-blur transition ${
            light
              ? "border-white/60 bg-white/70 text-slate-600 hover:bg-white"
              : "border-white/10 bg-black/50 text-zinc-400 hover:text-white"
          }`}
        >
          {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </div>

      {/* ── Avatar — overlapping the cover ── */}
      <div className="flex justify-center -mt-14 relative z-10">
        <div className="relative">
          <div
            className={`absolute rounded-full transition-colors duration-300 ${
              light ? "bg-indigo-100" : "bg-indigo-500/15"
            }`}
            style={{ inset: "-10px" }}
          />
          <Avatar
            className={`relative h-24 w-24 ring-4 transition-all duration-300 ${
              light
                ? "ring-[#F7F7FA] shadow-lg shadow-indigo-100/60"
                : "ring-[#080808]"
            }`}
          >
            <AvatarImage
              src={MOCK.profileImage}
              alt={MOCK.fullName}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-violet-500 text-xl font-bold text-white">
              SS
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* ── Hero text ── */}
      <div className="px-6 pt-4 pb-6 text-center">
        <p className={`text-sm font-semibold ${light ? "text-indigo-500" : "text-indigo-400"}`}>
          Hello, I&apos;m
        </p>
        <h1
          className={`mt-0.5 text-[2rem] font-black tracking-[-0.03em] leading-tight ${
            light ? "text-slate-900" : "text-white"
          }`}
        >
          {MOCK.fullName}
        </h1>
        <p className={`mt-1.5 text-sm font-semibold ${light ? "text-indigo-500" : "text-indigo-400"}`}>
          {MOCK.professionalTitle}
        </p>
        <p className={`mt-3 text-sm leading-relaxed ${light ? "text-slate-500" : "text-zinc-400"}`}>
          {MOCK.bio}
        </p>

        {/* Social icons */}
        <div className="mt-5 flex justify-center gap-3">
          {MOCK.socials.map(({ icon: Icon, label }) => (
            <button
              key={label}
              title={label}
              className={`grid h-11 w-11 place-items-center rounded-full border transition ${
                light
                  ? "border-slate-200 bg-white text-slate-500 shadow-sm hover:border-indigo-200 hover:text-indigo-500"
                  : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Content placeholder ── */}
      <div className="px-5 space-y-4 pb-32">
        <p className={`text-sm font-bold ${light ? "text-slate-900" : "text-white"}`}>
          Work Experience
        </p>
        {[1, 2].map((i) => (
          <div
            key={i}
            className={`rounded-2xl p-4 space-y-2 ${
              light ? "bg-white border border-slate-100" : "bg-white/5 border border-white/8"
            }`}
          >
            <div className={`h-3 w-2/3 rounded-full ${light ? "bg-slate-200" : "bg-white/10"}`} />
            <div className={`h-2.5 w-1/2 rounded-full ${light ? "bg-slate-100" : "bg-white/6"}`} />
            <div className={`h-2 w-full rounded-full ${light ? "bg-slate-100" : "bg-white/6"}`} />
            <div className={`h-2 w-4/5 rounded-full ${light ? "bg-slate-100" : "bg-white/6"}`} />
          </div>
        ))}
      </div>

      {/* ── FAB ── */}
      <button
        onClick={() => setSheetOpen(true)}
        className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-[0_8px_32px_rgba(99,102,241,0.45)] hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all"
      >
        <MessageCircle className="h-5 w-5" />
      </button>

      {/* ── Contact sheet ── */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setSheetOpen(false)}
        />
      )}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out ${
          sheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          className={`mx-auto max-w-md rounded-t-3xl px-6 pb-10 pt-5 shadow-2xl ${
            light ? "bg-white" : "bg-zinc-900"
          }`}
        >
          <div className={`mx-auto mb-5 h-1 w-10 rounded-full ${light ? "bg-slate-200" : "bg-white/10"}`} />
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/15">
              <MessageCircle className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <p className={`text-xs font-medium ${light ? "text-slate-400" : "text-zinc-500"}`}>Get in touch with</p>
              <p className={`text-base font-bold ${light ? "text-slate-900" : "text-white"}`}>{MOCK.fullName}</p>
            </div>
          </div>
          <button className="flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-indigo-600 text-sm font-bold text-white">
            <MessageCircle className="h-4 w-4" />
            Contact via WhatsApp
          </button>
          <button
            onClick={() => setSheetOpen(false)}
            className={`mt-3 flex h-12 w-full items-center justify-center rounded-2xl text-sm font-semibold ${
              light ? "bg-slate-100 text-slate-600" : "bg-white/6 text-zinc-400"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
