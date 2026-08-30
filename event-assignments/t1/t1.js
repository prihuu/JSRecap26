// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// add your code here
const todoContainer = document.querySelector('ul');
const dialog = document.querySelector('dialog');
const addButton = document.querySelector('.add-btn');
const form = document.querySelector('form');
const input = document.querySelector('form input');

function displayTodos() {
  todoContainer.innerHTML = '';
  todoList.forEach((todo) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    const label = document.createElement('label');
    label.textContent = todo.task;

    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;

      console.log(todoList);
    });

    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      const index = todoList.findIndex((item) => item.id === todo.id);
      todoList.splice(index, 1);
      todoContainer.removeChild(li);
      console.log(todoList);
    });
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);
    todoContainer.appendChild(li);
  });
}

addButton.addEventListener('click', () => {
  dialog.showModal();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskName = input.value.trim();
  if (taskName === '') {
    return;
  }
  const newTodo = {
    id: todoList.length > 0
    ? Math.max(...todoList.map((todo) => todo.id)) + 1
      : 1,
    task: taskName,
    completed: false,
  };

  todoList.push(newTodo);
  console.log(todoList);
  input.value = '';
  dialog.close();
  displayTodos();
});
displayTodos();
