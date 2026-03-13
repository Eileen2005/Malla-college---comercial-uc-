const ramos = document.querySelectorAll(".ramo");
let aprobados = [];

function actualizarMalla() {
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    const prerreq = ramo.dataset.prerreq;

    ramo.classList.remove("aprobado");

    if (aprobados.includes(id)) {
      ramo.classList.add("aprobado");
    }

    if (prerreq) {
      if (aprobados.includes(prerreq)) {
        ramo.classList.remove("bloqueado");
        ramo.disabled = false;
      } else {
        if (!aprobados.includes(id)) {
          ramo.classList.add("bloqueado");
        }
        ramo.disabled = !aprobados.includes(id);
      }
    }
  });
}

ramos.forEach(ramo => {
  ramo.addEventListener("click", () => {
    const id = ramo.dataset.id;

    if (ramo.classList.contains("bloqueado")) return;

    if (aprobados.includes(id)) {
      aprobados = aprobados.filter(r => r !== id);
    } else {
      aprobados.push(id);
    }

    actualizarMalla();
  });
});

actualizarMalla();
