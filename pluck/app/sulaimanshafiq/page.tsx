import type { Metadata } from "next";
import { PortfolioPreview } from "@/components/portfolio-preview";
import type { PortfolioData } from "@/types/portfolio";

export const metadata: Metadata = {
  title: "Sulaiman Shafiq — Digital Marketer & Brand Strategist",
  description:
    "Portfolio of Sulaiman Shafiq — digital marketer, brand strategist, and founder of GoPeek. Based in Malaysia.",
  alternates: { canonical: "/sulaimanshafiq" },
  openGraph: {
    title: "Sulaiman Shafiq — Digital Marketer & Brand Strategist",
    description: "Portfolio of Sulaiman Shafiq — digital marketer, brand strategist, and founder of GoPeek.",
    url: "https://gopeek.my/sulaimanshafiq",
    images: [{ url: "/sulaiman.jpg", alt: "Sulaiman Shafiq" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sulaiman Shafiq — Digital Marketer & Brand Strategist",
    description: "Portfolio of Sulaiman Shafiq — digital marketer, brand strategist, and founder of GoPeek.",
    images: ["/sulaiman.jpg"],
  },
};

const demoData: PortfolioData = {
  fullName: "Sulaiman Shafiq",
  professionalTitle: "Digital Marketer & Brand Strategist",
  bio: "I help Malaysian businesses and freelancers grow their online presence through sharp brand strategy, content that converts, and digital campaigns that actually drive results. Founder of GoPeek.",
  profileImage: "/sulaiman.jpg",
  phone: "",
  showPhone: false,
  socialLinks: [
    { platform: "linkedin", url: "https://www.linkedin.com/in/sulaiman-shafiq-208054193/" },
    { platform: "website", url: "https://slmcreatives.com" },
  ],
  tabs: [
    {
      id: "work",
      name: "Work",
      blocks: [
        {
          type: "experience",
          title: "Founder & Product Builder",
          company: "GoPeek",
          period: "2025 — Present",
          description:
            "Built GoPeek from scratch — a mobile-first portfolio builder for Malaysian freelancers. Handles product, marketing, and growth. Launched publicly in 2025 with a focus on the Malaysian freelance community.",
        },
        {
          type: "experience",
          title: "Digital Marketing Strategist",
          company: "SLM Creatives",
          period: "2022 — Present",
          description:
            "Brand strategy, social media management, and performance marketing for SMEs and personal brands across Malaysia. Specialising in content-led growth and conversion-focused campaigns.",
        },
        {
          type: "video",
          title: "What is GoPeek?",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
      ],
    },
    {
      id: "about",
      name: "About",
      blocks: [
        {
          type: "experience",
          title: "Bachelor of Business Administration",
          company: "UNITAR International University",
          period: "2020 — 2024",
          description:
            "Studied business administration with a focus on entrepreneurship and marketing. Applied coursework directly to real client projects throughout the degree.",
        },
        {
          type: "experience",
          title: "Marketing Executive",
          company: "Various Clients",
          period: "2021 — 2022",
          description:
            "Freelance marketing work spanning social media strategy, copywriting, and digital ad management. Built a client base of 10+ local SMEs before moving full-time to SLM Creatives.",
        },
      ],
    },
  ],
};

export default function SulaimanShafiqPage() {
  return <PortfolioPreview data={demoData} showBadge={false} />;
}
