# cmyktopantone

## Maintenance takedown mode

Set `MAINTENANCE_MODE=true` to serve a minimal public site (no converters, Pantone data, ads, or analytics) while keeping the full codebase in the repo for a future rebrand.

### Behavior

| URL | Status | Content |
|-----|--------|---------|
| `/` | 200 | Maintenance landing page |
| All other paths (including `/api/*`) | 410 | “Page no longer available” |
| Crawlers | — | `noindex, nofollow` via metadata, `robots.ts`, and `X-Robots-Tag` headers |

### Enable (production)

1. In Vercel → Project → Settings → Environment Variables, add:
   - `MAINTENANCE_MODE` = `true` (Production only)
2. Redeploy production.
3. Purge Vercel/CDN cache so old converter HTML is not served from edge cache.
4. In Google Search Console, use **Removals** to speed up de-indexing (410 + noindex still take time).
5. Reply to BrandShield confirming infringing content has been removed.

### Disable (local development / future rebrand)

- Unset `MAINTENANCE_MODE` locally, or set it to `false` on Vercel.
- Run a full `npm run build` so `postbuild` regenerates sitemaps via `next-sitemap`.

### Build scripts

When `MAINTENANCE_MODE=true`:

- `prebuild` skips `precompute-colors`
- `postbuild` writes empty `public/sitemap.xml` and `public/sitemap-0.xml` (does not run `next-sitemap`)

When unset or `false`, build behaves as before.

## TODO

### Fundamental
- [x] Setup Metadata config
- [ ] Create a default opengraph image
- [x] Create logo, favicon
- [ ] Create dynamic path

### SEO
- [ ] Setup dynamic metadata
- [ ] Check redirect
- [ ] add FAQ schema

### Post Launch
- [ ] Submit to Product Hunt
- [ ] Submit to Uneed
- [ ]
