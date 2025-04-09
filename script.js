function exportToExcel() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    // Decode stored passwords before exporting
    let exportedUsers = users.map(user => ({
        Name: user.Name,
        ID: user.ID,
        Password: atob(user.Password)
    }));

    let existingWorkbook;
    try {
        // Check if an existing Excel file is stored
        let storedWorkbook = localStorage.getItem("excelWorkbook");
        if (storedWorkbook) {
            existingWorkbook = XLSX.read(storedWorkbook, { type: "binary" });
        } else {
            existingWorkbook = XLSX.utils.book_new();
        }
    } catch (error) {
        console.warn("⚠ No existing Excel file found, creating a new one.");
        existingWorkbook = XLSX.utils.book_new();
    }

    // Check if worksheet exists, else create it
    let sheetName = "Admin Logins";
    let worksheet = existingWorkbook.Sheets[sheetName] || XLSX.utils.json_to_sheet([]);
    
    // Append new data to worksheet
    let updatedData = XLSX.utils.sheet_to_json(worksheet).concat(exportedUsers);
    worksheet = XLSX.utils.json_to_sheet(updatedData);
    XLSX.utils.book_append_sheet(existingWorkbook, worksheet, sheetName);

    // Store workbook in local storage instead of downloading
    let excelBinary = XLSX.write(existingWorkbook, { bookType: "xlsx", type: "binary" });
    localStorage.setItem("excelWorkbook", excelBinary);

    alert("✅ Excel file has been updated with new users!");
}
