const ramos = document.querySelectorAll(".ramo");
let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

function guardarEstado() {
  localStorage.setItem("aprobados", JSON.stringify(aprobados));
}

function cumplePrerrequisitos(ramo) {
  const prerreq = ramo.dataset.prerreq;
  if (!prerreq) return true;

  const requisitos = prerreq.split(",").map(r => r.trim());
  return requisitos.every(req => aprobados.includes(req));
}

function actualizarMalla() {
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;

    ramo.classList.remove("aprobado");
    ramo.classList.remove("bloqueado");

    if (aprobados.includes(id)) {
      ramo.classList.add("aprobado");
    }

    if (!cumplePrerrequisitos(ramo) && !aprobados.includes(id)) {
      ramo.classList.add("bloqueado");
      ramo.disabled = true;
    } else {
      ramo.disabled = false;
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

    guardarEstado();
    actualizarMalla();
  });
});

actualizarMalla();
