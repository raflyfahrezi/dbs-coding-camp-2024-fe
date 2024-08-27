class LoadingOverlay extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
    this._show = this.getAttribute("show") == "true";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = ` <style>
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
      <div class="loading-overlay">
      <loading-indicator display="block"></loading-indicator>
      </div>`;
  }
}
customElements.define("loading-overlay", LoadingOverlay);
