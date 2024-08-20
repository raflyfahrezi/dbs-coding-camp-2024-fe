const BASE_URL = "https://books-api.dicoding.dev";
//  TODO : Buat fungsi untuk memanggil API disini
function getAllBooks() {
    return fetch(`${BASE_URL}/list`)
        .then((response) => response.json())
        .then((data) => data.books);
}

async function addBook({ id, title, author }) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": "12345",
        },
        body: JSON.stringify({ id, title, author }),
    };
    const response = await fetch(`${BASE_URL}/add`, options);
    const responseJSON = await response.json();
    return responseJSON;
}

async function editBook({ id, title, author }) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": "12345",
        },
        body: JSON.stringify({ id, title, author }),
    };
    const response = await fetch(`${BASE_URL}/edit/${id}`, options);
    const responseJSON = await response.json();
    return responseJSON;
}

async function deleteBook(id) {
    return fetch(`${BASE_URL}/delete/${id}`, {
        method: "DELETE",
        headers: {
            "X-Auth-Token": "12345",
        },
    })
        .then((response) => response.json())
        .then((data) => data.books);
}

export { getAllBooks, addBook, editBook, deleteBook };
