let kosarOsszeg = 0;

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('.kosarba').forEach(gomb => {
        gomb.addEventListener('click', function() {

            const termek = this.closest('.termek');
            const ar = parseInt(termek.dataset.ar);
            const nev = termek.dataset.nev;

            kosarOsszeg += ar;

            document.getElementById('kosar-osszeg').textContent = kosarOsszeg + " Ft";

            alert(`${nev} hozzáadva a kosárhoz!`);
        });
    });

});

