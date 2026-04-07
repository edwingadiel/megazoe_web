'use client';

import { useState } from 'react';
import PdfList from '@/components/PdfList';
import otrosEstudios from '@/data/otros-estudios.json';

const books = Object.entries(otrosEstudios as Record<string, { titulo: string; id: string }[]>);

// Format book name nicely
function formatBookName(name: string): string {
  return name
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export default function OtrosEstudiosContent() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const selectedItems = selectedBook
    ? (otrosEstudios as Record<string, { titulo: string; id: string }[]>)[selectedBook] || []
    : [];

  const totalStudies = books.reduce((sum, [, items]) => sum + items.length, 0);

  return (
    <div>
      {!selectedBook ? (
        <>
          <p className="text-xs text-gray-400 mb-6">{totalStudies} estudios en {books.length} libros</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {books.map(([bookName, items], index) => (
              <button
                key={bookName}
                onClick={() => setSelectedBook(bookName)}
                className={`group bg-white border border-gray-100 p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  books.length % 2 === 1 && index === books.length - 1 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-light text-gray-800 group-hover:text-gold transition-colors">
                      {formatBookName(bookName)}
                    </h3>
                    <p className="font-body text-xs text-gray-400 mt-1">
                      {items.length} {items.length === 1 ? 'estudio' : 'estudios'}
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedBook(null)}
            className="font-body text-sm text-gray-400 hover:text-gold transition-colors mb-6 inline-flex items-center gap-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-current"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Todos los libros
          </button>
          <h2 className="font-heading text-2xl font-light text-gray-800 mb-6">
            {formatBookName(selectedBook)}
          </h2>
          <PdfList items={selectedItems} label="estudios" />
        </>
      )}
    </div>
  );
}
