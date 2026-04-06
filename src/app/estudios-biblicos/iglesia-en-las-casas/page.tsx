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
          <Link href="/estudios-biblicos" className="font-body text-sm text-gray-400 hover:text-gold transition-colors mb-6 inline-flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-current"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Estudios Bíblicos
          </Link>
          <div className="w-12 h-px bg-gold mb-6" />
          <h1 className="font-heading text-4xl md:text-5xl font-light text-gray-800 mb-2">
            Iglesia en las Casas
          </h1>
          <p className="font-body text-gray-400 text-xs tracking-widest uppercase">Home Studies</p>
        </div>
      </section>

      {/* Intro */}
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

      {/* Feature cards */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: '¿Qué es?',
                desc: 'Reuniones pequeñas en casas donde la Biblia se estudia de forma profunda y personal. Es el modelo de la iglesia primitiva: comunidad real, fe compartida.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ),
              },
              {
                title: '¿Cómo funciona?',
                desc: 'Nos reunimos semanalmente en hogares para estudiar un tema bíblico, compartir testimonios y orar unos por otros. Un ambiente de confianza y crecimiento.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
              {
                title: '¿Cómo unirme?',
                desc: 'Contáctanos para conocer el grupo más cercano a ti. Estamos disponibles para orientarte y conectarte con una familia de fe.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="bg-white p-8 border border-gray-100 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-5 border border-gold/30 flex items-center justify-center group-hover:bg-cream transition-colors">
                  {icon}
                </div>
                <h2 className="font-heading text-xl text-gray-800 mb-3">{title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* English & Contact CTA */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          <p className="text-gray-400 text-sm mb-6">Also available in English</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estudios-biblicos/iglesia-en-las-casas?lang=en"
              className="font-body text-sm border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              View in English
            </Link>
            <Link
              href="/contactanos"
              className="font-body text-sm border border-gray-200 text-gray-500 px-8 py-3 hover:border-gold hover:text-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
