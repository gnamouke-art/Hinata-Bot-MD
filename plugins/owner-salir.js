let handler = async (m, { conn, text }) => {
  const id = (text?.trim() && text.endsWith('@g.us')) ? text.trim() : m.chat

  try {
    // Verifica si está en el grupo
    const groupMetadata = await conn.groupMetadata(id)
  } catch {
    return m.reply('❌ El bot no está en ese grupo o el ID es inválido.')
  }

  // Enviar audio como nota de voz
  const audioUrl = 'https://files.catbox.moe/6d9trd.mp4'
  await conn.sendMessage(id, {
    audio: { url: audioUrl },
    mimetype: 'audio/mp4',
    ptt: true
  })

  // Enviar mensaje coqueto y grosero
  await conn.sendMessage(id, {
    text: `
🚪✨ 𝐋𝐥𝐞𝐠𝐨́ 𝐥𝐚 𝐡𝐨𝐫𝐚...

💋 *𝐌𝐞 𝐯𝐨𝐲, 𝐛𝐚𝐛𝐨𝐬𝐨𝐬. 𝐁𝐮𝐬𝐪𝐮𝐞𝐧 𝐨𝐭𝐫𝐚 𝐝𝐢𝐨𝐬𝐚 𝐪𝐮𝐞 𝐥𝐨𝐬 𝐚𝐭𝐞𝐧𝐝𝐚.* 🖕💄

🔞 *𝐍𝐨 𝐦𝐞 𝐞𝐱𝐭𝐫𝐚ñ𝐞𝐧, 𝐩𝐞𝐫𝐝𝐞𝐝𝐨𝐫𝐞𝐬.*
`.trim(),
    mentions: [m.sender]
  })

  // Salir del grupo
  await conn.groupLeave(id)
}

handler.help = ['salir [id de grupo]']
handler.tags = ['owner']
handler.command = /^(salir|leavegc|salirdelgrupo|leave)$/i
handler.owner = true
handler.register = true

export default handler
