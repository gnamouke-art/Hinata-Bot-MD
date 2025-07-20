let handler = async (m, { conn, text, sender }) => {
  let id = text?.trim()
  if (!id) id = m.chat
  if (!id.endsWith('@g.us')) return m.reply('❌ Debes dar un ID válido de grupo (termina en @g.us) o usar el comando dentro de un grupo.')

  let groupMetadata
  try {
    groupMetadata = await conn.groupMetadata(id)
  } catch {
    return m.reply('❌ El bot no está en ese grupo o el ID es inválido.')
  }

  const groupName = groupMetadata.subject || 'grupo desconocido'

  // 1. Enviar audio sexy
  const audioUrl = 'https://files.catbox.moe/6d9trd.mp4'
  await conn.sendMessage(id, {
    audio: { url: audioUrl },
    mimetype: 'audio/mp4',
    ptt: true
  })

  // 2. Mensaje grosero en el grupo
  await conn.sendMessage(id, {
    text: `
🚪✨ 𝐋𝐥𝐞𝐠𝐨́ 𝐥𝐚 𝐝𝐞𝐬𝐩𝐞𝐝𝐢𝐝𝐚...

💋 *𝐌𝐞 𝐯𝐨𝐲 𝐝𝐞 𝐞𝐬𝐭𝐞 𝐜𝐢𝐫𝐜𝐨. 𝐁𝐮𝐬𝐪𝐮𝐞𝐧 𝐨𝐭𝐫𝐚 𝐝𝐢𝐨𝐬𝐚 𝐪𝐮𝐞 𝐥𝐨𝐬 𝐚𝐭𝐞𝐧𝐝𝐚... 🖕*

🔞 *𝐍𝐨 𝐦𝐞 𝐞𝐱𝐭𝐫𝐚ñ𝐞𝐧 𝐩𝐞𝐫𝐝𝐞𝐝𝐨𝐫𝐞𝐬, 𝐛𝐲𝐞.* 💄
    `.trim(),
    mentions: [m.sender]
  })

  // 3. Salirse del grupo
  await conn.groupLeave(id)

  // 4. Responder al owner en privado
  await conn.reply(sender, `✅ El bot ha salido correctamente del grupo:\n\n📛 Nombre: ${groupName}\n🆔 ID: ${id}`, null)
}

handler.help = ['salir [id del grupo]']
handler.tags = ['owner']
handler.command = /^(salir|leavegc|salirdelgrupo|leave)$/i
handler.owner = true
handler.register = true

export default handler
