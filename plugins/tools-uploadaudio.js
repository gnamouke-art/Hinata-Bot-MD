import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import FormData from 'form-data';
import mime from 'mime-types';

let handler = async (m, { conn }) => {
  const q = m.quoted || m;

  if (!q || !(q.audio || /audio/.test(q.mimetype))) {
    return m.reply('🎧 Responde a un *audio* para subirlo.\n\nEjemplo: .uploadaudio');
  }

  try {
    const buffer = await q.download?.() || await conn.downloadMediaMessage(q);
    const extension = mime.extension(q.mimetype) || 'mp3';
    const filename = `audio_${Date.now()}.${extension}`;
    const filepath = `./tmp/${filename}`;
    fs.writeFileSync(filepath, buffer);

    const form = new FormData();
    form.append('file', fs.createReadStream(filepath), filename);

    const res = await fetch('https://uguu.se/upload.php', {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });

    const json = await res.json();
    fs.unlinkSync(filepath);

    if (!json.success || !json.files || !json.files[0].url) {
      throw '❌ No se pudo subir el audio.';
    }

    const url = json.files[0].url;
    await m.reply(`✅ Audio subido con éxito:\n${url}`);
  } catch (e) {
    console.error(e);
    m.reply('❌ No se pudo subir el audio. Asegúrate de que no supere los 100 MB.');
  }
};

handler.help = ['uploadaudio'];
handler.tags = ['tools'];
handler.command = /^uploadaudio$/i;

export default handler;
