// 💋 Antiflood estilo VLADILENA Bot 💄
import fs from 'fs'
let warningDB = JSON.parse(fs.readFileSync('./src/database/warnings.json', 'utf-8'))

const handler = async (m, { conn, isBotAdmin, isAdmin }) => {
  if (m.fromMe || m.isGroup === false) return
  const chatId = m.chat
  const sender = m.sender

  // Si no es admin ni bot
  if (isAdmin || !isBotAdmin) return

  // Base
  if (!warningDB[chatId]) warningDB[chatId] = {}
  if (!warningDB[chatId][sender]) warningDB[chatId][sender] = { count: 0 }

  // Aumenta advertencia
  warningDB[chatId][sender].count += 1
  let count = warningDB[chatId][sender].count

  if (count < 3) {
    await conn.reply(m.chat, `👠 *¡Te pasaste, zorrita!* Esta es tu *advertencia #${count}/3*.\n\nAl llegar a 3, te vas pa'l carajo.\n\n— 𝐕𝐋𝐀𝐃𝐈𝐋𝐄𝐍𝐀 💋`, m)
  } else {
    await conn.reply(m.chat, `💋 *3 advertencias acumuladas, desgraciado.* Te vas eliminado por zorra.\n\n— Hinata te odia 💅`, m)
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    delete warningDB[chatId][sender]
  }

  fs.writeFileSync('./src/database/warnings.json', JSON.stringify(warningDB, null, 2))
}

handler.customPrefix = /^hola grup[oa]*/i
handler.command = new RegExp
handler.group = true
handler.botAdmin = true
export default handler
