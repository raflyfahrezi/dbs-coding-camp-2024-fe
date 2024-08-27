import formValidation from "../form-validation";

class BookForm extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    await this.render();
    formValidation(document.getElementById(this.getAttribute("form-id")));
  }

  async render() {
    this.innerHTML = ` <form
            id=${this.getAttribute("form-id")}
            class="card-body c-card form-input"
            data-aos="fade-down"
        >
            <form-control
                input-name="title"
                label="Judul Buku"
                placeholder="mis : Belajar JavaScript Untuk Pemula"
                min-length="3"
                description="Isi dengan judul buku (min 3 karakter)"
            ></form-control>
            <form-control
                input-name="author"
                label="Nama Penulis"
                placeholder="mis : Dicoding Indonesia"
                min-length="3"
                description="Isi dengan nama penulis buku (min 3 karakter)"
            ></form-control>

            <button class="btn btn-primary" id="save-button">Simpan</button>
        </form>`;
  }
}

customElements.define("book-form", BookForm);
