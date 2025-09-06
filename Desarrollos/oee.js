// oee.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("oeeForm");
  const resultados = document.getElementById("resultados");
  const erroresDiv = document.getElementById("errores");

  // Función para calcular OEE
  function calcularOEE() {
    const tiempoPlan = parseFloat(document.getElementById("tiempoPlan").value);
    const tiempoOp = parseFloat(document.getElementById("tiempoOp").value);
    const prodTeo = parseFloat(document.getElementById("prodTeo").value);
    const prodReal = parseFloat(document.getElementById("prodReal").value);
    const unidTot = parseFloat(document.getElementById("unidTot").value);
    const unidBuenas = parseFloat(document.getElementById("unidBuenas").value);

    let errores = [];

    // Validaciones
    if (isNaN(tiempoPlan) || tiempoPlan <= 0) errores.push("El tiempo planificado debe ser mayor a 0.");
    if (isNaN(tiempoOp) || tiempoOp < 0) errores.push("El tiempo operativo debe ser 0 o mayor.");
    if (tiempoOp > tiempoPlan) errores.push("El tiempo operativo no puede ser mayor que el planificado.");

    if (isNaN(prodTeo) || prodTeo <= 0) errores.push("La producción teórica debe ser mayor a 0.");
    if (isNaN(prodReal) || prodReal < 0) errores.push("La producción real debe ser 0 o mayor.");
    if (prodReal > prodTeo) errores.push("La producción real no puede ser mayor que la teórica.");

    if (isNaN(unidTot) || unidTot <= 0) errores.push("Las unidades totales deben ser mayores a 0.");
    if (isNaN(unidBuenas) || unidBuenas < 0) errores.push("Las unidades buenas deben ser 0 o mayores.");
    if (unidBuenas > unidTot) errores.push("Las unidades buenas no pueden superar a las totales.");

    if (errores.length > 0) {
      erroresDiv.innerHTML = errores.map(err => `<p style="color:red;">${err}</p>`).join("");
      resultados.style.opacity = 0;
      resultados.style.display = "none";
      return false;
    }

    erroresDiv.innerHTML = "";

    // Cálculos
    const disponibilidad = (tiempoOp / tiempoPlan) * 100;
    const rendimiento = (prodReal / prodTeo) * 100;
    const calidad = (unidBuenas / unidTot) * 100;
    const oee = (disponibilidad * rendimiento * calidad) / 10000;

    // Mostrar resultados con animación
    document.getElementById("resDisp").textContent = disponibilidad.toFixed(1) + "%";
    document.getElementById("resRend").textContent = rendimiento.toFixed(1) + "%";
    document.getElementById("resCal").textContent = calidad.toFixed(1) + "%";
    document.getElementById("resOee").textContent = oee.toFixed(1) + "%";

    resultados.style.display = "grid";
    resultados.style.opacity = 0;
    setTimeout(() => {
      resultados.style.transition = "opacity 0.5s ease-in-out";
      resultados.style.opacity = 1;
    }, 10);

    return true;
  }

  // Submit del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    calcularOEE();
  });

  // Limpiar resultados automáticamente si se cambia cualquier input
  const inputs = form.querySelectorAll("input[type='number']");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      resultados.style.opacity = 0;
      resultados.style.display = "none";
      erroresDiv.innerHTML = "";
    });
  });
});
