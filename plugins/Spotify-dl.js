import fetch from "node-fetch"
import yts from "yt-search"

let handler = async (m, { conn, text }) => {
  const fake = { quoted: m }

  if (!text) {
    return conn.reply(m.chat, `⚡ Por favor, ingresa el nombre de una canción para buscar.`, m, fake)
  }

  await m.react('🕒')
  conn.reply(m.chat, `🎧 *Buscando tu canción... Espérame un momento.*`, m, fake)

  try {
    // Hacemos la solicitud a la API
    const response = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`)

    // Verificamos que esté bien la respuesta
    if (!response.ok) throw '❌ La API de Spotify no respondió correctamente.'

    const gyh = await response.json()

    // Validamos que la estructura contenga lo que necesitamos
    if (!gyh?.result?.downloadUrl) throw '❌ No se encontró ninguna canción en la API.'

    // Buscamos también en YouTube para obtener metadatos
    const search = await yts(text)
    if (!search?.videos?.length) throw '❌ No se encontró un video relacionado.'

    const videoInfo = search.videos[0]
    const { title, thumbnail, timestamp: duration, views, url } = videoInfo

    // Creamos el mensaje con audio + metadata
    const doc = {
      audio: { url: gyh.result.downloadUrl },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: url,
          title: title,
          body: `Duración: ${duration} | 🔁 Reproducciones: ${views.toLocaleString()}`,
          sourceUrl: url,
          thumbnailUrl: thumbnail || "https://h.uguu.se/gwCZoshl.jpg",
          renderLargerThumbnail: true
        }
      }
    }

    await conn.sendMessage(m.chat, doc, { quoted: m })
    await m.react('✅')

  } catch (e) {
    console.error('[❌ Error en Spotify]', e)
    await m.react('❌')
    conn.reply(m.chat, '🚫 *Hubo un error al buscar o enviar la canción.*\nPor favor, intenta con otra canción o más tarde.', m, fake)
  }
}

handler.help = ['spotify *<nombre>*']
handler.tags = ['descargas']
handler.command = ['spotify']
handler.register = true

export default handler
