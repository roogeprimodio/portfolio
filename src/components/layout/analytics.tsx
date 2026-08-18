/**
 * Cloudflare Web Analytics. Cookieless, so no consent banner is required, and
 * free without an event cap. Renders nothing unless the token is configured,
 * which keeps local development and previews out of the numbers.
 *
 * Get a token at: Cloudflare dashboard -> Analytics & Logs -> Web Analytics.
 */
export function Analytics() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  if (!token) return null;

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
