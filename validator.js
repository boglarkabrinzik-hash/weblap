document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("mainForm");
    const errorBox = document.getElementById("form-errors");

    function mark(input, ok) {
        input.classList.remove("input-error", "input-ok");
        if (ok === true) input.classList.add("input-ok");
        if (ok === false) input.classList.add("input-error");
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let errors = [];

        const vezeteknev = document.getElementById("vezeteknev");
        const keresztnev = document.getElementById("keresztnev");
        const telefon = document.getElementById("telefon");
        const email = document.getElementById("email");
        const terms = document.getElementById("terms");

        if (vezeteknev.value.trim().length < 2) {
            errors.push("A vezetéknév túl rövid vagy hiányzik.");
            mark(vezeteknev, false);
        } else mark(vezeteknev, true);

        if (keresztnev.value.trim().length < 2) {
            errors.push("A keresztnév túl rövid vagy hiányzik.");
            mark(keresztnev, false);
        } else mark(keresztnev, true);

        const telRegex = /^(\+36|06)\s?\d{2}\s?\d{3}\s?\d{4}$/;
        if (!telRegex.test(telefon.value.trim())) {
            errors.push("Érvénytelen telefonszám formátum (pl.: +36 20 123 4567).");
            mark(telefon, false);
        } else mark(telefon, true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            errors.push("Érvénytelen e-mail cím.");
            mark(email, false);
        } else mark(email, true);

        if (!terms.checked) {
            errors.push("Az adatvédelmi nyilatkozat elfogadása kötelező.");
        }

        if (errors.length > 0) {
            errorBox.innerHTML = errors.join("<br>");
            errorBox.classList.add("show");
            return;
        }

        errorBox.classList.remove("show");

        alert("Sikeres küldés!");
        window.location.href = form.action;
    });
});
