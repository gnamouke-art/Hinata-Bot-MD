let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('🍷 Este comando solo funciona en grupos, mi ciela.')

  let metadata = await conn.groupMetadata(m.chat).catch(() => null)
  if (!metadata) return m.reply('😿 No pude obtener la info del grupo.')

  let participantes = metadata.participants || []

  let lista = participantes.map(p => {
    let nombre = (p.name || conn.getName(p.id)) || 'Sin nombre'
    return `['${p.id}'], // ${nombre}`
  }).join('\n')

  let respuesta = `🍷 *Lista de LID del grupo con nombres:*\n\n${lista}\n\n🧠 Puedes copiar esto y pegar en:\n*global.lidOwners = [ ... ]*`

  conn.reply(m.chat, respuesta, m)
}

handler.help = ['lids']
handler.tags = ['owner']
handler.command = /^lids|getlids$/i
handler.rowner = true

export default handler
