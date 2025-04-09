async function readExcelFromOneDrive(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("❌ Failed to fetch file.");

        let data = await response.arrayBuffer();
        let workbook = XLSX.read(new Uint8Array(data), { type: "array" });

        let sheetName = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[sheetName];
        let jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log("Excel Data:", jsonData);

        // Merge new data with existing stored users
        let storedUsers = JSON.parse(localStorage.getItem("Admin Portal Logins.xlsx")) || [];
        let allUsers = [...storedUsers, ...jsonData];

        localStorage.setItem("Admin Portal Logins.xlsx", JSON.stringify(allUsers));
        alert("✅ Excel data successfully fetched and stored!");

    } catch (error) {
        console.error("Excel Read Error:", error);
        alert("❌ Failed to read Excel file.");
    }
}

// Example Usage (Replace with direct OneDrive link)
readExcelFromOneDrive("https://1drv.ms/x/c/a73d27f60e80beb6/EdmhLymUb9dEr4v2-wdCSc8B7_njf_EEVinrWYeRy3nLEA?e=9a5SyC");
