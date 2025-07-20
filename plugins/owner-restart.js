import { spawn } from 'child_process'

let handler = async (m, { conn, isROwner }) => {
  if (!process.send) throw '⚠️ Usa: *node index.js* para que esto funcione correctamente.'

  if (conn.user.jid === conn.user.jid) {
    const porcentajes = ["🔄 Reiniciando... 10%", "🔄 Reiniciando... 30%", "🔄 Reiniciando... 50%", "🔄 Reiniciando... 80%", "✅ Reiniciando... 100%"]
    const { key } = await conn.sendMessage(m.chat, { text: '☁️ *Iniciando reinicio del sistema...*' }, { quoted: m })

    for (let i = 0; i < porcentajes.length; i++) {
      await delay(1000)
      await conn.sendMessage(m.chat, { text: porcentajes[i], edit: key }, { quoted: m })
    }

    await delay(500)
    await conn.sendMessage(m.chat, {
      text: `🚀 *El bot se está reiniciando...*\n🌐 Por favor espera unos segundos para que vuelva a estar disponible.`,
      edit: key
    }, { quoted: m })

    process.exit(0)
  }
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart', 'reiniciar']
handler.owner = true
export default handler

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
