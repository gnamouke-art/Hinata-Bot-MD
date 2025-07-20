import fs from 'fs'

const FILE_DB = './comandos_sticker.json'
let comandos = JSON.parse(fs.existsSync(FILE_DB) ? fs.readFileSync(FILE_DB) : '{}')

const handler = async (m, { text, conn }) => {
  const sticker = m.quoted?.stickerMessage || m.quoted?.m?.mimetype?.includes('webp') ? m.quoted : null
  if (!sticker) return m.reply('⚠️ *Responde a un sticker para convertirlo en comando.*')

  if (!text) return m.reply('✨ *Escribe el nombre que tendrá el sticker comando.*\n\n_Ejemplo:_ `.crearcomando menu`')

  const media = await sticker.download()
  const mediaHash = sticker.fileSha256.toString('base64')

  comandos[mediaHash] = text.trim()
  fs.writeFileSync(FILE_DB, JSON.stringify(comandos, null, 2))

  m.reply(`✅ *Sticker guardado como comando:* \`${text.trim()}\`\n\nReenvía este sticker y se ejecutará ese comando.`)
}

handler.command = /^crearcomando$/i
handler.tags = ['tools']
handler.help = ['crearcomando <nombre>']
handler.register = true

export default handler
