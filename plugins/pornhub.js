import { exec } from 'child_process'
import fetch from 'node-fetch'
import cheerio from 'cheerio'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('🔞 Ingresa un término para buscar contenido NSFW.\n\nEjemplo: *.pornsearch mia khalifa*')

  try {
    let searchUrl = 'https://www.pornhub.com/video/search?search=' + encodeURIComponent(text)
    let res = await fetch(searchUrl)
    let html = await res.text()
    let $ = cheerio.load(html)

    let results = []
    $('li.pcVideoListItem').each((i, el) => {
      let title = $(el).find('span.title a').text().trim()
      let link = 'https://www.pornhub.com' + $(el).find('a').attr('href')
      let views = $(el).find('.views').text().trim()
      if (title && link) results.push({ title, link, views })
    })

    if (!results.length) return m.reply('😿 No se encontraron resultados...')

    let message = `🔞 *Resultados NSFW de:* _${text}_\n\n`
    results.slice(0, 5).forEach((v, i) => {
      message += `*${i + 1}.* 🎥 *${v.title}*\n👁️ ${v.views}\n🔗 ${v.link}\n\n`
    })

    m.reply(message)
  } catch (e) {
    console.error(e)
    m.reply('💔 Ooops... ocurrió un error al buscar.')
  }
}

handler.command = ['pornsearch', 'phsearch']
handler.tags = ['nsfw']
handler.help = ['pornsearch <término>']
handler.premium = true
handler.limit = true

export default handler
