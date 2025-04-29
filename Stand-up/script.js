const API_BASE = '/api/proxy?path=';

const loginBtn = document.getElementById('login-btn');
const apiKeyInput = document.getElementById('api-key');
const companyNameDisplay = document.getElementById('company-name');
const startStandupBtn = document.getElementById('start-standup');
const devTableBody = document.getElementById('dev-table-body');
const dateDisplay = document.getElementById('date');
const durationDisplay = document.getElementById('duration');
const saveMeetingBtn = document.getElementById('save-meeting');

let timer = 0, interval;

function switchScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  screen.classList.remove('hidden');
}

loginBtn.addEventListener('click', async () => {
  const key = apiKeyInput.value;
  if (!key) return alert("Inserisci una chiave API");

  const res = await fetch(`https://standupparo-apis.vercel.app/api/company-name`, {
    headers: { 'x-api-key': key }
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem('apiKey', key);
    companyNameDisplay.textContent = `🏢 ${data.companyName}`;
    switchScreen(document.getElementById('dashboard-screen'));
  } else {
    alert("Chiave API non valida!");
  }
});

startStandupBtn.addEventListener('click', async () => {
  switchScreen(document.getElementById('standup-screen'));
  const key = localStorage.getItem('apiKey');
  const res = await fetch(`https://standupparo-apis.vercel.app/api/devs`, {
    headers: { 'x-api-key': key }
  });
  const devs = await res.json();
  devTableBody.innerHTML = devs.map(dev => `
    <tr>
      <td>${dev.name}</td>
      <td><button onclick="toggleTimer(this)">▶️</button> <span>00:00</span></td>
      <td><textarea placeholder="Scrivi note..."></textarea></td>
    </tr>
  `).join('');
});

function toggleTimer(btn) {
  const span = btn.nextElementSibling;
  let seconds = 0;

  if (btn.dataset.running === 'true') {
    clearInterval(btn.dataset.intervalId);
    btn.textContent = '▶️';
    btn.dataset.running = 'false';
  } else {
    btn.textContent = '⏸️';
    btn.dataset.running = 'true';
    const intervalId = setInterval(() => {
      seconds++;
      span.textContent = formatTime(seconds);
    }, 1000);
    btn.dataset.intervalId = intervalId;
  }
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

saveMeetingBtn.addEventListener('click', async () => {
  const rows = devTableBody.querySelectorAll('tr');
  const apiKey = localStorage.getItem('apiKey');
  const standUpsInfo = Array.from(rows).map(row => {
    const devId = row.dataset.devId;
    const time = row.querySelector('span').textContent;
    const notes = row.querySelector('textarea').value;
    const [minutes, seconds] = time.split(':').map(Number);
    if (!devId || isNaN(minutes) || isNaN(seconds)) {
      console.error('Invalid data for row:', { devId, time });
      return null;
    }
    const durationMins = Math.round(minutes + seconds / 60); // **Correzione per interi**
    return { devId, durationMins, notes };
  }).filter(info => info !== null);

  if (standUpsInfo.length === 0) {
    alert('Nessun dato valido da salvare.');
    return;
  }

  const payload = {
    date: new Date().toISOString(),
    durationMins: Math.round(timer / 60), // **Correzione per interi**
    standUpsInfo
  };

  console.log('Payload aggiornato:', JSON.stringify(payload, null, 2));

  try {
    const res = await fetch(`https://standupparo-apis.vercel.app/api/stand-up`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Errore API:', errorData);
      alert("Errore nel salvataggio: " + JSON.stringify(errorData));
    } else {
      alert('Stand-Up salvato con successo!');
    }
  } catch (error) {
    console.error('Errore di rete:', error);
    alert("Errore di rete: " + error.message);
  }
});