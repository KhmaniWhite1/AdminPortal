// Storage for notes
const notes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to display saved notes
function loadNotes() {
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = ""; // Clear existing notes

    notes.forEach((note, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <p>${note}</p>
            <button class="btn btn-delete" onclick="deleteNote(${index})">Delete</button>
        `;
        noteList.appendChild(listItem);
    });

    // Save notes to localStorage so they're persistent
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to save a new note
function saveNote() {
    const noteInput = document.getElementById("noteInput").value.trim();
    if (noteInput !== "") {
        notes.push(noteInput);
        document.getElementById("noteInput").value = ""; // Clear input after saving
        loadNotes(); // Refresh note list
    } else {
        alert("Note cannot be empty!");
    }
}

// Function to delete a note
function deleteNote(index) {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
        notes.splice(index, 1); // Remove note from array
        loadNotes(); // Refresh note list
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

// Load notes on page load
window.onload = function() {
    loadNotes();
};
