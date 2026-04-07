import { redirect } from 'next/navigation';
import { getAllEstudiosCards } from '@/lib/estudios';

interface Props {
  params: Promise<{ numero: string }>;
}

export default async function EstudioRedirect({ params }: Props) {
  const { numero } = await params;
  const num = parseInt(numero, 10);

  if (isNaN(num)) redirect('/biblioteca');

  const cards = getAllEstudiosCards();
  const match = cards.find((c) => c.numero_estudio === num);

  if (!match) redirect('/biblioteca');

  redirect(`/biblioteca/${match.slug}`);
}
