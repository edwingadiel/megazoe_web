'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import canciones from '@/data/canciones.json';

const R2_BASE = 'https://pub-b300554f87ff48e28bdecb4e8c5f926b.r2.dev/canciones';

interface Cancion {
  titulo: string;
  mp3: string;
  letra?: string;
  instrumental?: string;
}

function encodeR2Path(titulo: string, filename: string) {
  return `${R2_BASE}/${encodeURIComponent(titulo)}/${encodeURIComponent(filename)}`;
}

function formatTime(s: number) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const [query, setQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<'off' | 'all' | 'one'>('off');
  const [shuffleHistory, setShuffleHistory] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeRowRef = useRef<HTMLDivElement>(null);

  const songs: Cancion[] = canciones as Cancion[];

  const filtered = useMemo(() => {
    if (!query.trim()) return songs;
    const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return songs.filter((c) => {
      const t = c.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return t.includes(q);
    });
  }, [query, songs]);

  const currentSong = currentIndex !== null ? songs[currentIndex] : null;

  const playSong = useCallback((globalIndex: number) => {
    const song = songs[globalIndex];
    if (!song) return;
    setCurrentIndex(globalIndex);
    setIsPlaying(true);
    if (shuffle) {
      setShuffleHistory((prev) => [...prev, globalIndex]);
    }
  }, [songs, shuffle]);

  // Scroll to active song
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

  // When currentIndex changes, load and play
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentIndex === null) return;
    const song = songs[currentIndex];
    if (!song) return;
    const src = encodeR2Path(song.titulo, song.mp3);
    audio.src = src;
    audio.load();
    audio.play().catch(() => {});
  }, [currentIndex, songs]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
      }
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        playSong(next);
        return;
      }
      if (currentIndex !== null && currentIndex < songs.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (repeat === 'all') {
        setCurrentIndex(0);
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
  }, [currentIndex, songs, repeat, shuffle, playSong]);

  // Volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      if (currentIndex === null && songs.length > 0) {
        if (shuffle) {
          playSong(Math.floor(Math.random() * songs.length));
        } else {
          playSong(0);
        }
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
    // If more than 3 seconds in, restart current song
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    if (shuffle && shuffleHistory.length > 1) {
      setShuffleHistory((h) => {
        const newHistory = h.slice(0, -1);
        const prev = newHistory[newHistory.length - 1];
        if (prev !== undefined) setCurrentIndex(prev);
        return newHistory;
      });
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const playNext = () => {
    if (currentIndex === null) return;
    if (shuffle) {
      playSong(Math.floor(Math.random() * songs.length));
    } else if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (repeat === 'all') {
      setCurrentIndex(0);
    }
  };

  const cycleRepeat = () => {
    setRepeat((r) => (r === 'off' ? 'all' : r === 'all' ? 'one' : 'off'));
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
            placeholder="Buscar canción..."
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
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-400">
            {filtered.length} {filtered.length === 1 ? 'canción' : 'canciones'}
          </p>
          {/* Shuffle toggle in list header */}
          <button
            onClick={() => { setShuffle(!shuffle); setShuffleHistory([]); }}
            className={`flex items-center gap-1.5 text-xs transition-colors ${shuffle ? 'text-gold' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label={shuffle ? 'Desactivar aleatorio' : 'Activar aleatorio'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
            Shuffle
          </button>
        </div>
      </div>

      {/* Song list */}
      <div
        ref={listRef}
        className={`border border-gray-100 bg-white divide-y divide-gray-50 max-h-[60vh] overflow-y-auto ${currentSong ? 'mb-20' : ''}`}
      >
        {filtered.map((song, filteredIdx) => {
          const globalIndex = songs.indexOf(song);
          const isActive = globalIndex === currentIndex;
          return (
            <div
              key={`${song.titulo}-${globalIndex}`}
              ref={isActive ? activeRowRef : null}
              className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors group ${
                isActive ? 'bg-cream' : 'hover:bg-gray-50'
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
                {/* Show play icon on hover for non-active */}
                {!isActive && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
                    className="text-gold hidden group-hover:block"
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </div>

              {/* Title */}
              <span className={`font-body text-sm flex-1 truncate ${
                isActive ? 'text-gold-dark font-medium' : 'text-gray-700'
              }`}>
                {song.titulo}
              </span>

              {/* Letra button */}
              {song.letra && (
                <a
                  href={encodeR2Path(song.titulo, song.letra)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 text-xs text-gold/70 hover:text-gold transition-colors px-2 py-1 border border-gold/20 hover:border-gold/40 rounded"
                  title="Ver letra"
                >
                  Letra
                </a>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">
            No se encontraron canciones
          </div>
        )}
      </div>

      {/* Fixed bottom player */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-church-black text-white border-t border-gray-800 shadow-2xl">
          {/* Progress bar — clickable */}
          <div
            className="h-1.5 bg-gray-800 cursor-pointer group relative"
            onClick={seek}
          >
            <div
              className="h-full bg-gold group-hover:bg-gold-light transition-colors relative"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
            >
              {/* Scrubber dot on hover */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow" />
            </div>
            {/* Buffering shimmer */}
            {isBuffering && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-shimmer" />
            )}
          </div>

          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 sm:gap-4">
            {/* Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Shuffle — mobile hidden */}
              <button
                onClick={() => { setShuffle(!shuffle); setShuffleHistory([]); }}
                className={`p-1.5 hidden sm:block transition-colors ${shuffle ? 'text-gold' : 'text-gray-600 hover:text-gray-300'}`}
                aria-label={shuffle ? 'Desactivar aleatorio' : 'Activar aleatorio'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 3 21 3 21 8" />
                  <line x1="4" y1="20" x2="21" y2="3" />
                  <polyline points="21 16 21 21 16 21" />
                  <line x1="15" y1="15" x2="21" y2="21" />
                  <line x1="4" y1="4" x2="9" y2="9" />
                </svg>
              </button>

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

              {/* Repeat — mobile hidden */}
              <button
                onClick={cycleRepeat}
                className={`p-1.5 hidden sm:block transition-colors relative ${repeat !== 'off' ? 'text-gold' : 'text-gray-600 hover:text-gray-300'}`}
                aria-label={repeat === 'off' ? 'Activar repetir' : repeat === 'all' ? 'Repetir una' : 'Desactivar repetir'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="17 1 21 5 17 9" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <polyline points="7 23 3 19 7 15" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
                {repeat === 'one' && (
                  <span className="absolute -top-0.5 -right-0.5 text-[8px] font-bold text-gold">1</span>
                )}
              </button>
            </div>

            {/* Song info */}
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-white truncate">{currentSong.titulo}</p>
              <p className="font-body text-xs text-gray-500">
                {formatTime(currentTime)}{' '}
                <span className="text-gray-700">/</span>{' '}
                {formatTime(duration)}
              </p>
            </div>

            {/* Volume — desktop only */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
                className="text-gray-500 hover:text-gray-300 transition-colors"
                aria-label={volume > 0 ? 'Silenciar' : 'Activar sonido'}
              >
                {volume === 0 ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 accent-gold h-1"
                aria-label="Volumen"
              />
            </div>

            {/* Letra link */}
            {currentSong.letra && (
              <a
                href={encodeR2Path(currentSong.titulo, currentSong.letra)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 hover:text-gold transition-colors border border-gray-700 hover:border-gold/40 px-3 py-1.5"
                title="Ver letra"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                Letra
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
