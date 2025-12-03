// --- Kérdések ---
const quizData = [
    { q: "Milyen ízvilágot szeretsz leginkább?", a: ["Csokis", "Gyümölcsös", "Ropogós", "Klasszikus"] },
    { q: "Mi jellemez téged a legjobban?", a: ["Szenvedélyes", "Vidám", "Praktikus", "Nyugodt"] },
    { q: "Mit keresel egy sütiben?", a: ["Gazdag ízt", "Frissességet", "Ropogást", "Hagyományos ízeket"] },
    { q: "Mikor eszel legszívesebben desszertet?", a: ["Este", "Délután", "Bármikor", "Családi ebéd után"] },
    { q: "Milyen típusú textúrát kedvelsz?", a: ["Krémes", "Könnyű", "Ropogós", "Puha, házias"] },
    { q: "Mennyire szereted az új ízeket?", a: ["Nagyon", "Közepesen", "Kicsit", "Maradok a klasszikusnál"] },
    { q: "Milyen hangulatban vagy általában?", a: ["Határozott", "Optimista", "Földhözragadt", "Megfontolt"] },
    { q: "Milyen édességet választanál egy ünnepre?", a: ["Csokitortát", "Gyümölcsös tortát", "Kekszet", "Dobost vagy rétest"] }
];

let current = 0;
let quizStarted = false;

let scores = {
    csokis: 0,
    gyumolcsos: 0,
    ropogos: 0,
    klasszikus: 0
};

// --- KEZDŐKÉPERNYŐ ---
document.getElementById("quiz").innerHTML = `
    <button id="startBtn" class="start">Kezdjük!</button>
`;

document.getElementById("nextBtn").style.display = "none";

// --- Start gomb ---
document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "startBtn") {
        quizStarted = true;
        loadQuestion();
        document.getElementById("nextBtn").style.display = "block";
    }
});

// --- Kérdés betöltése ---
function loadQuestion() {
    const quiz = document.getElementById("quiz");
    const q = quizData[current];

    let html = `<div class='question'>${q.q}</div><div class='answers'>`;
    q.a.forEach((ans, i) => {
        html += `
            <label>
                <input type='radio' name='answer' value='${i}'>
                <span>${ans}</span>
            </label>
        `;
    });
    html += `</div>`;

    quiz.innerHTML = html;
}

// --- Pontozás ---
function calculateScore(choice) {
    if (choice == 0) scores.csokis++;
    if (choice == 1) scores.gyumolcsos++;
    if (choice == 2) scores.ropogos++;
    if (choice == 3) scores.klasszikus++;
}

// --- Következő gomb ---
document.getElementById("nextBtn").addEventListener("click", () => {

    if (!quizStarted) return;

    const selected = document.querySelector("input[name='answer']:checked");
    if (!selected) return alert("Kérlek válassz egy opciót!");

    calculateScore(selected.value);

    current++;
    if (current < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// --- EREDMÉNY MEGJELENÍTÉSE ---
function showResult() {
    const maxCategory = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

    const recommendedSweet = {
        csokis: { nev: "Csokoládé torta szelet", kep: "csokitorta.jpg" },
        gyumolcsos: { nev: "Kézműves málna mousse", kep: "malnamousse.png" },
        ropogos: { nev: "Mandulás keksz", kep: "mandulas.jpg" },
        klasszikus: { nev: "Dobostorta (8 szeletes)", kep: "dobostorta.jpg" }
    };

    const card = `
        <div class="card">
            <h2>A hozzád illő süti:</h2>
            <p class="card-title">${recommendedSweet[maxCategory].nev}</p>
            <img src="${recommendedSweet[maxCategory].kep}" alt="Süti kép" class="card-img">
            <p>A nyitvatartás ideje alatt bármikor átveheted a nyereményed!</p>
        </div>
    `;

    // --- TELJES KÁRTYA MÓD ---
    document.body.classList.add("body-only-card");
    document.querySelector(".containerkviz").classList.add("only-card");

    // Csak a kártya maradjon a containerben
    document.querySelector(".containerkviz").innerHTML = card;

    // Next gomb eltűnik
    document.getElementById("nextBtn").style.display = "none";
}
