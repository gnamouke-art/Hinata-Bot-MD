import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let res = await fetch('https://nekobot.xyz/api/image?type=anal')
  let json = await res.json()
  conn.sendFile(m.chat, json.message, 'anal.jpg', `🖤 *Te encanta el anal verdad suci@...* 🫦`, m)
}
handler.command = ['anal']
handler.tags = ['nsfw']
handler.help = ['anal']
export default handler
