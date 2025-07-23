const handler = async (m, { conn }) => {
  const audios = [
    'https://files.cloudkuimages.guru/audios/fuLSWe1T.mp3', // Primer audio
    'https://files.cloudkuimages.guru/audios/7JPi1XyU.mp3', // Segundo audio
    'https://files.cloudkuimages.guru/audios/snoK1XUl.mp3'  // Tercer audio (puedes cambiarlo)
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
