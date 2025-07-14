import https from 'https';
import fs from 'fs';
import { exec } from 'child_process';
import unzipper from 'unzipper';

let handler = async (m, { conn }) => {
  const zipUrl = 'https://github.com/TOKIO5025/Hinata-Bot-MD/archive/refs/heads/main.zip';
  const zipPath = './actualizacion.zip';

  await conn.reply(m.chat, '🔄 *Descargando actualización del repositorio...*', m);

  const file = fs.createWriteStream(zipPath);
  https.get(zipUrl, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();

      fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: './temp_update' }))
        .on('close', () => {
          const src = './temp_update/Hinata-Bot-MD-main/';
          const dest = './';

          exec(`cp -r ${src}* ${dest}`, async (err) => {
            if (err) {
              console.error(err);
              return conn.reply(m.chat, '❌ *Error al copiar los archivos actualizados.*', m);
            }

            fs.rmSync('./temp_update', { recursive: true, force: true });
            fs.unlinkSync(zipPath);

            await conn.reply(m.chat, '✅ *Actualización completada correctamente desde ZIP.*', m);
          });
        });
    });
  });
};

handler.command = ['updatezip', 'actualizarzip'];
handler.rowner = true;

export default handler;
