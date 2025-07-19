import fetch from 'node-fetch'

let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i

let handler = async (m, { args, conn }) => {
  // 🧩 Variables necesarias
  const emoji = '📦'
  const emoji2 = '❌'
  const wait = '⌛ Descargando repositorio...'
  const done = '✅ Descarga completada'
  const error = '⚠️'
  const dev = 'By 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲'

  if (!args[0]) {
    return conn.reply(m.chat, `${emoji} Por favor, ingresa la URL de un repositorio de GitHub que deseas descargar.`, m)
  }

  if (!regex.test(args[0])) {
    await m.react(error)
    return conn.reply(m.chat, `${emoji2} Verifica que la *URL* sea de GitHub.`, m)
  }

  let [_, user, repo] = args[0].match(regex) || []
  let sanitizedRepo = repo.replace(/.git$/, '')
  let repoUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}`
  let zipUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}/zipball`

  await m.react('⏳')
  try {
    conn.reply(m.chat, wait, m)

    let [repoResponse, zipResponse] = await Promise.all([
      fetch(repoUrl),
      fetch(zipUrl),
    ])

    if (!repoResponse.ok || !zipResponse.ok) throw new Error('No se pudo obtener el repositorio.')

    let repoData = await repoResponse.json()
    let filename = zipResponse.headers.get('content-disposition')?.match(/filename="?([^"]+)"?/i)?.[1] || 'repositorio.zip'
    let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745610598914.jpeg'

    let txt = `*乂  G I T H U B  -  D O W N L O A D*\n\n`
    txt += `✩  *Nombre:* ${sanitizedRepo}\n`
    txt += `✩  *Repositorio:* ${user}/${sanitizedRepo}\n`
    txt += `✩  *Creador:* ${repoData.owner?.login || 'Desconocido'}\n`
    txt += `✩  *Descripción:* ${repoData.description || 'Sin descripción disponible'}\n`
    txt += `✩  *Url:* ${args[0]}\n\n`
    txt += `> ${dev}`

    await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
    await conn.sendFile(m.chat, await zipResponse.buffer(), filename, null, m)

    await m.react('✅')
  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, `${emoji2} No se pudo descargar el repositorio. Asegúrate que la URL sea válida y pública.`, m)
    await m.react(error)
  }
}

handler.help = ['gitclone *<url_git>*']
handler.tags = ['descargas']
handler.command = ['gitclone']
handler.group = false
handler.register = true
handler.coin = 3

export default handler
