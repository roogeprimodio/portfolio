import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build errors are no longer suppressed. `npm run typecheck` and `npm run lint`
  // must pass before a deploy.
  //
  // No `images.remotePatterns`: every image is served from /public. Card
  // placeholders are rendered locally instead of fetched from an avatar
  // service, so there is no third-party image host to allow.
};

export default nextConfig;
