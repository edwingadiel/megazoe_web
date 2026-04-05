import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllEstudiosCards, getAllTopicos, getAllLibros } from '@/lib/estudios';
import LibrarySearch from '@/components/LibrarySearch';

export const metadata: Metadata = {
  title: 'Biblioteca de Estudios | Iglesia Mega Zoé',
  description:
    'Más de 1,200 estudios bíblicos de la Pastora Edith Cruz. Busca por libro de la Biblia, tópico, o palabra clave.',
};

export default function BibliotecaPage() {
  const estudios = getAllEstudiosCards();
  const topicos = getAllTopicos();
  const libros = getAllLibros();

  const totalEstudios = estudios.length;
  const totalTopicos = topicos.length;
  const totalLibros = libros.length;

  return (
    <div className="pt-[72px]">
      {/* Hero header */}
      <section className="bg-black text-white py-24 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10">
          <p
            className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Pastora Edith Cruz · Iglesia Mega Zoé
          </p>
          <h1
            className="text-5xl md:text-7xl font-normal italic text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Biblioteca
          </h1>
          <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-6 mb-6" />
          <p
            className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Estudios bíblicos originales. Busca por libro, tópico, o cualquier palabra clave.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {[
            { num: totalEstudios.toLocaleString(), label: 'Estudios' },
            { num: totalTopicos.toString(), label: 'Tópicos' },
            { num: totalLibros.toString(), label: 'Libros de la Biblia' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p
                className="text-3xl font-normal italic text-[#c9a96e]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {num}
              </p>
              <p
                className="text-white/40 text-xs tracking-widest uppercase mt-1"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Search & filters */}
      <section className="py-12 bg-white">
        <Suspense fallback={<div className="py-20 text-center text-gray-400">Cargando estudios...</div>}>
          <LibrarySearch estudios={estudios} topicos={topicos} libros={libros} />
        </Suspense>
      </section>
    </div>
  );
}
