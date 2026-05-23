import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Privacy Policy — GoPeek",
  description: "How GoPeek collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
          >
            <Image src="/GoPeek.png" width={28} height={28} alt="GoPeek" className="rounded-lg object-contain" />
            <Image src="/gopeek_logo_text.png" width={64} height={18} alt="GoPeek" className="object-contain" />
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-sm text-zinc-400">Last updated: {new Date().toLocaleDateString("en-MY", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8 text-zinc-300 [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_p]:leading-relaxed [&_ul]:mt-2 [&_ul]:space-y-1 [&_ul]:pl-5 [&_li]:list-disc">

          <p>
            GoPeek ("we", "us", or "our") operates the GoPeek portfolio builder at gopeek.my. This
            Privacy Policy explains what information we collect, how we use it, and the choices you
            have. By using our service you agree to the practices described here.
          </p>

          <div>
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly when you:</p>
            <ul>
              <li>Create an account (email address and password)</li>
              <li>Build your portfolio (name, professional title, bio, profile image, social links, project content)</li>
              <li>Make a payment (handled entirely by Stripe — we store only your Stripe customer ID and subscription status)</li>
            </ul>
            <p className="mt-3">
              We also collect limited usage data automatically, including page view counts on public
              profiles and standard server logs (IP address, browser type, referring URL). We use
              Cloudflare Web Analytics, which is cookie-free and does not track individuals across sites.
            </p>
          </div>

          <div>
            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To create and maintain your account</li>
              <li>To display your public portfolio to visitors</li>
              <li>To process payments and manage your subscription</li>
              <li>To send transactional emails (account confirmation, payment receipts)</li>
              <li>To enforce our Terms of Service and prevent abuse</li>
              <li>To improve the service through aggregate, anonymised analytics</li>
            </ul>
            <p className="mt-3">We do not sell your personal data to third parties.</p>
          </div>

          <div>
            <h2>3. Data Storage and Security</h2>
            <p>
              Your data is stored in Convex cloud infrastructure. Payment information is processed
              and stored by Stripe, Inc. and is never stored on our servers. We use industry-standard
              encryption in transit (TLS) and apply access controls to limit who can view your data.
            </p>
          </div>

          <div>
            <h2>4. Public Portfolio Content</h2>
            <p>
              Any content you choose to publish on your GoPeek profile (name, bio, images, project
              details) is publicly accessible by anyone with your portfolio URL. Do not publish
              information you wish to keep private.
            </p>
          </div>

          <div>
            <h2>5. Cookies</h2>
            <p>
              We use a minimal session cookie to keep you logged in. Our analytics provider
              (Cloudflare Web Analytics) does not use cookies or fingerprinting. We do not use
              advertising cookies.
            </p>
          </div>

          <div>
            <h2>6. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong className="text-white">Convex</strong> — database and backend infrastructure</li>
              <li><strong className="text-white">Stripe</strong> — payment processing</li>
              <li><strong className="text-white">Cloudflare</strong> — CDN, DDoS protection, and web analytics</li>
              <li><strong className="text-white">Vercel</strong> — frontend hosting</li>
            </ul>
            <p className="mt-3">Each provider has their own privacy policy governing their use of your data.</p>
          </div>

          <div>
            <h2>7. Data Retention</h2>
            <p>
              We retain your account and portfolio data for as long as your account is active. If
              your subscription expires and your account becomes inactive, we may delete your data
              after 12 months of inactivity. You may request deletion at any time (see Section 8).
            </p>
          </div>

          <div>
            <h2>8. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Export your portfolio content</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:info@slmcreatives.com" className="text-indigo-400 hover:text-indigo-300 transition">
                info@slmcreatives.com
              </a>.
            </p>
          </div>

          <div>
            <h2>9. Children's Privacy</h2>
            <p>
              GoPeek is not directed at children under 13. We do not knowingly collect personal
              information from children. If you believe a child has provided us with their data,
              contact us and we will delete it promptly.
            </p>
          </div>

          <div>
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify registered users
              of material changes via email. Continued use of the service after changes are posted
              constitutes your acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2>11. Contact</h2>
            <p>
              Questions about this policy? Reach us at{" "}
              <a href="mailto:info@slmcreatives.com" className="text-indigo-400 hover:text-indigo-300 transition">
                info@slmcreatives.com
              </a>.
            </p>
          </div>
        </div>

        <div className="mt-12 flex gap-6 border-t border-white/10 pt-8 text-sm text-zinc-500">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
        </div>
      </div>
    </main>
  );
}
