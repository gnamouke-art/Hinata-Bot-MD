import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply('Para obtener tu key, visita el siguiente enlace: https://auth.platorelay.com/0V0%2FGnWilVANLTKfJ9mpQti5sTgdnqtx5IBznUKotj6e797%2FcRYIQAqOqhVOe5sZ85nEtMujAjRrxw1B3iJ5co%2BdVCeT9q%2BM0F5GMJjlqg2w5T%2FwT4nH0VccJHfYa3GHy%2BUyRA%2FFU33qc3CXDrlI41N%2F9KmoBvlU6%2BJ8P%2B8oFdbIM%2FPsNGSYy4grgYrjyVujXGxca3YNurzdf4%2BnoPY52WvD3tppRNm%2BmUuS0%2FCUWg7a0C7sA5VHT6K8KM1xpIrNvmwppSeAhNK%2BogncZI4XUp03JMdjvuCl2OE5pGwatYCgZ8kTmZxFuPLMI90WQgs45DWUiLHE34QFZJCqB9YOQwVHzeqN5VyEmQs8eiWjoDp3aLvLxxp%2FOHOAnXvsmsG3Blo4QO6IRgqP2L2yiruoj4%2BawPYSS1S86yLjr7RJ4HA6pDoonIYDBmqSse3uyXCNlzCTlSQ%2FwdOYUX7%2FfWDaZj%2FjiyWy2wxWjva3s%2Bu%2BTmsQHEQjTDMcN32LDfA%3D');
  }

  try {
    // Hacemos la solicitud con un user-agent simulado para evitar que nos bloqueen
    const response = await axios.get(text, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // Verificamos el código de respuesta para detectar problemas
    if (response.status !== 200) {
      return m.reply('Hubo un problema al acceder a la página. Código de respuesta: ' + response.status);
    }

    // Cargamos el HTML con cheerio
    const $ = cheerio.load(response.data);

    // Buscar la key en el HTML (reemplaza 'selector-para-la-key' con el selector correcto)
    const key = $('selector-para-la-key').text().trim(); // Reemplaza este selector con el correcto.

    if (key) {
      return m.reply(`Tu nueva key es: ${key}`);
    } else {
      return m.reply('No se pudo encontrar la key en la página. Revisa que el enlace sea correcto.');
    }

  } catch (error) {
    console.error(error);
    return m.reply('Hubo un error al intentar obtener la key. Intenta nuevamente. Verifica que el enlace sea válido.');
  }
};

handler.help = ['deltakey'];
handler.tags = ['tools'];
handler.command = ['deltakey'];
handler.register = true;

export default handler;
