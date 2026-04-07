import type { Metadata } from 'next';
import Link from 'next/link';
import OtrosEstudiosContent from './content';

export const metadata: Metadata = {
  title: 'Otros Estudios | Iglesia Mega Zoé',
  description: 'Estudios bíblicos adicionales organizados por libro de la Biblia.',
};

export default function OtrosEstudiosPage() {
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
            Otros Estudios
          </h1>
          <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-4">More Studies</p>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
            Estudios bíblicos adicionales organizados por libro de la Biblia. Selecciona un libro para ver los estudios disponibles.
          </p>
        </div>
      </section>

      {/* Studies by book */}
      <section className="py-12 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <OtrosEstudiosContent />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          <h2 className="font-heading text-3xl font-light text-gray-800 mb-4">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed">
            Estamos aquí para ti. Escríbenos y pronto te responderemos.
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
