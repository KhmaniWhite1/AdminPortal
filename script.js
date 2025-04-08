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

    document.getElementById("signupMessage").innerText = `✅ Welcome, ${name}!`;
}

function verifyLogin() {
    let loginName = document.getElementById("loginName").value.trim();
    let loginPassword = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.Name === loginName && u.Password === loginPassword);

    if (user) {
        document.getElementById("loginMessage").innerText = `✅ Welcome, ${user.Name}!`;
    } else {
        document.getElementById("loginMessage").innerText = "❌ Invalid login credentials.";
    }
}