import fs from 'fs'
const FILE_DB = './comandos_sticker.json'
let comandos = JSON.parse(fs.existsSync(FILE_DB) ? fs.readFileSync(FILE_DB) : '{}')

let handler = async (m, { text }) => {
  const sticker = m.quoted

  if (!sticker || sticker.mtype !== 'stickerMessage') {
    return m.reply('⚠️ Responde a un *sticker* con:\n.crearcomando nombreDelComando')
  }

  if (!text) {
    return m.reply('❗ Escribe el nombre del comando que quieres asignarle al sticker.\n\nEjemplo:\n.crearcomando menu')
  }

  // Aseguramos que tenga hash
  if (!sticker.msg || !sticker.msg.fileSha256) {
    return m.reply('❌ No se pudo leer el hash del sticker.')
  }

  const hash = sticker.msg.fileSha256.toString('base64')
  comandos[hash] = text.trim()

  fs.writeFileSync(FILE_DB, JSON.stringify(comandos, null, 2))
  m.reply(`✅ Sticker vinculado al comando: *${text}*`)
}

handler.help = ['crearcomando <nombre>']
handler.tags = ['tools']
handler.command = ['crearcomando']
handler.register = true

export default handler
