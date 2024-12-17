document.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.minHeight = "100vh";
    container.style.backgroundColor = "black";
    container.style.color = "white";
    document.body.appendChild(container);

    const img = document.createElement("img");
    img.src = "/static/images/rick.jpg";
    img.alt = "Centered Image";
    img.style.maxWidth = "300px";
    img.style.border = "3px solid white";
    img.style.borderRadius = "10px";
    img.style.boxShadow = "0px 4px 8px rgba(255, 255, 255, 0.2)";
    img.style.marginBottom = "20px";
    container.appendChild(img);

    const input = document.createElement("input");
    input.type = "password";
    input.placeholder = "NOME DE USUARIO";
    input.style.padding = "10px";
    input.style.fontSize = "16px";
    input.style.borderRadius = "5px";
    input.style.border = "2px solid #333";
    input.style.width = "200px";
    input.style.textAlign = "center";
    input.style.marginBottom = "20px";
    container.appendChild(input);

    // Create a message div to display the response
    const messageDiv = document.createElement("div");
    messageDiv.style.marginTop = "20px";
    messageDiv.style.color = "lightgreen";
    container.appendChild(messageDiv);

    function submitUsername() {
    const username = input.value;

    fetch("/submit_username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // Redirect to the dashboard or another page
            window.location.href = "/teste";  // Update this path as needed
        } else {
            input.value = "";
            messageDiv.textContent = data.message;
            messageDiv.style.color = "red";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        messageDiv.textContent = "ERRO";
        messageDiv.style.color = "red";
    });
}

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            submitUsername();
        }
    });
});
