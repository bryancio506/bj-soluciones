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

- `public/config.json` — site identity: `nombre`, `slogan`, `logo`, `colores` (`primary`/`accent`/`bg`),
  `fuentes`, `contacto` (`whatsapp`, `email`, `ubicacion`, `horario`), `categorias` (category list used as
  filter tabs).
- `public/catalogo.json` — array of project/product records (see shape divergence above).

`App.jsx` fetches both in a single `Promise.all` on mount, then:
- Sets `document.title`, `document.body.style.background`, and generates a favicon canvas from the config's
  accent color and the first letter of `nombre` (`generarFavicon`).
- Derives the hero carousel images from whichever entry has `destacado: true` (falls back to `proyectos[0]`).
- Filters the catalog by active category (`catActiva`) and a free-text `busqueda` search across `nombre` +
  `descripcion`.

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
