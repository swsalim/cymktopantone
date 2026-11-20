# Legacy domain redirects (cmyktopantone.com → colormapper.xyz)

This document describes the redirect behaviour implemented in this repository. It does not describe Vercel domain settings. Whether any hostname still has a platform-level redirect is unknown from the code alone.

## What the app does

`LEGACY_HOSTS` in `lib/legacy-path-resolver.ts` is:

- `cmyktopantone.com`, `www.cmyktopantone.com`
- `cymktopantone.com`, `www.cymktopantone.com`
- `rgbtocmyk.com`, `www.rgbtocmyk.com`

`rgbtopantone.com` is not in that list. Those hostnames are not attached to this project.

`next.config.ts` sets `skipTrailingSlashRedirect: true`. For every static legacy rule, `getNextConfigRedirects()` emits two redirects:

1. A host-conditioned rule. `has.host` is `(www\.)?(cmyktopantone|cymktopantone|rgbtocmyk)\.com`. The destination is `https://colormapper.xyz` plus the final path. `permanent: true` (308).
2. The same source with no host condition, destination the final path on the current host. This is the rule for `colormapper.xyz`.

`middleware.ts` then:

- returns **410** for `GONE_EXACT` and `GONE_PREFIXES`, including `/pantone-color-match` and `/pantone-color-match/`, with `X-Robots-Tag: noindex, nofollow`
- on a legacy host, sends one **308** to `https://colormapper.xyz` and the resolved path when `next.config` did not already redirect
- on the canonical host, sends one **308** when the path itself redirects or still has a trailing slash

`resolveLegacyPath()` strips a trailing slash before it matches, so `/convert-cmyk-to-pantone-pms/` and `/convert-color/` resolve in that same step. Query strings are copied with the redirect URL.

Forward screen-colour paths resolve to `SPOT_TARGET` (`/convert-rgb-to-spot-color`). Reverse lookup paths, including `/blog/pantone-to-hex-rgb`, resolve to `REVERSE_TARGET` (`/blog/spot-color-to-hex-rgb`). `/pantone` and `/pantone-colors` resolve to `/colors`. No rule redirects to `/`.

## What was removed from this document

An earlier revision said Vercel redirected the legacy domains to `colormapper.xyz` before the app ran. A later read of live responses found the project itself answering those hosts (410s served on the legacy host, and `/api/og` redirected on the legacy host). This file no longer states a platform redirect as current behaviour.

## Verification

- **Unit tests:** `npm test` — resolver outcomes, no redirect chains, destinations are real routes.
- **Path census:** `npm run report-legacy-paths` — counts 410 / 308 targets for `data/legacy-old-paths.txt`.
- **HTTP checks:** `npm run check-legacy-redirects -- --base-url <url> [--host cmyktopantone.com]`
  The checker fails when a path takes more than one redirect, or when the destination path on that base URL is not 200 (410 paths are the exception). On a local or preview server, pass `--host` so the legacy host branch runs. The `Location` header for a legacy host is the absolute `colormapper.xyz` URL. The status of that path is read on the base URL under test.
