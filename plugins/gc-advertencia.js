const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (m.mentionedJid.includes(conn.user.jid)) return;

  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : text;
  } else who = m.chat;

  const user = global.db.data.users[who];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const motivo = text || 'Sin motivo, pero igual te la ganaste 💅';
  const reasonText = motivo.replace(/@\d+-?\d* /g, '');

  const warnUsage = `👀 *¿Y a quién querés que le aviente la advertencia, bebecito?*\n\n✨ *Usa el comando así:* ${usedPrefix + command} @usuario razón`;

  if (!who) {
    throw m.reply(warnUsage, m.chat, {
      mentions: conn.parseMention(warnUsage),
    });
  }

  user.warn += 1;

  await m.reply(
    `👠 *@${who.split`@`[0]}*, mi ciela, acabas de ganarte una *ADVERTENCIA* 💋\n\n💢 *Motivo:* ${reasonText}\n⚠️ *Advertencias:* ${user.warn}/3\n\nPórtate lindo o te vuelo del grupo, mi amor 💅`,
    null,
    { mentions: [who] }
  );

  if (user.warn >= 3) {
    user.warn = 0;

    await m.reply(
      `💅 Ya te lo advertí, @${
        who.split`@`[0]
      }...\n🤬 *3 advertencias* y se te acabó el recreo, chao chao 💋`,
      null,
      { mentions: [who] }
    );

    try {
      await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
    } catch (e) {
      await m.reply(`❌ No pude sacar al usuario... ¿Será que soy solo una diosa limitada? 😿`);
    }
  }

  return !1;
};

handler.command = /^(advertir|advertencia|warn|warning)$/i;
handler.admin = true;
handler.register = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
