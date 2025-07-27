import fg from 'api-dylux';

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    let link = args[0] || text?.trim();

    if (!link || !/(?:https?:\/\/)?(?:www\.)?(vt|tiktok)\.com\/[^\s]+/i.test(link)) {
      return conn.reply(m.chat, `💌 Manda el link del video para descargar, bebé… no soy adivina 😏\n\n📌 *Ejemplo:* ${usedPrefix}${command} https://vm.tiktok.com/ZMreHF2dC/`, m);
    }

    m.react('⌛');

    let data = await fg.tiktok(link);
    let { title, play, duration } = data.result;
    let { nickname } = data.result.author;

    let caption = `
🎶 *Descarga de TikTok completada*

◦ 👤 *Autor:* ${nickname}
◦ 📌 *Título:* ${title}
◦ ⏱️ *Duración:* ${duration}
`.trim();

    await conn.sendFile(m.chat, play, 'tiktok.mp4', caption, m);
    m.react('✅');

  } catch (e) {
    m.react('❌');
    return conn.reply(m.chat, `❌ *Error al descargar:* ${e.message}`, m);
  }
};

handler.customPrefix = /^(tiktok)$/i;
handler.command = /^\.?tiktok$/i;

handler.all = async function (m, { conn }) {
  let link = m.text?.trim();
  if (/https?:\/\/(?:www\.)?(vt|tiktok)\.com\/[^\s]+/i.test(link)) {
    m.text = link;
    return handler(m, { conn, text: link });
  }
};

handler.help = ["tiktok"];
handler.tags = ["downloader"];
handler.limit = true;
handler.register = true;

export default handler;
