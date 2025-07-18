let handler = async (m, { conn }) => {
  if (!m.isGroup) return;

  const chat = await conn.groupMetadata(m.chat);
  const participants = chat.participants || [];

  const permitidos = ['hinata', 'light yagami', 'misa', 'akeno', 'ai-hoshino']; // hijos permitidos

  await conn.reply(m.chat, '✅ Antisubbot activado. Ahora los que no son mis hijos los elimino del grupo.');

  for (let user of participants) {
    const jid = user.id;
    const esBot = jid.includes(':');

    if (esBot) {
      let nombre = '';
      try {
        nombre = await conn.getName(jid);
      } catch {
        nombre = '';
      }

      nombre = (nombre || '').toLowerCase();
      const esPermitido = permitidos.some(n => nombre.includes(n));

      if (!esPermitido) {
        await conn.sendMessage(m.chat, {
          text: `👀 Vaya vaya… un subot  está en el grupo.\nEl no es mi hijo, ahora lo elimino 🗑️\n@${jid.split('@')[0]}`,
          mentions: [jid]
        });

        try {
          await conn.groupParticipantsUpdate(m.chat, [jid], 'remove');
        } catch {
          await conn.sendMessage(m.chat, {
            text: `❌ No pude eliminar a @${jid.split('@')[0]}. ¿Soy admin?`,
            mentions: [jid]
          });
        }
      }
    }
  }
};

handler.command = /^antisubbot$/i;
handler.group = true;
handler.admin = true;

export default handler;
