import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Iglesia en las Casas | Iglesia Mega Zoé',
  description: 'Reuniones en hogares para crecer juntos en la Palabra de Dios.',
};

export default function IglesiaEnLasCasasPage() {
  return (
    <div className="pt-[80px]">
      {/* Header */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Link href="/estudios-biblicos" className="font-body text-sm text-gray-400 hover:text-gold transition-colors mb-4 inline-block">
            &larr; Estudios Bíblicos
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-light uppercase tracking-wider text-gray-800 mb-2">
            Iglesia en las Casas
          </h1>
          <p className="font-body text-gray-400 text-xs tracking-widest uppercase">Home Studies</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500 text-base leading-relaxed mb-12 text-center max-w-2xl mx-auto">
            La Iglesia en las Casas es un espacio íntimo y cálido donde grupos pequeños se reúnen en hogares para estudiar la Palabra de Dios, orar juntos y crecer en comunidad.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-cream p-8">
              <h2 className="font-heading text-xl font-light text-gray-800 mb-3">¿Qué es?</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Reuniones pequeñas en casas donde la Biblia se estudia de forma profunda y personal. Es el modelo de la iglesia primitiva: comunidad real, fe compartida.
              </p>
            </div>
            <div className="bg-cream p-8">
              <h2 className="font-heading text-xl font-light text-gray-800 mb-3">¿Cómo unirme?</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Contáctanos para conocer el grupo más cercano a ti. Estamos disponibles para orientarte y ayudarte a comenzar.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm mb-4">Also available in English</p>
            <Link
              href="/estudios-biblicos/iglesia-en-las-casas?lang=en"
              className="font-body text-sm border border-gold text-gold px-6 py-2 hover:bg-gold hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              View in English
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
