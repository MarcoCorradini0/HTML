let currentKey = "";
let timerIntervals = new Map();
let totalDuration = 0;

document.getElementById('login-btn').addEventListener('click', async () => {
  const key = document.getElementById('api-key').value;
  const res = await fetch(`/api/proxy?path=api/company-name`, {
    headers: { 'x-api-key': key }
  });
  if (res.ok) {
    const data = await res.json();
    currentKey = key;
    document.getElementById('company-name').textContent = data.companyName;
    showScreen('dashboard-screen');
  } else {
    alert('Chiave non valida');
  }
});

document.getElementById('start-standup').addEventListener('click', async () => {
  const res = await fetch(`/api/proxy?path=api/devs`, {
    headers: { 'x-api-key': currentKey }
  });
  const data = await res.json();
  const devTableBody = document.getElementById('dev-table-body');
  devTableBody.innerHTML = '';
  data.forEach(dev => {
    const row = document.createElement('tr');
    row.dataset.devid = dev.id;
    row.innerHTML = `
      <td>${dev.name}</td>
      <td>
        <button onclick="toggleTimer(this)">▶️</button>
        <span>00:00</span>
      </td>
      <td><textarea></textarea></td>`;
    devTableBody.appendChild(row);
  });
  document.getElementById('date').textContent = new Date().toLocaleString();
  showScreen('standup-screen');
});

function toggleTimer(btn) {
  const row = btn.closest('tr');
  const span = btn.nextElementSibling;
  if (timerIntervals.has(row)) {
    clearInterval(timerIntervals.get(row));
    timerIntervals.delete(row);
    btn.textContent = '▶️';
  } else {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      totalDuration++;
      span.textContent = new Date(seconds * 1000).toISOString().substr(14, 5);
      document.getElementById('duration').textContent = new Date(totalDuration * 1000).toISOString().substr(14, 5);
    }, 1000);
    timerIntervals.set(row, interval);
    btn.textContent = '⏸️';
  }
}

document.getElementById('save-meeting').addEventListener('click', async () => {
  const rows = document.querySelectorAll('#dev-table-body tr');
  const standUpsInfo = Array.from(rows).map(row => {
    const devId = parseInt(row.dataset.devid);
    const time = row.children[1].querySelector('span').textContent.split(':');
    const durationMins = parseInt(time[0]) + parseInt(time[1] / 60);
    const notes = row.children[2].querySelector('textarea').value;
    return { devId, durationMins, notes };
  });
  const res = await fetch(`/api/proxy?path=api/stand-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': currentKey
    },
    body: JSON.stringify({
      date: new Date().toISOString(),
      durationMins: totalDuration / 60,
      standUpsInfo
    })
  });
  if (res.ok) {
    alert('Meeting salvato con successo');
    showScreen('dashboard-screen');
  } else {
    alert('Errore nel salvataggio');
  }
});

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
