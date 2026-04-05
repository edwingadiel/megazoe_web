import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEstudioBySlug, getAllSlugs } from '@/lib/estudios';

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

  const testamentoColor =
    (clasificacion_biblica?.testamento_principal ?? '') === 'Nuevo Testamento' ? '#4a7c59' : '#7c4a1e';

  const paragraphs = contenido.contenido_renderizado?.length
    ? contenido.contenido_renderizado
    : contenido.contenido_completo
        .split('\n\n')
        .filter(Boolean)
        .map((t) => ({ tipo: 'parrafo', texto: t, referencias_inline: [] }));

  return (
    <div className="pt-[72px]">
      {/* Header */}
      <section className="bg-black text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-xs tracking-widest uppercase text-white/40" style={{ fontFamily: "'Lato', sans-serif" }}>
            <Link href="/biblioteca" className="hover:text-[#c9a96e] transition-colors">
              Biblioteca
            </Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-xs">{encabezado.titulo}</span>
          </div>

          {/* Number + tipo */}
          <div className="flex items-center gap-3 mb-4">
            {ui.mostrar_numero_estudio && (
              <span className="text-xs tracking-widest text-[#c9a96e]" style={{ fontFamily: "'Lato', sans-serif" }}>
                Estudio #{numero_estudio.toString().padStart(4, '0')}
              </span>
            )}
            {tipo_estudio && (
              <span className="text-xs tracking-widest uppercase text-white/30 border border-white/10 px-2 py-0.5" style={{ fontFamily: "'Lato', sans-serif" }}>
                {tipo_estudio}
              </span>
            )}
          </div>

          {/* Main title */}
          <h1
            className="text-4xl md:text-5xl font-normal italic text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {encabezado.titulo}
          </h1>

          {/* Bible reference */}
          <p
            className="text-[#c9a96e] text-sm tracking-widest mb-6"
            style={{
              fontFamily: "'Lato', sans-serif",
              color: testamentoColor === '#4a7c59' ? '#7ec899' : '#e8a96e',
            }}
          >
            {clasificacion_biblica.referencia_principal_normalizada}
          </p>

          {/* Summary */}
          {encabezado.resumen_corto && (
            <p
              className="text-white/60 text-base leading-relaxed max-w-2xl italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;{encabezado.resumen_corto}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* Meta bar */}
      <div className="bg-[#f8f5f0] border-b border-[#c9a96e]/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap items-center gap-4">
          {/* Testament badge */}
          <span
            className="text-xs px-3 py-1 border"
            style={{
              color: testamentoColor,
              borderColor: testamentoColor + '50',
              backgroundColor: testamentoColor + '15',
              fontFamily: "'Lato', sans-serif",
            }}
          >
            {clasificacion_biblica.testamento_principal}
          </span>

          {/* Book */}
          <Link
            href={`/biblioteca?libro=${encodeURIComponent(clasificacion_biblica.libro_principal)}`}
            className="text-xs tracking-widest uppercase text-gray-500 hover:text-[#c9a96e] transition-colors"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {clasificacion_biblica.libro_principal}
          </Link>

          {fechas.ano && (
            <span className="text-xs text-gray-400" style={{ fontFamily: "'Lato', sans-serif" }}>
              {fechas.ano}
            </span>
          )}

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/biblioteca"
              className="text-xs tracking-widest uppercase text-gray-400 hover:text-black transition-colors flex items-center gap-1"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              ← Biblioteca
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
          {/* Article text */}
          <article>
            <div className="prose-custom space-y-6">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-gray-700 leading-[1.9] text-base"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {p.texto}
                </p>
              ))}
            </div>

            {/* Credit */}
            {ui.mostrar_credito_en_header && (
              <div className="mt-12 pt-8 border-t border-[#c9a96e]/20">
                <p className="text-xs text-gray-400 italic" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {ministerio.credito_corto}
                </p>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Topics */}
            {ui.mostrar_topicos && clasificacion_tematica.topicos.length > 0 && (
              <div>
                <h3
                  className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Tópicos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {clasificacion_tematica.topicos.map((topico) => (
                    <Link
                      key={topico}
                      href={`/biblioteca?topico=${encodeURIComponent(topico)}`}
                      className="text-xs px-3 py-1.5 bg-[#f8f5f0] text-gray-600 hover:bg-[#c9a96e]/20 hover:text-[#8a6a3a] transition-colors"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {topico}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Bible references */}
            {referencias_biblicas.length > 0 && (
              <div>
                <h3
                  className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Referencias Bíblicas
                </h3>
                <ul className="space-y-2">
                  {referencias_biblicas.map((ref, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span
                        className="text-[#c9a96e] text-xs mt-0.5 flex-shrink-0"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        {ref.tipo === 'principal' ? '●' : '○'}
                      </span>
                      <span
                        className={`text-sm ${ref.tipo === 'principal' ? 'text-black font-medium' : 'text-gray-500'}`}
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        {ref.referencia_normalizada}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Study info */}
            <div className="bg-[#f8f5f0] p-5 border border-[#c9a96e]/10">
              <h3
                className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Información
              </h3>
              <dl className="space-y-2 text-xs" style={{ fontFamily: "'Lato', sans-serif" }}>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Número</dt>
                  <dd className="text-gray-700 font-medium">#{numero_estudio}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Libro</dt>
                  <dd className="text-gray-700">{clasificacion_biblica.libro_principal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Testamento</dt>
                  <dd className="text-gray-700">
                    {clasificacion_biblica.testamento_principal === 'Nuevo Testamento' ? 'NT' : 'AT'}
                  </dd>
                </div>
                {tipo_estudio && (
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Tipo</dt>
                    <dd className="text-gray-700">{tipo_estudio}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Share */}
            {ui.permitir_compartir && (
              <div>
                <h3
                  className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Compartir
                </h3>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`📖 ${encabezado.titulo} — ${clasificacion_biblica.referencia_principal_normalizada}\n\nhttps://iglesiamegazoe.com/biblioteca/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-xs py-2 bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://iglesiamegazoe.com/biblioteca/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-xs py-2 bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    Facebook
                  </a>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Back to library */}
      <div className="border-t border-gray-100 bg-[#f8f5f0] py-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            ¿Encontraste este estudio útil?
          </p>
          <Link
            href="/biblioteca"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase bg-black text-white px-6 py-3 hover:bg-[#c9a96e] transition-colors"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            ← Ver todos los estudios
          </Link>
        </div>
      </div>
    </div>
  );
}
