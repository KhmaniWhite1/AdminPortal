function exportToExcel() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    let worksheet = XLSX.utils.json_to_sheet(users);
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Logins");

    // Save the file correctly
    XLSX.writeFile(workbook, "Admin_Portal_Logins.xlsx");

    alert("✅ Excel file has been successfully downloaded!");
}
