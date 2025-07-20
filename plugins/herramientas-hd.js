import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

const handler = async (m, { conn }) => {
  try {
    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || q.mediaType || ""
    if (!mime.startsWith('image')) return m.reply(`⚠️ *Responde a una imagen para mejorarla en HD.*`)

    await m.react('⌛')

    const img = await q.download?.()
    if (!img) return m.reply(`❌ *No se pudo descargar la imagen.*`)
    const url = await uploadImage(img)

    let hdImg = null

    // API 1 - Neoxr
    try {
      const res = await fetch(`https://api.neoxr.eu/api/remini?image=${encodeURIComponent(url)}&apikey=GataDios`)
      const json = await res.json()
      if (json.status && json.data?.url) hdImg = json.data.url
    } catch {}

    // API 2 - VihangaYT
    if (!hdImg) {
      try {
        const res = await fetch(`https://vihangayt.me/tools/remini?url=${encodeURIComponent(url)}`)
        const json = await res.json()
        if (json.status && json.data) hdImg = json.data
      } catch {}
    }

    // API 3 - LOLHuman
    if (!hdImg) {
      try {
        const res = await fetch(`https://api.lolhuman.xyz/api/remini?apikey=GataDios&img=${encodeURIComponent(url)}`)
        const json = await res.json()
        if (json.status == 200 && json.result) hdImg = json.result
      } catch {}
    }

    if (!hdImg) {
      await m.react('❌')
      return m.reply(`❌ *Ninguna API devolvió una imagen HD.*\n_Probá más tarde o cambia la imagen._`)
    }

    await conn.sendFile(m.chat, hdImg, 'hd.jpg', `✅ *Aquí está tu imagen mejorada en HD* 😎\n\n_Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami_`, m)
    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('❌')
    m.reply(`❌ *Error inesperado:*\n${e.message || e}`)
  }
}

handler.help = ['hd', 'remini', 'enhance']
handler.tags = ['tools']
handler.command = ['hd', 'remini', 'enhance']
handler.register = true
handler.limit = 1

export default handler
