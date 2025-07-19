import { search, download } from 'aptoide-scraper'

let handler = async (m, { conn, text }) => {
  const emoji = '📲'
  const emoji2 = '❌'
  const rwait = '⏳'
  const done = '✅'
  const msm = '⚠️'
  
  // Contacto falso para enviar el .apk
  const fkontak = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      remoteJid: 'status@broadcast'
    },
    message: {
      contactMessage: {
        displayName: 'Light Yagami Bot',
        vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Light Yagami Bot\nEND:VCARD'
      }
    }
  }

  if (!text) {
    return conn.reply(m.chat, `${emoji} *Escribe el nombre de la aplicación que deseas descargar.*\n\n📌 *Ejemplo:* .apk Spotify`, m)
  }

  try {
    await m.react(rwait)
    await conn.reply(m.chat, `${emoji} *Buscando "${text}" en Aptoide...*`, m)

    let searchA = await search(text)

    if (!searchA || !searchA.length) {
      return conn.reply(m.chat, `${emoji2} *No encontré ninguna aplicación con ese nombre.*`, m)
    }

    let app = await download(searchA[0].id)

    let texto = `*╭───────────────⬣*\n`
    texto += `*│  💫 A P K - F I N D E R 💫*\n`
    texto += `*╰───────────────⬣*\n\n`
    texto += `🍬 *Nombre:* ${app.name}\n`
    texto += `📦 *Paquete:* ${app.package}\n`
    texto += `📅 *Actualizado:* ${app.lastup}\n`
    texto += `💾 *Tamaño:* ${app.size}`

    await conn.sendFile(m.chat, app.icon, 'icon.jpg', texto, m)

    // Validar peso
    if (app.size.includes('GB') || parseFloat(app.size.replace(' MB', '')) > 999) {
      await m.react('⚠️')
      return conn.reply(m.chat, `${emoji2} *La aplicación es demasiado pesada para enviarla por aquí.*`, m)
    }

    // Enviar archivo APK
    await conn.sendMessage(
      m.chat,
      {
        document: { url: app.dllink },
        mimetype: 'application/vnd.android.package-archive',
        fileName: `${app.name}.apk`,
        caption: `✨ *Aquí tienes tu APK, que lo disfrutes~*`
      },
      { quoted: fkontak }
    )

    await m.react(done)
  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, `${msm} *Ocurrió un error al buscar o descargar la app.*`, m)
    await m.react('💔')
  }
}

handler.help = ['apk <nombre>']
handler.tags = ['descargas']
handler.command = ['apk', 'modapk', 'aptoide']
handler.register = true
handler.coin = 0

export default handler
