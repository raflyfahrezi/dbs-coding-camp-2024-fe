import formValidation from "./form-validation.js";

let TODOS = [];
const RENDER_EVENT = "RENDER_EVENT";
const STORAGE_KEY = "TODO_APPS";
const SAVED_EVENT = "SAVED_TODO";

const formInput = document.getElementById("form-input");

const isStorageExist = () => {
    if (typeof Storage === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
};

const saveData = () => {
    if (isStorageExist()) {
        const parsed = JSON.stringify(TODOS);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
};

const findTodoIndex = (todoId) => {
    for (const index in TODOS) {
        if (TODOS[index].id === todoId) {
            return index;
        }
    }

    return -1;
};

const deleteData = (id) => {
    const todoTarget = findTodoIndex(id);

    if (todoTarget === -1) return;

    TODOS.splice(todoTarget, 1);

    saveData();

    document.dispatchEvent(new Event(RENDER_EVENT));
};

const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const todo of data) {
            TODOS.push(todo);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
};

const makeTodo = (todo) => {
    const { id, name, description, deadline } = todo;

    const card = document.createElement("div");
    card.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.innerHTML = `
    <div>
    <h3>${name}</h3>
    <p class="mb-1">${description}</p>
    <p style="font-size:0.7rem">Deadline : ${new Date(deadline).toLocaleString(
        "id-ID",
        { dateStyle: "full", timeStyle: "short" }
    )}</p>
    </div>
  `;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.style = "width: 100%;";
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", () => {
        deleteData(id);
    });

    cardBody.append(deleteButton);
    card.append(cardBody);

    return card;
};

formInput.addEventListener("submit", (e) => {
    e.preventDefault();

    // TODO 5 : Ambil data dari form field
    const name = formInput.elements.nama.value;
    const description = formInput.elements.deskripsi.value;
    const deadline = formInput.elements.deadline.value;

    // TODO 6 : Tambahkan data ke TODOS array
    TODOS.push({
        id: +new Date(),
        name,
        description,
        deadline,
    });
    // TODO 7 : Render data
    document.dispatchEvent(new Event(RENDER_EVENT));
    // TODO 8 : Reset form
    formInput.reset();
    // TODO 9 : Simpan data ke localStorage
    saveData();
});

document.addEventListener(RENDER_EVENT, function () {
    const todoList = document.getElementById("todo-list");

    // clearing todo list item
    todoList.innerHTML = "";

    for (const todoItem of TODOS) {
        const todoElement = makeTodo(todoItem);

        todoList.append(todoElement);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    formValidation();
    // TODO 10: ambil data dari localStorage
    if (isStorageExist()) {
        loadDataFromStorage();
    }
    // TODO 11 : hapus starter data
    // TODOS = [
    //     {
    //         name: "Belajar",
    //         description: "Belajar JavaScript",
    //         deadline: "2024-12-31",
    //         id: +new Date(),
    //     },
    //     {
    //         name: "Belajar React",
    //         description: "Belajar React JS",
    //         deadline: "2024-12-30",
    //         id: +new Date(),
    //     },
    //     {
    //         name: "Belajar Vue",
    //         description: "Belajar Vue JS",
    //         deadline: "2024-12-29",
    //         id: +new Date(),
    //     },
    // ];
    //  TODO 1 : Render data diatas
    document.dispatchEvent(new Event(RENDER_EVENT));
});
