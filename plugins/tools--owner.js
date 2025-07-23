// Archivo: plugins/kickowner.js

let handler = async (m, { conn, text, participants }) => {
  const botOficial = '527226982487' // Solo este número podrá usar el comando
  const creador = '50248019799'
  
  // Validación: Solo el BOT OFICIAL puede responder
  if (!conn.user?.id?.includes(botOficial)) return

  // Validación: Solo el CREADOR puede usar este comando
  if (!creador.includes(m.sender.split('@')[0])) return m.reply('❌ Este comando solo lo puede usar mi Creador Oficial.')

  // Validación: Debes responder a alguien
  if (!m.quoted) return m.reply('🚫 Responde al mensaje de la persona que quieres expulsar.')

  const user = m.quoted.sender

  // Verifica que el bot sea admin
  const groupMetadata = await conn.groupMetadata(m.chat)
  const botAdmin = groupMetadata.participants.find(p => p.id === conn.user.jid)?.admin
  if (!botAdmin) return m.reply('⚠️ Necesito ser admin para poder expulsar a alguien.')

  // Expulsa al usuario
  await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
  m.reply(`👢 Adiós, te patearon por orden del creador.`)
}

handler.help = ['kickowner']
handler.tags = ['group']
handler.command = /^kickowner$/i
handler.group = true
handler.botAdmin = true
handler.rowner = false
handler.admin = false
handler.restrict = true
handler.disabled = false

export default handler
