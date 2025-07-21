const userAudioIndex = {}; // Almacena el índice actual de cada usuario

const handler = async (m, { conn }) => {
  const audios = [
    'https://o.uguu.se/SFUtNnGE.opus', // Audio 1
    'https://d.uguu.se/WoubQYAl.opus', // Audio 2
    'https://o.uguu.se/SFUtNnGE.opus'  // Audio 3 (puedes cambiarlo por otro)
  ];

  const sender = m.sender;

  // Inicializa el índice del usuario si no existe
  if (!userAudioIndex[sender]) userAudioIndex[sender] = 0;

  // Obtiene el audio actual
  const index = userAudioIndex[sender];
  const audio = audios[index];

  // Envia el audio
  await conn.sendMessage(m.chat, {
    audio: { url: audio },
    mimetype: 'audio/mpeg',
    ptt: true,
  }, { quoted: m });

  // Actualiza el índice al siguiente audio (circular)
  userAudioIndex[sender] = (index + 1) % audios.length;
};

// Detecta frases sin prefijo
handler.customPrefix = /^(dónde estás misa|en dónde estás misa|misa dónde estás|donde esta misa)$/i;
handler.command = new RegExp;

export default handler;
