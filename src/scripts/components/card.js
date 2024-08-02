class BookItem extends HTMLElement {
    static observedAttributes = [
        "id",
        "title",
        "author",
        "borrowing-date",
        "deadline",
        "index",
    ];

    constructor() {
        super();

        this._id = this.getAttribute("id");
        this._title = this.getAttribute("title");
        this._author = this.getAttribute("author");
        this["_borrowing-date"] = this.getAttribute("borrowing-date");
        this._deadline = this.getAttribute("deadline");
        this._index = parseInt(this.getAttribute("index"));
    }

    handleDelete() {
        const id = parseInt(event.target.dataset.id);
        this.dispatchEvent(
            new CustomEvent("book-delete", {
                detail: {
                    id,
                },
                bubbles: true,
            })
        );
    }
    connectedCallback() {
        this.render();
        const deleteButton = this.querySelector("delete-button");
        if (deleteButton) {
            deleteButton.addEventListener("click", this.handleDelete);
        }
    }

    disconnectedCallback() {
        const deleteButton = this.querySelector("delete-button");

        deleteButton.removeEventListener("click", this.handleDelete);
    }

    render() {
        this.innerHTML = `
            <div class="card" data-aos="flip-up" data-aos-duration="500" data-aos-delay="${
                50 * this._index
            }">
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
