import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "GoPeek — Free Portfolio Builder for Malaysian Freelancers",
  description:
    "Build a professional mobile-first portfolio in 5 minutes — free forever, no credit card needed. WhatsApp lead capture, a shareable gopeek.my link, and zero design skills required. Built for Malaysian freelancers.",
  keywords: [
    "portfolio builder Malaysia",
    "free portfolio website Malaysia",
    "free portfolio forever Malaysia",
    "online portfolio for freelancers Malaysia",
    "mobile portfolio builder",
    "freelancer profile link Malaysia",
    "portfolio website no design skills",
    "custom portfolio URL Malaysia",
    "Linktree alternative Malaysia",
    "share work portfolio link",
    "portfolio with WhatsApp contact",
    "gopeek",
    "gopeek.my",
    "freelancer portfolio Malaysia",
    "how to build portfolio Malaysia",
  ],
  metadataBase: new URL("https://gopeek.my"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "GoPeek — Free Portfolio Builder for Malaysian Freelancers",
    description:
      "Build a professional mobile-first portfolio in 5 minutes — free forever. WhatsApp lead capture, shareable gopeek.my link, zero design skills required.",
    url: "https://gopeek.my",
    siteName: "GoPeek",
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/GoPeek.png",
        width: 1200,
        height: 630,
        alt: "GoPeek — Free Portfolio Builder for Malaysian Freelancers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoPeek — Free Portfolio Builder for Malaysian Freelancers",
    description:
      "Build a professional mobile-first portfolio in 5 minutes — free forever. WhatsApp lead capture, shareable gopeek.my link, zero design skills required.",
    images: ["/GoPeek.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>

          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-65K7L4R11R"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-65K7L4R11R');
            `}
          </Script>

          {/* Cloudflare Analytics */}
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "898cf19b8fec4506aa17bf66edd006ec"}'
            strategy="afterInteractive"
          />
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
