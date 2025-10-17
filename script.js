document.addEventListener('DOMContentLoaded', function () {
  // ======== 1. INICIALIZAR LIBRERÍA DE ANIMACIONES (AOS) ========
  AOS.init({
    duration: 800,
    once: true,
  })

  // ======== 2. CONTADOR ANIMADO ========
  const counter = document.getElementById('counter')
  if (counter) {
    const target = +counter.innerText
    counter.innerText = '0' // Empezar en 0

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let current = 0
            const increment = target / 100 // Controla la velocidad

            const updateCounter = () => {
              if (current < target) {
                current += increment
                counter.innerText = Math.ceil(current)
                requestAnimationFrame(updateCounter)
              } else {
                counter.innerText = target
              }
            }
            updateCounter()
            observer.unobserve(counter) // Animar solo una vez
          }
        })
      },
      { threshold: 0.5 }
    ) // Iniciar cuando el 50% del elemento sea visible

    observer.observe(counter)
  }

  // ======== 3. FORMULARIO DE CONTACTO DINÁMICO (AJAX) ========
  const contactForm = document.getElementById('contact-form')
  const emailInput = document.getElementById('email')
  const formResult = document.getElementById('form-result')
  const submitButton = document.getElementById('submit-button')
  const buttonText = submitButton.querySelector('.button-text')
  const spinner = submitButton.querySelector('.spinner-border')

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  if (emailInput) {
    emailInput.addEventListener('keyup', () => {
      if (emailInput.value === '') {
        emailInput.classList.remove('is-valid', 'is-invalid')
        return
      }
      if (validateEmail(emailInput.value)) {
        emailInput.classList.remove('is-invalid')
        emailInput.classList.add('is-valid')
      } else {
        emailInput.classList.remove('is-valid')
        emailInput.classList.add('is-invalid')
      }
    })
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault()
      formResult.innerHTML = '' // Limpiar mensajes previos

      if (!validateEmail(emailInput.value)) {
        formResult.innerHTML = `<div class="alert alert-danger mt-3">Por favor, introduce un correo electrónico válido.</div>`
        return
      }

      buttonText.textContent = 'Enviando...'
      spinner.classList.remove('d-none')
      submitButton.disabled = true

      const formData = new FormData(this)
      const action = this.getAttribute('action')

      axios
        .post(action, formData, { headers: { Accept: 'application/json' } })
        .then((response) => {
          formResult.innerHTML = `<div class="alert alert-success mt-3">¡Mensaje enviado con éxito! Gracias por contactarnos.</div>`
          contactForm.reset()
          emailInput.classList.remove('is-valid', 'is-invalid')
        })
        .catch((error) => {
          formResult.innerHTML = `<div class="alert alert-danger mt-3">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</div>`
        })
        .finally(() => {
          buttonText.textContent = 'Enviar Mensaje'
          spinner.classList.add('d-none')
          submitButton.disabled = false
        })
    })
  }

  // ======== 4. ACTUALIZACIÓN DINÁMICA DEL AÑO EN EL FOOTER ========
  const yearSpan = document.getElementById('current-year')
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear()
  }
})
