let handler = async (m, { conn, isBotAdmin }) => {
  const botOficial = '527226982487@s.whatsapp.net'
  const owner = '50248019799'

  // Si NO es el bot oficial, salir sin hacer nada
  if (conn.user.jid !== botOficial) return

  // Si quien ejecuta el comando NO es el OWNER, salir
  if (m.sender !== owner + '@s.whatsapp.net') return

  // Debe responder a alguien
  if (!m.quoted) return m.reply('⚠️ Responde al mensaje de quien quieres expulsar.')

  // Verifica que el bot tenga admin
  if (!isBotAdmin) return m.reply('🚫 No puedo expulsar, no soy admin.')

  // Intenta expulsar al usuario citado
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.quoted.sender], 'remove')
    m.reply('✅ Usuario eliminado por orden directa del 👑 OWNER.')
  } catch (e) {
    m.reply('❌ No se pudo expulsar. ¿Ya se salió o no está en el grupo?')
  }
}

handler.command = /^kickowner$/i
handler.group = true

export default handler
