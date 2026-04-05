import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Iglesia en las Casas | Iglesia Mega Zoé',
  description: 'Reuniones en hogares para crecer juntos en la Palabra de Dios.',
};

export default function IglesiaEnLasCasasPage() {
  return (
    <div className="pt-[72px]">
      {/* Header */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <p className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
          Estudios Bíblicos
        </p>
        <h1 className="text-5xl font-normal italic text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          Iglesia en las Casas
        </h1>
        <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-6" />
      </section>

      {/* Content */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-8 text-center">
              La Iglesia en las Casas es un espacio íntimo y cálido donde grupos pequeños se reúnen en hogares para estudiar la Palabra de Dios, orar juntos y crecer en comunidad.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-[#f8f5f0] p-8 border-l-2 border-[#c9a96e]">
              <h3 className="text-xl font-normal italic mb-3 text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                ¿Qué es?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Reuniones pequeñas en casas donde la Biblia se estudia de forma profunda y personal. Es el modelo de la iglesia primitiva: comunidad real, fe compartida.
              </p>
            </div>
            <div className="bg-[#f8f5f0] p-8 border-l-2 border-[#c9a96e]">
              <h3 className="text-xl font-normal italic mb-3 text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                ¿Cómo unirme?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Contáctanos para conocer el grupo más cercano a ti. Estamos disponibles para orientarte y ayudarte a comenzar.
              </p>
            </div>
          </div>

          {/* Placeholder for content — will be filled by church */}
          <div className="mt-16 p-12 bg-[#f8f5f0] text-center border border-[#c9a96e]/20">
            <div className="text-[#c9a96e] text-4xl mb-4">📖</div>
            <h3 className="text-2xl font-normal italic text-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Material de estudio próximamente
            </h3>
            <p className="text-gray-500 text-sm">
              Aquí encontrarás guías, materiales y recursos para los estudios en casa.
            </p>
          </div>

          {/* English version link */}
          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm mb-4">Also available in English</p>
            <Link
              href="/estudios-biblicos/iglesia-en-las-casas?lang=en"
              className="text-xs tracking-widest uppercase border border-black text-black px-6 py-3 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              View in English
            </Link>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="pb-12 text-center">
        <Link
          href="/estudios-biblicos"
          className="text-xs tracking-widest uppercase text-[#c9a96e] hover:text-black transition-colors"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          ← Volver a Estudios Bíblicos
        </Link>
      </div>
    </div>
  );
}
