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

    alert("✅ New users added to 'Admin Portal Logins.xlsx' in storage!");
}

// Function to manually download the Excel file
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
