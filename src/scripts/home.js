import "./components/index.js";
import formValidation from "./form-validation.js";
import BOOKS_DUMMY from "../BOOKS.js";

let BOOKS = [];
const RENDER_EVENT = "RENDER_EVENT";

const formInput = document.getElementById("form-input");

function saveToStorage() {
    localStorage.setItem("books", JSON.stringify(BOOKS));
}

formInput.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = formInput.elements.title.value;
    const author = formInput.elements.author.value;
    const deadline = formInput.elements.deadline.value;

    const newBook = {
        id: +new Date(),
        title,
        author,
        borrowing_date: new Date().toISOString(),
        deadline: new Date(deadline).toISOString(),
    };
    BOOKS.push(newBook);
    saveToStorage();
    Sweetalert2.fire({
        title: "Buku berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
    });
    document.dispatchEvent(new Event(RENDER_EVENT));

    formInput.reset();
});
function deleteBook(bookId) {
    Sweetalert2.fire({
        title: "Anda Yakin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        cancelButtonColor: "red",
        confirmButtonColor: "blue",
    }).then((result) => {
        if (result.isConfirmed) {
            const index = BOOKS.findIndex((book) => book.id === bookId);
            if (index !== -1) {
                BOOKS.splice(index, 1);
                saveToStorage();
                Sweetalert2.fire({
                    title: "Buku berhasil dihapus",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3000,
                    position: "top-end",
                });
                document.dispatchEvent(new Event(RENDER_EVENT));
            }
        }
    });
}
function createBookElement(bookItem, index) {
    const bookElement = document.createElement("book-item");
    bookElement.setAttribute("id", bookItem.id);
    bookElement.setAttribute("title", bookItem.title);
    bookElement.setAttribute("author", bookItem.author);
    bookElement.setAttribute("deadline", bookItem.deadline);
    bookElement.setAttribute("borrowing-date", bookItem.borrowing_date);
    bookElement.setAttribute("index", index);
    bookElement.addEventListener("book-delete", (event) => {
        const bookId = event.detail.id;
        deleteBook(bookId);
    });
    return bookElement;
}

document.addEventListener(RENDER_EVENT, function () {
    const bookList = document.getElementById("book-lists");

    bookList.innerHTML = "";
    let index = 1;
    for (const bookItem of BOOKS) {
        bookList.append(createBookElement(bookItem, index));
        index++;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    formValidation();
    AOS.init();
    if (!localStorage.getItem("books")) {
        localStorage.setItem("books", JSON.stringify(BOOKS_DUMMY));
        BOOKS = JSON.parse(localStorage.getItem("books"));
    } else {
        BOOKS = JSON.parse(localStorage.getItem("books")) || [];
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
});
