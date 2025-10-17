document.addEventListener('DOMContentLoaded', function () {
  // ======== INICIALIZAR LIBRERÍA DE ANIMACIONES (AOS) ========
  AOS.init({
    duration: 800, // Duración de la animación en milisegundos
    once: true, // La animación se ejecuta solo una vez
  })

  // ======== ACTUALIZACIÓN DINÁMICA DEL AÑO EN EL FOOTER ========
  const yearSpan = document.getElementById('current-year')
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear()
  }
})
