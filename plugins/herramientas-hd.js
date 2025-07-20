import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

const handler = async (m, { conn }) => {
  try {
    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || q.mediaType || ""
    if (!mime.startsWith('image')) return m.reply(`⚠️ *Responde a una imagen para mejorarla en HD.*`)
    
    await m.react('⌛')

    const img = await q.download?.()
    if (!img) return m.reply(`❌ *Error al descargar la imagen.*`)
    
    const url = await uploadImage(img)
    const res = await fetch(`https://vihangayt.me/tools/remini?url=${encodeURIComponent(url)}`)
    const json = await res.json()

    if (!json.status || !json.data) {
      return m.reply(`❌ *La API no devolvió imagen HD.*\n*Error:* ${json.message || JSON.stringify(json)}`)
    }

    await conn.sendFile(m.chat, json.data, 'hd.jpg', `✅ *Aquí está tu imagen mejorada en HD* 😎\n\n_Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami_`, m)
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
