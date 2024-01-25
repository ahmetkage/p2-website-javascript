const saldoSpan = document.querySelector('#saldoGebruiker');
const stortenBedragInput = document.querySelector('#stortenBedrag');
const opnemenBedragInput = document.querySelector('#opnemenBedrag');
const transactiesList = document.querySelector('#transacties');
const selectUser = document.querySelector('#selectUser');

let gebruikers = {
    '1': { saldo: 600, transacties: [] },
    '2': { saldo: 600, transacties: [] },
    '3': { saldo: 600, transacties: [] }
};

function storten(bedrag) {
    const gebruikerId = selectUser.value;
    if (bedrag <= 0 || isNaN(bedrag)) {
        alert('Voer een positief getal in.');
        return;
    }

    gebruikers[gebruikerId].saldo += parseFloat(bedrag);
    voegTransactieToe(gebruikerId, 'Storting', bedrag);
    updateUI(gebruikerId);
}

function opnemen(bedrag) {
    const gebruikerId = selectUser.value;
    if (bedrag > gebruikers[gebruikerId].saldo || isNaN(bedrag)) {
        alert('Kan niet opnemen, omdat er niet genoeg saldo is of het bedrag is ongeldig.');
        return;
    }

    gebruikers[gebruikerId].saldo -= parseFloat(bedrag);
    voegTransactieToe(gebruikerId, 'Opname', bedrag);
    updateUI(gebruikerId);
}

function voegTransactieToe(gebruikerId, soort, bedrag) {
    const transactie = {
        soort,
        bedrag: parseFloat(bedrag),
        datum: new Date()
    };

    gebruikers[gebruikerId].transacties.push(transactie);
    toonTransacties(gebruikerId);
}

function toonTransacties(gebruikerId) {
    while (transactiesList.firstChild) {
        transactiesList.firstChild.remove();
    }

    for (const transactie of gebruikers[gebruikerId].transacties) {
        const li = document.createElement('li');
        li.textContent = `${transactie.datum.toLocaleDateString()} - ${transactie.soort}: €${transactie.bedrag}`;
        transactiesList.appendChild(li);
    }
}

function updateUI(gebruikerId) {
    saldoSpan.textContent = gebruikers[gebruikerId].saldo;
    stortenBedragInput.value = '';
    opnemenBedragInput.value = '';
    toonTransacties(gebruikerId);
}

document.querySelector('#storten').addEventListener('click', () => {
    storten(stortenBedragInput.value);
});

document.querySelector('#opnemen').addEventListener('click', () => {
    opnemen(opnemenBedragInput.value);
});

selectUser.addEventListener('change', () => {
    const gebruikerId = selectUser.value;
    saldoSpan.textContent = gebruikers[gebruikerId].saldo;
    toonTransacties(gebruikerId);
});
