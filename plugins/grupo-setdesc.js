let handler = async (m, { conn, args, command }) => {
  const texto = args.join(" ")
  if (!texto) return m.reply(`⚠️ *Debes escribir una nueva descripción para el grupo.*\n\n📌 *Ejemplo:*\n${command} Bienvenidos a este grupo de panas 🫂`)

  try {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => 'https://files.catbox.moe/izp0ym.jpg')
    await conn.groupUpdateDescription(m.chat, texto)
    await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: `✅ *La descripción del grupo ha sido actualizada con éxito:*\n\n📝 ${texto}`,
    })
    m.react('📃')
  } catch (e) {
    console.error(e)
    m.reply('❌ *Ocurrió un error al cambiar la descripción del grupo.*')
  }
}

handler.help = ['setdesc <texto>']
handler.tags = ['group']
handler.command = /^setdesk|cambiardescripsion|newdesc|descripción|descripcion$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
