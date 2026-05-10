"use client";

import { use, useEffect } from "react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaidPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string; canceled?: string; session_id?: string }>;
}) {
  const { slug, canceled } = use(searchParams);
  const router = useRouter();

  const status = useQuery(
    api.profiles.getPublishStatus,
    slug ? { slug } : "skip"
  );

  useEffect(() => {
    if (status?.published) {
      const t = setTimeout(() => router.push("/dashboard"), 2500);
      return () => clearTimeout(t);
    }
  }, [status?.published, router]);

  if (canceled === "true") {
    return (
      <Shell>
        <XCircle className="mx-auto h-14 w-14 text-red-400" />
        <h1 className="text-2xl font-semibold">Payment cancelled</h1>
        <p className="text-zinc-400">
          Your portfolio has been saved. You can try again anytime.
        </p>
        <Button asChild className="h-12 w-full rounded-2xl bg-white text-black hover:bg-zinc-200">
          <Link href="/startup">Back to wizard</Link>
        </Button>
      </Shell>
    );
  }

  if (status?.published) {
    return (
      <Shell>
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400" />
        <h1 className="text-2xl font-semibold">You&apos;re live!</h1>
        <p className="text-zinc-400">Redirecting you to your dashboard&hellip;</p>
        <Button asChild className="h-12 w-full rounded-2xl bg-white text-black hover:bg-zinc-200">
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </Shell>
    );
  }

  return (
    <Shell>
      <Loader2 className="mx-auto h-14 w-14 animate-spin text-indigo-400" />
      <h1 className="text-2xl font-semibold">Confirming payment&hellip;</h1>
      <p className="text-zinc-400">
        This usually takes a few seconds. Please don&apos;t close this tab.
      </p>
      {slug && (
        <p className="font-mono text-sm text-zinc-500">pluck.link/{slug}</p>
      )}
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
