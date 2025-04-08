function registerUser() {
    let name = document.getElementById("regName").value.trim();
    let password = document.getElementById("regPassword").value.trim();

    if (name === "" || password === "") {
        alert("❌ Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ Name: name, Password: password });
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("welcomeMessage").innerText = `✅ Hello, ${name}!`;

    exportToExcel();

    // Redirect to Login Page after 2 seconds
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
}

function exportToExcel() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    let worksheet = XLSX.utils.json_to_sheet(users, { header: ["Name", "Password"] });
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Logins");

    XLSX.writeFile(workbook, "Admin Portal Logins.xlsx");
}
