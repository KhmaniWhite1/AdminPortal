function updateExcelData() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    let exportedUsers = users.map(user => ({
        Name: user.Name,
        ID: user.ID,
        Password: user.Password // Remove `atob()` from here
    }));

    let storedWorkbook = localStorage.getItem("Admin Login Sheet.xlsx");
    let existingWorkbook;

    if (storedWorkbook) {
        try {
            storedWorkbook = atob(storedWorkbook); // ✅ Decode only if it's Base64-encoded
            existingWorkbook = XLSX.read(storedWorkbook, { type: "binary" });
        } catch (error) {
            console.error("⚠ Invalid Base64 Encoding:", error);
            existingWorkbook = XLSX.utils.book_new();
        }
    } else {
        existingWorkbook = XLSX.utils.book_new();
    }

    let sheetName = "Admin Login Sheet";

    if (existingWorkbook.Sheets[sheetName]) {
        delete existingWorkbook.Sheets[sheetName];
        existingWorkbook.SheetNames = existingWorkbook.SheetNames.filter(name => name !== sheetName);
    }

    let worksheet = XLSX.utils.json_to_sheet(exportedUsers);
    XLSX.utils.book_append_sheet(existingWorkbook, worksheet, sheetName);

    let excelBinary = XLSX.write(existingWorkbook, { bookType: "xlsx", type: "binary" });
    localStorage.setItem("Admin Login Sheet.xlsx", btoa(excelBinary)); // ✅ Ensure Base64 Encoding

    alert("✅ New users have been added! Data is stored but not downloaded.");
}
