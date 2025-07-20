let handler = async (m, { conn, args, text, command, isAdmin }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './media/Menu1.jpg'

  if (!isAdmin) {
    return conn.sendMessage(m.chat, {
      text: `💋 *Mi amor... este comando es solo para mis amores admins*\n\n💼 Solo ellos pueden cambiar el nombre del grupo, es algo exclusivo 💖\n\n🔧 *Desarrollado por:* 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & Diego Yt`,
      contextInfo: {
        externalAdReply: {
          title: 'Acceso denegado, cosita bonita 😘',
          body: 'Solo para admins preciosos',
          thumbnailUrl: pp,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })
  }

  if (!text) return m.reply(`✨ *Amor, dime cómo quieres que se llame el grupo* 💬\n\nEjemplo:\n/${command} Los más guapos 💅\n\n🔧 *Desarrollado por:* 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & Diego Yt`)

  try {
    await conn.groupUpdateSubject(m.chat, text)
    await m.react("💖")
    await conn.sendMessage(m.chat, {
      text: `🎀 *Nombre del grupo actualizado con éxito, mi ciela*\n\n📝 Nuevo nombre: *${text}*\n\n🔧 *Desarrollado por:* 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & Diego Yt`,
      contextInfo: {
        externalAdReply: {
          title: 'Cambios bonitos realizados',
          body: 'Hecho con amor 💕',
          thumbnailUrl: pp,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
  } catch (e) {
    console.error(e)
    m.reply("❌ *Oops... no pude cambiar el nombre del grupo.*\nAsegúrate de que soy admin, bombón 🍬\n\n🔧 *Desarrollado por:* 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & Diego Yt")
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
