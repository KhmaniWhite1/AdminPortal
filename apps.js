// Define the list of apps with names and links
const apps = [
    { name: "Attendance Tracker", url: "attendance.html" },
    { name: "Calendar", url: "calendar.html" },
    { name: "Notes", url: "notes.html" },
    { name: "Task Manager", url: "tasks.html" }
];

// Function to load apps dynamically
function loadApps() {
    const appList = document.getElementById("appList");
    appList.innerHTML = ""; // Clear existing list

    apps.forEach(app => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${app.url}" class="app-link">${app.name}</a>`;
        appList.appendChild(listItem);
    });
}

// Function to add a new app
function addNewApp() {
    const appName = prompt("Enter the name of the new app:");
    const appURL = prompt("Enter the URL or file name for this app:");

    if (appName && appURL) {
        apps.push({ name: appName, url: appURL });
        alert(`Added new app: ${appName}`);
        loadApps(); // Refresh the app list dynamically
    } else {
        alert("App name and URL are required to add a new app.");
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

// Load apps on page load
window.onload = function() {
    loadApps(); // Load apps dynamically
};
