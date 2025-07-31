const handler = async (m, { conn }) => {
  const audios = [
    'https://files.cloudkuimages.guru/audios/HJt0Gwqv.mp3', // Primer audio
    'https://files.cloudkuimages.guru/audios/0xCWjGZe.mp3', // Segundo audio
    'https://files.cloudkuimages.guru/audios/aVZPBbcF.mp3'  // Tercer audio (puedes cambiarlo)
  ];

  const randomAudio = audios[Math.floor(Math.random() * audios.length)];

  await conn.sendMessage(m.chat, {
    audio: { url: randomAudio },
    mimetype: 'audio/mpeg',
    ptt: true,
  }, { quoted: m });
};

// Sin prefijo
handler.customPrefix = /^(nico nico ni)$/i;
handler.command = new RegExp;

export default handler;
