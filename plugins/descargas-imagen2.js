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

    const buttons = [
      { buttonId: `${usedPrefix}${command} ${text}`, buttonText: { displayText: '➡️ Siguiente imagen' }, type: 1 }
    ];

    await conn.sendButton(m.chat, caption, 'Powered by 💖', image, buttons, m);
  } catch (e) {
    console.log(e);
    m.reply('❌ Uy, algo salió mal buscando tu imagen... inténtalo otra vez, porfa. 🥺');
  }
};

handler.help = ['imagen2 <texto>', 'image2 <texto>', 'gimage2 <texto>'];
handler.tags = ['buscadores'];
handler.command = /^(imagen2|image2|gimage2)$/i;
handler.register = true;
handler.limit = 1;

export default handler;
