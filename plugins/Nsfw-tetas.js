import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  const res = await fetch('https://nekos.life/api/v2/img/boobs');
  const json = await res.json();

  await conn.sendMessage(m.chat, {
    image: { url: json.url },
    caption: `🍒 Tómate estas tetas, cochino 😏`,
  }, { quoted: m });
};

handler.command = ['tetas'];
handler.tags = ['nsfw'];
handler.help = ['tetas'];
handler.register = true;

export default handler;
