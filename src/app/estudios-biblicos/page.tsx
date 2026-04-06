import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Estudios Bíblicos | Iglesia Mega Zoé',
  description: 'Estudia la Palabra de Dios con nosotros. Iglesia en las Casas, Predicaciones y más.',
};

const studies = [
  {
    href: '/estudios-biblicos/iglesia-en-las-casas',
    title: 'Iglesia en las Casas',
    subtitle: 'Home Studies',
    description:
      'Reuniones íntimas en hogares donde la Palabra de Dios cobra vida en familia. Un espacio para crecer en comunidad y profundizar en las Escrituras.',
    english: true,
    englishHref: '/estudios-biblicos/iglesia-en-las-casas?lang=en',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: '/estudios-biblicos/predicaciones',
    title: 'Predicaciones',
    subtitle: 'Sermones',
    description:
      'Mensajes poderosos de la Palabra de Dios que edifican, fortalecen y transforman. Escucha y estudia cada predicación a tu propio ritmo.',
    english: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    href: '/estudios-biblicos/otros-estudios',
    title: 'Otros Estudios',
    subtitle: 'More Studies',
    description:
      'Material adicional para tu crecimiento espiritual. Temas bíblicos, estudios temáticos y recursos para profundizar en la fe.',
    english: false,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
];

export default function EstudiosBiblicosPage() {
  return (
    <div className="pt-[80px]">
      {/* Header — consistent centered pattern */}
      <section className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="font-body text-xs text-gold tracking-[0.3em] uppercase mb-4">Crece en la Palabra</p>
          <h1 className="font-heading text-4xl md:text-6xl font-light text-gray-800 mb-5">
            Estudios Bíblicos
          </h1>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
            La Palabra de Dios es viva y eficaz. Te ofrecemos diferentes espacios para estudiarla, comprenderla y aplicarla en tu vida diaria.
          </p>
        </div>
      </section>

      {/* Studies Cards */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-4">Nuestras áreas de estudio</p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-gray-800">
              Espacios para Crecer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studies.map(({ href, title, subtitle, description, english, englishHref, icon }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="h-1 bg-gold" />
                <div className="p-8 md:p-10 flex flex-col flex-1">
                  <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center mb-6 group-hover:bg-gold-light/30 transition-colors duration-300">
                    {icon}
                  </div>
                  <h2 className="font-heading text-2xl font-light text-gray-800 mb-1 group-hover:text-gold transition-colors">
                    {title}
                  </h2>
                  <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-5">
                    {subtitle}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{description}</p>
                  <span className="font-body text-sm text-gold flex items-center gap-2 mt-auto">
                    Ver Estudios
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* English note */}
          <p className="text-center text-gray-400 text-xs mt-8">
            <Link href="/estudios-biblicos/iglesia-en-las-casas?lang=en" className="hover:text-gold transition-colors">
              Iglesia en las Casas also available in English &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Biblioteca CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-cream p-10 md:p-14">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="font-heading text-2xl md:text-3xl font-light text-gray-800 mb-2">
                  Biblioteca de Estudios
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Más de <span className="text-gold font-semibold">1,200 estudios</span> bíblicos originales. Busca por libro de la Biblia, tópico o palabra clave.
                </p>
              </div>
              <Link
                href="/biblioteca"
                className="font-body text-sm border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 shrink-0 whitespace-nowrap"
              >
                Explorar Biblioteca &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
