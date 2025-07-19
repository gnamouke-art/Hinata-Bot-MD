import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) 
    return m.reply(
      `❓ ¿Qué deseas buscar, corazón? 🤗\nUsa este comando así para encontrar imágenes lindas:\n\n✨ *Ejemplo:* ${usedPrefix + command} gatitos`
    );

  try {
    const res = await googleImage(text);
    const image = await res.getRandom();
    const caption = `_🔎 Resultado para: "${text}"_\n\n✨ ¡Espero que te encante! 💖`;
    await conn.sendFile(m.chat, image, 'resultado.jpg', caption, m);
  } catch (e) {
    console.log(e);
    m.reply('❌ Uy, algo salió mal buscando tu imagen... inténtalo otra vez, porfa. 🥺');
  }
};

handler.help = ['gimage <texto>', 'imagen <texto>'];
handler.tags = ['buscadores'];
handler.command = /^(gimage|imagen3|imagen2)$/i;
handler.register = true;
handler.limit = 1;

export default handler;
