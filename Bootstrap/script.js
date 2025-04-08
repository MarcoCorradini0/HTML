async function fetchGet(endpoint) {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error('Errore nella chiamata' + response.status);
    }
    return response.json();
}
async function fetchPost(endpoint, body) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error('Errore nella chiamata POST' + response.status);
    }
    return response.json();
}

async function recuperaGiorni() {
    const giorni = await fetchGet('http://its.digitalminds.cloud/api/prenotazioni/carica-prossimi-giorni');
    var giorno = document.getElementById("giorno");
    giorni.array.forEach(element => {/* si può funzionare anche questa per snellire */
        var option = document.createElement("option");
        option.value = element;
        option.innerHTML = element;
        giorno.appendChild(option);
    });
}
function formattaGiorno(giorno) {
    var giorno = document.getElementById("giorno");
    var giornoSpezzato = giorno.value.split('/');
    var giornoSpezzato = giornoSpezzato[2] + '-' + giornoSpezzato[1] + '-' + giornoSpezzato[0];
    return giornoSpezzato;
}

async function recuperaOrari() {
    var giorno = document.getElementById("giorno");
    var giornoSelezionato = formattaGiorno(giorno.value);
    const orari = await fetchGet('http://its.digitalminds.cloud/api/prenotazioni/carica-orari-disponibili/' + giornoSelezionato);
    var ora = document.createElement("option");
    ora.appendChild(option);
    orari.forEach(element => {
        ora.value = element;
        ora.innerHTML = element;
        ora.appendChild(option);
    });
    ora.removeAttribute("disabled");
}

/* Per bottone prenota */
async function prenota() {
    var giorno = document.getElementById("giorno");
    var giornoSelezionato = formattaGiorno(giorno.value);
    var oraSelezionata = document.getElementById("ora").value;
    const requestBody = {
        "nome": document.getElementById("nome").value,
        "cognome": document.getElementById("cognome").value,
        "telefono": document.getElementById("telefono").value,
        "email": document.getElementById("email").value,
        "note": document.getElementById("note").value,
        dataOra: giornoSelezionato + 'T' + oraSelezionata
    };
    try {
        const response = await fetchPost('http://its.digitalminds.cloud/api/prenotazioni/crea-prenotazione', requestBody);
        alert("Prenotazione effettuata con successo!");
        if (!response.ok) {
            throw new Error('Errore nella risposta di rete');
        }
        alert("Prenotazione effettuata con successo!");
    } catch (error) {
        console.error('Errore:', error);
        alert("Errore durante la prenotazione. Riprova.");
    }
}

async function recuperaPersonaggi() {
    const elenco = await fetchGet('https://api.sampleapis.com/futurama/characters');
    var personaggi = document.getElementById('personaggi');
    elenco.forEach(element => {
        var span = document.createElement('span');
        span.innerHTML = '👉 ';
        var li = document.createElement('li');
        li.className = 'list-group-item';
        var a = document.createElement('a');
        a.href = '#';
        a.innerHTML = element.name.first + ' ' + element.name.middle + ' '  + element.name.last;
        li.appendChild(span);
        li.appendChild(a);
        personaggi.appendChild(li);
    });
}