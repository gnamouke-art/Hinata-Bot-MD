// comando creado por TOKIO5025 para Hinata-Bot
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  let url = args[0];
  if (!url || !url.includes('http')) {
    return m.reply(`🔞 Ingresa el link del video porno que deseas descargar.\n\n*Ejemplo:* ${usedPrefix + command} https://www.pornhub.com/view_video.php?viewkey=xxxxx`);
  }

  const output = `video-${Date.now()}.mp4`;

  m.reply(`🌶️ Descargando el video caliente...\nPor favor, espera un momento... 🔥`);

  exec(`yt-dlp -f best -o "${output}" "${url}"`, async (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Error al descargar:', err);
      return m.reply('💔 Ooops... No pude descargar el video. Asegúrate que el link sea válido.');
    }

    if (!fs.existsSync(output)) {
      return m.reply('❌ Descarga fallida. No se generó el archivo.');
    }

    let stats = fs.statSync(output);
    let fileSize = stats.size;

    if (fileSize > 50 * 1024 * 1024) { // WhatsApp limita archivos a 50MB
      const fileUrl = path.resolve(output);
      m.reply(`⚠️ El archivo es muy grande (${(fileSize / 1024 / 1024).toFixed(2)} MB).\nNo puedo enviarlo por WhatsApp, pero puedes subirlo manualmente desde tu host: *${fileUrl}*`);
    } else {
      await conn.sendFile(m.chat, fs.readFileSync(output), output, '🔞 Aquí tienes tu video porno. ¡Disfrútalo! 💦', m);
    }

    fs.unlinkSync(output); // eliminar archivo descargado
  });
};

handler.command = ['xxx', 'porn'];
handler.help = ['xxx <link>', 'porn <link>'];
handler.tags = ['nsfw'];
handler.premium = false;
handler.limit = 1;
handler.register = true;
handler.private = false;

export default handler;
