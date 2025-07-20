let handler = async (m, { conn, args, text, command }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './media/Menu1.jpg'

  if (!text) return m.reply(`⚠️ *Debes ingresar un nuevo nombre para el grupo!*\n\n✅ Ejemplo:\n/${command} Grupo de cracks`)

  try {
    await conn.groupUpdateSubject(m.chat, text)
    await m.react("✅")
    await conn.sendMessage(m.chat, { 
      text: `✨ *Nombre del grupo actualizado con éxito*\n📛 Nuevo nombre: *${text}*`, 
      contextInfo: { externalAdReply: { 
        title: 'Nombre modificado',
        body: 'Cambios realizados correctamente',
        thumbnailUrl: pp,
        mediaType: 1,
        renderLargerThumbnail: true
      }}
    })
  } catch (e) {
    console.error(e)
    m.reply("❌ *Ocurrió un error al cambiar el nombre del grupo.*\nAsegúrate de que tengo permisos de administrador.")
  }
}

handler.help = ['setname <nuevo nombre>']
handler.tags = ['group']
handler.command = /^(setname|nuevonombregrupo|newnombre|nuevonombre)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.register = true
export default handler
