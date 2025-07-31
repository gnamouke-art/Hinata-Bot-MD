const handler = async (m, { conn }) => {
  const audios = [
    'https://files.cloudkuimages.guru/audios/iDnE0YW5.mp3', // Primer audio
    'https://files.cloudkuimages.guru/audios/iDnE0YW5.mp3', // Segundo audio
    'https://files.cloudkuimages.guru/audios/iDnE0YW5.mp3'  // Tercer audio (puedes cambiarlo)
  ];

  const randomAudio = audios[Math.floor(Math.random() * audios.length)];

  await conn.sendMessage(m.chat, {
    audio: { url: randomAudio },
    mimetype: 'audio/mpeg',
    ptt: true,
  }, { quoted: m });
};

// Sin prefijo
handler.customPrefix = /^(me ago)$/i;
handler.command = new RegExp;

export default handler;
