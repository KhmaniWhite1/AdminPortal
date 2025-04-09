// Function to check if Forced Colors Mode is active
function isForcedColorsMode() {
    return window.matchMedia("(forced-colors: active)").matches;
}

// Apply forced colors dynamically
function applyForcedColors() {
    if (isForcedColorsMode()) {
        document.body.style.backgroundColor = "Canvas";
        document.body.style.color = "CanvasText";

        document.querySelectorAll("button").forEach(btn => {
            btn.style.backgroundColor = "ButtonFace";
            btn.style.color = "ButtonText";
            btn.style.border = "1px solid ButtonText";
        });

        document.querySelectorAll("input, textarea").forEach(input => {
            input.style.backgroundColor = "Field";
            input.style.color = "FieldText";
            input.style.border = "1px solid ButtonText";
        });
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

    // Generate a unique 6-digit ID number
    let id = Math.floor(100000 + Math.random() * 900000).toString();
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Ensure ID is unique
    while (users.some(user => user.ID === id)) {
        id = Math.floor(100000 + Math.random() * 900000).toString();
    }

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

// Function to verify login credentials
function verifyLogin() {
    let loginID = document.getElementById("loginID").value.trim();
    let loginPassword = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.ID === loginID && u.Password === btoa(loginPassword));

    if (user) {
        document.getElementById("loginMessage").innerText = `✅ Welcome, ${user.Name}!`;
    } else {
        document.getElementById("loginMessage").innerText = "❌ Invalid ID # or Password.";
    }
}

// Function to export user data to an Excel file
function exportToExcel() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("❌ No user data found!");
        return;
    }

    // Prepare data for export (decoding stored passwords)
    let exportedUsers = users.map(user => ({
        Name: user.Name,
        ID: user.ID,
        Password: atob(user.Password)
    }));

    let worksheet = XLSX.utils.json_to_sheet(exportedUsers);
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Logins");

    // Save the file with a structured name
    XLSX.writeFile(workbook, "Admin_Portal_Logins.xlsx");

    alert("✅ Excel file has been successfully downloaded!");
}

// Run forced colors check on page load & monitor changes
applyForcedColors();
window.matchMedia("(forced-colors: active)").addEventListener("change", applyForcedColors);
