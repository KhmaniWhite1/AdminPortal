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

        // Merge with existing users
        let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        let allUsers = [...storedUsers, ...jsonData];

        localStorage.setItem("users", JSON.stringify(allUsers));
        alert("✅ Excel data successfully loaded and merged!");

    } catch (error) {
        console.error("Excel Read Error:", error);
        alert("❌ Failed to read Excel file.");
    }
}

// Function to register a new user
function registerUser() {
    let name = document.getElementById("regName").value.trim();
    let password = document.getElementById("regPassword").value.trim();

    if (!name || !password) {
        alert("❌ Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Generate a unique 6-digit ID
    let id;
    do {
        id = Math.floor(100000 + Math.random() * 900000).toString();
    } while (users.some(user => user.ID === id));

    // Basic password encoding (not full encryption)
    let hashedPassword = btoa(password);

    users.push({ Name: name, ID: id, Password: hashedPassword });
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("welcomeMessage").innerText = `✅ Hello, ${name}! Your ID # is ${id}`;

    setTimeout(() => {
        exportToExcel();
        window.location.href = "login.html";
    }, 2000);
}

// Function to export user data to an Excel file
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
        if (typeof XLSX === "undefined") throw new Error("❌ XLSX library not loaded.");

        XLSX.writeFile(workbook, "Admin_Portal_Logins.xlsx");
        alert("✅ Excel file has been successfully downloaded!");
    } catch (error) {
        console.error("Excel Export Error:", error);
        alert("❌ Failed to export data to Excel.");
    }
}
