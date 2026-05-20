export const FREE_LIMITS = {
  tabs: 3,
  blocks: 3,
  images: 6,
} as const;

export const PUBLISH_LIMITS = {
  tabs: Infinity,
  blocks: Infinity,
  images: Infinity,
} as const;

export type TierLimits = { tabs: number; blocks: number; images: number };

export function limitsForTier(tier: string | undefined): TierLimits {
  if (!tier || tier === "free") return FREE_LIMITS;
  return PUBLISH_LIMITS;
}

export function countTotalBlocks(tabs: { blocks: unknown[] }[]): number {
  return tabs.reduce((n, t) => n + t.blocks.length, 0);
}

export function countTotalImages(
  tabs: { blocks: { type: string; images?: { url: string; alt: string }[] }[] }[]
): number {
  return tabs
    .flatMap((t) => t.blocks)
    .filter((b) => b.type === "gallery")
    .reduce((n, b) => n + (b.images?.length ?? 0), 0);
}
