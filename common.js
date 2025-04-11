// Function to navigate back to Apps Dashboard
function goBack() {
    window.location.href = "apps.html"; // Redirects to the Apps Dashboard
}

// Function to confirm and handle logout
function confirmLogout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        alert("You have been logged out.");
        window.location.href = "login.html"; // Redirects to the Login page
    }
}
