"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

const EMOJIS = ["❤️", "🔥", "👏", "😍", "🚀", "✨"];

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("peek_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("peek_visitor_id", id);
  }
  return id;
}

function useReactionState(profileId: Id<"profiles">) {
  const [visitorId, setVisitorId] = useState("");
  const [optimistic, setOptimistic] = useState<Record<string, number>>({});
  const [optimisticReacted, setOptimisticReacted] = useState<Set<string>>(new Set());
  const pendingRef = useRef(false);

  useEffect(() => {
    setVisitorId(getOrCreateVisitorId());
  }, []);

  const data = useQuery(
    api.reactions.getReactions,
    visitorId ? { profileId, visitorId } : "skip"
  );
  const toggle = useMutation(api.reactions.toggleReaction);

  const counts: Record<string, number> = {};
  for (const { emoji, count } of data?.counts ?? []) counts[emoji] = count;
  const reacted = new Set(data?.reacted ?? []);

  const displayCounts: Record<string, number> = { ...counts };
  for (const [emoji, delta] of Object.entries(optimistic)) {
    displayCounts[emoji] = (displayCounts[emoji] ?? 0) + delta;
  }
  const displayReacted = new Set([...reacted, ...optimisticReacted]);
  for (const emoji of optimisticReacted) {
    if (reacted.has(emoji)) displayReacted.delete(emoji);
  }

  async function handleClick(emoji: string) {
    if (!visitorId || pendingRef.current) return;
    pendingRef.current = true;

    const wasReacted = reacted.has(emoji);
    const delta = wasReacted ? -1 : 1;

    setOptimistic((prev) => ({ ...prev, [emoji]: (prev[emoji] ?? 0) + delta }));
    setOptimisticReacted((prev) => {
      const next = new Set(prev);
      next.has(emoji) ? next.delete(emoji) : next.add(emoji);
      return next;
    });

    try {
      await toggle({ profileId, emoji, visitorId });
    } finally {
      setOptimistic({});
      setOptimisticReacted(new Set());
      pendingRef.current = false;
    }
  }

  return { displayCounts, displayReacted, handleClick };
}

export function InlineEmojiReactions({
  profileId,
  light,
}: {
  profileId: Id<"profiles">;
  light: boolean;
}) {
  const { displayCounts, displayReacted, handleClick } = useReactionState(profileId);
  const total = EMOJIS.reduce((n, e) => n + (displayCounts[e] ?? 0), 0);

  return (
    <div
      className={`rounded-2xl border p-4 transition-colors duration-300 ${
        light ? "border-slate-200 bg-white" : "border-white/8 bg-white/4"
      }`}
    >
      <p
        className={`mb-3 text-xs font-semibold uppercase tracking-wide ${
          light ? "text-slate-400" : "text-zinc-500"
        }`}
      >
        {total > 0 ? `${total} reaction${total === 1 ? "" : "s"}` : "Leave a reaction"}
      </p>
      <div className="flex flex-wrap gap-2">
        {EMOJIS.map((emoji) => {
          const count = displayCounts[emoji] ?? 0;
          const active = displayReacted.has(emoji);
          return (
            <button
              key={emoji}
              onClick={() => handleClick(emoji)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all duration-150 select-none active:scale-95 ${
                active
                  ? light
                    ? "border-indigo-300 bg-indigo-50 text-indigo-700 font-semibold"
                    : "border-indigo-500/40 bg-indigo-500/15 font-semibold"
                  : light
                  ? "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <span className="leading-none">{emoji}</span>
              {count > 0 && (
                <span
                  className={`text-xs tabular-nums ${
                    active
                      ? light ? "text-indigo-600" : "text-indigo-300"
                      : light ? "text-slate-500" : "text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
