let handler = async (m, { conn }) => {
  const canal = 'https://whatsapp.com/channel/0029VaHwKsi8ZH2IvA5fsT2A' // reemplaza por tu canal

  const texto = `✨ *¡Bienvenido a Hinata-Bot!* 😏

Aquí tienes acceso al canal oficial del bot.
No olvides unirte para novedades, packs y comandos sucios 🔥

💖 *Hinata* te ama 💖`

  await conn.sendMessage(m.chat, {
    text: texto + `\n\n👉 ${canal}`,
    footer: 'Haz clic en "Ver canal" abajo 👇',
    contextInfo: {
      externalAdReply: {
        title: 'Canal oficial de Hinata-Bot 💜',
        body: 'Novedades, packs y más',
        thumbnailUrl: 'https://telegra.ph/file/your-image.jpg', // opcional
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: canal
      }
    }
  }, { quoted: m })
}

handler.command = /^canalhinata$/i
export default handler
