import type { Metadata } from 'next';
import MusicPlayer from '@/components/MusicPlayer';
import SocialIcons from '@/components/SocialIcons';

export const metadata: Metadata = {
  title: 'Música | Iglesia Mega Zoé',
  description: 'Adoración y alabanza de Iglesia Mega Zoé. Escucha nuestra música.',
};

export default function MusicaPage() {
  return (
    <div className="pt-[80px] pb-24">
      {/* Header */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-light uppercase tracking-wider text-gray-800 mb-4">
            Música
          </h1>
          <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
            Adoración y alabanza que edifica el espíritu y glorifica a Dios. Escucha las canciones de Iglesia Mega Zoé.
          </p>
        </div>
      </section>

      {/* Music Player */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <MusicPlayer />
        </div>
      </section>

      {/* Social */}
      <section className="py-16 px-6 bg-cream border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-light text-gray-800 mb-10">
            Síguenos en todas las plataformas
          </h2>
          <SocialIcons className="justify-center" />
        </div>
      </section>
    </div>
  );
}
