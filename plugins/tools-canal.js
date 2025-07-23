const { default: makeWASocket, proto, generateWAMessageFromContent } = require('@whiskeysockets/baileys')

let handler = async (m, { conn }) => {
  const texto = `
✨ *¡Bienvenido a Hinata-Bot!* 😉

Aquí tienes acceso al canal oficial del bot.
No olvides unirte para novedades, packs y comandos sucios 🔥

💖 *Hinata* te ama 💖
`

  const link = 'https://whatsapp.com/channel/0029VaHwKsi8ZH2lvA5fsT2A'

  const msg = {
    text: texto.trim(),
    footer: 'Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami',
    buttons: [
      { buttonId: link, buttonText: { displayText: '🔗 Unirme al Canal' }, type: 1 },
      { buttonId: '.menu', buttonText: { displayText: '📖 Ver Menú' }, type: 1 },
      { buttonId: '.grupos', buttonText: { displayText: '👥 Grupos Hinata' }, type: 1 }
    ],
    headerType: 1
  }

  await conn.sendMessage(m.chat, msg, { quoted: m })
}

handler.command = /^canalhinata$/i
handler.tags = ['info']
handler.help = ['canalhinata']
handler.register = false

export default handler
