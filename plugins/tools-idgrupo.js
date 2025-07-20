let handler = async (m, { text }) => {
  const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i
  const match = text?.match(linkRegex)

  if (!match) {
    return m.reply(`❌ Debes enviar un link de grupo válido.

📌 Ejemplo:
.idgrupo https://chat.whatsapp.com/abc123def456ghi789`)
  }

  const inviteCode = match[1]
  const groupJid = `${inviteCode}@g.us`

  m.reply(`✨ 𝑬𝒏𝒍𝒂𝒄𝒆 𝒅𝒆 𝒈𝒓𝒖𝒑𝒐 𝒅𝒆𝒕𝒆𝒄𝒕𝒂𝒅𝒐:

🆔 𝑰𝑫 del grupo: ${groupJid}
🔗 Link: https://chat.whatsapp.com/${inviteCode}

Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & Light Yagami`)
}

handler.help = ['idgrupo <link>']
handler.tags = ['tools']
handler.command = /^idgrupo$/i
handler.register = true

export default handler
