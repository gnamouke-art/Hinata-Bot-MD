let handler = async (m, { conn, participants }) => {
  if (!m.isGroup) return;

  const permitidos = ['hinata', 'light yagami', 'ai-hoshino', 'misa', 'akeno']; // nombres válidos de bots

  for (let p of participants) {
    let isBot = p.id.includes(':'); // identifica sub-bots por su JID

    if (isBot && p.admin !== 'superadmin') {
      let nombreRaw;
      try {
        nombreRaw = await conn.getName(p.id);
      } catch (e) {
        nombreRaw = '';
      }

      let nombre = (nombreRaw || '').toLowerCase();
      let permitido = permitidos.some(n => nombre.includes(n));

      if (!permitido) {
        await conn.groupParticipantsUpdate(m.chat, [p.id], 'remove');
        await conn.sendMessage(m.chat, {
          text: `☠️ Sub-Bot desconocido eliminado: @${p.id.split('@')[0]}`,
          mentions: [p.id]
        });
      }
    }
  }
};

handler.command = /^antisubbot$/i;
handler.group = true;
handler.admin = true;

export default handler;
