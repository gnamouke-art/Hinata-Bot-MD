let handler = async (m, { conn }) => {
  if (!m.isGroup) {
    return m.reply(`🚫 *Este comando es exclusivo para mis 👑Owners y solo funciona dentro de grupos.*

🧬 Soportado por:
🐉 𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨 & Light Yagami 💀`)
  }

  const audioUrl = 'https://files.catbox.moe/6d9trd.mp4'

  // Enviar audio como PTT (nota de voz)
  await conn.sendMessage(m.chat, {
    audio: { url: audioUrl },
    mimetype: 'audio/mp4',
    ptt: true
  })

  // Mensaje coqueto y grosero
  await conn.sendMessage(m.chat, {
    text: `🚬 *𝐌𝐞 𝐯𝐨𝐲 𝐩𝐞𝐫𝐫𝐚𝐬...*\n\n💅 *𝐒𝐢𝐠𝐚𝐧 𝐥𝐚𝐦𝐢𝐞𝐧𝐝𝐨 𝐦𝐢 𝐬𝐨𝐦𝐛𝐫𝐚, 𝐛𝐲𝐞 𝐛𝐚𝐛𝐨𝐬𝐚𝐬 💋*`
  })

  await conn.groupLeave(m.chat)
}

handler.help = ['salir']
handler.tags = ['owner']
handler.command = /^(salir|leave|salirdelgrupo)$/i
handler.owner = true
handler.register = true

export default handler
