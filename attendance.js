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
        alert(result.message);
        loadStudents(); // Refresh student list
    } else {
        alert("No student name entered. Operation cancelled.");
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
    alert(result.message);
}

// Function to load calendar statistics
async function loadCalendarStats() {
    const response = await fetch("http://127.0.0.1:5000/get_attendance_stats");
    const stats = await response.json();

    const calendarEl = document.getElementById("calendar");
    calendarEl.innerHTML = "<h4>Attendance Statistics:</h4>";

    stats.forEach(stat => {
        const statItem = document.createElement("p");
        statItem.innerText = `Date: ${stat.date}, Present: ${stat.present}, Absent: ${stat.absent}`;
        calendarEl.appendChild(statItem);
    });
}

// Load data on page load
window.onload = function() {
    loadStudents();         // Load student list
    loadCalendarStats();    // Load calendar statistics
};
