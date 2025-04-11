// Event storage
const events = [];

// Function to load attendance stats dynamically
async function loadAttendanceStats() {
    const response = await fetch("http://127.0.0.1:5000/get_attendance_stats");
    const stats = await response.json();
    const tableBody = document.querySelector("#attendanceTable tbody");

    tableBody.innerHTML = ""; // Clear existing data

    stats.forEach(record => {
        const listItem = document.createElement("tr");
        const eventNames = events.filter(event => event.date === record.date).map(event => event.name).join(", ") || "No Events";

        listItem.innerHTML = `
            <td>${record.date}</td>
            <td>${record.present}</td>
            <td>${record.absent}</td>
            <td>${eventNames}</td>
        `;
        tableBody.appendChild(listItem);
    });
}

// Function to add a new event
function addNewEvent() {
    const eventName = prompt("Enter the event name:");
    const eventDate = prompt("Enter the event date (YYYY-MM-DD):");

    if (eventName && eventDate) {
        events.push({ name: eventName, date: eventDate });
        alert(`Added new event: ${eventName} on ${eventDate}`);
        loadAttendanceStats(); // Refresh the table to show the event
    } else {
        alert("Event name and date are required.");
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

// Load attendance stats on page load
window.onload = function() {
    loadAttendanceStats();
};
