import fs from "fs"
import path from "path"
import fetch from "node-fetch"
import Jimp from "jimp"
import FormData from "form-data"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const handler = async (m, { conn }) => {
  try {
    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || q.mediaType || ""

    if (!/^image\/(jpe?g|png)$/.test(mime)) {
      return m.reply('🪐 *Responde a una imagen JPG o PNG para mejorarla.*')
    }

    await conn.sendMessage(m.chat, {
      text: `⏳ *Mejorando tu imagen...*\n_Por favor, espera unos segundos..._\n\n> 🛠️ *Desarrollado por* 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami`,
    }, { quoted: m })

    const buffer = await q.download()
    const image = await Jimp.read(buffer)
    image.resize(800, Jimp.AUTO)

    const tmp = path.join(__dirname, `tmp_${Date.now()}.jpg`)
    await image.writeAsync(tmp)

    const uplink = await uploadToUguu(tmp)
    if (!uplink) throw new Error('😿 *No se pudo subir la imagen.*')

    const enhanced = await upscaleImage(uplink)
    await conn.sendFile(m.chat, enhanced, 'hd.jpg', `✨ *Aquí está tu imagen mejorada.*`, m)
    await conn.sendMessage(m.chat, {
      text: '✅ *Imagen procesada correctamente.*',
    }, { quoted: m })

  } catch (err) {
    conn.reply(m.chat, `❌ *Ocurrió un error:*\n${err.message}`, m)
  }
}

handler.help = ['hd', 'remini', 'upscale']
handler.tags = ['tools']
handler.command = ['hd', 'remini', 'upscale']
handler.register = true
handler.limit = 1

export default handler

async function uploadToUguu(filePath) {
  const form = new FormData()
  form.append("files[]", fs.createReadStream(filePath))

  try {
    const res = await fetch("https://uguu.se/upload.php", {
      method: "POST",
      headers: form.getHeaders(),
      body: form
    })

    const json = await res.json()
    await fs.promises.unlink(filePath)
    return json.files?.[0]?.url
  } catch {
    await fs.promises.unlink(filePath)
    return null
  }
}

async function upscaleImage(url) {
  const res = await fetch(`https://api.siputzx.my.id/api/iloveimg/upscale?image=${encodeURIComponent(url)}`)
  if (!res.ok) throw new Error("🚫 *No se pudo mejorar la imagen desde el servidor.*")
  return await res.buffer()
                        }
