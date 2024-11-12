// script.js


document.addEventListener("DOMContentLoaded", function () {
  // Add an event listener to detect Enter key
  document
    .getElementById("taskInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        // Check if Enter key is pressed
        event.preventDefault(); // Prevent form submission or default behavior
        addTask(); // Call the addTask function
      }
    });

  loadTasks(); // Load tasks when the page loads
});

let draggedItem = null;

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value;

  if (taskText) {
    const taskList = document.getElementById("taskList");

    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    // Make the task draggable
    listItem.draggable = true;
    listItem.ondragstart = dragStart;
    listItem.ondragover = dragOver;
    listItem.ondrop = drop;

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      taskList.removeChild(listItem);
      saveTasks();
    };
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
    saveTasks();

    // Clear the input field
    taskInput.value = "";
  }
}

// Drag and Drop Functions
function dragStart(e) {
  draggedItem = e.target;
}

function dragOver(e) {
  e.preventDefault(); // Prevent default to allow dropping
}

function drop(e) {
  e.preventDefault();
  if (e.target.tagName === "LI" && e.target !== draggedItem) {
    const taskList = document.getElementById("taskList");
    taskList.insertBefore(draggedItem, e.target);
    saveTasks(); // Save new order in local storage
  }
}

// Save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((item) => {
    tasks.push(item.firstChild.textContent); // Save task text only
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((taskText) => {
      const taskList = document.getElementById("taskList");
      const listItem = document.createElement("li");
      listItem.textContent = taskText;

      // Make the task draggable
      listItem.draggable = true;
      listItem.ondragstart = dragStart;
      listItem.ondragover = dragOver;
      listItem.ondrop = drop;

      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function () {
        taskList.removeChild(listItem);
        saveTasks();
      };
      listItem.appendChild(deleteButton);

      taskList.appendChild(listItem);
    });
  }
}
