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
    'w-full border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#c9a96e] transition-colors duration-200';

  return (
    <div>
      <p className="text-[#c9a96e] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
        Formulario de Contacto
      </p>
      <h2 className="text-3xl font-normal italic text-black mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
        Envíanos un mensaje
      </h2>
      <div className="w-10 h-px bg-[#c9a96e] mb-8" />

      {state === 'success' ? (
        <div className="bg-[#f8f5f0] border border-[#c9a96e]/30 p-10 text-center">
          <div className="text-[#c9a96e] text-4xl mb-4">✓</div>
          <h3 className="text-xl font-normal italic text-black mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            ¡Mensaje enviado!
          </h3>
          <p className="text-gray-500 text-sm">
            Su mensaje ha sido enviado. Pronto le responderemos. ¡Dios le bendiga!
          </p>
          <button
            onClick={() => setState('idle')}
            className="mt-6 text-xs tracking-widest uppercase text-[#c9a96e] border-b border-[#c9a96e] pb-px hover:text-black hover:border-black transition-colors"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Su nombre completo"
              required
              className={inputClass}
              style={{ fontFamily: "'Lato', sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="su@correo.com"
              required
              className={inputClass}
              style={{ fontFamily: "'Lato', sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
              Asunto
            </label>
            <input
              type="text"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              placeholder="Asunto de su mensaje"
              required
              className={inputClass}
              style={{ fontFamily: "'Lato', sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
              Mensaje
            </label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Escriba su mensaje aquí..."
              required
              rows={5}
              className={`${inputClass} resize-none`}
              style={{ fontFamily: "'Lato', sans-serif" }}
            />
          </div>

          {state === 'error' && (
            <p className="text-red-500 text-xs" style={{ fontFamily: "'Lato', sans-serif" }}>
              Hubo un error al enviar el mensaje. Por favor intente nuevamente.
            </p>
          )}

          <button
            type="submit"
            disabled={state === 'loading'}
            className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-[#c9a96e] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {state === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      )}
    </div>
  );
}
