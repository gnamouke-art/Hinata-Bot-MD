import axios from 'axios';
import fs from 'fs';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`📌 Usa el comando correctamente:\n\nEjemplo:\n${usedPrefix + command} https://files.catbox.moe/n35h6q.mp4`);
  }

  try {
    const url = text.trim();

    // Primero hacemos HEAD para saber el tipo de contenido
    const res = await axios.head(url);
    const contentType = res.headers['content-type'] || '';

    // Carpeta temporal
    const tmpDir = './tmp';
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    // Función para descargar archivo
    async function downloadFile(url, path) {
      const response = await fetch(url);
      const buffer = await response.buffer();
      fs.writeFileSync(path, buffer);
    }

    if (contentType.startsWith('video/')) {
      // Video
      await m.reply('🎥 Descargando video...');

      const extension = contentType.split('/')[1].split(';')[0] || 'mp4';
      const filename = `video_${Date.now()}.${extension}`;
      const filepath = `${tmpDir}/${filename}`;

      await downloadFile(url, filepath);

      await conn.sendFile(m.chat, filepath, filename, '🎬 Video descargado con éxito 🎉', m);
      fs.unlinkSync(filepath);

    } else if (contentType.startsWith('image/')) {
      // Imagen
      await m.reply('🖼️ Descargando imagen...');

      const extension = contentType.split('/')[1].split(';')[0] || 'jpg';
      const filename = `image_${Date.now()}.${extension}`;
      const filepath = `${tmpDir}/${filename}`;

      await downloadFile(url, filepath);

      await conn.sendFile(m.chat, filepath, filename, '🖼️ Imagen descargada con éxito 🎉', m);
      fs.unlinkSync(filepath);

    } else {
      // No es imagen ni video, tratamos como página web
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const titulo = $('title').text() || 'Sin título';
      // Sacamos texto del body y limpiamos espacios, cortamos a 500 caracteres
      let textoPlano = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 500);

      await m.reply(`🌐 Título del sitio: ${titulo}\n\n📄 Fragmento:\n${textoPlano}...\n\n👍🔥`);
    }
  } catch (e) {
    console.error(e);
    m.reply('❌ Error al procesar el link. ¿Está bien escrito o disponible?');
  }
};

handler.help = ['getsit <url>'];
handler.tags = ['tools', 'downloader'];
handler.command = /^getsit$/i;

export default handler;
