const handler = async (m, { conn }) => {
  const audios = [
    'https://o.uguu.se/SFUtNnGE.opus', // Primer audio
    'https://d.uguu.se/WoubQYAl.opus', // Segundo audio
    'https://o.uguu.se/SFUtNnGE.opus'  // Tercer audio
  ];

  // Enviar los 3 audios uno tras otro
  for (let i = 0; i < audios.length; i++) {
    await conn.sendMessage(m.chat, {
      audio: { url: audios[i] }, // Enviar el audio de la lista
      mimetype: 'audio/mpeg',
      ptt: true, // Cambia a true si prefieres enviarlo como nota de voz
    }, { quoted: m });

    // Esperar 1 segundo antes de enviar el siguiente audio
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

// Hacer que funcione sin prefijo
handler.customPrefix = /^(en dónde estas misa)$/i;
handler.command = new RegExp;

export default handler;
