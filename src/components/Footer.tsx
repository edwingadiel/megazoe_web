import Link from 'next/link';
import Image from 'next/image';
import SocialIcons from '@/components/SocialIcons';

const footerLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/estudios-biblicos', label: 'Estudios Bíblicos' },
  { href: '/biblioteca', label: 'Biblioteca' },
  { href: '/musica', label: 'Música' },
  { href: '/contactanos', label: 'Contáctanos' },
];

export default function Footer() {
  return (
    <footer className="bg-church-black">
      {/* Gold accent line */}
      <div className="h-px bg-gold/30" />

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-megazoe.png"
              alt="Mega Zoé"
              width={225}
              height={82}
              className="h-12 w-auto select-none brightness-0 invert"
              unoptimized
            />
            <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-xs">
              Es el lugar de reunión para hacer el servicio público a Dios. En privado vamos a Dios, pero en la iglesia lo servimos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-body text-xs tracking-widest uppercase text-gold/60 mb-4">
              Navegación
            </h3>
            <ul className="space-y-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-gold text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-body text-xs tracking-widest uppercase text-gold/60 mb-4">
              Contacto
            </h3>
            <a
              href="mailto:iglesiamegazoe@gmail.com"
              className="text-gray-400 hover:text-gold text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              iglesiamegazoe@gmail.com
            </a>

            <h3 className="font-body text-xs tracking-widest uppercase text-gold/60 mt-6 mb-4">
              Redes Sociales
            </h3>
            <SocialIcons dark />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Iglesia Mega Zoé. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
