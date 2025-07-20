import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || q.mediaType || ""

    if (!mime.startsWith('image')) {
      return m.reply(`⚠️ *Responde a una imagen para mejorarla en HD.*`)
    }

    await m.react('⌛')  // Aviso de proceso

    const imgBuffer = await q.download?.()
    if (!imgBuffer) return m.reply(`❌ *Error al descargar la imagen.*`)

    const imageUrl = await uploadImage(imgBuffer)
    if (!imageUrl) return m.reply(`❌ *No se pudo subir la imagen para procesamiento.*`)

    const res = await fetch(`https://api.neoxr.eu/api/remini?image=${encodeURIComponent(imageUrl)}&apikey=GataDios`)
    const json = await res.json()

    // Debug temporal: descomenta para ver qué responde el API
    // console.log('REMINI RES:', JSON.stringify(json, null, 2))

    if (!json.status || !json.data || !json.data.url) {
      const errMsg = json.error || JSON.stringify(json)
      return m.reply(`❌ *La API no devolvió imagen HD.*\n*Error:* ${errMsg}`)
    }

    await conn.sendFile(m.chat, json.data.url, 'hd.jpg',
      `✅ *Aquí está tu imagen mejorada en HD* 😎\n\n_Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami_`, m)

    await m.react('✅')
  } catch (e) {
    console.error('HD-Enhance Error:', e)
    await m.react('❌')
    m.reply(`❌ *Ocurrió un error inesperado:*\n${e.message || e}`)
  }
}

handler.help = ['hd', 'remini', 'enhance']
handler.tags = ['tools']
handler.command = ['hd','remini','enhance']
handler.register = true
handler.limit = 1

export default handler
