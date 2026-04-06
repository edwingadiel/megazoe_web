import type { Metadata } from 'next';
import MusicPlayer from '@/components/MusicPlayer';

export const metadata: Metadata = {
  title: 'Música | Iglesia Mega Zoé',
  description: 'Adoración y alabanza de Iglesia Mega Zoé. Escucha nuestra música.',
};

export default function MusicaPage() {
  return (
    <div className="pt-[80px] pb-24">
      {/* Header — consistent centered pattern */}
      <section className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="font-body text-xs text-gold tracking-[0.3em] uppercase mb-4">Adoración y Alabanza</p>
          <h1 className="font-heading text-4xl md:text-6xl font-light text-gray-800 mb-5">
            Música
          </h1>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
            Adoración y alabanza que edifica el espíritu y glorifica a Dios. Escucha las canciones de Iglesia Mega Zoé.
          </p>
        </div>
      </section>

      {/* Music Player */}
      <section className="py-12 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <MusicPlayer />
        </div>
      </section>

    </div>
  );
}
