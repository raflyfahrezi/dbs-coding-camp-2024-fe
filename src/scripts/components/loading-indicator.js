class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
    this._display = this.getAttribute("display");
  }

  static get observedAttributes() {
    return ["display"];
  }

  getCss() {
    return `
    .lds-ring,
    .lds-ring div {
      box-sizing: border-box;
    }
    .lds-ring {
      display: ${this._display};
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 8px solid currentColor;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: currentColor transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this._shadowRoot.innerHTML = `
      <style>${this.getCss()}</style>
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    `;
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "display") {
      this._display = newValue;
      this.render();
    }
  }
}

customElements.define("loading-indicator", LoadingIndicator);
