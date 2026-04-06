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
          <Link href="/estudios-biblicos" className="font-body text-sm text-gray-400 hover:text-gold transition-colors mb-4 inline-block">
            &larr; Estudios Bíblicos
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-light uppercase tracking-wider text-gray-800 mb-2">
            Predicaciones
          </h1>
          <p className="font-body text-gray-400 text-xs tracking-widest uppercase">Sermones</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-base leading-relaxed mb-12 max-w-2xl mx-auto">
            Mensajes que edifican, fortalecen y transforman. Cada predicación es una semilla de la Palabra de Dios sembrada en tu corazón.
          </p>

          <a
            href="https://www.youtube.com/channel/UCbVEs6ElWvnx1klyRCdfsSA"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body inline-flex items-center gap-2 text-sm bg-[#FF0000] text-white px-8 py-3 hover:bg-[#cc0000] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
            </svg>
            Ver en YouTube
          </a>
        </div>
      </section>
    </div>
  );
}
