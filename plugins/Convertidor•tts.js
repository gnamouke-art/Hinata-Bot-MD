import gtts from 'node-gtts';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';

const defaultLang = 'es';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  let lang = args[0];
  let text = args.slice(1).join(' ');

  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }

  if (!text && m.quoted?.text) text = m.quoted.text;

  if (!text) return conn.reply(m.chat, `👅 *Ay tontito(a)... dime algo para decirlo en voz sexy*\n\n*Ejemplo:*\n${usedPrefix + command} es Hinata la más rica`, m);

  try {
    const res = await tts(text, lang);
    if (res) await conn.sendFile(m.chat, res, 'voz-sexy.opus', null, m, true);
  } catch (e) {
    return conn.reply(m.chat, `😾 *Ups bebé, algo falló al convertir tu texto...*\n\n❗ Error:\n${e}`, m);
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
      const filePath = join(global.__dirname(import.meta.url), '../tmp', `${Date.now()}.wav`);
      tts.save(filePath, text, () => {
        const audio = readFileSync(filePath);
        unlinkSync(filePath);
        resolve(audio);
      });
    } catch (e) {
      reject(e);
    }
  });
}
