function exportToExcel() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    let worksheet = XLSX.utils.json_to_sheet(users, { header: ["Name", "ID #", "Password"] }); // Column headers added back
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Logins");

    // Auto-adjust column width for readability
    worksheet["!cols"] = [
        { wch: 25 },  // Name column
        { wch: 12 },  // ID # column
        { wch: 18 }   // Password column
    ];

    // Center-align all cells
    for (let cell in worksheet) {
        if (cell[0] !== "!") {
            worksheet[cell].s = { alignment: { horizontal: "center" } };
        }
    }

    XLSX.writeFile(workbook, "Admin Portal Logins.xlsx");
}
