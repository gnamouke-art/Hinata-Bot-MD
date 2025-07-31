import { perplexity } from '../lib/scraper.js';
const antiSpam = new Map();

export async function before(m, { conn }) {
    let fkontak = {
        "key": {
            "participants": "0@s.whatsapp.net",
            "remoteJid": "status@broadcast",
            "fromMe": false,
            "id": "Halo"
        },
        "message": {
            "contactMessage": {
                "vcard": `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:y
item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}
item1.X-ABLabel:Ponsel
END:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    };

    if (
        m.id.startsWith('NJX-') ||
        (m.id.startsWith('BAE5') && m.id.length === 16) ||
        (m.id.startsWith('3EB0') && m.id.length === 12) ||
        (m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22)) ||
        (m.id.startsWith('B24E') && m.id.length === 20) ||
        m.id.startsWith('FizzxyTheGreat-')
    ) return;

    let setting = global.db.data.settings[this.user.jid];
    let chat = global.db.data.chats[m.chat];
    let name = conn.getName(m.sender);
    const user = `@${m.sender.split('@')[0]}`;

    if (chat.isBanned) return;
    if (m.fromMe) return;
    if (m.chat === "120363341523880410@newsletter") return;
    if (m.chat === "120363341523880410@newsletter") return;

    let vn = 'https://qu.ax/eGdW.mp3';
    let bot = `${pickRandom([
        `*Hola ${user} soy un bot el que puedo ayudar? 👉👈*`,
        `Aqui estoy`,
        `bot tu abuela`,
        `que quiere?`,
        `No dispoble 🫣`,
        `Hola aqui estoy soy tu botsito sexy el que puedo ayudar uwu`
    ])}`.trim();
    let txt = `🤖✨ ¿El bot se volvió loco, no responde o te dejó en seco?
Tranqui, bebé… a veces se le cruzan los cables, pero yo estoy pa' arreglarlo rapidito 😏

🌐 Mi bot viene cargado con funciones potentes: descarga música, videos, usa IA, ejecuta comandos únicos, responde como diosa y mucho más.
🔥 Todo listo para que lo disfrutes sin complicaciones.

🛠️ ¿Tu bot crasheó, te manda errores o no ejecuta bien los comandos?
No llores, rey… mándame mensaje directo y lo dejo como nuevo 😎

📲 Soporte directo, sin vueltas:
📞 +502 4801 9799`;

    // Detectar palabras clave incluyendo Kantu y Kantubot
    if (
        m.text.includes('bot') ||
        m.text.includes('Bot') ||
        m.text.includes('simsimi') ||
        m.text.includes('simi') ||
        m.text.includes('alexa') ||
        m.text.includes('hinata') ||
        m.text.includes('hinata') ||
        m.text.includes('Hinatabot') ||
        m.text.includes('Hinatabot')
    ) {
        if (
            m.text.includes('jadibot') ||
            m.text.includes('bots') ||
            m.text.includes('serbot') ||
            m.text.includes('instalarbot') ||
            m.text.includes('infobot')
        ) return;

        const lastMessageTime = antiSpam.get(m.sender) || 0;
        const currentTime = Date.now();
        if (currentTime - lastMessageTime < 9000) throw !0;

        if (/^¿que es un bot\?|Que es un bot\?|que es un bot\?|que es un bot$/i.test(m.text)) {
            return conn.reply(
                m.chat,
                `\`☆::¿${await tr("💬 𝐐𝐔𝐄́ 𝐄𝐒 𝐔𝐍 𝐁𝐎𝐓 𝐃𝐄 𝗪𝐇𝐀𝐓𝐒𝐀𝐏𝐏? ☆彡")}::☆\`

>🤖 Un bot de WhatsApp es una inteligencia artificial programada para obedecer comandos automáticamente, sin intervención humana.
🛠️ Con él puedes:
🎨 Crear stickers
🎵 Descargar música
🎥 Bajar videos
✨ Generar logos personalizados
💥 Y muchas cosas más... todo al instante, sin esfuerzo.



📲 ¿Quieres ver todo lo que puede hacer?
Usa: #menu y déjate sorprender. 😏

> 「 𝐇𝐢𝐧𝐚𝐭𝐚 - ʙᴏᴛ 」💖  `,
                m
            );
        }

        if (/^Quiero un bot|como obtengo un bot\?|Quiero un bot\?|quiero un bot|solicitó bot|solicito bot|Necesito un bot|necesito un bot$/i.test(m.text)) {
            return conn.reply(
                m.chat,
                `\`⚡ ¿${await tr("💭 ¿Quieres un bot en tu grupo? 😏")}\`

Puedes pedirlo TOTALMENTE GRATIS escribiéndole directo a su creador:
🐉 𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨 🐲
📞 wa.me/521712164971


\`⚡ ¿El bot estará activo 24/7\`
> _*Obvio, bebé. El bot está alojado en servidor premium, así que está activo día y noche sin fallas..*_

> 「 Hinata - ʙᴏᴛ 」`,
                m,
                {
                    contextInfo: {
                        externalAdReply: {
                            mediaUrl: null,
                            mediaType: 1,
                            description: null,
                            title: `Hola ${name} 👋`,
                            body: wm,
                            previewType: 0,
                            thumbnail: img.getRandom(),
                            sourceUrl: redes.getRandom()
                        }
                    }
                }
            );
        }

        try {
            let prefixRegex = new RegExp(
                '^[' +
                    setting.prefix.replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&') +
                    ']'
            );
            let hasPrefixWithKeyword =
                prefixRegex.test(m.text) &&
                m.text.match(
                    new RegExp(
                        '^[' +
                            setting.prefix.replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&') +
                            '](?:bot|Bot|simsimi|simi|alexa|Hinata|hinata|hinatabot|Hinatabot)'
                    )
                );
            let hasKeywordWithoutPrefix =
                (
                    m.text.includes('bot') ||
                    m.text.includes('Bot') ||
                    m.text.includes('simsimi') ||
                    m.text.includes('simi') ||
                    m.text.includes('alexa') ||
                    m.text.includes('hinata') ||
                    m.text.includes('Hinata') ||
                    m.text.includes('Hinatabot') ||
                    m.text.includes('hinatabot')
                ) && !prefixRegex.test(m.text);
            if (!hasPrefixWithKeyword && !hasKeywordWithoutPrefix) return;
            let query = m.text;
            if (hasPrefixWithKeyword) {
                query = m.text
                    .replace(prefixRegex, '')
                    .replace(
                        /^(?:bot|Bot|simsimi|simi|alexa|kantu|Kantu|kantubot|Kantubot)/i,
                        ''
                    )
                    .trim();
            } else if (hasKeywordWithoutPrefix) {
                const keywordRegex = /^(?:bot|Bot|simsimi|simi|alexa|Hinata|hinata|hinatabot|Hinatabot)\s+/i;
                if (keywordRegex.test(m.text)) {
                    query = m.text.replace(keywordRegex, '').trim();
                } else {
                    query = m.text.trim();
                }
            }
            if (!query) return;

            conn.sendPresenceUpdate('composing', m.chat);
            antiSpam.set(m.sender, currentTime);

            async function luminsesi(q, username, logic) {
                try {
                    const response = await axios.post('https://luminai.my.id', {
                        content: q,
                        user: username,
                        prompt: logic,
                        webSearchMode: true
                    });
                    return response.data.result;
                } catch (error) {
                    console.error(error);
                }
            }

            async function perplexityIA(q, logic) {
                try {
                    let response = await perplexity.chat(
                        [
                            { role: 'system', content: logic || syms1 },
                            { role: 'user', content: q }
                        ],
                        'sonar-pro'
                    );
                    if (response.status) {
                        return response.result.response;
                    } else {
                        throw new Error(`Error en Perplexity: ${response.result.error}`);
                    }
                } catch (error) {
                    console.error('Error en Perplexity:', error);
                    return null;
                }
            }

            async function SimSimi(text, language = 'es') {
                try {
                    const { data } = await axios.post(
                        'https://api.simsimi.vn/v1/simtalk',
                        new URLSearchParams({ text, lc: language }).toString(),
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'User-Agent':
                                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
                            }
                        }
                    );
                    return data.message;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }

            let username = `${m.pushName}`;
            let syms1 = await fetch(
                'https://raw.githubusercontent.com/TOKIO5025/text2/refs/heads/main/text-chatgpt'
            ).then(v => v.text());

            let result;
            if (!result || result.trim().length === 0) {
                result = await perplexityIA(query, syms1);
            }

            if (!result || result.trim().length === 0) {
                result = await SimSimi(query);
            }

            if (!result || result.trim().length === 0) {
                result = await luminsesi(query, username, syms1);
                result = result
                    .replace(
                        /Maaf, terjadi kesalahan saat memproses permintaan Anda/g,
                        ''
                    )
                    .trim();
                result = result
                    .replace(
                        /Generated by BLACKBOX\.AI.*?https:\/\/www\.blackbox\.ai/g,
                        ''
                    )
                    .trim();
                result = result
                    .replace(
                        /and for API requests replace https:\/\/www\.blackbox\.ai with https:\/\/api\.blackbox\.ai/g,
                        ''
                    )
                    .trim();
            }

            if (result && result.trim().length > 0) {
                await conn.reply(m.chat, result, m);
                antiSpam.set(m.sender, Date.now());
            }
        } catch (e) {
            try {
                let gpt = await fetch(`${apis}/tools/simi?text=${m.text}`);
                let res = await gpt.json();
                await m.reply(res.data.message);
                antiSpam.set(m.sender, Date.now());
            } catch (e) {
                return m.reply(
                    [
                        `Simsimi esta durmiendo no molesta 🥱`,
                        `Callarte`,
                        `Api simsimi caida`,
                        `Simsimi esta ocupado cojieron con tu hermana vuelva mas tarde 🥵`,
                        `NO MOLESTE PUTA`,
                        `No hay señar`,
                        `No estoy disponible`
                    ].getRandom()
                );
                console.log(e);
            }
        }
    }

    if (/^infohost|hosting$/i.test(m.text)) {
        await conn.sendMessage(
            m.chat,
            {
                text: txt,
                contextInfo: {
                    forwardingScore: 9999999,
                    isForwarded: false,
                    externalAdReply: {
                        showAdAttribution: true,
                        containsAutoReply: true,
                        title: `🌟 Hinata BOT 🌴`,
                        body: `By 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲`,
                        previewType: 'PHOTO',
                        thumbnailUrl:
                            'https://files.cloudkuimages.guru/images/QUk5pIFf.jpg',
                        sourceUrl: nna
                    }
                }
            },
            { quoted: m }
        );
    }

    if (/^todo bien$/i.test(m.text)) {
        conn.reply(m.chat, `𝑩𝒊𝒆𝒏 𝒄𝒂𝒑𝒐 😎 𝒚 𝒕𝒖`, m);
    }

    if (/^e$/i.test(m.text)) {
        conn.reply(
            m.chat,
            `𝑸𝒖𝒆 𝒃𝒖𝒆𝒏𝒐 𝒔𝒂𝒃𝒆𝒓 𝒍𝒂 𝒍𝒆𝒕𝒓𝒂 𝒆`,
            m
        );
    }

    if (/^@50248019799|🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲$/i.test(m.text)) {
        conn.reply(
            m.chat,
            `*_[ ⚠ ️] No etiquetes a mi creador, si tiene alguna consulta o dudas, hablarle al privado_*`,
            m
        );
    }

    if (/^reglas$/i.test(m.text)) {
        m.reply(
            [
                `\`🌐 REGLAS DEL BOT 🌐\`\n\n* *No hacer spam de comandos*\n\nUsar los comando cada 5 segundos, de lo contrario el bot se puede satura, o numero del bot puede irse a support por spam.\n\n* *No estar enviando link del grupos al bot para que se una*\n\nHablar con mi creador y el lo une a tu grupo, si apoyar nuestras redes sociales:\n${yt}\n${md}\n\n* *No llamar al bot, ni al creador*\n\nSi lo haces, seras baneado del bot y bloqueado`,
                `\`⚠️ 𝙍𝙀𝙂𝙇𝘼𝙎 ⚠️\`

* 𝐏𝐫𝐨𝐡𝐢𝐛𝐢𝐝𝐨 𝐥𝐥𝐚𝐦𝐚𝐫 𝐚𝐥 𝐁𝐨𝐭
* 𝐏𝐫𝐨𝐡𝐢𝐛𝐢𝐝𝐨 𝐒𝐩𝐚𝐦 𝐚𝐥 𝐁𝐨𝐭
* 𝐍𝐨 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐚𝐥 𝐁𝐨𝐭
* 𝐑𝐞𝐬𝐩𝐞𝐭𝐚 𝐥𝐨𝐬 𝐭𝐞𝐫𝐦𝐢𝐧𝐨𝐬 𝐲 𝐜𝐨𝐧𝐝𝐢𝐜𝐢𝐨𝐧𝐞𝐬`
            ].getRandom() + `\n\n>「 Hinata - ʙᴏᴛ 」`
        );
    }
    return !0;
}

//export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
          }
