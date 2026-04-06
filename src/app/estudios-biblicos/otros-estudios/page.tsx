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
          <Link href="/estudios-biblicos" className="font-body text-sm text-gray-400 hover:text-gold transition-colors mb-4 inline-block">
            &larr; Estudios Bíblicos
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-light uppercase tracking-wider text-gray-800 mb-2">
            Otros Estudios
          </h1>
          <p className="font-body text-gray-400 text-xs tracking-widest uppercase">More Studies</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500 text-base leading-relaxed mb-12 text-center max-w-2xl mx-auto">
            Material adicional para profundizar en tu fe. Temas bíblicos, estudios temáticos y recursos especiales para todo creyente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Doctrina Bíblica', desc: 'Fundamentos de la fe cristiana según las Escrituras.' },
              { title: 'Vida de Oración', desc: 'Cómo desarrollar una vida de oración profunda y constante.' },
              { title: 'El Espíritu Santo', desc: 'Conociendo y caminando en el Espíritu.' },
              { title: 'Mayordomía', desc: 'Administrando los recursos que Dios nos ha dado.' },
            ].map(({ title, desc }) => (
              <div key={title} className="border border-gray-200 border-dashed p-6 opacity-60">
                <p className="font-body text-gold text-xs tracking-widest uppercase mb-3">Próximamente</p>
                <h2 className="font-heading text-xl font-light text-gray-800 mb-2">{title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
