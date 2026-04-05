import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Otros Estudios | Iglesia Mega Zoé',
  description: 'Recursos y estudios adicionales para tu crecimiento espiritual.',
};

export default function OtrosEstudiosPage() {
  return (
    <div className="pt-[72px]">
      {/* Header */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <p className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
          Estudios Bíblicos
        </p>
        <h1 className="text-5xl font-normal italic text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          Otros Estudios
        </h1>
        <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-6" />
      </section>

      {/* Content */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed mb-12 text-center">
            Material adicional para profundizar en tu fe. Temas bíblicos, estudios temáticos y recursos especiales para todo creyente.
          </p>

          {/* Placeholder content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Doctrina Bíblica', desc: 'Fundamentos de la fe cristiana según las Escrituras.' },
              { title: 'Vida de Oración', desc: 'Cómo desarrollar una vida de oración profunda y constante.' },
              { title: 'El Espíritu Santo', desc: 'Conociendo y caminando en el Espíritu.' },
              { title: 'Mayordomía', desc: 'Administrando los recursos que Dios nos ha dado.' },
            ].map(({ title, desc }) => (
              <div key={title} className="border border-gray-100 p-6 hover:border-[#c9a96e]/40 hover:shadow-md transition-all duration-300">
                <div className="text-[#c9a96e] text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Lato', sans-serif" }}>
                  Próximamente
                </div>
                <h3 className="text-xl font-normal italic text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-12 text-center">
        <Link
          href="/estudios-biblicos"
          className="text-xs tracking-widest uppercase text-[#c9a96e] hover:text-black transition-colors"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          ← Volver a Estudios Bíblicos
        </Link>
      </div>
    </div>
  );
}
