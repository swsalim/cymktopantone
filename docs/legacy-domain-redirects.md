# Legacy domain redirects (cmyktopantone.com → colormapper.xyz)

This document describes how legacy hostnames are handled in code and what must change in Vercel before that behaviour applies on production traffic.

## What the app does today

`middleware.ts` treats these hosts as **legacy** (same behaviour for all):

- `cmyktopantone.com`, `www.cmyktopantone.com`
- `cymktopantone.com`, `www.cymktopantone.com`
- `rgbtocmyk.com`, `www.rgbtocmyk.com` (unchanged from before)

For each request on a legacy host, `resolveLegacyPath()` in `lib/legacy-path-resolver.ts` decides the **final** outcome:

| Outcome | HTTP on legacy host |
|--------|----------------------|
| Removed Pantone detail URLs (`/pantone/*`, `/pantone-colors/*`, etc.) | **410 Gone** (single response, no redirect) |
| Mapped legacy paths (Pantone converters, old blog slugs, etc.) | **308** to `https://colormapper.xyz`<final-path> |
| Everything else | **308** to the same path on `https://colormapper.xyz` |

Redirect targets and 410 prefixes are defined once in `lib/legacy-path-resolver.ts`. `next.config.ts` imports the same map via `getNextConfigRedirects()` so colormapper.xyz does not need a second hop after the domain change.

Query strings are preserved on 308 responses.

## Vercel domain setting (owner approval required)

On the `cymktopantone` Vercel project, **`cmyktopantone.com` and `cymktopantone.com` are currently configured to redirect at the platform level to `colormapper.xyz`.** Platform redirects run **before** Next.js middleware, so the single-hop resolver in middleware **does not run** for those hostnames until the setting changes.

**Required change (do not apply in this PR):**

1. In Vercel → Project → Domains, change `cmyktopantone.com` and `cymktopantone.com` from **Redirect to colormapper.xyz** to **Serve this project** (same as `colormapper.xyz`).
2. Add **`www.cmyktopantone.com`** (and `www.cymktopantone.com` if used) to the project so Vercel issues a valid certificate. Point DNS at Vercel as today.
3. After the change, verify:  
   `curl -sI https://www.cmyktopantone.com/convert-hex-to-cmyk`  
   should return **one** `308` to `https://colormapper.xyz/convert-hex-to-cmyk` with a valid TLS chain.

Until step 1 is done, apex `cmyktopantone.com` traffic still gets Vercel’s platform redirect (usually one hop to the same path on colormapper.xyz, but without middleware’s 410-on-legacy and without consolidated Pantone converter targets). **`www.cmyktopantone.com` remains broken** (expired cert + 307 to apex) until it is added to the project.

## Verification

- **Unit tests:** `npm test` — resolver outcomes without network.
- **Path census:** `npm run report-legacy-paths` — counts 410 / 308 targets for `data/legacy-old-paths.txt`.
- **HTTP checks:** `npm run check-legacy-redirects -- --base-url <url> [--host cmyktopantone.com]`  
  On a preview deployment, pass `--host cmyktopantone.com` so middleware runs the legacy branch. Legacy hostnames cannot be bound to preview URLs in Vercel; the Host header simulates the legacy host.

## Related

- `rgbtopantone.com` is out of scope for this repo and was not modified.
