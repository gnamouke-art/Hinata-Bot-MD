import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) 
    return m.reply(
      `❓ ¿Qué estás buscando, cielo? 🤔\nUsa así el comando para encontrar imágenes bonitas:\n\n✨ *Ejemplo:* ${usedPrefix + command} Loli`
    );

  const forbiddenWords = [
    'caca', 'polla', 'porno', 'porn', 'gore', 'cum', 'semen', 'puta', 'puto', 'culo', 'putita', 'putito',
    'pussy', 'hentai', 'pene', 'coño', 'asesinato', 'zoofilia', 'mia khalifa', 'desnudo', 'desnuda', 'cuca',
    'chocha', 'muertos', 'pornhub', 'xnxx', 'xvideos', 'teta', 'vagina', 'marsha may', 'misha cross', 'sexmex',
    'furry', 'furro', 'furra', 'xxx', 'rule34', 'panocha', 'pedofilia', 'necrofilia', 'pinga', 'horny', 'ass',
    'nude', 'popo', 'nsfw', 'femdom', 'futanari', 'erofeet', 'sexo', 'sex', 'yuri', 'ero', 'ecchi', 'blowjob',
    'anal', 'ahegao', 'pija', 'verga', 'trasero', 'violation', 'violacion', 'bdsm', 'cachonda', '+18', 'cp',
    'mia marin', 'lana rhoades', 'cepesito', 'hot', 'buceta', 'xxx', 'violet myllers', 'pornografía', 'niña desnuda',
    'hero boku no pico'
  ];

  if (forbiddenWords.some(word => m.text.toLowerCase().includes(word))) 
    return m.reply('🙄 Ehhh, no voy a buscar esas cositas raras, mi amorcito.');

  try {
    const res = await googleImage(text);
    const image = await res.getRandom();
    const caption = `_🔎 Aquí está lo que encontré para: "${text}"_\n\n✨ ¡Espero que te guste! 😘`;
    await conn.sendFile(m.chat, image, 'resultado.jpg', caption, m);
  } catch (e) {
    console.log(e);
    m.reply('❌ Uy, algo salió mal buscando tu imagen... inténtalo de nuevo, porfa.');
  }
};

handler.help = ['mage <texto>', 'imagen <texto>'];
handler.tags = ['buscadores'];
handler.command = /^(mage|image|imagen)$/i;
handler.register = true;
handler.limit = 1;

export default handler;
