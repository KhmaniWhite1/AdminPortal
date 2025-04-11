// Define the list of apps (removing URLs)
const apps = [
    { name: "Attendance Tracker" },
    { name: "Calendar" },
    { name: "Notes" },
    { name: "Task Manager" }
];

// Function to load apps dynamically (Only names)
function loadApps() {
    const appList = document.getElementById("appList");
    appList.innerHTML = ""; // Clear existing list

    apps.forEach(app => {
        const listItem = document.createElement("li");
        listItem.textContent = app.name; // Display only name
        appList.appendChild(listItem);
    });
}

// Function to add a new app (Only name, no link)
function addNewApp() {
    const appName = prompt("Enter the name of the new app:");

    if (appName) {
        apps.push({ name: appName });
        alert(`Added new app: ${appName}`);
        loadApps(); // Refresh the app list dynamically
    } else {
        alert("App name is required.");
    }
}

// Load apps on page load
window.onload = function() {
    loadApps(); // Load apps dynamically
};
