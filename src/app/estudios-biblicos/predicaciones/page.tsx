import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Predicaciones | Iglesia Mega Zoé',
  description: 'Escucha y estudia los mensajes poderosos de la Palabra de Dios de Iglesia Mega Zoé.',
};

export default function PredicacionesPage() {
  return (
    <div className="pt-[72px]">
      {/* Header */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <p className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
          Estudios Bíblicos
        </p>
        <h1 className="text-5xl font-normal italic text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          Predicaciones
        </h1>
        <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-6" />
      </section>

      {/* Intro */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 text-lg leading-relaxed">
            Mensajes que edifican, fortalecen y transforman. Cada predicación es una semilla de la Palabra de Dios sembrada en tu corazón.
          </p>
        </div>
      </section>

      {/* Placeholder grid */}
      <section className="pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-gray-100 hover:border-[#c9a96e]/40 transition-all duration-300 hover:shadow-md group">
                {/* Video thumbnail placeholder */}
                <div className="bg-gray-100 aspect-video flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-[#c9a96e] flex items-center justify-center mx-auto mb-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xs" style={{ fontFamily: "'Lato', sans-serif" }}>
                      Predicación {i}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[#c9a96e] text-xs tracking-widest mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                    Próximamente
                  </p>
                  <h3 className="text-base font-normal italic text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Título de la Predicación
                  </h3>
                  <p className="text-gray-400 text-xs mt-2">Iglesia Mega Zoé</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm mb-4">
              Para ver todas las predicaciones, visita nuestro canal de YouTube
            </p>
            <a
              href="https://www.youtube.com/channel/UCbVEs6ElWvnx1klyRCdfsSA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase bg-black text-white px-8 py-3 hover:bg-[#c9a96e] transition-colors duration-200"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
              Ver en YouTube
            </a>
          </div>
        </div>
      </section>

      <div className="pb-12 text-center">
        <Link
          href="/estudios-biblicos"
          className="text-xs tracking-widest uppercase text-[#c9a96e] hover:text-black transition-colors"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          ← Volver a Estudios Bíblicos
        </Link>
      </div>
    </div>
  );
}
