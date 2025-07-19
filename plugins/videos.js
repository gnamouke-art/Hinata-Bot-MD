import ytdl from 'ytdl-core';
import ytSearch from 'youtube-search-api';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `📽️ ¿Qué video deseas buscar?\n\nUso:\n${usedPrefix + command} Messi`;

  try {
    const query = args.join(' ');
    const results = await ytSearch.GetListByKeyword(query, false, 1);

    if (!results.items.length) throw '❌ No se encontró ningún video.';

    const video = results.items[0];
    const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
    const title = video.title;

    let info = await ytdl.getInfo(videoUrl);
    let format = ytdl.chooseFormat(info.formats, { quality: '18' }); // MP4 360p

    const message = `
🎬 *Título:* ${title}
📎 *Enlace:* ${videoUrl}
⏱️ *Duración:* ${video.length.simpleText || 'N/A'}
📥 *Formato:* mp4 (360p)

Responde con:
1️⃣ mp4 directo
2️⃣ Como documento
3️⃣ Video redondo
    `.trim();

    conn.sendMessage(m.chat, { text: message }, { quoted: m });

    // Aquí podrías guardar el estado del usuario para procesar su siguiente mensaje (1, 2, 3)
  } catch (err) {
    console.error(err);
    throw '⚠️ Ocurrió un error al buscar o procesar el video.';
  }
};

handler.help = ['video', 'videoultra'];
handler.tags = ['downloader'];
handler.command = /^(video|videoultra|vi)$/i;
handler.register = true;
handler.limit = 3;

export default handler;
