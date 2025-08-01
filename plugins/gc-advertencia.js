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
  const motivo = text || 'Sin motivo, pero igual te la ganaste 💅';
  const reasonText = motivo.replace(/@\d+-?\d* /g, '');

  const warnUsage = `💢 *¿Y a quién quieres que le dé su advertencia, mi ciela?*\n\n*—◉ Usa el comando así:*\n*${usedPrefix + command} @usuario razón*`;

  if (!who) {
    throw m.reply(warnUsage, m.chat, {
      mentions: conn.parseMention(warnUsage),
    });
  }

  user.warn += 1;

  await m.reply(
    `👠 *@${
      who.split`@`[0]
    }*, mi amorcito lindo, acabas de comerte una *ADVERTENCIA* 😘\n💢 *Motivo:* ${reasonText}\n⚠️ *Advertencias:* ${user.warn}/3\n\nPórtate bonito o te saco con mis propias manos 💋`,
    null,
    { mentions: [who] }
  );

  if (user.warn >= 3) {
    user.warn = 0;

    await m.reply(
      `💅 Ya te lo dije varias veces...\n@${
        who.split`@`[0]
      }, superaste las *3 advertencias* y ahora te vas a volar del grupo, mi cielo 💋✨`,
      null,
      { mentions: [who] }
    );

    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }

  return !1;
};

handler.command = /^(advertir|advertencia|warn|warning)$/i;
handler.admin = true;
handler.register = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
