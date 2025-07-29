let handler = async (m, { conn, participants, isGroup }) => {
  if (!isGroup) return m.reply('🍷 Este comando solo funciona en grupos, mi ciela.')

  let lids = participants.map(p => `['${p.id}']`).join(',\n')

  let respuesta = `🍷 *Lista de LID de este grupo:*\n\n${lids}\n\n🧠 Puedes copiar y pegar esto en:\n*global.lidOwners = [ ... ]*`

  conn.reply(m.chat, respuesta, m)
}

handler.help = ['lids']
handler.tags = ['owner']
handler.command = /^lids|getlids$/i
handler.rowner = true // solo para dueño real

export default handler
