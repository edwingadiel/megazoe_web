'use client';

import { useState } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setState('success');
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  };

  const inputClass =
    'w-full font-body border-0 border-b border-gray-200 bg-transparent px-0 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gold transition-colors duration-200';

  return (
    <div>
      <h2 className="font-heading text-2xl font-light text-gray-800 mb-2">
        Envíanos un mensaje
      </h2>
      <p className="text-gray-400 text-xs mb-8">Todos los campos son requeridos</p>

      {state === 'success' ? (
        <div className="py-12 text-center">
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-light text-gray-800 mb-2">
            ¡Mensaje enviado!
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Pronto le responderemos. ¡Dios le bendiga!
          </p>
          <button
            onClick={() => setState('idle')}
            className="font-body text-sm text-gold hover:text-gold-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="font-body block text-xs tracking-widest uppercase text-gray-400 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="font-body block text-xs tracking-widest uppercase text-gray-400 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="font-body block text-xs tracking-widest uppercase text-gray-400 mb-1">
              Asunto
            </label>
            <input
              type="text"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="font-body block text-xs tracking-widest uppercase text-gray-400 mb-1">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          {state === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              Hubo un error al enviar el mensaje. Por favor intente nuevamente.
            </div>
          )}

          <button
            type="submit"
            disabled={state === 'loading'}
            className="font-body w-full bg-gold text-white py-3.5 text-sm tracking-wide uppercase hover:bg-gold-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            {state === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enviando...
              </span>
            ) : (
              'Enviar mensaje'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
