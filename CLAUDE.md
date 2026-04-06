@AGENTS.md

# Proyecto Mega Zoé — Guía para Claude

## Qué es este proyecto
Sitio web completo de **Iglesia Mega Zoé** (iglesiamegazoe.com), reconstruido desde cero en Next.js (reemplazando el Wix anterior). Dueña del proyecto: **Sara** — confía en autonomía total del asistente.

## Stack
- **Next.js 16.2.2** (App Router, TypeScript)
- **Tailwind CSS v4** (v4.2.2)
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
| Cream | `#f5f0e8` |
| Cream Dark | `#ede7db` |
| Black | `#0a0a0a` |
| NT (Nuevo Testamento) | `#4a7c59` (verde) |
| AT (Antiguo Testamento) | `#7c4a1e` (café) |

**Tipografía (todas via Google Fonts, importadas en `globals.css` ANTES de `@import "tailwindcss"`):**
- Logo: `Great Vibes` (cursive)
- Display: `Playfair Display` (serif)
- Headings: `Cormorant Garamond` (serif)
- Body/Nav: `Lato` (sans-serif, uppercase tracking)

## Design System — Consistencia Visual
Todas las páginas internas siguen un **patrón de header unificado** (centrado):
1. Línea dorada decorativa (`w-16 h-px bg-gold mx-auto mb-8`)
2. Label dorado en uppercase (`font-body text-xs text-gold tracking-[0.3em] uppercase mb-4`)
3. Título grande (`font-heading text-4xl md:text-6xl font-light text-gray-800`)
4. Descripción gris (`text-gray-500 text-base leading-relaxed`)
5. Padding: `py-20 md:py-24 px-6 bg-white`

**Reglas de diseño:**
- Solo la homepage tiene hero full-width con imagen. Las páginas internas NO tienen hero images.
- Solo el footer es oscuro. Los headers de páginas internas son siempre blancos.
- Cards usan `shadow-sm` base con `hover:shadow-xl hover:-translate-y-1` y transición.
- CTAs de contacto al final de cada página con patrón consistente.

## Estructura de páginas
```
/                          → Inicio (Hero full-width + Bienvenidos + Explora Grid + CTA contacto)
/sobre-nosotros            → Cita pastora, Historia, Misión, Visión, CTA contacto
/estudios-biblicos         → Hub con 3 subcategorías (cards con iconos SVG)
  /iglesia-en-las-casas    → Home Studies (cita bíblica, 3 feature cards, CTAs)
  /predicaciones           → Sermones (cita, YouTube CTA)
  /otros-estudios          → Material adicional (próximamente, 4 coming-soon cards)
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
- Paginación: 24 items por página, scroll a resultados (no al top de la página) via `useRef`
- URL params: `?q=`, `?topico=`, `?libro=` — precargados al entrar desde links de estudios individuales
- SSG: `generateStaticParams` genera todas las rutas en build time
- Cards con hover animation (`-translate-y-1`, `shadow-xl`) y click completo al estudio
- **Versículos clickeables**: Referencias bíblicas abren popover con texto RV1960 via bolls.life API
- **Smart content rendering**: Detecta headings (I., II.), sub-headings (a., b.), ALL CAPS emphasis, notas
- **Párrafos con saltos de línea internos**: Textos con `\n` se splitean en `<p>` separados para mejor legibilidad
- Panel de filtros: fondo blanco con shadow-sm, selects con underline (border-b), labels dorados
- Stats en header: sin divisores verticales, solo números + labels

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
| `src/components/LibrarySearch.tsx` | Búsqueda/filtros/paginación con cards clickeables, scroll via useRef |
| `src/components/BibleVerse.tsx` | Popover de versículos (client component) |
| `src/components/MusicPlayer.tsx` | Reproductor completo de música (client component) |
| `src/components/SocialIcons.tsx` | Iconos reutilizables de redes sociales |
| `src/components/Navbar.tsx` | Navbar fija con logo imagen, scroll-aware, hamburger mobile, gold underline activo |
| `src/components/Footer.tsx` | 3 columnas: marca, navegación, contacto+social (fondo oscuro) |
| `src/components/ContactForm.tsx` | Formulario con underline inputs, estados idle/loading/success/error |
| `src/app/api/contacto/route.ts` | Handler email vía Resend |
| `src/app/api/versiculo/route.ts` | Proxy a bolls.life para versículos RV1960 |
| `src/data/canciones.json` | Catálogo de 134 canciones (título, mp3, letra PDF) |
| `src/app/globals.css` | Google Fonts PRIMERO, luego `@import "tailwindcss"`, `@theme`, custom CSS en `@layer utilities` |
| `.claude/launch.json` | Config del preview server con PATH inyectado |

## Dev Server
```bash
export PATH=/Users/sarasarai/.local/node/bin:$PATH && npm run dev
```
**IMPORTANTE**: Nunca usar `preview_start`. Siempre correr via Bash para que Sara navegue localmente.

## Imágenes
- `public/images/logo-megazoe.png` — logo de la iglesia (navbar, recortado de Wix, 2251x824)
- `public/images/pastora.jpg` — foto exterior de la iglesia (hero de la homepage)
- `public/images/church-hero.avif` — foto anterior (ya no se usa en home)
- `public/images/church-interior.avif` — interior de la iglesia

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
10. **Custom CSS fuera de @layer en Tailwind v4**: Keyframes y clases custom (`.eq-bar`, `.animate-shimmer`) fuera de `@layer utilities` rompen la especificidad de Tailwind v4 intermitentemente. Solución: envolver TODA CSS custom en `@layer utilities`
11. **Paginación scroll**: `window.scrollTo({top:0})` subía por encima de los resultados — cambiado a `useRef` + `scrollIntoView`
12. **Logo imagen caching**: Next.js Image optimization cacheaba versiones viejas — usar prop `unoptimized`
13. **Tailwind v4 opacidades inválidas**: `bg-gold/8` y `bg-gold/15` no existen — usar `bg-gold/5` y `bg-gold/10`

## Cloudflare R2
- Cuenta de Sara, bucket `megazoe-musica`
- Login: `npx wrangler login`
- Subir archivo: `npx wrangler r2 object put "megazoe-musica/key" --file="path" --content-type="audio/mpeg" --remote`
- URL pública: `https://pub-b300554f87ff48e28bdecb4e8c5f926b.r2.dev/`
