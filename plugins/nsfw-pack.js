//código creado por tu jefe 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix }) => {
  try {
    const res = await fetch('https://nekos.life/api/v2/img/lewd');
    const json = await res.json();

    await conn.sendMessage(m.chat, {
      image: { url: json.url },
      caption: `🥵 *${usedPrefix || ''}${command || 'pack'}*\n📦 Aquí tienes otro pack bien sucio 😈\n\nTe gusta lo pervertido, ¿eh?`,
    }, { quoted: m });
  } catch (e) {
    await conn.reply(m.chat, '❎ No pude traerte el pack ahora mismo 💔', m);
    console.error(e);
  }
};

handler.customPrefix = /^([🥵]?\s*([./!])?\s*pack)$/i;
handler.command = new RegExp;
handler.tags = ['nsfw'];
handler.help = ['🥵pack'];
handler.register = true;

export default handler;
