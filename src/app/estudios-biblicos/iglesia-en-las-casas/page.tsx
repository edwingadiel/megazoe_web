import type { Metadata } from 'next';
import Link from 'next/link';
import IglesiaEnLasCasasContent from './content';

export const metadata: Metadata = {
  title: 'Iglesia en las Casas | Iglesia Mega Zoé',
  description: 'Más de 1,200 estudios bíblicos para las reuniones en hogares. Disponibles en español e inglés.',
};

export default function IglesiaEnLasCasasPage() {
  return (
    <div className="pt-[80px]">
      {/* Header */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Link href="/estudios-biblicos" className="font-body text-sm text-gray-400 hover:text-gold transition-colors mb-6 inline-flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-current"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Estudios Bíblicos
          </Link>
          <div className="w-12 h-px bg-gold mb-6" />
          <h1 className="font-heading text-4xl md:text-5xl font-light text-gray-800 mb-2">
            Iglesia en las Casas
          </h1>
          <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-4">Home Studies</p>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
            Estudios bíblicos para las reuniones en hogares. Disponibles en español e inglés.
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          <p className="font-display text-lg md:text-xl text-gray-700 italic leading-relaxed mb-4">
            &ldquo;Y perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones.&rdquo;
          </p>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-gold">
            Hechos 2:42
          </p>
        </div>
      </section>

      {/* Studies with language tabs */}
      <section className="py-12 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <IglesiaEnLasCasasContent />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          <h2 className="font-heading text-3xl font-light text-gray-800 mb-4">
            ¿Quieres unirte?
          </h2>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed">
            Contáctanos para conocer el grupo más cercano a ti.
          </p>
          <Link
            href="/contactanos"
            className="font-body inline-flex items-center gap-2 text-sm border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </div>
  );
}
