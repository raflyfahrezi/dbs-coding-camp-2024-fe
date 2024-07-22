class Heading extends HTMLElement {
  constructor() {
    super()

    this.render()
  }

  render() {
    this.innerHTML = `<h1>Hello World</h1>`
  }
}

customElements.define('my-heading', Heading)

// buatlah versi tombol

class Button extends HTMLElement {}

// define custom element
