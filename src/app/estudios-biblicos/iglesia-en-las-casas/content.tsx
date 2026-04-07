'use client';

import { useState } from 'react';
import PdfList from '@/components/PdfList';
import estudiosEs from '@/data/estudios-casas-es.json';
import estudiosEn from '@/data/estudios-casas-en.json';

export default function IglesiaEnLasCasasContent() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  return (
    <div>
      {/* Language tabs */}
      <div className="flex items-center gap-1 mb-8">
        <button
          onClick={() => setLang('es')}
          className={`font-body text-sm px-6 py-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
            lang === 'es'
              ? 'bg-gold text-white'
              : 'bg-white border border-gray-200 text-gray-500 hover:border-gold hover:text-gold'
          }`}
        >
          Español ({estudiosEs.length.toLocaleString()})
        </button>
        <button
          onClick={() => setLang('en')}
          className={`font-body text-sm px-6 py-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
            lang === 'en'
              ? 'bg-gold text-white'
              : 'bg-white border border-gray-200 text-gray-500 hover:border-gold hover:text-gold'
          }`}
        >
          English ({estudiosEn.length.toLocaleString()})
        </button>
      </div>

      {lang === 'es' ? (
        <PdfList items={estudiosEs} label="estudios en español" />
      ) : (
        <PdfList items={estudiosEn} label="studies in English" />
      )}
    </div>
  );
}
