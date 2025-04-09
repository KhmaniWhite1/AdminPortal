function exportToExcel() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    let worksheet = XLSX.utils.json_to_sheet(users, { header: ["Name", "ID #", "Password"] });
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Logins");

    // Formatting headers to look professional
    let headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "007BFF" } },
        alignment: { horizontal: "center", vertical: "center" }
    };

    // Center-align all cells
    let cellStyle = {
        alignment: { horizontal: "center", vertical: "center" }
    };

    worksheet["A1"].s = headerStyle;
    worksheet["B1"].s = headerStyle;
    worksheet["C1"].s = headerStyle;

    for (let cell in worksheet) {
        if (cell[0] !== "!" && !worksheet[cell].s) {
            worksheet[cell].s = cellStyle;
        }
    }

    // Adjust column widths
    worksheet["!cols"] = [
        { wch: 30 },  // Name column
        { wch: 15 },  // ID # column
        { wch: 20 }   // Password column
    ];

    // Save the file with correct name
    XLSX.writeFile(workbook, "Admin Portal Logins.xlsx");
}
