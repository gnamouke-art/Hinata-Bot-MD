import fs from "fs";
import path from "path";

const handler = async (m, { conn }) => {
  const rawId = conn.user?.id || "";
  const cleanId = rawId.replace(/:\d+/, ""); // elimina :16, :17
  const sessionPath = path.join("jadibot", cleanId);

  const isSubBot = fs.existsSync(sessionPath);
  if (!isSubBot) return m.reply("⚠️ Este comando solo puede ser usado desde una instancia de *SubBot*.");

  try {
    await m.reply("👋 Adiós... Te voy a extrañar 🥺");

    await conn.logout(); // Cierra sesión

    setTimeout(() => {
      if (fs.existsSync(sessionPath)) {
        fs.rmSync(sessionPath, { recursive: true, force: true });
        console.log(`[✅ SubBot ${cleanId}] Sesión eliminada correctamente.`);
      }
    }, 2000);

    setTimeout(() => {
      m.reply("✅ *Sesión finalizada correctamente.*\nPuedes volver a conectarte con el comando `/jadibot` o `/serbot`.");
    }, 3000);

  } catch (err) {
    console.error(`❌ Error al cerrar la sesión del subbot ${cleanId}:`, err);
    await m.reply("❌ Ocurrió un error al cerrar la sesión del SubBot.");
  }
};

handler.help = ['stop'];
handler.tags = ['jadibot'];
handler.command = /^(stop)$/i;
handler.owner = true;
handler.private = true;
handler.register = true;

export default handler;
