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
    this.dispatchEvent(
      new CustomEvent("book-delete", {
        detail: {
          id: this._id,
        },
        bubbles: true,
      }),
    );
  }
  handleUpdate() {
    this.dispatchEvent(
      new CustomEvent("book-update", {
        detail: {
          id: this._id,
        },
        bubbles: true,
      }),
    );
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="card" data-aos="flip-up" data-aos-duration="500" data-aos-delay="${
              50 * this._index
            }">
                <div>
                    <p class="text-title">${this._title}</p>
                    <p class="text-author">Penulis : ${this._author}</p>
                    
                </div>
                <delete-button data-id=${this._id}></delete-button>
                <edit-button data-id=${this._id}></edit-button>
            </div>
        `;
    const deleteButton = this.querySelector("delete-button");
    const editButton = this.querySelector("edit-button");

    if (deleteButton) {
      deleteButton.addEventListener("click", this.handleDelete);
    }
    if (editButton) {
      editButton.addEventListener("click", this.handleUpdate);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
    this.render();
  }
}

customElements.define("book-item", BookItem);
