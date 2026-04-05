'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { EstudioCard } from '@/lib/estudios';

interface Props {
  estudios: EstudioCard[];
  topicos: string[];
  libros: string[];
}

const ITEMS_PER_PAGE = 24;

function normalizeSearch(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function LibrarySearch({ estudios, topicos, libros }: Props) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [selectedTopico, setSelectedTopico] = useState('');
  const [selectedLibro, setSelectedLibro] = useState('');
  const [selectedTestamento, setSelectedTestamento] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Read URL query params on mount (e.g. ?topico=Fe or ?libro=Juan)
  useEffect(() => {
    const topico = searchParams.get('topico') || '';
    const libro = searchParams.get('libro') || '';
    const q = searchParams.get('q') || '';
    if (topico) { setSelectedTopico(topico); setShowFilters(true); }
    if (libro) { setSelectedLibro(libro); setShowFilters(true); }
    if (q) setQuery(q);
  }, [searchParams]);

  const activeFilters = [selectedTopico, selectedLibro, selectedTestamento].filter(Boolean).length;

  const clearFilters = useCallback(() => {
    setSelectedTopico('');
    setSelectedLibro('');
    setSelectedTestamento('');
    setQuery('');
    setPage(1);
  }, []);

  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
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
  }, [estudios, query, selectedTopico, selectedLibro, selectedTestamento]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilter = (setter: (v: string) => void, value: string) => {
    setter(value);
    setPage(1);
  };

  return (
    <div>
      {/* Search bar */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Buscar por título, cita bíblica, palabra clave..."
              className="w-full pl-11 pr-4 py-4 border border-gray-200 bg-white text-black text-sm placeholder-gray-400 focus:outline-none focus:border-[#c9a96e] transition-colors"
              style={{ fontFamily: "'Lato', sans-serif" }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-4 text-xs tracking-widest uppercase border transition-colors ${
              activeFilters > 0
                ? 'bg-[#c9a96e] border-[#c9a96e] text-black'
                : 'border-gray-200 bg-white text-gray-600 hover:border-[#c9a96e] hover:text-black'
            }`}
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filtros {activeFilters > 0 && `(${activeFilters})`}
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mt-3 p-5 bg-[#f8f5f0] border border-[#c9a96e]/20 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Testamento */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#c9a96e] mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                Testamento
              </label>
              <select
                value={selectedTestamento}
                onChange={(e) => handleFilter(setSelectedTestamento, e.target.value)}
                className="w-full border border-gray-200 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:border-[#c9a96e] transition-colors"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <option value="">Todos</option>
                <option value="Antiguo Testamento">Antiguo Testamento</option>
                <option value="Nuevo Testamento">Nuevo Testamento</option>
              </select>
            </div>

            {/* Libro */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#c9a96e] mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                Libro de la Biblia
              </label>
              <select
                value={selectedLibro}
                onChange={(e) => handleFilter(setSelectedLibro, e.target.value)}
                className="w-full border border-gray-200 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:border-[#c9a96e] transition-colors"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <option value="">Todos los libros</option>
                {libros.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Tópico */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#c9a96e] mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                Tópico
              </label>
              <select
                value={selectedTopico}
                onChange={(e) => handleFilter(setSelectedTopico, e.target.value)}
                className="w-full border border-gray-200 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:border-[#c9a96e] transition-colors"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <option value="">Todos los tópicos</option>
                {topicos.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {activeFilters > 0 && (
              <div className="md:col-span-3 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-xs tracking-widest uppercase text-[#c9a96e] hover:text-black transition-colors"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Limpiar filtros ✕
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="max-w-6xl mx-auto px-6 mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500" style={{ fontFamily: "'Lato', sans-serif" }}>
          <span className="font-semibold text-black">{filtered.length.toLocaleString()}</span> estudios
          {(query || activeFilters > 0) && ' encontrados'}
        </p>
        {(query || activeFilters > 0) && (
          <button
            onClick={clearFilters}
            className="text-xs tracking-widest uppercase text-gray-400 hover:text-[#c9a96e] transition-colors"
            style={{ fontFamily: "'Lato', sans-serif" }}
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
          <div className="text-[#c9a96e] text-4xl mb-4">✦</div>
          <p className="text-gray-400 text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
            No se encontraron estudios con ese criterio.
          </p>
          <button onClick={clearFilters} className="mt-4 text-xs tracking-widest uppercase text-[#c9a96e] border-b border-[#c9a96e] pb-px" style={{ fontFamily: "'Lato', sans-serif" }}>
            Ver todos los estudios
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((estudio) => (
            <EstudioCard key={estudio.id} estudio={estudio} onTopicClick={(t) => handleFilter(setSelectedTopico, t)} onLibroClick={(l) => handleFilter(setSelectedLibro, l)} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-6xl mx-auto px-6 mt-12 flex items-center justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 text-xs tracking-widest uppercase border border-gray-200 text-gray-500 hover:border-[#c9a96e] hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            ← Anterior
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
                  className={`w-9 h-9 text-xs transition-colors ${
                    page === pageNum
                      ? 'bg-black text-white'
                      : 'border border-gray-200 text-gray-500 hover:border-[#c9a96e] hover:text-black'
                  }`}
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 text-xs tracking-widest uppercase border border-gray-200 text-gray-500 hover:border-[#c9a96e] hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Siguiente →
          </button>
        </div>
      )}

      <div className="h-20" />
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-2 bg-[#c9a96e]/10 border border-[#c9a96e]/30 text-[#8a6a3a] px-3 py-1 text-xs" style={{ fontFamily: "'Lato', sans-serif" }}>
      {label}
      <button onClick={onRemove} className="hover:text-black transition-colors">✕</button>
    </span>
  );
}

function EstudioCard({
  estudio,
  onTopicClick,
  onLibroClick,
}: {
  estudio: EstudioCard;
  onTopicClick: (t: string) => void;
  onLibroClick: (l: string) => void;
}) {
  const testamentoColor =
    estudio.testamento_principal === 'Nuevo Testamento' ? '#4a7c59' : '#7c4a1e';

  return (
    <div className="group border border-gray-100 bg-white hover:border-[#c9a96e]/50 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Top bar */}
      <div
        className="h-0.5 w-full"
        style={{ backgroundColor: estudio.testamento_principal === 'Nuevo Testamento' ? '#4a7c59' : '#7c4a1e' }}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Number + testament */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs tracking-widest text-[#c9a96e]" style={{ fontFamily: "'Lato', sans-serif" }}>
            #{estudio.numero_estudio.toString().padStart(4, '0')}
          </span>
          <span
            className="text-xs px-2 py-0.5 border"
            style={{
              color: testamentoColor,
              borderColor: testamentoColor + '40',
              backgroundColor: testamentoColor + '10',
              fontFamily: "'Lato', sans-serif",
            }}
          >
            {estudio.testamento_principal === 'Nuevo Testamento' ? 'NT' : 'AT'}
          </span>
        </div>

        {/* Bible reference */}
        <button
          onClick={() => onLibroClick(estudio.libro_principal)}
          className="text-left text-xs tracking-widest uppercase text-gray-400 hover:text-[#c9a96e] transition-colors mb-2"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {estudio.cita_principal || estudio.libro_principal}
        </button>

        {/* Title */}
        <Link href={`/biblioteca/${estudio.slug}`} className="flex-1">
          <h3
            className="text-lg font-normal italic text-black leading-snug mb-3 group-hover:text-[#c9a96e] transition-colors line-clamp-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {estudio.titulo}
          </h3>
        </Link>

        {/* Summary */}
        {estudio.resumen_corto && (
          <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: "'Lato', sans-serif" }}>
            {estudio.resumen_corto}
          </p>
        )}

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-gray-50">
          {estudio.topicos.slice(0, 3).map((topico) => (
            <button
              key={topico}
              onClick={() => onTopicClick(topico)}
              className="text-xs px-2 py-0.5 bg-[#f8f5f0] text-gray-500 hover:bg-[#c9a96e]/20 hover:text-[#8a6a3a] transition-colors"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {topico}
            </button>
          ))}
          {estudio.topicos.length > 3 && (
            <span className="text-xs text-gray-300 self-center">+{estudio.topicos.length - 3}</span>
          )}
        </div>
      </div>

      {/* Read link */}
      <Link
        href={`/biblioteca/${estudio.slug}`}
        className="mx-6 mb-5 flex items-center gap-1.5 text-xs tracking-widest uppercase text-gray-400 hover:text-[#c9a96e] transition-colors group-hover:text-[#c9a96e]"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        Leer estudio
        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
      </Link>
    </div>
  );
}
