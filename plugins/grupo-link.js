import fs from 'fs';
const handler = async (m, { conn, args }) => {
  const group = m.chat;

  // Enviar el enlace del grupo con estilo
  await m.reply(`✨ *Aquí tienes el acceso al nido del caos~* 😈🔥\n\nhttps://chat.whatsapp.com/${await conn.groupInviteCode(group)}`);

  // Espera 1 segundo antes de enviar el audio
  await delay(1000);

  // Enviar audio tipo PTT (voz)
  await conn.sendMessage(m.chat, {
    audio: { url: 'https://files.catbox.moe/kgvefz.mp4' },
    mimetype: 'audio/mpeg',
    ptt: true
  }, { quoted: m });
};

handler.help = ['linkgroup'];
handler.tags = ['group'];
handler.command = /^link(gro?up)?$/i;
handler.group = true;
handler.botAdmin = true;
handler.register = true;
export default handler;

const delay = ms => new Promise(res => setTimeout(res, ms));
