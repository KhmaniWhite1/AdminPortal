// Function to load the student list dynamically
async function loadStudents() {
    try {
        const response = await fetch("http://127.0.0.1:5000/get_students");
        if (!response.ok) {
            throw new Error(`Failed to fetch students: ${response.statusText}`);
        }
        const students = await response.json();
        const studentList = document.getElementById("studentList");
        studentList.innerHTML = ""; // Clear existing list

        students.forEach(student => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="student-item">
                    <span>${student.name} (ID: ${student.id})</span>
                    <div class="student-controls">
                        <button class="btn-present" onclick="markAttendance('${student.id}', 'Present')">Present</button>
                        <button class="btn-absent" onclick="markAttendance('${student.id}', 'Absent')">Absent</button>
                        <button class="btn-remove" onclick="removeStudent('${student.id}')">Remove</button>
                    </div>
                </div>
            `;
            studentList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error loading students:", error);
        alert("Failed to load students. Please try again later.");
    }
}

// Function to add a new student
async function addNewStudent() {
    const studentName = prompt("Enter the new student's name:");
    if (!studentName) {
        alert("No student name entered. Operation cancelled.");
        return;
    }

    try {
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
            throw new Error(result.error);
        }
    } catch (error) {
        console.error("Error adding student:", error);
        alert(`Failed to add student: ${error.message}`);
    }
}

// Function to remove a student by ID
async function removeStudent(studentId) {
    const confirmRemove = confirm(`Are you sure you want to remove the student with ID ${studentId}?`);
    if (!confirmRemove) {
        return;
    }

    try {
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
            throw new Error(result.error);
        }
    } catch (error) {
        console.error("Error removing student:", error);
        alert(`Failed to remove student: ${error.message}`);
    }
}

// Function to mark attendance (Present/Absent)
async function markAttendance(studentId, status) {
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date

    try {
        const response = await fetch("http://127.0.0.1:5000/mark_attendance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: studentId, status, date: currentDate })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error("Error marking attendance:", error);
        alert(`Failed to mark attendance: ${error.message}`);
    }
}

// Load data on page load
window.onload = function() {
    loadStudents(); // Load student list
};
