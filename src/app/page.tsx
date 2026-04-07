import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SocialIcons from '@/components/SocialIcons';

export const metadata: Metadata = {
  title: 'Iglesia Mega Zoé — Llevando la Palabra de Dios',
  description: 'Iglesia Mega Zoé — Llevando la Palabra de Dios tal cual ella se merece, con temor reverente y pasión.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero — Full-width with overlay */}
      <section className="relative h-screen pt-[80px]">
        <Image
          src="/images/pastora.jpg"
          alt="Iglesia Mega Zoé"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6">
          <h1 className="font-logo text-6xl md:text-8xl text-white drop-shadow-lg mb-6">
            Mega Zoe
          </h1>
          <p className="font-body text-xs md:text-sm text-white/70 tracking-[0.35em] uppercase mb-10">
            Iglesia Cristiana
          </p>
          <SocialIcons dark />
        </div>
      </section>

      {/* About — brief intro */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          {/* Gold decorative line */}
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          <h2 className="font-heading text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Bienvenidos
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            Llevamos la Palabra de Dios tal cual ella se merece, con temor reverente y con toda la pasión que Dios espera.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-10">
            Un pueblo unido en fe, creciendo juntos en comunidad y sirviendo al Dios vivo.
          </p>
          <Link
            href="/sobre-nosotros"
            className="font-body inline-flex items-center gap-2 text-sm text-gold hover:text-gold-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            Conoce nuestra historia &rarr;
          </Link>
        </div>
      </section>

      {/* Explore Section — cream background */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-16 h-px bg-gold mx-auto mb-8" />
            <p className="font-body text-xs text-gold tracking-[0.3em] uppercase mb-4">Descubre</p>
            <h2 className="font-heading text-3xl font-light text-gray-800">
              Explora
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Biblioteca',
                description: 'Más de 1,200 estudios bíblicos originales. Busca por libro, tópico o palabra clave.',
                href: '/biblioteca',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                ),
              },
              {
                title: 'Estudios Bíblicos',
                description: 'Iglesia en las Casas, predicaciones y material adicional para crecer en la fe.',
                href: '/estudios-biblicos',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                ),
              },
              {
                title: 'Música',
                description: 'Adoración y alabanza que edifica el espíritu y glorifica a Dios.',
                href: '/musica',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                ),
              },
            ].map(({ title, description, href, icon }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="h-1 bg-gold" />
                <div className="p-8 flex flex-col flex-1">
                  <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center mb-5 group-hover:bg-gold-light/30 transition-colors duration-300">
                    {icon}
                  </div>
                  <h3 className="font-heading text-xl font-normal text-gray-800 mb-3 group-hover:text-gold transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>
                  <span className="font-body text-sm text-gold flex items-center gap-1.5 mt-auto">
                    Ver más <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
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
            Estamos aquí para ti. Escríbenos y pronto te responderemos. ¡Dios le bendiga!
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
