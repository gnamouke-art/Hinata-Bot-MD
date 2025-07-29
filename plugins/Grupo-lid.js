let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('🍷 Este comando solo funciona en grupos, mi ciela.')

  let participants = await conn.groupMetadata(m.chat).then(res => res.participants || []).catch(() => [])
  if (!participants.length) return m.reply('😿 No pude obtener los participantes del grupo.')

  let lids = participants.map(p => `['${p.id}']`).join(',\n')

  let respuesta = `🍷 *Lista de LID de este grupo:*\n\n${lids}\n\n🧠 Puedes copiar y pegar esto en:\n*global.lidOwners = [ ... ]*`

  conn.reply(m.chat, respuesta, m)
}

handler.help = ['lid']
handler.tags = ['owner']
handler.command = /^lid|getlids$/i
handler.rowner = true

export default handler
