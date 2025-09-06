// oee.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("oeeForm");
  const resultados = document.getElementById("resultados");
  const erroresDiv = document.getElementById("errores");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener valores
    const tiempoPlan = parseFloat(document.getElementById("tiempoPlan").value);
    const tiempoOp = parseFloat(document.getElementById("tiempoOp").value);
    const prodTeo = parseFloat(document.getElementById("prodTeo").value);
    const prodReal = parseFloat(document.getElementById("prodReal").value);
    const unidTot = parseFloat(document.getElementById("unidTot").value);
    const unidBuenas = parseFloat(document.getElementById("unidBuenas").value);

    // Validación
    let errores = [];
    if (tiempoOp > tiempoPlan) errores.push("El tiempo operativo no puede ser mayor que el planificado.");
    if (prodReal > prodTeo) errores.push("La producción real no puede ser mayor que la teórica.");
    if (unidBuenas > unidTot) errores.push("Las unidades buenas no pueden superar a las totales.");

    if (errores.length > 0) {
      erroresDiv.innerHTML = errores.map(err => `<p style="color:red;">${err}</p>`).join("");
      resultados.style.display = "none";
      return;
    }

    erroresDiv.innerHTML = "";

    // Cálculos
    const disponibilidad = (tiempoOp / tiempoPlan) * 100;
    const rendimiento = (prodReal / prodTeo) * 100;
    const calidad = (unidBuenas / unidTot) * 100;
    const oee = (disponibilidad * rendimiento * calidad) / 10000;

    // Mostrar resultados
    document.getElementById("resDisp").textContent = disponibilidad.toFixed(1) + "%";
    document.getElementById("resRend").textContent = rendimiento.toFixed(1) + "%";
    document.getElementById("resCal").textContent = calidad.toFixed(1) + "%";
    document.getElementById("resOee").textContent = oee.toFixed(1) + "%";

    resultados.style.display = "grid"; // mostrar tarjetas
  });
});
