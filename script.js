function exportToExcel() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    // Prepare data for export (decoding stored passwords)
    let exportedUsers = users.map(user => ({
        Name: user.Name,
        ID: user.ID,
        Password: atob(user.Password) // Decode the basic hashed password
    }));

    let worksheet = XLSX.utils.json_to_sheet(exportedUsers);
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Logins");

    // Save the file with a structured name
    XLSX.writeFile(workbook, "Admin_Portal_Logins.xlsx");

    alert("✅ Excel file has been successfully downloaded!");
}
