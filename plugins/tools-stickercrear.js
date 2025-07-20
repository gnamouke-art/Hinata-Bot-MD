import fs from 'fs'
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

const FILE_DB = './comandos_sticker.json'
let comandos = JSON.parse(fs.existsSync(FILE_DB) ? fs.readFileSync(FILE_DB) : '{}')

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  let stickerMessage = m.quoted && m.quoted.mtype === 'stickerMessage' ? m.quoted : null
  let [comando, url] = text.split('/')

  if (!stickerMessage && !url) return m.reply(`⚠️ Responde a un sticker o usa el comando con una URL de imagen.\n\n📌 Ejemplo:\n${usedPrefix + command} menu/https://files.catbox.moe/7wlljk.jpg`)

  if (!comando) return m.reply('❗Escribe el nombre del comando que quieres asignarle al sticker.')

  let hash
  if (stickerMessage?.msg?.fileSha256) {
    hash = stickerMessage.msg.fileSha256.toString('base64')
  } else if (url) {
    let res = await fetch(url)
    if (!res.ok) return m.reply('❌ No se pudo descargar la imagen.')
    let buffer = await res.buffer()
    hash = require('crypto').createHash('sha256').update(buffer).digest('base64')

    // convierte la imagen a sticker y la envía
    let stickerBuffer = await sticker(buffer, false, {}, { packname: "Sticker Comando", author: "🐉NeoTokyo Beats🐲" })
    await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
  }

  if (!hash) return m.reply('❌ No se pudo generar hash.')

  comandos[hash] = comando.trim().replace(/^\./, '')
  fs.writeFileSync(FILE_DB, JSON.stringify(comandos, null, 2))

  m.reply(`✅ Sticker vinculado al comando: *.${comando.trim()}*`)
}

handler.help = ['crearcomando']
handler.tags = ['tools']
handler.command = /^crearcomando$/i
handler.register = true

export default handler
