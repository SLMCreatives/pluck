"use client"

import type { PortfolioData, ContentBlock } from "@/types/portfolio"
import { Instagram, Linkedin, Twitter, Globe, Mail } from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface PortfolioPreviewProps {
  data: PortfolioData
  activeTab?: string
}

export function PortfolioPreview({ data, activeTab }: PortfolioPreviewProps) {
  const [selectedTabId, setSelectedTabId] = useState(activeTab || data.tabs[0]?.id)
  const currentTab = data.tabs.find((t) => t.id === selectedTabId) || data.tabs[0]

  const getSocialIcon = (platform: string) => {
    const icons: Record<string, any> = {
      instagram: Instagram,
      linkedin: Linkedin,
      twitter: Twitter,
      website: Globe,
      email: Mail,
    }
    return icons[platform.toLowerCase()] || Globe
  }

  return (
    <div className="min-h-full bg-white text-zinc-900">
      {/* Profile Section */}
      <div className="px-6 pt-12 pb-6 text-center border-b">
        <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-zinc-100">
          <AvatarImage
            src={data.profileImage || "/placeholder.svg?height=96&width=96&query=professional+headshot"}
            alt={data.fullName}
          />
          <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            {data.fullName
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "UN"}
          </AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-bold mb-1 text-balance">{data.fullName || "Your Name"}</h1>
        <p className="text-sm text-zinc-600 mb-3">{data.professionalTitle || "Your Title"}</p>

        {data.bio && (
          <p className="text-sm text-zinc-700 leading-relaxed mb-4 text-pretty max-w-sm mx-auto">{data.bio}</p>
        )}

        {/* Social Links */}
        {data.socialLinks.length > 0 && (
          <div className="flex gap-2 justify-center flex-wrap">
            {data.socialLinks.map((link, idx) => {
              const Icon = getSocialIcon(link.platform)
              return (
                <Button key={idx} variant="outline" size="sm" className="h-9 px-3 bg-transparent" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Icon className="w-4 h-4 mr-1.5" />
                    {link.platform}
                  </a>
                </Button>
              )
            })}
          </div>
        )}
      </div>

      {/* Tabs */}
      {data.tabs.length > 0 && (
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b z-10">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 px-6 py-3 min-w-max">
              {data.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTabId(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                    selectedTabId === tab.id ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {currentTab?.blocks.map((block, idx) => (
          <BlockRenderer key={idx} block={block} />
        ))}

        {(!currentTab || currentTab.blocks.length === 0) && (
          <div className="text-center py-12 text-zinc-400">
            <p className="text-sm">No content added yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  if (block.type === "gallery") {
    return (
      <div className="columns-2 gap-3 mb-6">
        {block.images.map((img, idx) => (
          <div key={idx} className="mb-3 break-inside-avoid">
            <img
              src={img.url || `/placeholder.svg?height=400&width=300&query=portfolio+image+${idx}`}
              alt={img.alt}
              className="w-full rounded-lg"
            />
          </div>
        ))}
      </div>
    )
  }

  if (block.type === "video") {
    const getEmbedUrl = (url: string) => {
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = url.includes("youtu.be")
          ? url.split("youtu.be/")[1]?.split("?")[0]
          : url.split("v=")[1]?.split("&")[0]
        return `https://www.youtube.com/embed/${videoId}`
      }
      if (url.includes("vimeo.com")) {
        const videoId = url.split("vimeo.com/")[1]?.split("?")[0]
        return `https://player.vimeo.com/video/${videoId}`
      }
      return url
    }

    return (
      <div className="mb-6">
        {block.title && <h3 className="font-semibold mb-2">{block.title}</h3>}
        <div className="aspect-video rounded-lg overflow-hidden bg-zinc-100">
          <iframe
            src={getEmbedUrl(block.url)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    )
  }

  if (block.type === "experience") {
    return (
      <div className="mb-6 pb-6 border-b last:border-0">
        <div className="flex gap-4">
          {block.image && (
            <img
              src={block.image || "/placeholder.svg"}
              alt={block.company}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base mb-0.5">{block.title}</h3>
            <p className="text-sm text-zinc-600 mb-1">{block.company}</p>
            <p className="text-xs text-zinc-500 mb-2">{block.period}</p>
            <p className="text-sm text-zinc-700 leading-relaxed text-pretty">{block.description}</p>
          </div>
        </div>
      </div>
    )
  }

  return null
}
