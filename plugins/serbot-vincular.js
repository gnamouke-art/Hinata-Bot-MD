// plugins/vincular.js
import fs from 'fs'
import path from 'path'
import { makeWASocket } from '../lib/simple.js'
import pino from 'pino'
import { useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys'

const codesPath = './src/JSON/codes-subbot.json'
const subBotFolder = './hinata-SubBots'
const logger = pino({ level: 'silent' })

let handler = async (m, { conn, args }) => {
  let code = (args[0] || '').trim().toUpperCase()
  if (!/^[A-Z]{4}-\d{4}$/.test(code)) {
    return m.reply('❌ Formato inválido. Usa `.vincular WZVE-1234`')
  }

  if (!fs.existsSync(codesPath)) return m.reply('❌ No hay códigos activos.')
  let db = JSON.parse(fs.readFileSync(codesPath))

  if (!db[code]) return m.reply('❌ Código no encontrado o ya fue usado.')

  // ⚙️ Crear carpeta de sesión del subbot
  let id = m.sender.split('@')[0]
  let sessionPath = path.join(subBotFolder, id)
  if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath, { recursive: true })

  // ❌ Borrar código (solo se usa una vez)
  delete db[code]
  fs.writeFileSync(codesPath, JSON.stringify(db, null, 2))

  // 🤖 Autoconexión
  const { state, saveCreds } = await useMultiFileAuthState(sessionPath)
  const version = await fetchLatestBaileysVersion()
  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger)
    },
    browser: ['Hinata SubBot', 'Chrome', '1.0.0'],
    logger
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401
      if (shouldReconnect) {
        await handler(m, { conn, args }) // reconecta automáticamente
      }
    } else if (connection === 'open') {
      conn.reply(m.chat, `✅ Sub-bot conectado con éxito.\n🔁 Reconexión automática activa.\n📱 ID: wa.me/${sock.user.id.split('@')[0]}`, m)
    }
  })
}

handler.command = /^vincular$/i
export default handler
