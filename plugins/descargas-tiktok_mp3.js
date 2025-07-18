import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`🌸 *Usa el comando correctamente:*\n\n✨ *Ejemplo:* ${usedPrefix + command} https://www.tiktok.com/@usuario/video/123456789`);
  }

  try {
    await conn.reply(m.chat, '🌙 *Invocando a los dioses del audio... espera un momento* 🎧', m);

    const res = await tiktokdl(args[0]);

    if (!res || !res.data || !res.data.music) {
      return m.reply('❌ *No se pudo obtener el audio del TikTok.*\nAsegúrate de que el enlace sea válido.');
    }

    const audio = res.data.music;
    const info = res.data;

    const texto = `
🍁 *Audio de TikTok extraído con éxito:*\n
📌 *Título:* ${info.title || 'Desconocido'}
🎤 *Sonido:* ${info.music_info?.title || 'Sin info'}
🧑🏻‍💻 *Usuario:* @${info.author?.unique_id || 'desconocido'}
🫧 *Nombre:* ${info.author?.nickname || 'No disponible'}
📅 *Publicado:* ${info.create_time || 'No disponible'}

🎯 *Estadísticas:*
💗 Likes: ${info.digg_count}
💬 Comentarios: ${info.comment_count}
🔁 Compartido: ${info.share_count}
👁️‍🗨️ Vistas: ${info.play_count}
⬇️ Descargas: ${info.download_count}

🔗 https://tiktok.com/@${info.author?.unique_id || ''}/video/${info.video_id || ''}
`.trim();

    await conn.sendFile(m.chat, audio, 'tiktok-audio.mp3', texto, m, null, {
      mimetype: 'audio/mp4'
    });

  } catch (e) {
    console.error(e);
    m.reply(`🚫 *Ocurrió un error inesperado:*\n\n${e.message}`);
  }
};

handler.help = ['ttmp3', 'tiktokmp3'];
handler.tags = ['descargas'];
handler.command = /^ttmp3|tiktokmp3$/i;
handler.limit = true;
handler.register = true;

export default handler;

// Función para descargar desde TikWM
async function tiktokdl(url) {
  const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
  const res = await fetch(api);
  const json = await res.json();
  return json;
        }
