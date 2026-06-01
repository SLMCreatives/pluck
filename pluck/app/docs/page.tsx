import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "step-1", label: "Step 1 — Your Profile" },
  { id: "step-2", label: "Step 2 — Socials & Contact" },
  { id: "step-3", label: "Step 3 — Your Work" },
  { id: "step-4", label: "Step 4 — Preview & Publish" },
  { id: "content-blocks", label: "Content Blocks" },
  { id: "after-publishing", label: "After Publishing" },
  { id: "plans", label: "Plans & Pricing" },
  { id: "faq", label: "FAQ" },
];

export const metadata = {
  title: "How to Build Your Portfolio — GoPeek Docs",
  description:
    "A step-by-step guide to building and publishing your free freelancer portfolio on GoPeek. Covers the 4-step wizard, content blocks, the dashboard (Edit, Share, Analytics), and plan pricing.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "How to Build Your Portfolio — GoPeek Docs",
    description:
      "A step-by-step guide to building and publishing your free freelancer portfolio on GoPeek. No design skills required.",
    url: "https://gopeek.my/docs",
  },
  twitter: {
    card: "summary",
    title: "How to Build Your Portfolio — GoPeek Docs",
    description:
      "A step-by-step guide to building and publishing your free freelancer portfolio on GoPeek.",
  },
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader />

      {/* Page hero */}
      <div className="border-b border-white/8 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-400 mb-5">
            Documentation
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            How to Build Your Portfolio
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
            A complete walkthrough — from the first step of the wizard to sharing
            your live link with clients.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/startup"
              className="inline-flex items-center rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-zinc-100 transition-colors"
            >
              Start Building — Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-white/10 transition-colors"
            >
              See Plans
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* Sticky sidebar TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              On this page
            </p>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block rounded-lg px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <article className="min-w-0 space-y-20">

          {/* ── Overview ── */}
          <Section id="overview" title="Overview">
            <Prose>
              <p>
                GoPeek is a mobile-first portfolio builder for freelancers. You
                answer a few short prompts, add your best work, and your portfolio
                is live — for free, in under 5 minutes. No design skills, no
                hosting fees, no endless template decisions.
              </p>
              <p>
                You don't need to create an account to start. Just head to{" "}
                <InlineLink href="/startup">gopeek.my/startup</InlineLink>, build
                your portfolio, preview it, then sign up when you're ready to
                publish.
              </p>
            </Prose>

            <InfoBox>
              <strong>Your progress is always saved.</strong> If you reach the
              preview step and haven't signed up yet, your work is stored in your
              browser. Sign up to publish — it picks up exactly where you left
              off.
            </InfoBox>

            <h3 className="mt-6 text-base font-semibold text-zinc-200">The 4-step wizard</h3>
            <StepList
              items={[
                { n: "01", title: "Your Profile", desc: "Name, title, bio, and profile photo." },
                { n: "02", title: "Socials & Contact", desc: "Add your social links and how clients can reach you." },
                { n: "03", title: "Your Work", desc: "Create tabs (sections) and add content blocks inside them." },
                { n: "04", title: "Preview & Publish", desc: "See your live portfolio, sign up, and go live." },
              ]}
            />
          </Section>

          {/* ── Step 1 ── */}
          <Section id="step-1" step="Step 1" title="Your Profile">
            <Prose>
              <p>
                The first step collects the basics that appear at the top of your
                portfolio — your identity at a glance.
              </p>
            </Prose>

            <FieldList
              fields={[
                {
                  label: "Full Name",
                  required: true,
                  desc: "Your real name or the name you work under (e.g. Amirah Razali or AmiDesigns).",
                },
                {
                  label: "Professional Title",
                  required: true,
                  desc: 'What you do in a few words. Be specific — "Freelance UI/UX Designer" is better than just "Designer".',
                },
                {
                  label: "Bio",
                  required: false,
                  desc: "2–3 sentences about what you do, who you help, and what makes you different. Think of it as your elevator pitch.",
                },
                {
                  label: "Profile Photo",
                  required: false,
                  desc: "A clear headshot or brand photo. Square images work best. JPEG/PNG, max 5 MB.",
                },
              ]}
            />

            <Tip>
              Keep your title clear and search-friendly. "Freelance Video Editor —
              Corporate & Social Media" tells a client in one line whether you're
              the right fit.
            </Tip>
          </Section>

          {/* ── Step 2 ── */}
          <Section id="step-2" step="Step 2" title="Socials & Contact">
            <Prose>
              <p>
                This step sets up your social links and how clients can reach you
                directly from your portfolio. A prominent <strong>Contact Me</strong>{" "}
                button is automatically generated from the information you provide
                here.
              </p>
            </Prose>

            <FieldList
              fields={[
                {
                  label: "Social Links",
                  required: false,
                  desc: "Add links to Instagram, LinkedIn, Behance, GitHub, YouTube, or any website. Each one becomes a clickable icon on your profile.",
                },
                {
                  label: "WhatsApp / Email",
                  required: false,
                  desc: "The Contact Me button uses WhatsApp first, then email as a fallback. Enter your number (digits only, with country code) or email address.",
                },
                {
                  label: "Show Phone Number",
                  required: false,
                  desc: "Toggle this on if you want your phone number displayed publicly on your portfolio. Off by default.",
                },
              ]}
            />

            <InfoBox>
              The <strong>Contact Me</strong> button is one of GoPeek&apos;s most
              valuable features. Clients tap it and land directly in your WhatsApp
              chat. No copy-pasting numbers, no friction.
            </InfoBox>
          </Section>

          {/* ── Step 3 ── */}
          <Section id="step-3" step="Step 3" title="Your Work">
            <Prose>
              <p>
                This is where you showcase what you do. GoPeek organises your
                work into <strong>Tabs</strong> (sections) that each contain{" "}
                <strong>Content Blocks</strong> (individual pieces of work).
              </p>
            </Prose>

            <h3 className="text-base font-semibold text-zinc-200">Tabs</h3>
            <Prose>
              <p>
                A Tab is a named section — think of it as a category or project
                folder. Examples: "Work", "Photography", "Writing", "UX Projects".
                Visitors switch between your tabs using a tab bar at the top of
                your portfolio.
              </p>
              <p>
                A default tab called "Work" is created for you. You can rename it,
                add more (up to 3 on Free), or delete tabs that are empty.
              </p>
            </Prose>

            <h3 className="mt-6 text-base font-semibold text-zinc-200">Adding content to a tab</h3>
            <Prose>
              <p>
                Inside each tab, tap <strong>+ Add Content</strong> to choose a
                block type. You can add up to 3 blocks total across all your tabs
                on the Free plan.
              </p>
            </Prose>

            <LimitBox />

            <Tip>
              Use one tab per service type. If you're a photographer and a
              videographer, "Photography" and "Video" as separate tabs keeps your
              work clean and easy to browse.
            </Tip>
          </Section>

          {/* ── Step 4 ── */}
          <Section id="step-4" step="Step 4" title="Preview & Publish">
            <Prose>
              <p>
                When you've added your content, click <strong>Preview</strong> to
                see your portfolio exactly as a visitor would. The preview is
                full-screen and interactive — scroll through it, tap the Contact
                button, switch tabs.
              </p>
            </Prose>

            <div className="space-y-4">
              <ActionCard
                title="Sign up & Publish — Free"
                desc="Creates your free account and makes your portfolio live instantly. Your URL is auto-generated (e.g. gopeek.my/a7x92k) and shown on your dashboard."
                badge="For new visitors"
                color="emerald"
              />
              <ActionCard
                title="Sign in"
                desc="If you already have a GoPeek account, sign in to save this portfolio to your existing account."
                badge="Returning users"
                color="zinc"
              />
            </div>

            <Prose>
              <p className="mt-4">
                After publishing you're taken to your <strong>Dashboard</strong>,
                which has three primary sections:
              </p>
            </Prose>
            <StepList
              items={[
                { n: "✏️", title: "Edit", desc: "See your project and block counts, and jump straight into the editor to update your portfolio." },
                { n: "📊", title: "Analytics", desc: "Track total profile views. Available on the Publish plan — shows a locked state with an upgrade prompt on Free." },
                { n: "🔗", title: "Share", desc: "Copy your public URL, open your live profile, toggle visibility (Publish only), and share to WhatsApp, X, or Instagram." },
              ]}
            />
          </Section>

          {/* ── Content Blocks ── */}
          <Section id="content-blocks" title="Content Blocks">
            <Prose>
              <p>
                Content blocks are the building units inside each tab. There are
                three types. Choose based on what best represents the work you're
                showing.
              </p>
            </Prose>

            <div className="space-y-4">
              <BlockCard
                icon="🖼️"
                title="Gallery"
                desc="Upload a set of images to showcase a project visually. Great for designers, photographers, and anyone with visual work. Add a title and optional caption."
                note="Free plan: 6 images total across all gallery blocks."
                fields={["Title", "Images (JPEG/PNG/WebP, max 5 MB each)", "Caption (optional)"]}
              />
              <BlockCard
                icon="▶️"
                title="Video"
                desc="Paste a YouTube or Vimeo link to embed a video directly on your profile. Ideal for videographers, motion designers, and content creators."
                note="Video files are not uploaded — only links are supported."
                fields={["Title", "YouTube or Vimeo URL", "Caption (optional)"]}
              />
              <BlockCard
                icon="💼"
                title="Experience"
                desc="A text-based block for describing a job, project, or achievement. Includes a date range so clients can see your timeline."
                note="Use this for client projects, full-time roles, or notable achievements."
                fields={["Role / Project title", "Company or Client", "Date range", "Description"]}
              />
            </div>
          </Section>

          {/* ── After Publishing ── */}
          <Section id="after-publishing" title="After Publishing">
            <h3 className="text-base font-semibold text-zinc-200">Editing your portfolio</h3>
            <Prose>
              <p>
                Go to your <InlineLink href="/dashboard">Dashboard</InlineLink>{" "}
                and click <strong>Edit Portfolio</strong>. The same wizard opens
                pre-filled with your existing data. Make your changes and click{" "}
                <strong>Save Changes</strong> — your live profile updates
                immediately.
              </p>
            </Prose>

            <h3 className="mt-8 text-base font-semibold text-zinc-200">Your public URL</h3>
            <Prose>
              <p>
                On the Free plan your URL is auto-generated:{" "}
                <code className="rounded bg-white/8 px-1.5 py-0.5 text-xs font-mono text-zinc-300">
                  gopeek.my/a7x92k
                </code>
                . You can share this link immediately — it works and looks great as-is.
              </p>
              <p>
                On the <strong>Publish plan</strong> you can set a custom slug:{" "}
                <code className="rounded bg-white/8 px-1.5 py-0.5 text-xs font-mono text-zinc-300">
                  gopeek.my/yourname
                </code>
                . Go to Edit Portfolio → the Preview step → type your preferred
                username. Slugs must be unique and contain only letters, numbers,
                and hyphens.
              </p>
            </Prose>

            <h3 className="mt-8 text-base font-semibold text-zinc-200">View count</h3>
            <Prose>
              <p>
                Profile view count is available on the <strong>Publish plan</strong>.
                It shows on your dashboard and updates each time a unique visitor
                opens your public portfolio page.
              </p>
            </Prose>
          </Section>

          {/* ── Plans ── */}
          <Section id="plans" title="Plans & Pricing">
            <div className="grid gap-4 sm:grid-cols-2">
              <PlanCard
                name="Free"
                price="RM 0"
                note="Free forever — not a trial"
                features={[
                  "Live gopeek.my link — instantly",
                  "WhatsApp & email contact button",
                  "3 projects, 3 blocks, 6 images",
                  "Looks great on any phone",
                  "No credit card required",
                ]}
                cta={{ label: "Build My Free Portfolio", href: "/startup" }}
              />
              <PlanCard
                name="Publish"
                price="from RM 19"
                note="One-time payment, no auto-renewal"
                highlighted
                features={[
                  "Unlimited tabs, blocks & images",
                  "Custom username (gopeek.my/yourname)",
                  "No GoPeek badge",
                  "Basic analytics (view count)",
                  "Enhanced lead capture",
                ]}
                cta={{ label: "See Plans", href: "/pricing" }}
              />
            </div>

            <h3 className="mt-10 text-base font-semibold text-zinc-200">Publish plan durations</h3>
            <Prose>
              <p>
                RM 19 per month, charged as a one-time payment for your chosen duration. Use the slider on the{" "}
                <InlineLink href="/pricing">pricing page</InlineLink> to select how many months you want.
              </p>
            </Prose>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8 text-left text-zinc-500">
                    <th className="px-4 py-3 font-medium">Duration</th>
                    <th className="px-4 py-3 font-medium">Price (RM 19 × months)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {[
                    { d: "1 month",   p: "RM 19"  },
                    { d: "3 months",  p: "RM 57"  },
                    { d: "6 months",  p: "RM 114" },
                    { d: "12 months", p: "RM 228" },
                  ].map((r) => (
                    <tr key={r.d}>
                      <td className="px-4 py-3">{r.d}</td>
                      <td className="px-4 py-3 font-semibold text-white">{r.p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mt-10 text-base font-semibold text-zinc-200">Renewing or extending</h3>
            <Prose>
              <p>
                You can renew at any time from your dashboard. If you renew{" "}
                <em>before</em> your current plan expires, the new duration is
                added on top of your remaining time — not from the renewal date.
                This means renewing early never wastes time you've already paid
                for.
              </p>
            </Prose>

            <h3 className="mt-8 text-base font-semibold text-zinc-200">What happens when Publish expires</h3>
            <Prose>
              <p>
                Your portfolio reverts to the Free tier automatically. All your
                content stays intact — nothing is deleted. Your custom slug is
                paused (the URL returns to the auto-generated one) and the GoPeek
                badge reappears. Renew to restore everything.
              </p>
            </Prose>
          </Section>

          {/* ── FAQ ── */}
          <Section id="faq" title="FAQ">
            <div className="space-y-4">
              {[
                {
                  q: "Do I need to sign up before I start building?",
                  a: 'No. You can go through the entire wizard without an account. Your data is stored in your browser. When you\'re ready to publish, click "Sign up & Publish" and your work is saved instantly.',
                },
                {
                  q: "Can I change my URL after publishing?",
                  a: "Yes — on the Publish plan. Go to Edit Portfolio, navigate to the Preview step, and type in your custom slug. Free plan profiles keep their auto-generated URL.",
                },
                {
                  q: "What happens to my portfolio if my Publish plan expires?",
                  a: "It safely reverts to the Free tier. All content stays. Your custom URL is paused and the GoPeek badge returns. Renew any time to restore paid features.",
                },
                {
                  q: "Can I have more than one portfolio?",
                  a: "Each account currently supports one portfolio. Multiple portfolios are on the roadmap for a future plan.",
                },
                {
                  q: "Is there auto-renewal?",
                  a: "No. GoPeek uses one-time payments, not subscriptions. You're charged once for the duration you choose, and you'll need to renew manually when it expires.",
                },
                {
                  q: "How do I delete my portfolio?",
                  a: "Contact us at info@slmcreatives.com and we'll handle the deletion.",
                },
                {
                  q: "What image formats are supported?",
                  a: "JPEG, PNG, and WebP. Maximum 5 MB per image. On the Free plan you can upload up to 6 images total across all gallery blocks.",
                },
                {
                  q: "Can visitors contact me directly from my portfolio?",
                  a: "Yes. The Contact Me button opens a WhatsApp chat or email compose window directly. Configure this in Step 2 of the wizard.",
                },
              ].map(({ q, a }) => (
                <FaqItem key={q} q={q} a={a} />
              ))}
            </div>
          </Section>

          {/* Footer CTA */}
          <div className="rounded-3xl border border-white/8 bg-white/3 p-8 text-center">
            <h2 className="text-xl font-bold">Ready to go live?</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Build your portfolio for free — no credit card, no design skills
              required.
            </p>
            <Link
              href="/startup"
              className="mt-6 inline-flex items-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-100 transition-colors"
            >
              Start Building
            </Link>
          </div>

        </article>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Section({
  id,
  step,
  title,
  children,
}: {
  id: string;
  step?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      {step && (
        <span className="mb-2 inline-block rounded-full bg-indigo-500/15 px-3 py-0.5 text-xs font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
          {step}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-6 space-y-4">{children}</div>
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-zinc-400 [&_strong]:text-zinc-200 [&_em]:text-zinc-300">
      {children}
    </div>
  );
}

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-indigo-400 underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/8 px-4 py-3 text-sm text-zinc-300 [&_strong]:text-white">
      {children}
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/8 px-4 py-3 text-sm text-zinc-300">
      <span className="shrink-0 text-amber-400">💡</span>
      <span>{children}</span>
    </div>
  );
}

function LimitBox() {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        Free plan limits
      </p>
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { val: "3", label: "Tabs" },
          { val: "3", label: "Blocks" },
          { val: "6", label: "Images" },
        ].map(({ val, label }) => (
          <div key={label} className="rounded-xl bg-white/5 px-3 py-2">
            <p className="text-xl font-bold text-white">{val}</p>
            <p className="text-xs text-zinc-500">{label}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        Upgrade to Publish for unlimited tabs, blocks, and images.
      </p>
    </div>
  );
}

function StepList({ items }: { items: { n: string; title: string; desc: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map(({ n, title, desc }) => (
        <div key={n} className="flex gap-4 rounded-2xl border border-white/8 bg-white/3 p-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-zinc-300">
            {n}
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="mt-0.5 text-sm text-zinc-400">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FieldList({ fields }: { fields: { label: string; required: boolean; desc: string }[] }) {
  return (
    <div className="divide-y divide-white/5 rounded-2xl border border-white/8 overflow-hidden">
      {fields.map(({ label, required, desc }) => (
        <div key={label} className="flex gap-4 bg-white/3 px-4 py-3">
          <div className="w-36 shrink-0">
            <span className="text-sm font-semibold text-zinc-200">{label}</span>
            {required && (
              <span className="ml-1.5 text-[10px] font-semibold text-emerald-400">required</span>
            )}
          </div>
          <p className="text-sm text-zinc-400">{desc}</p>
        </div>
      ))}
    </div>
  );
}

function ActionCard({
  title,
  desc,
  badge,
  color,
}: {
  title: string;
  desc: string;
  badge: string;
  color: "emerald" | "zinc";
}) {
  const ring = color === "emerald" ? "ring-emerald-500/25 bg-emerald-500/5" : "ring-white/8 bg-white/3";
  const badgeCls =
    color === "emerald"
      ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20"
      : "bg-white/8 text-zinc-400";
  return (
    <div className={`rounded-2xl p-4 ring-1 ${ring}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-white">{title}</p>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${badgeCls}`}>
          {badge}
        </span>
      </div>
      <p className="mt-1.5 text-sm text-zinc-400">{desc}</p>
    </div>
  );
}

function BlockCard({
  icon,
  title,
  desc,
  note,
  fields,
}: {
  icon: string;
  title: string;
  desc: string;
  note: string;
  fields: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-5">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-zinc-400">{desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {fields.map((f) => (
          <span
            key={f}
            className="rounded-lg border border-white/8 bg-white/5 px-2.5 py-0.5 text-xs text-zinc-400"
          >
            {f}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-500 border-t border-white/5 pt-3">{note}</p>
    </div>
  );
}

function PlanCard({
  name,
  price,
  note,
  features,
  cta,
  highlighted = false,
}: {
  name: string;
  price: string;
  note: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}) {
  return (
    <div
      className={`flex flex-col rounded-3xl p-6 ${
        highlighted
          ? "border border-indigo-500/30 bg-indigo-500/8 ring-1 ring-indigo-500/20"
          : "border border-white/8 bg-white/3"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-300">{name}</p>
      </div>
      <p className="mt-2 text-2xl font-bold text-white">{price}</p>
      <p className="text-xs text-zinc-500">{note}</p>
      <ul className="mt-4 flex-1 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={cta.href}
        className={`mt-6 rounded-2xl px-4 py-2.5 text-center text-sm font-semibold transition-colors ${
          highlighted
            ? "bg-indigo-600 text-white hover:bg-indigo-500"
            : "bg-white/8 text-zinc-200 hover:bg-white/15"
        }`}
      >
        {cta.label}
      </Link>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 px-5 py-4">
      <p className="text-sm font-semibold text-white">{q}</p>
      <p className="mt-2 text-sm text-zinc-400">{a}</p>
    </div>
  );
}
