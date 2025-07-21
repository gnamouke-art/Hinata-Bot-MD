import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  try {
    const res = await fetch('https://api.waifu.pics/nsfw/boobs');
    const json = await res.json();

    if (!json.url) throw 'No se encontró imagen';

    await conn.sendMessage(m.chat, {
      image: { url: json.url },
      caption: `🍒 Aquí tienes tus tetas, puerquito 😏\n_Disfrútalo, degenerado._`,
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    await m.reply('❌ No se pudo obtener la imagen. La API está caída o respondió mal.');
  }
};

handler.command = ['tetas'];
handler.tags = ['nsfw'];
handler.help = ['tetas'];
handler.register = true;
handler.private = false;
handler.group = false;

export default handler;
