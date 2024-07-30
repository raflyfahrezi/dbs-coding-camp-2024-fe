const css = (a) => a;
class FormControl extends HTMLElement {
    static observedAttributes = [
        "type",
        "input-name",
        "label",
        "placeholder",
        "description",
        "min-length",
    ];

    constructor() {
        super();
        this["_type"] = this.getAttribute("type") || "text";
        this["_input-name"] = this.getAttribute("input-name");
        this["_label"] = this.getAttribute("label");
        this["_placeholder"] = this.getAttribute("placeholder");
        this["_description"] = this.getAttribute("description");
        this["_min-length"] = this.getAttribute("min-length");
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="form-group">
                <label for="input-${this["_input-name"]}">${this["_label"]}</label>
                <input
                    type="${this["_type"]}"
                    name="${this["_input-name"]}"
                    id="input-${this["_input-name"]}"
                    class="form-control"
                    placeholder="${this["_placeholder"]}"
                    aria-describedby="${this["_input-name"]}-description"
                    minlength="${this["_min-length"]}"
                    required
                />
                <p
                    id="${this["_input-name"]}-description"
                    class="${this["_input-name"]}-message form-text"
                    data-defaultText="${this["_description"]}"
                >
                    ${this["_description"]}
                </p>
            </div>
        `;
    }
}

customElements.define("form-control", FormControl);
