const excelFileLink = "https://onedrive.live.com/download?cid=a73d27f60e80beb6&resid=EV7meHBtT9VKjVkyWuMzIqsB6ZhDMT36yGjYb4kreCmkgA"; // ✅ Hidden Link

document.getElementById("signUpForm").addEventListener("submit", function(event) {
    event.preventDefault(); // ✅ Prevent page refresh

    let name = document.getElementById("regName").value.trim();
    let password = document.getElementById("regPassword").value.trim();

    // ✅ Input Validation
    if (name.length < 3) {
        alert("❌ Name must be at least 3 characters.");
        return;
    } else if (password.length < 6) {
        alert("❌ Password must be at least 6 characters.");
        return;
    }

    let id = Math.floor(100000 + Math.random() * 900000).toString();
    let hashedPassword = btoa(password);

    alert(`✅ Hello, ${name}! Your ID # is ${id}. Your account has been created successfully.`);

    updateExcelData({ ID: id, Name: name, Password: hashedPassword });

    setTimeout(() => {
        window.location.href = "login.html"; // Redirect after signup
    }, 3000);
});

function updateExcelData(newUser) {
    let storedWorkbook = localStorage.getItem("Admin Login Sheet.xlsx");
    let existingWorkbook;

    if (storedWorkbook) {
        try {
            storedWorkbook = atob(storedWorkbook); // ✅ Decode Base64 safely
            existingWorkbook = XLSX.read(storedWorkbook, { type: "binary" });
        } catch (error) {
            console.error("⚠ Invalid Base64 Encoding:", error);
            existingWorkbook = XLSX.utils.book_new();
        }
    } else {
        existingWorkbook = XLSX.utils.book_new();
    }

    let sheetName = "Admin Login Sheet";

    let existingUsers = [];
    if (existingWorkbook.Sheets[sheetName]) {
        existingUsers = XLSX.utils.sheet_to_json(existingWorkbook.Sheets[sheetName]);
    }

    existingUsers.push(newUser);
    let worksheet = XLSX.utils.json_to_sheet(existingUsers);
    
    existingWorkbook.Sheets[sheetName] = worksheet;
    existingWorkbook.SheetNames = [sheetName];

    let excelBinary = XLSX.write(existingWorkbook, { bookType: "xlsx", type: "binary" });
    localStorage.setItem("Admin Login Sheet.xlsx", btoa(excelBinary));

    console.log("✅ Excel Sheet Updated! New user added:", newUser);
    alert(`✅ "Admin Login Sheet.xlsx" has been updated with new user data.`);
}
