import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Música | Iglesia Mega Zoé',
  description: 'Adoración y alabanza de Iglesia Mega Zoé. Escucha nuestra música.',
};

export default function MusicaPage() {
  // YouTube channel ID for Iglesia Mega Zoé
  const youtubeChannelId = 'UCbVEs6ElWvnx1klyRCdfsSA';

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
            Adoración
          </p>
          <h1 className="text-5xl md:text-6xl font-normal italic text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Música
          </h1>
          <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-6 mb-6" />
          <p className="text-white/60 text-sm max-w-lg mx-auto" style={{ fontFamily: "'Lato', sans-serif" }}>
            Adoración y alabanza que edifica el espíritu y glorifica a Dios.
          </p>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Lato', sans-serif" }}>
              Canal Oficial
            </p>
            <h2 className="text-3xl font-normal italic text-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Mega Zoé en YouTube
            </h2>
            <div className="w-10 h-px bg-[#c9a96e] mx-auto mb-6" />
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Síguenos en YouTube para escuchar nuestra música de adoración, predicaciones y contenido especial.
            </p>
          </div>

          {/* YouTube embed — featured video / channel */}
          <div className="relative w-full aspect-video bg-black rounded-none overflow-hidden shadow-2xl mb-8">
            <iframe
              src={`https://www.youtube.com/embed?listType=user_uploads&list=${youtubeChannelId}`}
              title="Iglesia Mega Zoé — Música y Adoración"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Subscribe CTA */}
          <div className="text-center">
            <a
              href={`https://www.youtube.com/channel/${youtubeChannelId}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#FF0000] text-white px-8 py-4 text-xs tracking-widest uppercase hover:bg-[#cc0000] transition-colors duration-200"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
              Suscríbete a nuestro canal
            </a>
          </div>
        </div>
      </section>

      {/* Social Music Links */}
      <section className="py-20 px-6 bg-[#f8f5f0]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-normal italic text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
              Síguenos en todas las plataformas
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: 'YouTube',
                href: `https://www.youtube.com/channel/${youtubeChannelId}`,
                color: '#FF0000',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                  </svg>
                ),
              },
              {
                name: 'Facebook',
                href: 'http://www.facebook.com/iglesiamegazoe',
                color: '#1877F2',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                ),
              },
              {
                name: 'Instagram',
                href: 'https://instagram.com/iglesiamegazoe',
                color: '#E4405F',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                ),
              },
            ].map(({ name, href, color, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div style={{ color }} className="group-hover:scale-110 transition-transform duration-200">
                  {icon}
                </div>
                <span className="text-xs tracking-widest uppercase text-gray-600 group-hover:text-black transition-colors" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
