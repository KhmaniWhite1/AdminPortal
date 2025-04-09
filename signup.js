document.getElementById("signUpForm").addEventListener("submit", registerUser);

function registerUser(event) {
    event.preventDefault();

    let name = document.getElementById("regName").value.trim();
    let password = document.getElementById("regPassword").value.trim();

    if (!name || !password) {
        alert("❌ Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let id = Math.floor(100000 + Math.random() * 900000).toString(); // Generate Random ID
    let hashedPassword = btoa(password);

    users.push({ ID: id, Name: name, Password: hashedPassword });
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ Show greeting with name & ID #
    alert(`✅ Hello, ${name}! Your ID # is ${id}. Your account has been created successfully.`);
    console.log(`✅ New Signup: Hello, ${name}! ID # ${id} has been registered.`);

    updateExcelData(); // ✅ Immediately update the Excel sheet

    setTimeout(() => {
        window.location.href = "login.html"; // Redirect after sign-up
    }, 2000);
}
