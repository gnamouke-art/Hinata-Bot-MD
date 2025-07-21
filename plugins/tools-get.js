//código creado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 para Hinata Bot & akeno-himejina-BOT 
//https://github.com/TOKIO5025
const handler = async (m, { conn }) => {
  if (!m.quoted) return;

  const quotedMsg = m.quoted;
  const mtype = quotedMsg.mtype || '';

  if (!['imageMessage', 'videoMessage', 'audioMessage'].includes(mtype)) return;

  try {
    const media = await quotedMsg.download();

    if (mtype === 'imageMessage') {
      await conn.sendMessage(m.sender, {
        image: media,
        caption: '🖼️ Aquí tienes la copia del estado que respondiste.'
      }, { quoted: m });

    } else if (mtype === 'videoMessage') {
      await conn.sendMessage(m.sender, {
        video: media,
        caption: '🎥 Aquí tienes la copia del estado que respondiste.'
      }, { quoted: m });

    } else if (mtype === 'audioMessage') {
      await conn.sendMessage(m.sender, {
        audio: media,
        mimetype: 'audio/mp4',
        ptt: true
      }, { quoted: m });
    }

    if (m.isGroup) {
      await conn.sendMessage(m.chat, { 
        text: `✅ @${m.sender.split('@')[0]}, te envié por privado el estado que respondiste.`, 
        mentions: [m.sender]
      });
    }

  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, '⚠️ No pude obtener el estado que respondiste.', m);
  }
};

handler.help = ['get @tag'];
handler.tags = ['tools'];
handler.command = ['get', 'getstatu', 'robarestado'];

export default handler;
