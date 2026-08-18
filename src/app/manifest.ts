import type { MetadataRoute } from "next";

import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: profile.name,
    description: profile.summary,
    start_url: "/",
    display: "standalone",
    background_color: "#05050f",
    theme_color: "#05050f",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
