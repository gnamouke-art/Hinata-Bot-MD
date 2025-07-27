import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  let url = text?.trim() || m.text?.trim()

  // Detectar si es solo .tiktok, tiktok o link sin contexto
  if (!url || !url.match(/https?:\/\/(?:www\.)?(?:vt|tiktok)\.com\/[^\s]+/i)) {
    return conn.reply(m.chat, `🎀 *Mami dime qué quieres*\n\n💌 Manda el link del video para descargar, bebé… no soy adivina 😏`, m)
  }

  try {
    let res = await fetch(`https://api.lolhuman.xyz/api/tiktok?apikey=GataDios&url=${url}`)
    let json = await res.json()

    if (!json.result?.video?.[0]) throw '❌ No se pudo descargar el video.'

    let caption = `✨ *Descarga TikTok Exitosa*\n\n👤 *Usuario:* ${json.result.author?.username || '-'}\n📝 *Descripción:* ${json.result.caption || 'Sin descripción'}\n\n💖 Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami`

    await conn.sendFile(m.chat, json.result.video[0], 'tiktok.mp4', caption, m)

  } catch (e) {
    console.error(e)
    return conn.reply(m.chat, '⚠️ Ocurrió un error al procesar el video, mi cielo 💔', m)
  }
}

// Funciona con y sin prefix, incluso si solo mandan el link
handler.command = [
  /^\.?tiktok$/i,
  /^tiktok\s+(https?:\/\/[^\s]+)/i,
  /https?:\/\/(?:www\.)?(?:vt|tiktok)\.com\/[^\s]+/i
]
handler.customPrefix = /^(tiktok)$/i
handler.exp = 30
handler.limit = true
handler.register = true
handler.group = false

export default handler
