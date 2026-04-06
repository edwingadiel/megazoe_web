@AGENTS.md

# Proyecto Mega Zoé — Guía para Claude

## Qué es este proyecto
Sitio web completo de **Iglesia Mega Zoé** (iglesiamegazoe.com), reconstruido desde cero en Next.js (reemplazando el Wix anterior). Dueña del proyecto: **Sara** — confía en autonomía total del asistente.

## Stack
- **Next.js 16.2.2** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Framer Motion** (animaciones)
- **Resend** (envío de emails desde el formulario de contacto)
- **Cloudflare R2** (hosting de 134 canciones mp3 + PDFs de letras)
- Node.js en ruta no estándar: `/Users/sarasarai/.local/node/bin`

## Design Tokens
| Token | Valor |
|---|---|
| Gold | `#c9a96e` |
| Gold Dark | `#b8955a` |
| Gold Light | `#e8d5b0` |
| Cream | `#f8f5f0` |
| Black | `#0a0a0a` |
| NT (Nuevo Testamento) | `#4a7c59` (verde) |
| AT (Antiguo Testamento) | `#7c4a1e` (café) |

**Tipografía (todas via Google Fonts, importadas en `globals.css` ANTES de `@import "tailwindcss"`):**
- Logo: `Great Vibes` (cursive)
- Display: `Playfair Display` (serif)
- Headings: `Cormorant Garamond` (serif)
- Body/Nav: `Lato` (sans-serif, uppercase tracking)

## Estructura de páginas
```
/                          → Inicio (Hero full-width + Welcome + Explora Grid + CTA social)
/sobre-nosotros            → Historia, Misión, Visión, Valores
/estudios-biblicos         → Hub con 3 subcategorías
  /iglesia-en-las-casas    → Home Studies
  /predicaciones           → Sermones
  /otros-estudios          → Material adicional (próximamente)
/biblioteca                → Búsqueda de 1,241 estudios bíblicos (SSG)
  /biblioteca/[slug]       → Página individual con versículos clickeables
/musica                    → Reproductor de 134 canciones (Cloudflare R2)
/contactanos               → Formulario de contacto (Resend API)
```

## Biblioteca de Estudios
- **1,241 archivos JSON** en `app_dataset_production/`
- Filtro de archivos: solo `f.startsWith('estudio-')` — excluye manifest.json, summary_refresh_report.json, production_qc_report.json
- Búsqueda client-side con `useMemo` (sin servidor externo)
- Filtros: texto libre, libro de la Biblia, tópico, testamento (AT/NT)
- Libros ordenados en orden bíblico canónico (no alfabético)
- Paginación: 24 items por página
- URL params: `?q=`, `?topico=`, `?libro=` — precargados al entrar desde links de estudios individuales
- SSG: `generateStaticParams` genera todas las rutas en build time
- Cards con hover animation (`-translate-y-1`, `shadow-xl`) y click completo al estudio
- **Versículos clickeables**: Referencias bíblicas abren popover con texto RV1960 via bolls.life API
- **Smart content rendering**: Detecta headings (I., II.), sub-headings (a., b.), ALL CAPS emphasis, notas

## Reproductor de Música
- **134 canciones** (.mp3) + PDFs de letras en Cloudflare R2
- Bucket: `megazoe-musica` → `https://pub-b300554f87ff48e28bdecb4e8c5f926b.r2.dev/canciones/`
- Catálogo: `src/data/canciones.json` (generado desde carpetas en `Música/`)
- Reproductor fijo en la parte inferior con controles completos
- Funciones: shuffle, repeat (off/all/one), búsqueda, auto-play next
- Indicadores: equalizer animado, buffering shimmer, scrubber dot
- Botón "Letra" abre PDF de la canción
- Archivos locales en `Música/` (1.8GB) — NO se suben a git

## Bible Verse API
- API route: `src/app/api/versiculo/route.ts`
- Usa **bolls.life** con traducción **RV1960** (Reina-Valera 1960, español)
- Mapeo de nombres: `src/lib/bible-books.ts` (nombre español → número de libro)
- Componente: `src/components/BibleVerse.tsx` (popover client-side)
- Cache de 24h en las respuestas de la API

