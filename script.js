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
        // Try to retrieve an existing workbook from local storage
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

    // Append new data to the existing worksheet
    let worksheet = XLSX.utils.json_to_sheet(exportedUsers);
    XLSX.utils.book_append_sheet(existingWorkbook, worksheet, "Admin Logins");

    // Convert workbook to binary string and store it in local storage
    let excelBinary = XLSX.write(existingWorkbook, { bookType: "xlsx", type: "binary" });
    localStorage.setItem("excelWorkbook", excelBinary);

    alert("✅ Excel file has been updated with new users!");
}
