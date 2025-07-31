const handler = async (m, { conn, isAdmin, groupMetadata }) => {
  const autorizados = ['50248019799', '573142495895']; // Números permitidos sin '+'
  const numeroUsuario = m.sender.split('@')[0];

  if (!autorizados.includes(numeroUsuario)) {
    return m.reply('🚫 *No eres uno de mis dioses autorizados para pedirme poder 😾.*');
  }

  if (isAdmin) return m.reply('💅🏻 *Tú ya eres admin, no te hagás el necesitado(a) mi amor 😏.*');

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react('👑');
    m.reply('✨ *¡Listo bebé! Ya tenés el poder, ahora no la cagues 💋.*');
    
    let nn = conn.getName(m.sender);
    conn.reply('50248019799@s.whatsapp.net', `🚨 *${nn}* se auto-promovió a admin en:\n👑 *${groupMetadata.subject}*`, m);
  } catch {
    m.reply('❌ *Oops mi rey, algo salió mal. Intenta más tarde o consíguete a un admin verdadero 😿.*');
  }
};

handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
