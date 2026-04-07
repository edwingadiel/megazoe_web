import { NextRequest, NextResponse } from 'next/server';
import { BOOK_NUMBER } from '@/lib/bible-books';

export async function GET(req: NextRequest) {
  const libro = req.nextUrl.searchParams.get('libro');
  const capitulo = req.nextUrl.searchParams.get('capitulo');
  const versiculos = req.nextUrl.searchParams.get('versiculos'); // e.g. "1-4" or "3"

  if (!libro || !capitulo || libro.length > 50 || capitulo.length > 10) {
    return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 });
  }

  const bookNum = BOOK_NUMBER[libro];
  if (!bookNum) {
    return NextResponse.json({ error: 'Libro no encontrado' }, { status: 400 });
  }

  try {
    // bolls.life API: /get-text/{translation}/{book}/{chapter}/
    const res = await fetch(
      `https://bolls.life/get-text/RV1960/${bookNum}/${capitulo}/`,
      { next: { revalidate: 86400 } } // cache for 24h
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Verse not found' }, { status: 404 });
    }

    const allVerses: { verse: number; text: string }[] = await res.json();

    // Filter to requested verses if specified
    let filtered = allVerses;
    if (versiculos) {
      const parts = versiculos.split('-');
      const min = parseInt(parts[0], 10);
      const max = parts.length > 1 ? parseInt(parts[1], 10) : min;
      filtered = allVerses.filter((v) => v.verse >= min && v.verse <= max);
    }

    if (filtered.length === 0) {
      return NextResponse.json({ error: 'Verse not found' }, { status: 404 });
    }

    const textoCompleto = filtered.map((v) => v.text.trim()).join(' ');

    return NextResponse.json({
      referencia: `${libro} ${capitulo}${versiculos ? ':' + versiculos : ''}`,
      texto: textoCompleto,
      versiculos: filtered.map((v) => ({
        numero: v.verse,
        texto: v.text.trim(),
      })),
      traduccion: 'RV1960',
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch verse' }, { status: 502 });
  }
}
