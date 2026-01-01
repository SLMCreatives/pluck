"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { ContentBlock } from "@/types/portfolio"
import { useState } from "react"
import { Plus, X } from "lucide-react"

interface BlockFormProps {
  type: "gallery" | "video" | "experience"
  onSave: (block: ContentBlock) => void
  onCancel: () => void
}

export function BlockForm({ type, onSave, onCancel }: BlockFormProps) {
  if (type === "gallery") {
    return <GalleryForm onSave={onSave} onCancel={onCancel} />
  }
  if (type === "video") {
    return <VideoForm onSave={onSave} onCancel={onCancel} />
  }
  if (type === "experience") {
    return <ExperienceForm onSave={onSave} onCancel={onCancel} />
  }
  return null
}

function GalleryForm({ onSave, onCancel }: Omit<BlockFormProps, "type">) {
  const [images, setImages] = useState([{ url: "", alt: "" }])

  const handleAdd = () => {
    setImages([...images, { url: "", alt: "" }])
  }

  const handleRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: "url" | "alt", value: string) => {
    const updated = [...images]
    updated[index][field] = value
    setImages(updated)
  }

  const handleSave = () => {
    const validImages = images.filter((img) => img.url.trim())
    if (validImages.length > 0) {
      onSave({ type: "gallery", images: validImages })
    }
  }

  const isValid = images.some((img) => img.url.trim())

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Add Gallery Images</h3>
        <p className="text-zinc-400 text-sm">Add images to create a beautiful gallery</p>
      </div>

      <div className="space-y-4">
        {images.map((image, index) => (
          <div key={index} className="flex gap-3 items-start p-4 border rounded-lg">
            <div className="flex-1 space-y-3">
              <div className="space-y-2">
                <Label htmlFor={`url-${index}`} className="text-sm">
                  Image URL *
                </Label>
                <Input
                  id={`url-${index}`}
                  placeholder="https://example.com/image.jpg"
                  value={image.url}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`alt-${index}`} className="text-sm">
                  Description
                </Label>
                <Input
                  id={`alt-${index}`}
                  placeholder="Image description"
                  value={image.alt}
                  onChange={(e) => handleChange(index, "alt", e.target.value)}
                  className="h-11"
                />
              </div>
            </div>
            {images.length > 1 && (
              <Button variant="ghost" size="icon" onClick={() => handleRemove(index)} className="flex-shrink-0">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}

        <Button variant="outline" onClick={handleAdd} className="w-full h-11 bg-transparent">
          <Plus className="w-4 h-4 mr-2" />
          Add Another Image
        </Button>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1 h-12 bg-transparent">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!isValid} className="flex-1 h-12">
          Save Gallery
        </Button>
      </div>
    </div>
  )
}

function VideoForm({ onSave, onCancel }: Omit<BlockFormProps, "type">) {
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")

  const handleSave = () => {
    if (url.trim()) {
      onSave({ type: "video", url: url.trim(), title: title.trim() || undefined })
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Embed a Video</h3>
        <p className="text-zinc-400 text-sm">Add a YouTube or Vimeo video URL</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="videoUrl" className="text-base">
            Video URL *
          </Label>
          <Input
            id="videoUrl"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="videoTitle" className="text-base">
            Title (Optional)
          </Label>
          <Input
            id="videoTitle"
            placeholder="Project showcase"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1 h-12 bg-transparent">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!url.trim()} className="flex-1 h-12">
          Save Video
        </Button>
      </div>
    </div>
  )
}

function ExperienceForm({ onSave, onCancel }: Omit<BlockFormProps, "type">) {
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [period, setPeriod] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")

  const handleSave = () => {
    if (title.trim() && company.trim()) {
      onSave({
        type: "experience",
        title: title.trim(),
        company: company.trim(),
        period: period.trim(),
        description: description.trim(),
        image: image.trim() || undefined,
      })
    }
  }

  const isValid = title.trim() && company.trim()

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Add Experience</h3>
        <p className="text-zinc-400 text-sm">Share your work history and achievements</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="expTitle" className="text-base">
            Job Title *
          </Label>
          <Input
            id="expTitle"
            placeholder="Senior Designer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expCompany" className="text-base">
            Company *
          </Label>
          <Input
            id="expCompany"
            placeholder="Tech Company Inc."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expPeriod" className="text-base">
            Period
          </Label>
          <Input
            id="expPeriod"
            placeholder="2020 - Present"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expDescription" className="text-base">
            Description
          </Label>
          <Textarea
            id="expDescription"
            placeholder="Describe your role and achievements..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-24 resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expImage" className="text-base">
            Company Logo URL (Optional)
          </Label>
          <Input
            id="expImage"
            placeholder="https://example.com/logo.png"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1 h-12 bg-transparent">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!isValid} className="flex-1 h-12">
          Save Experience
        </Button>
      </div>
    </div>
  )
}
