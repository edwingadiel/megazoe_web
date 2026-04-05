import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Subtle pattern fallback — replaced by church photo once added */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Background image — place church photo at /public/images/church-hero.jpg */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/church-hero.jpg')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <p
            className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Bienvenidos a
          </p>
          <h1
            className="text-6xl md:text-8xl font-normal italic mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Mega Zoé
          </h1>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p
            className="text-white/80 text-sm md:text-base tracking-wider leading-relaxed max-w-xl mx-auto mb-10"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Llevando la Palabra de Dios tal cual ella se merece,<br />
            con temor reverente y con toda la pasión que Dios inspira.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sobre-nosotros"
              className="bg-[#c9a96e] text-black px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#b8955a] transition-colors duration-200"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Conócenos
            </Link>
            <Link
              href="/contactanos"
              className="border border-white/50 text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Contáctanos
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.6rem' }}>
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Nuestra Iglesia
              </p>
              <h2
                className="text-4xl md:text-5xl font-normal italic text-black mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Un lugar para<br />servir a Dios
              </h2>
              <div className="w-12 h-px bg-[#c9a96e] mb-8" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Es el lugar de reunión para hacer el servicio público a Dios. En privado vamos a Dios, pero en la iglesia lo servimos.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Nuestros años de espera han sido para ir perfeccionando como se lo merece la iglesia. Días fuertes, llenos de la presencia de Dios, donde cada creyente crece en su fe.
              </p>
              <Link
                href="/sobre-nosotros"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-black border-b border-[#c9a96e] pb-1 hover:text-[#c9a96e] transition-colors"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Nuestra Historia
                <span>→</span>
              </Link>
            </div>

            {/* Decorative block */}
            <div className="relative p-6">
              <div className="bg-[#f8f5f0] aspect-square max-w-sm mx-auto flex items-center justify-center border border-[#c9a96e]/15">
                <div className="text-center p-10">
                  <div className="text-[#c9a96e] text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ✦
                  </div>
                  <blockquote
                    className="text-gray-700 text-lg italic leading-relaxed"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    &ldquo;Llevar la Palabra de Dios tal cual ella se merece, con temor reverente y con toda la pasión que Dios inspira.&rdquo;
                  </blockquote>
                  <div className="w-8 h-px bg-[#c9a96e] mx-auto mt-6" />
                  <p className="text-xs tracking-widest uppercase text-[#c9a96e] mt-4" style={{ fontFamily: "'Lato', sans-serif" }}>
                    Nuestra Misión
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-24 px-6 bg-[#f8f5f0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Lato', sans-serif" }}>
              Explora
            </p>
            <h2 className="text-4xl font-normal italic text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
              Lo que ofrecemos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Biblioteca',
                description: 'Más de 1,200 estudios bíblicos. Busca por libro, tópico o palabra clave.',
                href: '/biblioteca',
                icon: '📚',
              },
              {
                title: 'Música',
                description: 'Adoración y alabanza que edifica el espíritu. Escucha y disfruta nuestra música.',
                href: '/musica',
                icon: '🎵',
              },
              {
                title: 'Contáctanos',
                description: 'Estamos aquí para ti. Escríbenos y pronto te responderemos. ¡Dios le bendiga!',
                href: '/contactanos',
                icon: '✉️',
              },
            ].map(({ title, description, href, icon }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white p-8 border border-gray-100 hover:border-[#c9a96e]/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3
                  className="text-xl font-normal text-black mb-3 group-hover:text-[#c9a96e] transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>
                <span className="text-xs tracking-widest uppercase text-[#c9a96e] flex items-center gap-1" style={{ fontFamily: "'Lato', sans-serif" }}>
                  Ver más <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
            Únete a nosotros
          </p>
          <h2
            className="text-4xl md:text-5xl font-normal italic mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sigue conectado
          </h2>
          <div className="w-12 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p className="text-white/70 leading-relaxed mb-10 text-sm">
            Síguenos en nuestras redes sociales y mantente al día con nuestras actividades, predicaciones y eventos especiales.
          </p>
          <div className="flex items-center justify-center gap-6">
            {[
              { href: 'http://www.facebook.com/iglesiamegazoe', label: 'Facebook' },
              { href: 'https://instagram.com/iglesiamegazoe', label: 'Instagram' },
              { href: 'https://www.youtube.com/channel/UCbVEs6ElWvnx1klyRCdfsSA', label: 'YouTube' },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase border border-white/20 px-6 py-3 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors duration-200"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
