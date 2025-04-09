document.getElementById("loginForm").addEventListener("submit", authenticateUser);

function authenticateUser(event) {
    event.preventDefault();

    let name = document.getElementById("loginName").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    if (!name || !password) {
        alert("❌ Please fill in all fields.");
        return;
    }

    readExcelOnLogin(name, password);
}

function readExcelOnLogin(name, password) {
    try {
        let storedWorkbook = localStorage.getItem("Admin Login Sheet.xlsx");
        if (!storedWorkbook) {
            alert("❌ No Excel file found in storage.");
            return;
        }

        let workbook = XLSX.read(storedWorkbook, { type: "binary" });
        let sheetName = "Admin Logins";
        let worksheet = workbook.Sheets[sheetName];
        let jsonData = XLSX.utils.sheet_to_json(worksheet);

        let user = jsonData.find(user => user.Name === name && atob(user.Password) === password);
        
        if (user) {
            alert(`✅ Welcome back, ${user.Name}! Your ID # is ${user.ID}`);
        } else {
            alert("❌ Incorrect username or password.");
        }

    } catch (error) {
        console.error("Excel Read Error:", error);
        alert("❌ Failed to read Excel file.");
    }
}
