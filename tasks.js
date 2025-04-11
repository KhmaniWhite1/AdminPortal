// Task storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to display saved tasks
function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear existing tasks

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <p>${task.text} (Due: ${task.date}) - ${task.completed ? "✅ Completed" : "❌ Pending"}</p>
            <div>
                <button class="btn-complete" onclick="toggleTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
                <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });

    // Save tasks to localStorage so they're persistent
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput").value.trim();
    const taskDate = document.getElementById("taskDate").value;

    if (taskInput !== "" && taskDate !== "") {
        tasks.push({ text: taskInput, date: taskDate, completed: false });
        document.getElementById("taskInput").value = ""; // Clear input after saving
        loadTasks(); // Refresh task list
    } else {
        alert("Task description and due date are required!");
    }
}

// Function to mark task as complete/incomplete
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    loadTasks(); // Refresh task list
}

// Function to delete a task
function deleteTask(index) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
        tasks.splice(index, 1); // Remove task from array
        loadTasks(); // Refresh task list
    }
}

// Function to confirm logout
function confirmLogout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        alert("You have been logged out.");
        window.location.href = "login.html"; // Redirect to login page
    }
}

// Load tasks on page load
window.onload = function() {
    loadTasks();
};
