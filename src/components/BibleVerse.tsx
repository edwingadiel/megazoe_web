'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface VerseData {
  referencia: string;
  texto: string;
  versiculos: { numero: number; texto: string }[];
  traduccion: string;
}

interface BibleVerseProps {
  libro: string;
  capitulo: number | null;
  versiculos: number[];
  referenciaNormalizada: string;
  className?: string;
}

export default function BibleVerse({
  libro,
  capitulo,
  versiculos,
  referenciaNormalizada,
  className = '',
}: BibleVerseProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Can't fetch if no chapter
  const canFetch = capitulo !== null && capitulo > 0;

  const fetchVerse = useCallback(async () => {
    if (!canFetch || data) return;
    setLoading(true);
    setError(false);

    // Build versiculos param: "1-4" for range, "3" for single
    let versParam = '';
    if (versiculos.length > 0) {
      const min = Math.min(...versiculos);
      const max = Math.max(...versiculos);
      versParam = min === max ? `${min}` : `${min}-${max}`;
    }

    try {
      const params = new URLSearchParams({ libro, capitulo: String(capitulo) });
      if (versParam) params.set('versiculos', versParam);

      const res = await fetch(`/api/versiculo?${params}`);
      if (!res.ok) throw new Error();
      const json: VerseData = await res.json();
      setData(json);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [canFetch, data, libro, capitulo, versiculos]);

  const handleClick = () => {
    if (!canFetch) return;
    const next = !open;
    setOpen(next);
    if (next) fetchVerse();
  };

  // Close popover on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  if (!canFetch) {
    return <span className={className}>{referenciaNormalizada}</span>;
  }

  return (
    <span className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`underline decoration-gold/40 decoration-1 underline-offset-2 hover:decoration-gold hover:text-gold-dark transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded ${className}`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {referenciaNormalizada}
      </button>

      {open && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={`Versículo: ${referenciaNormalizada}`}
          className="absolute z-50 left-0 top-full mt-2 w-80 max-w-[90vw] bg-white border border-gray-200 shadow-xl p-5"
          style={{ animation: 'bvFadeIn 0.15s ease-out' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-heading text-sm font-medium text-gray-800">
              {referenciaNormalizada}
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-gray-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
              aria-label="Cerrar"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content */}
          {loading && (
            <div className="flex items-center gap-2 text-gray-400 text-xs py-4">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Cargando versículo...
            </div>
          )}

          {error && (
            <p className="text-red-400 text-xs py-2">
              No se pudo cargar el versículo. Intente de nuevo.
            </p>
          )}

          {data && !loading && (
            <div>
              {data.versiculos && data.versiculos.length > 0 ? (
                <div className="space-y-1.5 max-h-60 overflow-y-auto">
                  {data.versiculos.map((v) => (
                    <p key={v.numero} className="font-body text-sm text-gray-600 leading-relaxed">
                      <span className="text-gold font-medium text-xs mr-1">{v.numero}</span>
                      {v.texto}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="font-body text-sm text-gray-600 leading-relaxed">
                  {data.texto}
                </p>
              )}
              <p className="font-body text-xs text-gray-300 mt-3 pt-2 border-t border-gray-100">
                {data.traduccion} — bible-api.com
              </p>
            </div>
          )}
        </div>
      )}

    </span>
  );
}
