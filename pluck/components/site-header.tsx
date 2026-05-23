"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Menu, X, LayoutDashboard } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Story", href: "#story" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentUser = useQuery(api.auth.currentUser);
  const isLoggedIn = !!currentUser;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/10 text-sm font-semibold">
            P
          </span>
          <span className="text-sm font-semibold tracking-tight">GoPeek</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-zinc-300 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 sm:flex">
          {currentUser === undefined ? (
            // Loading — reserve space so layout doesn't shift
            <div className="h-9 w-28 animate-pulse rounded-2xl bg-white/5" />
          ) : isLoggedIn ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-900 hover:text-white transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth"
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
              >
                Sign in
              </Link>
              <Link
                href="/startup"
                className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-900 hover:text-white transition-colors"
              >
                Start Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-white sm:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-black/80 px-6 pb-6 pt-4 sm:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
            {currentUser === undefined ? null : isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-zinc-900 hover:text-white transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-center text-sm font-semibold text-white/90"
                >
                  Sign in
                </Link>
                <Link
                  href="/startup"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl bg-white px-4 py-2.5 text-center text-sm font-semibold text-black hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
