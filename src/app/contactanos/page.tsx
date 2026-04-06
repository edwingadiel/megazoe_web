import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import SocialIcons from '@/components/SocialIcons';

export const metadata: Metadata = {
  title: 'Contáctanos | Iglesia Mega Zoé',
  description: 'Escríbenos y pronto te responderemos. ¡Dios le bendiga!',
};

export default function ContactanosPage() {
  return (
    <div className="pt-[80px]">
      {/* Header — consistent centered pattern */}
      <section className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="font-body text-xs text-gold tracking-[0.3em] uppercase mb-4">Estamos para ti</p>
          <h1 className="font-heading text-4xl md:text-6xl font-light text-gray-800 mb-5">
            Contáctanos
          </h1>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
            Nos encantaría saber de ti. Deja tu mensaje y pronto te responderemos. ¡Dios le bendiga!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Email card */}
              <div className="bg-white p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gold/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <p className="font-body text-xs tracking-widest uppercase text-gray-400">
                    Correo
                  </p>
                </div>
                <a
                  href="mailto:iglesiamegazoe@gmail.com"
                  className="text-gray-700 hover:text-gold transition-colors text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  iglesiamegazoe@gmail.com
                </a>
              </div>

              {/* Social card */}
              <div className="bg-white p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gold/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                      <circle cx="4" cy="4" r="4" />
                    </svg>
                  </div>
                  <p className="font-body text-xs tracking-widest uppercase text-gray-400">
                    Redes Sociales
                  </p>
                </div>
                <SocialIcons />
              </div>

              {/* Quote */}
              <div className="border-l-2 border-gold pl-5 py-2">
                <p className="font-display text-gray-500 text-sm italic leading-relaxed">
                  &ldquo;En privado vamos a Dios, pero en la iglesia lo servimos.&rdquo;
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white p-8 md:p-10 border border-gray-100">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
