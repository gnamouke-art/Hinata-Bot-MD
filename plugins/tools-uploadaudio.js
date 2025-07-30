import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import path from 'path';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const q = m.quoted || m;

  if (!q.audio && !/audio/.test(q?.mimetype || '')) {
    return m.reply(`🎧 Responde a un *audio* para subirlo.\n\nEjemplo:\n${usedPrefix + command} (respondiendo al audio)`);
  }

  try {
    const audioPath = `./tmp/audio_${Date.now()}.mp3`;
    const buffer = await q.download?.() || await conn.downloadMediaMessage(q);
    fs.writeFileSync(audioPath, buffer);

    const form = new FormData();
    form.append('file', fs.createReadStream(audioPath), {
      filename: path.basename(audioPath),
      contentType: 'audio/mpeg',
    });

    const res = await fetch('https://uguu.se/upload.php', {
      method: 'POST',
      body: form,
    });

    const json = await res.json();
    if (!json.success) throw '❌ Error al subir el audio.';

    const audioUrl = json.files[0].url;
    await m.reply(`✅ Audio subido con éxito:\n\n🌐 ${audioUrl}`);

    fs.unlinkSync(audioPath);
  } catch (e) {
    console.error(e);
    m.reply('❌ No se pudo subir el audio.');
  }
};

handler.help = ['uploadaudio'];
handler.tags = ['tools'];
handler.command = /^uploadaudio$/i;

export default handler;
