import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
  let url = text.trim()
  if (!url) throw `📌 *Ejemplo de uso:*\n${usedPrefix}${command} https://www.tiktok.com/@neotokyo/video/12345`
  
  let match = url.match(/(https?:\/\/(www\.|vt\.)?tiktok\.com\/[^\s]+)/i)
  if (!match) throw '❌ *Enlace inválido de TikTok.*'

  try {
    let res = await fetch(`https://api.lolhuman.xyz/api/tiktok?apikey=GataDios&url=${match[1]}`)
    let json = await res.json()

    if (!json.result?.video || !json.result?.video?.[0]) throw '⚠️ No se pudo obtener el video.'

    let cap = `🎵 *Descarga exitosa*\n\n🌐 *Usuario:* ${json.result.author?.username || '-'}\n📝 *Descripción:* ${json.result.caption || 'Sin descripción'}\n\n_Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami_`
    
    await conn.sendFile(m.chat, json.result.video[0], 'tiktok.mp4', cap, m)
    
  } catch (e) {
    console.error('[ERROR TIKTOK]', e)
    throw '🚫 Error al procesar el video.'
  }
}

handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = [
  /^((tt|tiktok)(dl)?|https:\/\/(?:www\.|vt\.)?tiktok\.com)/i,
  /^tiktok\s+(https?:\/\/[^\s]+)/i
]
handler.limit = true
handler.register = true

export default handler
