function exportToExcel() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    let exportedUsers = users.map(user => ({
        Name: user.Name,
        ID: user.ID,
        Password: atob(user.Password)
    }));

    let existingWorkbook;
    try {
        let storedWorkbook = localStorage.getItem("Admin Portal Logins.xlsx");
        if (storedWorkbook) {
            existingWorkbook = XLSX.read(storedWorkbook, { type: "binary" });
        } else {
            existingWorkbook = XLSX.utils.book_new();
        }
    } catch (error) {
        console.warn("⚠ No existing Excel file found, creating a new one.");
        existingWorkbook = XLSX.utils.book_new();
    }

    let sheetName = "Admin Logins";
    let worksheet = existingWorkbook.Sheets[sheetName] || XLSX.utils.json_to_sheet([]);
    
    let updatedData = XLSX.utils.sheet_to_json(worksheet).concat(exportedUsers);
    worksheet = XLSX.utils.json_to_sheet(updatedData);
    XLSX.utils.book_append_sheet(existingWorkbook, worksheet, sheetName);

    let excelBinary = XLSX.write(existingWorkbook, { bookType: "xlsx", type: "binary" });
    localStorage.setItem("Admin Portal Logins.xlsx", excelBinary);

    alert("✅ New users have been added! Data is stored but not downloaded.");
}

// Function to manually download the Excel file when needed
function downloadExcelFile() {
    try {
        let storedWorkbook = localStorage.getItem("Admin Portal Logins.xlsx");
        if (!storedWorkbook) {
            alert("❌ No Excel file found in local storage.");
            return;
        }

        let workbook = XLSX.read(storedWorkbook, { type: "binary" });
        let fileName = "Admin Portal Logins.xlsx";

        XLSX.writeFile(workbook, fileName);
        alert(`✅ "${fileName}" has been downloaded!`);

    } catch (error) {
        console.error("Excel Download Error:", error);
        alert("❌ Failed to download Excel file.");
    }
}

// Call `exportToExcel()` after each user signs up to store data without downloading
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

    users.push({ Name: name, ID: id, Password: hashedPassword });
    localStorage.setItem("users", JSON.stringify(users));

    alert(`✅ Hello, ${name}! Your account has been created successfully.`);

    setTimeout(() => {
        exportToExcel(); // Store new user data
        window.location.href = "login.html"; // Redirect after sign-up
    }, 2000);
}
