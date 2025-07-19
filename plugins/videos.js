import ytdl from 'ytdl-core';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `📽️ ¿Qué video deseas buscar?\n\nUso correcto:\n*${usedPrefix + command} Messi*`;

  const query = args.join(" ");
  const ytSearchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=TU_API_KEY&type=video&maxResults=1`;

  try {
    const res = await fetch(ytSearchUrl);
    const data = await res.json();
    
    if (!data.items.length) throw '❌ No se encontraron videos.';

    const video = data.items[0];
    const videoId = video.id.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const title = video.snippet.title;

    let info = await ytdl.getInfo(videoUrl);
    let format = ytdl.chooseFormat(info.formats, { quality: '18' }); // MP4 360p

    const message = `
🎬 *Título:* ${title}
📎 *Enlace:* ${videoUrl}
📥 *Formato:* mp4 (360p)

Responde con:
1️⃣ mp4 directo
2️⃣ Como documento
3️⃣ Video redondo
    `.trim();

    conn.sendMessage(m.chat, { text: message }, { quoted: m });

    // Opcional: puedes guardar el estado del usuario para que al responder con 1, 2 o 3, se actúe según la opción
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
