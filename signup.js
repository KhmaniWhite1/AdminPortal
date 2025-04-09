document.getElementById("signUpForm").addEventListener("submit", function(event) {
    event.preventDefault(); // ✅ Prevent default form submission

    let name = document.getElementById("regName").value.trim();
    let password = document.getElementById("regPassword").value.trim();

    // ✅ Input Validation
    if (name.length < 3) {
        alert("❌ Name must be at least 3 characters.");
        return;
    } else if (password.length < 6) {
        alert("❌ Password must be at least 6 characters.");
        return;
    }

    // ✅ Process Signup if Inputs Are Valid
    registerUser(name, password);
});

function registerUser(name, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let id = Math.floor(100000 + Math.random() * 900000).toString(); // Generate Random ID
    let hashedPassword = btoa(password);

    users.push({ ID: id, Name: name, Password: hashedPassword });
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ Show greeting with name & ID #
    alert(`✅ Hello, ${name}! Your ID # is ${id}. Your account has been created successfully.`);
    console.log(`✅ New Signup: Hello, ${name}! ID # ${id} has been registered.`);

    updateExcelData(); // ✅ Immediately update the Excel sheet

    setTimeout(() => {
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

    let sheetName = "Admin Login Sheet"; // ✅ Correct Sheet Name

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

    console.log(`✅ Excel Sheet Updated! New user data has been saved.`);
    alert(`✅ "Admin Login Sheet.xlsx" has been updated with new data.`);
}
