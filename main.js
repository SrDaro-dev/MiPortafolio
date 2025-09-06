// Seleccionamos elementos
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Evento clic en hamburguesa
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');   // Muestra/oculta menú
  hamburger.classList.toggle('active'); // Animación de hamburguesa
});
// Cerrar menú al hacer clic fuera
document.addEventListener('click', (event) => {
  const isClickInside = event.target.closest('.navbar');
  
  if (!isClickInside) {
    navLinks.classList.remove('show');
    hamburger.classList.remove('active');
  }
});
// Cerrar menú al redimensionar la ventana
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) { // Umbral para menú de escritorio
    navLinks.classList.remove('show');
    hamburger.classList.remove('active');
  }
});
