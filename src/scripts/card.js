// create custom element

class Card extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {}

  render() {}

  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('my-card', Card)
