import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Iglesia Mega Zoé',
  description: 'Conoce la historia, misión y visión de Iglesia Mega Zoé.',
};

export default function SobreNosotrosPage() {
  return (
    <div className="pt-[80px]">
      {/* Hero — About */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-light uppercase tracking-wider text-gray-800 mb-8">
                Mega Zoé
              </h1>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                Es el lugar de reunión para hacer el servicio público a Dios. En privado vamos a Dios, pero en la iglesia tenemos el día de unirnos a darle culto al Dios vivo uniendo la familia de la fe poco a poco, hasta que cumplamos la voluntad de nuestro Padre.
              </p>
            </div>

            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/images/church-interior.avif"
                alt="Interior de Iglesia Mega Zoé — La Pastora predicando"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Historia & Misión */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-2xl font-light text-gray-800 mb-6">
                Historia
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Nuestros años de espera han sido para ir perfeccionando como se lo merece la iglesia. Días fuertes, difíciles, pero en la gran batalla de hacer el trabajo como se merece. Hemos aprendido a perder, a callar y llorar. Pero, al final hay un gran triunfo, está la iglesia sobre toda oposición y ha llegado el día en que hay un pueblo unido.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-light text-gray-800 mb-6">
                Misión
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Llevar la Palabra de Dios tal cual ella se merece, con temor reverente y con toda la pasión que Dios espera. Llevarla aquí a nuestro pueblo y a donde nos toca llevarla sin ningún miedo, sino con amor y paciencia esperando el fruto en su tiempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visión */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-2xl font-light text-gray-800 mb-6">
                Visión
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Ser una comunidad de fe que transforma vidas a través de la Palabra de Dios, donde cada creyente descubra su propósito divino y lo viva plenamente para la gloria de Dios.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-light text-gray-800 mb-6">
                Valores
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: 'Fe', desc: 'El fundamento de todo lo que hacemos.' },
                  { title: 'Palabra', desc: 'Nuestra guía y autoridad.' },
                  { title: 'Comunidad', desc: 'Una familia unida en Cristo.' },
                  { title: 'Servicio', desc: 'Nuestro llamado al prójimo.' },
                ].map(({ title, desc }) => (
                  <div key={title}>
                    <h3 className="font-heading text-lg text-gray-800 mb-1">{title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Church exterior photo */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full aspect-[2.2/1]">
            <Image
              src="/images/church-hero.avif"
              alt="Exterior de Iglesia Mega Zoé"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
