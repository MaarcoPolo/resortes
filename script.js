// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
  // ======== ACTUALIZACIÓN DINÁMICA DEL AÑO EN EL FOOTER ========
  // Busca el elemento con el id 'current-year' y le inserta el año actual.
  const yearSpan = document.getElementById('current-year')
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear()
  }
})
