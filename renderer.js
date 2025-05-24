const API_URL = 'https://translate.argosopentech.com/translate';

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
      output.textContent = await translateWeb(txt);
    } catch (err) {
      console.error(err);
      output.textContent = 'Ошибка: ' + (err.message || err);
    }
  }, 300);
});

async function translateWeb(text) {
  const dest = /[А-Яа-яЁё]/.test(text) ? 'en' : 'uk';

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q:      text,
      source: 'auto',
      target: dest,
      format: 'text'
    })
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.translatedText || data.translations?.[0]?.text;
}
