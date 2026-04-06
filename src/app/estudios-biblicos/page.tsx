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
  },
  {
    href: '/estudios-biblicos/predicaciones',
    title: 'Predicaciones',
    subtitle: 'Sermones',
    description:
      'Mensajes poderosos de la Palabra de Dios que edifican, fortalecen y transforman. Escucha y estudia cada predicación a tu propio ritmo.',
    english: false,
  },
  {
    href: '/estudios-biblicos/otros-estudios',
    title: 'Otros Estudios',
    subtitle: 'More Studies',
    description:
      'Material adicional para tu crecimiento espiritual. Temas bíblicos, estudios temáticos y recursos para profundizar en la fe.',
    english: false,
  },
];

export default function EstudiosBiblicosPage() {
  return (
    <div className="pt-[80px]">
      {/* Header */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-light uppercase tracking-wider text-gray-800 mb-4">
            Estudios Bíblicos
          </h1>
          <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
            La Palabra de Dios es viva y eficaz. Te ofrecemos diferentes espacios para estudiarla, comprenderla y aplicarla en tu vida diaria.
          </p>
        </div>
      </section>

      {/* Biblioteca banner */}
      <section className="py-8 px-6 bg-cream border-b border-gold/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-body text-sm text-gray-600">
              <span className="text-gold font-medium">1,200+</span> estudios disponibles en nuestra Biblioteca
            </p>
          </div>
          <Link
            href="/biblioteca"
            className="font-body text-sm border border-gold text-gold px-6 py-2 hover:bg-gold hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Ir a la Biblioteca &rarr;
          </Link>
        </div>
      </section>

      {/* Studies Cards */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studies.map(({ href, title, subtitle, description, english, englishHref }) => (
              <div key={href} className="group border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="h-0.5 bg-gold" />
                <div className="p-8">
                  <h2 className="font-heading text-2xl font-light text-gray-800 mb-1 group-hover:text-gold transition-colors">
                    {title}
                  </h2>
                  <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-6">
                    {subtitle}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">{description}</p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={href}
                      className="font-body text-center text-sm bg-gold text-white px-6 py-3 hover:bg-gold-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                    >
                      Ver Estudios
                    </Link>
                    {english && englishHref && (
                      <Link
                        href={englishHref}
                        className="font-body text-center text-sm border border-gray-200 text-gray-500 px-6 py-3 hover:border-gold hover:text-gold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      >
                        English Version
                      </Link>
                    )}
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
