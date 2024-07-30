import "./components/index.js";
import formValidation from "./form-validation.js";

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
    document.dispatchEvent(new Event(RENDER_EVENT));

    formInput.reset();
});
function deleteBook(bookId) {
    const index = BOOKS.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        BOOKS.splice(index, 1);
        saveToStorage();
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
}
function createBookElement(bookItem) {
    const bookElement = document.createElement("book-item");
    bookElement.setAttribute("id", bookItem.id);
    bookElement.setAttribute("title", bookItem.title);
    bookElement.setAttribute("author", bookItem.author);
    bookElement.setAttribute("deadline", bookItem.deadline);
    bookElement.setAttribute("borrowing-date", bookItem.borrowing_date);
    bookElement.addEventListener("book-delete", (event) => {
        const bookId = event.detail.id;
        deleteBook(bookId);
    });
    return bookElement;
}

document.addEventListener(RENDER_EVENT, function () {
    const bookList = document.getElementById("book-lists");

    bookList.innerHTML = "";

    for (const bookItem of BOOKS) {
        bookList.append(createBookElement(bookItem));
    }
});

document.addEventListener("DOMContentLoaded", () => {
    formValidation();
    // TODO 2 : Import data dummy dari BOOKS js

    BOOKS = JSON.parse(localStorage.getItem("books")) || [];

    document.dispatchEvent(new Event(RENDER_EVENT));
});
