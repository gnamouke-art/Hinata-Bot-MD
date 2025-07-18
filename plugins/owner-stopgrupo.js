// creado por TOKIO5025 para Hinata-Bot-MD
import fs from 'fs'

const filePath = './src/JSON/grupos-bloqueados.json'

let handler = async (m, { conn, isGroup, isAdmin, isBotAdmin }) => {
  if (!isGroup) throw '🚫 Este comando solo puede usarse en grupos.'

  const sender = m.sender
  const isOwner = global.owner?.some(([num]) => sender.includes(num)) || sender === conn.user.jid

  if (!isAdmin && !isOwner) {
    throw '🔒 Solo los administradores, owners o subbots pueden usar este comando.'
  }

  let data = []
  try {
    data = JSON.parse(fs.readFileSync(filePath))
  } catch (e) {
    fs.writeFileSync(filePath, JSON.stringify([]))
  }

  if (data.includes(m.chat)) return m.reply('❌ Este grupo ya está bloqueado.')

  data.push(m.chat)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

  m.reply('✅ Este grupo ha sido bloqueado. Ya no escribiré aquí.')
}

handler.help = ['stop', 'delgrupo']
handler.tags = ['owner', 'grupo']
handler.command = ['stop', 'delgrupo']
handler.group = true

export default handler
