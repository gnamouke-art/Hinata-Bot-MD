import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('🎩');

    let username = await conn.getName(m.sender);

    // Vcard info con tu número
    let list = [{
        displayName: "🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲",
        vcard: `BEGIN:VCARD
VERSION:3.0
FN:🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲
item1.TEL;waid=573142495895:573142495895
item1.X-ABLabel:Número
item2.EMAIL;type=INTERNET:youremail@example.com
item2.X-ABLabel:Email
item3.URL:https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A
item3.X-ABLabel:Canal
item4.ADR:;;Guatemala;;;;
item4.X-ABLabel:Región
END:VCARD`,
    }];

    // Envía la vCard
    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: '✨ Contacta a mi creador, el mejor ✨',
                body: '🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲',
                thumbnailUrl: 'https://cdnmega.vercel.app/media/c4hhgZgD@fGOHhRAM1CD-3_cpAQk-Q86yQnQLGHYKZ1M0P_heI9s',
                sourceUrl: 'https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

    // Texto coqueto y personalizado solo para el que escribe el comando
    let txt = `👋 Hola, *@${m.sender.split('@')[0]}* ✨

Este es el contacto de mi creador: *🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲*.
Si quieres contactarlo, aquí tienes su info 💖`;

    // Botones: uno para el canal, otro para cerrar
    let buttons = [
        { urlButton: { displayText: '🌟 Seguir mi canal', url: 'https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A' } },
        { quickReplyButton: { displayText: '❌ Cerrar', id: 'close' } }
    ];

    await conn.sendMessage(m.chat, {
        text: txt,
        footer: '🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲',
        buttons: buttons,
        headerType: 1,
        mentions: [m.sender]
    }, { quoted: m });
};

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;
