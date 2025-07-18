// comando creado por TOKIO5025
// para Hinata-Bot-MD
// permite subir nuevos comandos directamente al repositorio

import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (m.sender !== '50248019799@s.whatsapp.net') throw '⛔ Este comando es privado para el creador del bot.'

  if (args.length < 2) {
    return m.reply(`💮 Uso correcto:\n${usedPrefix + command} nombredelcomando código_del_comando`)
  }

  let fileName = args[0].toLowerCase().replace(/[^a-z0-9]/gi, '') + '.js'
  let commandCode = text.replace(args[0], '').trim()

  if (!commandCode.includes('handler')) return m.reply('⚠️ El contenido no parece un comando válido (falta `handler`).')

  let filePath = path.join('./plugins', fileName)

  try {
    // Guarda el archivo
    fs.writeFileSync(filePath, commandCode)

    m.reply(`✅ Comando *${fileName}* guardado localmente.\n🔁 Subiendo al repositorio...`)

    // Ejecuta comandos Git
    exec(`git add . && git commit -m "🆕 Comando nuevo: ${fileName}" && git push`, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr)
        return m.reply('❌ Error al subir a GitHub:\n' + stderr)
      }

      m.reply('✅ ¡Comando subido correctamente a GitHub!\n\n🌀 Si quieres recargar el bot manualmente, usa:\n`.restart` o reinicia desde tu panel.')
    })
  } catch (e) {
    console.error(e)
    m.reply('❌ Error al guardar el archivo:\n' + e.message)
  }
}

handler.help = ['saverepo nombre código']
handler.tags = ['owner']
handler.command = ['saverepo']
handler.rowner = true // solo creador

export default handler
