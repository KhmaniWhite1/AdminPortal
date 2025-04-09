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

    let worksheet = XLSX.utils.json_to_sheet(exportedUsers);
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Logins");

    // ✅ Set Proper Column Widths for Better Text Fit
    worksheet["!cols"] = [
        { wch: 30 }, // Name Column
        { wch: 15 }, // ID Column
        { wch: 25 }  // Password Column
    ];

    // ✅ Apply Styling for Headers (Bold, Centered, Background Color)
    let headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "007BFF" } },
        alignment: { horizontal: "center", vertical: "center" }
    };

    worksheet["A1"].s = headerStyle;
    worksheet["B1"].s = headerStyle;
    worksheet["C1"].s = headerStyle;

    // ✅ Apply Styling for Regular Cells (Centered Text)
    let cellStyle = {
        alignment: { horizontal: "center", vertical: "center" }
    };

    for (let cell in worksheet) {
        if (cell[0] !== "!" && !worksheet[cell].s) {
            worksheet[cell].s = cellStyle;
        }
    }

    try {
        // Ensure XLSX library is properly loaded before saving
        if (typeof XLSX === "undefined") throw new Error("❌ XLSX library is not loaded.");

        XLSX.writeFile(workbook, "Admin_Portal_Logins.xlsx");
        alert("✅ Excel file has been successfully downloaded!");
    } catch (error) {
        console.error("Excel Export Error:", error);
        alert("❌ Failed to export data to Excel.");
    }
}
