import fs from 'fs';
import path from 'path';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ReferenciasBiblicas {
  referencia: string;
  referencia_normalizada: string;
  libro: string;
  capitulo: number;
  versiculos: number[];
  tipo: 'principal' | 'secundaria';
  clickeable: boolean;
}

export interface ParagraphRendered {
  tipo: string;
  texto: string;
  referencias_inline: string[];
}

export interface Estudio {
  id: string;
  slug: string;
  numero_estudio: number;
  tipo_estudio: string;
  ministerio: {
    iglesia: string;
    pastora: string;
    credito_corto: string;
  };
  encabezado: {
    titulo: string;
    subtitulo: string | null;
    cita_principal: string;
    resumen_corto: string;
  };
  fechas: {
    ano: number | null;
    fecha_texto_original: string;
  };
  clasificacion_biblica: {
    libro_principal: string;
    capitulo_principal: number;
    versiculos_principales: number[];
    referencia_principal_normalizada: string;
    testamento_principal: string;
  };
  clasificacion_tematica: {
    topicos: string[];
    keywords: string[];
  };
  referencias_biblicas: ReferenciasBiblicas[];
  contenido: {
    contenido_completo: string;
    contenido_renderizado: ParagraphRendered[];
  };
  busqueda: {
    texto_indexable: string;
    alias_busqueda: string[];
  };
  ui: {
    mostrar_credito_en_header: boolean;
    mostrar_numero_estudio: boolean;
    mostrar_fecha: boolean;
    mostrar_topicos: boolean;
    permitir_favorito: boolean;
    permitir_compartir: boolean;
  };
}

// Lightweight card metadata (no full content — used for library listing)
export interface EstudioCard {
  id: string;
  slug: string;
  numero_estudio: number;
  tipo_estudio: string;
  titulo: string;
  subtitulo: string | null;
  cita_principal: string;
  resumen_corto: string;
  libro_principal: string;
  testamento_principal: string;
  topicos: string[];
  keywords: string[];
  ano: number | null;
}

// ─── Data directory ───────────────────────────────────────────────────────────

const DATASET_DIR = path.join(process.cwd(), 'app_dataset_production');

// ─── Loaders ──────────────────────────────────────────────────────────────────

function normalizeTestamento(t: string): string {
  if (!t) return 'Desconocido';
  if (t.toLowerCase().includes('nuevo')) return 'Nuevo Testamento';
  if (t.toLowerCase().includes('antiguo')) return 'Antiguo Testamento';
  return t;
}

let _cache: EstudioCard[] | null = null;

export function getAllEstudiosCards(): EstudioCard[] {
  if (_cache) return _cache;

  const files = fs.readdirSync(DATASET_DIR).filter(
    (f) => f.endsWith('.json') && f !== 'production_qc_report.json' && f !== 'manifest.json' && f !== 'summary_refresh_report.json' && f.startsWith('estudio-')
  );

  _cache = files
    .map((file) => {
      try {
        const raw = fs.readFileSync(path.join(DATASET_DIR, file), 'utf-8');
        const d: Estudio = JSON.parse(raw);
        const card: EstudioCard = {
          id: d.id,
          slug: d.slug,
          numero_estudio: d.numero_estudio,
          tipo_estudio: d.tipo_estudio || 'Iglesia en las casas',
          titulo: d.encabezado?.titulo || `Estudio ${d.numero_estudio}`,
          subtitulo: d.encabezado?.subtitulo || null,
          cita_principal: d.encabezado?.cita_principal || '',
          resumen_corto: d.encabezado?.resumen_corto || '',
          libro_principal: d.clasificacion_biblica?.libro_principal || 'Sin libro',
          testamento_principal: normalizeTestamento(
            d.clasificacion_biblica?.testamento_principal
          ),
          topicos: d.clasificacion_tematica?.topicos || [],
          keywords: d.clasificacion_tematica?.keywords || [],
          ano: d.fechas?.ano || null,
        };
        return card;
      } catch {
        return null;
      }
    })
    .filter((e): e is EstudioCard => e !== null)
    .sort((a, b) => a.numero_estudio - b.numero_estudio);

  return _cache;
}

export function getEstudioBySlug(slug: string): Estudio | null {
  const filePath = path.join(DATASET_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as Estudio;
  } catch {
    return null;
  }
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(DATASET_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'production_qc_report.json' && f !== 'manifest.json' && f !== 'summary_refresh_report.json' && f.startsWith('estudio-'))
    .map((f) => f.replace('.json', ''));
}

// ─── Filter helpers ───────────────────────────────────────────────────────────

export function getAllTopicos(): string[] {
  const cards = getAllEstudiosCards();
  const set = new Set<string>();
  cards.forEach((c) => c.topicos.forEach((t) => set.add(t)));
  return [...set].sort();
}

export function getAllLibros(): string[] {
  const cards = getAllEstudiosCards();
  const set = new Set<string>();
  cards.forEach((c) => { if (c.libro_principal) set.add(c.libro_principal); });
  return [...set].sort();
}

export function getAllTestamentos(): string[] {
  return ['Antiguo Testamento', 'Nuevo Testamento'];
}
