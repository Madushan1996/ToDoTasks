// Select elements
const todoForm = document.querySelector('#todo-form');
const taskInput = document.querySelector('#task-input');
const dueDateInput = document.querySelector('#due-date-input');
const taskList = document.querySelector('#task-list');

// Initialize tasks
let tasks = [];

// Check if there are tasks in localStorage and load them
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}

// Add event listener to form submit
todoForm.addEventListener('submit', function(e) {
  e.preventDefault();
  addTask();
});

// Add a task
function addTask() {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  if (taskText === '') {
    return;
  }
  const task = {
    id: Date.now(),
    text: taskText,
    dueDate: dueDate
  };
  tasks.push(task);
  renderTasks();
  taskInput.value = '';
  dueDateInput.value = '';

  // Store tasks in localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Edit a task
function editTask(id) {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return;
  }
  const task = tasks[taskIndex];
  const newText = prompt('Enter new task text:', task.text);
  if (newText === null || newText.trim() === '') {
    return;
  }
  task.text = newText.trim();
  renderTasks();

  // Update tasks in localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();

  // Update tasks in localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    const taskDueDate = document.createElement('span');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    taskText.textContent = task.text;
    taskDueDate.textContent = task.dueDate;
    editButton.textContent = 'Edit';
    deleteButton.textContent = 'Delete';
    editButton.classList.add('edit-btn');
    deleteButton.classList.add('delete-btn');

    editButton.addEventListener('click', function() {
      editTask(task.id);
    });

    deleteButton.addEventListener('click', function() {
      deleteTask(task.id);
    });

    li.appendChild(taskText);
    li.appendChild(taskDueDate);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}