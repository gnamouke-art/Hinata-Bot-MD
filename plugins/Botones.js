let handler = async (m, { conn }) => {
  const message = {
    text: `✨ *¡Hola guapo!* Soy *𝐇𝐈𝐍𝐀𝐓𝐀-𝐁𝐎𝐓*. ¿Qué deseas hacer hoy? 😏

Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami`,
    footer: '👑 Owner',
    buttons: [
      { buttonId: '.menu', buttonText: { displayText: '📜 Ver Menú' }, type: 1 },
      { buttonId: '.estado', buttonText: { displayText: '📊 Estado Bot' }, type: 1 }
    ],
    headerType: 1
  }
  await conn.sendMessage(m.chat, message, { quoted: m })
}

handler.command = /^hinatamenu$/i
export default handler
