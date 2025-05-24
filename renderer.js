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
      const translated = await window.api.translate(txt);
      output.textContent = translated;
    } catch (err) {
      output.textContent = 'Ошибка: ' + err;
    }
  }, 300);
});