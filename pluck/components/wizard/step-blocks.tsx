"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Images, Video, Briefcase, ArrowRight } from "lucide-react"
import type { BlockType } from "@/types/portfolio"

interface StepBlocksProps {
  onSelectBlock: (type: BlockType) => void
  onBack: () => void
}

export function StepBlocks({ onSelectBlock, onBack }: StepBlocksProps) {
  const blocks = [
    {
      type: "gallery" as BlockType,
      icon: Images,
      title: "Gallery",
      description: "Showcase your work with a beautiful image grid",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      type: "video" as BlockType,
      icon: Video,
      title: "Video",
      description: "Embed YouTube or Vimeo videos",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      type: "experience" as BlockType,
      icon: Briefcase,
      title: "Experience",
      description: "List your work history and achievements",
      gradient: "from-orange-500 to-red-600",
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-balance">Choose a content block</h2>
        <p className="text-zinc-400 text-pretty">Select the type of content you want to add to your portfolio</p>
      </div>

      <div className="grid gap-4">
        {blocks.map((block) => {
          const Icon = block.icon
          return (
            <Card
              key={block.type}
              className="border-2 hover:border-zinc-600 transition-all cursor-pointer group"
              onClick={() => onSelectBlock(block.type)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${block.gradient} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1">{block.title}</h3>
                    <p className="text-sm text-zinc-400 text-pretty">{block.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Button variant="outline" onClick={onBack} className="w-full h-12 text-base bg-transparent">
        Back
      </Button>
    </div>
  )
}
