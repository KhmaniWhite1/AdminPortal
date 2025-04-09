function registerUser(event) {
    event.preventDefault(); // Prevent default form submission

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

    // Encode password
    let hashedPassword = btoa(password);

    users.push({ Name: name, ID: id, Password: hashedPassword });
    localStorage.setItem("users", JSON.stringify(users));

    // Show personalized greeting
    alert(`✅ Hello, ${name}! Your account has been created successfully.`);
    
    setTimeout(() => {
        exportToExcel(); // Store data without auto-downloading
        window.location.href = "login.html";
    }, 2000);
}
