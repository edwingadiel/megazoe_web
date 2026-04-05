import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contáctanos | Iglesia Mega Zoé',
  description: 'Escríbenos y pronto te responderemos. ¡Dios le bendiga!',
};

export default function ContactanosPage() {
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
            Estamos aquí para ti
          </p>
          <h1 className="text-5xl md:text-6xl font-normal italic text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Contáctanos
          </h1>
          <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-6 mb-6" />
          <p className="text-white/60 text-sm max-w-md mx-auto" style={{ fontFamily: "'Lato', sans-serif" }}>
            Deje su mensaje y pronto le responderemos. ¡Dios le bendiga!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <div>
              <p className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
                Información de Contacto
              </p>
              <h2 className="text-3xl font-normal italic text-black mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Hablemos
              </h2>
              <div className="w-10 h-px bg-[#c9a96e] mb-8" />

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#c9a96e]/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-[#c9a96e] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>
                      Correo electrónico
                    </p>
                    <a
                      href="mailto:iglesiamegazoe@gmail.com"
                      className="text-black hover:text-[#c9a96e] transition-colors text-sm"
                    >
                      iglesiamegazoe@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#c9a96e]/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                      <path d="M21 2H3v16h5l4 4 4-4h5V2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-[#c9a96e] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>
                      Redes Sociales
                    </p>
                    <div className="flex gap-3 mt-2">
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
                          className="text-xs tracking-widest uppercase text-gray-500 hover:text-[#c9a96e] border-b border-transparent hover:border-[#c9a96e] pb-px transition-all"
                          style={{ fontFamily: "'Lato', sans-serif" }}
                        >
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-12 p-8 bg-[#f8f5f0] border-l-4 border-[#c9a96e]">
                <blockquote
                  className="text-lg italic text-gray-700 leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  &ldquo;¡Dios le bendiga!&rdquo;
                </blockquote>
                <p className="text-xs tracking-widest uppercase text-[#c9a96e] mt-3" style={{ fontFamily: "'Lato', sans-serif" }}>
                  — Iglesia Mega Zoé
                </p>
              </div>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
            Manténgase actualizado
          </p>
          <h2 className="text-3xl font-normal italic text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Suscríbase a nuestras noticias
          </h2>
          <div className="w-10 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p className="text-white/60 text-sm mb-8">
            Recibe las últimas noticias, eventos y recursos de Iglesia Mega Zoé directo en tu correo.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
              style={{ fontFamily: "'Lato', sans-serif" }}
            />
            <button
              type="submit"
              className="bg-[#c9a96e] text-black px-6 py-3 text-xs tracking-widest uppercase hover:bg-[#b8955a] transition-colors font-medium"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Suscríbase
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
