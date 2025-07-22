//código creado por tu jefe 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲
//para Hinata Bot deja créditos pa
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix }) => {
  try {
    const res = await fetch('https://api.waifu.pics/nsfw/waifu');
    const json = await res.json();

    await conn.sendMessage(m.chat, {
      image: { url: json.url },
      caption: `🥵 *${usedPrefix || ''}${command || 'pack'}*\n📦 Aquí tienes tu pack asquerosito 😈\n\nDisfruta, pervertid@...`,
    }, { quoted: m });
  } catch (e) {
    await conn.reply(m.chat, '❎ No pude traer el pack, intenta más tarde 💔', m);
    console.error(e);
  }
};

// Soporta: pack, .pack, !pack, 🥵pack, 🥵.pack, etc.
handler.customPrefix = /^([🥵]?\s*([./!])?\s*pack)$/i;
handler.command = new RegExp; // para que use customPrefix
handler.tags = ['nsfw'];
handler.help = ['pack'];
handler.register = true;

export default handler;
