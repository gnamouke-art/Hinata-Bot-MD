const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`⚠️ 𝐄𝐬𝐜𝐫𝐢𝐛𝐚 𝐞𝐥 𝐞𝐫𝐫𝐨𝐫/𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐜𝐨𝐧 𝐟𝐚𝐥𝐥𝐚\n\n*𝐄𝐣:* ${usedPrefix + command} los sticker no funka`);
  if (text.length < 8) return m.reply(`✨ *𝑴𝒊́𝒏𝒊𝒎𝒐 10 𝒄𝒂𝒓𝒂𝒄𝒕𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒆𝒍 𝒓𝒆𝒑𝒐𝒓𝒕𝒆...*`);
  if (text.length > 1000) return m.reply(`⚠️ *𝑴𝒂́𝒙𝒊𝒎𝒐 1000 𝑪𝒂𝒓𝒂𝒄𝒕𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒆𝒍 𝒓𝒆𝒑𝒐𝒓𝒕𝒆.*`);

  const teks = `┏╼╾╼⧼⧼⧼ ＲＥＰＯＲＴＥ ⧽⧽⧽╼╼╼┓
╏• *ɴᴜᴍᴇʀᴏ:* wa.me/${m.sender.split`@`[0]}
╏• *ᴍᴇɴsᴀᴊᴇ:* ${text}
┗╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼`;

  await conn.sendMessage(m.chat, {
    text: `✅ *El reporte ha sido enviado a mi creador*\n> ✨ Tendrás respuesta pronto si es necesario.\n> ❌ Si es falso, será ignorado.`,
    contextInfo: {
      externalAdReply: {
        title: '🎯 Reporte enviado',
        body: 'Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami',
        thumbnail: await conn.profilePictureUrl(m.sender, 'image').catch(_ => null),
        sourceUrl: [info.md, info.yt, info.tiktok].getRandom(),
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  await delay(2000);

  // Enviar reporte al dueño
  await conn.reply('50248019799@s.whatsapp.net', m.quoted ? teks + '\n\n> ' + m.quoted.text : teks, null, {
    contextInfo: { mentionedJid: [m.sender] }
  });

  // Enviar nota de voz personalizada
  await conn.sendMessage('50248019799@s.whatsapp.net', {
    audio: { url: 'https://d.uguu.se/SuilZWbF.opus' },
    mimetype: 'audio/ogg; codecs=opus',
    ptt: true
  }, { quoted: m });
};

handler.help = ['report', 'request'].map(v => v + ' <texto>');
handler.tags = ['main'];
handler.command = /^(report|request|reporte|bugs|bug|report-owner|reportes|reportar)$/i;
handler.register = true;

export default handler;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
