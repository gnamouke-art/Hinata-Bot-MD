// plugins/code2.js
// Creado por TOKIO5025 para Hinata-Bot
// Fue desarrollado por ${de}

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

  // Guardar código en archivo
  let db = {}
  if (fs.existsSync(codesPath)) db = JSON.parse(fs.readFileSync(codesPath))
  db[code] = { owner: m.sender, created: Date.now() }
  fs.writeFileSync(codesPath, JSON.stringify(db, null, 2))

  // 📩 Mensaje 1: instrucciones
  let textoInstrucciones = `
╭─────〔 🌸 HINATA SUB-BOT - CODE 🌸 〕─────╮
│ ✅ Tu código ha sido generado con éxito.
│ 
│ 📲 *Pasos para vincular desde otro número:*
│ 
│ 1. Abre WhatsApp y pulsa los tres puntos (⋮)
│ 2. Ve a *Dispositivos vinculados*
│ 3. Presiona *Vincular con código de teléfono*
│ 4. Ingresa el código que te enviaré ahora
│
│ Luego escribe el comando:
│ *.vincular <código>*
│ 
│ ⚠️ Este código solo puede usarse una vez.
│ 
│ 💮 Desarrollado por TOKIO5025
╰────────────────────────────────────╯
`

  // 📩 Mensaje 2: solo el código en limpio
  let soloCodigo = `🔐 *Código de vinculación:*\n\`\`\`${code}\`\`\``

  // Enviar los dos mensajes por privado
  await conn.sendMessage(m.sender, { text: textoInstrucciones }, { quoted: m })
  await conn.sendMessage(m.sender, { text: soloCodigo }, { quoted: m })

  // Confirmar en el grupo si es necesario
  if (m.chat !== m.sender) {
    conn.reply(m.chat, '✅ Código enviado a tu privado.', m)
  }
}

handler.command = /^code2$/i
handler.tags = ['jadibot']
handler.help = ['code2']
export default handler
