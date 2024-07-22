class Heading extends HTMLElement {
  static observedAttributes = ['color']

  constructor() {
    super()

    this._text = this.getAttribute('text')
    this._color = this.getAttribute('color')
  }

  connectedCallback() {
    this.render()

    console.log('Component Connected')
  }

  disconnectedCallback() {
    console.log('Component Disconnected')
  }

  render() {
    this.innerHTML = `<h1 style="color: ${this._color};">${this._text}</h1>`
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

customElements.define('my-heading', Heading)

// initialize

const myHeading = document.getElementById('myHeading')
const buttonChange = document.getElementById('buttonChange')
const buttonDelete = document.getElementById('buttonDelete')

// update attribute

buttonChange.addEventListener('click', () => {
  myHeading.setAttribute('color', 'blue')
})

// delete component

buttonDelete.addEventListener('click', () => {
  myHeading.remove()
})
