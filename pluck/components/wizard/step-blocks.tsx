"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Images, Video, Briefcase, ArrowRight } from "lucide-react";
import type { BlockType } from "@/types/portfolio";

interface StepBlocksProps {
  onSelectBlock: (type: BlockType) => void;
  onBack: () => void;
}

const shell =
  "rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]";

export function StepBlocks({ onSelectBlock, onBack }: StepBlocksProps) {
  const blocks = [
    {
      type: "gallery" as BlockType,
      icon: Images,
      title: "Gallery",
      description: "Showcase your work with a premium grid"
    },
    {
      type: "video" as BlockType,
      icon: Video,
      title: "Video",
      description: "Embed YouTube or Vimeo seamlessly"
    },
    {
      type: "experience" as BlockType,
      icon: Briefcase,
      title: "Experience",
      description: "Add work history with clean structure"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Content blocks
        </p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight">
          Choose what to add
        </h2>
        <p className="text-sm leading-relaxed text-zinc-300">
          Pick a block type. We’ll format it like a designer did it.
        </p>
      </div>

      <div className="grid gap-4">
        {blocks.map((block) => {
          const Icon = block.icon;
          return (
            <Card
              key={block.type}
              className={`${shell} cursor-pointer transition hover:bg-white/[0.05]`}
              onClick={() => onSelectBlock(block.type)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold">{block.title}</h3>
                    <p className="mt-1 text-sm text-zinc-300">
                      {block.description}
                    </p>
                  </div>

                  <ArrowRight className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button
        variant="outline"
        onClick={onBack}
        className="h-12 w-full rounded-2xl border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
      >
        Back
      </Button>
    </div>
  );
}
