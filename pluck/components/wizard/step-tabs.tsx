"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Tab, ContentBlock } from "@/types/portfolio";
import { useState } from "react";
import {
  Plus,
  ChevronUp,
  ChevronDown,
  Pencil,
  Trash2,
  Images,
  Video,
  Briefcase,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";

interface StepTabsProps {
  tabs: Tab[];
  onUpdate: (tabs: Tab[]) => void;
  onAddContent: (tabId: string) => void;
  onDeleteBlock: (tabId: string, blockIndex: number) => void;
  onBack: () => void;
  onFinish: () => void;
}

const BLOCK_ICONS: Record<string, React.ElementType> = {
  gallery: Images,
  video: Video,
  experience: Briefcase,
};

function blockLabel(block: ContentBlock): string {
  if (block.type === "gallery") return `Gallery · ${block.images.length} image${block.images.length !== 1 ? "s" : ""}`;
  if (block.type === "video") return block.title ? `Video · ${block.title}` : "Video";
  if (block.type === "experience") return `${block.title} @ ${block.company}`;
  return "Block";
}

const inputBase =
  "h-10 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/30 transition-colors";

export function StepTabs({
  tabs,
  onUpdate,
  onAddContent,
  onDeleteBlock,
  onBack,
  onFinish,
}: StepTabsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleAddTab = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      name: `Tab ${tabs.length + 1}`,
      blocks: [],
    };
    onUpdate([...tabs, newTab]);
  };

  const handleRemoveTab = (id: string) => onUpdate(tabs.filter((t) => t.id !== id));

  const startEdit = (tab: Tab) => { setEditingId(tab.id); setEditName(tab.name); };
  const cancelEdit = () => { setEditingId(null); setEditName(""); };
  const saveEdit = () => {
    if (editingId && editName.trim()) {
      onUpdate(tabs.map((t) => (t.id === editingId ? { ...t, name: editName.trim() } : t)));
    }
    cancelEdit();
  };

  const moveTab = (index: number, dir: "up" | "down") => {
    const next = dir === "up" ? index - 1 : index + 1;
    if (next < 0 || next >= tabs.length) return;
    const arr = [...tabs];
    [arr[index], arr[next]] = [arr[next], arr[index]];
    onUpdate(arr);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      <div className="space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Step 3 of 4
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Organise your content</h2>
        <p className="text-sm text-zinc-400">
          Create tabs like "Work", "About", "Projects". Add blocks inside each tab.
        </p>
      </div>

      <div className="space-y-3">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden"
          >
            {/* Tab header */}
            <div className="flex items-center gap-2 px-4 py-3">
              {/* Reorder */}
              <div className="flex shrink-0 flex-col">
                <button
                  onClick={() => moveTab(index, "up")}
                  disabled={index === 0}
                  className="grid h-5 w-5 place-items-center text-zinc-600 transition hover:text-zinc-300 disabled:opacity-20"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => moveTab(index, "down")}
                  disabled={index === tabs.length - 1}
                  className="grid h-5 w-5 place-items-center text-zinc-600 transition hover:text-zinc-300 disabled:opacity-20"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Name / inline edit */}
              {editingId === tab.id ? (
                <div className="flex flex-1 items-center gap-2">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") cancelEdit(); }}
                    className={`${inputBase} flex-1`}
                    autoFocus
                  />
                  <button onClick={saveEdit} className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition">
                    <Check className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={cancelEdit} className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-zinc-500 hover:bg-white/10 transition">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{tab.name}</p>
                    <p className="text-xs text-zinc-500">
                      {tab.blocks.length === 0 ? "No blocks yet" : `${tab.blocks.length} block${tab.blocks.length !== 1 ? "s" : ""}`}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => onAddContent(tab.id)}
                      className="flex h-8 items-center gap-1.5 rounded-lg bg-white/8 px-3 text-xs font-medium text-zinc-300 transition hover:bg-white/15 hover:text-white"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add
                    </button>
                    <button
                      onClick={() => startEdit(tab)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-zinc-500 transition hover:bg-white/8 hover:text-zinc-300"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleRemoveTab(tab.id)}
                      disabled={tabs.length === 1}
                      className="grid h-8 w-8 place-items-center rounded-lg text-zinc-600 transition hover:bg-red-500/15 hover:text-red-400 disabled:pointer-events-none disabled:opacity-20"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Blocks list */}
            {tab.blocks.length > 0 && (
              <div className="border-t border-white/8 px-4 py-2 space-y-1">
                {tab.blocks.map((block, bi) => {
                  const Icon = BLOCK_ICONS[block.type] ?? Briefcase;
                  return (
                    <div
                      key={bi}
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-zinc-400 hover:bg-white/5 group"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
                      <span className="flex-1 truncate">{blockLabel(block)}</span>
                      <button
                        onClick={() => onDeleteBlock(tab.id, bi)}
                        className="hidden group-hover:grid h-5 w-5 place-items-center rounded text-zinc-600 hover:text-red-400 transition"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleAddTab}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 text-sm font-medium text-zinc-400 transition hover:border-white/30 hover:text-white"
        >
          <Plus className="h-4 w-4" />
          Add tab
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
          onClick={onFinish}
          className="h-11 flex-1 rounded-2xl bg-white text-black hover:opacity-90"
        >
          Preview & Save
        </Button>
      </div>
    </div>
  );
}
