# Pizza Vetrilo — Code & Security Review (follow-up)
*Reviewed 2026-07-06 (second pass). Verified against the current working tree, git history, `npm audit`, and `tsc --noEmit`.*

Security posture is now solid for a static SPA: no XSS sinks, no secrets in source, git history, or `dist/`; all `target="_blank"` links use `rel="noopener noreferrer"`; form input only reaches `mailto:` URLs via `encodeURIComponent`; `npm audit` is clean apart from one low-severity dev-only esbuild advisory. TypeScript compiles with zero errors. The remaining findings are functional bugs and polish items.

---

## ✅ Resolved since the first review

| # | Previous finding | Status |
|---|---|---|
| 1 | 🔴 GitHub token in `.git/config` | Fixed — remote is now a plain HTTPS URL. **Confirm the old token was also revoked on GitHub** (removing it locally doesn't invalidate it). |
| 2 | 🟠 Hardcoded `/pizza-vetrilo/` base path | Fixed — `DEPLOY_TARGET=gh` env switch in `vite.config.ts`, dynamic `basename` in `App.tsx`, host-aware `404.html`. |
| 3 | 🟠 No `.htaccess` | Fixed — present in `dist/` and in `superhosting-upload.zip` (which contains no `.git/`). |
| 4 | 🟠 react-router XSS advisories | Fixed — `npm audit --omit=dev`: 0 vulnerabilities. |
| 6 | 🟡 `GEMINI_API_KEY` define in vite config | Fixed — removed. (`.env.example` and `metadata.json` scaffolding still present; harmless, can delete.) |
| 7 | 🟡 Duplicate `splitPhones()` | Fixed — single slash-aware version in `src/lib/utils.ts`. |

---

## 🐞 New findings — bugs

### 1. `/menu` without a `?category` param shows an empty menu
`Menu.tsx` auto-selects `navCategories[0]` when no category is in the URL. With `lunchMenuEnabled: true` (the current config), `navCategories[0]` is `'Lunch Menu'` — a PDF link, not a data category — so `filteredItems` is empty and the page shows "No items found."

Internal links mask this by always passing `?category=Salads`, but the **404 page's "View Menu" button links to bare `/menu`**, and so will any bookmark or externally shared `/menu` URL.

Fix in `Menu.tsx`:
```ts
useEffect(() => {
  const first = navCategories.find(c => c !== 'Lunch Menu');
  if (!activeCategory && first) {
    setSearchParams({ category: first }, { replace: true });
  }
}, [activeCategory, navCategories, setSearchParams]);
```

### 2. Duplicate React keys in the header nav
`NAV_LINKS` contains two entries with `path: '/locations'` (Locations and Delivery), and both the desktop and mobile nav use `key={link.path}`. Duplicate keys cause console warnings and can drop/misrender one item. Use `key={link.name}` (translation keys are unique).

### 3. Schema.org logo URL is a 404
`index.html` structured data declares `"logo": "https://pizzavetrilo.bg/logo.png"`, but no `logo.png` exists in `public/`/`dist/` (the logo lives at `images/restaurant/general/Vetrilo-logo.png`). Either copy the logo to `public/logo.png` or update the URL. Same applies to `og:image`, which points at Unsplash — a self-hosted image is more robust for link previews.

### 4. Gallery spins forever on fetch failure
`Gallery.tsx` shows the loading spinner whenever `galleryData` is null and silently swallows fetch errors, so a failed/blocked `gallery.json` request leaves an infinite spinner. Add an error state like `Menu.tsx` has.

---

## 🟡 Still open from the first review

### 5. Forms claim success after only opening a `mailto:` link
`Contact.tsx` / `Catering.tsx` set `window.location.href = "mailto:…"` and immediately show "Your message was sent successfully." Visitors without a configured mail client (most desktop users) send nothing while being told otherwise. Either wire up a real backend (SuperHosting supports PHP `mail()`) or change the success copy to "Your email app has been opened — press Send to complete."

### 6. Unsplash hotlinking for hero/category/OG images
Homepage hero, category cards, catering imagery, and `og:image` load from `images.unsplash.com` — an external availability dependency for the most visible content, and slower LCP. You ship plenty of real photos; consider self-hosting these.

### 7. Single 548 KB JS bundle
All routes ship in one chunk. `React.lazy` per page (the `motion` library is the biggest share) would cut initial load meaningfully on mobile.

---

## 🔵 Low / polish

- **`isOpenNow()` uses the visitor's clock** — wrong "Open now" badge for visitors outside Bulgaria; also computed once per render, never refreshed. Use `Intl.DateTimeFormat('en', { timeZone: 'Europe/Sofia', … })`.
- **Form accessibility** — `<label>` elements aren't associated with inputs (`htmlFor`/`id`), and icon-only buttons (mobile menu toggle, lightbox close, header phone) lack `aria-label`s.
- **`LanguageContext` provider value** isn't memoized — fine today (provider only re-renders on language change), just worth knowing before adding state above it.
- **Duplicated menu-fetch logic** — `Home.tsx` and `Menu.tsx` each fetch and flatten `menu.json` with parallel category maps. Extract a shared `useMenuData()` hook (with the same module-cache pattern as `useSiteConfig`) to fetch once and keep the maps in one place.
- **Contact "quick links"** all point at `/locations` — linking to `/locations#${loc.id}` (as the header dropdown does) would be more useful.
- **`package.json`** still says `"name": "react-example"`.
- **`robots.txt`** disallows a nonexistent `/api/`; harmless.
- **Leftover AI Studio scaffolding** — `.env.example`, `metadata.json` (`requestFramePermissions: geolocation` is unused). Safe to delete.
- **`superhosting-upload.zip`** is untracked (good) but sits in the repo root; consider adding `*.zip` to `.gitignore` so it's never committed accidentally.

---

## ✅ Security checks performed (all clean)

- No `dangerouslySetInnerHTML`, `eval`, `innerHTML`, or `document.write` anywhere.
- No secrets in the working tree or **full git history** (searched for `.env`, keys, credentials).
- `npm audit`: 0 production vulnerabilities; 1 low dev-only (esbuild dev server, GHSA-g7r4-m6w7-qqqr) — `npm audit fix` when convenient; it never ships to production.
- `mailto:` form values are `encodeURIComponent`-escaped — no header injection.
- JSON-driven content (`menu.json`, `gallery.json`, `site-config.json`) is rendered as text by React (auto-escaped); image URLs are origin-prefixed unless absolute `http(s)` — no `javascript:` URL path.
- GH Pages SPA redirect (`sessionStorage` + `history.replaceState`) is same-origin only — not an open-redirect vector.
- `.htaccess` blocks dotfiles and sets `nosniff`/`X-Frame-Options`/`Referrer-Policy` headers. Optional hardening: add a `Content-Security-Policy` (needs `img-src` allowances for Unsplash/Google Maps and `frame-src maps.google.com`).
- CI workflow uses pinned major-version actions and minimal `permissions:` — good.

## Recommended order
1. Fix the `/menu` empty-page bug (#1) and nav duplicate keys (#2) — user-facing.
2. Confirm the old GitHub token is revoked server-side.
3. Fix the form success message or add a real send endpoint (#5).
4. Logo/OG image fixes (#3), gallery error state (#4).
5. Everything else as time allows.
