import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = "https://books-api.dicodingp.dev";

// Membuat instance axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Menambahkan interceptor untuk request
apiClient.interceptors.request.use(
  (config) => {
    // Menambahkan X-Auth-Token ke setiap request
    config.headers["X-Auth-Token"] = "12345";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Menambahkan interceptor untuk response
apiClient.interceptors.response.use(
  (response) => {
    // Bisa menambahkan logika tambahan jika diperlukan
    return response;
  },
  (error) => {
    Swal.fire({
      title: "Oops...",
      text: error.message,
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });

    return Promise.reject(error);
  },
);

async function getAllBooks() {
  const response = await apiClient.get("/list");
  return response.data.books;
}

async function addBook({ id, title, author }) {
  const response = await apiClient.post("/add", { id, title, author });
  return response.data;
}

async function editBook({ id, title, author }) {
  const response = await apiClient.put(`/edit/${id}`, { title, author });
  return response.data;
}

async function deleteBook(id) {
  const response = await apiClient.delete(`/delete/${id}`);
  return response.data.books;
}

export { getAllBooks, addBook, editBook, deleteBook };
