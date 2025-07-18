import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  // Ignora mensajes de sí mismo o que no sean texto
  if (!m.text || m.isBaileys) return;

  // Detecta frases clave para responder
  const lower = m.text.toLowerCase();
  const triggers = [
    'hola', 'hey', 'buenas', 'quién eres', 'cómo estás', 'akeno', 'bot', 'himejima', 'estás ahí',
    'dime algo', 'háblame', 'cuéntame algo', 'estás viva', 'me escuchas', 'aki'
  ];

  if (!triggers.some(palabra => lower.includes(palabra))) return;

  try {
    // Obtiene el contenido desde GitHub
    const url = 'https://raw.githubusercontent.com/TOKIO5025/text2/refs/heads/main/text-chatgpt';
    const res = await fetch(url);
    if (!res.ok) throw await res.text();

    const text = await res.text();

    // Divide las líneas y filtra las vacías
    const frases = text.split('\n').map(v => v.trim()).filter(v => v);

    // Selecciona una frase al azar
    const respuesta = frases[Math.floor(Math.random() * frases.length)];

    // Responde
    await conn.reply(m.chat, respuesta, m);
  } catch (e) {
    console.log('[ERROR chat-akeno]', e);
    await conn.reply(m.chat, 'Lo siento… no puedo pensar en algo ahora mismo 🥺', m);
  }
};

handler.customPrefix = /^(hola|hey|akeno|bot|himejima|estás|oye|quién|háblame|me escuchas|aki)/i;
handler.command = new RegExp; // Sin comando, activa por texto
handler.fail = null;
handler.register = true;

export default handler;
