function registerUser() {
    let name = document.getElementById("regName").value.trim();
    let password = document.getElementById("regPassword").value.trim();

    if (name === "" || password === "") {
        alert("❌ Please fill in all fields.");
        return;
    }

    // Generate a random 6-digit ID number
    let id = Math.floor(100000 + Math.random() * 900000);

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ Name: name, ID: id, Password: password });
    localStorage.setItem("users", JSON.stringify(users));

    // Display the ID # to the user
    document.getElementById("welcomeMessage").innerText = `✅ Hello, ${name}! Your ID # is ${id}`;

    exportToExcel();

    // Redirect to Login Page after 2 seconds
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
}

function verifyLogin() {
    let loginID = document.getElementById("loginID").value.trim();
    let loginPassword = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.ID === loginID && u.Password === loginPassword);

    if (user) {
        document.getElementById("loginMessage").innerText = `✅ Welcome, ${user.Name}!`;
    } else {
        document.getElementById("loginMessage").innerText = "❌ Invalid ID # or Password.";
    }
}

function exportToExcel() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    let worksheet = XLSX.utils.json_to_sheet(users, { header: ["Name", "ID #", "Password"] });
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Logins");

    // Formatting headers for elegance
    let headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "007BFF" } },
        alignment: { horizontal: "center", vertical: "center" }
    };

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

    // Ensure column widths are readable
    worksheet["!cols"] = [
        { wch: 30 },  // Name column
        { wch: 15 },  // ID # column
        { wch: 20 }   // Password column
    ];

    // Save the file correctly
    XLSX.writeFile(workbook, "Admin Portal Logins.xlsx");
}
