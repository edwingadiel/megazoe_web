import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Iglesia Mega Zoé',
  description: 'Conoce la historia, misión y visión de Iglesia Mega Zoé.',
};

export default function SobreNosotrosPage() {
  return (
    <div className="pt-[80px]">
      {/* Header — consistent centered pattern */}
      <section className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="font-body text-xs text-gold tracking-[0.3em] uppercase mb-4">Nuestra Iglesia</p>
          <h1 className="font-heading text-4xl md:text-6xl font-light text-gray-800 mb-5">
            Sobre Nosotros
          </h1>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
            Conoce la historia, misión y visión de Iglesia Mega Zoé.
          </p>
        </div>
      </section>

      {/* Intro quote */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-6">
            &ldquo;Es el lugar de reunión para hacer el servicio público a Dios. En privado vamos a Dios, pero en la iglesia tenemos el día de unirnos a darle culto al Dios vivo.&rdquo;
          </p>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-gold">
            Pastora Edith Cruz
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-4">Nuestra Historia</p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-gray-800 mb-6">
                Un pueblo unido en fe
              </h2>
              <div className="w-12 h-px bg-gold mb-6" />
            </div>
            <div className="md:col-span-7">
              <p className="text-gray-500 text-base leading-relaxed mb-5">
                Nuestros años de espera han sido para ir perfeccionando como se lo merece la iglesia. Días fuertes, difíciles, pero en la gran batalla de hacer el trabajo como se merece.
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                Hemos aprendido a perder, a callar y llorar. Pero, al final hay un gran triunfo, está la iglesia sobre toda oposición y ha llegado el día en que hay un pueblo unido, uniendo la familia de la fe poco a poco, hasta que cumplamos la voluntad de nuestro Padre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Misión */}
            <div className="bg-white border border-gray-100 p-10 md:p-14">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-light text-gray-800">
                  Misión
                </h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Llevar la Palabra de Dios tal cual ella se merece, con temor reverente y con toda la pasión que Dios espera. Llevarla aquí a nuestro pueblo y a donde nos toca llevarla sin ningún miedo, sino con amor y paciencia esperando el fruto en su tiempo.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white border border-gray-100 p-10 md:p-14">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-light text-gray-800">
                  Visión
                </h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Ser una comunidad de fe que transforma vidas a través de la Palabra de Dios, donde cada creyente descubra su propósito divino y lo viva plenamente para la gloria de Dios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          <h2 className="font-heading text-3xl font-light text-gray-800 mb-4">
            ¿Quieres conocernos?
          </h2>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed">
            Estamos aquí para ti. Escríbenos y pronto te responderemos.
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
