'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-[80px]">
      <section className="py-32 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="font-body text-xs text-gold tracking-[0.3em] uppercase mb-4">Error</p>
          <h1 className="font-heading text-4xl md:text-6xl font-light text-gray-800 mb-5">
            Algo salió mal
          </h1>
          <p className="text-gray-500 text-base leading-relaxed max-w-lg mx-auto mb-10">
            Ocurrió un error inesperado. Por favor intenta de nuevo.
          </p>
          <button
            onClick={reset}
            className="font-body inline-flex items-center gap-2 text-sm border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Intentar de nuevo
          </button>
        </div>
      </section>
    </div>
  );
}
