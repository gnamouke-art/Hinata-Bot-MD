let handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, {
    text: `✨ *¡Hola guapo!* Soy 𝐇𝐈𝐍𝐀𝐓𝐀-𝐁𝐎𝐓. ¿Qué deseas hacer hoy? 😏`,
    footer: 'Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami',
    buttons: [
      { buttonId: '.menu', buttonText: { displayText: '📜 Ver Menú' }, type: 1 },
      { buttonId: '.estado', buttonText: { displayText: '📊 Estado Bot' }, type: 1 },
      { buttonId: '.owner', buttonText: { displayText: '👑 Owner' }, type: 1 }
    ],
    headerType: 1
  }, { quoted: m })
}

handler.command = /^hinatamenu|menuhinata|botmenu$/i
export default handler
