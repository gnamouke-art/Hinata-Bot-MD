const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, isOwner }) => {
  if (!isOwner) return m.reply(`🚫 *Este comando es solo para mis 👑Owners*\n\n💠 *Uso exclusivo en grupos y con permisos.*\n\nDesarrollado por 🐉NeoTokyo Beats🐲 & Light Yagami`)

  let code = text.match(linkRegex)?.[1]
  if (!code) return m.reply(`🤨 ¿Y el enlace?\n\n📌 *Uso correcto:*\n.join <link del grupo>`)

  try {
    let groupId = await conn.groupAcceptInvite(code)
    await new Promise(r => setTimeout(r, 2000))

    // Nuevo audio al entrar
    let audioUrl = 'https://files.catbox.moe/az5jiy.mp4'
    await conn.sendMessage(groupId, {
      audio: { url: audioUrl },
      mimetype: 'audio/mp4',
      ptt: true
    })

    // Mensaje coqueto
    await conn.sendMessage(groupId, {
      text: `🌸 *Ya llegó su diosa Hinata...*\n\n✨ El bot ha entrado en modo sensual y destructivo 😈`,
    })

    await m.reply('✅ ¡Me uní al grupo con éxito, mi rey 👑!')
  } catch (e) {
    console.error(e)
    m.reply('❌ No pude unirme al grupo. ¿Seguro que el link es válido?')
  }
}

handler.help = ['join <link>']
handler.tags = ['owner']
handler.command = /^join|unete|entrar|unirse$/i
handler.owner = true
export default handler
