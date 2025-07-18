// creado por TOKIO5025 para Hinata-Bot-MD
import fs from 'fs'

const filePath = './src/JSON/grupos-bloqueados.json'

let handler = async (m, { conn, isGroup, isAdmin }) => {
  if (!isGroup) throw '🚫 Este comando solo puede usarse en grupos.'

  const sender = m.sender
  const isOwner = global.owner?.some(([num]) => sender.includes(num)) || sender === conn.user.jid

  if (!isAdmin && !isOwner) {
    throw '🔓 Solo los administradores, owners o subbots pueden usar este comando.'
  }

  let data = []
  try {
    data = JSON.parse(fs.readFileSync(filePath))
  } catch (e) {
    fs.writeFileSync(filePath, JSON.stringify([]))
  }

  if (!data.includes(m.chat)) return m.reply('✅ Este grupo no está bloqueado.')

  data = data.filter(id => id !== m.chat)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

  m.reply('🔓 Este grupo ha sido reactivado. Ya puedo responder aquí.')
}

handler.help = ['activargrupo']
handler.tags = ['owner', 'grupo']
handler.command = ['activargrupo']
handler.group = true

export default handler
