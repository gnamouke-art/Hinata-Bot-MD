let handler = async (m, { conn, args, usedPrefix, command }) => {
  let user = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
  let tag = '@' + user.split('@')[0]
  let jid = user
  let respuesta = `🍷 *LID de ${tag}*\n\n*${jid}*`

  await conn.reply(m.chat, respuesta, m, {
    mentions: [user]
  })
}

handler.help = ['lid', 'getlid']
handler.tags = ['owner']
handler.command = /^lid|getlid$/i
handler.rowner = true // solo owner real puede usarlo

export default handler
