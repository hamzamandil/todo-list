//start
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".submit");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {
  //prevent default (browser will not refresh after click)
  event.preventDefault();
  //create todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement("li");
  newTodo.innerHTML = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //add todo to local storage
  saveLocalTodos(todoInput.value);
  //completed button
  const Complete = document.createElement("button");
  Complete.innerHTML = "<i class='fas fa-check-circle'>";
  Complete.classList.add("complet");
  todoDiv.appendChild(Complete);
  //delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "<i class='fas fa-minus-circle'>";
  deleteBtn.classList.add("delete");
  todoDiv.appendChild(deleteBtn);

  //add div to list
  todoList.appendChild(todoDiv);
  //clear todo input
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //delet todo
  if (item.classList[0] === "delete") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalStorageTodo(todo);
    //remove after animation ed
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    //
  }

  //check mark
  if (item.classList[0] === "complet") {
    const todo = item.parentElement;
    todo.classList.toggle("checked");
  }
}
//11min
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //create todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerHTML = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //completed button
    const Complete = document.createElement("button");
    Complete.innerHTML = "<i class='fas fa-check-circle'>";
    Complete.classList.add("complet");
    todoDiv.appendChild(Complete);
    //delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='fas fa-minus-circle'>";
    deleteBtn.classList.add("delete");
    todoDiv.appendChild(deleteBtn);

    //add div to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalStorageTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
