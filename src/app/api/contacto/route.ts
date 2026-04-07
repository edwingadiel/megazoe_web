import { NextRequest, NextResponse } from 'next/server';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre: rawNombre, email: rawEmail, asunto: rawAsunto, mensaje: rawMensaje } = body;

    if (!rawNombre || !rawEmail || !rawAsunto || !rawMensaje) {
      return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    const nombre = escapeHtml(String(rawNombre).slice(0, 200));
    const email = escapeHtml(String(rawEmail).slice(0, 200));
    const asunto = escapeHtml(String(rawAsunto).slice(0, 500));
    const mensaje = escapeHtml(String(rawMensaje).slice(0, 5000));

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawEmail)) {
      return NextResponse.json({ error: 'Correo electrónico inválido.' }, { status: 400 });
    }

    // If RESEND_API_KEY is configured, send via Resend
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Iglesia Mega Zoé <noreply@iglesiamegazoe.com>',
          to: ['iglesiamegazoe@gmail.com'],
          reply_to: email,
          subject: `[Contacto] ${asunto}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #0a0a0a; border-bottom: 2px solid #c9a96e; padding-bottom: 10px;">
                Nuevo mensaje de contacto
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #c9a96e; width: 120px;">Nombre:</td>
                  <td style="padding: 8px 0; color: #3a3a3a;">${nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #c9a96e;">Email:</td>
                  <td style="padding: 8px 0; color: #3a3a3a;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #c9a96e;">Asunto:</td>
                  <td style="padding: 8px 0; color: #3a3a3a;">${asunto}</td>
                </tr>
              </table>
              <div style="background: #f8f5f0; padding: 16px; border-left: 3px solid #c9a96e; margin-top: 10px;">
                <p style="color: #8a8a8a; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.1em;">Mensaje:</p>
                <p style="color: #3a3a3a; margin: 0; white-space: pre-wrap;">${mensaje}</p>
              </div>
              <p style="color: #8a8a8a; font-size: 12px; margin-top: 20px; text-align: center;">
                — Iglesia Mega Zoé · iglesiamegazoe.com
              </p>
            </div>
          `,
        }),
      });

      if (!resendRes.ok) {
        console.error('Resend error:', await resendRes.text());
        return NextResponse.json({ error: 'Error al enviar el correo.' }, { status: 500 });
      }
    } else {
      // Dev mode: just log the message
      console.log('📧 Contact form submission:', { nombre, email, asunto, mensaje });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
