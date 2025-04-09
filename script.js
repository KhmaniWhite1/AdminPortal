function exportToExcel() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    // Create the worksheet with headers
    let worksheet = XLSX.utils.json_to_sheet(users, { header: ["Name", "ID #", "Password"] });
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Logins");

    // Styling enhancements
    let headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "007BFF" } },
        alignment: { horizontal: "center", vertical: "center" }
    };

    let cellStyle = {
        alignment: { horizontal: "center", vertical: "center" }
    };

    // Apply styles to headers
    worksheet["A1"].s = headerStyle;
    worksheet["B1"].s = headerStyle;
    worksheet["C1"].s = headerStyle;

    // Apply centering to all cells
    for (let cell in worksheet) {
        if (cell[0] !== "!" && !worksheet[cell].s) {
            worksheet[cell].s = cellStyle;
        }
    }

    // Adjust column widths for readability
    worksheet["!cols"] = [
        { wch: 30 },  // Name column (wider for full names)
        { wch: 15 },  // ID # column (fits six-digit IDs)
        { wch: 20 }   // Password column
    ];

    // Save the file
    XLSX.writeFile(workbook, "Admin Portal Logins.xlsx");
}
