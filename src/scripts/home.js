import "./components/index.js";
import formValidation from "./form-validation.js";
import Swal, * as Sweetalert2 from "sweetalert2";
import AOS from "aos";
import "../styles/style.css";
import "aos/dist/aos.css";
import { addBook, getAllBooks, deleteBook, editBook } from "./data/api.js";

const RENDER_EVENT = "RENDER_EVENT";

const formInput = document.getElementById("add-form");

formInput.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = formInput.elements.title.value;
    const author = formInput.elements.author.value;

    const newBook = {
        id: +new Date(),
        title,
        author,
    };

    // TODO : panggil function addBook
    await addBook(newBook);

    Sweetalert2.fire({
        title: "Buku berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
    });
    document.dispatchEvent(new Event(RENDER_EVENT));

    formInput.reset();
});

function deleteBookHandler(bookId) {
    Sweetalert2.fire({
        title: "Anda Yakin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        cancelButtonColor: "red",
        confirmButtonColor: "blue",
    }).then(async (result) => {
        if (result.isConfirmed) {
            // TODO : panggil function deleteBook
            await deleteBook(bookId);
            Sweetalert2.fire({
                title: "Buku berhasil dihapus",
                icon: "success",
                showConfirmButton: false,
                timer: 3000,
                position: "top-end",
            });
            document.dispatchEvent(new Event(RENDER_EVENT));
        }
    });
}

async function updateBookHandler(bookId, title, author) {
    await Sweetalert2.fire({
        title: "Edit Buku",
        html: `
      <book-form form-id="edit-form"></book-form>
    `,
        focusConfirm: false,

        customClass: {
            htmlContainer: "align-left",
        },
        didRender: () => {
            const formEdit = document.getElementById("edit-form");
            formEdit.elements.title.value = title;
            formEdit.elements.author.value = author;
            formEdit.addEventListener("submit", async (e) => {
                e.preventDefault();

                const title = formEdit.elements.title.value;
                const author = formEdit.elements.author.value;

                const newBook = {
                    id: bookId,
                    title,
                    author,
                };

                // TODO : panggil function editBook
                await editBook(newBook);

                Sweetalert2.fire({
                    title: "Buku berhasil diubah",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                document.dispatchEvent(new Event(RENDER_EVENT));

                formEdit.reset();
            });
        },
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
        deleteBookHandler(bookItem.id);
    });
    bookElement.addEventListener("book-update", (event) => {
        updateBookHandler(bookItem.id, bookItem.title, bookItem.author);
    });
    return bookElement;
}

document.addEventListener(RENDER_EVENT, async function () {
    const bookList = document.getElementById("book-lists");

    // TODO : panggil function getAllBooks
    const BOOKS = await getAllBooks();

    bookList.innerHTML = "";
    let index = 1;
    for (const bookItem of BOOKS) {
        bookList.append(createBookElement(bookItem, index));
        index++;
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    AOS.init();

    document.dispatchEvent(new Event(RENDER_EVENT));
});
