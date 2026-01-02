"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Tab } from "@/types/portfolio";
import { useState } from "react";
import { Plus, GripVertical, Edit2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StepTabsProps {
  tabs: Tab[];
  onUpdate: (tabs: Tab[]) => void;
  onAddContent: (tabId: string) => void;
  onBack: () => void;
  onFinish: () => void;
}

const shell =
  "rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]";
const inputBase =
  "h-12 rounded-2xl border border-white/10 bg-black/30 text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0";

export function StepTabs({
  tabs,
  onUpdate,
  onAddContent,
  onBack,
  onFinish
}: StepTabsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleAddTab = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      name: `Tab ${tabs.length + 1}`,
      blocks: []
    };
    onUpdate([...tabs, newTab]);
  };

  const handleRemoveTab = (id: string) =>
    onUpdate(tabs.filter((t) => t.id !== id));

  const handleStartEdit = (tab: Tab) => {
    setEditingId(tab.id);
    setEditName(tab.name);
  };

  const handleSaveEdit = () => {
    if (editingId && editName.trim()) {
      onUpdate(
        tabs.map((t) =>
          t.id === editingId ? { ...t, name: editName.trim() } : t
        )
      );
      setEditingId(null);
      setEditName("");
    }
  };

  const moveTab = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= tabs.length) return;
    const newTabs = [...tabs];
    [newTabs[index], newTabs[newIndex]] = [newTabs[newIndex], newTabs[index]];
    onUpdate(newTabs);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Structure
        </p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight">
          Organize your content
        </h2>
        <p className="text-sm leading-relaxed text-zinc-300">
          Create tabs like “Work”, “About”, “Projects”. Keep it clean.
        </p>
      </div>

      <div className="space-y-4">
        {tabs.map((tab, index) => (
          <Card key={tab.id} className={shell}>
            <CardContent className="p-5">
              {editingId === tab.id ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                    className={inputBase}
                    autoFocus
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSaveEdit}
                      className="h-12 rounded-2xl bg-white text-black hover:opacity-90"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingId(null)}
                      variant="outline"
                      className="h-12 rounded-2xl border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-2xl bg-white/5 text-white/80 hover:bg-white/10"
                      onClick={() => moveTab(index, "up")}
                      disabled={index === 0}
                    >
                      <GripVertical className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-2xl bg-white/5 text-white/80 hover:bg-white/10"
                      onClick={() => moveTab(index, "down")}
                      disabled={index === tabs.length - 1}
                    >
                      <GripVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{tab.name}</h3>
                    <p className="text-sm text-zinc-300">
                      {tab.blocks.length} block(s)
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAddContent(tab.id)}
                      className="h-10 rounded-2xl border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Content
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStartEdit(tab)}
                      className="h-10 w-10 rounded-2xl bg-white/5 text-white/80 hover:bg-white/10"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveTab(tab.id)}
                      disabled={tabs.length === 1}
                      className="h-10 w-10 rounded-2xl bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          onClick={handleAddTab}
          className="h-12 w-full rounded-2xl border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Tab
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-12 flex-1 rounded-2xl border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
        >
          Back
        </Button>
        <Button
          onClick={onFinish}
          className="h-12 flex-1 rounded-2xl bg-white text-black hover:opacity-90"
        >
          View Portfolio
        </Button>
      </div>
    </div>
  );
}
