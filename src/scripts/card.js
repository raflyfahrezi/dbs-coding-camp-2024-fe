class Card extends HTMLElement {
  static observedAttributes = ['id', 'name', 'deadline', 'description']

  constructor() {
    super()

    this._id = this.getAttribute('id')
    this._name = this.getAttribute('name')
    this._deadline = this.getAttribute('deadline')
    this._description = this.getAttribute('description')
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
        <div class="card">
            <div class="card-body">
                <div>
                    <h3>${this._name}</h3>
                    <p class="mb-1">${this._description}</p>
                    <p style="font-size:0.7rem">Deadline : ${new Date(
                      this._deadline
                    ).toLocaleString('id-ID', {
                      dateStyle: 'full',
                      timeStyle: 'short',
                    })}</p>
                </div>
            </div>
        </div>
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Atribut ${name} diubah.`)
    console.log(`Nilai lama adalah ${oldValue}`)
    console.log(`Nilai baru adalah ${newValue}`)

    // Ubah nilai atribut yang telah disimpan
    this[`_${name}`] = newValue

    // Render konten ulang
    this.render()
  }
}

customElements.define('my-card', Card)
