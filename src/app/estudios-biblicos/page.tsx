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
    num: '01',
  },
  {
    href: '/estudios-biblicos/predicaciones',
    title: 'Predicaciones',
    subtitle: 'Sermones',
    description:
      'Mensajes poderosos de la Palabra de Dios que edifican, fortalecen y transforman. Escucha y estudia cada predicación a tu propio ritmo.',
    english: false,
    num: '02',
  },
  {
    href: '/estudios-biblicos/otros-estudios',
    title: 'Otros Estudios',
    subtitle: 'More Studies',
    description:
      'Material adicional para tu crecimiento espiritual. Temas bíblicos, estudios temáticos y recursos para profundizar en la fe.',
    english: false,
    num: '03',
  },
];

export default function EstudiosBiblicosPage() {
  return (
    <div className="pt-[72px]">
      {/* Header */}
      <section className="bg-black text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }} />
        </div>
        <div className="relative z-10">
          <p className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
            Crece en la Fe
          </p>
          <h1 className="text-5xl md:text-6xl font-normal italic text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Estudios Bíblicos
          </h1>
          <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-6" />
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            La Palabra de Dios es viva y eficaz. En Mega Zoé te ofrecemos diferentes espacios para estudiarla, comprenderla y aplicarla en tu vida diaria.
          </p>
          {/* Biblioteca CTA */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#f8f5f0] border border-[#c9a96e]/20 px-8 py-5">
            <div className="text-left">
              <p className="text-xs tracking-widest uppercase text-[#c9a96e] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>
                Más de 1,200 estudios disponibles
              </p>
              <p className="text-sm text-gray-600" style={{ fontFamily: "'Lato', sans-serif" }}>
                Busca por libro de la Biblia, tópico o palabra clave en nuestra Biblioteca.
              </p>
            </div>
            <Link
              href="/biblioteca"
              className="flex-shrink-0 bg-black text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-[#c9a96e] transition-colors whitespace-nowrap"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Ir a la Biblioteca →
            </Link>
          </div>
        </div>
      </section>

      {/* Studies Cards */}
      <section className="pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studies.map(({ href, title, subtitle, description, english, englishHref, num }) => (
              <div key={href} className="group border border-gray-100 hover:border-[#c9a96e]/40 transition-all duration-300 hover:shadow-xl">
                {/* Top accent */}
                <div className="h-1 bg-[#c9a96e]" />
                <div className="p-8">
                  <p className="text-[#c9a96e] text-xs tracking-widest mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
                    {num}
                  </p>
                  <h2 className="text-2xl font-normal italic text-black mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {title}
                  </h2>
                  <p className="text-gray-400 text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
                    {subtitle}
                  </p>
                  <div className="w-8 h-px bg-[#c9a96e] mb-6" />
                  <p className="text-gray-600 text-sm leading-relaxed mb-8">{description}</p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={href}
                      className="inline-flex items-center justify-center gap-2 text-xs tracking-widest uppercase bg-black text-white px-6 py-3 hover:bg-[#c9a96e] transition-colors duration-200"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      Ver Estudios
                    </Link>
                    {english && englishHref && (
                      <Link
                        href={englishHref}
                        className="inline-flex items-center justify-center gap-2 text-xs tracking-widest uppercase border border-black text-black px-6 py-3 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors duration-200"
                        style={{ fontFamily: "'Lato', sans-serif" }}
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

      {/* CTA */}
      <section className="py-20 px-6 bg-[#f8f5f0]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-normal italic text-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Estamos aquí para ayudarte en tu camino de fe. Contáctanos y con gusto te atendemos.
          </p>
          <Link
            href="/contactanos"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase bg-black text-white px-8 py-4 hover:bg-[#c9a96e] transition-colors duration-200"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Contáctanos →
          </Link>
        </div>
      </section>
    </div>
  );
}
