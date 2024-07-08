const formValidation = () => {
  const formInput = document.getElementById('form-input')
  const nameFormInput = formInput.elements.name
  const descriptionFormInput = formInput.elements.description
  const deadlineFormInput = formInput.elements.deadline

  // Validation Name

  const customValidationNameHandler = (event) => {
    event.target.setCustomValidity('')

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Wajib diisi.')
      return
    }

    if (event.target.validity.tooShort) {
      event.target.setCustomValidity('Minimal panjang adalah 3 karakter.')
      return
    }
  }

  nameFormInput.addEventListener('change', customValidationNameHandler)
  nameFormInput.addEventListener('invalid', customValidationNameHandler)
  nameFormInput.addEventListener('blur', (event) => {
    // Validate the field
    const isValid = event.target.validity.valid
    const errorMessage = event.target.validationMessage

    const connectedValidationId = event.target.getAttribute('aria-describedby')
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage
    } else {
      connectedValidationEl.innerText = ''
    }
  })

  // Validation Description

  const customValidationDescriptionHandler = (event) => {
    event.target.setCustomValidity('')

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Wajib diisi.')
      return
    }

    if (event.target.validity.tooShort) {
      event.target.setCustomValidity('Minimal panjang adalah enam karakter.')
      return
    }
  }

  descriptionFormInput.addEventListener(
    'change',
    customValidationDescriptionHandler
  )
  descriptionFormInput.addEventListener(
    'invalid',
    customValidationDescriptionHandler
  )
  descriptionFormInput.addEventListener('blur', (event) => {
    // Validate the field
    const isValid = event.target.validity.valid
    const errorMessage = event.target.validationMessage

    const connectedValidationId = event.target.getAttribute('aria-describedby')
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage
    } else {
      connectedValidationEl.innerText = ''
    }
  })

  // Validation Description

  const customValidationDeadlineHandler = (event) => {
    event.target.setCustomValidity('')

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Wajib diisi.')
      return
    }
  }

  deadlineFormInput.addEventListener('change', customValidationDeadlineHandler)
  deadlineFormInput.addEventListener('invalid', customValidationDeadlineHandler)
  deadlineFormInput.addEventListener('blur', (event) => {
    // Validate the field
    const isValid = event.target.validity.valid
    const errorMessage = event.target.validationMessage

    const connectedValidationId = event.target.getAttribute('aria-describedby')
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage
    } else {
      connectedValidationEl.innerText = ''
    }
  })
}

export default formValidation
