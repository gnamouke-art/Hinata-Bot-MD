import ytdl from 'ytdl-core';
import ytsr from 'ytsr';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `🎬 ¿Qué video deseas buscar?\n\nEjemplo:\n${usedPrefix + command} messi`;

  try {
    let query = args.join(" ");
    let searchResults = await ytsr(query, { limit: 1 });

    if (!searchResults.items.length) throw '❌ No se encontró ningún video.';

    let video = searchResults.items[0];

    if (video.type !== 'video') throw '❌ Resultado inválido.';

    let title = video.title;
    let url = video.url;
    let duration = video.duration || 'N/A';
    let thumbnail = video.thumbnail;

    let info = await ytdl.getInfo(url);
    let format = ytdl.chooseFormat(info.formats, { quality: '18' }); // MP4 360p

    let msg = `
🎬 *Título:* ${title}
⏱️ *Duración:* ${duration}
🔗 *URL:* ${url}

📥 *Opciones de descarga:*
1️⃣ mp4 directo
2️⃣ Documento
3️⃣ Video redondo

_Responde con 1, 2 o 3 para elegir formato._
    `.trim();

    conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: msg }, { quoted: m });

    // Aquí podrías almacenar el estado para responder al 1, 2, 3

  } catch (e) {
    console.log(e);
    throw '⚠️ Error al buscar o procesar el video.';
  }
};

handler.help = ['video', 'videoultra'];
handler.tags = ['downloader'];
handler.command = /^(video|videoultra|vi)$/i;
handler.register = true;
handler.limit = 3;

export default handler;
