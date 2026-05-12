"use client";

import { use, useEffect } from "react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubscribedPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier } = use(searchParams);
  const router = useRouter();

  const profile = useQuery(api.profiles.getMyProfile);

  useEffect(() => {
    if (profile?.published) {
      const t = setTimeout(() => router.push("/dashboard"), 2500);
      return () => clearTimeout(t);
    }
  }, [profile?.published, router]);

  const tierLabel = tier === "pro" ? "Pro" : "Publish";

  if (profile?.published) {
    return (
      <Shell>
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400" />
        <h1 className="text-2xl font-semibold">You&apos;re live!</h1>
        <p className="text-zinc-400">
          {tierLabel} plan activated. Redirecting you to your dashboard&hellip;
        </p>
        <Button asChild className="h-12 w-full rounded-2xl bg-white text-black hover:bg-zinc-200">
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </Shell>
    );
  }

  return (
    <Shell>
      <Loader2 className="mx-auto h-14 w-14 animate-spin text-indigo-400" />
      <h1 className="text-2xl font-semibold">Activating your {tierLabel} plan&hellip;</h1>
      <p className="text-zinc-400">
        This usually takes a few seconds. Please don&apos;t close this tab.
      </p>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="w-full max-w-sm space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        {children}
      </div>
    </div>
  );
}
