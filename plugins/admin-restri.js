let handler = async (m, { conn, text, isOwner }) => {
  if (!isOwner) throw 'Este comando es solo para mi dueño 🙄'
  global.db.data.settings[conn.user.jid].restrict = true
  m.reply('✅ Restricción activada. Ahora puedo expulsar 🦵💢')
}
handler.help = ['restrict on']
handler.tags = ['owner']
handler.command = /^restrict\s?(on)?$/i
handler.owner = true
export default handler
