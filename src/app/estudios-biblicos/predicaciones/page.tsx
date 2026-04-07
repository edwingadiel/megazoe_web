import type { Metadata } from 'next';
import Link from 'next/link';
import PredicacionesPlayer from '@/components/PredicacionesPlayer';

export const metadata: Metadata = {
  title: 'Predicaciones | Iglesia Mega Zoé',
  description: 'Más de 370 predicaciones de la Pastora Edith Cruz. Escucha y estudia los mensajes de la Palabra de Dios.',
};

export default function PredicacionesPage() {
  return (
    <div className="pt-[80px] pb-24">
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
          <p className="font-body text-gray-400 text-xs tracking-widest uppercase mb-4">Sermones</p>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
            Más de 370 predicaciones de la Pastora Edith Cruz. Escucha directamente desde esta página o visita nuestro canal de YouTube.
          </p>
        </div>
      </section>

      {/* Player */}
      <section className="py-12 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <PredicacionesPlayer />
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          <h2 className="font-heading text-3xl font-light text-gray-800 mb-4">
            También en YouTube
          </h2>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed">
            Visita nuestro canal para ver predicaciones en video.
          </p>
          <a
            href="https://www.youtube.com/channel/UCbVEs6ElWvnx1klyRCdfsSA"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body inline-flex items-center gap-3 text-sm bg-[#FF0000] text-white px-8 py-3 hover:bg-[#cc0000] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF0000]"
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
