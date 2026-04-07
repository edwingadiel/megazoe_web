'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { EstudioCard } from '@/lib/estudios';

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

interface Props {
  estudios: EstudioCard[];
  topicos: string[];
  libros: string[];
}

const ITEMS_PER_PAGE = 24;

const AT_BOOKS = new Set([
  'Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio',
  'Josué', 'Jueces', 'Rut',
  '1 Samuel', '2 Samuel', '1 Reyes', '2 Reyes', '1 Crónicas', '2 Crónicas',
  'Esdras', 'Nehemías', 'Ester',
  'Job', 'Salmos', 'Proverbios', 'Eclesiastés', 'Cantares',
  'Isaías', 'Jeremías', 'Lamentaciones', 'Ezequiel', 'Daniel',
  'Oseas', 'Amós', 'Jonás', 'Miqueas', 'Nahúm', 'Habacuc', 'Sofonías', 'Hageo', 'Zacarías', 'Malaquías',
]);

function normalizeSearch(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function Pagination({ page, totalPages, setPage }: { page: number; totalPages: number; setPage: (p: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => setPage(Math.max(1, page - 1))}
        className="font-body px-4 py-2 text-xs tracking-widest uppercase border border-gray-200 text-gray-500 hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        &larr; Anterior
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
          let pageNum: number;
          if (totalPages <= 7) {
            pageNum = i + 1;
          } else if (page <= 4) {
            pageNum = i + 1;
          } else if (page >= totalPages - 3) {
            pageNum = totalPages - 6 + i;
          } else {
            pageNum = page - 3 + i;
          }
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`font-body w-9 h-9 text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                page === pageNum
                  ? 'bg-gold text-white'
                  : 'border border-gray-200 text-gray-500 hover:border-gold hover:text-gold'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        className="font-body px-4 py-2 text-xs tracking-widest uppercase border border-gray-200 text-gray-500 hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        Siguiente &rarr;
      </button>
    </div>
  );
}

export default function LibrarySearch({ estudios, topicos, libros }: Props) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [selectedTopico, setSelectedTopico] = useState('');
  const [selectedLibro, setSelectedLibro] = useState('');
  const [selectedTestamento, setSelectedTestamento] = useState('');
  const [page, setPage] = useState(1);
  // Show filters by default on desktop (detected via initial window width)
  const [showFilters, setShowFilters] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );

  // Read URL query params on mount (e.g. ?topico=Fe or ?libro=Juan)
  useEffect(() => {
    const topico = searchParams.get('topico') || '';
    const libro = searchParams.get('libro') || '';
    const q = searchParams.get('q') || '';
    if (topico) { setSelectedTopico(topico); setShowFilters(true); }
    if (libro) { setSelectedLibro(libro); setShowFilters(true); }
    if (q) setQuery(q);
  }, [searchParams]);

  const debouncedQuery = useDebounce(query, 300);
  const activeFilters = [selectedTopico, selectedLibro, selectedTestamento].filter(Boolean).length;

  const clearFilters = useCallback(() => {
    setSelectedTopico('');
    setSelectedLibro('');
    setSelectedTestamento('');
    setQuery('');
    setPage(1);
  }, []);

  const filtered = useMemo(() => {
    const q = normalizeSearch(debouncedQuery);
    return estudios.filter((e) => {
      if (selectedTestamento && e.testamento_principal !== selectedTestamento) return false;
      if (selectedLibro && e.libro_principal !== selectedLibro) return false;
      if (selectedTopico && !e.topicos.includes(selectedTopico)) return false;
      if (q) {
        const haystack = normalizeSearch(
          [e.titulo, e.resumen_corto, e.cita_principal, ...e.topicos, ...e.keywords, e.libro_principal].join(' ')
        );
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [estudios, debouncedQuery, selectedTopico, selectedLibro, selectedTestamento]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilter = (setter: (v: string) => void, value: string) => {
    setter(value);
    setPage(1);
  };

  const resultsRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (p: number) => {
    setPage(p);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={resultsRef}>
      {/* Search bar */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Buscar por título, cita bíblica, palabra clave..."
              className="w-full font-body pl-11 pr-4 py-3 border border-gray-200 bg-white text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`font-body flex items-center gap-2 px-6 py-4 text-xs tracking-widest uppercase border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              activeFilters > 0
                ? 'bg-gold border-gold text-white'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gold hover:text-gold'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filtros {activeFilters > 0 && `(${activeFilters})`}
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mt-3 p-6 bg-white border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Testamento */}
            <div>
              <label className="font-body block text-xs tracking-widest uppercase text-gold/70 mb-2.5">
                Testamento
              </label>
              <select
                value={selectedTestamento}
                onChange={(e) => handleFilter(setSelectedTestamento, e.target.value)}
                className="w-full font-body border-b border-gray-200 bg-transparent px-1 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
              >
                <option value="">Todos</option>
                <option value="Antiguo Testamento">Antiguo Testamento</option>
                <option value="Nuevo Testamento">Nuevo Testamento</option>
              </select>
            </div>

            {/* Libro */}
            <div>
              <label className="font-body block text-xs tracking-widest uppercase text-gold/70 mb-2.5">
                Libro de la Biblia
              </label>
              <select
                value={selectedLibro}
                onChange={(e) => handleFilter(setSelectedLibro, e.target.value)}
                className="w-full font-body border-b border-gray-200 bg-transparent px-1 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
              >
                <option value="">Todos los libros</option>
                <optgroup label="— Antiguo Testamento —">
                  {libros.filter((l) => AT_BOOKS.has(l)).map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </optgroup>
                <optgroup label="— Nuevo Testamento —">
                  {libros.filter((l) => !AT_BOOKS.has(l)).map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Tópico */}
            <div>
              <label className="font-body block text-xs tracking-widest uppercase text-gold/70 mb-2.5">
                Tópico
              </label>
              <select
                value={selectedTopico}
                onChange={(e) => handleFilter(setSelectedTopico, e.target.value)}
                className="w-full font-body border-b border-gray-200 bg-transparent px-1 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
              >
                <option value="">Todos los tópicos</option>
                {topicos.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {activeFilters > 0 && (
              <div className="md:col-span-3 flex justify-end pt-2">
                <button
                  onClick={clearFilters}
                  className="font-body text-xs tracking-widest uppercase text-gold hover:text-gold-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  Limpiar filtros &times;
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="max-w-6xl mx-auto px-6 mb-6 flex items-center justify-between">
        <p className="font-body text-sm text-gray-500">
          <span className="font-semibold text-black">{filtered.length.toLocaleString()}</span> estudios
          {(query || activeFilters > 0) && ' encontrados'}
        </p>
        {(query || activeFilters > 0) && (
          <button
            onClick={clearFilters}
            className="font-body text-xs tracking-widest uppercase text-gold hover:text-gold-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            Ver todos
          </button>
        )}
      </div>

      {/* Active filter pills */}
      {(selectedTopico || selectedLibro || selectedTestamento) && (
        <div className="max-w-6xl mx-auto px-6 mb-6 flex flex-wrap gap-2">
          {selectedTestamento && (
            <FilterPill label={selectedTestamento} onRemove={() => handleFilter(setSelectedTestamento, '')} />
          )}
          {selectedLibro && (
            <FilterPill label={selectedLibro} onRemove={() => handleFilter(setSelectedLibro, '')} />
          )}
          {selectedTopico && (
            <FilterPill label={selectedTopico} onRemove={() => handleFilter(setSelectedTopico, '')} />
          )}
        </div>
      )}

      {/* Grid */}
      {paginated.length === 0 ? (
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="text-gold text-4xl mb-4" aria-hidden="true">&#10022;</div>
          <p className="font-body text-gray-500 text-sm">
            No se encontraron estudios con ese criterio.
          </p>
          <button onClick={clearFilters} className="font-body mt-4 text-xs tracking-widest uppercase text-gold border-b border-gold pb-px hover:text-gold-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded">
            Ver todos los estudios
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((estudio) => (
            <EstudioCardComponent key={estudio.id} estudio={estudio} onTopicClick={(t) => handleFilter(setSelectedTopico, t)} onLibroClick={(l) => handleFilter(setSelectedLibro, l)} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <>
          <div className="max-w-6xl mx-auto px-6 mt-12">
            <Pagination page={page} totalPages={totalPages} setPage={handlePageChange} />
          </div>
        </>
      )}

      <div className="h-20" />
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="font-body inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold-dark px-3 py-1 text-xs">
      {label}
      <button onClick={onRemove} className="hover:text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded" aria-label={`Remover filtro: ${label}`}>
        &times;
      </button>
    </span>
  );
}

function EstudioCardComponent({
  estudio,
  onTopicClick,
  onLibroClick,
}: {
  estudio: EstudioCard;
  onTopicClick: (t: string) => void;
  onLibroClick: (l: string) => void;
}) {
  const isNT = estudio.testamento_principal === 'Nuevo Testamento';

  return (
    <Link
      href={`/biblioteca/${estudio.slug}`}
      className="group border border-gray-200 bg-white flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {/* Top bar */}
      <div className={`h-0.5 w-full transition-all duration-300 group-hover:h-1 ${isNT ? 'bg-nt' : 'bg-at'}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Number + testament */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-xs tracking-widest text-gray-400">
            #{estudio.numero_estudio.toString().padStart(4, '0')}
          </span>
          <span
            className={`font-body text-xs px-2 py-0.5 border ${
              isNT
                ? 'text-nt border-nt/30 bg-nt/5'
                : 'text-at border-at/30 bg-at/5'
            }`}
          >
            {isNT ? 'NT' : 'AT'}
          </span>
        </div>

        {/* Bible reference */}
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onLibroClick(estudio.libro_principal); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); onLibroClick(estudio.libro_principal); } }}
          className="font-body text-left text-xs tracking-widest uppercase text-gray-400 hover:text-gold transition-colors mb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded cursor-pointer"
        >
          {estudio.cita_principal || estudio.libro_principal}
        </span>

        {/* Title */}
        <h3 className="font-heading text-lg font-light text-gray-800 leading-snug mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
          {estudio.titulo}
        </h3>

        {/* Summary */}
        {estudio.resumen_corto && (
          <p className="font-body text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">
            {estudio.resumen_corto}
          </p>
        )}

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-gray-100">
          {estudio.topicos.slice(0, 3).map((topico) => (
            <span
              key={topico}
              role="button"
              tabIndex={0}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTopicClick(topico); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); onTopicClick(topico); } }}
              className="font-body text-xs px-2 py-0.5 bg-cream text-gray-500 hover:bg-gold/15 hover:text-gold-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded cursor-pointer"
            >
              {topico}
            </span>
          ))}
          {estudio.topicos.length > 3 && (
            <span className="text-xs text-gray-400 self-center">+{estudio.topicos.length - 3}</span>
          )}
        </div>
      </div>

      {/* Read link */}
      <div className="font-body mx-6 mb-5 flex items-center gap-1.5 text-sm text-gray-400 group-hover:text-gold transition-colors duration-300">
        Leer estudio
        <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
