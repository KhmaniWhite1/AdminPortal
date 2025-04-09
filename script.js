async function readExcelFromOneDrive() {
    let url = "https://api.onedrive.com/v1.0/shares/u!a73d27f60e80beb6/root/content"; // Your OneDrive direct download link

    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("❌ Failed to fetch file.");

        let data = await response.arrayBuffer();
        let workbook = XLSX.read(new Uint8Array(data), { type: "array" });

        let sheetName = workbook.SheetNames[0]; // Reads the first sheet
        let worksheet = workbook.Sheets[sheetName];
        let jsonData = XLSX.utils.sheet_to_json(worksheet); // Converts sheet data to JSON

        console.log("Excel Data:", jsonData);
        localStorage.setItem("Admin Portal Logins.xlsx", JSON.stringify(jsonData)); // Stores data in local storage

        alert("✅ Excel data successfully fetched and stored!");
    } catch (error) {
        console.error("Excel Read Error:", error);
        alert("❌ Failed to read Excel file.");
    }
}

// Run function to fetch and store Excel data
readExcelFromOneDrive();
