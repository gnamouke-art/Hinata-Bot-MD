let handler = async (m, { conn, args, isOwner }) => {
  if (!isOwner) throw 'Este comando es solo para mis dioses, no insistas 🙄'

  const setting = global.db.data.settings[conn.user.jid] || {}

  if (!args[0]) {
    return m.reply(`📦 *Restricción actual:* ${setting.restrict ? 'activada ✅' : 'desactivada ❌'}\n\nUsa:\n- .restrict enable\n- .restrict disable`)
  }

  if (args[0] === 'enable') {
    setting.restrict = true
    m.reply('✅ *Restricción activada.* Ahora puedo expulsar a los pecadores 🔥')
  } else if (args[0] === 'disable') {
    setting.restrict = false
    m.reply('❌ *Restricción desactivada.* Ya no expulsaré a nadie, todos libres como el viento 🍃')
  } else {
    m.reply('⚠️ Uso incorrecto. Escribe:\n.restrict enable\n.restrict disable')
  }
}

handler.help = ['restrict <enable|disable>']
handler.tags = ['owner']
handler.command = /^restrict$/i
handler.rowner = true

export default handler
