export type BlockType = "gallery" | "video" | "experience"

export interface GalleryBlock {
  type: "gallery"
  images: { url: string; alt: string }[]
}

export interface VideoBlock {
  type: "video"
  url: string
  title?: string
}

export interface ExperienceBlock {
  type: "experience"
  title: string
  company: string
  period: string
  description: string
  image?: string
}

export type ContentBlock = GalleryBlock | VideoBlock | ExperienceBlock

export interface Tab {
  id: string
  name: string
  blocks: ContentBlock[]
}

export interface SocialLink {
  platform: string
  url: string
}

export interface PortfolioData {
  fullName: string
  professionalTitle: string
  bio: string
  profileImage: string
  socialLinks: SocialLink[]
  tabs: Tab[]
}
