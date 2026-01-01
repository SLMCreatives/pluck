"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { SocialLink } from "@/types/portfolio"
import { Plus, X } from "lucide-react"
import { useState } from "react"

interface StepSocialProps {
  data: SocialLink[]
  onUpdate: (data: SocialLink[]) => void
  onNext: () => void
  onBack: () => void
}

export function StepSocial({ data, onUpdate, onNext, onBack }: StepSocialProps) {
  const [links, setLinks] = useState<SocialLink[]>(data.length > 0 ? data : [{ platform: "", url: "" }])

  const handleAdd = () => {
    const updated = [...links, { platform: "", url: "" }]
    setLinks(updated)
    onUpdate(updated)
  }

  const handleRemove = (index: number) => {
    const updated = links.filter((_, i) => i !== index)
    setLinks(updated)
    onUpdate(updated)
  }

  const handleChange = (index: number, field: "platform" | "url", value: string) => {
    const updated = [...links]
    updated[index][field] = value
    setLinks(updated)
    onUpdate(updated)
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-balance">Add your social links</h2>
        <p className="text-zinc-400 text-pretty">Connect your online presence (optional, skip if you prefer)</p>
      </div>

      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={index} className="flex gap-3 items-start">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor={`platform-${index}`} className="text-sm">
                  Platform
                </Label>
                <Input
                  id={`platform-${index}`}
                  placeholder="LinkedIn"
                  value={link.platform}
                  onChange={(e) => handleChange(index, "platform", e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`url-${index}`} className="text-sm">
                  URL
                </Label>
                <Input
                  id={`url-${index}`}
                  placeholder="https://..."
                  value={link.url}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                  className="h-11"
                />
              </div>
            </div>
            {links.length > 1 && (
              <Button variant="ghost" size="icon" onClick={() => handleRemove(index)} className="mt-8 flex-shrink-0">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}

        <Button variant="outline" onClick={handleAdd} className="w-full h-11 bg-transparent">
          <Plus className="w-4 h-4 mr-2" />
          Add Another Link
        </Button>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12 text-base bg-transparent">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1 h-12 text-base">
          Continue
        </Button>
      </div>
    </div>
  )
}