## Archivos clave
| Archivo | Descripción |
|---|---|
| `src/lib/estudios.ts` | Carga y cachea data de los JSONs; orden bíblico canónico |
| `src/lib/bible-books.ts` | Mapeo nombre español → número de libro para bolls.life |
| `src/components/LibrarySearch.tsx` | Búsqueda/filtros/paginación con cards clickeables |
| `src/components/BibleVerse.tsx` | Popover de versículos (client component) |
| `src/components/MusicPlayer.tsx` | Reproductor completo de música (client component) |
| `src/components/SocialIcons.tsx` | Iconos reutilizables de redes sociales |
| `src/components/Navbar.tsx` | Navbar fija, scroll-aware, hamburger mobile, gold underline activo |
| `src/components/Footer.tsx` | 3 columnas: marca, navegación, contacto+social |
| `src/components/ContactForm.tsx` | Formulario con underline inputs, estados idle/loading/success/error |
| `src/app/api/contacto/route.ts` | Handler email vía Resend |
| `src/app/api/versiculo/route.ts` | Proxy a bolls.life para versículos RV1960 |
| `src/data/canciones.json` | Catálogo de 134 canciones (título, mp3, letra PDF) |
| `src/app/globals.css` | Google Fonts PRIMERO, luego `@import "tailwindcss"`, `@theme`, `@layer base` |
| `.claude/launch.json` | Config del preview server con PATH inyectado |

## Dev Server
```bash
export PATH=/Users/sarasarai/.local/node/bin:$PATH && npm run dev
```
**IMPORTANTE**: Nunca usar `preview_start`. Siempre correr via Bash para que Sara navegue localmente.

## Imágenes
- `public/images/pastora.jpg` — foto exterior de la iglesia (hero de la home page)
- `public/images/church-hero.avif` — foto anterior (ya no se usa en home, se usa en sobre-nosotros)
- `public/images/church-interior.avif` — interior de la iglesia (sobre-nosotros)

## Variables de entorno
```
RESEND_API_KEY=re_xxx   # Opcional en dev, requerido en producción
```

## Redes sociales de la iglesia
- Facebook: http://www.facebook.com/iglesiamegazoe
- Instagram: https://instagram.com/iglesiamegazoe
- YouTube: https://www.youtube.com/channel/UCbVEs6ElWvnx1klyRCdfsSA

## Problemas resueltos
1. **@import order**: Google Fonts debe ir ANTES de `@import "tailwindcss"` en globals.css
2. **Build crash /biblioteca/manifest**: Filtrar archivos con `startsWith('estudio-')`
3. **useSearchParams sin Suspense**: Envolver `<LibrarySearch>` en `<Suspense>` en biblioteca/page.tsx
4. **clasificacion_biblica undefined**: Usar optional chaining `?.testamento_principal ?? ''`
5. **PATH de Node**: Usar `/bin/sh -c "export PATH=... && npm run dev"` en launch.json
6. **Floating white boxes**: Los decoradores de esquina absolutos aparecían como cajas blancas flotantes — removidos
7. **Unlayered CSS reset**: `* { margin: 0; padding: 0; }` fuera de `@layer` rompía TODOS los utilities de Tailwind — removido y estilos base envueltos en `@layer base`
8. **Turbopack cache stale**: Fonts/CSS no compilaban correctamente → `rm -rf .next` y reiniciar dev server
9. **R2 uploads locales**: `wrangler r2 object put` sin `--remote` sube localmente — siempre usar `--remote`

## Cloudflare R2
- Cuenta de Sara, bucket `megazoe-musica`
- Login: `npx wrangler login`
- Subir archivo: `npx wrangler r2 object put "megazoe-musica/key" --file="path" --content-type="audio/mpeg" --remote`
- URL pública: `https://pub-b300554f87ff48e28bdecb4e8c5f926b.r2.dev/`
