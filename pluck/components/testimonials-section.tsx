"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange?: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={onChange ? "button" : undefined}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={`text-xl transition ${onChange ? "cursor-pointer" : "cursor-default"} ${
            star <= (hovered || value) ? "text-amber-400" : "text-zinc-700"
          }`}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  rating,
}: {
  quote: string;
  name: string;
  role: string;
  rating: number;
}) {
  return (
    <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <StarRating value={rating} />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-500/20 text-sm font-bold text-indigo-300 ring-1 ring-inset ring-indigo-500/30">
          {name[0].toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="text-xs text-zinc-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

function SubmitForm({ onSuccess }: { onSuccess: () => void }) {
  const submit = useMutation(api.testimonials.submit);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !quote.trim()) {
      setError("Name and review are required.");
      return;
    }
    setLoading(true);
    try {
      await submit({ name: name.trim(), role: role.trim(), quote: quote.trim(), rating });
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
        Leave a review
      </p>

      <div className="space-y-1">
        <label className="text-xs text-zinc-400">Your rating</label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs text-zinc-400">Name *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Amirah R."
            maxLength={60}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-zinc-400">Role / profession</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Graphic designer, KL"
            maxLength={80}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-zinc-400">Your review *</label>
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="How has GoPeek helped you as a freelancer?"
          rows={3}
          maxLength={300}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
        />
        <p className="text-right text-[10px] text-zinc-600">{quote.length}/300</p>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-white py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
      >
        {loading ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}

export function TestimonialsSection() {
  const testimonials = useQuery(api.testimonials.list);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const isEmpty = testimonials !== undefined && testimonials.length === 0;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Early users
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Freelancers already using GoPeek.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
            Real feedback from our beta community.
          </p>
        </div>

        {!showForm && !submitted && (
          <button
            onClick={() => setShowForm(true)}
            className="shrink-0 self-start rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 sm:self-auto"
          >
            + Leave a review
          </button>
        )}
      </div>

      {/* Submission form */}
      {showForm && !submitted && (
        <div className="mt-8 max-w-xl">
          <SubmitForm
            onSuccess={() => {
              setSubmitted(true);
              setShowForm(false);
            }}
          />
        </div>
      )}

      {submitted && (
        <div className="mt-6 max-w-xl rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4">
          <p className="text-sm font-semibold text-emerald-300">
            Thanks for your review! It&apos;s now live.
          </p>
        </div>
      )}

      {/* Testimonial grid */}
      {testimonials === undefined ? (
        // Loading skeleton
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-3xl border border-white/5 bg-white/[0.02]"
            />
          ))}
        </div>
      ) : isEmpty ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-16 text-center">
          <p className="text-2xl">⭐</p>
          <p className="mt-3 text-sm font-semibold text-white">
            Be the first to leave a review
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Help other freelancers discover GoPeek.
          </p>
          {!showForm && !submitted && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-5 rounded-2xl bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-zinc-200 transition"
            >
              Write a review
            </button>
          )}
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t._id}
              quote={t.quote}
              name={t.name}
              role={t.role}
              rating={t.rating}
            />
          ))}
        </div>
      )}
    </section>
  );
}
