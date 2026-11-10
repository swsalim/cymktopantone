# SEO origin fix evidence (2026-11-08)

## Root cause

Production builds set `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL` to the Vercel project’s primary hostname (`cmyktopantone.com`). `absoluteUrl()` preferred that value over `SITE_DOMAIN` (`colormapper.xyz`), so `app/robots.ts`, `app/sitemap.ts`, layout canonicals, and `metadataBase` all emitted the legacy origin.

Live verification (pre-fix deploy):

| Resource | Observed |
| --- | --- |
| `https://colormapper.xyz/robots.txt` | `Sitemap: https://cmyktopantone.com/sitemap.xml` |
| `https://colormapper.xyz/sitemap.xml` | 267 `<loc>` URLs, all `https://cmyktopantone.com/...` |
| Legacy fetches | HTTP 308 to matching path on `colormapper.xyz` (redirects unchanged) |

Static `public/robots.txt` already listed `colormapper.xyz`; Next.js `app/robots.ts` overrides it at runtime.

## Fix

`absoluteUrl()` uses `https://${SITE_DOMAIN}` in production. Breadcrumb JSON-LD home links use `absoluteUrl()` instead of raw `NEXT_PUBLIC_BASE_URL`. `next-sitemap.config.mjs` aligned (legacy postbuild path; sitemap is served from `app/sitemap.ts`).

## Sitemap size (267 URLs)

Generated from `app/sitemap.ts`: static marketing paths, internal tools, palette/gradient/wheel subpages, converter routes, color catalog pages, and published blog posts. Count matches live audit CSV (`in_sitemap=True` on 267 legacy-origin rows).

## Regression coverage

`lib/site-origin.test.ts` — production env with legacy `VERCEL_PROJECT_PRODUCTION_URL` still yields `colormapper.xyz` for robots sitemap URL, every sitemap entry, and representative canonical helpers.

## Verification limits

This PR does not deploy. Post-merge proof requires fetching live `robots.txt` and `sitemap.xml` on `colormapper.xyz`. Preview deployments correctly keep `*.vercel.app` origins. Local dev still depends on `NEXT_PUBLIC_BASE_URL` (expected).
