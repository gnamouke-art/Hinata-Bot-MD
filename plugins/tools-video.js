let handler = async (m, { conn }) => {
  let url = 'https://files.catbox.moe/o7a9qb.mp4';
  await conn.sendMessage(m.chat, {
    video: { url },
    caption: '🎭 MONEY HEIST MD',
    mimetype: 'video/mp4',
    fileName: 'moneyheist.mp4',
    gifPlayback: false,
    viewOnce: false,
    isRoundVideo: true
  }, { quoted: m });
};

handler.help = ['moneyheist'];
handler.tags = ['fun'];
handler.command = /^moneyheist$/i;
handler.limit = 1;

export default handler;
