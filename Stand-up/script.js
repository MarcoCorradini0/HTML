const API_BASE = 'https://standupparo-apis.vercel.app';
    let chartInstance;

    const get = id => document.getElementById(id);
    const screens = ['welcome-screen', 'dashboard-screen', 'standup-screen', 'history-screen'].map(get);
    const [welcomeScreen, dashboardScreen, standupScreen, historyScreen] = screens;
    const [loginBtn, apiKeyInput, companyNameDisplay, startBtn, devTableBody, dateDisplay, durationDisplay, viewHistoryBtn, saveBtn, historyList, backBtn] =
      ['login-btn', 'api-key', 'company-name', 'start-standup', 'dev-table-body', 'date', 'duration', 'view-history', 'save-meeting', 'history-list', 'back-to-dashboard'].map(get);

    let totalTimer = 0, globalInterval;

    function switchScreen(screen) {
      screens.forEach(s => s.classList.add('hidden'));
      screen.classList.remove('hidden');
    }

    loginBtn.onclick = async () => {
      const key = apiKeyInput.value;
      const res = await fetch(`${API_BASE}/api/company-name`, { headers: { Authorization: key } });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('apiKey', key);
        companyNameDisplay.textContent = `🏢 ${data.companyName}`;
        switchScreen(dashboardScreen);
      } else {
        alert('Chiave API non valida');
      }
    };

    startBtn.onclick = async () => {
      switchScreen(standupScreen);
      const key = localStorage.getItem('apiKey');
      const res = await fetch(`${API_BASE}/api/devs`, { headers: { Authorization: key } });
      const devs = await res.json();

      devTableBody.innerHTML = '';
      dateDisplay.textContent = new Date().toLocaleDateString();
      totalTimer = 0;
      clearInterval(globalInterval);
      globalInterval = setInterval(() => {
        totalTimer++;
        durationDisplay.textContent = formatTime(totalTimer);
      }, 1000);

      devs.forEach(dev => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${dev.name}</td>
          <td>
            <button class="play-btn">▶️</button>
            <span class="dev-timer">00:00</span>
          </td>
          <td><textarea placeholder="Note"></textarea></td>
        `;
        devTableBody.appendChild(tr);
        attachTimer(tr.querySelector('.play-btn'), tr.querySelector('.dev-timer'));
      });
    };

    function attachTimer(button, display) {
      let seconds = 0, interval;
      button.onclick = () => {
        if (button.dataset.running === 'true') {
          clearInterval(interval);
          button.textContent = '▶️';
          button.dataset.running = 'false';
        } else {
          button.textContent = '⏸️';
          button.dataset.running = 'true';
          interval = setInterval(() => {
            seconds++;
            display.textContent = formatTime(seconds);
          }, 1000);
          button.dataset.interval = interval;
        }
      };
    }

    function formatTime(sec) {
      const m = String(Math.floor(sec / 60)).padStart(2, '0');
      const s = String(sec % 60).padStart(2, '0');
      return `${m}:${s}`;
    }

    saveBtn.onclick = async () => {
      const rows = devTableBody.querySelectorAll('tr');
      const devs = Array.from(rows).map(row => ({
        name: row.children[0].textContent,
        duration: row.querySelector('.dev-timer').textContent,
        notes: row.querySelector('textarea').value
      }));

      const payload = {
        date: new Date().toISOString(),
        duration: formatTime(totalTimer),
        devs
      };

      const res = await fetch(`${API_BASE}/api/stand-ups`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('apiKey'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Stand-up salvato!');
        switchScreen(dashboardScreen);
      } else {
        alert('Errore nel salvataggio');
      }
    };

    viewHistoryBtn.onclick = async () => {
      switchScreen(historyScreen);
      historyList.innerHTML = '';
      const res = await fetch(`${API_BASE}/api/stand-ups`, {
        headers: { Authorization: localStorage.getItem('apiKey') }
      });
      const meetings = await res.json();

      meetings.forEach(m => {
        const li = document.createElement('li');
        li.textContent = `${new Date(m.date).toLocaleDateString()} – Durata: ${m.duration}`;
        li.onclick = () => showChart(m._id);
        historyList.appendChild(li);
      });
    };

    async function showChart(id) {
      const res = await fetch(`${API_BASE}/api/stand-ups/${id}`, {
        headers: { Authorization: localStorage.getItem('apiKey') }
      });
      const data = await res.json();
      const ctx = document.getElementById('chart');
      ctx.classList.remove('hidden');

      const labels = data.devs.map(d => d.name);
      const values = data.devs.map(d => {
        const [m, s] = d.duration.split(':').map(Number);
        return m * 60 + s;
      });

      if (chartInstance) chartInstance.destroy();
      chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            label: 'Durata in secondi',
            data: values,
            backgroundColor: ['#4b9eff','#6be3c0','#ffcb77','#ff6b6b','#d3bce9']
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Distribuzione tempo sviluppatori'
            }
          }
        }
      });
    }

    backBtn.onclick = () => {
      switchScreen(dashboardScreen);
      get('chart').classList.add('hidden');
    };