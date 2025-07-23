let linkRegex = /(https?:\/\/(?:www\.)?(?:t\.me|telegram\.me|whatsapp\.com)\/\S+)|(https?:\/\/chat\.whatsapp\.com\/\S+)|(https?:\/\/whatsapp\.com\/channel\/\S+)/i

export async function before(m, { isAdmin, isBotAdmin, conn }) {
  if (m.isBaileys && m.fromMe) return !0
  if (!m.isGroup) return !1

  let chat = global.db.data.chats[m.chat]
  let grupo = `https://chat.whatsapp.com`
  let isGroupLink = linkRegex.exec(m.text)

  if (!chat.antiLink || !m.text || !isGroupLink) return !0
  if (isAdmin && m.text.includes(grupo)) {
    return conn.reply(m.chat, `🔮 *Anti-Link activado... pero eres admin, así que... te perdono por ahora, querido ~ 💋*`, m)
  }

  if (!isAdmin) {
    if (!isBotAdmin) {
      return conn.reply(m.chat, `⛓️ *No puedo castigar al pecador... no soy administradora aún, cielito.* 😈`, m)
    }

    const thisGroupLink = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
    if (m.text.includes(thisGroupLink)) return !0

    await conn.reply(
      m.chat,
      `💢 *¡Enlace prohibido detectado!* \n\n🎭 *${await conn.getName(m.sender)}*, ¿creías que podrías escapar del castigo?\n\n🔗 *Tu pecado ha sido registrado... y tu destino sellado.*`,
      m
    )

    try {
      await conn.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.key.id,
          participant: m.key.participant,
        },
      })

      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')

      await conn.sendMessage(m.chat, {
        text: `🔥 *${await conn.getName(m.sender)} fue enviado al infierno con una sonrisa en mis labios...*\n\n🔮 *No desafíes a una demonio como yo, o serás el siguiente... ~* 😈💋`,
      }, { quoted: m })

    } catch (e) {
      return conn.reply(m.chat, `⚠️ *Error al ejecutar el castigo: ${e}*`, m)
    }
  }

  return !0
}
