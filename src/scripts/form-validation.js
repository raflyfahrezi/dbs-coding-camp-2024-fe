const formValidation = () => {
  const formInput = document.getElementById('form-input')
  const nameFormInput = formInput.elements.nama
  const deadlineFormInput = formInput.elements.deadline

  const blurEventHandler = (event) => {
    // Validate the field
    const isValid = event.target.validity.valid
    const errorMessage = event.target.validationMessage

    const connectedValidationId = event.target.getAttribute('aria-describedby')
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage
      connectedValidationEl.classList.remove('text-dark')
      connectedValidationEl.classList.add('text-danger')
    } else {
      connectedValidationEl.innerText =
        connectedValidationEl.dataset.defaulttext || ''
      connectedValidationEl.classList.remove('text-danger')
      connectedValidationEl.classList.add('text-dark')
    }
  }

  const customValidationNameHandler = (event) => {
    event.target.setCustomValidity('')
    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Wajib diisi.')
      return
    }

    if (event.target.validity.tooShort) {
      event.target.setCustomValidity(
        'Minimal panjang adalah tiga karakter ya ges'
      )
      return
    }
  }

  nameFormInput.addEventListener('change', customValidationNameHandler)
  nameFormInput.addEventListener('invalid', customValidationNameHandler)
  nameFormInput.addEventListener('blur', blurEventHandler)

  const customValidationDeadlineHandler = (event) => {
    event.target.setCustomValidity('')

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Wajib diisi.')
      return
    }

    if (new Date(event.target.value) < Date.now()) {
      event.target.setCustomValidity(
        'Tanggal deadline harus lebih besar atau sama dengan tanggal sekarang.'
      )
      return
    }
  }

  deadlineFormInput.addEventListener('change', customValidationDeadlineHandler)
  deadlineFormInput.addEventListener('invalid', customValidationDeadlineHandler)
  deadlineFormInput.addEventListener('blur', blurEventHandler)
}

export default formValidation
