document.getElementById("signUpForm").addEventListener("submit", registerUser);

function registerUser(event) {
    event.preventDefault();

    let name = document.getElementById("regName").value.trim();
    let password = document.getElementById("regPassword").value.trim();

    if (!name || !password) {
        alert("❌ Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let id = Math.floor(100000 + Math.random() * 900000).toString();
    let hashedPassword = btoa(password);

    users.push({ ID: id, Name: name, Password: hashedPassword });
    localStorage.setItem("users", JSON.stringify(users));

    alert(`✅ Hello, ${name}! Your ID # is ${id}. Your account has been created successfully.`);

    setTimeout(() => {
        updateExcelData(); // ✅ Store new user data in Excel
        downloadExcelFile(); // ✅ Ensure Excel file is updated & downloadable
        window.location.href = "login.html"; // Redirect after sign-up
    }, 2000);
}

function updateExcelData() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let storedWorkbook = localStorage.getItem("Admin Login Sheet.xlsx");
    let existingWorkbook;

    if (storedWorkbook) {
        try {
            storedWorkbook = atob(storedWorkbook); // ✅ Decode Base64 safely
            existingWorkbook = XLSX.read(storedWorkbook, { type: "binary" });
        } catch (error) {
            console.error("⚠ Invalid Base64 Encoding:", error);
            existingWorkbook = XLSX.utils.book_new();
        }
    } else {
        existingWorkbook = XLSX.utils.book_new();
    }

    let sheetName = "Admin Login Sheet"; // ✅ Updated sheet name

    // ✅ Fix: Remove old sheet before appending new users
    if (existingWorkbook.Sheets[sheetName]) {
        delete existingWorkbook.Sheets[sheetName];
        existingWorkbook.SheetNames = existingWorkbook.SheetNames.filter(name => name !== sheetName);
    }

    // ✅ Append new users to the sheet
    let worksheet = XLSX.utils.json_to_sheet(users);
    existingWorkbook.Sheets[sheetName] = worksheet;
    existingWorkbook.SheetNames.push(sheetName);

    let excelBinary = XLSX.write(existingWorkbook, { bookType: "xlsx", type: "binary" });
    localStorage.setItem("Admin Login Sheet.xlsx", btoa(excelBinary)); // ✅ Ensure Base64 Encoding

    alert(`✅ New users added to "Admin Login Sheet.xlsx"!`);
}

// ✅ Function to manually download updated Excel file
function downloadExcelFile() {
    try {
        let storedWorkbook = localStorage.getItem("Admin Login Sheet.xlsx");
        if (!storedWorkbook) {
            alert("❌ No Excel file found in local storage.");
            return;
        }

        let workbook = XLSX.read(atob(storedWorkbook), { type: "binary" });
        XLSX.writeFile(workbook, "Admin Login Sheet.xlsx");

        alert(`✅ Excel file downloaded successfully!`);
    } catch (error) {
        console.error("Excel Download Error:", error);
        alert("❌ Failed to download Excel file.");
    }
}
