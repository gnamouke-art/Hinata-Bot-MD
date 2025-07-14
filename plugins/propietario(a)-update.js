import { execSync } from 'child_process';
import fs from 'fs';

let handler = async (m, { conn }) => {
  try {
    // Obtenemos el último estado del repositorio
    execSync('git fetch');

    // Verificamos los cambios nuevos (archivos modificados o agregados)
    let output = execSync('git diff --name-status origin/main').toString().trim();

    if (!output) {
      return conn.reply(m.chat, '✨ *Todo está actualizado, no hay cambios nuevos en el repositorio.*', m);
    }

    // Lista de cambios detectados
    let cambios = output
      .split('\n')
      .map(line => {
        const [status, file] = line.split('\t');
        const emoji = status === 'A' ? '🆕' : status === 'M' ? '📝' : '❓';
        return `${emoji} ${status === 'A' ? 'Nuevo archivo' : 'Modificado'}: \`${file}\``;
      })
      .join('\n');

    // Hacemos pull de los cambios
    execSync('git pull');

    // Imagen para el canal
    let image = 'https://h.uguu.se/wvsHCRNf.jpg';

    // Enviamos respuesta al canal del bot (puedes modificar el jid del canal si lo usas así)
    conn.sendFile(m.chat, image, 'actualizado.jpg', `✅ *Actualización completada del repositorio.*\n\n📋 *Cambios detectados:*\n${cambios}`, m);

  } catch (err) {
    console.error(err);
    return conn.reply(m.chat, '❌ *Error al actualizar el bot.*\nVerifica que tengas git instalado y estés dentro de una carpeta git.', m);
  }
};

handler.command = ['update', 'actualizar'];
handler.owner = true;
handler.premium = false;
handler.group = false;

export default handler;
