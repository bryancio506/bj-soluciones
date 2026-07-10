# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start Vite dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # ESLint over the whole repo
```

There is no test suite configured in this project.

## What this is

This repo started life as "vitrina-template" (see `package.json` name and `README.md`), a generic reusable
Vite+React catalog template for small businesses (config-driven storefront: name/colors/contact in
`public/config.json`, products in `public/catalogo.json`, deployed to Netlify per-client).

It has since been customized into **BJ Soluciones**, a one-page site for a Costa Rican construction/remodeling
contractor. The README still describes the original generic-template workflow (products with prices via
`ProductoCard`), but the app actually in use is project-portfolio-oriented:

- `src/components/ProductoCard.jsx` — the original template's product card (price, "Consultar" CTA, Tailwind
  classes). **Not imported/used anywhere in `App.jsx`.** Left over from the template.
- `src/components/ProyectoCard.jsx` — the card actually rendered. Shows a construction project with an
  antes/durante/después (before/during/after) photo switcher, no pricing. Uses inline `style={}` objects, not
  Tailwind classes.
- `public/catalogo.json` currently holds **proyectos** (project) records — `antes`/`durante`/`despues` image
  paths, `destacado` flag, `categoria`, `descripcion` — not the `precio`/`imagen`/`disponible` product shape
  documented in the README.

When making changes, follow what `App.jsx` actually renders (ProyectoCard + `catalogo.json`'s proyecto shape),
not the README's product-catalog description, unless the user is explicitly reverting to generic-template
behavior.

## Architecture

**Config-driven, no backend.** All content lives in two static JSON files fetched at runtime from `public/`:

- `public/config.json` — site identity: `nombre`, `slogan`, `logo` (`/logo.png`, a real asset now — see
  Branding below), `colores` (`primary`/`accent`/`bg`), `fuentes`, `contacto` (`whatsapp`, `email`,
  `ubicacion`, `horario`), `categorias` (category list used as filter tabs — currently `Todos`, `Soldadura`,
  `Pintura`, `Construcción`, `Remodelación`, `Acabados`; `Acabados` has no matching catalog entries yet).
- `public/catalogo.json` — array of project records (see shape divergence above). Entries are ordered
  Soldadura → Pintura → the rest; exactly one entry has `destacado: true` (drives the hero carousel).

`App.jsx` fetches both in a single `Promise.all` on mount, then:
- Sets `document.title`, `document.body.style.background`, and — **only if `config.logo` is falsy** —
  generates a favicon canvas from the config's accent color and the first letter of `nombre`
  (`generarFavicon`). Since `config.logo` is now set, this fallback path is currently dead in practice; it
  exists for future clients who don't have a logo yet.
- Derives the hero carousel images from whichever entry has `destacado: true` (falls back to `proyectos[0]`).
- Filters the catalog by active category (`catActiva`) and a free-text `busqueda` search across `nombre` +
  `descripcion`.
- Renders a standalone "video destacado" section (between the hero and the category pills) showing
  `public/proyectos/escalera.mp4` muted/looped/autoplay — this is hardcoded in `App.jsx`, not part of
  `catalogo.json`, since the data model has no video field.

**Project photo naming convention** (`public/proyectos/`): `{categoria}-{numero}-{fase}.jpeg`, e.g.
`soldadura-03-antes.jpeg`, `pintura-01-despues.jpeg`. `fase` is `antes`/`durante`/`despues`. Not every
project has all three phases (some only have 1-2 real photos) — in `catalogo.json` those just reuse the
closest available image for the missing phase(s) rather than leaving a broken `<img>`. This convention is
also documented for the client in `estrategia/05-guia-fotos.md` so new site photos and social-media photos
come from the same shoot.

Because colors/text come entirely from `config.json`, most UI components are **inline-styled** (`style={...}`)
rather than using Tailwind classes, so that `config.colores.accent`/`primary`/`bg` can be threaded through as
JS values at render time. Tailwind is configured (`tailwind.config.js` maps `primary`/`accent`/`bg` colors and
`head`/`body` fonts to CSS custom properties) but is only actually used inside `ProductoCard.jsx` — the unused
template leftover. Don't assume Tailwind classes will pick up config colors elsewhere; use inline styles
reading from the `config` prop instead, consistent with `ProyectoCard`, `Header`, `Footer`, `Categorias`.

**Component data flow:** `App` owns `config`, `proyectos`, `catActiva`, `busqueda` state and passes derived
props down — components (`Header`, `Categorias`, `ProyectoCard`, `Footer`) are presentational and receive
`config`/`accent`/`whatsapp` as props rather than reading JSON themselves.

**WhatsApp is the primary CTA** throughout (header pill, hero button, per-project card, footer, and a QR code
generated via `api.qrserver.com` pointing at a `wa.me` deep link). `config.contacto.whatsapp` is a bare digit
string (country code + number, e.g. `50660040817`) used to build `https://wa.me/<number>?text=<encoded msg>`
links.

**Per-client deployment model:** this template is meant to be duplicated per client (see `README.md`). New
clients are onboarded purely by editing `public/config.json` and `public/catalogo.json` — no code changes
expected. Keep that separation in mind: business/content data belongs in those JSON files, not hardcoded into
components.

## Fonts

Loaded via Google Fonts `<link>` in `index.html`: **Syne** (headings, `font-head`) and **DM Sans** (body,
`font-body`), matching `config.json`'s `fuentes` field (which is not currently read by the code — the font
family names are hardcoded in components/CSS instead).

## Branding & SEO (index.html)

`public/logo.png`, `public/favicon.png`, `public/apple-touch-icon.png` and `public/og-image.jpg` are real
generated brand assets (not the original Vite placeholders) — see `docs/marca.md` for what they are and how
they were made. `index.html` has explicit `og:*`/`twitter:*` tags (image URLs must stay **absolute**,
`https://bj-soluciones.netlify.app/...` — Facebook's Sharing Debugger flags relative image URLs as invalid),
a `GeneralContractor` JSON-LD block, `robots.txt`/`sitemap.xml`, and a `<noscript>` fallback since this is a
pure client-rendered SPA with no SSR/prerendering.

`src/index.css` sets `overflow-x: hidden` on `html`/`body`. This isn't decorative — the hero's rotated
decorative stripe (`transform: rotate(...)`, absolutely positioned) was making mobile browsers compute a
layout viewport wider than the device width even though its ancestor has `overflow: hidden`, which shrank
the whole page and caused scroll-right to reveal stray content. If you add more rotated/transformed
absolutely-positioned decorative elements, keep this rule or re-verify with a real mobile-width check
(`window.innerWidth` should equal the viewport width, not something wider).

## Non-code deliverables

- `docs/` — brand assets and identity notes (`docs/marca.md`, `docs/branding/`). Rejected design proposals
  (business card concepts, ad mockups) were deliberately deleted once the client picked a direction; don't
  recreate them from git history without being asked.
- `estrategia/` — a social-media marketing plan for the client (not code): 8 markdown docs (`00`–`07`) plus
  `plan-de-marketing-bj-soluciones.pdf`, a condensed 9-page executive version generated from an HTML file via
  headless Chromium (`chromium --headless=new --print-to-pdf=...`). If the plan's assumptions change
  (budget, target zone/audience), regenerate the PDF the same way rather than hand-editing it.
