// options.js

document.addEventListener("DOMContentLoaded", function () {
    // Haal opgeslagen instellingen op
    const savedVolume = localStorage.getItem("volume") || 50;

    // Vul het formulier in met opgeslagen instellingen
    document.getElementById("volume").value = savedVolume;
});

function saveOptions() {
    // Haal waarden op uit het formulier
    const volume = document.getElementById("volume").value;

    // Sla instellingen op in localStorage
    localStorage.setItem("volume", volume);

    alert("Options saved!");
}

function backToMenu() {
    window.location.href = "index.html";
}
