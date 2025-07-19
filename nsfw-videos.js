import axios from 'axios'
import cheerio from 'cheerio'

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const emoji = '🔞'

  if (!text || !text.includes('hentai.tv')) {
    return m.reply(`${emoji} Ingresa un enlace válido de *hentai.tv* para descargar el video.\n\nEjemplo:\n> *${usedPrefix + command} https://hentai.tv/hentai/sisters-the-last-day-of-summer-chinatsu-episode-3/*`)
  }

  try {
    const res = await axios.get(text)
    const $ = cheerio.load(res.data)

    // Buscar el <source> dentro del <video>
    const videoUrl = $('video source').attr('src') || $('video').attr('src')
    const title = $('title').text().trim()

    if (!videoUrl) {
      return m.reply(`💔 Ooops... No pude encontrar el video en esa página.\nAsegúrate que el link sea un episodio con reproductor.`)
    }

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: `🎬 *${title}*\n\n🔗 Enlace original: ${text}`
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('😿 Hubo un error al procesar el video. Intenta con otro episodio o más tarde.')
  }
}

handler.command = ['hentaivideo', 'descargarhentai']
handler.help = ['hentaivideo <url>']
handler.tags = ['nsfw']
handler.limit = true

export default handler
