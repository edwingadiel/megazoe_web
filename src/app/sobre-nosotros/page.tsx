import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Iglesia Mega Zoé',
  description: 'Conoce la historia, misión y visión de Iglesia Mega Zoé.',
};

export default function SobreNosotrosPage() {
  return (
    <div className="pt-[72px]">
      {/* Page Header */}
      <section className="bg-black text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }} />
        </div>
        <div className="relative z-10">
          <p
            className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Quiénes Somos
          </p>
          <h1
            className="text-5xl md:text-6xl font-normal italic text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Mega Zoé
          </h1>
          <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-6" />
        </div>
      </section>

      {/* Mega Zoé Definition */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#c9a96e] text-4xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>✦</div>
          <h2
            className="text-3xl md:text-4xl font-normal italic text-black mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ¿Qué es Mega Zoé?
          </h2>
          <div className="w-10 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Es el lugar de reunión para hacer el servicio público a Dios. En privado vamos a Dios, pero en la iglesia lo servimos. Mega Zoé es el espacio donde la fe se vive en comunidad.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="py-24 px-6 bg-[#f8f5f0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Foto pastora — reemplazar con imagen real */}
            <div className="relative order-2 md:order-1">
              <div className="bg-gray-200 aspect-[3/4] max-w-sm mx-auto flex items-center justify-center relative overflow-hidden">
                {/* Placeholder for pastor photo — replace with <Image> when available */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-2">🙏</div>
                    <p className="text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
                      Foto de la Pastora
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#c9a96e]/40" />
            </div>

            {/* Text */}
            <div className="order-1 md:order-2">
              <p
                className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Nuestra Historia
              </p>
              <h2
                className="text-4xl font-normal italic text-black mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Historia de Mega Zoé
              </h2>
              <div className="w-10 h-px bg-[#c9a96e] mb-8" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Nuestros años de espera han sido para ir perfeccionando como se lo merece la iglesia. Días fuertes, llenos de la presencia de Dios, donde cada momento ha sido un paso de fe hacia lo que Él tiene preparado.
                </p>
                <p>
                  Mega Zoé nació con un propósito claro: ser un faro de luz en la comunidad, un lugar donde cada persona pueda encontrar a Dios y crecer en su fe. Cada servicio, cada estudio bíblico, cada reunión, es una oportunidad de encontrarnos con el Señor.
                </p>
                <p>
                  Hoy somos una familia que se sostiene en la Palabra de Dios, con la convicción de que Él es fiel en todas sus promesas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Lato', sans-serif" }}>
              Propósito
            </p>
            <h2 className="text-4xl font-normal italic text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
              Misión y Visión
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Misión */}
            <div className="bg-black text-white p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-[#c9a96e]/20" />
              <p
                className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                01 — Misión
              </p>
              <h3
                className="text-2xl font-normal italic text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Nuestra Misión
              </h3>
              <div className="w-8 h-px bg-[#c9a96e] mb-6" />
              <p className="text-white/70 leading-relaxed">
                Llevar la Palabra de Dios tal cual ella se merece, con temor reverente y con toda la pasión que Dios inspira. Formando discípulos que impacten su entorno con el amor de Cristo.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-[#f8f5f0] p-10 relative overflow-hidden border border-[#c9a96e]/20">
              <div className="absolute bottom-0 left-0 w-24 h-24 border-t border-r border-[#c9a96e]/20" />
              <p
                className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                02 — Visión
              </p>
              <h3
                className="text-2xl font-normal italic text-black mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Nuestra Visión
              </h3>
              <div className="w-8 h-px bg-[#c9a96e] mb-6" />
              <p className="text-gray-600 leading-relaxed">
                Ser una comunidad de fe que transforma vidas a través de la Palabra de Dios, donde cada creyente descubra su propósito divino y lo viva plenamente para la gloria de Dios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 px-6 bg-[#f8f5f0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Lato', sans-serif" }}>
              Lo que nos define
            </p>
            <h2 className="text-4xl font-normal italic text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
              Nuestros Valores
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Fe', desc: 'La fe en Dios es el fundamento de todo lo que hacemos.' },
              { num: '02', title: 'Palabra', desc: 'La Biblia es nuestra guía y autoridad en todo.' },
              { num: '03', title: 'Comunidad', desc: 'Somos una familia unida por el amor de Cristo.' },
              { num: '04', title: 'Servicio', desc: 'Servir a Dios y al prójimo es nuestro llamado.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="text-center p-6">
                <p className="text-[#c9a96e] text-xs tracking-widest mb-3" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {num}
                </p>
                <h3
                  className="text-xl font-normal italic text-black mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {title}
                </h3>
                <div className="w-6 h-px bg-[#c9a96e] mx-auto mb-4" />
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
