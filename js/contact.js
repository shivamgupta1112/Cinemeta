document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const message = document.getElementById("contact-status");
    message.className = "form-success";
    message.textContent = "Thanks. Your message was received in this demo.";
    event.target.reset();
});
