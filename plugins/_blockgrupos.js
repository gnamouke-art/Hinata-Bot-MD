// Silencia el bot en grupos bloqueados
import fs from 'fs'

const filePath = './src/JSON/grupos-bloqueados.json'

export async function before(m, { conn }) {
  if (!m.isGroup) return

  const sender = m.sender
  const isSubBot = sender === conn.user.jid
  const isOwner = global.owner?.some(([num]) => sender.includes(num))

  let data = []
  try {
    data = JSON.parse(fs.readFileSync(filePath))
  } catch {
    data = []
  }

  if (data.includes(m.chat) && !isOwner && !isSubBot) {
    // Ignora TODO excepto si eres owner o subbot
    return !1
  }
}
