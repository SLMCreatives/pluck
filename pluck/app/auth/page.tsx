"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();

  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn("password", { email, password, flow: mode });
      router.push("/startup");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/GoPeek.png" width={36} height={36} alt="GoPeek logo" className="rounded-xl object-contain" />
          <Image src="/gopeek_logo_text.png" width={80} height={22} alt="GoPeek" className="object-contain" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">
            {mode === "signIn" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-zinc-400">
            {mode === "signIn"
              ? "Sign in to manage your portfolio."
              : "Start building your portfolio for free."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-white text-black hover:bg-zinc-900 hover:text-white transition-colors"
          >
            {loading
              ? "Please wait…"
              : mode === "signIn"
              ? "Sign In"
              : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-zinc-400">
          {mode === "signIn" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "signIn" ? "signUp" : "signIn");
              setError(null);
            }}
            className="text-white underline-offset-4 hover:underline"
          >
            {mode === "signIn" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </main>
  );
}
