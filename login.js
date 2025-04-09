document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("loginName").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!name || !password) {
        alert("❌ Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password })
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || "✅ Login successful!");
        } else {
            const errorResult = await response.json();
            alert(errorResult.error || "❌ Incorrect username or password.");
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("❌ Failed to communicate with the server.");
    }
});
