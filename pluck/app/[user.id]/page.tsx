import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ProfilePageClient } from "./ProfilePageClient";

type Props = { params: Promise<{ "user.id": string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "user.id": slug } = await params;

  let profile;
  try {
    profile = await fetchQuery(api.profiles.getBySlug, { slug });
  } catch {
    profile = null;
  }

  if (!profile) {
    return {
      title: "Profile not found — GoPeek",
      robots: { index: false, follow: false },
    };
  }

  const title = `${profile.fullName} — ${profile.professionalTitle}`;
  const bio = profile.bio ?? "";
  const description = bio
    ? `${bio.slice(0, 155)}${bio.length > 155 ? "…" : ""}`
    : `Check out ${profile.fullName}'s portfolio on GoPeek — ${profile.professionalTitle}.`;
  const url = `https://gopeek.my/${slug}`;
  const image = profile.profileImage || "/GoPeek.png";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "GoPeek",
      type: "profile",
      images: [{ url: image, alt: profile.fullName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export default function ProfilePage({ params }: Props) {
  return <ProfilePageClient params={params} />;
}
