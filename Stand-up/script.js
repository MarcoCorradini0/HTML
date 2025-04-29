const API_PROXY = '/standup/api/proxy?path=';

const welcomeScreen = document.getElementById('welcome-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const standupScreen = document.getElementById('standup-screen');
const historyScreen = document.getElementById('history-screen');

const loginBtn = document.getElementById('login-btn');
const apiKeyInput = document.getElementById('api-key');
const companyNameDisplay = document.getElementById('company-name');
const startStandupBtn = document.getElementById('start-standup');
const devTableBody = document.getElementById('dev-table-body');
const dateDisplay = document.getElementById('date');
const durationDisplay = document.getElementById('duration');
const viewHistoryBtn = document.getElementById('view-history');
const saveMeetingBtn = document.getElementById('save-meeting');
const historyList = document.getElementById('history-list');
const backToDashboardBtn = document.getElementById('back-to-dashboard');
let timer = 0, interval, chartInstance;

function switchScreen(screen) {
  [welcomeScreen, dashboardScreen, standupScreen, historyScreen].forEach(s => s.classList.add('hidden'));
  screen.classList.remove('hidden');
}

loginBtn.addEventListener('click', async () => {
  const key = apiKeyInput.value;
  const res = await fetch(`https://standupparo-apis.vercel.app/api/company-name`, {
    headers: { 'x-api-key': key },
  });  
  if (res.ok) {
    const data = await res.json();
    localStorage.setItem('apiKey', key);
    companyNameDisplay.textContent = `🏢 ${data.companyName}`;
    switchScreen(dashboardScreen);
  } else {
    alert("Chiave non valida");
  }
});

startStandupBtn.addEventListener('click', async () => {
  switchScreen(standupScreen);
  const key = localStorage.getItem('apiKey');
  const res = await fetch(`${API_PROXY}api/devs`, { headers: { 'Authorization': key }});
  const devs = await res.json();
  dateDisplay.textContent = new Date().toLocaleDateString();
  timer = 0;
  updateDuration();
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    updateDuration();
  }, 1000);
  devTableBody.innerHTML = '';
  devs.forEach(dev => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${dev.name}</td>
      <td>
        <button onclick="toggleTimer(this)">▶️</button>
        <span>00:00</span>
      </td>
      <td><textarea placeholder="Scrivi note..."></textarea></td>`;
    devTableBody.appendChild(row);
  });
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

function updateDuration() {
  durationDisplay.textContent = formatTime(timer);
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

saveMeetingBtn.addEventListener('click', async () => {
  const rows = devTableBody.querySelectorAll('tr');
  const apiKey = localStorage.getItem('apiKey');
  const devs = Array.from(rows).map(row => {
    const name = row.children[0].textContent;
    const time = row.querySelector('span').textContent;
    const notes = row.querySelector('textarea').value;
    return { name, duration: time, notes };
  });
  const payload = {
    date: new Date().toISOString(),
    duration: formatTime(timer),
    devs
  };
  const res = await fetch(`${API_PROXY}api/stand-ups`, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    alert("Stand-Up salvato con successo!");
    switchScreen(dashboardScreen);
  } else {
    alert("Errore nel salvataggio.");
  }
});

viewHistoryBtn.addEventListener('click', async () => {
  switchScreen(historyScreen);
  historyList.innerHTML = '';
  const apiKey = localStorage.getItem('apiKey');
  const res = await fetch(`https://standupparo-apis.vercel.app/api/company-name`, {
    headers: { 'x-api-key': key },
  });  
  const history = await res.json();
  history.forEach(meeting => {
    const li = document.createElement('li');
    li.textContent = `${new Date(meeting.date).toLocaleDateString()} – Durata: ${meeting.duration}`;
    li.addEventListener('click', () => showMeetingDetail(meeting._id));
    historyList.appendChild(li);
  });
});

backToDashboardBtn.addEventListener('click', () => {
  switchScreen(dashboardScreen);
  document.getElementById('chart').classList.add('hidden');
});

async function showMeetingDetail(id) {
  const apiKey = localStorage.getItem('apiKey');
  const res = await fetch(`https://standupparo-apis.vercel.app/api/company-name`, {
    headers: { 'x-api-key': key },
  });  
  const data = await res.json();
  const names = data.devs.map(dev => dev.name);
  const durations = data.devs.map(dev => {
    const [min, sec] = dev.duration.split(':').map(Number);
    return min * 60 + sec;
  });
  const ctx = document.getElementById('chart');
  ctx.classList.remove('hidden');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: names,
      datasets: [{
        label: 'Durata in secondi',
        data: durations,
        backgroundColor: ['#4b9eff','#6be3c0','#ffcb77','#ff6b6b','#d3bce9']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: '🧁 Distribuzione durata per sviluppatore'
        }
      }
    }
  });
}
