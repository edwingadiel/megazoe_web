import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Predicaciones | Iglesia Mega Zoé',
  description: 'Escucha y estudia los mensajes poderosos de la Palabra de Dios de Iglesia Mega Zoé.',
};

export default function PredicacionesPage() {
  return (
    <div className="pt-[80px]">
      {/* Header */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Link href="/estudios-biblicos" className="font-body text-sm text-gray-400 hover:text-gold transition-colors mb-6 inline-flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-current"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Estudios Bíblicos
          </Link>
          <div className="w-12 h-px bg-gold mb-6" />
          <h1 className="font-heading text-4xl md:text-5xl font-light text-gray-800 mb-2">
            Predicaciones
          </h1>
          <p className="font-body text-gray-400 text-xs tracking-widest uppercase">Sermones</p>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          <p className="font-display text-lg md:text-xl text-gray-700 italic leading-relaxed mb-4">
            &ldquo;Cada predicación es una semilla de la Palabra de Dios sembrada en tu corazón.&rdquo;
          </p>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-gold">
            Iglesia Mega Zoé
          </p>
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-100 p-10 md:p-14 text-center shadow-sm">
            <div className="w-14 h-14 mx-auto mb-8 border border-gold/30 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-gray-800 mb-4">
              Mensajes que Transforman
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
              Mensajes poderosos que edifican, fortalecen y transforman. Visita nuestro canal de YouTube para escuchar y estudiar cada predicación.
            </p>
            <a
              href="https://www.youtube.com/channel/UCbVEs6ElWvnx1klyRCdfsSA"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body inline-flex items-center gap-3 text-sm bg-[#FF0000] text-white px-8 py-3 hover:bg-[#cc0000] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
              Ver en YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
