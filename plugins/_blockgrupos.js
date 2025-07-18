import fs from 'fs'
let filePath = './src/JSON/grupos-bloqueados.json'

export async function before(m, { conn }) {
  if (!m.isGroup) return

  let data = JSON.parse(fs.readFileSync(filePath))
  if (data.includes(m.chat) && m.sender !== '50248019799@s.whatsapp.net') {
    return !1 // ignora todo
  }
}
