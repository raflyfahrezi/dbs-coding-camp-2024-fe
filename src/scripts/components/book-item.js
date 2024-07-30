//  TODO 3 : Selesaikan pembuatan BookItem ini
class BookItem extends HTMLElement {
    static observedAttributes = [
        "id",
        "title",
        "author",
        "borrowing-date",
        "deadline",
    ];

    constructor() {
        super();
    }

    handleDelete() {}
    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        const deleteButton = this.querySelector("delete-button");
    }

    render() {
        this.innerHTML = `
            <div class="card">
                <div>
                    <p class="text-title">${this._title}</p>
                    <p class="text-author">Penulis : ${this._author}</p>
                    <p class="text-small">
                        Tanggal Pinjam :
                        ${new Date(this["_borrowing-date"]).toLocaleDateString(
                            "id-ID",
                            {
                                dateStyle: "full",
                            }
                        )}
                    </p>
                    <p class="text-small">
                        Tanggal Dikembalikan :
                        ${new Date(this._deadline).toLocaleDateString("id-ID", {
                            dateStyle: "full",
                        })}
                    </p>
                </div>
                <delete-button data-id=${this._id}></delete-button>
            </div>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[`_${name}`] = newValue;
        this.render();
    }
}

customElements.define("book-item", BookItem);
