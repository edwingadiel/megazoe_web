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
    <div className="pt-[80px]">
      {/* Header */}
      <section className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="font-body text-xs text-gold tracking-[0.3em] uppercase mb-4">Estudios Bíblicos</p>
          <h1 className="font-heading text-4xl md:text-6xl font-light text-gray-800 mb-5">
            Biblioteca
          </h1>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto mb-12">
            Estudios bíblicos originales de la Pastora Edith Cruz. Busca por libro de la Biblia, tópico, o cualquier palabra clave.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 md:gap-16">
            {[
              { num: totalEstudios.toLocaleString(), label: 'Estudios' },
              { num: totalTopicos.toString(), label: 'Tópicos' },
              { num: totalLibros.toString(), label: 'Libros' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="font-heading text-3xl md:text-4xl font-light text-gold">
                  {num}
                </p>
                <p className="font-body text-gray-400 text-xs tracking-widest uppercase mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & filters */}
      <section className="py-10 bg-cream">
        <Suspense fallback={
          <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Skeleton search bar */}
            <div className="h-12 bg-gray-100 rounded animate-pulse mb-8" />
            {/* Skeleton grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border border-gray-100 bg-white p-6">
                  <div className="h-1 bg-gray-100 mb-4" />
                  <div className="flex justify-between mb-3">
                    <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                    <div className="h-4 w-8 bg-gray-100 rounded animate-pulse" />
                  </div>
                  <div className="h-3 w-24 bg-gray-100 rounded animate-pulse mb-3" />
                  <div className="h-5 w-full bg-gray-100 rounded animate-pulse mb-2" />
                  <div className="h-5 w-3/4 bg-gray-100 rounded animate-pulse mb-4" />
                  <div className="h-3 w-full bg-gray-100 rounded animate-pulse mb-1" />
                  <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        }>
          <LibrarySearch estudios={estudios} topicos={topicos} libros={libros} />
        </Suspense>
      </section>
    </div>
  );
}
