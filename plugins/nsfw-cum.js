import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    let res = await fetch('https://api.stellarwa.xyz/nsfw/interaction?type=cum&apikey=stellar-6snzT3yw');
    if (!res.ok) throw new Error(`Error en la API: ${res.status}`);
    
    let json = await res.json();
    if (!json || !json.url) throw new Error('No se recibió una imagen válida');

    await conn.sendFile(m.chat, json.url, 'nsfw.jpg', '🔞 Aquí tienes... 💦', m);
  } catch (e) {
    await conn.reply(m.chat, '💔 Ooops... No pude obtener el contenido NSFW. Revisa si la API sigue activa o si la categoría existe.', m);
  }
};

handler.command = ['nsfwcum'];
export default handler;
