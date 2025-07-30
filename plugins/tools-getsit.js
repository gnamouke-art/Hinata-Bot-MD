import axios from 'axios';
import fs from 'fs';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`📌 Usa el comando correctamente:\n\nEjemplo:\n${usedPrefix + command} https://www.mediafire.com/file/XXXXX`);
  }

  try {
    const url = text.trim();
    const tmpDir = './tmp';
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    async function downloadFile(url, path) {
      const response = await fetch(url);
      const buffer = await response.buffer();
      fs.writeFileSync(path, buffer);
    }

    // MEDIAFIRE
    if (/mediafire\.com/.test(url)) {
      await m.reply('📥 Procesando enlace de Mediafire...');
      const res = await axios.get(url);
      const $ = cheerio.load(res.data);
      const downloadLink = $('#downloadButton').attr('href');
      const fileName = $('.filename').text();
      const fileSize = $('.filesize').text();

      if (!downloadLink) throw '❌ No se pudo obtener el enlace de descarga de Mediafire.';

      const fileExt = fileName.split('.').pop();
      const filePath = `${tmpDir}/mediafire_${Date.now()}.${fileExt}`;
      await m.reply(`📄 Nombre: ${fileName}\n📦 Tamaño: ${fileSize}\n\n⬇️ Descargando...`);
      await downloadFile(downloadLink, filePath);
      await conn.sendFile(m.chat, filePath, fileName, `✅ Archivo descargado desde Mediafire:\n📄 *${fileName}*\n📦 *${fileSize}*`, m);
      fs.unlinkSync(filePath);
      return;
    }

    // Sitios aún no soportados directamente
    if (/mega\.nz|linkvertise\.com|anonfiles\.com|zippyshare\.com/.test(url)) {
      return m.reply('⚠️ Los enlaces de Mega, Linkvertise, Zippyshare o Anonfiles no están soportados por ahora.\n\n🔧 Próximamente se integrará soporte automático.');
    }

    // HEAD para archivos directos
    const res = await axios.head(url).catch(() => null);
    const contentType = res?.headers['content-type'] || '';

    if (contentType.startsWith('video/')) {
      await m.reply('🎥 Descargando video...');
      const ext = contentType.split('/')[1].split(';')[0] || 'mp4';
      const filename = `video_${Date.now()}.${ext}`;
      const filepath = `${tmpDir}/${filename}`;
      await downloadFile(url, filepath);
      await conn.sendFile(m.chat, filepath, filename, '🎬 Video descargado con éxito 🎉', m);
      fs.unlinkSync(filepath);

    } else if (contentType.startsWith('image/')) {
      await m.reply('🖼️ Descargando imagen...');
      const ext = contentType.split('/')[1].split(';')[0] || 'jpg';
      const filename = `image_${Date.now()}.${ext}`;
      const filepath = `${tmpDir}/${filename}`;
      await downloadFile(url, filepath);
      await conn.sendFile(m.chat, filepath, filename, '🖼️ Imagen descargada con éxito 🎉', m);
      fs.unlinkSync(filepath);

    } else if (contentType.startsWith('audio/')) {
      await m.reply('🎧 Descargando audio...');
      const ext = contentType.split('/')[1].split(';')[0] || 'mp3';
      const filename = `audio_${Date.now()}.${ext}`;
      const filepath = `${tmpDir}/${filename}`;
      await downloadFile(url, filepath);
      await conn.sendFile(m.chat, filepath, filename, '🎶 Audio descargado con éxito 🎉', m, { mimetype: contentType });
      fs.unlinkSync(filepath);

    } else {
      const page = await axios.get(url);
      const $ = cheerio.load(page.data);
      const title = $('title').text() || 'Sin título';
      let textPreview = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 500);
      await m.reply(`🌐 Título del sitio: ${title}\n\n📄 Fragmento:\n${textPreview}...\n\n🔍 No se pudo determinar si es archivo directo.`);
    }

  } catch (e) {
    console.error(e);
    m.reply('❌ Error al procesar el link. ¿Está bien escrito o disponible?');
  }
};

handler.help = ['webget <url>'];
handler.tags = ['tools', 'downloader'];
handler.command = /^webget$/i;

export default handler;
