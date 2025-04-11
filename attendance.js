// Function to load the student list dynamically
async function loadStudents() {
    const response = await fetch("http://127.0.0.1:5000/get_students");
    const students = await response.json();
    const studentList = document.getElementById("studentList");

    studentList.innerHTML = ""; // Clear existing list
    students.forEach(student => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${student.name} (ID: ${student.id})
            <div>
                <button class="btn-present" onclick="markAttendance('${student.id}', 'Present')">Present</button>
                <button class="btn-absent" onclick="markAttendance('${student.id}', 'Absent')">Absent</button>
                <button class="btn-remove" onclick="removeStudent('${student.id}')">Remove</button>
            </div>
        `;
        studentList.appendChild(listItem);
    });
}

// Function to add a new student
async function addNewStudent() {
    const studentName = prompt("Enter the new student's name:");
    if (studentName) {
        const response = await fetch("http://127.0.0.1:5000/add_student", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: studentName })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            loadStudents(); // Refresh student list dynamically
        } else {
            alert(`Failed to add student: ${result.error}`);
        }
    } else {
        alert("No student name entered. Operation cancelled.");
    }
}

// Function to remove a student
async function removeStudent(studentId) {
    const confirmRemove = confirm("Are you sure you want to remove this student?");
    if (confirmRemove) {
        const response = await fetch("http://127.0.0.1:5000/remove_student", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: studentId })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            loadStudents(); // Refresh student list dynamically
        } else {
            alert(`Failed to remove student: ${result.error}`);
        }
    }
}

// Function to mark attendance (Present/Absent)
async function markAttendance(studentId, status) {
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date
    const response = await fetch("http://127.0.0.1:5000/mark_attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: studentId, status, date: currentDate })
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
    } else {
        alert(`Failed to mark attendance: ${result.error}`);
    }
}

// Load data on page load
window.onload = function() {
    loadStudents();         // Load student list
};
