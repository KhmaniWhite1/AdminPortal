// Dummy Student Data (You can replace this with data from the backend)
const students = [
    { id: "123", name: "Alice" },
    { id: "456", name: "Bob" },
    { id: "789", name: "Charlie" }
];

// Attendance Data (For storing Present/Absent status)
const attendance = {};

// Function to load the student list dynamically
async function loadStudents() {
    const response = await fetch("http://127.0.0.1:5000/get_students");
    const students = await response.json();
    const studentList = document.getElementById("studentList");

    studentList.innerHTML = ""; // Clear existing list
    students.forEach(student => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${student.name}
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
        loadStudents();
    } else {
        alert("No student name entered. Operation cancelled.");
    }
}

// Function to mark attendance (Present/Absent)
async function markAttendance(studentId, status) {
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date
    await fetch("http://127.0.0.1:5000/mark_attendance", {
        method: "POST",
        headers:
