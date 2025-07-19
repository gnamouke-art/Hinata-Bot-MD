// plugins/code2.js
import fs from 'fs'
import path from 'path'

const codesPath = './src/JSON/codes-subbot.json'

let handler = async (m, { conn }) => {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numeros = '0123456789'
  const gen = (chars, len) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')

  let parte1 = gen(letras, 4)
  let parte2 = gen(numeros, 4)
  let code = `${parte1}-${parte2}`

  let db = {}
  if (fs.existsSync(codesPath)) db = JSON.parse(fs.readFileSync(codesPath))
  db[code] = { owner: m.sender, created: Date.now() }
  fs.writeFileSync(codesPath, JSON.stringify(db, null, 2))

  let texto = `
╭─────〔 🌸 HINATA SUB-BOT 🌸 〕─────╮
│ ✅ Código generado con éxito.
│ 
│ 📲 Pasos para emparejar:
│ 1. Abre WhatsApp y ve a los tres puntos (⋮)
│ 2. Toca "Dispositivos vinculados"
│ 3. Pulsa en "Vincular con código de teléfono"
│ 4. Ingresa este código:
│
│ 🔐 *${code}*
│ 
│ ⚠️ No compartas este código.
│ Se vincula como sub-bot con reconexión activa.
│ 
│ Creado por TOKIO5025 para Hinata-Bot
╰───────────────────────────────╯
`

  conn.reply(m.chat, texto, m)
}

handler.command = /^code2$/i
export default handler
