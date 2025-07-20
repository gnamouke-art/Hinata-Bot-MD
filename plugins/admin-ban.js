let handler = async (m, { conn, participants, isBotAdmin, isAdmin, args }) => {
  if (!m.isGroup) return m.reply('❗ *Este comando solo funciona en grupos.*');
  if (!isAdmin) return m.reply('🚫 *Solo los admins pueden usar este comando, fiera.*');
  if (!isBotAdmin) return m.reply('😥 *No puedo eliminar a nadie si no soy admin.*');

  let users = m.mentionedJid ? m.mentionedJid :
              m.quoted ? [m.quoted.sender] :
              args.length ? args.map(u => u.replace(/[@+]/g, '') + '@s.whatsapp.net') : [];

  if (!users.length) return m.reply('👀 *Etiqueta o responde al mensaje de quien quieras eliminar, no adivino...*');

  for (let user of users) {
    if (participants.map(p => p.id).includes(user) && user !== conn.user.jid) {
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
      await m.reply(`👢 ¡Adiós @${user.split('@')[0]}!\n😈 *Has sido eliminado por travieso...*\n\n✨ _Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami_`, null, {
        mentions: [user]
      });
    } else {
      m.reply(`❌ *No puedo eliminar a @${user.split('@')[0]}, tal vez no está en el grupo o soy yo mismo...*`, null, {
        mentions: [user]
      });
    }
  }

  m.react('✅');
};

handler.help = ['kick', 'ban'];
handler.tags = ['group'];
handler.command = /^(kick|ban|echar|sacar)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
