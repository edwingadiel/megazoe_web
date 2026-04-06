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
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-light uppercase tracking-wider text-gray-800 mb-4">
            Biblioteca
          </h1>
          <p className="text-gray-500 text-sm mb-8 max-w-xl leading-relaxed">
            Estudios bíblicos originales de la Pastora Edith Cruz. Busca por libro, tópico, o cualquier palabra clave.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-10">
            {[
              { num: totalEstudios.toLocaleString(), label: 'Estudios' },
              { num: totalTopicos.toString(), label: 'Tópicos' },
              { num: totalLibros.toString(), label: 'Libros' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="font-heading text-2xl font-light text-gold">
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
        <Suspense fallback={<div className="py-20 text-center text-gray-400">Cargando estudios...</div>}>
          <LibrarySearch estudios={estudios} topicos={topicos} libros={libros} />
        </Suspense>
      </section>
    </div>
  );
}
