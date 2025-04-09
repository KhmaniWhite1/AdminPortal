function updateExcelData() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    let exportedUsers = users.map(user => ({
        ID: user.ID,
        Name: user.Name,
        Password: atob(user.Password) // ✅ Proper decoding
    }));

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
    let worksheet = XLSX.utils.json_to_sheet(exportedUsers);
    existingWorkbook.Sheets[sheetName] = worksheet;
    existingWorkbook.SheetNames.push(sheetName);

    let excelBinary = XLSX.write(existingWorkbook, { bookType: "xlsx", type: "binary" });
    localStorage.setItem("Admin Login Sheet.xlsx", btoa(excelBinary)); // ✅ Ensure Base64 Encoding

    // ✅ Confirmation Message in Console & Alert
    console.log(`✅ Excel Sheet Updated! New user data has been saved.`);
    alert(`✅ "Admin Login Sheet.xlsx" has been updated with new data.`);
}
