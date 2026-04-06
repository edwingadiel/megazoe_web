import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Iglesia Mega Zoé',
  description: 'Conoce la historia, misión y visión de Iglesia Mega Zoé.',
};

export default function SobreNosotrosPage() {
  return (
    <div className="pt-[80px]">
      {/* Hero — full-width photo with overlay text */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <Image
          src="/images/church-interior.avif"
          alt="Interior de Iglesia Mega Zoé"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-6">
          <p className="font-body text-xs text-gold tracking-[0.3em] uppercase mb-3">Nuestra Iglesia</p>
          <h1 className="font-heading text-4xl md:text-6xl font-light text-white text-center">
            Sobre Nosotros
          </h1>
        </div>
      </section>

      {/* Intro quote */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          <p className="font-display text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-6">
            &ldquo;Es el lugar de reunión para hacer el servicio público a Dios. En privado vamos a Dios, pero en la iglesia tenemos el día de unirnos a darle culto al Dios vivo.&rdquo;
          </p>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-gold">
            Pastora Edith Cruz
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20 px-6 bg-cream">
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

      {/* Misión y Visión — two elegant cards */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Misión */}
            <div className="border border-gray-100 p-10 md:p-14">
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
            <div className="border border-gray-100 border-l-0 p-10 md:p-14 max-md:border-l max-md:border-t-0">
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

      {/* Valores */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-4">Lo que nos define</p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-gray-800">
              Nuestros Valores
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: 'Fe',
                desc: 'El fundamento de todo lo que hacemos. Creemos en la promesa de Dios para nuestras vidas.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
              },
              {
                title: 'Palabra',
                desc: 'Nuestra guía y autoridad. La Biblia es la verdad que ilumina nuestro camino.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                ),
              },
              {
                title: 'Comunidad',
                desc: 'Una familia unida en Cristo. Juntos somos más fuertes en la fe.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
              {
                title: 'Servicio',
                desc: 'Nuestro llamado al prójimo. Servimos con amor y entrega total.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                ),
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="bg-white p-6 md:p-8 border border-gray-100 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-5 border border-gold/30 flex items-center justify-center group-hover:bg-gold/5 transition-colors">
                  {icon}
                </div>
                <h3 className="font-heading text-xl text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
