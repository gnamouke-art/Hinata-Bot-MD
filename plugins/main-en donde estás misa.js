const handler = async (m, { conn }) => {
  const audios = [
    'https://o.uguu.se/SFUtNnGE.opus', // Primer audio
    'https://d.uguu.se/WoubQYAl.opus', // Segundo audio
    'https://o.uguu.se/SFUtNnGE.opus'  // Tercer audio (puedes cambiarlo)
  ];

  const randomAudio = audios[Math.floor(Math.random() * audios.length)];

  await conn.sendMessage(m.chat, {
    audio: { url: randomAudio },
    mimetype: 'audio/mpeg',
    ptt: true,
  }, { quoted: m });
};

// Sin prefijo
handler.customPrefix = /^(en donde estas misa)$/i;
handler.command = new RegExp;

export default handler;
