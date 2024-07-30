class Footer extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "closed" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <style>
                footer {
                    box-sizing: border-box;
                    text-align: center;
                    color: rgba(0, 0, 0, 0.5);
                    font-weight: bold;
                    margin-bottom: 0.5rem
                }
            </style>
            <footer>
                <p>2024 - DBS Foundation Coding Camp</p>
            </footer>
        `;
    }
}

customElements.define("app-footer", Footer);
