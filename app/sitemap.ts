import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { categories, products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/products", 0.9, "weekly"),
    ...categories.map((c) => page(`/products?category=${c.slug}`, 0.8, "weekly")),
    ...products.map((p) => page(`/products/${p.slug}`, 0.8)),
    page("/about", 0.6),
    page("/contact", 0.7),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
