document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const submitBtn = document.getElementById("submitBtn");
  const taskList = document.getElementById("taskList");

  // Function to load tasks from localStorage
  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      taskList.innerHTML = savedTasks;
      addEventListenersToTasks();
    }
  }

  // Function to save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
  }

  // Function to add event listeners to tasks
  function addEventListenersToTasks() {
    const checkboxes = taskList.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const listItem = this.parentElement;
        if (this.checked) {
          listItem.querySelector("span").style.textDecoration = "line-through";
        } else {
          listItem.querySelector("span").style.textDecoration = "none";
        }
        saveTasks();
      });
    });

    const deleteButtons = taskList.querySelectorAll("button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const listItem = this.parentElement;
        listItem.remove();
        saveTasks();
      });
    });
  }

  // Load tasks from localStorage when the page loads
  loadTasks();

  function addTask() {
    const taskText = taskInput.value;
    if (taskText.trim() === "") return; // Prevent adding empty tasks

    const listItem = document.createElement("li");

    // Create a checkbox input
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Create a delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    // Create a span element to hold the task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    // Append the checkbox, task text, and delete button to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteBtn);

    // Add event listener to the delete button to remove the task
    deleteBtn.addEventListener("click", function () {
      listItem.remove();
      saveTasks(); // Update localStorage when a task is deleted
    });

    // Add event listener to the checkbox to toggle completed status
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        taskSpan.style.textDecoration = "line-through";
      } else {
        taskSpan.style.textDecoration = "none";
      }
      saveTasks(); // Update localStorage when a task is marked as completed
    });

    // Append the list item to the task list
    taskList.appendChild(listItem);

    // Save tasks to localStorage whenever a new task is added
    saveTasks();

    // Clear the input field
    taskInput.value = "";
  }

  submitBtn.addEventListener("click", addTask);
});
