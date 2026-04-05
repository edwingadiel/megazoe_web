@AGENTS.md

# Proyecto Mega Zoé — Guía para Claude

## Qué es este proyecto
Sitio web completo de **Iglesia Mega Zoé** (iglesiamegazoe.com), reconstruido desde cero en Next.js (reemplazando el Wix anterior). Dueña del proyecto: **Sara** — confía en autonomía total del asistente.

## Stack
- **Next.js 16.2.2** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Framer Motion** (animaciones)
- **Lucide React** (íconos)
- **Resend** (envío de emails desde el formulario de contacto)
- Node.js en ruta no estándar: `/Users/sarasarai/.local/node/bin`

## Design Tokens
| Token | Valor |
|---|---|
| Gold | `#c9a96e` |
| Cream | `#f8f5f0` |
| Black | `#0a0a0a` |
| NT (Nuevo Testamento) | `#4a7c59` (verde) |
| AT (Antiguo Testamento) | `#7c4a1e` (café) |

**Tipografía:**
- Headings: `Playfair Display` (serif italic)
- Body/Nav: `Lato` (uppercase tracking)
- Fuente: Google Fonts (importada en `globals.css` ANTES del `@import "tailwindcss"`)

## Estructura de páginas
```
/                          → Inicio (Hero + Welcome + Grid + CTA social)
/sobre-nosotros            → Historia, Misión, Visión, Valores
/estudios-biblicos         → Hub con 3 subcategorías
  /iglesia-en-las-casas    → Home Studies
  /predicaciones           → Sermones
  /otros-estudios          → Material adicional
/biblioteca                → Búsqueda de 1,241 estudios bíblicos (SSG)
  /biblioteca/[slug]       → Página individual de cada estudio
/musica                    → Música de alabanza y adoración
/contactanos               → Formulario de contacto (Resend API)
```

## Biblioteca de Estudios
- **1,241 archivos JSON** en `app_dataset_production/`
- Filtro de archivos: solo `f.startsWith('estudio-')` — excluye manifest.json, summary_refresh_report.json, production_qc_report.json
- Búsqueda client-side con `useMemo` (sin servidor externo)
- Filtros: texto libre, libro de la Biblia, tópico, testamento (AT/NT)
- Paginación: 24 items por página
- URL params: `?q=`, `?topico=`, `?libro=` — precargados al entrar desde links de estudios individuales
- SSG: `generateStaticParams` genera todas las rutas en build time

## Archivos clave
| Archivo | Descripción |
|---|---|
| `src/lib/estudios.ts` | Carga y cachea data de los JSONs; `getAllEstudiosCards()`, `getEstudioBySlug()`, `getAllTopicos()`, `getAllLibros()` |
| `src/components/LibrarySearch.tsx` | Componente cliente con búsqueda/filtros/paginación |
| `src/components/Navbar.tsx` | Navbar fija, scroll-aware, hamburger mobile, gold underline en link activo |
| `src/components/Footer.tsx` | 3 columnas: marca, navegación (incluye Biblioteca), contacto+social |
| `src/components/ContactForm.tsx` | Formulario con estados idle/loading/success/error, POST a `/api/contacto` |
| `src/app/api/contacto/route.ts` | Handler email vía Resend (si no hay `RESEND_API_KEY`, loguea en consola) |
| `src/app/globals.css` | Google Fonts import PRIMERO, luego `@import "tailwindcss"` |
| `.claude/launch.json` | Config del preview server con PATH inyectado |
| `.env.local.example` | Template: `RESEND_API_KEY=re_xxx` |

## Dev Server
El servidor de desarrollo usa Node.js en ruta no estándar:
```bash
export PATH=/Users/sarasarai/.local/node/bin:$PATH && npm run dev
```
O via `.claude/launch.json` que ya tiene esto configurado.

## Imágenes pendientes
Guardar en `public/images/`:
- `church-hero.jpg` — foto exterior de la iglesia (hero de la home page)
- `pastora.jpg` — foto de la Pastora Edith Cruz (página Sobre Nosotros)

La página `sobre-nosotros` tiene un placeholder gris esperando `pastora.jpg`. Una vez agregada, reemplazar el `<div>` gris por `<Image src="/images/pastora.jpg" ... />`.

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
