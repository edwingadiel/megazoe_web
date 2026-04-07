'use client';

import { useState, useMemo } from 'react';

interface PdfItem {
  titulo: string;
  id: string;
}

interface PdfListProps {
  items: PdfItem[];
  label?: string;
}

function getPdfViewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

export default function PdfList({ items, label = 'estudios' }: PdfListProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return items.filter((p) => {
      const t = p.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return t.includes(q);
    });
  }, [query, items]);

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar estudio..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-gold transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
              aria-label="Limpiar búsqueda"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {filtered.length} {label}
        </p>
      </div>

      {/* List */}
      <div className="border border-gray-100 bg-white divide-y divide-gray-50 max-h-[60vh] overflow-y-auto">
        {filtered.map((item, idx) => {
          const hasNumber = item.titulo.match(/^#?\d+/);
          return (
            <a
              key={item.id}
              href={getPdfViewUrl(item.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
            >
              {/* Number */}
              <span className="w-8 text-center text-xs text-gray-300 font-body tabular-nums shrink-0">
                {idx + 1}
              </span>

              {/* PDF icon */}
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300 group-hover:text-gold transition-colors" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <span className="font-body text-sm text-gray-700 group-hover:text-gold transition-colors block truncate">
                  {hasNumber ? item.titulo.replace(/^#?\d+\s*/, '') : item.titulo}
                </span>
                {hasNumber && (
                  <span className="font-body text-xs text-gray-400">
                    #{item.titulo.match(/^#?(\d+)/)?.[1]}
                  </span>
                )}
              </div>

              {/* Open icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 group-hover:text-gold transition-colors shrink-0" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">
            No se encontraron estudios
          </div>
        )}
      </div>
    </div>
  );
}
