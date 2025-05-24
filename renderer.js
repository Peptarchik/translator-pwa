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
      const translated = await translateWeb(txt);
      output.textContent = translated;
    } catch (err) {
      console.error(err);
      output.textContent = 'Ошибка: ' + (err.message || err);
    }
  }, 300);
});

async function translateWeb(text) {
  // определяем цель: если есть кириллица → en, иначе uk
  const dest = /[А-Яа-яЁё]/.test(text) ? 'en' : 'uk';

  const res = await fetch('https://libretranslate.de/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text,
      source: 'auto',
      target: dest,
      format: 'text'
    })
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  // библиотека возвращает { translatedText: "…" }
  return data.translatedText || data.translations?.[0]?.text;
}

