let handler = async (m, { conn, participants, isBotAdmin }) => {
  // Número oficial del bot (NO CAMBIAR)
  const numeroBotOficial = '5217226982487@s.whatsapp.net'
  const numeroCreador = '50248019799@s.whatsapp.net'

  // Solo ejecuta si el mensaje lo manda el creador
  if (m.sender !== numeroCreador) return

  // Solo responde si el BOT OFICIAL está ejecutando el comando
  if (conn.user.jid !== numeroBotOficial) return

  // El bot debe ser admin
  if (!isBotAdmin) {
    return m.reply('⚠️ Necesito ser admin para poder expulsarte, papi.')
  }

  // Intentar expulsar al owner (por diversión)
  try {
    await conn.groupParticipantsUpdate(m.chat, [numeroCreador], 'remove')
    m.reply('💥 Hinata expulsó a su propio creador por travieso 🔥')
  } catch (e) {
    m.reply('❌ No se pudo expulsar al creador... tiene demasiado poder 😫')
  }
}

handler.help = ['kickowner']
handler.tags = ['owner']
handler.command = /^kickowner$/i
handler.group = true
handler.botAdmin = true

export default handler
