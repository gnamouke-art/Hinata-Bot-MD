// 🌟 Comando .init con verificación de propietario del canal
// 🐉 Desarrollado por NeoTokyo Beats & light Yagami 🐲

let handler = async (m, { conn }) => {
  try {
    const metadata = await conn.groupMetadata(m.chat)
    const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
    const botInGroup = metadata.participants.find(p => p.id === botNumber)

    if (!botInGroup?.admin) {
      return conn.reply(m.chat, `⚠️ No soy admin aquí, no puedo ejecutar este comando.`, m)
    }

    if (!botInGroup?.isSuperAdmin) {
      return conn.reply(m.chat, `❌ No soy el *propietario* del canal, solo admin.\nAsí que no puedo usar \`.init\` aquí sin perder privilegios, tontito 💔`, m)
    }

    await conn.sendMessage(m.chat, {
      text: `✅ Canal iniciado correctamente con poderes divinos 💫\nAhora puedo dejar de seguir o administrar sin castigo.`,
    })
    // Aquí va tu lógica real de init...
    
  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `❌ Hubo un error al intentar usar .init\n> ${e}`, m)
  }
}

handler.command = /^init$/i
handler.group = true
export default handler
