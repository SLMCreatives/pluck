import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Terms of Service — GoPeek",
  description: "The terms governing your use of the GoPeek portfolio builder.",
};

export default function TermsPage() {
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
          <h1 className="mt-6 text-3xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-2 text-sm text-zinc-400">Last updated: {new Date().toLocaleDateString("en-MY", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8 text-zinc-300 [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_p]:leading-relaxed [&_ul]:mt-2 [&_ul]:space-y-1 [&_ul]:pl-5 [&_li]:list-disc">

          <p>
            These Terms of Service ("Terms") govern your access to and use of GoPeek ("we", "us",
            "our"), operated at gopeek.my. By creating an account or using the service, you agree
            to be bound by these Terms. If you do not agree, do not use the service.
          </p>

          <div>
            <h2>1. Eligibility</h2>
            <p>
              You must be at least 13 years old to use GoPeek. By using the service, you represent
              that you meet this requirement and that all information you provide is accurate and
              current. If you are using GoPeek on behalf of a business or organisation, you
              represent that you have authority to bind that entity to these Terms.
            </p>
          </div>

          <div>
            <h2>2. Your Account</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and
              for all activity that occurs under your account. Notify us immediately at{" "}
              <a href="mailto:info@slmcreatives.com" className="text-indigo-400 hover:text-indigo-300 transition">
                info@slmcreatives.com
              </a>{" "}
              if you suspect unauthorised access. We reserve the right to suspend or terminate
              accounts that violate these Terms.
            </p>
          </div>

          <div>
            <h2>3. Acceptable Use</h2>
            <p>You agree not to use GoPeek to:</p>
            <ul>
              <li>Post content that is unlawful, defamatory, obscene, or harassing</li>
              <li>Infringe the intellectual property rights of others</li>
              <li>Distribute malware or engage in phishing</li>
              <li>Impersonate any person or entity</li>
              <li>Scrape, crawl, or systematically extract data from the service</li>
              <li>Attempt to gain unauthorised access to any part of the service or its infrastructure</li>
              <li>Use the service for any illegal purpose under Malaysian law or applicable international law</li>
            </ul>
            <p className="mt-3">
              We reserve the right to remove content or suspend accounts that violate these rules
              without prior notice.
            </p>
          </div>

          <div>
            <h2>4. Your Content</h2>
            <p>
              You retain ownership of all content you upload to GoPeek (text, images, links). By
              publishing content, you grant us a non-exclusive, royalty-free, worldwide licence to
              display and serve that content solely for the purpose of operating the service (e.g.,
              showing your portfolio to visitors).
            </p>
            <p className="mt-3">
              You are solely responsible for ensuring your content does not violate any third-party
              rights or applicable laws. We do not review content before it is published.
            </p>
          </div>

          <div>
            <h2>5. Subscription and Payments</h2>
            <p>
              GoPeek offers a free tier and a paid Publish tier. Paid subscriptions are one-time
              payments for a fixed period (1, 3, 6, or 12 months) processed via Stripe.
            </p>
            <ul>
              <li>All prices are displayed in Malaysian Ringgit (MYR) and are inclusive of applicable taxes</li>
              <li>Payments are non-refundable except as required by applicable law or at our sole discretion</li>
              <li>Your Publish access will expire at the end of the paid period; your profile will revert to the Free tier</li>
              <li>Renewing before expiry extends from your current expiry date, not from the renewal date</li>
            </ul>
          </div>

          <div>
            <h2>6. Free Tier Limitations</h2>
            <p>The Free tier is subject to the following limits:</p>
            <ul>
              <li>Maximum 3 projects (tabs)</li>
              <li>Maximum 3 content blocks</li>
              <li>Maximum 6 images total</li>
              <li>Auto-generated public URL (no custom username)</li>
              <li>GoPeek badge displayed on your portfolio</li>
            </ul>
            <p className="mt-3">We reserve the right to modify these limits with reasonable notice.</p>
          </div>

          <div>
            <h2>7. Intellectual Property</h2>
            <p>
              GoPeek and its original content, features, and functionality are owned by us and are
              protected by Malaysian and international intellectual property laws. You may not copy,
              modify, distribute, or create derivative works of any part of the service without our
              express written consent.
            </p>
          </div>

          <div>
            <h2>8. Availability and Modifications</h2>
            <p>
              We strive for high availability but do not guarantee uninterrupted access to the
              service. We may modify, suspend, or discontinue any part of the service at any time.
              For material changes that affect paid subscribers, we will provide at least 14 days'
              notice by email.
            </p>
          </div>

          <div>
            <h2>9. Disclaimer of Warranties</h2>
            <p>
              The service is provided "as is" and "as available" without warranties of any kind,
              express or implied, including but not limited to warranties of merchantability, fitness
              for a particular purpose, or non-infringement. We do not warrant that the service will
              be error-free or that defects will be corrected.
            </p>
          </div>

          <div>
            <h2>10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, GoPeek shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including loss of
              profits, data, or goodwill, arising from your use of or inability to use the service.
              Our total liability for any claim arising from these Terms shall not exceed the amount
              you paid us in the 3 months preceding the claim.
            </p>
          </div>

          <div>
            <h2>11. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of Malaysia.
              Any disputes arising from these Terms shall be subject to the exclusive jurisdiction
              of the courts of Malaysia.
            </p>
          </div>

          <div>
            <h2>12. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material changes
              via email or a prominent notice on the site at least 7 days before they take effect.
              Continued use of the service after changes are posted constitutes acceptance.
            </p>
          </div>

          <div>
            <h2>13. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{" "}
              <a href="mailto:info@slmcreatives.com" className="text-indigo-400 hover:text-indigo-300 transition">
                info@slmcreatives.com
              </a>.
            </p>
          </div>
        </div>

        <div className="mt-12 flex gap-6 border-t border-white/10 pt-8 text-sm text-zinc-500">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
        </div>
      </div>
    </main>
  );
}
