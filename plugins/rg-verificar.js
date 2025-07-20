import axios from 'axios'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)
    let whe = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
    let perfil = await conn.profilePictureUrl(whe, 'image').catch(_ => 'https://qu.axlet handler = async (m, { conn, args, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  if (!user.registered) return m.reply('❗No estás registrado, no puedes eliminar lo que no existe.\n\nUsa:\n' + usedPrefix + 'reg nombre.edad')

  if (args[0] !== 'confirmar') {
    return m.reply(`⚠️ ¿Estás seguro de que quieres eliminar tu registro?\n\nSi estás seguro, escribe:\n${usedPrefix + command} confirmar`)
  }

  user.registered = false
  user.name = ''
  user.age = 0
  user.regTime = -1

  m.reply('✅ *Tu registro ha sido eliminado correctamente.*')
}

handler.help = ['unreg']
handler.tags = ['rpg']
handler.command = /^unreg(ister)?$/i
handler.register = true

export default handler
