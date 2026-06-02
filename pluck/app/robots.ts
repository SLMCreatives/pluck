import { MetadataRoute } from "next";

const privateRoutes = ["/dashboard", "/startup", "/auth", "/api/", "/db_data/", "/startup/subscribed", "/startup/paid"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly allow major AI crawlers
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Googlebot-Extended", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
      {
        userAgent: "*",
        allow: ["/", "/llms.txt"],
        disallow: privateRoutes,
      },
    ],
    sitemap: "https://gopeek.my/sitemap.xml",
  };
}
