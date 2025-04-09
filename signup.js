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

    users.push({ Name: name, ID: id, Password: hashedPassword });
    localStorage.setItem("users", JSON.stringify(users));

    alert(`✅ Hello, ${name}! Your ID # is ${id}. Your account has been created successfully.`);

    setTimeout(() => {
        updateExcelData(); // Store new user data without downloading
        downloadExcelFile(); // Downloads Excel file once on the first signup
        window.location.href = "login.html"; // Redirect after sign-up
    }, 2000);
}

function updateExcelData() {
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

    let storedWorkbook = localStorage.getItem("Admin Login Sheet.xlsx");
    let existingWorkbook;

    if (storedWorkbook) {
        existingWorkbook = XLSX.read(atob(storedWorkbook), { type: "binary" });
    } else {
        existingWorkbook = XLSX.utils.book_new();
    }

    let sheetName = "Admin Logins";

    if (existingWorkbook.Sheets[sheetName]) {
        delete existingWorkbook.Sheets[sheetName];
        existingWorkbook.SheetNames = existingWorkbook.SheetNames.filter(name => name !== sheetName);
    }

    let worksheet = XLSX.utils.json_to_sheet(exportedUsers);
    XLSX.utils.book_append_sheet(existingWorkbook, worksheet, sheetName);

    let excelBinary = XLSX.write(existingWorkbook, { bookType: "xlsx", type: "binary" });
    localStorage.setItem("Admin Login Sheet.xlsx", btoa(excelBinary));

    alert("✅ New users have been added! Data is stored but not downloaded.");
}

function downloadExcelFile() {
    try {
        let storedWorkbook = localStorage.getItem("Admin Login Sheet.xlsx");
        if (!storedWorkbook) {
            alert("❌ No Excel file found in local storage.");
            return;
        }

        let workbook = XLSX.read(atob(storedWorkbook), { type: "binary" });
        let fileName = "Admin Login Sheet.xlsx";

        XLSX.writeFile(workbook, fileName);
        alert(`✅ "${fileName}" has been downloaded!`);
    } catch (error) {
        console.error("Excel Download Error:", error);
        alert("❌ Failed to download Excel file.");
    }
}
