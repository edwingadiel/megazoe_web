import Image from 'next/image';
import Link from 'next/link';
import SocialIcons from '@/components/SocialIcons';

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
            Mega Zoé
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
              },
              {
                title: 'Estudios Bíblicos',
                description: 'Iglesia en las Casas, predicaciones y material adicional para crecer en la fe.',
                href: '/estudios-biblicos',
              },
              {
                title: 'Música',
                description: 'Adoración y alabanza que edifica el espíritu y glorifica a Dios.',
                href: '/musica',
              },
            ].map(({ title, description, href }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="h-0.5 bg-gold group-hover:h-1 transition-all" />
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-heading text-xl font-normal text-gray-800 mb-3 group-hover:text-gold transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>
                  <span className="font-body text-sm text-gold flex items-center gap-1 mt-auto">
                    Ver más <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
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
