import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/startup", "/auth", "/api/", "/db_data/", "/startup/subscribed", "/startup/paid"],
      },
    ],
    sitemap: "https://gopeek.my/sitemap.xml",
  };
}
