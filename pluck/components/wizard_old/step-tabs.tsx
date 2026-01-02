"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Tab } from "@/types/portfolio"
import { useState } from "react"
import { Plus, GripVertical, Edit2, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StepTabsProps {
  tabs: Tab[]
  onUpdate: (tabs: Tab[]) => void
  onAddContent: (tabId: string) => void
  onBack: () => void
  onFinish: () => void
}

export function StepTabs({ tabs, onUpdate, onAddContent, onBack, onFinish }: StepTabsProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")

  const handleAddTab = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      name: `Tab ${tabs.length + 1}`,
      blocks: [],
    }
    onUpdate([...tabs, newTab])
  }

  const handleRemoveTab = (id: string) => {
    onUpdate(tabs.filter((t) => t.id !== id))
  }

  const handleStartEdit = (tab: Tab) => {
    setEditingId(tab.id)
    setEditName(tab.name)
  }

  const handleSaveEdit = () => {
    if (editingId && editName.trim()) {
      onUpdate(tabs.map((t) => (t.id === editingId ? { ...t, name: editName.trim() } : t)))
      setEditingId(null)
      setEditName("")
    }
  }

  const moveTab = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= tabs.length) return

    const newTabs = [...tabs]
    const temp = newTabs[index]
    newTabs[index] = newTabs[newIndex]
    newTabs[newIndex] = temp
    onUpdate(newTabs)
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-balance">Organize your content</h2>
        <p className="text-zinc-400 text-pretty">Create tabs to organize your portfolio sections</p>
      </div>

      <div className="space-y-4">
        {tabs.map((tab, index) => (
          <Card key={tab.id} className="border-2">
            <CardContent className="p-4">
              {editingId === tab.id ? (
                <div className="flex gap-2">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                    className="h-10"
                    autoFocus
                  />
                  <Button onClick={handleSaveEdit} size="sm">
                    Save
                  </Button>
                  <Button onClick={() => setEditingId(null)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => moveTab(index, "up")}
                      disabled={index === 0}
                    >
                      <GripVertical className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => moveTab(index, "down")}
                      disabled={index === tabs.length - 1}
                    >
                      <GripVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{tab.name}</h3>
                    <p className="text-sm text-zinc-400">{tab.blocks.length} block(s)</p>
                  </div>

                  <Button variant="outline" size="sm" onClick={() => onAddContent(tab.id)}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Content
                  </Button>

                  <Button variant="ghost" size="icon" onClick={() => handleStartEdit(tab)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveTab(tab.id)}
                    disabled={tabs.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Button variant="outline" onClick={handleAddTab} className="w-full h-12 bg-transparent">
          <Plus className="w-4 h-4 mr-2" />
          Add New Tab
        </Button>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12 text-base bg-transparent">
          Back
        </Button>
        <Button onClick={onFinish} className="flex-1 h-12 text-base">
          View Portfolio
        </Button>
      </div>
    </div>
  )
}
