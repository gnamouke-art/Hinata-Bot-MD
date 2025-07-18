let handler = async (m, { conn, participants }) => {
  if (!m.isGroup) return;
  const idBotOficial = '50248019799@s.whatsapp.net'; // <- tu número como bot oficial
  const nombresPermitidos = ['hinata-Bot', 'light yagami', '', 'misa', 'akeno']; // añade aquí tus bots permitidos

  for (let p of participants) {
    let isBot = p.id.endsWith('g.us') ? false : p.id.includes(':') || p.id.startsWith('52') || p.id.startsWith('1');
    if (isBot && p.admin !== 'superadmin') {
      let nombre = (await conn.fetchStatus(p.id).catch(() => ({ status: '' }))).status.toLowerCase();
      let permitido = nombresPermitidos.some(n => nombre.includes(n));

      if (!permitido) {
        await conn.groupParticipantsUpdate(m.chat, [p.id], 'remove');
        await conn.sendMessage(m.chat, { text: `☠️ Sub-Bot desconocido eliminado: @${p.id.split('@')[0]}`, mentions: [p.id] });
      }
    }
  }
};
handler.command = /^antisubbot$/i;
handler.group = true;
handler.admin = true;

export default handler;
