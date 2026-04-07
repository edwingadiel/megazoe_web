import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEstudioBySlug, getAllSlugs, getRelatedEstudios } from '@/lib/estudios';
import BibleVerse from '@/components/BibleVerse';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const estudio = getEstudioBySlug(slug);
  if (!estudio) return { title: 'Estudio | Iglesia Mega Zoé' };
  return {
    title: `${estudio.encabezado.titulo} | Iglesia Mega Zoé`,
    description: estudio.encabezado.resumen_corto,
  };
}

export default async function EstudioPage({ params }: Props) {
  const { slug } = await params;
  const estudio = getEstudioBySlug(slug);
  if (!estudio) notFound();

  const {
    encabezado,
    numero_estudio,
    tipo_estudio,
    clasificacion_biblica,
    clasificacion_tematica,
    referencias_biblicas,
    contenido,
    ministerio,
    fechas,
    ui,
  } = estudio;

  const isNT = (clasificacion_biblica?.testamento_principal ?? '') === 'Nuevo Testamento';

  // Estimate reading time (average 200 words/min for Spanish)
  const wordCount = contenido.contenido_completo.split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  // Get related studies (same book or topics)
  const related = getRelatedEstudios(estudio);

  const paragraphs = contenido.contenido_renderizado?.length
    ? contenido.contenido_renderizado
    : contenido.contenido_completo
        .split('\n\n')
        .filter(Boolean)
        .map((t) => ({ tipo: 'parrafo', texto: t, referencias_inline: [] }));

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: encabezado.titulo,
    description: encabezado.resumen_corto,
    author: {
      '@type': 'Person',
      name: ministerio.pastora,
    },
    publisher: {
      '@type': 'Organization',
      name: ministerio.iglesia,
      url: 'https://iglesiamegazoe.com',
    },
    ...(fechas.ano ? { datePublished: `${fechas.ano}` } : {}),
    url: `https://iglesiamegazoe.com/biblioteca/${slug}`,
    wordCount: wordCount,
    timeRequired: `PT${readingTime}M`,
  };

  return (
    <div className="pt-[80px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <section className="py-12 px-6 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="font-body flex items-center gap-2 mb-6 text-sm" aria-label="Breadcrumb">
            <Link href="/biblioteca" className="text-gray-400 hover:text-gold transition-colors">
              Biblioteca
            </Link>
            <span className="text-gray-300" aria-hidden="true">/</span>
            <span className="text-gray-600 truncate max-w-sm" aria-current="page">{encabezado.titulo}</span>
          </nav>

          {/* Number + tipo */}
          <div className="flex items-center gap-3 mb-3">
            {ui.mostrar_numero_estudio && (
              <span className="font-body text-xs tracking-widest text-gold">
                Estudio #{numero_estudio.toString().padStart(4, '0')}
              </span>
            )}
            {tipo_estudio && (
              <span className="font-body text-xs tracking-widest uppercase text-gray-400 border border-gray-200 px-2 py-0.5">
                {tipo_estudio}
              </span>
            )}
          </div>

          {/* Main title */}
          <h1 className="font-heading text-3xl md:text-4xl font-light text-gray-800 leading-snug mb-3">
            {encabezado.titulo}
          </h1>

          {/* Bible reference */}
          <p className={`font-body text-sm tracking-wide ${isNT ? 'text-nt' : 'text-at'}`}>
            <BibleVerse
              libro={clasificacion_biblica.libro_principal}
              capitulo={clasificacion_biblica.capitulo_principal}
              versiculos={clasificacion_biblica.versiculos_principales || []}
              referenciaNormalizada={clasificacion_biblica.referencia_principal_normalizada}
            />
          </p>

          {/* Summary */}
          {encabezado.resumen_corto && (
            <p className="font-display text-gray-500 text-base leading-relaxed max-w-2xl italic mt-4">
              &ldquo;{encabezado.resumen_corto}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* Meta bar */}
      <div className="bg-cream border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-6 py-3 flex flex-wrap items-center gap-4">
          <span
            className={`font-body text-xs px-3 py-1 border ${
              isNT
                ? 'text-nt border-nt/40 bg-nt/10'
                : 'text-at border-at/40 bg-at/10'
            }`}
          >
            {clasificacion_biblica.testamento_principal}
          </span>

          <Link
            href={`/biblioteca?libro=${encodeURIComponent(clasificacion_biblica.libro_principal)}`}
            className="font-body text-xs tracking-widest uppercase text-gray-500 hover:text-gold transition-colors"
          >
            {clasificacion_biblica.libro_principal}
          </Link>

          {(fechas.fecha_texto_original || fechas.ano) && (
            <span className="font-body text-xs text-gray-400">
              {fechas.fecha_texto_original || fechas.ano}
            </span>
          )}

          <span className="font-body text-xs text-gray-400 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {readingTime} min lectura
          </span>

          <div className="ml-auto">
            <Link
              href="/biblioteca"
              className="font-body text-sm text-gray-400 hover:text-gold transition-colors"
            >
              &larr; Biblioteca
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article text */}
          <article className="flex-1 min-w-0">
            <div>
              {paragraphs.map((p, i) => {
                const text = p.texto.trim();
                if (!text) return null;

                // Detect section headings: Roman numerals, lettered outlines, ALL CAPS short lines
                const isMainHeading = /^[IVXLC]+\.\s/.test(text);
                const isSubHeading = /^[a-zA-Z]\.\s/.test(text) && text.length < 80;
                const isShout = text === text.toUpperCase() && text.length > 10 && text.length < 120;
                const isNote = text.startsWith('*') || (text.startsWith('(') && text.endsWith(')'));

                if (isMainHeading) {
                  return (
                    <h3 key={i} className="font-heading text-xl font-light text-gray-800 mt-10 mb-4 first:mt-0">
                      {text}
                    </h3>
                  );
                }
                if (isSubHeading) {
                  return (
                    <h4 key={i} className="font-heading text-base font-normal text-gray-700 mt-6 mb-3">
                      {text}
                    </h4>
                  );
                }
                if (isShout) {
                  return (
                    <p key={i} className="font-body text-gold-dark text-sm font-medium leading-relaxed my-5 pl-4 border-l-2 border-gold/40">
                      {text}
                    </p>
                  );
                }
                if (isNote) {
                  return (
                    <p key={i} className="font-body text-gray-400 text-xs italic leading-relaxed mt-6 mb-4">
                      {text}
                    </p>
                  );
                }

                // Split long paragraphs on single newlines for better readability
                const lines = text.split('\n').filter(Boolean);
                if (lines.length > 1) {
                  return (
                    <div key={i} className="mb-6">
                      {lines.map((line, j) => (
                        <p key={j} className="font-body text-gray-600 leading-[1.85] text-[15px] mb-3 last:mb-0">
                          {line}
                        </p>
                      ))}
                    </div>
                  );
                }

                return (
                  <p key={i} className="font-body text-gray-600 leading-[1.85] text-[15px] mb-6">
                    {text}
                  </p>
                );
              })}
            </div>

            {ui.mostrar_credito_en_header && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <p className="font-body text-xs text-gray-400 italic">
                  {ministerio.credito_corto}
                </p>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-60 shrink-0 space-y-8">
            {ui.mostrar_topicos && clasificacion_tematica.topicos.length > 0 && (
              <div>
                <h2 className="font-body text-xs tracking-widest uppercase text-gray-400 mb-3">
                  Tópicos
                </h2>
                <div className="flex flex-wrap gap-2">
                  {clasificacion_tematica.topicos.map((topico) => (
                    <Link
                      key={topico}
                      href={`/biblioteca?topico=${encodeURIComponent(topico)}`}
                      className="font-body text-xs px-3 py-1 bg-cream text-gray-500 hover:bg-gold/10 hover:text-gold-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                    >
                      {topico}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {referencias_biblicas.length > 0 && (
              <div>
                <h2 className="font-body text-xs tracking-widest uppercase text-gray-400 mb-3">
                  Referencias
                </h2>
                <ul className="space-y-1.5">
                  {referencias_biblicas.map((ref, i) => (
                    <li key={i} className="font-body text-sm text-gray-500">
                      {ref.clickeable && ref.capitulo ? (
                        <BibleVerse
                          libro={ref.libro}
                          capitulo={ref.capitulo}
                          versiculos={ref.versiculos}
                          referenciaNormalizada={ref.referencia_normalizada}
                        />
                      ) : (
                        ref.referencia_normalizada
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-cream p-5">
              <h2 className="font-body text-xs tracking-widest uppercase text-gray-400 mb-3">
                Info
              </h2>
              <dl className="font-body space-y-2 text-xs">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Número</dt>
                  <dd className="text-gray-600">#{numero_estudio}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Libro</dt>
                  <dd className="text-gray-600">{clasificacion_biblica.libro_principal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Testamento</dt>
                  <dd className="text-gray-600">{isNT ? 'NT' : 'AT'}</dd>
                </div>
              </dl>
            </div>

            {ui.permitir_compartir && (
              <div>
                <h2 className="font-body text-xs tracking-widest uppercase text-gray-400 mb-3">
                  Compartir
                </h2>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${encabezado.titulo} — ${clasificacion_biblica.referencia_principal_normalizada}\nhttps://iglesiamegazoe.com/biblioteca/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body flex-1 text-center text-xs py-2 bg-[#25D366] text-white hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://iglesiamegazoe.com/biblioteca/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body flex-1 text-center text-xs py-2 bg-[#1877F2] text-white hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] focus-visible:ring-offset-2"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
      {/* Related Studies */}
      {related.length > 0 && (
        <section className="bg-cream border-t border-gray-200/50">
          <div className="max-w-4xl mx-auto px-6 py-14">
            <div className="text-center mb-10">
              <div className="w-12 h-px bg-gold mx-auto mb-6" />
              <h2 className="font-heading text-2xl font-light text-gray-800">
                Estudios Relacionados
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => {
                const relIsNT = rel.testamento_principal === 'Nuevo Testamento';
                return (
                  <Link
                    key={rel.slug}
                    href={`/biblioteca/${rel.slug}`}
                    className="group bg-white border border-gray-200 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <div className={`h-0.5 w-full transition-all duration-300 group-hover:h-1 ${relIsNT ? 'bg-nt' : 'bg-at'}`} />
                    <div className="p-5 flex flex-col flex-1">
                      <span className="font-body text-xs tracking-widest uppercase text-gray-400 mb-2">
                        {rel.cita_principal || rel.libro_principal}
                      </span>
                      <h3 className="font-heading text-base font-light text-gray-800 leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                        {rel.titulo}
                      </h3>
                      {rel.resumen_corto && (
                        <p className="font-body text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
                          {rel.resumen_corto}
                        </p>
                      )}
                      <span className="font-body text-xs text-gold flex items-center gap-1.5 mt-auto">
                        Leer <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block" aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
