const input  = document.getElementById('inputText');
const output = document.getElementById('resultText');

let timer;
input.addEventListener('input', () => {
  clearTimeout(timer);
  const txt = input.value.trim();
  if (!txt) {
    output.textContent = '';
    return;
  }
  output.textContent = 'Перевожу…';

  timer = setTimeout(async () => {
    try {
      // отправляем текст на libretranslate
      const res = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: txt,
          source: 'auto',
          target: /[А-Яа-яЁё]/.test(txt) ? 'en' : 'uk',
          format: 'text'
        })
      });
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      const { translatedText } = await res.json();
      output.textContent = translatedText;
    } catch (err) {
      output.textContent = 'Ошибка: ' + err.message;
    }
  }, 500);
});
