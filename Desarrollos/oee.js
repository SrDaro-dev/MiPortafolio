document.getElementById("oeeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const erroresDiv = document.getElementById("errores");
  const resultadosDiv = document.getElementById("resultados");
  erroresDiv.textContent = "";
  resultadosDiv.innerHTML = "";

  try {
    // === DISPONIBILIDAD ===
    const tiempoPlan = parseFloat(document.getElementById("tiempoPlan").value);
    const tiempoParos = parseFloat(document.getElementById("tiempoParos").value);
    const disponibilidad = ((tiempoPlan - tiempoParos) / tiempoPlan) * 100;

    // === RENDIMIENTO ===
    const piezasProducidas = parseFloat(document.getElementById("piezasProducidas").value);
    const velocidadIdeal = parseFloat(document.getElementById("velocidadIdeal").value);
    const tiempoOperativo = parseFloat(document.getElementById("tiempoOperativo").value);
    const rendimiento = (piezasProducidas / (velocidadIdeal * tiempoOperativo)) * 100;

    // === CALIDAD ===
    const piezasBuenas = parseFloat(document.getElementById("piezasBuenas").value);
    const piezasTotales = parseFloat(document.getElementById("piezasTotales").value);
    const calidad = (piezasBuenas / piezasTotales) * 100;

    // === OEE ===
    const oee = (disponibilidad / 100) * (rendimiento / 100) * (calidad / 100) * 100;

    // Mostrar resultados
    const resultados = [
      { titulo: "Disponibilidad", valor: disponibilidad.toFixed(2) + "%" },
      { titulo: "Rendimiento", valor: rendimiento.toFixed(2) + "%" },
      { titulo: "Calidad", valor: calidad.toFixed(2) + "%" },
      { titulo: "OEE", valor: oee.toFixed(2) + "%", destacado: true }
    ];

    resultados.forEach(r => {
      const card = document.createElement("div");
      card.className = "result-card" + (r.destacado ? " highlight" : "");
      card.innerHTML = `<h4>${r.titulo}</h4><p>${r.valor}</p>`;
      resultadosDiv.appendChild(card);
    });

  } catch (err) {
    erroresDiv.textContent = "Error al calcular. Verifica los datos ingresados.";
  }
});
