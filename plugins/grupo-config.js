let handler = async (m, { conn, args, usedPrefix, command }) => {
  const icono = '🌐'              // Ícono por defecto si falla la imagen del grupo
  const emoji = '🟢✨'             // Grupo abierto
  const emoji2 = '🔒🚫'            // Grupo cerrado
  const flecha = '╰➤'             // Decoración para mensajes

  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => icono)

  let isClose = {
    'open': 'not_announcement',
    'close': 'announcement',
    'abierto': 'not_announcement',
    'cerrado': 'announcement',
    'abrir': 'not_announcement',
    'cerrar': 'announcement',
  }[(args[0] || '').toLowerCase()]

  if (isClose === undefined) {
    return conn.reply(m.chat, `
🌟 *Configuración de Grupo* 🌟

${flecha} Usa una opción para cambiar el estado del grupo:

💬 *${usedPrefix + command} abrir* — Todos pueden hablar  
🔒 *${usedPrefix + command} cerrar* — Solo admins  
🌍 *${usedPrefix + command} open / close* (en inglés)

✨ ¡Administra tu grupo como un pro!
`, m)
  }

  await conn.groupSettingUpdate(m.chat, isClose)

  if (isClose === 'not_announcement') {
    m.reply(`${emoji} *El grupo ha sido abierto.*\n${flecha} Todos los miembros ahora pueden escribir libremente 💬✨`)
  }

  if (isClose === 'announcement') {
    m.reply(`${emoji2} *El grupo ha sido cerrado.*\n${flecha} Solo los administradores pueden enviar mensajes 🔕👑`)
  }
}

handler.help = ['group open / close', 'grupo abrir / cerrar']
handler.tags = ['grupo']
handler.command = ['group', 'grupo']
handler.admin = true
handler.botAdmin = true

export default handler
