const formValidation = () => {
    const formInput = document.getElementById("form-input");

    const blurEventHandler = (event) => {
        // Validate the field
        const isValid = event.target.validity.valid;
        const errorMessage = event.target.validationMessage;

        const connectedValidationId =
            event.target.getAttribute("aria-describedby");
        const connectedValidationEl = connectedValidationId
            ? document.getElementById(connectedValidationId)
            : null;

        if (connectedValidationEl && errorMessage && !isValid) {
            connectedValidationEl.innerText = errorMessage;
            connectedValidationEl.classList.remove("text-dark");
            connectedValidationEl.classList.add("text-danger");
        } else {
            connectedValidationEl.innerText =
                connectedValidationEl.dataset.defaulttext || "";
            console.log(connectedValidationEl.dataset);
            connectedValidationEl.classList.remove("text-danger");
            connectedValidationEl.classList.add("text-dark");
        }
    };

    // TODO 12 : Validasi input nama

    // TODO 12.a : Buat fungsi event handler untuk validasi nama
    const customValidationNameHandler = (event) => {
        event.target.setCustomValidity("");
        // TODO 12.b : Validasi jika tidak diisi

        // TODO 12.c : Validasi jika terlalu pendek
    };

    // TODO 12.d : Jadikan fungsi sebelumnya event listener untuk event change dan invalid

    // TODO 12.e : Tambahkan event handler khusus untuk event blur

    // TODO 13 : Validasi input deskripsi
    // TODO 13.a : Buat fungsi event handler untuk validasi deskripsi

    const customValidationDescriptionHandler = (event) => {
        event.target.setCustomValidity("");

        // TODO 13.b : Validasi jika tidak diisi

        // TODO 13.c : Validasi jika terlalu pendek
    };

    // TODO 13.d : Jadikan fungsi sebelumnya event listener untuk event change dan invalid

    // TODO 13.e : Tambahkan event handler khusus untuk event blur
    descriptionFormInput.addEventListener("blur", blurEventHandler);

    // TODO 14 : Validasi input deadline

    // TODO 14.a : Buat fungsi event handler untuk validasi deskripsi
    const customValidationDeadlineHandler = (event) => {
        event.target.setCustomValidity("");

        // TODO 14.b : Validasi jika tidak diisi

        // TODO 14.c : Validasi tanggal deadline harus lebih besar atau sama dengan tanggal sekarang
    };

    // TODO 14.d : Jadikan fungsi sebelumnya event listener untuk event change dan invalid

    // TODO 14.e : Tambahkan event handler khusus untuk event blur
};

export default formValidation;
