const formValidation = () => {
  const formInput = document.getElementById('form-input')
  const nameFormInput = formInput.elements.nama
  const descriptionFormInput = formInput.elements.deskripsi
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

  // TODO 12 : Validasi input nama

  // TODO 12.a : Buat fungsi event handler untuk validasi nama
  const customValidationNameHandler = (event) => {
    event.target.setCustomValidity('')
    // TODO 12.b : Validasi jika tidak diisi
    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Wajib diisi.')
      return
    }

    // TODO 12.c : Validasi jika terlalu pendek

    if (event.target.validity.tooShort) {
      event.target.setCustomValidity(
        'Minimal panjang adalah tiga karakter ya ges'
      )
      return
    }
  }

  // TODO 12.d : Jadikan fungsi sebelumnya event listener untuk event change dan invalid
  nameFormInput.addEventListener('change', customValidationNameHandler)
  nameFormInput.addEventListener('invalid', customValidationNameHandler)
  // TODO 12.e : Tambahkan event handler khusus untuk event blur
  nameFormInput.addEventListener('blur', blurEventHandler)

  // TODO 13 : Validasi input deskripsi
  // TODO 13.a : Buat fungsi event handler untuk validasi deskripsi

  const customValidationDescriptionHandler = (event) => {
    event.target.setCustomValidity('')

    // TODO 13.b : Validasi jika tidak diisi
    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Wajib diisi.')
      return
    }

    // TODO 13.c : Validasi jika terlalu pendek
    if (event.target.validity.tooShort) {
      event.target.setCustomValidity('Minimal panjang adalah enam karakter.')
      return
    }
  }

  // TODO 13.d : Jadikan fungsi sebelumnya event listener untuk event change dan invalid
  descriptionFormInput.addEventListener(
    'change',
    customValidationDescriptionHandler
  )
  descriptionFormInput.addEventListener(
    'invalid',
    customValidationDescriptionHandler
  )

  // TODO 13.e : Tambahkan event handler khusus untuk event blur
  descriptionFormInput.addEventListener('blur', blurEventHandler)

  // TODO 14 : Validasi input deadline

  // TODO 14.a : Buat fungsi event handler untuk validasi deskripsi
  const customValidationDeadlineHandler = (event) => {
    event.target.setCustomValidity('')

    // TODO 14.b : Validasi jika tidak diisi

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Wajib diisi.')
      return
    }

    // TODO 14.c : Validasi tanggal deadline harus lebih besar atau sama dengan tanggal sekarang
    if (new Date(event.target.value) < Date.now()) {
      event.target.setCustomValidity(
        'Tanggal deadline harus lebih besar atau sama dengan tanggal sekarang.'
      )
      return
    }
  }

  // TODO 14.d : Jadikan fungsi sebelumnya event listener untuk event change dan invalid
  deadlineFormInput.addEventListener('change', customValidationDeadlineHandler)
  deadlineFormInput.addEventListener('invalid', customValidationDeadlineHandler)
  // TODO 14.e : Tambahkan event handler khusus untuk event blur
  deadlineFormInput.addEventListener('blur', blurEventHandler)
}

export default formValidation
