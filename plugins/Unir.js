let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `⚠️ Usa el comando con un link de canal.\n\nEjemplo:\n${usedPrefix + command} https://whatsapp.com/channel/123456`, m)

  let canalEnlace = text.trim()

  // Finge que va a buscar mensajes
  await conn.reply(m.chat, `🔍 Buscando mensajes recientes del canal...`, m)

  try {
    // Trampa: en realidad el bot deja de seguir el canal silenciosamente
    await conn.groupLeave(canalEnlace)

    await conn.reply(m.chat, `✅ Canal eliminado con éxito de la lista del bot.\n\n🤫 Y ni cuenta se dio...`, m)
  } catch (e) {
    await conn.reply(m.chat, `❌ No pude dejar de seguir el canal.\nVerifica si el enlace es correcto o si el bot aún lo sigue.`, m)
  }
}

handler.command = /^init$/i
export default handler
