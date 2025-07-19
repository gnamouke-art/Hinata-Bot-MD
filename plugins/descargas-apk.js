import { search, download } from 'aptoide-scraper'

let handler = async (m, { conn, text }) => {
  // 🌟 Variables decoradas
  const emoji = '🎀'
  const emoji2 = '🚫'
  const rwait = '⌛'
  const done = '✨'
  const msm = '⚠️'
  const fkontak = {
    key: {
      participants: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'Hii~'
    },
    message: {
      contactMessage: {
        displayName: 'Light Yagami Bot ✨',
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Light Yagami Bot\nORG:Apk Service;\nTEL;waid=1234567890:+1234567890\nEND:VCARD`
      }
    }
  }

  if (!text) {
    return conn.reply(m.chat, `${emoji} *Por favor, dime el nombre de la aplicación que deseas buscar.*\n\n📌 _Ejemplo:_ *.apk Subway Surfers*`, m)
  }

  try {
    await m.react(rwait)
    await conn.reply(m.chat, `${emoji} *Buscando la app "${text}" en Aptoide...*`, m)

    let searchA = await search(text)

    if (!searchA || !searchA.length) {
      return conn.reply(m.chat, `${emoji2} *No se encontró ninguna app con ese nombre~.*`, m)
    }

    let data5 = await download(searchA[0].id)

    let txt = `╭───────────────⬣\n`
    txt += `│  *💫 A P T O I D E - D O W N L O A D 💫*\n`
    txt += `╰───────────────⬣\n\n`
    txt += `🍬 *Nombre:* ${data5.name}\n`
    txt += `📦 *Paquete:* ${data5.package}\n`
    txt += `📅 *Actualización:* ${data5.lastup}\n`
    txt += `💾 *Tamaño:* ${data5.size}\n\n`
    txt += `📥 *Enviando archivo...*`

    await conn.sendFile(m.chat, data5.icon, 'app.jpg', txt, m)

    // Validar si es muy pesado
    if (data5.size.includes('GB') || parseFloat(data5.size.replace(' MB', '')) > 999) {
      await m.react('⚠️')
      return conn.reply(m.chat, `${emoji2} *Esta app es demasiado pesada para enviarla directamente 💔*`, m)
    }

    // Envío del archivo APK
    await conn.sendMessage(
      m.chat,
      {
        document: { url: data5.dllink },
        mimetype: 'application/vnd.android.package-archive',
        fileName: `${data5.name}.apk`,
        caption: `✨ ¡Aquí tienes tu archivo *${data5.name}*!`
      },
      { quoted: fkontak }
    )

    await m.react(done)
  } catch (e) {
    console.error(e)
    await m.react('💔')
    return conn.reply(m.chat, `${msm} *Ocurrió un error inesperado al intentar descargar la app.*`, m)
  }
}

handler.tags = ['descargas']
handler.help = ['apk', 'modapk', 'aptoide']
handler.command = ['apk', 'modapk', 'aptoide']
handler.register = true
handler.coin = 5

export default handler
