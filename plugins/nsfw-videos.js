import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, args }) => {
  let url = args[0]
  if (!url || !url.includes('view_video.php?viewkey=')) {
    return m.reply('💔 Ooops... El link no es válido. Asegúrate que sea un video directo de Pornhub.\n\nEjemplo:\n.porndownload https://www.pornhub.com/view_video.php?viewkey=ph5a12e5b7c77e5')
  }

  let fileName = `phvideo-${Date.now()}.mp4`
  let filePath = path.join('/tmp', fileName)

  m.reply('⏳ Descargando el video desde Pornhub, espera un poco...')

  const ytdlp = spawn('yt-dlp', ['-o', filePath, url])

  ytdlp.stderr.on('data', data => {
    console.log('yt-dlp error:', data.toString())
  })

  ytdlp.on('close', async code => {
    if (code === 0 && fs.existsSync(filePath)) {
      await conn.sendFile(m.chat, filePath, fileName, `✅ Video descargado desde:\n${url}`, m)
      fs.unlinkSync(filePath)
    } else {
      m.reply('💔 Ooops... No pude descargar el video. Asegúrate que el link sea válido.')
    }
  })
}

handler.command = ['porndownload']
handler.tags = ['nsfw']
handler.help = ['porndownload <link>']
handler.premium = true

export default handler
