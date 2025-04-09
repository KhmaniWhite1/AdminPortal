function exportToExcel() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    let exportedUsers = users.map(user => ({
        Name: user.Name,
        ID: user.ID,
        Password: atob(user.Password)
    }));

    let worksheet = XLSX.utils.json_to_sheet(exportedUsers);
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Logins");

    try {
        if (typeof XLSX === "undefined") throw new Error("❌ XLSX library is not loaded.");

        let fileName = "Admin_Portal_Logins.xlsx";
        
        // Create a Blob and force the browser to download
        let excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        let blob = new Blob([excelData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        let link = document.createElement("a");
        
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert("✅ Excel file has been successfully downloaded!");

    } catch (error) {
        console.error("Excel Export Error:", error);
        alert("❌ Failed to export data to Excel.");
    }
}
