/*
Interactive To-Do List
----------------------
Features:
1. Add task
2. Press Enter to add task
3. Mark task as completed
4. Delete task
5. Save tasks in LocalStorage
6. Load tasks after page refresh
7. Clear all tasks
*/

// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearAllBtn = document.getElementById("clearAllBtn");
const message = document.getElementById("message");

// Get tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display existing tasks when the page loads
displayTasks();

// Add task when button is clicked
addTaskBtn.addEventListener("click", addTask);

// Add task when Enter key is pressed
taskInput.addEventListener("keydown", function(event) {


if (event.key === "Enter") {
    addTask();
}

});

// Function to add a new task
function addTask() {


const taskText = taskInput.value.trim();


// Check if input is empty
if (taskText === "") {

    message.textContent = "Please enter a task.";

    return;
}


// Create a task object
const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
};


// Add task to array
tasks.push(newTask);


// Save tasks
saveTasks();


// Display tasks
displayTasks();


// Clear input
taskInput.value = "";


// Remove error message
message.textContent = "";


// Put cursor back inside input
taskInput.focus();


}

// Function to display all tasks
function displayTasks() {


// Clear current list
taskList.innerHTML = "";


// Check if there are no tasks
if (tasks.length === 0) {

    const emptyMessage = document.createElement("li");

    emptyMessage.textContent = "No tasks yet. Add your first task!";

    emptyMessage.style.textAlign = "center";
    emptyMessage.style.color = "#888";
    emptyMessage.style.padding = "20px";

    taskList.appendChild(emptyMessage);

    updateTaskCount();

    return;
}


// Create each task
tasks.forEach(function(task) {

    // Create list item
    const listItem = document.createElement("li");

    listItem.className = "task-item";


    // Add completed class if task is completed
    if (task.completed) {
        listItem.classList.add("completed");
    }


    // Create checkbox
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className = "task-checkbox";

    checkbox.checked = task.completed;


    // Create task text
    const taskText = document.createElement("span");

    taskText.className = "task-text";

    taskText.textContent = task.text;


    // Create delete button
    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-btn";

    deleteButton.textContent = "Delete";


    // When checkbox is clicked
    checkbox.addEventListener("change", function() {

        task.completed = checkbox.checked;

        saveTasks();

        displayTasks();

    });


    // When delete button is clicked
    deleteButton.addEventListener("click", function() {

        deleteTask(task.id);

    });


    // Add elements to list item
    listItem.appendChild(checkbox);

    listItem.appendChild(taskText);

    listItem.appendChild(deleteButton);


    // Add list item to task list
    taskList.appendChild(listItem);

});


// Update task count
updateTaskCount();


}

// Function to delete a task
function deleteTask(taskId) {


tasks = tasks.filter(function(task) {

    return task.id !== taskId;

});


saveTasks();

displayTasks();


}

// Function to save tasks in LocalStorage
function saveTasks() {


localStorage.setItem("tasks", JSON.stringify(tasks));


}

// Function to update task count
function updateTaskCount() {


const totalTasks = tasks.length;

const completedTasks = tasks.filter(function(task) {

    return task.completed;

}).length;


if (totalTasks === 0) {

    taskCount.textContent = "0 tasks";

} else {

    taskCount.textContent =
        totalTasks +
        " tasks | " +
        completedTasks +
        " completed";

}


}

// Clear all tasks
clearAllBtn.addEventListener("click", function() {


if (tasks.length === 0) {

    return;
}


const confirmDelete = confirm(
    "Are you sure you want to delete all tasks?"
);


if (confirmDelete) {

    tasks = [];

    saveTasks();

    displayTasks();

    message.textContent = "";

}

});
