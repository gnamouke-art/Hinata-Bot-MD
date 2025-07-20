import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""

    if (!mime.startsWith('image')) {
      return m.reply(`⚠️ *Responde a una imagen para mejorarla en HD.*\n\n✨ _Este comando usa inteligencia artificial para mejorar imágenes borrosas, pixeladas o de baja calidad._`)
    }

    await m.react('🧠') // Cargando...

    let img = await q.download?.()
    if (!img) return m.reply(`❌ *No se pudo descargar la imagen.*`)

    let url = await uploadImage(img)
    let res = await fetch(`https://api.neoxr.eu/api/remini?image=${encodeURIComponent(url)}&apikey=GataDios`)
    let json = await res.json()

    if (!json.status || !json.data?.url) {
      return m.reply('❌ *No se pudo mejorar la imagen.*')
    }

    await conn.sendFile(m.chat, json.data.url, 'hd.jpg',
      `✅ *Imagen mejorada en HD*\n\n✨ _¿Ves la diferencia?_ Ahora se ve con mejor definición 😎\n\n_Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami_`, m)

    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.react('❌')
    m.reply(`❌ *Ocurrió un error inesperado:*\n${e.message || e}`)
  }
}

handler.help = ['hd', 'remini', 'enhance']
handler.tags = ['tools']
handler.command = ['hd', 'remini', 'enhance']
handler.register = true
handler.limit = 1

export default handler
