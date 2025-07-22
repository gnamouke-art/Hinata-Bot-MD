import { xpRange } from '../lib/levelling.js'

const textAkeno = (text) => {
  const charset = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
  }
  return text.toLowerCase().split('').map(c => charset[c] || c).join('')
}

let tags = {
  'main': textAkeno('sistema'),
  'group': textAkeno('grupos'),
  'serbot': textAkeno('sub bots'),
  'owner': textAkeno('owner'),
  'tools': textAkeno('herramientas'),
  'fun': textAkeno('diversión'),
  'rpg': textAkeno('rpg'),
  'nsfw': textAkeno('nsfw'),
  'games': textAkeno('juegos'),
  'downloader': textAkeno('descargas'),
  'search': textAkeno('buscador'),
  'sticker': textAkeno('stickers')
}

const defaultMenu = {
  before: `💋 *Bienvenido al Dominio Oscuro de Akeno Himejima...*
⚡ Soy tu guía en esta dimensión demoníaca.
🔮 Usuario: %name
🔪 Nivel: %level | ⚡ XP: %exp / %maxexp
🕯 Usuarios registrados: %totalreg
🖤 Estado: ONLINE
⏳ Tiempo activo: %muptime

───────────────
✨ *Mis comandos están listos...*  
¿Te atreves a jugar conmigo, amor~?
%readmore`.trim(),

  header: '\n╭──〔 🔥 %category 〕──╮',
  body: '│ 💠 %cmd\n',
  footer: '╰────────────────╯',
  after: `\n🔮 *Dominio ejecutado con éxito, amor...*  
_Si quieres más poder, solo pídelo con respeto 😈_`
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let { exp, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let muptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length

    let help = Object.values(global.plugins).filter(p => !p.disabled).map(p => ({
      help: Array.isArray(p.help) ? p.help : [p.help],
      tags: Array.isArray(p.tags) ? p.tags : [p.tags],
      prefix: 'customPrefix' in p,
      limit: p.limit,
      premium: p.premium,
      enabled: !p.disabled
    }))

    for (let plugin of help) {
      for (let t of plugin.tags) {
        if (!(t in tags) && t) tags[t] = textAkeno(t)
      }
    }

    const { before, header, body, footer, after } = defaultMenu

    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        const cmds = help
          .filter(menu => menu.tags.includes(tag))
          .map(menu => menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix ? cmd : _p + cmd)).join('\n'))
          .join('\n')
        return `${header.replace(/%category/g, tags[tag])}\n${cmds}\n${footer}`
      }),
      after
    ].join('\n')

    let replace = {
      '%': '%',
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      muptime,
      readmore: String.fromCharCode(8206).repeat(4001)
    }

    let text = _text.replace(/%(\w+)/g, (_, key) => replace[key] || '')

    const videos = [
      'https://files.catbox.moe/vjkomo.mp4',
      'https://files.catbox.moe/qd0w49.mp4',
      'https://files.catbox.moe/o9ha9b.mp4',
      'https://files.catbox.moe/hbojsd.mp4',
      'https://files.catbox.moe/zmm1hd.mp4'
    ]
    const selected = videos[Math.floor(Math.random() * videos.length)]

    await conn.sendFile(m.chat, selected, 'akeno-menu.mp4', text, m)

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Ups... fallé como tu diosa demoníaca 💔', m)
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']
handler.register = true
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
  }
