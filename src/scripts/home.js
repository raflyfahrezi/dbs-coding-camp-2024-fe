import formValidation from './form-validation.js'

let TODOS = []
const RENDER_EVENT = 'RENDER_EVENT'

const formInput = document.getElementById('form-input')

const findTodoIndex = (todoId) => {
  for (const index in TODOS) {
    if (TODOS[index].id === todoId) {
      return index
    }
  }

  return -1
}

const deleteData = (id) => {
  const todoTarget = findTodoIndex(id)

  if (todoTarget === -1) return

  TODOS.splice(todoTarget, 1)

  document.dispatchEvent(new Event(RENDER_EVENT))
}

const makeTodo = (todo) => {
  const { id, name, deadline } = todo

  const wrapper = document.createElement('div')
  wrapper.style = 'display: flex; flex-direction: column; gap: 20px;'

  const card = document.createElement('my-card')
  card.setAttribute('id', id)
  card.setAttribute('name', name)
  card.setAttribute('deadline', deadline)

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('btn', 'btn-danger')
  deleteButton.style = 'width: 100%;'
  deleteButton.innerHTML = 'Delete'
  deleteButton.addEventListener('click', () => {
    deleteData(id)
  })

  wrapper.append(card)
  wrapper.appendChild(deleteButton)

  return wrapper
}

formInput.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = formInput.elements.nama.value
  const deadline = formInput.elements.deadline.value

  TODOS.push({
    id: +new Date(),
    name,
    deadline,
  })

  document.dispatchEvent(new Event(RENDER_EVENT))

  formInput.reset()
})

document.addEventListener(RENDER_EVENT, function () {
  const todoList = document.getElementById('todo-list')

  // clearing todo list item
  todoList.innerHTML = ''

  for (const todoItem of TODOS) {
    const todoElement = makeTodo(todoItem)

    todoList.append(todoElement)
  }
})

document.addEventListener('DOMContentLoaded', () => {
  formValidation()

  document.dispatchEvent(new Event(RENDER_EVENT))
})

import './card.js'