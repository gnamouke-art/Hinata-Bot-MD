export async function before(m, { conn, isBotAdmin }) {
  if (!isBotAdmin) return

  const chat = global.db.data.chats[m.chat]
  if (!chat || !chat.antiArabe) return

  const arabes = ['212', '91', '92', '234', '964', '971', '963', '93', '90', '994']
  const participantes = m.participants || []

  for (let user of participantes) {
    let number = user.split('@')[0]
    if (arabes.some(code => number.startsWith(code))) {
      try {
        await conn.sendMessage(m.chat, {
          text: `🚨 Un número sospechoso acaba de entrar: *@${number}*\n❌ Será eliminado del grupo.`,
          mentions: [user]
        })
        await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
        await conn.sendMessage(m.chat, {
          text: `✅ *@${number}* fue eliminado automáticamente.`,
          mentions: [user]
        })
      } catch (e) {
        await conn.sendMessage(m.chat, {
          text: `❌ No pude eliminar a *@${number}*.\nPuede que sea admin o ocurrió un error.`,
          mentions: [user]
        })
      }
    }
  }
}
