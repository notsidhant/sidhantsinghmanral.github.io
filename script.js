document.getElementById("contactForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("response").innerText = "Message Sent Successfully!";
});
