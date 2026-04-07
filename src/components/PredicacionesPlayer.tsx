'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import predicaciones from '@/data/predicaciones.json';

interface Predicacion {
  titulo: string;
  id: string;
}

function formatTime(s: number) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function getStreamUrl(fileId: string) {
  return `/api/stream?id=${fileId}`;
}

export default function PredicacionesPlayer() {
  const [query, setQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeRowRef = useRef<HTMLDivElement>(null);

  const items: Predicacion[] = predicaciones as Predicacion[];

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return items.filter((p) => {
      const t = p.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return t.includes(q);
    });
  }, [query, items]);

  const currentPredicacion = currentIndex !== null ? items[currentIndex] : null;

  const playSong = useCallback((globalIndex: number) => {
    const pred = items[globalIndex];
    if (!pred) return;
    setCurrentIndex(globalIndex);
    setIsPlaying(true);
  }, [items]);

  // Scroll to active item
  useEffect(() => {
    if (activeRowRef.current && listRef.current) {
      const list = listRef.current;
      const row = activeRowRef.current;
      const rowTop = row.offsetTop - list.offsetTop;
      const rowBottom = rowTop + row.offsetHeight;
      const scrollTop = list.scrollTop;
      const listHeight = list.clientHeight;

      if (rowTop < scrollTop || rowBottom > scrollTop + listHeight) {
        row.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  // Load and play when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentIndex === null) return;
    const pred = items[currentIndex];
    if (!pred) return;
    audio.src = getStreamUrl(pred.id);
    audio.load();
    audio.play().catch(() => {});
  }, [currentIndex, items]);

  // Audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => {
      // Auto-play next
      if (currentIndex !== null && currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsPlaying(false);
      }
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsBuffering(true);
    const onCanPlay = () => setIsBuffering(false);
    const onPlaying = () => setIsBuffering(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('playing', onPlaying);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('playing', onPlaying);
    };
  }, [currentIndex, items]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      if (currentIndex === null && items.length > 0) {
        playSong(0);
      } else {
        audio.play().catch(() => {});
      }
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * duration;
  };

  const playPrev = () => {
    if (currentIndex === null) return;
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const playNext = () => {
    if (currentIndex === null) return;
    if (currentIndex < items.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div>
      <audio ref={audioRef} preload="none" />

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
            placeholder="Buscar predicación..."
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
          {filtered.length} {filtered.length === 1 ? 'predicación' : 'predicaciones'}
        </p>
      </div>

      {/* List */}
      <div
        ref={listRef}
        className={`border border-gray-100 bg-white divide-y divide-gray-50 max-h-[60vh] overflow-y-auto ${currentPredicacion ? 'mb-20' : ''}`}
      >
        {filtered.map((pred, filteredIdx) => {
          const globalIndex = items.indexOf(pred);
          const isActive = globalIndex === currentIndex;
          const hasNumber = pred.titulo.startsWith('#');

          return (
            <div
              key={`${pred.id}`}
              ref={isActive ? activeRowRef : null}
              className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors group ${
                isActive ? 'bg-gold/10 border-l-2 border-gold' : 'hover:bg-gray-50'
              }`}
              onClick={() => playSong(globalIndex)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playSong(globalIndex); }}}
            >
              {/* Number / Play indicator */}
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                {isActive && isPlaying ? (
                  <div className="flex items-end gap-[3px] h-4">
                    <span className="w-[3px] bg-gold rounded-sm eq-bar" style={{ animationDelay: '0ms' }} />
                    <span className="w-[3px] bg-gold rounded-sm eq-bar" style={{ animationDelay: '200ms' }} />
                    <span className="w-[3px] bg-gold rounded-sm eq-bar" style={{ animationDelay: '400ms' }} />
                    <span className="w-[3px] bg-gold rounded-sm eq-bar" style={{ animationDelay: '100ms' }} />
                  </div>
                ) : isActive ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <span className="text-xs text-gray-300 group-hover:hidden font-body tabular-nums">
                    {filteredIdx + 1}
                  </span>
                )}
                {!isActive && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
                    className="text-gold hidden group-hover:block"
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <span className={`font-body text-sm block truncate ${
                  isActive ? 'text-gold-dark font-medium' : 'text-gray-700'
                }`}>
                  {hasNumber ? pred.titulo.replace(/^#\d+\s+/, '') : pred.titulo}
                </span>
                {hasNumber && (
                  <span className="font-body text-xs text-gray-400">
                    {pred.titulo.match(/^#\d+/)?.[0]}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">
            No se encontraron predicaciones
          </div>
        )}
      </div>

      {/* Fixed bottom player */}
      {currentPredicacion && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-church-black text-white border-t border-gray-800 shadow-2xl">
          {/* Progress bar */}
          <div
            className="h-1.5 bg-gray-800 cursor-pointer group relative"
            onClick={seek}
          >
            <div
              className="h-full bg-gold group-hover:bg-gold-light transition-colors relative"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow" />
            </div>
            {isBuffering && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-shimmer" />
            )}
          </div>

          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 sm:gap-4">
            {/* Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={playPrev} className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Anterior">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 flex items-center justify-center bg-gold hover:bg-gold-dark text-church-black rounded-full transition-colors"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isBuffering ? (
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6,3 20,12 6,21" />
                  </svg>
                )}
              </button>
              <button onClick={playNext} className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Siguiente">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-white truncate">
                {currentPredicacion.titulo.startsWith('#')
                  ? currentPredicacion.titulo.replace(/^#\d+\s+/, '')
                  : currentPredicacion.titulo}
              </p>
              <p className="font-body text-xs text-gray-500">
                {currentPredicacion.titulo.match(/^#\d+/)?.[0] && (
                  <span className="mr-2">{currentPredicacion.titulo.match(/^#\d+/)?.[0]}</span>
                )}
                {formatTime(currentTime)}{' '}
                <span className="text-gray-700">/</span>{' '}
                {formatTime(duration)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
