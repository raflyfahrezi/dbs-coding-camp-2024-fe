class EditButton extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = `
            <style>
                button {
                    color: #fff;
                    background-color: #20c997;
                    width:100%;
                    padding: 6px;
                    border-radius: 4px;
                    border: none;
                    cursor: pointer;
                }
            </style>
            <button>Edit</button>
        `;
    }
}

customElements.define("edit-button", EditButton);
