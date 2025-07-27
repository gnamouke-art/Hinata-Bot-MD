import fetch from 'node-fetch';

const handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) {
        return conn.reply(m.chat, `❌ Por favor proporciona un enlace válido de TikTok.\n\nEjemplo: *${usedPrefix + command} https://www.tiktok.com/@Neotokio/hinata/1234*`, m);
    }

    try {
        const apiUrl = `https://api.dorratz.com/v2/tiktok-dl?url=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result || !result.status || !result.data || !result.data.media || !result.data.media.org) {
            return conn.reply(m.chat, '❌ No se pudo descargar el video. Verifica el enlace e intenta nuevamente.', m);
        }

        const videoUrl = result.data.media.org;

        // Obtener información adicional
        const author = result.data.author?.nickname || 'Desconocido';
        const username = result.data.author?.username || 'Desconocido';
        const likes = result.data.like || '0';
        const shares = result.data.share || '0';
        const comments = result.data.comment || '0';

        const caption = `
🎵 *TIKTOK DESCARGADO*

👤 Autor: ${author} (@${username})
👍 Me gusta: ${likes}
🔄 Compartido: ${shares}
💬 Comentarios: ${comments}

📌 Usa los botones para más opciones:
`;

        const buttons = [
            {
                buttonId: `${usedPrefix}tiktokmp3 ${text}`,
                buttonText: { displayText: '🎧 MP3' },
                type: 1
            },
            {
                buttonId: `${usedPrefix}menu`,
                buttonText: { displayText: '📋 Menú' },
                type: 1
            }
        ];

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption,
            buttons,
            footer: 'Tiktok Downloader by 🐉NeoTokyo Beats🐲',
            headerType: 4
        }, { quoted: m });

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ Ocurrió un error al intentar descargar el video.', m);
    }
};

handler.help = ['tiktok <enlace>', 'tt <enlace>'];
handler.tags = ['downloader'];
handler.command = /^(tt|tiktok)$/i;

export default handler;
