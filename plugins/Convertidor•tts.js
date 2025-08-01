import gtts from 'node-gtts';
import { readFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const defaultLang = 'es';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  let lang = args[0];
  let text = args.slice(1).join(' ');
  
  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }

  if (!text && m.quoted?.text) text = m.quoted.text;
  if (!text) return conn.reply(m.chat, `🚩 *Te faltó el texto para convertir a voz*\n\n📌 *Ejemplo:* ${usedPrefix + command} Hola amorcito`, m);

  let res;
  try {
    res = await tts(text, lang);
  } catch (e) {
    res = await tts(text, defaultLang);
  }

  if (res) {
    await conn.sendMessage(m.chat, { audio: { url: res }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '🎤', key: m.key } });
  }
};

handler.help = ['tts <lang> <texto>'];
handler.tags = ['tools'];
handler.command = ['tts', 'gtts'];

export default handler;

function tts(text, lang = 'es') {
  return new Promise((resolve, reject) => {
    try {
      const tts = gtts(lang);
      const dir = join(process.cwd(), 'tmp');
      if (!existsSync(dir)) mkdirSync(dir);
      const file = join(dir, `${Date.now()}.mp3`);

      tts.save(file, text, () => {
        resolve(file);
        setTimeout(() => {
          if (existsSync(file)) unlinkSync(file);
        }, 30_000); // Elimina el archivo después de 30 segundos
      });
    } catch (e) {
      reject(e);
    }
  });
}
