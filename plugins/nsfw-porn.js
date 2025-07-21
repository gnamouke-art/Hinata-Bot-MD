const handler = async (m, { conn }) => {
  const videos = [
    'https://files.catbox.moe/o7a9qb.mp4',
    'https://files.catbox.moe/6uf47d.mp4',
    'https://files.catbox.moe/7qfffi.mp4'
  ];
  const video = videos[Math.floor(Math.random() * videos.length)];
  await conn.sendFile(m.chat, video, 'video.mp4', '🎥 *Te caliento con este video cochino...* 💦', m);
};
handler.command = ['videoxxx', 'xxxvideo', 'pornovideo'];
handler.help = ['videoxxx'];
handler.tags = ['nsfw'];
handler.premium = false;
handler.group = false;
handler.register = true;

export default handler;
