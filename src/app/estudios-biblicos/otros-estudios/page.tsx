import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Otros Estudios | Iglesia Mega Zoé',
  description: 'Recursos y estudios adicionales para tu crecimiento espiritual.',
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
          <p className="font-body text-gray-400 text-xs tracking-widest uppercase">More Studies</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          <p className="text-gray-500 text-base leading-relaxed">
            Material adicional para profundizar en tu fe. Temas bíblicos, estudios temáticos y recursos especiales para todo creyente.
          </p>
        </div>
      </section>

      {/* Coming soon cards */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-4">En preparación</p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-gray-800">
              Próximamente
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Doctrina Bíblica',
                desc: 'Fundamentos de la fe cristiana según las Escrituras.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold/50">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                ),
              },
              {
                title: 'Vida de Oración',
                desc: 'Cómo desarrollar una vida de oración profunda y constante.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold/50">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
              },
              {
                title: 'El Espíritu Santo',
                desc: 'Conociendo y caminando en el Espíritu.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold/50">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                ),
              },
              {
                title: 'Mayordomía',
                desc: 'Administrando los recursos que Dios nos ha dado.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold/50">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ),
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="bg-white border border-dashed border-gray-200 p-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-gray-200 flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="font-body text-gold/60 text-xs tracking-widest uppercase mb-2">Próximamente</p>
                    <h2 className="font-heading text-xl font-light text-gray-700 mb-2">{title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
