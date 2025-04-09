document.getElementById("signUpForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (name.length < 3) {
        alert("❌ Name must be at least 3 characters.");
        return;
    } else if (password.length < 6) {
        alert("❌ Password must be at least 6 characters.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password })
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || "✅ Signup successful!");
            window.location.href = "login.html"; // Redirect to login page after success
        } else {
            const errorResult = await response.json();
            alert(errorResult.error || "❌ Signup failed.");
        }
    } catch (error) {
        console.error("Signup Error:", error);
        alert("❌ Failed to communicate with the server.");
    }
});
