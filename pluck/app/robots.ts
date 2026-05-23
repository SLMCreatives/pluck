import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/startup", "/auth", "/api/", "/db_data/"],
      },
    ],
    sitemap: "https://gopeek.my/sitemap.xml",
  };
}
